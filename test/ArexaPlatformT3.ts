import "@nomicfoundation/hardhat-chai-matchers";
import { time, mine, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { call } from "./helpers/CallHelper";

import { deployDiamond } from "./ArexaPlatform";

describe("ArexaPlatform - T3 - Trader Token", function () {
	describe("User buy T3 (Trader Token)", async function () {
		it("User can buy T3 token", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformFacetuser1 = arexa.platformFacet.connect(user1);

			const tokenId = arexa.const.TRDAER_TOKEN_ID;

			let balance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, tokenId);
			expect(balance).to.be.equal(0);

			balance = await arexa.pfmTokenFacet.balanceOf(user1.address, tokenId);
			expect(balance).to.be.equal(0);

			const result = platformFacetuser1.buyTraderToken(10000n * BigInt(10 ** usdt.DECIMALS), arexa.const.AMOUNT);
			await expect(result).not.to.be.reverted;

			balance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, tokenId);
			expect(balance).to.be.equal(0);

			balance = await arexa.pfmTokenFacet.balanceOf(user1.address, tokenId);
			expect(balance).to.be.equal(10_000n);

			balance = await usdt.tokenFacet.balanceOf(arexa.diamondAddress);
			expect(balance).to.be.equal(10_000n * BigInt(10 ** usdt.DECIMALS));

			balance = await usdt.tokenFacet.balanceOf(user1.address);
			expect(balance).to.be.equal(990_000n * BigInt(10 ** usdt.DECIMALS));
		});
	});
});
