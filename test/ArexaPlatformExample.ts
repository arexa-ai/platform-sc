import "@nomicfoundation/hardhat-chai-matchers";
import { ethers, deployments, getNamedAccounts } from "hardhat";
import { time, mine, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

import { namedAccounts } from "../deploy-lib/namedAccounts";
import { call } from "./helpers/CallHelper";

import { DescriptorTypeArexa, getArexaDeploymentDescriptor } from "../deploy-lib/arexa-platform-deployment/arexa-deployment-descriptor";
import {
	DescriptorTypeToken,
	getArexaTokenDeploymentDescriptor,
} from "../deploy-lib/arexa-token-deployment/arexa-token-deployment-descriptor";
import { deployDiamond } from "./ArexaPlatform";

describe("ArexaPlatform - Example", function () {
	describe("User buy T4", async function () {
		//
		it("Amount is given, but not approved payment token", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformFacetUser1 = arexa.platformFacet.connect(user1);

			//user buy token, 100 000 quantity = 10 000 USDT
			const result = platformFacetUser1.buyArexaToken(100_000n * BigInt(10 ** usdt.DECIMALS), arexa.const.AMOUNT);
			await expect(result).to.be.revertedWith("InsufficientAllowance");
		});

		it("Amount is given", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const usdtTokenFacetUser1 = usdt.tokenFacet.connect(user1);
			const platformFacetUser1 = arexa.platformFacet.connect(user1);
			const arexaTokenFacetUser1 = arexa.pfmTokenFacet.connect(user1);

			const user1USDTOpenBalance = await usdtTokenFacetUser1.balanceOf(user1.address);

			//user buy token, 100 000 quantity = 10 000 USDT
			const result = platformFacetUser1.buyArexaToken(10000n * BigInt(10 ** usdt.DECIMALS), arexa.const.AMOUNT);
			await expect(result).not.to.be.reverted;

			const user1ArexaTokenBalance = await arexaTokenFacetUser1.balanceOf(user1.address, arexa.const.AREXA_TOKEN_ID);
			expect(user1ArexaTokenBalance).to.be.equal(100000);

			const user1USDTCloseBalance = await usdtTokenFacetUser1.balanceOf(user1.address);
			expect(user1USDTCloseBalance).to.be.equal(user1USDTOpenBalance.sub(10000n * BigInt(10 ** usdt.DECIMALS)));
		});
	});

	describe("User buy T5", async function () {
		//
		it("Buy token, but not approved the buyer", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformFacetUser1 = arexa.platformFacet.connect(user1);

			//user buy token, 100 000 quantity = 10 000 USDT
			const result = platformFacetUser1.buyMagic100Token(); //Only an approved account can buy the Magic token
			await expect(result).to.be.revertedWith("Only an approved account can buy the Magic token");
		});

		it("Buy token, but not approved payment token", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const usdtTokenFacetUser1 = usdt.tokenFacet.connect(user1);
			const platformFacetUser1 = arexa.platformFacet.connect(user1);

			//Add buyer address to WhiteList
			await arexa.amlFacet.connect(arexa.ownerAddress).setMagic100FirstBuyerWL(user1.address, true);

			await call(usdtTokenFacetUser1.approve(arexa.diamondAddress, 0));

			const result = platformFacetUser1.buyMagic100Token(); //Only an approved account can buy the Magic token
			await expect(result).to.be.revertedWith("InsufficientAllowance");
		});

		it("Buy token", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformFacetUser1 = arexa.platformFacet.connect(user1);

			//01) Add buyer address to WhiteList by the admin!!!
			await arexa.amlFacet.connect(arexa.ownerAddress).setMagic100FirstBuyerWL(user1.address, true);

			const user1USDTOpenBalance = await usdt.tokenFacet.balanceOf(user1.address);

			//03) User call buy function
			const result = platformFacetUser1.buyMagic100Token(); //Only an approved account can buy the Magic token
			await expect(result).not.to.be.reverted;

			const user1ArexaTokenBalance = await arexa.pfmTokenFacet.balanceOf(user1.address, arexa.const.MAGIC_TOKEN_ID);
			expect(user1ArexaTokenBalance).to.be.equal(1);

			const user1USDTCloseBalance = await usdt.tokenFacet.balanceOf(user1.address);
			expect(user1USDTCloseBalance).to.be.equal(user1USDTOpenBalance.sub(100n * BigInt(10 ** usdt.DECIMALS)));
		});

		it("Buy token, but only one!", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformFacetUser1 = arexa.platformFacet.connect(user1);

			//01) Add buyer address to WhiteList by the admin!!!
			await arexa.amlFacet.connect(arexa.ownerAddress).setMagic100FirstBuyerWL(user1.address, true);

			const user1USDTOpenBalance = await usdt.tokenFacet.balanceOf(user1.address);

			const result = platformFacetUser1.buyMagic100Token(); //Only an approved account can buy the Magic token
			await expect(result).not.to.be.reverted;

			const user1ArexaTokenBalance = await arexa.pfmTokenFacet.balanceOf(user1.address, arexa.const.MAGIC_TOKEN_ID);
			expect(user1ArexaTokenBalance).to.be.equal(1);

			const user1USDTCloseBalance = await usdt.tokenFacet.balanceOf(user1.address);
			expect(user1USDTCloseBalance).to.be.equal(user1USDTOpenBalance.sub(100n * BigInt(10 ** usdt.DECIMALS)));

			await arexa.amlFacet.connect(arexa.ownerAddress).setMagic100FirstBuyerWL(user1.address, true);

			const resultWithError = platformFacetUser1.buyMagic100Token();
			await expect(resultWithError).to.be.revertedWith("Only 1 Magic token can be bought now!");
		});

		it("User can't buy with admin!", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformFacetAdminUser1 = arexa.platformAdminFacet.connect(user1);

			//Add buyer address to WhiteList
			await arexa.amlFacet.connect(arexa.ownerAddress).setMagic100FirstBuyerWL(user1.address, true);

			const user1USDTOpenBalance = await usdt.tokenFacet.balanceOf(user1.address);

			const result = platformFacetAdminUser1.buyMagic100TokenAdmin(user1.address, 0);
			await expect(result).to.be.revertedWithCustomError(platformFacetAdminUser1, "AccessDenied");

			const user1ArexaTokenBalance = await arexa.pfmTokenFacet.balanceOf(user1.address, arexa.const.MAGIC_TOKEN_ID);
			expect(user1ArexaTokenBalance).to.be.equal(0);

			const user1USDTCloseBalance = await usdt.tokenFacet.balanceOf(user1.address);
			expect(user1USDTCloseBalance).to.be.equal(user1USDTOpenBalance);
		});
	});
});
