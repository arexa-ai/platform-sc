import { types } from "hardhat/config";
import { arexaTokenScope } from "../arexa.scope";
import { All } from "../../utils/input.types";
import { getAREXASmartContracts } from "../../utils/utils";
import { call } from "../../utils/helper.call";

arexaTokenScope
	.task("1-oracle:approve", "Approve a spender to spend some amount of token from your address")
	.addParam("address", "Spender Address, this address can spend on you address", undefined, types.string)
	.addParam("tokenid", "TokenId, this token can send out from you account by the spender", undefined, types.string)
	.addParam("currvalue", "Currently approved value", undefined, types.float)
	.addParam("newvalue", "New value to approve", undefined, types.float)
	.setAction(async (params: Pick<All, "address" | "tokenid" | "currvalue" | "newvalue">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await call(
			hre,
			arexa.pfmTokenAllowanceFacet.approve(params.address, params.tokenid, params.currvalue, params.newvalue),
		);
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaTokenScope.task("1-oracle:current-id", "Get the most current ORACLE subscript token Id").setAction(async (_taskArg, hre) => {
	const arexa = await getAREXASmartContracts(hre);
	const tokenId = await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION1_TOKEN_TYPE);
	await hre.run("print", { message: ` TokenId: ${tokenId}` });
});

arexaTokenScope
	.task("1-oracle:balance", "Gets the balance of an address of a token")
	.addParam("address", "Which address of balance?", undefined, types.string)
	.addParam("tokenid", "Which tokenId balance?", undefined, types.float)
	.setAction(async (params: Pick<All, "address" | "tokenid">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await arexa.pfmTokenFacet.balanceOf(params.address, params.tokenid);
		await hre.run("print", { message: ` address: ${params.address}, tokenId: ${params.tokenid}, balance: ${result.toNumber()}` });
	});

arexaTokenScope
	.task("1-oracle:buy", "Buy ORACLE Subscripton token")
	.addParam("value", "Amount to pay out", undefined, types.float)
	.setAction(async (params: Pick<All, "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await call(hre, arexa.platformFacet.buyOracleSubscription(params.value));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaTokenScope
	.task("1-oracle:transfer", "Transfer ORACLE subscription token")
	.addParam("address", "Sending to address", undefined, types.string)
	.addOptionalParam(
		"tokenid",
		"TokenId, if it is not given, the the most current ORACLE subscripton tokenId will be used",
		null,
		types.string,
	)
	.addParam("value", "Value to send", undefined, types.int)
	.setAction(async (params: Pick<All, "address" | "tokenid" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const tokenId = params.tokenid ?? (await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION1_TOKEN_TYPE));
		const result = await call(
			hre,
			arexa.pfmTokenFacet.safeTransferFrom(arexa.signers[0].address, params.address, tokenId, params.value, ""),
		);
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaTokenScope
	.task("1-oracle:transferFrom", "On behalf trasnfer ORACLE subscription token")
	.addParam("from", "Sending from address", undefined, types.string)
	.addParam("to", "Sending to address", undefined, types.string)
	.addOptionalParam("tokenid", "TokenId, if it is not given, the the most current ORACLE subscripton tokenId is used", null, types.string)
	.addParam("value", "Value to send", undefined, types.float)
	.setAction(async (params: Pick<All, "from" | "to" | "tokenid" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const tokenId = params.tokenid ?? (await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION1_TOKEN_TYPE));
		const result = await call(hre, arexa.pfmTokenFacet.safeTransferFrom(params.from, params.to, tokenId, params.value, ""));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});
