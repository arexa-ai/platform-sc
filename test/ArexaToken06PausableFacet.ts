import { ethers, deployments } from "hardhat";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { Contract } from "ethers";
import { getSelectors } from "../deploy-lib/diamond-utils";
import { namedAccounts } from "../deploy-lib/namedAccounts";
import { ArexaTokenPausableFacet } from "../typechain-types";
import {
	DescriptorTypeToken,
	getArexaTokenDeploymentDescriptor,
} from "../deploy-lib/arexa-token-deployment/arexa-token-deployment-descriptor";

describe("ArexaTokenPausableFacet", function () {
	async function deployDiamondWithFacet() {
		const accounts = await ethers.getSigners();

		await deployments.fixture(["hRXAIDiamond"]);

		const descriptorToken = getArexaTokenDeploymentDescriptor(DescriptorTypeToken.hRXAI);

		const diamond = await deployments.get(descriptorToken.diamond.name);

		const pausableFacetDefault = (await ethers.getContractAt(
			descriptorToken.facets.pausableFacet.artifact,
			diamond.address,
			accounts[namedAccounts.diamondOwner],
		)) as ArexaTokenPausableFacet;

		return {
			accounts,
			diamondAddress: diamond.address,
			pausableFacetDefault,
		};
	}

	it("Pause Token ", async function () {
		const { pausableFacetDefault } = await loadFixture(deployDiamondWithFacet);

		const pausableFacet = pausableFacetDefault;

		const isPausedBefore = await pausableFacet.paused(pausableFacet.PAUSABLE_FULL());
		expect(isPausedBefore).to.be.equal(false);

		const result = pausableFacet.pause(pausableFacet.PAUSABLE_FULL());
		await expect(result).not.to.be.reverted;

		const isPausedAfter = await pausableFacet.paused(pausableFacet.PAUSABLE_FULL());
		expect(isPausedAfter).to.be.equal(true);
	});

	it("Double Pause Token ", async function () {
		const { pausableFacetDefault } = await loadFixture(deployDiamondWithFacet);

		const pausableFacet = pausableFacetDefault;

		const isPausedBefore = await pausableFacet.paused(pausableFacet.PAUSABLE_FULL());
		expect(isPausedBefore).to.be.equal(false);

		const result1 = pausableFacet.pause(pausableFacet.PAUSABLE_FULL());
		await expect(result1).not.to.be.reverted;

		const isPausedAfter1 = await pausableFacet.paused(pausableFacet.PAUSABLE_FULL());
		expect(isPausedAfter1).to.be.equal(true);

		const result2 = pausableFacet.pause(pausableFacet.PAUSABLE_FULL());
		await expect(result2).to.be.revertedWithCustomError(pausableFacet, "TargetedPausable__TargetedPaused");

		const isPausedAfter2 = await pausableFacet.paused(pausableFacet.PAUSABLE_FULL());
		expect(isPausedAfter2).to.be.equal(true);
	});

	it("Unpause Token ", async function () {
		const { pausableFacetDefault } = await loadFixture(deployDiamondWithFacet);

		const pausableFacet = pausableFacetDefault;

		const pauseResult = pausableFacet.pause(pausableFacet.PAUSABLE_FULL());
		await expect(pauseResult).not.to.be.reverted;

		const isPausedBefore = await pausableFacet.paused(pausableFacet.PAUSABLE_FULL());
		expect(isPausedBefore).to.be.equal(true);

		const unpauseResult = pausableFacet.unpause(pausableFacet.PAUSABLE_FULL());
		await expect(unpauseResult).not.to.be.reverted;

		const isPausedAfter = await pausableFacet.paused(pausableFacet.PAUSABLE_FULL());
		expect(isPausedAfter).to.be.equal(false);
	});

	it("Double Unpause Token ", async function () {
		const { pausableFacetDefault } = await loadFixture(deployDiamondWithFacet);

		const pausableFacet = pausableFacetDefault;

		const pauseResult = pausableFacet.pause(pausableFacet.PAUSABLE_FULL());
		await expect(pauseResult).not.to.be.reverted;

		const isPausedBefore = await pausableFacet.paused(pausableFacet.PAUSABLE_FULL());
		expect(isPausedBefore).to.be.equal(true);

		const unpauseResult1 = pausableFacet.unpause(pausableFacet.PAUSABLE_FULL());
		await expect(unpauseResult1).not.to.be.reverted;

		const isPausedAfter1 = await pausableFacet.paused(pausableFacet.PAUSABLE_FULL());
		expect(isPausedAfter1).to.be.equal(false);

		const unpauseResult2 = pausableFacet.unpause(pausableFacet.PAUSABLE_FULL());
		await expect(unpauseResult2).to.be.revertedWithCustomError(pausableFacet, "TargetedPausable__NotTargetedPaused");

		const isPausedAfter2 = await pausableFacet.paused(pausableFacet.PAUSABLE_FULL());
		expect(isPausedAfter2).to.be.equal(false);
	});

	it("Pause without 'Token Admin' role should ", async function () {
		const { accounts, pausableFacetDefault } = await loadFixture(deployDiamondWithFacet);

		const pausableFacet = pausableFacetDefault.connect(accounts[namedAccounts.user1]);

		const isPausedBefore = await pausableFacet.paused(pausableFacet.PAUSABLE_FULL());
		expect(isPausedBefore).to.be.equal(false);

		const result = pausableFacet.pause(pausableFacet.PAUSABLE_FULL());
		await expect(result).to.be.revertedWithCustomError(pausableFacet, "AccessDenied");

		const isPausedAfter = await pausableFacet.paused(pausableFacet.PAUSABLE_FULL());
		expect(isPausedAfter).to.be.equal(false);
	});

	it("Unpause without 'Token Admin' role should ", async function () {
		const { accounts, pausableFacetDefault } = await loadFixture(deployDiamondWithFacet);

		let pausableFacet = pausableFacetDefault;

		const pauseResult = pausableFacet.pause(pausableFacet.PAUSABLE_FULL());
		await expect(pauseResult).not.to.be.reverted;

		pausableFacet = pausableFacet.connect(accounts[namedAccounts.user1]);

		const isPausedBefore = await pausableFacet.paused(pausableFacet.PAUSABLE_FULL());
		expect(isPausedBefore).to.be.equal(true);

		const unpauseResult = pausableFacet.unpause(pausableFacet.PAUSABLE_FULL());
		await expect(unpauseResult).to.be.revertedWithCustomError(pausableFacet, "AccessDenied");

		const isPausedAfter = await pausableFacet.paused(pausableFacet.PAUSABLE_FULL());
		expect(isPausedAfter).to.be.equal(true);
	});
});
