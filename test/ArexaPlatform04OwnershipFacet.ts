import "@nomicfoundation/hardhat-chai-matchers";
import { ethers } from "hardhat";
import { time, mine, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { namedAccounts } from "../deploy-lib/namedAccounts";
import { deployDiamond } from "./ArexaPlatform";
import { zeroAddress } from "../deploy-lib/utils";

describe("ArexaPlatformOwnershipFacet", function () {
	it("Owner is the diamondOwner after deploy", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const ownershipFacet = arexa.ownershipFacet.connect(accounts[namedAccounts.diamondOwner]);

		const owner = await ownershipFacet.owner();
		expect(owner).to.be.equal(await accounts[namedAccounts.diamondOwner].getAddress());
	});

	it("Transfer ownership", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const ownershipFacet = arexa.ownershipFacet.connect(accounts[namedAccounts.diamondOwner]);

		const owner = await arexa.ownershipFacet.owner();
		expect(owner).to.be.equal(await accounts[namedAccounts.diamondOwner].getAddress());

		const newOwner = await accounts[namedAccounts.user1].getAddress();

		const result = await ownershipFacet.transferOwnership(newOwner);
		await expect(result).not.to.be.reverted;

		const newOwnerResult = await ownershipFacet.owner();
		expect(newOwnerResult).to.be.equal(newOwner);
	});

	it("Transfer ownership - only owner can call", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const owner = await arexa.ownershipFacet.owner();
		expect(owner).to.be.equal(await accounts[namedAccounts.diamondOwner].getAddress());

		const newOwner = accounts[namedAccounts.user1].address;

		const userOwnershipFacet = arexa.ownershipFacet.connect(accounts[namedAccounts.user1]);
		const result = userOwnershipFacet.transferOwnership(newOwner);
		await expect(result).to.be.revertedWithCustomError(userOwnershipFacet, "Ownable__NotOwner");

		const ownerCheckResult = await arexa.ownershipFacet.owner();
		expect(ownerCheckResult).to.be.equal(owner);
	});
});
