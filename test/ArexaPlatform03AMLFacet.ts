import "@nomicfoundation/hardhat-chai-matchers";
import { ethers } from "hardhat";
import { time, mine, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { namedAccounts } from "../deploy-lib/namedAccounts";
import { deployDiamond } from "./ArexaPlatform";

describe("ArexaPlatformAMLFacet", function () {
	it("Only a new AML admin can set!", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const ownerSigner = accounts[namedAccounts.diamondOwner];
		const amlAdminSigner = accounts[namedAccounts.tokenAML];
		const amlAdminAccount = await amlAdminSigner.getAddress();
		const userAccount = await accounts[namedAccounts.user2].getAddress();

		const Magic100FirstBuyerList = await arexa.amlFacet.MAGIC100_FIRST_BUYER();

		const tokenACLFacet = arexa.aclFacet.connect(accounts[namedAccounts.diamondOwner]);

		const amlAdminRole = await tokenACLFacet.AREXA_ADMIN_ROLE();

		let hasRole = await tokenACLFacet.hasRole(amlAdminRole, amlAdminAccount);
		expect(hasRole).to.be.equal(false);

		let result = tokenACLFacet.grantRole(amlAdminRole, amlAdminAccount);
		await expect(result).not.to.be.reverted;

		hasRole = await tokenACLFacet.hasRole(amlAdminRole, amlAdminAccount);
		expect(hasRole).to.be.equal(true);

		//new AML admin can set
		let tokenAMLFacet = arexa.amlFacet.connect(amlAdminSigner);

		let isOnList = await tokenAMLFacet.getAccountBlackWhiteList(Magic100FirstBuyerList, userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(userAccount);
		expect(isOnList).to.be.equal(false);

		result = tokenAMLFacet.setAccountBlackWhiteList(Magic100FirstBuyerList, userAccount, true);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(Magic100FirstBuyerList, userAccount);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(userAccount);
		expect(isOnList).to.be.equal(true);

		result = tokenAMLFacet.setAccountBlackWhiteList(Magic100FirstBuyerList, userAccount, false);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(Magic100FirstBuyerList, userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(userAccount);
		expect(isOnList).to.be.equal(false);

		result = tokenAMLFacet.setMagic100FirstBuyerWL(userAccount, true);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(Magic100FirstBuyerList, userAccount);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(userAccount);
		expect(isOnList).to.be.equal(true);

		result = tokenAMLFacet.setMagic100FirstBuyerWL(userAccount, false);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(Magic100FirstBuyerList, userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(userAccount);
		expect(isOnList).to.be.equal(false);

		//revoke amlAdmin role
		tokenAMLFacet = tokenAMLFacet.connect(ownerSigner);

		result = tokenACLFacet.revokeRole(amlAdminRole, amlAdminAccount);
		await expect(result).not.to.be.reverted;

		tokenAMLFacet = tokenAMLFacet.connect(amlAdminSigner);

		hasRole = await tokenACLFacet.hasRole(amlAdminRole, amlAdminAccount);
		expect(hasRole).to.be.equal(false);

		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(Magic100FirstBuyerList, userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(userAccount);
		expect(isOnList).to.be.equal(false);

		result = tokenAMLFacet.setAccountBlackWhiteList(Magic100FirstBuyerList, userAccount, true);
		await expect(result).to.be.revertedWithCustomError(tokenAMLFacet, "AccessDenied");
		result = tokenAMLFacet.setMagic100FirstBuyerWL(userAccount, true);
		await expect(result).to.be.revertedWithCustomError(tokenAMLFacet, "AccessDenied");

		result = tokenAMLFacet.setAccountBlackWhiteList(Magic100FirstBuyerList, userAccount, false);
		await expect(result).to.be.revertedWithCustomError(tokenAMLFacet, "AccessDenied");
		result = tokenAMLFacet.setMagic100FirstBuyerWL(userAccount, false);
		await expect(result).to.be.revertedWithCustomError(tokenAMLFacet, "AccessDenied");
	});

	it("Check add/delete account to/from Magic100FirstBuyerWL", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const Magic100FirstBuyerList = await arexa.amlFacet.MAGIC100_FIRST_BUYER();

		const tokenAMLFacet = arexa.amlFacet.connect(accounts[namedAccounts.diamondOwner]);

		const account = await accounts[namedAccounts.user1].getAddress();

		let isOnList = await tokenAMLFacet.getAccountBlackWhiteList(Magic100FirstBuyerList, account);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(account);
		expect(isOnList).to.be.equal(false);

		let result = tokenAMLFacet.setBatchMagic100FirstBuyerWL([account], true);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(Magic100FirstBuyerList, account);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(account);
		expect(isOnList).to.be.equal(true);

		result = tokenAMLFacet.setBatchMagic100FirstBuyerWL([account], false);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(Magic100FirstBuyerList, account);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(account);
		expect(isOnList).to.be.equal(false);
	});

	it("Check Magic100FirstBuyerWL", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const tokenAMLFacet = arexa.amlFacet.connect(accounts[namedAccounts.diamondOwner]);

		let isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(user1.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(user2.address);
		expect(isOnList).to.be.equal(false);

		let result = tokenAMLFacet.setMagic100FirstBuyerWL(user1.address, true);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(user1.address);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(user2.address);
		expect(isOnList).to.be.equal(false);

		result = tokenAMLFacet.setMagic100FirstBuyerWL(user1.address, false);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(user1.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(user2.address);
		expect(isOnList).to.be.equal(false);

		result = tokenAMLFacet.setBatchMagic100FirstBuyerWL([user1.address, user2.address], true);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(user1.address);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(user2.address);
		expect(isOnList).to.be.equal(true);

		result = tokenAMLFacet.setBatchMagic100FirstBuyerWL([user1.address, user2.address], false);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(user1.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getMagic100FirstBuyerWL(user2.address);
		expect(isOnList).to.be.equal(false);
	});
});
