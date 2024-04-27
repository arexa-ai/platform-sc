import { types } from "hardhat/config";
import { arexaAdminScope } from "../arexa.scope";
import { All } from "../../utils/input.types";
import { call } from "../../utils/helper.call";
import { getAREXASmartContracts, getUSDTSmartContracts } from "../../utils/utils";

arexaAdminScope
	.task("payout:ownDivident", "Payout pool divident that belongs to AREXA INC")
	.addParam("address", "Address, to paying out the divident", undefined, types.string)
	.addParam("value", "Amount to pay out", undefined, types.float)
	.setAction(async (params: Pick<All, "address" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const usdt = await getUSDTSmartContracts(hre);
		const contract = arexa.poolPNLFacet.connect(arexa.signers[2]);
		const result = await call(hre, contract.payoutArexaDivident(params.address, params.value * 10 ** usdt.DECIMALS));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaAdminScope
	.task("payout:ownIncome", "Payout income that belongs to AREXA INC")
	.addParam("address", "Address, to paying out the income", undefined, types.string)
	.addParam("value", "Amount to pay out", undefined, types.float)
	.setAction(async (params: Pick<All, "address" | "value">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const usdt = await getUSDTSmartContracts(hre);
		const contract = arexa.poolPNLFacet.connect(arexa.signers[2]);
		const result = await call(hre, contract.payoutArexaIncome(params.address, params.value * 10 ** usdt.DECIMALS));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});
