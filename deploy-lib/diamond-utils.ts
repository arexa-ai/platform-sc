import { Contract } from "ethers";
import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment, Network } from "hardhat/types";
import { networkConfig } from "../helper-hardhat-config";
import { zeroAddress } from "./utils";
import { DiamondDeploymentInit, DeploymentItem, DiamondDeploymentDescriptorNew } from "./deployment-descriptors";
import { Address, DeployResult, DeploymentsExtension } from "hardhat-deploy/types";
import { generateDummyContract } from "./generate-dummy-diamond-implemention";
import * as fs from "fs";

export const MAX_FACET_COUNT_IN_ONE_CUT = 10;

export enum FacetCutAction {
	Add = 0,
	Replace = 1,
	Remove = 2,
}

export type FacetCut = {
	facetAddress: string;
	action: FacetCutAction;
	functionSelectors: string[];
};

export function getSelectors(contract: Contract) {
	const signatures = Object.keys(contract.interface.functions);
	const selectors = signatures.reduce((acc, val) => {
		if (val !== "init(bytes)") {
			acc.push(contract.interface.getSighash(val));
		}
		return acc;
	}, [] as string[]);
	// selectors.contract = contract;
	// selectors.remove = remove;
	// selectors.get = get;
	return selectors;
}

export function getSelectorForFunc(func: any): string {
	const abiInterface = new ethers.utils.Interface([func]);
	return abiInterface.getSighash(ethers.utils.Fragment.from(func));
}

async function deployItem(
	network: Network,
	deployments: DeploymentsExtension,
	deployerAccount: Address,
	deloymentItem: DeploymentItem,
	args: unknown[],
): Promise<DeployResult> {
	const { deploy, log } = deployments;

	//log(`"${deloymentItem.name}" is deploying...`);

	const deployedItem = await deploy(deloymentItem.name, {
		contract: deloymentItem.artifact,
		from: deployerAccount,
		args: args,
		log: false,
		waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
	});
	//log(`"${deloymentItem.name}" is newly deployed: ${deployedItem.newlyDeployed}`);
	log(
		` "${deloymentItem.name}" (tx: ${deployedItem.transactionHash}) at (${deployedItem.address}) (${deployedItem.receipt?.gasUsed} gas) (new: ${deployedItem.newlyDeployed})`,
	);
	return deployedItem;
}

