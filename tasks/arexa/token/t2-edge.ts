import { types } from "hardhat/config";
import { arexaScope } from "../arexa.scope";
import {
	InputAddressTokenId,
	InputAddressTokenIdValueParams,
	InputERC1155AllowanceParams,
	InputFromToAddressTokenIdValueParams,
	InputValueParams,
} from "../input.types";
import { getAREXASmartContracts } from "../../utils/utils";
import { call } from "../../utils/CallHelper";

arexaScope
	.task("token:edge:approve", "Approve a spender to spend some amount of token from your address")
	.addParam("address", "Spender Address, this address can spend on you address", undefined, types.string)
	.addParam("tokenid", "TokenId, this token can send out from you account by the spender", undefined, types.string)
	.addParam("currvalue", "Currently approved value", undefined, types.float)
	.addParam("newvalue", "New value to approve", undefined, types.float)
	.setAction(async (params: InputERC1155AllowanceParams, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await call(
			hre,
			arexa.pfmTokenAllowanceFacet.approve(params.address, params.tokenid, params.currvalue, params.newvalue),
		);
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaScope.task("token:edge:getCurrentTokenId", "Get the most current EDGE subscript token Id").setAction(async (_taskArg, hre) => {
	const arexa = await getAREXASmartContracts(hre);
	const tokenId = await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION2_TOKEN_TYPE);
	await hre.run("print", { message: ` TokenId: ${tokenId}` });
});

arexaScope
	.task("token:edge:balance", "Gets the balance of an address of a token")
	.addParam("address", "Which address of balance?", undefined, types.string)
	.addParam("tokenid", "Which tokenId balance?", undefined, types.float)
	.setAction(async (params: InputAddressTokenId, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await arexa.pfmTokenFacet.balanceOf(params.address, params.tokenid);
		await hre.run("print", { message: ` address: ${params.address}, tokenId: ${params.tokenid}, balance: ${result.toNumber()}` });
	});

arexaScope
	.task("token:edge:buy", "Buy EDGE Subscripton token")
	.addParam("value", "Amount to pay out", undefined, types.float)
	.setAction(async (params: InputValueParams, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await call(hre, arexa.platformFacet.buyOracleSubscription(params.value));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaScope
	.task("token:edge:transfer", "Transfer ORACLE subscription token")
	.addParam("address", "Sending to address", undefined, types.string)
	.addOptionalParam(
		"tokenid",
		"TokenId, if it is not given, the the most current EDGE subscripton tokenId will be used",
		null,
		types.string,
	)
	.addParam("value", "Value to send", undefined, types.int)
	.setAction(async (params: InputAddressTokenIdValueParams, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const tokenId = params.tokenid ?? (await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION2_TOKEN_TYPE));
		const result = await call(
			hre,
			arexa.pfmTokenFacet.safeTransferFrom(arexa.signers[0].address, params.address, tokenId, params.value, ""),
		);
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaScope
	.task("token:edge:transferFrom", "")
	.addParam("from", "Sending from address", undefined, types.string)
	.addParam("to", "Sending to address", undefined, types.string)
	.addOptionalParam(
		"tokenid",
		"TokenId, if it is not given, the the most current EDGE subscripton tokenId will be used",
		null,
		types.string,
	)
	.addParam("value", "Value to send", undefined, types.float)
	.setAction(async (params: InputFromToAddressTokenIdValueParams, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const tokenId = params.tokenid ?? (await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION2_TOKEN_TYPE));
		const result = await call(hre, arexa.pfmTokenFacet.safeTransferFrom(params.from, params.to, tokenId, params.value, ""));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});
