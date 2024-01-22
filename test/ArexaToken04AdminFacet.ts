import "@nomicfoundation/hardhat-chai-matchers";
import { ethers, deployments } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { namedAccounts } from "../deploy-lib/namedAccounts";
import { call } from "./helpers/CallHelper";
import { zeroAddress } from "../deploy-lib/utils";
import { ArexaTokenACLFacet, ArexaTokenAdminFacet, ArexaTokenPausableFacet } from "../typechain-types";
import {
	DescriptorTypeToken,
	getArexaTokenDeploymentDescriptor,
} from "../deploy-lib/arexa-token-deployment/arexa-token-deployment-descriptor";

describe("ArexaTokenAdminFacet", function () {
	async function deployDiamondWithFacet() {
		const accounts = await ethers.getSigners();

		await deployments.fixture(["hRXAIDiamond"]);

		const descriptorToken = getArexaTokenDeploymentDescriptor(DescriptorTypeToken.hRXAI);

		const diamond = await deployments.get(descriptorToken.diamond.name);

		//Setup roles
		const tokenACLFacet = (await ethers.getContractAt(
			descriptorToken.facets.aclFacet.artifact,
			diamond.address,
			accounts[namedAccounts.diamondOwner],
		)) as ArexaTokenACLFacet;
		await call(tokenACLFacet.grantRole(await tokenACLFacet.TOKEN_ADMIN_ROLE(), accounts[namedAccounts.tokenAdmin].address));

		//get facet with correct
		const tokenAdminFacet = (await ethers.getContractAt(
			descriptorToken.facets.adminFacet.artifact,
			diamond.address,
			accounts[namedAccounts.tokenAdmin],
		)) as ArexaTokenAdminFacet;

		return {
			accounts,
			diamondAddress: diamond.address,
			tokenAdminFacet,
		};
	}

	it("TreasuryAddress - set can be by TokenAdmin", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const result = tokenAdminFacet.setTreasuryAddress(accounts[namedAccounts.treasuryAddress].address);
		await expect(result).not.to.be.reverted;

		const data = await tokenAdminFacet.getTreasuryAddress();
		expect(data).to.be.equal(accounts[namedAccounts.treasuryAddress].address);
	});

	it("TreasuryAddress - cannot set by a user", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const userTokenAdminFace = tokenAdminFacet.connect(accounts[namedAccounts.user1]);
		const result = userTokenAdminFace.setTreasuryAddress(accounts[namedAccounts.treasuryAddress].address);
		await expect(result).to.be.revertedWithCustomError(userTokenAdminFace, "AccessDenied");

		const data = await userTokenAdminFace.getTreasuryAddress();
		expect(data).to.be.equal(zeroAddress);
	});

	it("URL - any string can be set as URL by TokenAdmin", async function () {
		const { tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const result = tokenAdminFacet.setURL("Đỗ Trang"); //Đỗ Thị Huyền Trang
		await expect(result).not.to.be.reverted;

		const data = await tokenAdminFacet.getURL();
		expect(data).to.be.equal("Đỗ Trang");
	});

	it("URL - cannot set by a user", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const userTokenAdminFace = tokenAdminFacet.connect(accounts[namedAccounts.user1]);
		const result = userTokenAdminFace.setURL("Đỗ Trang");
		await expect(result).to.be.revertedWithCustomError(userTokenAdminFace, "AccessDenied");

		const data = await userTokenAdminFace.getURL();
		expect(data).to.be.equal("");
	});

	it("dataPoolFee - set can be by TokenAdmin", async function () {
		const { tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const result = tokenAdminFacet.setPoolFee(1010);
		await expect(result).not.to.be.reverted;

		const data = await tokenAdminFacet.getPoolFee();
		expect(data).to.be.equal(1010);
	});

	it("PoolFee - cannot set by a user", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const userTokenAdminFace = tokenAdminFacet.connect(accounts[namedAccounts.user1]);
		const result = userTokenAdminFace.setPoolFee(1010);
		await expect(result).to.be.revertedWithCustomError(userTokenAdminFace, "AccessDenied");

		const data = await userTokenAdminFace.getPoolFee();
		expect(data).to.be.equal(0);
	});

	it("PoolFeeAddress - set can be by TokenAdmin", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const result = tokenAdminFacet.setPoolFeeAddress(accounts[namedAccounts.poolFeeAddress].address);
		await expect(result).not.to.be.reverted;

		const data = await tokenAdminFacet.getPoolFeeAddress();
		expect(data).to.be.equal(accounts[namedAccounts.poolFeeAddress].address);
	});

	it("PoolFeeAddress - cannot set by a user", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const userTokenAdminFace = tokenAdminFacet.connect(accounts[namedAccounts.user1]);
		const result = userTokenAdminFace.setPoolFeeAddress(accounts[namedAccounts.poolFeeAddress].address);
		await expect(result).to.be.revertedWithCustomError(userTokenAdminFace, "AccessDenied");

		const data = await userTokenAdminFace.getPoolFeeAddress();
		expect(data).to.be.equal(zeroAddress);
	});

	it("GeneralFee - set can be by TokenAdmin", async function () {
		const { tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const result = tokenAdminFacet.setGeneralFee(1010);
		await expect(result).not.to.be.reverted;

		const data = await tokenAdminFacet.getGeneralFee();
		expect(data).to.be.equal(1010);
	});

	it("GeneralFee - cannot set by a user", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const userTokenAdminFace = tokenAdminFacet.connect(accounts[namedAccounts.user1]);
		const result = userTokenAdminFace.setGeneralFee(1010);
		await expect(result).to.be.revertedWithCustomError(userTokenAdminFace, "AccessDenied");

		const data = await userTokenAdminFace.getGeneralFee();
		expect(data).to.be.equal(0);
	});

	it("GeneralFeeFeeAddress - set can be by TokenAdmin", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const result = tokenAdminFacet.setGeneralFeeAddress(accounts[namedAccounts.generalFeeAddress].address);
		await expect(result).not.to.be.reverted;

		const data = await tokenAdminFacet.getGeneralFeeAddress();
		expect(data).to.be.equal(accounts[namedAccounts.generalFeeAddress].address);
	});

	it("GeneralFeeAddress - cannot set by a user", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const userTokenAdminFace = tokenAdminFacet.connect(accounts[namedAccounts.user1]);
		const result = userTokenAdminFace.setGeneralFeeAddress(accounts[namedAccounts.generalFeeAddress].address);
		await expect(result).to.be.revertedWithCustomError(userTokenAdminFace, "AccessDenied");

		const data = await userTokenAdminFace.getGeneralFeeAddress();
		expect(data).to.be.equal(zeroAddress);
	});
});

