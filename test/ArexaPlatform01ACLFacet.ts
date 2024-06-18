import "@nomicfoundation/hardhat-chai-matchers";
import { ethers } from "hardhat";
import { time, mine, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { namedAccounts } from "../deploy-lib/namedAccounts";
import { ArexaTokenOwnershipFacet } from "../typechain-types";
import { deployDiamond } from "./ArexaPlatform";
import { utils } from "ethers";

describe("ArexaPlatformACLFacet", function () {
	it("CheckRoleAdmins", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const tokenACLFacet = arexa.aclFacet;

		const TokenAdminRole = await tokenACLFacet.AREXA_ADMIN_ROLE();

		const tokenAdmin = await tokenACLFacet.getRoleAdmin(TokenAdminRole);
		expect(tokenAdmin).to.be.equal(TokenAdminRole);
	});

	it("SetRoleAdminRole", async function () {
		const { accounts, user1, user2, owner, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const tokenACLFacet = arexa.aclFacet.connect(owner);

		const TokenAdminRole = await tokenACLFacet.AREXA_ADMIN_ROLE();

		const NewAdminRole = utils.keccak256(utils.toUtf8Bytes("TEST_ADMIN_ROLE"));

		const setRoleAdminRole = await tokenACLFacet.setRoleAdmin(TokenAdminRole, NewAdminRole);
		await expect(setRoleAdminRole).not.to.be.reverted;

		const tokenAdmin = await tokenACLFacet.getRoleAdmin(TokenAdminRole);
		expect(tokenAdmin).to.be.equal(NewAdminRole);
	});

	it("Grant and revoke token admin", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const tokenACLFacet = arexa.aclFacet.connect(accounts[namedAccounts.diamondOwner]);

		const TokenAdminRole = await tokenACLFacet.AREXA_ADMIN_ROLE();

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

	it("Grant and renounce token admin role", async function () {
		const { accounts, user1, user2, owner, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const tokenACLFacetOwner = arexa.aclFacet.connect(owner);
		const tokenACLFacetUser1 = arexa.aclFacet.connect(user1);
		const grantedAccount = await user1.getAddress();

		const TokenAdminRole = await tokenACLFacetOwner.AREXA_ADMIN_ROLE();

		const grantResult = tokenACLFacetOwner.grantRole(TokenAdminRole, grantedAccount);
		await expect(grantResult).not.to.be.reverted;

		const grantedAccountHasRole = await tokenACLFacetOwner.hasRole(TokenAdminRole, grantedAccount);
		expect(grantedAccountHasRole).to.be.equal(true);

		const revokeResult = tokenACLFacetUser1.renounceRole(TokenAdminRole);
		await expect(revokeResult).not.to.be.reverted;

		const grantedAccountHasNoRole = await tokenACLFacetOwner.hasRole(TokenAdminRole, grantedAccount);
		expect(grantedAccountHasNoRole).to.be.equal(false);
	});

	it("Cannot revoke owner from roles", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const tokenACLFacet = arexa.aclFacet.connect(accounts[namedAccounts.diamondOwner]);
		const TokenAdminRole = await tokenACLFacet.AREXA_ADMIN_ROLE();

		const owner = await accounts[namedAccounts.diamondOwner].getAddress();

		let hasRole = await tokenACLFacet.hasRole(TokenAdminRole, owner);
		expect(hasRole).to.be.equal(true);

		let revokeResult = tokenACLFacet.revokeRole(TokenAdminRole, owner);
		await expect(revokeResult).to.be.revertedWith("Role cannot revoke from owner!");

		hasRole = await tokenACLFacet.hasRole(TokenAdminRole, owner);
		expect(hasRole).to.be.equal(true);
	});

	it("Roles are set to their defaults after transfering ownership", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const tokenACLFacet = arexa.aclFacet.connect(accounts[namedAccounts.diamondOwner]);
		const TokenAdminRole = await tokenACLFacet.AREXA_ADMIN_ROLE();

		const oldOwner = await accounts[namedAccounts.diamondOwner].getAddress();

		const grantedAccount = await accounts[namedAccounts.user1].getAddress();

		//Grant Role to grantedAccount
		const grantResult = tokenACLFacet.grantRole(TokenAdminRole, grantedAccount);
		await expect(grantResult).not.to.be.reverted;

		const grantedAccountHasRole = await tokenACLFacet.hasRole(TokenAdminRole, grantedAccount);
		expect(grantedAccountHasRole).to.be.equal(true);

		//check owner roles...
		let hasRole = await tokenACLFacet.hasRole(TokenAdminRole, oldOwner);
		expect(hasRole).to.be.equal(true);

		//Revoke roles from owner
		let revokeResult = tokenACLFacet.revokeRole(TokenAdminRole, oldOwner);
		await expect(revokeResult).to.be.revertedWith("Role cannot revoke from owner!");

		//check owner roles...
		hasRole = await tokenACLFacet.hasRole(TokenAdminRole, oldOwner);
		expect(hasRole).to.be.equal(true);

		//Transfer owner
		const ownershipFacet = arexa.ownershipFacet.connect(accounts[namedAccounts.diamondOwner]);

		const newOwner = await accounts[namedAccounts.user2].getAddress();
		const result = await ownershipFacet.transferOwnership(newOwner);
		await expect(result).not.to.be.reverted;

		const newOwnerResult = await ownershipFacet.owner();
		expect(newOwnerResult).to.be.equal(newOwner);

		//Check role admin roles to be TokenAdminRole
		let adminRoleStr = await tokenACLFacet.getRoleAdmin(TokenAdminRole);
		expect(adminRoleStr).to.be.equal(TokenAdminRole);

		//Check that old owner dos not have the correct roles
		hasRole = await tokenACLFacet.hasRole(TokenAdminRole, oldOwner);
		expect(hasRole).to.be.equal(false);

		//Check that new owner has the correct roles
		hasRole = await tokenACLFacet.hasRole(TokenAdminRole, newOwner);
		expect(hasRole).to.be.equal(true);
	});
});
