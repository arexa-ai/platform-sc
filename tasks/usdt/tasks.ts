import { scope, types } from "hardhat/config";
import { All } from "../utils/input.types";
import { call } from "../utils/helper.call";
import { getUSDTSmartContracts } from "../utils/utils";
import { usdtScope } from "./usdt.scope";

usdtScope
	.task("approve", "Approve a spender to spend some amount of USDT from your address")
	.addParam("signer", "Index of Signer", undefined, types.int)
	.addParam("address", "Spender Address, this address can spend on you address", undefined, types.string)
	.addParam("value", "New value to approve", undefined, types.float)
	.setAction(async (params: Pick<All, "signer" | "address" | "value">, hre) => {
		const usdt = await getUSDTSmartContracts(hre);
		const signer = usdt.signers[params.signer];
		const contract = usdt.tokenFacet.connect(signer);
		const result = await call(hre, contract.approve(params.address, params.value * 10 ** usdt.DECIMALS));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

usdtScope
	.task("allowance", "Check allowance of a spender to spend some amount of USDT from an address")
	.addParam("signer", "Index of Signer", 2, types.int)
	.addParam("spender", "Spender Address, this address can spend on you address", undefined, types.string)
	.addParam("holder", "Holder Address, the spender spend money if this address", undefined, types.string)
	.setAction(async (params: Pick<All, "signer" | "spender" | "holder">, hre) => {
		const usdt = await getUSDTSmartContracts(hre);
		const signer = usdt.signers[params.signer];
		const contract = usdt.tokenFacet.connect(signer);
		const result = await contract.allowance(params.holder, params.spender);
		await hre.run("print", {
			message: ` holder: ${params.holder}, spender: ${params.spender}, allowance: ${result.toNumber() / 10 ** usdt.DECIMALS}`,
		});
	});

usdtScope
	.task("mint", "Mint some USDT token, of course it will work only on test networks ;)")
	.addParam("signer", "Index of Signer", undefined, types.int)
	.addParam("address", "Spender Address, this address can spend on you address", undefined, types.string)
	.addParam("value", "New value to approve", undefined, types.float)
	.setAction(async (params: Pick<All, "signer" | "address" | "value">, hre) => {
		const usdt = await getUSDTSmartContracts(hre);
		const signer = usdt.signers[params.signer];
		const contract = usdt.tokenFacet.connect(signer);
		const result = await call(hre, contract.mint(params.address, params.value * 10 ** usdt.DECIMALS));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

usdtScope
	.task("balance", "Gets the balance of an address")
	.addParam("signer", "Index of Signer", 2, types.int)
	.addParam("address", "Which address of balance?", undefined, types.string)
	.setAction(async (params: Pick<All, "signer" | "address">, hre) => {
		const usdt = await getUSDTSmartContracts(hre);
		const signer = usdt.signers[params.signer];
		const contract = usdt.tokenFacet.connect(signer);
		const result = await contract.balanceOf(params.address);
		await hre.run("print", { message: ` address: ${params.address}, balance: ${result.toNumber() / 10 ** usdt.DECIMALS}` });
	});

usdtScope
	.task("transfer", "Transfer USDT")
	.addParam("signer", "Index of Signer", undefined, types.int)
	.addParam("address", "Sending to address", undefined, types.string)
	.addParam("value", "Value to send", undefined, types.int)
	.setAction(async (params: Pick<All, "signer" | "address" | "value">, hre) => {
		const usdt = await getUSDTSmartContracts(hre);
		const signer = usdt.signers[params.signer];
		const contract = usdt.tokenFacet.connect(signer);
		const result = await call(hre, contract.transfer(params.address, params.value * 10 ** usdt.DECIMALS));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

usdtScope
	.task("transferFrom", "On behalf transfer USDT")
	.addParam("signer", "Index of Signer", undefined, types.int)
	.addParam("from", "Sending from address", undefined, types.string)
	.addParam("to", "Sending to address", undefined, types.string)
	.addParam("value", "Value to send", undefined, types.float)
	.setAction(async (params: Pick<All, "signer" | "from" | "to" | "value">, hre) => {
		const usdt = await getUSDTSmartContracts(hre);
		const signer = usdt.signers[params.signer];
		const contract = usdt.tokenFacet.connect(signer);
		const result = await call(hre, contract.transferFrom(params.from, params.to, params.value * 10 ** usdt.DECIMALS));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});
