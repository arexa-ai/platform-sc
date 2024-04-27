import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { deployDiamond } from "../deploy-lib/diamond-utils";
import {
	DescriptorTypeToken,
	getArexaTokenDeploymentDescriptor,
} from "../deploy-lib/arexa-token-deployment/arexa-token-deployment-descriptor";

const skip: (env: HardhatRuntimeEnvironment) => Promise<boolean> = async (hre: HardhatRuntimeEnvironment): Promise<boolean> => {
	// const { network } = hre;
	// if (network.name === "hardhat" || network.name === "localhost") {
	// 	return false;
	// }
	// return true;
	return false;
};

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { network } = hre;
	switch (network.name) {
		case "hardhat":
		case "localhost":
			await deployDiamond(hre, DescriptorTypeToken.hRXAI, getArexaTokenDeploymentDescriptor);
			break;
		case "bsctest":
			await deployDiamond(hre, DescriptorTypeToken.bRXAI, getArexaTokenDeploymentDescriptor);
			break;
		case "amoy":
			await deployDiamond(hre, DescriptorTypeToken.pRXAI, getArexaTokenDeploymentDescriptor);
			break;
		case "sepolia":
			await deployDiamond(hre, DescriptorTypeToken.eRXAI, getArexaTokenDeploymentDescriptor);
			break;
		case "bscmain":
			await deployDiamond(hre, DescriptorTypeToken.bRXAI, getArexaTokenDeploymentDescriptor);
			break;
		case "polygon":
			await deployDiamond(hre, DescriptorTypeToken.pRXAI, getArexaTokenDeploymentDescriptor);
			break;
		case "mainnet":
			await deployDiamond(hre, DescriptorTypeToken.eRXAI, getArexaTokenDeploymentDescriptor);
			break;
		default:
			throw new Error("Network not supported yet!");
	}
};

export default deploy;
deploy.skip = skip;
deploy.tags = ["hRXAIDiamond"];
