import { scope, types } from "hardhat/config";
import { All } from "../utils/input.types";
import { call } from "../utils/helper.call";
import { getUSDTSmartContracts } from "../utils/utils";
import { usdtScope } from "./usdt.scope";

usdtScope
	.task("approve", "Approve a spender to spend some amount of USDT from your address")
	.addParam("address", "Spender Address, this address can spend on you address", undefined, types.string)
	.addParam("value", "New value to approve", undefined, types.float)
	.setAction(async (params: Pick<All, "address" | "value">, hre) => {
		const usdt = await getUSDTSmartContracts(hre);
		const contract = usdt.tokenFacet.connect(usdt.ownerSigner);
		const result = await call(hre, contract.approve(params.address, params.value * 10 ** usdt.DECIMALS));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

usdtScope
	.task("mint", "Mint some USDT token, of course it will work only on test networks ;)")
	.addParam("address", "Spender Address, this address can spend on you address", undefined, types.string)
	.addParam("value", "New value to approve", undefined, types.float)
	.setAction(async (params: Pick<All, "address" | "value">, hre) => {
		const usdt = await getUSDTSmartContracts(hre);
		const contract = usdt.tokenFacet.connect(usdt.ownerSigner);
		const result = await call(hre, contract.mint(params.address, params.value * 10 ** usdt.DECIMALS));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

usdtScope
	.task("balance", "Gets the balance of an address")
	.addParam("address", "Which address of balance?", undefined, types.string)
	.setAction(async (params: Pick<All, "address">, hre) => {
		const usdt = await getUSDTSmartContracts(hre);
		const contract = usdt.tokenFacet.connect(usdt.ownerSigner);
		const result = await contract.balanceOf(params.address);
		await hre.run("print", { message: ` address: ${params.address}, balance: ${result.toNumber() / 10 ** usdt.DECIMALS}` });
	});

usdtScope
	.task("transfer", "Transfer USDT")
	.addParam("address", "Sending to address", undefined, types.string)
	.addParam("value", "Value to send", undefined, types.int)
	.setAction(async (params: Pick<All, "address" | "value">, hre) => {
		const usdt = await getUSDTSmartContracts(hre);
		const contract = usdt.tokenFacet.connect(usdt.ownerSigner);
		const result = await call(hre, contract.transfer(params.address, params.value * 10 ** usdt.DECIMALS));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

usdtScope
	.task("transferFrom", "On behalf transfer USDT")
	.addParam("from", "Sending from address", undefined, types.string)
	.addParam("to", "Sending to address", undefined, types.string)
	.addParam("value", "Value to send", undefined, types.float)
	.setAction(async (params: Pick<All, "from" | "to" | "value">, hre) => {
		const usdt = await getUSDTSmartContracts(hre);
		const contract = usdt.tokenFacet.connect(usdt.ownerSigner);
		const result = await call(hre, contract.transferFrom(params.from, params.to, params.value * 10 ** usdt.DECIMALS));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});