export async function deployDiamondNative(
	hre: HardhatRuntimeEnvironment,
	descriptorType: string,
	deployItemDiamond: DeploymentItem,
	deployItemCutFacet: DeploymentItem,
	deployItemInit: DiamondDeploymentInit,
	facets: Record<string, DeploymentItem>,
	diamondDummyImplementation: DeploymentItem,
): Promise<void> {
	//
	const { getNamedAccounts, deployments, network } = hre;
	const { deploy, log } = deployments;
	const { deployer, diamondOwner } = await getNamedAccounts();

	const diamondFacetContracts: Contract[] = [];

	log("");
	log("----------------------------------------------------");
	log(`Deploying '${descriptorType}' Diamond and waiting for confirmations...`);
	log("");

	//deploy CutFacet
	//const deployItemCut = TokenDeploymentDescriptors[descriptorType].diamondCutFacet;
	const diamondCutFacet = await deployItem(network, deployments, deployer, deployItemCutFacet, []);

	// deploy Diamond
	//const deployItemDiamond = TokenDeploymentDescriptors[descriptorType].diamond;
	const diamond = await deployItem(network, deployments, deployer, deployItemDiamond, [diamondOwner, diamondCutFacet.address]);
	const diamondOwnerSigner = await ethers.getSigner(diamondOwner);
	const diamondCutContract = await ethers.getContractAt("IDiamondCut", diamond.address, diamondOwnerSigner);
	diamondFacetContracts.push(diamondCutContract);

	//const deployItemInit = TokenDeploymentDescriptors[descriptorType].initializer;
	const diamondInitializer = await deployItem(network, deployments, deployer, deployItemInit, []);

	// const diamondEtherscanFacet = await deployItem(network, deployments, deployer, deployEtherscanFacet, []);
	// const diamondEtherscanContract = await ethers.getContractAt(deployEtherscanFacet.artifact, diamond.address, diamondOwnerSigner);

	const isLoupeExists = !!(await deployments.getOrNull(facets.diamondLoupeFacet.name));

	const origFactesSelectors: { facetAddress: string; functionSelectors: string[] }[] = [];
	const actFacetsSelectors: { facetAddress: string; functionSelectors: string[] }[] = [];
	const cut: FacetCut[] = [];

	const diamondCutFacetContract = await ethers.getContractAt(deployItemCutFacet.artifact, diamondCutFacet.address);

	if (isLoupeExists) {
		try {
			const diamondLoupeContract = await ethers.getContractAt("IDiamondLoupe", diamond.address, diamondOwnerSigner);
			const facets = await diamondLoupeContract.facets();
			origFactesSelectors.push(
				...facets.map((item) => ({ facetAddress: item.facetAddress, functionSelectors: item.functionSelectors })),
			);
		} catch (error) {
			log(`diamondLoupeContract is deployed but not cut into the diamond!`);
			origFactesSelectors.push({ facetAddress: diamondCutFacet.address, functionSelectors: getSelectors(diamondCutFacetContract) });
		}
	} else {
		//on a new Diamond, the diamondCutFacet is already added
		origFactesSelectors.push({ facetAddress: diamondCutFacet.address, functionSelectors: getSelectors(diamondCutFacetContract) });
	}

	actFacetsSelectors.push({ facetAddress: diamondCutFacet.address, functionSelectors: getSelectors(diamondCutFacetContract) });

	//deploy facets
	//const facets = TokenDeploymentDescriptors[descriptorType].facets;
	for (const key in facets) {
		if (Object.prototype.hasOwnProperty.call(facets, key)) {
			const facetDeploymentItem = facets[key];
			//const originalFacet = await deployments.getOrNull(facetDeploymentItem.name);

			const facet = await deployItem(network, deployments, deployer, facetDeploymentItem, []);
			const facetContract = await ethers.getContractAt(facetDeploymentItem.artifact, facet.address);

			diamondFacetContracts.push(facetContract);

			actFacetsSelectors.push({ facetAddress: facet.address, functionSelectors: getSelectors(facetContract) });
		}
	}
	// console.log("origFactesSelectors");
	// console.log(JSON.stringify(origFactesSelectors, null, 2));
	// console.log("actFacetsSelectors");
	// console.log(JSON.stringify(actFacetsSelectors, null, 2));

	//Calculate Cuts
	for (let i = 0; i < origFactesSelectors.length; i++) {
		const origFacet = origFactesSelectors[i];
		for (let j = 0; j < origFacet.functionSelectors.length; j++) {
			const origSelector = origFacet.functionSelectors[j];
			const newFacet = actFacetsSelectors.find((item) => item.functionSelectors.includes(origSelector));
			if (newFacet) {
				if (origFacet.facetAddress !== newFacet.facetAddress) {
					let cutItem = cut.find((item) => item.facetAddress == newFacet.facetAddress && item.action == FacetCutAction.Replace);
					if (!cutItem) {
						cutItem = { facetAddress: newFacet.facetAddress, action: FacetCutAction.Replace, functionSelectors: [] };
						cut.push(cutItem);
					}
					cutItem.functionSelectors.push(origSelector);
					let index = newFacet.functionSelectors.indexOf(origSelector);
					if (index > -1) {
						newFacet.functionSelectors.splice(index, 1);
					}
				} else {
					let index = newFacet.functionSelectors.indexOf(origSelector);
					if (index > -1) {
						newFacet.functionSelectors.splice(index, 1);
					}
				}
			} else {
				let cutItem = cut.find((item) => item.facetAddress == origFacet.facetAddress && item.action == FacetCutAction.Remove);
				if (!cutItem) {
					cutItem = { facetAddress: zeroAddress, action: FacetCutAction.Remove, functionSelectors: [] };
					cut.push(cutItem);
				}
				cutItem.functionSelectors.push(origSelector);
			}
		}
	}
	for (let i = 0; i < actFacetsSelectors.length; i++) {
		const newFacet = actFacetsSelectors[i];
		for (let j = 0; j < newFacet.functionSelectors.length; j++) {
			const selector = newFacet.functionSelectors[j];
			let cutItem = cut.find((item) => item.facetAddress == newFacet.facetAddress && item.action == FacetCutAction.Add);
			if (!cutItem) {
				cutItem = { facetAddress: newFacet.facetAddress, action: FacetCutAction.Add, functionSelectors: [] };
				cut.push(cutItem);
			}
			cutItem.functionSelectors.push(selector);
		}
	}

	//console.log(JSON.stringify(cut, null, 2));

	while (cut.length > 0) {
		//call cut
		const toCut = cut.splice(0, MAX_FACET_COUNT_IN_ONE_CUT);
		//console.log(toCut, JSON.stringify(toCut, null, 2));
		let initAddress = zeroAddress;
		let functionCall = ethers.utils.formatBytes32String("");
		const tx = await diamondCutContract.diamondCut(toCut, initAddress, functionCall);
		log(` '${descriptorType}' DiamondCut tx hash:`, tx.hash);
		const receipt = await tx.wait(networkConfig[network.name].blockConfirmations || 1);
		if (!receipt.status) {
			throw Error(`'${descriptorType}' Diamond cut failed: ${tx.hash}`);
		}
		log(` '${descriptorType}' DiamondCut tx completed (${receipt.gasUsed} gas)`);
	}

	//call initMethod
	try {
		const deployedInitContract = await ethers.getContractAt(deployItemInit.artifact, diamondInitializer.address, diamondOwnerSigner);
		const initAddress = deployedInitContract.address;
		const functionCall = deployedInitContract.interface.encodeFunctionData(deployItemInit.functionName, deployItemInit.params);
		const tx = await diamondCutContract.diamondCut([], initAddress, functionCall);
		log(` '${descriptorType}' INIT DiamondCut tx hash:`, tx.hash);
		const receipt = await tx.wait(networkConfig[network.name].blockConfirmations || 1);
		if (!receipt.status) {
			throw Error(`'${descriptorType}' INIT Diamond cut failed: ${tx.hash}`);
		}
		log(` '${descriptorType}' INIT DiamondCut tx completed (${receipt.gasUsed} gas)`);
	} catch (err) {
		const error = err as any;
		log(` '${descriptorType}' INIT Diamond cut failed: ${error.reason}`);
	}

	log(` '${descriptorType}' Diamond add Etherscan compatibility`);
	//const implContractName = `${deployItemDiamond.name}DummyImplementation`;

	//generálni a dummyContractot
	const dummyContractStr = generateDummyContract(diamondFacetContracts, {
		diamondAddress: diamond.address,
		network: network.name,
		contractName: diamondDummyImplementation.artifact,
	});

	const fileName = `./contracts/_dummy/${diamondDummyImplementation.artifact}.sol`;

	let originalDummyContractStr = "";
	try {
		originalDummyContractStr = fs.readFileSync(fileName, { encoding: "utf8" });
	} catch (err) {}
	if (dummyContractStr != originalDummyContractStr) {
		fs.writeFileSync(fileName, dummyContractStr, { encoding: "utf8" });
		await hre.run("compile", { quiet: true });
	}

	const dummy = await deployItem(network, deployments, deployer, diamondDummyImplementation, []);

	const etherscanFacetContract = await ethers.getContractAt("DiamondEtherscanFacet", diamond.address, diamondOwnerSigner);
	const dummyContractAddress = await etherscanFacetContract.implementation();

	if (dummy.newlyDeployed || dummyContractAddress !== dummy.address) {
		//be kell állítani a dummy címet a contractba.
		try {
			const tx = await etherscanFacetContract.setDummyImplementation(dummy.address);
			const receipt = await tx.wait(networkConfig[network.name].blockConfirmations || 1);
			if (!receipt.status) {
				throw Error(`'${descriptorType}' ETHERSCAN dummy implementation tx failed: ${tx.hash}`);
			}
			log(` '${descriptorType}' ETHERSCAN dummy implementation tx completed (${receipt.gasUsed} gas)`);
		} catch (err) {
			const error = err as any;
			log(` '${descriptorType}' ETHERSCAN dummy implementation tx failed: ${error.reason}`);
		}
	} else {
		log(` '${descriptorType}' ETHERSCAN dummy implementation tx already done`);
	}

	//const deployedInit = await deployments.get(deployItemInit.name);
	// const deployedInitContract = await ethers.getContractAt(deployItemInit.artifact, diamondInitializer.address, diamondOwnerSigner);
	// const initAddress = diamond.newlyDeployed ? deployedInitContract.address : zeroAddress;
	// const functionCall = diamond.newlyDeployed
	// 	? deployedInitContract.interface.encodeFunctionData(deployItemInit.functionName, deployItemInit.params)
	// 	: ethers.utils.formatBytes32String("");

	// const tx = await diamondCutContract.diamondCut(cut, initAddress, functionCall);
	// log(`'${descriptorType}' DiamondCut tx hash:`, tx.hash);
	// const receipt = await tx.wait(networkConfig[network.name].blockConfirmations || 1);
	// if (!receipt.status) {
	// 	throw Error(`'${descriptorType}' Diamond cut failed: ${tx.hash}`);
	// }
	// log(`'${descriptorType}' DiamondCut tx completed with ${receipt.gasUsed} gas`);
}

export async function deployDiamondWithDescriptor<TBusinessFacetsEnum extends string>(
	hre: HardhatRuntimeEnvironment,
	descriptorType: string,
	descriptor: DiamondDeploymentDescriptorNew<TBusinessFacetsEnum>,
) {
	return deployDiamondNative(
		hre,
		descriptorType,
		descriptor.diamond,
		descriptor.diamondCutFacet,
		descriptor.initializer,
		descriptor.facets,
		descriptor.diamondDummyImplementation,
	);
}

export async function deployDiamond<TDescriptorType extends string, TBusinessFacetsEnum extends string>(
	hre: HardhatRuntimeEnvironment,
	descriptorType: TDescriptorType,
	getDescriptorFunc: (descriptorType: TDescriptorType) => DiamondDeploymentDescriptorNew<TBusinessFacetsEnum>,
) {
	const descriptor = getDescriptorFunc(descriptorType);
	return deployDiamondNative(
		hre,
		descriptorType,
		descriptor.diamond,
		descriptor.diamondCutFacet,
		descriptor.initializer,
		descriptor.facets,
		descriptor.diamondDummyImplementation,
	);
}
