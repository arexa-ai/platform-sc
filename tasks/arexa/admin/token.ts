import { subtask, types } from "hardhat/config";
import { arexaScope } from "../arexa.scope";
import { InputCreateSubscription } from "../input.types";

arexaScope
	.task("admin:token:createOraceSubscription", "Create Oracle subscription")
	.addParam("quantity", "Quantity to create", undefined, types.float)
	.addParam("min", "Minimum price of one subscription token (0 means 1.00 USDT)", undefined, types.float)
	.addParam("max", "Maximum price of one subscription token (0 means no limit)", undefined, types.float)
	.setAction(async (params: InputCreateSubscription, hre) => {
		await hre.run("print", { message: `Params: (${params.quantity}) (${params.min}) (${params.max})` });
	});

arexaScope
	.task("admin:token:createEdgeSubscription", "Create Edge subscription")
	.addParam("quantity", "Quantity to create", undefined, types.float)
	.addParam("min", "Minimum price of one subscription token (0 means 1.00 USDT)", undefined, types.float)
	.addParam("max", "Maximum price of one subscription token (0 means no limit)", undefined, types.float)
	.setAction(async (params: InputCreateSubscription, hre) => {
		await hre.run("print", { message: `Params: (${params.quantity}) (${params.min}) (${params.max})` });
	});
