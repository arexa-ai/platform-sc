import { types } from "hardhat/config";
import { arexaInfoScope } from "../arexa.scope";
import { All } from "../../utils/input.types";
import { call } from "../../utils/helper.call";
import { getAREXASmartContracts, getUSDTSmartContracts } from "../../utils/utils";

arexaInfoScope
	.task("get-income-params", "Get the income paramteres for a give token")
	.addParam("tokenid", "TokenId", undefined, types.string)
	.setAction(async (params: Pick<All, "tokenid">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const result = await arexa.poolPNLFacet.getArexaIncomeParameter(params.tokenid);
		await hre.run("print", {
			message: ` pool: ${result.pool}, arexa: ${result.arexa}`,
		});
	});

arexaInfoScope.task("get-pool-income-balances", "Get the balances of the bool and the platform").setAction(async (_params, hre) => {
	const arexa = await getAREXASmartContracts(hre);
	const usdt = await getUSDTSmartContracts(hre);
	const result = await arexa.poolPNLFacet.getPoolAndArexaIncomeBalances();
	await hre.run("print", {
		message: ` poolIn: ${result.pool.div(10 ** usdt.DECIMALS)}, poolOut: ${result.poolPaidOut.div(
			10 ** usdt.DECIMALS,
		)}, SUM: ${result.pool.sub(result.poolPaidOut).div(10 ** usdt.DECIMALS)}`,
	});
	await hre.run("print", {
		message: ` arexaIn: ${result.arexa.div(10 ** usdt.DECIMALS)}, arexaOut: ${result.arexaPaidOut.div(
			10 ** usdt.DECIMALS,
		)}, SUM: ${result.arexa.sub(result.arexaPaidOut).div(10 ** usdt.DECIMALS)}`,
	});
});

arexaInfoScope.task("get-inventory", "Get the income paramteres for a give token").setAction(async (_params, hre) => {
	const arexa = await getAREXASmartContracts(hre);
	const usdt = await getUSDTSmartContracts(hre);
	const result = await arexa.poolPNLFacet.getInventory();
	await hre.run("print", {
		message: ` isEnabled: ${result.isEnabled}, sumQuantity: ${result.sumQuantity}, sumAmount ${result.sumAmount.div(
			10 ** usdt.DECIMALS,
		)}, sumPnl ${result.sumPnl.div(10 ** usdt.DECIMALS)}`,
	});
});

arexaInfoScope
	.task("get-inventoryItem", "Get the income paramteres for a give token")
	.addParam("address", "address", undefined, types.string)
	.setAction(async (params: Pick<All, "address">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const usdt = await getUSDTSmartContracts(hre);
		const result = await arexa.poolPNLFacet.getInventoryItem(params.address);
		await hre.run("print", {
			message: ` quantity: ${result.quantity}, deltaPnl: ${result.deltaPnl.div(10 ** usdt.DECIMALS)}, payedPnl ${result.payedPnl.div(
				10 ** usdt.DECIMALS,
			)}`,
		});
	});
