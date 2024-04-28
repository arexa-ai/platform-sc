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

arexaAdminScope
	.task("token:enableMagic100Buyer", "Enable addresses to buy Magic 100 token")
	.addParam("signer", "Index of Signer", 2, types.int)
	.setAction(async (params: Pick<All, "signer">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const signer = arexa.signers[params.signer];
		const contract = arexa.amlFacet.connect(signer);
		//TODO: fill by hand before calling
		const result = await call(hre, contract.setBatchMagic100FirstBuyerWL(["WrongAccountNumber"], true));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaAdminScope
	.task("token:buy:1-oracle", "Buy ORACLE token by Admin")
	.addParam("signer", "Index of Signer", 2, types.int)
	.addParam("address", "Address who will receive the token", undefined, types.string)
	.addParam("value", "Amount to pay out", undefined, types.float)
	.addParam("discount", "How much dicount percentage. 10000 means 100%, 1 means 0.01%", undefined, types.int)
	.setAction(async (params: Pick<All, "signer" | "address" | "value" | "discount">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.platformAdminFacet.connect(arexa.signers[params.signer]);
		const result = await call(hre, contract.buyOracleSubscriptionAdmin(params.address, params.value, params.discount));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaAdminScope
	.task("token:buy:2-edge", "Buy EDGE token by Admin")
	.addParam("signer", "Index of Signer", 2, types.int)
	.addParam("address", "Address who will receive the token", undefined, types.string)
	.addParam("value", "Amount to pay out", undefined, types.float)
	.addParam("discount", "How much dicount percentage. 10000 means 100%, 1 means 0.01%", undefined, types.int)
	.setAction(async (params: Pick<All, "signer" | "address" | "value" | "discount">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.platformAdminFacet.connect(arexa.signers[params.signer]);
		const result = await call(hre, contract.buyEdgeSubscriptionAdmin(params.address, params.value, params.discount));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaAdminScope
	.task("token:buy:3-trader", "Buy TRADER token by Admin")
	.addParam("signer", "Index of Signer", 2, types.int)
	.addParam("address", "Address who will receive the token", undefined, types.string)
	.addParam("value", "Quantity, how much TRADER token to buy", undefined, types.float)
	.addParam("discount", "How much dicount percentage. 10000 means 100%, 1 means 0.01%", undefined, types.int)
	.setAction(async (params: Pick<All, "signer" | "address" | "value" | "discount">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.platformAdminFacet.connect(arexa.signers[params.signer]);
		const result = await call(hre, contract.buyTraderTokenAdmin(params.address, params.value, arexa.const.QUANTITY, params.discount));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaAdminScope
	.task("token:buy:4-arexa", "Buy AREXA AI token by Admin")
	.addParam("signer", "Index of Signer", 2, types.int)
	.addParam("address", "Address who will receive the token", undefined, types.string)
	.addParam("value", "Quantity, how much AREXA AI token to buy", undefined, types.float)
	.addParam("discount", "How much dicount percentage. 10000 means 100%, 1 means 0.01%", undefined, types.int)
	.setAction(async (params: Pick<All, "signer" | "address" | "value" | "discount">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.platformAdminFacet.connect(arexa.signers[params.signer]);
		const result = await call(hre, contract.buyArexaTokenAdmin(params.address, params.value, arexa.const.QUANTITY, params.discount));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaAdminScope
	.task("token:buy:5-magic", "Buy MAGIC100 AI token by Admin")
	.addParam("signer", "Index of Signer", 2, types.int)
	.addParam("address", "Address who will receive the token", undefined, types.string)
	.addParam("discount", "How much dicount percentage. 10000 means 100%, 1 means 0.01%", undefined, types.int)
	.setAction(async (params: Pick<All, "signer" | "address" | "discount">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.platformAdminFacet.connect(arexa.signers[params.signer]);
		const result = await call(hre, contract.buyMagic100TokenAdmin(params.address, params.discount));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});
