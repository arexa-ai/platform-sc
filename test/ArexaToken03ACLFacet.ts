import "@nomicfoundation/hardhat-chai-matchers";
import { ethers, deployments } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { namedAccounts } from "../deploy-lib/namedAccounts";
import { ArexaTokenACLFacet, ArexaTokenOwnershipFacet, Diamond } from "../typechain-types";
import {
	DescriptorTypeToken,
	getArexaTokenDeploymentDescriptor,
} from "../deploy-lib/arexa-token-deployment/arexa-token-deployment-descriptor";

describe("ArexaTokenACLFacet", function () {
	async function deployDiamondWithFacet() {
		const accounts = await ethers.getSigners();

		await deployments.fixture(["hRXAIDiamond"]);

		const descriptorToken = getArexaTokenDeploymentDescriptor(DescriptorTypeToken.hRXAI);

		const diamondDeployment = await deployments.get(descriptorToken.diamond.name);

		const tokenACLFacetDefault = (await ethers.getContractAt(
			descriptorToken.facets.aclFacet.artifact,
			diamondDeployment.address,
			accounts[namedAccounts.diamondOwner],
		)) as ArexaTokenACLFacet;

		return {
			accounts,
			diamondAddress: diamondDeployment.address,
			tokenACLFacetDefault,
		};
	}

	it("CheckRoleAdmins", async function () {
		const { accounts, tokenACLFacetDefault } = await loadFixture(deployDiamondWithFacet);

		const tokenACLFacet = tokenACLFacetDefault;

		const TokenAdminRole = await tokenACLFacet.TOKEN_ADMIN_ROLE();
		const TreasuryRole = await tokenACLFacet.TREASURY_ROLE();
		const AMLRole = await tokenACLFacet.AML_ROLE();
		const ComplianceRole = await tokenACLFacet.COMPLIANCE_ROLE();

		const tokenAdmin = await tokenACLFacet.getRoleAdmin(TokenAdminRole);
		expect(tokenAdmin).to.be.equal(TokenAdminRole);

		const treasuryAdminRole = await tokenACLFacet.getRoleAdmin(TreasuryRole);
		expect(treasuryAdminRole).to.be.equal(TokenAdminRole);

		const amlAdminRole = await tokenACLFacet.getRoleAdmin(AMLRole);
		expect(amlAdminRole).to.be.equal(TokenAdminRole);

		const complianceRole = await tokenACLFacet.getRoleAdmin(ComplianceRole);
		expect(complianceRole).to.be.equal(TokenAdminRole);
	});

	it("Grant and revoke token admin", async function () {
		const { accounts, tokenACLFacetDefault } = await loadFixture(deployDiamondWithFacet);

		const tokenACLFacet = tokenACLFacetDefault;

		const TokenAdminRole = await tokenACLFacet.TOKEN_ADMIN_ROLE();

		const grantedAccount = await accounts[namedAccounts.user1].getAddress();

		const grantResult = tokenACLFacet.grantRole(TokenAdminRole, grantedAccount);
		await expect(grantResult).not.to.be.reverted;

		const grantedAccountHasRole = await tokenACLFacet.hasRole(TokenAdminRole, grantedAccount);
		expect(grantedAccountHasRole).to.be.equal(true);

		const revokeResult = tokenACLFacet.revokeRole(TokenAdminRole, grantedAccount);
		await expect(revokeResult).not.to.be.reverted;

		const grantedAccountHasNoRole = await tokenACLFacet.hasRole(TokenAdminRole, grantedAccount);
		expect(grantedAccountHasNoRole).to.be.equal(false);
	});

	it("Revoke owner from roles", async function () {
		const { accounts, tokenACLFacetDefault } = await loadFixture(deployDiamondWithFacet);

		const tokenACLFacet = tokenACLFacetDefault;

		const TokenAdminRole = await tokenACLFacet.TOKEN_ADMIN_ROLE();
		const TreasuryRole = await tokenACLFacet.TREASURY_ROLE();
		const AMLRole = await tokenACLFacet.AML_ROLE();
		const ComplianceRole = await tokenACLFacet.COMPLIANCE_ROLE();

		const owner = await accounts[namedAccounts.diamondOwner].getAddress();

		let hasRole = await tokenACLFacet.hasRole(TokenAdminRole, owner);
		expect(hasRole).to.be.equal(true);

		hasRole = await tokenACLFacet.hasRole(TreasuryRole, owner);
		expect(hasRole).to.be.equal(true);

		hasRole = await tokenACLFacet.hasRole(AMLRole, owner);
		expect(hasRole).to.be.equal(true);

		hasRole = await tokenACLFacet.hasRole(ComplianceRole, owner);
		expect(hasRole).to.be.equal(true);

		let revokeResult = tokenACLFacet.revokeRole(TokenAdminRole, owner);
		await expect(revokeResult).to.be.revertedWith("Role cannot revoke from owner!");

		revokeResult = tokenACLFacet.revokeRole(TreasuryRole, owner);
		await expect(revokeResult).not.to.be.reverted;

		revokeResult = tokenACLFacet.revokeRole(AMLRole, owner);
		await expect(revokeResult).not.to.be.reverted;

		revokeResult = tokenACLFacet.revokeRole(ComplianceRole, owner);
		await expect(revokeResult).not.to.be.reverted;

		hasRole = await tokenACLFacet.hasRole(TokenAdminRole, owner);
		expect(hasRole).to.be.equal(true);

		hasRole = await tokenACLFacet.hasRole(TreasuryRole, owner);
		expect(hasRole).to.be.equal(false);

		hasRole = await tokenACLFacet.hasRole(AMLRole, owner);
		expect(hasRole).to.be.equal(false);

		hasRole = await tokenACLFacet.hasRole(ComplianceRole, owner);
		expect(hasRole).to.be.equal(false);
	});

	it("Roles are set to their defaults after transfering ownership", async function () {
		const { accounts, diamondAddress, tokenACLFacetDefault } = await loadFixture(deployDiamondWithFacet);

		const tokenACLFacet = tokenACLFacetDefault;

		const TokenAdminRole = await tokenACLFacet.TOKEN_ADMIN_ROLE();
		const TreasuryRole = await tokenACLFacet.TREASURY_ROLE();
		const AMLRole = await tokenACLFacet.AML_ROLE();
		const ComplianceRole = await tokenACLFacet.COMPLIANCE_ROLE();

		const owner = await accounts[namedAccounts.diamondOwner].getAddress();

		const grantedAccount = await accounts[namedAccounts.user1].getAddress();

		//Grant Role to grantedAccount
		const grantResult = tokenACLFacet.grantRole(AMLRole, grantedAccount);
		await expect(grantResult).not.to.be.reverted;

		const grantedAccountHasRole = await tokenACLFacet.hasRole(AMLRole, grantedAccount);
		expect(grantedAccountHasRole).to.be.equal(true);

		//check owner roles...
		let hasRole = await tokenACLFacet.hasRole(TokenAdminRole, owner);
		expect(hasRole).to.be.equal(true);

		hasRole = await tokenACLFacet.hasRole(TreasuryRole, owner);
		expect(hasRole).to.be.equal(true);

		hasRole = await tokenACLFacet.hasRole(AMLRole, owner);
		expect(hasRole).to.be.equal(true);

		hasRole = await tokenACLFacet.hasRole(ComplianceRole, owner);
		expect(hasRole).to.be.equal(true);

		//Revoke roles from owner
		let revokeResult = tokenACLFacet.revokeRole(TokenAdminRole, owner);
		await expect(revokeResult).to.be.revertedWith("Role cannot revoke from owner!");

		revokeResult = tokenACLFacet.revokeRole(TreasuryRole, owner);
		await expect(revokeResult).not.to.be.reverted;

		revokeResult = tokenACLFacet.revokeRole(AMLRole, owner);
		await expect(revokeResult).not.to.be.reverted;

		revokeResult = tokenACLFacet.revokeRole(ComplianceRole, owner);
		await expect(revokeResult).not.to.be.reverted;

		//check owner roles...
		hasRole = await tokenACLFacet.hasRole(TokenAdminRole, owner);
		expect(hasRole).to.be.equal(true);

		hasRole = await tokenACLFacet.hasRole(TreasuryRole, owner);
		expect(hasRole).to.be.equal(false);

		hasRole = await tokenACLFacet.hasRole(AMLRole, owner);
		expect(hasRole).to.be.equal(false);

		hasRole = await tokenACLFacet.hasRole(ComplianceRole, owner);
		expect(hasRole).to.be.equal(false);

		//Transfer owner
		const descriptorToken = getArexaTokenDeploymentDescriptor(DescriptorTypeToken.hRXAI);
		const ownershipFacet = (await ethers.getContractAt(
			descriptorToken.facets.ownershipFacet.artifact,
			diamondAddress,
			accounts[namedAccounts.diamondOwner],
		)) as ArexaTokenOwnershipFacet;

		const newOwner = await accounts[namedAccounts.user2].getAddress();
		const result = await ownershipFacet.transferOwnership(newOwner);
		await expect(result).not.to.be.reverted;

		const newOwnerResult = await ownershipFacet.owner();
		expect(newOwnerResult).to.be.equal(newOwner);

		//Check role admin roles to be TokenAdminRole
		let adminRoleStr = await tokenACLFacet.getRoleAdmin(TokenAdminRole);
		expect(adminRoleStr).to.be.equal(TokenAdminRole);

		adminRoleStr = await tokenACLFacet.getRoleAdmin(TreasuryRole);
		expect(adminRoleStr).to.be.equal(TokenAdminRole);

		adminRoleStr = await tokenACLFacet.getRoleAdmin(AMLRole);
		expect(adminRoleStr).to.be.equal(TokenAdminRole);

		adminRoleStr = await tokenACLFacet.getRoleAdmin(ComplianceRole);
		expect(adminRoleStr).to.be.equal(TokenAdminRole);

		//Check that new owner has the correct roles
		hasRole = await tokenACLFacet.hasRole(TokenAdminRole, newOwner);
		expect(hasRole).to.be.equal(true);

		hasRole = await tokenACLFacet.hasRole(TreasuryRole, newOwner);
		expect(hasRole).to.be.equal(true);

		hasRole = await tokenACLFacet.hasRole(AMLRole, newOwner);
		expect(hasRole).to.be.equal(true);

		hasRole = await tokenACLFacet.hasRole(ComplianceRole, newOwner);
		expect(hasRole).to.be.equal(true);
	});
});
