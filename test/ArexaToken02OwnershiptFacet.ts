import "@nomicfoundation/hardhat-chai-matchers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, deployments } from "hardhat";
import { namedAccounts } from "../deploy-lib/namedAccounts";
import { ArexaTokenOwnershipFacet } from "../typechain-types";
import {
	DescriptorTypeToken,
	getArexaTokenDeploymentDescriptor,
} from "../deploy-lib/arexa-token-deployment/arexa-token-deployment-descriptor";

describe("ArexaTokenOwnershipFacet", function () {
	async function deployDiamondWithFacet() {
		const accounts = await ethers.getSigners();

		await deployments.fixture(["hRXAIDiamond"]);

		const descriptorToken = getArexaTokenDeploymentDescriptor(DescriptorTypeToken.hRXAI);

		const diamond = await deployments.get(descriptorToken.diamond.name);

		const ownershipFacet = (await ethers.getContractAt(
			descriptorToken.facets.ownershipFacet.artifact,
			diamond.address,
			accounts[namedAccounts.diamondOwner],
		)) as ArexaTokenOwnershipFacet;

		return {
			accounts,
			diamondAddress: diamond.address,
			ownershipFacet,
		};
	}

	it("Owner is the diamondOwner after deploy", async function () {
		const { accounts, ownershipFacet } = await loadFixture(deployDiamondWithFacet);

		const owner = await ownershipFacet.owner();
		expect(owner).to.be.equal(await accounts[namedAccounts.diamondOwner].getAddress());
	});

	it("Transfer ownership", async function () {
		const { accounts, ownershipFacet } = await loadFixture(deployDiamondWithFacet);

		const owner = await ownershipFacet.owner();
		expect(owner).to.be.equal(await accounts[namedAccounts.diamondOwner].getAddress());

		const newOwner = await accounts[namedAccounts.user1].getAddress();

		const result = await ownershipFacet.transferOwnership(newOwner);
		await expect(result).not.to.be.reverted;

		const newOwnerResult = await ownershipFacet.owner();
		expect(newOwnerResult).to.be.equal(newOwner);
	});

	it("Transfer ownership - only owner can call", async function () {
		const { accounts, ownershipFacet } = await loadFixture(deployDiamondWithFacet);

		const owner = await ownershipFacet.owner();
		expect(owner).to.be.equal(await accounts[namedAccounts.diamondOwner].getAddress());

		const newOwner = accounts[namedAccounts.user1].address;

		const userOwnershipFacet = ownershipFacet.connect(accounts[namedAccounts.user1]);
		const result = userOwnershipFacet.transferOwnership(newOwner);
		await expect(result).to.be.revertedWithCustomError(userOwnershipFacet, "Ownable__NotOwner");

		const ownerCheckResult = await ownershipFacet.owner();
		expect(ownerCheckResult).to.be.equal(owner);
	});
});
