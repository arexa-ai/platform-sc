import { types } from "hardhat/config";
import { arexaTokenScope } from "../arexa.scope";
import { All } from "../../utils/input.types";
import { getAREXASmartContracts } from "../../utils/utils";
import { call } from "../../utils/helper.call";

arexaTokenScope
	.task("3-trader:approve", "Approve a spender to spend some amount of token from your address")
	.addParam("signer", "Index of Signer", undefined, types.int)
	.addParam("address", "Spender Address, this address can spend on you address", undefined, types.string)
	.addParam("currvalue", "Currently approved value", undefined, types.float)
	.addParam("newvalue", "New value to approve", undefined, types.float)
	.setAction(async (params: Pick<All, "signer" | "address" | "currvalue" | "newvalue">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.pfmTokenAllowanceFacet.connect(arexa.signers[params.signer]);
		const result = await call(hre, contract.approve(params.address, arexa.const.TRDAER_TOKEN_ID, params.currvalue, params.newvalue));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaTokenScope
	.task("3-trader:allowance", "Check allowance of a spender to spend some amount of USDT from an address")
	.addParam("spender", "Spender Address, this address can spend on you address", undefined, types.string)
	.addParam("holder", "Holder Address, the spender spend money if this address", undefined, types.string)
	.setAction(async (params: Pick<All, "spender" | "holder">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await arexa.pfmTokenAllowanceFacet.allowance(params.holder, params.spender, arexa.const.TRDAER_TOKEN_ID);
		await hre.run("print", {
			message: ` holder: ${params.holder}, spender: ${params.spender}, allowance: ${result.toNumber()}`,
		});
	});

arexaTokenScope
	.task("3-trader:balance", "Gets the balance of an address of a token")
	.addParam("address", "Which address of balance?", undefined, types.string)
	.setAction(async (params: Pick<All, "address">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await arexa.pfmTokenFacet.balanceOf(params.address, arexa.const.TRDAER_TOKEN_ID);
		await hre.run("print", {
			message: ` address: ${params.address}, tokenId: ${arexa.const.AREXA_TOKEN_ID}, balance: ${result.toNumber()}`,
		});
	});

arexaTokenScope
	.task("3-trader:buy", "Buy TRADER token")
	.addParam("signer", "Index of Signer", undefined, types.int)
	.addParam("value", "Quantity, how much TRADER token to buy", undefined, types.float)
	.setAction(async (params: Pick<All, "signer" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.platformFacet.connect(arexa.signers[params.signer]);
		const result = await call(hre, contract.buyTraderToken(params.value, arexa.const.QUANTITY));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaTokenScope
	.task("3-trader:transfer", "Transfer TRADER token")
	.addParam("signer", "Index of Signer", undefined, types.int)
	.addParam("address", "Sending to address", undefined, types.string)
	.addParam("value", "Value to send", undefined, types.int)
	.setAction(async (params: Pick<All, "signer" | "address" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const signer = arexa.signers[params.signer];
		const contract = arexa.pfmTokenFacet.connect(signer);
		const result = await call(
			hre,
			contract.safeTransferFrom(signer.address, params.address, arexa.const.TRDAER_TOKEN_ID, params.value, []),
		);
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaTokenScope
	.task("3-trader:transferFrom", "On behalf trasnfer TRADER token")
	.addParam("signer", "Index of Signer", undefined, types.int)
	.addParam("from", "Sending from address", undefined, types.string)
	.addParam("to", "Sending to address", undefined, types.string)
	.addParam("value", "Value to send", undefined, types.float)
	.setAction(async (params: Pick<All, "signer" | "from" | "to" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const signer = arexa.signers[params.signer];
		const contract = arexa.pfmTokenFacet.connect(signer);
		const result = await call(hre, contract.safeTransferFrom(params.from, params.to, arexa.const.TRDAER_TOKEN_ID, params.value, []));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});
