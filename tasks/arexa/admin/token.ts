import { types } from "hardhat/config";
import { arexaAdminScope } from "../arexa.scope";
import { All } from "../../utils/input.types";
import { getAREXASmartContracts } from "../../utils/utils";
import { call } from "../../utils/helper.call";

arexaAdminScope
	.task("token:create-1-orace", "Create Oracle subscription")
	.addParam("year", "Year of the token", undefined, types.float)
	.addParam("month", "Month of the token", undefined, types.float)
	.addParam("quantity", "Quantity to create", undefined, types.float)
	.addParam("min", "Minimum price of one subscription token (0 means 1.00 USDT)", undefined, types.float)
	.addParam("max", "Maximum price of one subscription token (0 means no limit)", undefined, types.float)
	.setAction(async (params: Pick<All, "year" | "month" | "quantity" | "min" | "max">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.platformAdminFacet.connect(arexa.signers[2]);
		const result = await call(
			hre,
			contract.createSubscription(
				arexa.const.SUBSRIPTION1_TOKEN_TYPE,
				params.year,
				params.month,
				params.quantity,
				params.min,
				params.max,
			),
		);
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaAdminScope
	.task("token:create-2-edge", "Create Edge subscription")
	.addParam("year", "Year of the token", undefined, types.float)
	.addParam("month", "Month of the token", undefined, types.float)
	.addParam("quantity", "Quantity to create", undefined, types.float)
	.addParam("min", "Minimum price of one subscription token (0 means 1.00 USDT)", undefined, types.float)
	.addParam("max", "Maximum price of one subscription token (0 means no limit)", undefined, types.float)
	.setAction(async (params: Pick<All, "year" | "month" | "quantity" | "min" | "max">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.platformAdminFacet.connect(arexa.signers[2]);
		const result = await call(
			hre,
			contract.createSubscription(
				arexa.const.SUBSRIPTION2_TOKEN_TYPE,
				params.year,
				params.month,
				params.quantity,
				params.min,
				params.max,
			),
		);
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});
