import { Contract } from "ethers";
import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment, Network } from "hardhat/types";
import { networkConfig } from "../helper-hardhat-config";
import { zeroAddress } from "./utils";
import { DiamondDeploymentInit, DeploymentItem } from "./deployment-descriptors";
import { Address, DeployResult, DeploymentsExtension } from "hardhat-deploy/types";
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

export async function deployUSDT(hre: HardhatRuntimeEnvironment) {
	const { getNamedAccounts, deployments, network } = hre;
	const { deploy, log } = deployments;
	const { deployer, diamondOwner } = await getNamedAccounts();
	const deploymentItem: DeploymentItem = { name: `${network.name}TetherToken`, artifact: "TetherToken" };
	const diamond = await deployItem(network, deployments, deployer, deploymentItem, [0, `${network.name}"TetherToken"`, "tUSDT", 6]);
}
