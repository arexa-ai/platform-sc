import { types } from "hardhat/config";
import { arexaScope } from "../arexa.scope";
import { InputAddressValueParams } from "../input.types";

arexaScope
	.task("admin:payout:ownDivident", "Payout pool divident that belongs to AREXA INC")
	.addParam("address", "Address, to paying out the divident", undefined, types.string)
	.addParam("value", "Amount to pay out", undefined, types.float)
	.setAction(async (params: InputAddressValueParams, hre) => {
		await hre.run("print", { message: `Params: (${params.address}) (${params.value})` });
	});

arexaScope
	.task("admin:payout:ownIncome", "Payout income that belongs to AREXA INC")
	.addParam("address", "Address, to paying out the income", undefined, types.string)
	.addParam("value", "Amount to pay out", undefined, types.float)
	.setAction(async (params: InputAddressValueParams, hre) => {
		await hre.run("print", { message: `Params: (${params.address}) (${params.value})` });
	});
