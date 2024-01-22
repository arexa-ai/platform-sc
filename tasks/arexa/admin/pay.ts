import { subtask, types } from "hardhat/config";
import { arexaScope } from "../arexa.scope";
import { InputAddressValueParams } from "../input.types";

arexaScope
	.task("admin:pay:marketing", "Payout AREXA AI NFT token from Marketing pool")
	.addParam("address", "Address, to paying out the AREXA AI NFT token", undefined, types.string)
	.addParam("value", "Amount of AREXA AI NFT token to pay out", undefined, types.int)
	.setAction(async (params: InputAddressValueParams, hre) => {
		await hre.run("print", { message: `Params: (${params.address}) (${params.value})` });
	});

arexaScope
	.task("admin:pay:development", "Payout AREXA AI NFT token from Development pool")
	.addParam("address", "Address, to paying out the AREXA AI NFT token", undefined, types.string)
	.addParam("value", "Amount of AREXA AI NFT token to pay out", undefined, types.int)
	.setAction(async (params: InputAddressValueParams, hre) => {
		await hre.run("print", { message: `Params: (${params.address}) (${params.value})` });
	});

arexaScope
	.task("admin:pay:others", "Payout AREXA AI NFT token from AREXA INC pool")
	.addParam("address", "Address, to paying out the AREXA AI NFT token", undefined, types.string)
	.addParam("value", "Amount of AREXA AI NFT token to pay out", undefined, types.int)
	.setAction(async (params: InputAddressValueParams, hre) => {
		await hre.run("print", { message: `Params: (${params.address}) (${params.value})` });
	});
