import { subtask, types } from "hardhat/config";
import { arexaScope } from "../arexa.scope";

export type InputRoleAddressParams = {
	role: string;
	address: string;
};

export type InputRoleParams = {
	role: string;
};

arexaScope.task("admin:role:list", "List all roles").setAction(async (taskArgs, hre) => {
	await hre.run("print", { message: `Params: (${taskArgs})` });
});

arexaScope
	.task("admin:role:has", "Check whatever an address has role or not")
	.addParam("role", "Role, to check", undefined, types.string)
	.addParam("address", "Address, that has the rol or not", undefined, types.string)
	.setAction(async (params: InputRoleAddressParams, hre) => {
		await hre.run("print", { message: `Params: (${params.role}) (${params.address})` });
	});

arexaScope
	.task("admin:role:get-admin-role", "Get the admin role of a role. Only with admin role can manipulate roles' member")
	.addParam("role", "Role, to check", undefined, types.string)
	.setAction(async (params: InputRoleParams, hre) => {
		await hre.run("print", { message: `Params: (${params.role})` });
	});

arexaScope
	.task("admin:role:grant", "Grant role to address")
	.addParam("role", "Role, to check", undefined, types.string)
	.addParam("address", "Amount to pay out", undefined, types.float)
	.setAction(async (params: InputRoleAddressParams, hre) => {
		await hre.run("print", { message: `Params: (${params.role}) (${params.address})` });
	});

arexaScope
	.task("admin:role:revoke", "Revoke role from address")
	.addParam("role", "Role, to check", undefined, types.string)
	.addParam("address", "Amount to pay out", undefined, types.float)
	.setAction(async (params: InputRoleAddressParams, hre) => {
		await hre.run("print", { message: `Params: (${params.role}) (${params.address})` });
	});
