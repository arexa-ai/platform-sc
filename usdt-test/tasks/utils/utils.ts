import { namedAccounts } from "../../deploy-lib/namedAccounts";
import { zeroAddress } from "../../deploy-lib/utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { erc20Abi } from "./abi.erc20";
import { TetherToken } from "../../typechain-types";

export async function getUSDTSmartContracts(hre: HardhatRuntimeEnvironment) {
	const { network, ethers, deployments } = hre;
	const signers = await ethers.getSigners();

	console.log(`Network: ${network.name}`);

	const deployment = await deployments.get(`${network.name}TetherToken`);

	const usdtToken = (await ethers.getContractAt(deployment.abi, deployment.address)) as TetherToken;
	const decimals = await usdtToken.decimals();
	return {
		signers: signers,
		namedAccounts: namedAccounts,
		deployerSigner: signers[namedAccounts.deployer],
		deployerSignerAddress: signers[namedAccounts.deployer].address,
		ownerSigner: signers[namedAccounts.diamondOwner],
		ownerSignerAddress: signers[namedAccounts.diamondOwner].address,
		usdtAddress: deployment.address,
		tokenFacet: usdtToken as TetherToken,
		DECIMALS: decimals as unknown as number,
	};
}
