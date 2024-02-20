import { types } from "hardhat/config";
import { arexaAdminScope } from "../arexa.scope";
import { All } from "../../utils/input.types";
import { getAREXASmartContracts } from "../../utils/utils";
import { call } from "../../utils/helper.call";

arexaAdminScope.task("role:list", "List all roles").setAction(async (taskArgs, hre) => {
	const arexa = await getAREXASmartContracts(hre);
	const contract = arexa.aclFacet.connect(arexa.signers[2]);
	const result = await contract.AREXA_ADMIN_ROLE();
	await hre.run("print", { message: `AREXA_ADMIN_ROLE: ${result}` });
});

arexaAdminScope
	.task("role:has", "Check whatever an address has role or not")
	.addParam("role", "Role, to check", undefined, types.string)
	.addParam("address", "Address, that has the rol or not", undefined, types.string)
	.setAction(async (params: Pick<All, "role" | "address">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.aclFacet.connect(arexa.signers[2]);
		const result = await contract.hasRole(params.role, params.address);
		await hre.run("print", { message: `${params.address}, ${params.role}, ${result}` });
	});

arexaAdminScope
	.task("role:get-admin-role", "Get the admin role of a role. Only with admin role can manipulate roles' member")
	.addParam("role", "Role, to check", undefined, types.string)
	.setAction(async (params: Pick<All, "role">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.aclFacet.connect(arexa.signers[2]);
		const result = await contract.getRoleAdmin(params.role);
		await hre.run("print", { message: ` Admin role of ${params.role} is ${result}` });
	});

arexaAdminScope
	.task("role:set-admin-role", "Get the admin role of a role. Only with admin role can manipulate roles' member")
	.addParam("role", "Role, to modify", undefined, types.string)
	.addParam("adminRole", "Admin role, to set", undefined, types.string)
	.setAction(async (params: Pick<All, "role" | "adminRole">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.aclFacet.connect(arexa.signers[2]);
		const result = await call(hre, contract.setRoleAdmin(params.role, params.adminRole));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaAdminScope
	.task("role:grant", "Grant role to address")
	.addParam("role", "Role, to check", undefined, types.string)
	.addParam("address", "Amount to pay out", undefined, types.float)
	.setAction(async (params: Pick<All, "role" | "address">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.aclFacet.connect(arexa.signers[2]);
		const result = await call(hre, contract.grantRole(params.role, params.address));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaAdminScope
	.task("role:revoke", "Revoke role from address")
	.addParam("role", "Role, to check", undefined, types.string)
	.addParam("address", "Amount to pay out", undefined, types.float)
	.setAction(async (params: Pick<All, "role" | "address">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.aclFacet.connect(arexa.signers[2]);
		const result = await call(hre, contract.revokeRole(params.role, params.address));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});
