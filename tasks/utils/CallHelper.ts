import { ContractTransaction } from "ethers";
import { networkConfig } from "../../helper-hardhat-config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export async function call(hre: HardhatRuntimeEnvironment, fn: Promise<ContractTransaction>): Promise<ContractTransaction> {
	const tx = await fn;
	const receipt = await tx.wait(networkConfig[hre.network.name].blockConfirmations || 1);
	//expect(receipt.status).to.be.equal(1);
	if (!receipt.status) {
		throw new Error(`Calling failed: ${tx.hash}`);
	}
	return tx;
}
