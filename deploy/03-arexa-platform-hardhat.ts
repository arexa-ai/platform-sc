import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { deployDiamond, deployDiamondWithDescriptor } from "../deploy-lib/diamond-utils";
import {
	ArexaInitParams,
	DescriptorTypeArexa,
	getArexaDeploymentDescriptor,
} from "../deploy-lib/arexa-platform-deployment/arexa-deployment-descriptor";
import { zeroAddress } from "../deploy-lib/utils";

const skip: (env: HardhatRuntimeEnvironment) => Promise<boolean> = async (hre: HardhatRuntimeEnvironment): Promise<boolean> => {
	// const { network } = hre;
	// if (network.name === "hardhat" || network.name === "localhost") {
	// 	return false;
	// }
	// return true;
	return false;
};

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	let descriptorType = DescriptorTypeArexa.hAREXA;
	let usdtDeploymentName = "hUSDTDiamond";
	let rxaiDeploymentName = "hRXAIDiamond";
	const { network } = hre;
	switch (network.name) {
		case "hardhat":
		case "localhost":
			break;
		case "bsctest":
			descriptorType = DescriptorTypeArexa.btAREXA;
			usdtDeploymentName = "bUSDTDiamond";
			rxaiDeploymentName = "bRXAIDiamond";
			break;
		case "amoy":
			descriptorType = DescriptorTypeArexa.ptAREXA;
			usdtDeploymentName = "pUSDTDiamond";
			rxaiDeploymentName = "pRXAIDiamond";
			break;
		case "sepolia":
			usdtDeploymentName = "eUSDTDiamond";
			rxaiDeploymentName = "eRXAIDiamond";
			descriptorType = DescriptorTypeArexa.etAREXA;
			break;
		case "bscmain":
			usdtDeploymentName = "";
			rxaiDeploymentName = "bRXAIDiamond";
			descriptorType = DescriptorTypeArexa.bAREXA;
			break;
		case "polygon":
			usdtDeploymentName = "";
			rxaiDeploymentName = "pRXAIDiamond";
			descriptorType = DescriptorTypeArexa.pAREXA;
			break;
		case "mainnet":
			usdtDeploymentName = "";
			rxaiDeploymentName = "eRXAIDiamond";
			descriptorType = DescriptorTypeArexa.eAREXA;
			break;
		default:
			throw new Error("Network not supported yet!");
	}
	const descriptor = getArexaDeploymentDescriptor(descriptorType);
	if ((descriptor.initializer.params[0] as string) == zeroAddress) {
		//meg kell keresni
		const erc20USDT = await hre.deployments.get(usdtDeploymentName);
		descriptor.initializer.params[0] = erc20USDT.address;
	}
	if ((descriptor.initializer.params[1] as string) == zeroAddress) {
		//meg kell keresni
		const erc20RXAI = await hre.deployments.get(rxaiDeploymentName);
		descriptor.initializer.params[1] = erc20RXAI.address;
	}
	await deployDiamondWithDescriptor(hre, descriptorType, descriptor);
};

export default deploy;
deploy.skip = skip;
deploy.tags = ["hArexaPlatformDiamond"];
deploy.dependencies = ["hRXAIDiamond", "hUSDTDiamond"];
