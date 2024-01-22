import { ContractTransaction } from "ethers";
import { networkConfig } from "../../helper-hardhat-config";
import { network } from "hardhat";
//import { expect } from "chai";

export async function call(fn: Promise<ContractTransaction>): Promise<ContractTransaction> {
	const tx = await fn;
	const receipt = await tx.wait(networkConfig[network.name].blockConfirmations || 1);
	//expect(receipt.status).to.be.equal(1);
	if (!receipt.status) {
		throw Error(`Calling failed: ${tx.hash}`);
	}
	return tx;
}
