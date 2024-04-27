import { types } from "hardhat/config";
import { arexaTokenScope } from "../arexa.scope";
import { All } from "../../utils/input.types";
import { getAREXASmartContracts, getUSDTSmartContracts } from "../../utils/utils";
import { call } from "../../utils/helper.call";

/**
DONE npx hardhat arexa token:arexa:approve
npx hardhat arexa token:arexa:approveAll

DONE npx hardhat arexa token:arexa:balance
DONE npx hardhat arexa token:arexa:buy
npx hardhat arexa token:arexa:calcRestriction //token transfer menniyt lehet...
npx hardhat arexa token:arexa:checkRestriction //token transfer menniyt lehet...
npx hardhat arexa token:arexa:calcDivident
npx hardhat arexa token:arexa:transfer //token transfer
npx hardhat arexa token:arexa:transferFrom
npx hardhat arexa token:arexa:payoutDivident
 */

arexaTokenScope
	.task("4-arexa:approve", "Approve a spender to spend some amount of token from your address")
	.addParam("signer", "Index of Signer", undefined, types.int)
	.addParam("address", "Spender Address, this address can spend on you address", undefined, types.string)
	.addParam("currvalue", "Currently approved value", undefined, types.float)
	.addParam("newvalue", "New value to approve", undefined, types.float)
	.setAction(async (params: Pick<All, "signer" | "address" | "currvalue" | "newvalue">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.pfmTokenAllowanceFacet.connect(arexa.signers[params.signer]);
		const result = await call(hre, contract.approve(params.address, arexa.const.AREXA_TOKEN_ID, params.currvalue, params.newvalue));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaTokenScope
	.task("4-arexa:allowance", "Check allowance of a spender to spend some amount of USDT from an address")
	.addParam("spender", "Spender Address, this address can spend on you address", undefined, types.string)
	.addParam("holder", "Holder Address, the spender spend money if this address", undefined, types.string)
	.setAction(async (params: Pick<All, "spender" | "holder">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await arexa.pfmTokenAllowanceFacet.allowance(params.holder, params.spender, arexa.const.AREXA_TOKEN_ID);
		await hre.run("print", {
			message: ` holder: ${params.holder}, spender: ${params.spender}, allowance: ${result.toNumber()}`,
		});
	});

arexaTokenScope
	.task("4-arexa:balance", "Gets the balance of an address of a token")
	.addParam("address", "Which address of balance?", undefined, types.string)
	.setAction(async (params: Pick<All, "address">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await arexa.pfmTokenFacet.balanceOf(params.address, arexa.const.AREXA_TOKEN_ID);
		await hre.run("print", {
			message: ` address: ${params.address}, tokenId: ${arexa.const.AREXA_TOKEN_ID}, balance: ${result.toNumber()}`,
		});
	});

arexaTokenScope
	.task("4-arexa:buy", "Buy AREXA AI token")
	.addParam("signer", "Index of Signer", undefined, types.int)
	.addParam("value", "Quantity, how much AREXA AI token to buy", undefined, types.float)
	.setAction(async (params: Pick<All, "signer" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.platformFacet.connect(arexa.signers[params.signer]);
		const result = await call(hre, contract.buyArexaToken(params.value, arexa.const.QUANTITY));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

// npx hardhat arexa token:arexa:calcRestriction //token transfer menniyt lehet...
// npx hardhat arexa token:arexa:checkRestriction //token transfer menniyt lehet...
// npx hardhat arexa token:arexa:calcDivident

arexaTokenScope
	.task("4-arexa:calc-unrestricted", "Calculate AREXA AI token")
	.addParam("address", "Sending to address", undefined, types.string)
	.addParam("value", "Quantity, how much AREXA AI token to buy", undefined, types.float)
	.setAction(async (params: Pick<All, "address" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await arexa.restrictionFacet.calcUnrestrictedAmount(params.address, arexa.const.AREXA_TOKEN_ID, params.value);
		await hre.run("print", {
			message: ` address: ${params.address}, tokenId: ${arexa.const.AREXA_TOKEN_ID}, ${result.toNumber()} is unrestrected from ${
				params.value
			}`,
		});
	});

arexaTokenScope
	.task("4-arexa:check-restriction", "Check AREXA AI token restriction")
	.addParam("address", "Sending to address", undefined, types.string)
	.addParam("value", "Quantity, how much AREXA AI token to buy", undefined, types.float)
	.setAction(async (params: Pick<All, "address" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await arexa.restrictionFacet.checkRestriction(params.address, arexa.const.AREXA_TOKEN_ID, params.value);
		await hre.run("print", {
			message: ` address: ${params.address}, tokenId: ${arexa.const.AREXA_TOKEN_ID}, ${result} is unrestrected from ${params.value}`,
		});
	});

arexaTokenScope
	.task("4-arexa:transfer", "Transfer AREXA AI token")
	.addParam("signer", "Index of Signer", undefined, types.int)
	.addParam("address", "Sending to address", undefined, types.string)
	.addParam("value", "Value to send", undefined, types.int)
	.setAction(async (params: Pick<All, "signer" | "address" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const signer = arexa.signers[params.signer];
		const contract = arexa.pfmTokenFacet.connect(signer);
		const result = await call(
			hre,
			contract.safeTransferFrom(signer.address, params.address, arexa.const.AREXA_TOKEN_ID, params.value, []),
		);
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaTokenScope
	.task("4-arexa:transferFrom", "On behalf trasnfer AREXA AI subscription token")
	.addParam("signer", "Index of Signer", undefined, types.int)
	.addParam("from", "Sending from address", undefined, types.string)
	.addParam("to", "Sending to address", undefined, types.string)
	.addParam("value", "Value to send", undefined, types.float)
	.setAction(async (params: Pick<All, "signer" | "from" | "to" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const signer = arexa.signers[params.signer];
		const contract = arexa.pfmTokenFacet.connect(signer);
		const result = await call(hre, contract.safeTransferFrom(params.from, params.to, arexa.const.AREXA_TOKEN_ID, params.value, []));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaTokenScope
	.task("4-arexa:payOutDivident", "Payout pool divident that belongs to the user")
	.addParam("signer", "Index of Signer", undefined, types.int)
	.addParam("value", "Amount to pay out", undefined, types.float)
	.setAction(async (params: Pick<All, "signer" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const usdt = await getUSDTSmartContracts(hre);
		const contract = arexa.poolPNLFacet.connect(arexa.signers[params.signer]);
		const result = await call(hre, contract.payoutDivident(params.value * 10 ** usdt.DECIMALS));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});