describe("ArexTokenAdminFacet - Paused", function () {
	async function deployPausedDiamondWithFacet() {
		const accounts = await ethers.getSigners();

		await deployments.fixture(["hRXAIDiamond"]);

		const descriptorToken = getArexaTokenDeploymentDescriptor(DescriptorTypeToken.hRXAI);

		const diamond = await deployments.get(descriptorToken.diamond.name);

		//Setup roles
		const tokenACLFacet = (await ethers.getContractAt(
			descriptorToken.facets.aclFacet.artifact,
			diamond.address,
			accounts[namedAccounts.diamondOwner],
		)) as ArexaTokenACLFacet;
		await call(tokenACLFacet.grantRole(await tokenACLFacet.TOKEN_ADMIN_ROLE(), accounts[namedAccounts.tokenAdmin].address));

		//get facet with correct
		const tokenAdminFacet = (await ethers.getContractAt(
			descriptorToken.facets.adminFacet.artifact,
			diamond.address,
			accounts[namedAccounts.tokenAdmin],
		)) as ArexaTokenAdminFacet;

		const tokenPauseable = (await ethers.getContractAt(
			descriptorToken.facets.pausableFacet.artifact,
			diamond.address,
			accounts[namedAccounts.diamondOwner],
		)) as ArexaTokenPausableFacet;

		await call(tokenPauseable.pause(await tokenPauseable.PAUSABLE_FULL()));

		return {
			accounts,
			diamondAddress: diamond.address,
			tokenAdminFacet,
		};
	}

	it("TreasuryAddress -  cannot set when paused by TokenAdmin", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployPausedDiamondWithFacet);

		const result = tokenAdminFacet.setTreasuryAddress(accounts[namedAccounts.treasuryAddress].address);
		await expect(result).to.be.revertedWithCustomError(tokenAdminFacet, "TargetedPausable__TargetedPaused");

		const poolFeeAddress = await tokenAdminFacet.getTreasuryAddress();
		expect(poolFeeAddress).to.be.equal(zeroAddress);
	});

	it("TreasuryAddress - cannot set when paused by a user", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployPausedDiamondWithFacet);

		const userTokenAdminFace = tokenAdminFacet.connect(accounts[namedAccounts.user1]);
		const result = userTokenAdminFace.setTreasuryAddress(accounts[namedAccounts.treasuryAddress].address);
		await expect(result).to.be.revertedWithCustomError(tokenAdminFacet, "TargetedPausable__TargetedPaused");

		const data = await userTokenAdminFace.getTreasuryAddress();
		expect(data).to.be.equal(zeroAddress);
	});

	it("URL - cannot set when paused by TokenAdmin", async function () {
		const { tokenAdminFacet } = await loadFixture(deployPausedDiamondWithFacet);

		const result = tokenAdminFacet.setURL("Đỗ Trang");
		await expect(result).to.be.revertedWithCustomError(tokenAdminFacet, "TargetedPausable__TargetedPaused");

		const data = await tokenAdminFacet.getURL();
		expect(data).to.be.equal("");
	});

	it("URL - cannot set when paused by a user", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployPausedDiamondWithFacet);

		//const result = tokenAdminFacet.setURL("Đỗ Trang");
		//await expect(result).to.be.revertedWithCustomError(tokenAdminFacet, "TargetedPausable__TargetedPaused");
		const userTokenAdminFace = tokenAdminFacet.connect(accounts[namedAccounts.user1]);
		const result = userTokenAdminFace.setURL("Đỗ Trang");
		await expect(result).to.be.revertedWithCustomError(tokenAdminFacet, "TargetedPausable__TargetedPaused");

		const data = await tokenAdminFacet.getURL();
		expect(data).to.be.equal("");
	});

	it("PoolFee - cannot set when paused by TokenAdmin", async function () {
		const { tokenAdminFacet } = await loadFixture(deployPausedDiamondWithFacet);

		const result = tokenAdminFacet.setPoolFee(1010);
		await expect(result).to.be.revertedWithCustomError(tokenAdminFacet, "TargetedPausable__TargetedPaused");

		const poolFee = await tokenAdminFacet.getPoolFee();
		expect(poolFee).to.be.equal(0);
	});

	it("PoolFee - cannot set when paused by a user", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployPausedDiamondWithFacet);

		const userTokenAdminFace = tokenAdminFacet.connect(accounts[namedAccounts.user1]);
		const result = userTokenAdminFace.setPoolFee(1010);
		await expect(result).to.be.revertedWithCustomError(tokenAdminFacet, "TargetedPausable__TargetedPaused");

		const data = await userTokenAdminFace.getPoolFee();
		expect(data).to.be.equal(0);
	});

	it("PoolFeeAddress - cannot set when paused by TokenAdmin", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployPausedDiamondWithFacet);

		const result = tokenAdminFacet.setPoolFeeAddress(accounts[namedAccounts.poolFeeAddress].address);
		await expect(result).to.be.revertedWithCustomError(tokenAdminFacet, "TargetedPausable__TargetedPaused");

		const data = await tokenAdminFacet.getPoolFeeAddress();
		expect(data).to.be.equal(zeroAddress);
	});

	it("PoolFeeAddress - cannot set when paused by a user", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployPausedDiamondWithFacet);

		const userTokenAdminFace = tokenAdminFacet.connect(accounts[namedAccounts.user1]);
		const result = userTokenAdminFace.setPoolFeeAddress(accounts[namedAccounts.poolFeeAddress].address);
		await expect(result).to.be.revertedWithCustomError(tokenAdminFacet, "TargetedPausable__TargetedPaused");

		const data = await userTokenAdminFace.getPoolFeeAddress();
		expect(data).to.be.equal(zeroAddress);
	});

	it("GeneralFee - cannot set when paused by TokenAdmin", async function () {
		const { tokenAdminFacet } = await loadFixture(deployPausedDiamondWithFacet);

		const result = tokenAdminFacet.setGeneralFee(1010);
		await expect(result).to.be.revertedWithCustomError(tokenAdminFacet, "TargetedPausable__TargetedPaused");

		const data = await tokenAdminFacet.getGeneralFee();
		expect(data).to.be.equal(0);
	});

	it("GeneralFee - cannot set when paused by a user", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployPausedDiamondWithFacet);

		const userTokenAdminFace = tokenAdminFacet.connect(accounts[namedAccounts.user1]);
		const result = userTokenAdminFace.setGeneralFee(1010);
		await expect(result).to.be.revertedWithCustomError(tokenAdminFacet, "TargetedPausable__TargetedPaused");

		const data = await userTokenAdminFace.getGeneralFee();
		expect(data).to.be.equal(0);
	});

	it("GeneralFeeFeeAddress - cannot set when paused by TokenAdmin", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployPausedDiamondWithFacet);

		const result = tokenAdminFacet.setGeneralFeeAddress(accounts[namedAccounts.generalFeeAddress].address);
		await expect(result).to.be.revertedWithCustomError(tokenAdminFacet, "TargetedPausable__TargetedPaused");

		const data = await tokenAdminFacet.getGeneralFeeAddress();
		expect(data).to.be.equal(zeroAddress);
	});

	it("GeneralFeeAddress - cannot set when paused by a user", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployPausedDiamondWithFacet);

		const userTokenAdminFace = tokenAdminFacet.connect(accounts[namedAccounts.user1]);
		const result = userTokenAdminFace.setGeneralFeeAddress(accounts[namedAccounts.generalFeeAddress].address);
		await expect(result).to.be.revertedWithCustomError(tokenAdminFacet, "TargetedPausable__TargetedPaused");

		const data = await userTokenAdminFace.getGeneralFeeAddress();
		expect(data).to.be.equal(zeroAddress);
	});
});

