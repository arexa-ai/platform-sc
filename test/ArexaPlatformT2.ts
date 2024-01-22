import "@nomicfoundation/hardhat-chai-matchers";
import { time, mine, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { call } from "./helpers/CallHelper";

import { deployDiamond } from "./ArexaPlatform";

describe("ArexaPlatform - T2 - Edge Token", function () {
	describe("User buy T2 (Edge token)", async function () {
		//
		it("Admin can create new subscription", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformAdminFacetOwn = arexa.platformAdminFacet.connect(arexa.ownerAddress);

			let tokenId = await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION2_TOKEN_TYPE);
			expect(tokenId).to.be.equal(0);

			let tokenResult = platformAdminFacetOwn.createSubscription(arexa.const.SUBSRIPTION2_TOKEN_TYPE, 2023, 12, 1000, 15, 1000);
			await expect(tokenResult).not.to.be.reverted;

			tokenId = await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION2_TOKEN_TYPE);
			expect(tokenId).to.be.equal(220231201);

			tokenResult = platformAdminFacetOwn.createSubscription(arexa.const.SUBSRIPTION2_TOKEN_TYPE, 2023, 12, 1000, 15, 1000);
			await expect(tokenResult).not.to.be.reverted;

			tokenId = await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION2_TOKEN_TYPE);
			expect(tokenId).to.be.equal(220231202);
		});

		it("Admin could not create new subscription for old month", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformAdminFacetOwn = arexa.platformAdminFacet.connect(arexa.ownerAddress);

			let tokenId = await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION2_TOKEN_TYPE);
			expect(tokenId).to.be.equal(0);

			let tokenResult = await platformAdminFacetOwn.createSubscription(arexa.const.SUBSRIPTION2_TOKEN_TYPE, 2023, 12, 1000, 15, 1000);
			await expect(tokenResult).not.to.be.reverted;

			tokenId = await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION2_TOKEN_TYPE);
			expect(tokenId).to.be.equal(220231201);

			const resErr = platformAdminFacetOwn.createSubscription(arexa.const.SUBSRIPTION2_TOKEN_TYPE, 2023, 11, 1000, 15, 1000);
			await expect(resErr).to.be.revertedWith("Can't create for old months");

			tokenId = await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION2_TOKEN_TYPE);
			expect(tokenId).to.be.equal(220231201);
		});

		it("User could not create new subscription", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformAdminFacetOwn = arexa.platformAdminFacet.connect(user1);

			let tokenId = await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION2_TOKEN_TYPE);
			expect(tokenId).to.be.equal(0);

			const resErr = platformAdminFacetOwn.createSubscription(arexa.const.SUBSRIPTION2_TOKEN_TYPE, 2023, 11, 1000, 15, 1000);
			await expect(resErr).to.be.revertedWithCustomError(platformAdminFacetOwn, "AccessDenied");

			tokenId = await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION2_TOKEN_TYPE);
			expect(tokenId).to.be.equal(0);
		});

		it("User can buy subscription", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformAdminFacetOwn = arexa.platformAdminFacet.connect(arexa.ownerAddress);

			const platformFacetuser1 = arexa.platformFacet.connect(user1);

			let tokenId = await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION2_TOKEN_TYPE);
			expect(tokenId).to.be.equal(0);

			let balance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, 120231201);
			expect(balance).to.be.equal(0);

			balance = await arexa.pfmTokenFacet.balanceOf(user1.address, 120231201);
			expect(balance).to.be.equal(0);

			const result1 = await platformAdminFacetOwn.createSubscription(
				arexa.const.SUBSRIPTION2_TOKEN_TYPE,
				2023,
				12,
				1000n,
				10n * BigInt(10 ** usdt.DECIMALS),
				1000n * BigInt(10 ** usdt.DECIMALS),
			);
			await expect(result1).not.to.be.reverted;

			tokenId = await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION2_TOKEN_TYPE);
			expect(tokenId).to.be.equal(220231201);

			balance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, tokenId);
			expect(balance).to.be.equal(1000);

			balance = await arexa.pfmTokenFacet.balanceOf(user1.address, tokenId);
			expect(balance).to.be.equal(0);

			balance = await usdt.tokenFacet.balanceOf(arexa.diamondAddress);
			expect(balance).to.be.equal(0);

			balance = await usdt.tokenFacet.balanceOf(user1.address);
			expect(balance).to.be.equal(1000000n * BigInt(10 ** usdt.DECIMALS));

			//---------------------------
			let value = await platformFacetuser1.calcSubscriptionPrice(tokenId, 1);
			expect(value).to.be.equal(10n * BigInt(10 ** usdt.DECIMALS));

			const result2 = platformFacetuser1.buySubscription(tokenId, 1);
			await expect(result2).not.to.be.reverted;

			balance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, tokenId);
			expect(balance).to.be.equal(999);

			balance = await arexa.pfmTokenFacet.balanceOf(user1.address, tokenId);
			expect(balance).to.be.equal(1);

			balance = await usdt.tokenFacet.balanceOf(arexa.diamondAddress);
			expect(balance).to.be.equal(0n + value.toBigInt());

			balance = await usdt.tokenFacet.balanceOf(user1.address);
			expect(balance).to.be.equal(1000000n * BigInt(10 ** usdt.DECIMALS) - value.toBigInt());

			//---------------------------
			value = await platformFacetuser1.calcSubscriptionPrice(tokenId, 1);
			expect(value).to.be.equal((10_020_030n * BigInt(10 ** usdt.DECIMALS)) / 1000000n); // 10,020030

			const result3 = platformFacetuser1.buySubscription(tokenId, 1);
			await expect(result3).not.to.be.reverted;

			balance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, tokenId);
			expect(balance).to.be.equal(998);

			balance = await arexa.pfmTokenFacet.balanceOf(user1.address, tokenId);
			expect(balance).to.be.equal(2);

			value = await platformFacetuser1.calcSubscriptionPrice(tokenId, 100);
			expect(value).to.be.equal((1_114_576_205n * BigInt(10 ** usdt.DECIMALS)) / 1000000n); // 1 114,5762050
		});

		it("Dynamic price calculation", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformAdminFacetOwn = arexa.platformAdminFacet.connect(arexa.ownerAddress);

			const platformFacetuser1 = arexa.platformFacet.connect(user1);

			let tokenId = await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION2_TOKEN_TYPE);
			expect(tokenId).to.be.equal(0);

			const result1 = await platformAdminFacetOwn.createSubscription(
				arexa.const.SUBSRIPTION2_TOKEN_TYPE,
				2023,
				12,
				1000,
				10n * BigInt(10 ** usdt.DECIMALS),
				1000n * BigInt(10 ** usdt.DECIMALS),
			);
			await expect(result1).not.to.be.reverted;

			tokenId = await arexa.platformFacet.getCurrentSubscriptionTokenId(arexa.const.SUBSRIPTION2_TOKEN_TYPE);
			expect(tokenId).to.be.equal(220231201);

			let value = await platformFacetuser1.calcSubscriptionPrice(tokenId, 1);
			expect(value).to.be.equal(10n * BigInt(10 ** usdt.DECIMALS));

			const result2 = platformFacetuser1.buySubscription(tokenId, 1);
			await expect(result2).not.to.be.reverted;

			value = await platformFacetuser1.calcSubscriptionPrice(tokenId, 1);
			expect(value).to.be.equal((10_020_030n * BigInt(10 ** usdt.DECIMALS)) / 1000000n); // 10,020030

			const result3 = platformFacetuser1.buySubscription(tokenId, 1);
			await expect(result3).not.to.be.reverted;

			value = await platformFacetuser1.calcSubscriptionPrice(tokenId, 100);
			expect(value).to.be.equal((1_114_576_205n * BigInt(10 ** usdt.DECIMALS)) / 1000000n); // 1 114,5762050
		});
	});
});
