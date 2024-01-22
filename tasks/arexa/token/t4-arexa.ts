import { types } from "hardhat/config";
import { arexaScope } from "../arexa.scope";
import {
	InputAddressParams,
	InputAddressTokenId,
	InputAddressTokenIdValueParams,
	InputERC1155Allowance2Params,
	InputERC1155AllowanceParams,
	InputFromToAddressTokenIdValueParams,
	InputValueParams,
} from "../input.types";
import { getAREXASmartContracts } from "../../utils/utils";
import { call } from "../../utils/CallHelper";

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

arexaScope
	.task("token:arexa:approve", "Approve a spender to spend some amount of token from your address")
	.addParam("address", "Spender Address, this address can spend on you address", undefined, types.string)
	.addParam("currvalue", "Currently approved value", undefined, types.float)
	.addParam("newvalue", "New value to approve", undefined, types.float)
	.setAction(async (params: InputERC1155Allowance2Params, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await call(
			hre,
			arexa.pfmTokenAllowanceFacet.approve(params.address, arexa.const.AREXA_TOKEN_ID, params.currvalue, params.newvalue),
		);
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaScope
	.task("token:arexa:balance", "Gets the balance of an address of a token")
	.addParam("address", "Which address of balance?", undefined, types.string)
	.setAction(async (params: InputAddressParams, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await arexa.pfmTokenFacet.balanceOf(params.address, arexa.const.AREXA_TOKEN_ID);
		await hre.run("print", {
			message: ` address: ${params.address}, tokenId: ${arexa.const.AREXA_TOKEN_ID}, balance: ${result.toNumber()}`,
		});
	});

arexaScope
	.task("token:arexa:buy", "Buy AREXA AI token")
	.addParam("value", "Quantity, how much AREXA AI token to buy", undefined, types.float)
	.setAction(async (params: InputValueParams, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await call(hre, arexa.platformFacet.buyArexaToken(params.value, arexa.const.QUANTITY));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaScope
	.task("token:arexa:transfer", "Transfer AREXA subscription token")
	.addParam("address", "Sending to address", undefined, types.string)
	.addOptionalParam(
		"tokenid",
		"TokenId, if it is not given, the the most current AREXA subscripton tokenId will be used",
		null,
		types.string,
	)
	.addParam("value", "Value to send", undefined, types.int)
	.setAction(async (params: InputAddressTokenIdValueParams, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const tokenId = params.tokenid ?? (await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION1_TOKEN_TYPE));
		const result = await call(
			hre,
			arexa.pfmTokenFacet.safeTransferFrom(arexa.signers[0].address, params.address, tokenId, params.value, ""),
		);
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaScope
	.task("token:arexa:transferFrom", "")
	.addParam("from", "Sending from address", undefined, types.string)
	.addParam("to", "Sending to address", undefined, types.string)
	.addOptionalParam(
		"tokenid",
		"TokenId, if it is not given, the the most current AREXA subscripton tokenId will be used",
		null,
		types.string,
	)
	.addParam("value", "Value to send", undefined, types.float)
	.setAction(async (params: InputFromToAddressTokenIdValueParams, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const tokenId = params.tokenid ?? (await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION1_TOKEN_TYPE));
		const result = await call(hre, arexa.pfmTokenFacet.safeTransferFrom(params.from, params.to, tokenId, params.value, ""));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});
