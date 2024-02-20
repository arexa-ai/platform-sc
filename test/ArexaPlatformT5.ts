import "@nomicfoundation/hardhat-chai-matchers";
import { time, mine, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { call } from "./helpers/CallHelper";

import { deployDiamond } from "./ArexaPlatform";

describe("ArexaPlatform - T5 - Magic100 Token", function () {
	describe("User buy T5 (Magic100)", async function () {
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

			const platformFacetUser1 = arexa.platformFacet.connect(user1);

			//Add buyer address to WhiteList
			await arexa.amlFacet.connect(arexa.ownerAddress).setMagic100FirstBuyerWL(user1.address, true);

			//just remove the allowance, beacuse the setup add allowance
			await usdt.tokenFacet.connect(user1).decreaseAllowance(arexa.diamondAddress, 80000n * BigInt(10 ** usdt.DECIMALS));

			const result = platformFacetUser1.buyMagic100Token(); //Only an approved account can buy the Magic token
			await expect(result).to.be.revertedWith("InsufficientAllowance");
		});

		it("Buy token", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformFacetUser1 = arexa.platformFacet.connect(user1);

			//Add buyer address to WhiteList
			await arexa.amlFacet.connect(arexa.ownerAddress).setMagic100FirstBuyerWL(user1.address, true);

			const user1USDTOpenBalance = await usdt.tokenFacet.balanceOf(user1.address);

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

			//Add buyer address to WhiteList
			await arexa.amlFacet.connect(arexa.ownerAddress).setMagic100FirstBuyerWL(user1.address, true);

			const user1USDTOpenBalance = await usdt.tokenFacet.balanceOf(user1.address);

			const result = platformFacetUser1.buyMagic100Token(); //Only an approved account can buy the Magic token
			await expect(result).not.to.be.reverted;

			const user1ArexaTokenBalance = await arexa.pfmTokenFacet.balanceOf(user1.address, arexa.const.MAGIC_TOKEN_ID);
			expect(user1ArexaTokenBalance).to.be.equal(1);

			const user1USDTCloseBalance = await usdt.tokenFacet.balanceOf(user1.address);
			expect(user1USDTCloseBalance).to.be.equal(user1USDTOpenBalance.sub(100n * BigInt(10 ** usdt.DECIMALS)));

			//Add buyer address to WhiteList
			await arexa.amlFacet.connect(arexa.ownerAddress).setMagic100FirstBuyerWL(user1.address, true);

			const resultWithError = platformFacetUser1.buyMagic100Token();
			await expect(resultWithError).to.be.revertedWith("Only 1 Magic token can be bought now!");
		});

		it("User can't buy with admin!", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformAdminFacetUser1 = arexa.platformAdminFacet.connect(user1);

			const platformFacetOwn = arexa.platformFacet.connect(arexa.ownerAddress);

			//Add buyer address to WhiteList
			await arexa.amlFacet.connect(arexa.ownerAddress).setMagic100FirstBuyerWL(user1.address, true);

			const user1USDTOpenBalance = await usdt.tokenFacet.balanceOf(user1.address);

			const result = platformAdminFacetUser1.buyMagic100TokenAdmin(user1.address);
			await expect(result).to.be.revertedWithCustomError(platformAdminFacetUser1, "AccessDenied");

			const user1ArexaTokenBalance = await arexa.pfmTokenFacet.balanceOf(user1.address, arexa.const.MAGIC_TOKEN_ID);
			expect(user1ArexaTokenBalance).to.be.equal(0);

			const user1USDTCloseBalance = await usdt.tokenFacet.balanceOf(user1.address);
			expect(user1USDTCloseBalance).to.be.equal(user1USDTOpenBalance);
		});

		it("Buy token by admin!", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformAdminFacetOwn = arexa.platformAdminFacet.connect(arexa.ownerAddress);

			const user1USDTOpenBalance = await usdt.tokenFacet.balanceOf(user1.address);

			const result = platformAdminFacetOwn.buyMagic100TokenAdmin(user1.address); //Only an approved account can buy the Magic token
			await expect(result).not.to.be.reverted;

			const user1ArexaTokenBalance = await arexa.pfmTokenFacet.balanceOf(user1.address, arexa.const.MAGIC_TOKEN_ID);
			expect(user1ArexaTokenBalance).to.be.equal(1);

			const user1USDTCloseBalance = await usdt.tokenFacet.balanceOf(user1.address);
			expect(user1USDTCloseBalance).to.be.equal(user1USDTOpenBalance.sub(100n * BigInt(10 ** usdt.DECIMALS)));
		});

		it("Buy multiple token by admin!", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformAdminFacetOwn = arexa.platformAdminFacet.connect(arexa.ownerAddress);

			const user1USDTOpenBalance = await usdt.tokenFacet.balanceOf(user1.address);

			const result1 = platformAdminFacetOwn.buyMagic100TokenAdmin(user1.address); //Only an approved account can buy the Magic token
			await expect(result1).not.to.be.reverted;

			const result2 = platformAdminFacetOwn.buyMagic100TokenAdmin(user1.address); //Only an approved account can buy the Magic token
			await expect(result2).not.to.be.reverted;

			const user1ArexaTokenBalance = await arexa.pfmTokenFacet.balanceOf(user1.address, arexa.const.MAGIC_TOKEN_ID);
			expect(user1ArexaTokenBalance).to.be.equal(2);

			const user1USDTCloseBalance = await usdt.tokenFacet.balanceOf(user1.address);
			expect(user1USDTCloseBalance).to.be.equal(user1USDTOpenBalance.sub(200n * BigInt(10 ** usdt.DECIMALS)));
		});

		it("Buy token by user then by admin!", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformFacetUser1 = arexa.platformFacet.connect(user1);

			const platformAdminFacetOwn = arexa.platformAdminFacet.connect(arexa.ownerAddress);

			//Add buyer address to WhiteList
			await arexa.amlFacet.connect(arexa.ownerAddress).setMagic100FirstBuyerWL(user1.address, true);

			const user1USDTOpenBalance = await usdt.tokenFacet.balanceOf(user1.address);

			const result = platformFacetUser1.buyMagic100Token(); //Only an approved account can buy the Magic token
			await expect(result).not.to.be.reverted;

			let user1ArexaTokenBalance = await arexa.pfmTokenFacet.balanceOf(user1.address, arexa.const.MAGIC_TOKEN_ID);
			expect(user1ArexaTokenBalance).to.be.equal(1);

			let user1USDTCloseBalance = await usdt.tokenFacet.balanceOf(user1.address);
			expect(user1USDTCloseBalance).to.be.equal(user1USDTOpenBalance.sub(100n * BigInt(10 ** usdt.DECIMALS)));

			const resultWithError = platformAdminFacetOwn.buyMagic100TokenAdmin(user1.address);
			await expect(result).not.to.be.reverted;

			user1ArexaTokenBalance = await arexa.pfmTokenFacet.balanceOf(user1.address, arexa.const.MAGIC_TOKEN_ID);
			expect(user1ArexaTokenBalance).to.be.equal(2);

			user1USDTCloseBalance = await usdt.tokenFacet.balanceOf(user1.address);
			expect(user1USDTCloseBalance).to.be.equal(user1USDTOpenBalance.sub(200n * BigInt(10 ** usdt.DECIMALS)));
		});
	});
});
