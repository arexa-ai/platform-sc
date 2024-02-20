import { types } from "hardhat/config";
import { arexaAdminScope } from "../arexa.scope";
import { All } from "../../utils/input.types";
import { call } from "../../utils/helper.call";
import { getAREXASmartContracts } from "../../utils/utils";

arexaAdminScope
	.task("pay:marketing", "Payout AREXA AI NFT token from Marketing pool")
	.addParam("address", "Address, to paying out the AREXA AI NFT token", undefined, types.string)
	.addParam("value", "Amount of AREXA AI NFT token to pay out", undefined, types.int)
	.setAction(async (params: Pick<All, "address" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.platformAdminFacet.connect(arexa.signers[2]);
		const result = await call(hre, contract.payArexaTokenFromPool(arexa.const.POOL_MARKETING, params.address, params.value));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaAdminScope
	.task("pay:development", "Payout AREXA AI NFT token from Development pool")
	.addParam("address", "Address, to paying out the AREXA AI NFT token", undefined, types.string)
	.addParam("value", "Amount of AREXA AI NFT token to pay out", undefined, types.int)
	.setAction(async (params: Pick<All, "address" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.platformAdminFacet.connect(arexa.signers[2]);
		const result = await call(hre, contract.payArexaTokenFromPool(arexa.const.POOL_DEVELOPMENT, params.address, params.value));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaAdminScope
	.task("pay:others", "Payout AREXA AI NFT token from AREXA INC pool")
	.addParam("address", "Address, to paying out the AREXA AI NFT token", undefined, types.string)
	.addParam("value", "Amount of AREXA AI NFT token to pay out", undefined, types.int)
	.setAction(async (params: Pick<All, "address" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.platformAdminFacet.connect(arexa.signers[2]);
		const result = await call(hre, contract.payArexaTokenFromPool(arexa.const.POOL_AREXAINC, params.address, params.value));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});
