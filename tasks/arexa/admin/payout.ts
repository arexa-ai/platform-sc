import { types } from "hardhat/config";
import { arexaAdminScope } from "../arexa.scope";
import { All } from "../../utils/input.types";

arexaAdminScope
	.task("payout:ownDivident", "Payout pool divident that belongs to AREXA INC")
	.addParam("address", "Address, to paying out the divident", undefined, types.string)
	.addParam("value", "Amount to pay out", undefined, types.float)
	.setAction(async (params: Pick<All, "address" | "value">, hre) => {
		await hre.run("print", { message: `Params: (${params.address}) (${params.value})` });
	});

arexaAdminScope
	.task("payout:ownIncome", "Payout income that belongs to AREXA INC")
	.addParam("address", "Address, to paying out the income", undefined, types.string)
	.addParam("value", "Amount to pay out", undefined, types.float)
	.setAction(async (params: Pick<All, "address" | "value">, hre) => {
		await hre.run("print", { message: `Params: (${params.address}) (${params.value})` });
	});