describe("ArexaTokenAdminFacet - Direct call", function () {
	async function deployDiamondWithFacet() {
		const accounts = await ethers.getSigners();

		await deployments.fixture(["hRXAIDiamond"]);

		const descriptorToken = getArexaTokenDeploymentDescriptor(DescriptorTypeToken.hRXAI);

		const diamond = await deployments.get(descriptorToken.diamond.name);

		//Setup roles
		const tokenACLFacet = (await ethers.getContractAt(
			descriptorToken.facets.aclFacet.artifact,
			diamond.address,
			accounts[namedAccounts.diamondOwner],
		)) as ArexaTokenACLFacet;
		await call(tokenACLFacet.grantRole(await tokenACLFacet.TOKEN_ADMIN_ROLE(), accounts[namedAccounts.tokenAdmin].address));

		//Get the direct address
		const tokenAdmin = await deployments.get(descriptorToken.facets.adminFacet.name);

		//get facet with correct
		const tokenAdminFacet = (await ethers.getContractAt(
			descriptorToken.facets.adminFacet.artifact,
			tokenAdmin.address,
			accounts[namedAccounts.tokenAdmin],
		)) as ArexaTokenAdminFacet;

		return {
			accounts,
			diamondAddress: diamond.address,
			tokenAdminFacet,
		};
	}

	it("TreasuryAddress - cannot set and get with direct call", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const result = tokenAdminFacet.setTreasuryAddress(accounts[namedAccounts.treasuryAddress].address);
		await expect(result).to.be.revertedWith("NOT_ALLOWED");

		const data = tokenAdminFacet.getTreasuryAddress();
		await expect(data).to.be.revertedWith("NOT_ALLOWED");
	});

	it("URL - cannot set and get with direct call", async function () {
		const { tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const result = tokenAdminFacet.setURL("Đỗ Trang"); //Đỗ Thị Huyền Trang
		await expect(result).to.be.revertedWith("NOT_ALLOWED");

		const data = tokenAdminFacet.getURL();
		await expect(data).to.be.revertedWith("NOT_ALLOWED");
	});

	it("PoolFee - cannot set and get with direct call", async function () {
		const { tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const result = tokenAdminFacet.setPoolFee(1010);
		await expect(result).to.be.revertedWith("NOT_ALLOWED");

		const data = tokenAdminFacet.getPoolFee();
		await expect(data).to.be.revertedWith("NOT_ALLOWED");
	});

	it("PoolFeeAddress - cannot set and get with direct call", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const result = tokenAdminFacet.setPoolFeeAddress(accounts[namedAccounts.poolFeeAddress].address);
		await expect(result).to.be.revertedWith("NOT_ALLOWED");

		const data = tokenAdminFacet.getPoolFeeAddress();
		await expect(data).to.be.revertedWith("NOT_ALLOWED");
	});

	it("GeneralFee - cannot set and get with direct call", async function () {
		const { tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const result = tokenAdminFacet.setGeneralFee(1010);
		await expect(result).to.be.revertedWith("NOT_ALLOWED");

		const data = tokenAdminFacet.getGeneralFee();
		await expect(data).to.be.revertedWith("NOT_ALLOWED");
	});

	it("GeneralFeeFeeAddress - cannot set and get with direct call", async function () {
		const { accounts, tokenAdminFacet } = await loadFixture(deployDiamondWithFacet);

		const result = tokenAdminFacet.setGeneralFeeAddress(accounts[namedAccounts.generalFeeAddress].address);
		await expect(result).to.be.revertedWith("NOT_ALLOWED");

		const data = tokenAdminFacet.getGeneralFeeAddress();
		await expect(data).to.be.revertedWith("NOT_ALLOWED");
	});
});
