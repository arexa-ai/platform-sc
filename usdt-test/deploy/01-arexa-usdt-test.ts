import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { deployUSDT } from "../deploy-lib/diamond-utils";

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
			await deployUSDT(hre);
			break;
		case "bsctest":
			await deployUSDT(hre);
			break;
		case "mumbai":
			await deployUSDT(hre);
			break;
		case "goerli":
			await deployUSDT(hre);
			break;
		case "bscmain":
		case "polygon":
		case "mainnet":
			break;
		default:
			throw new Error("Network not supported yet!");
	}
};

export default deploy;
deploy.skip = skip;
deploy.tags = ["hUSDT"];
