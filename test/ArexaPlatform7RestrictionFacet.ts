import "@nomicfoundation/hardhat-chai-matchers";
import { ethers } from "hardhat";
import { time, mine, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { namedAccounts } from "../deploy-lib/namedAccounts";
import { deployDiamond } from "./ArexaPlatform";
import { call } from "./helpers/CallHelper";

describe("ArexaPlatformRestrictionFacet", function () {
	it("Check restriction", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const usdtTokenFacetUser1 = usdt.tokenFacet.connect(user1);
		const platformFacetUser1 = arexa.platformFacet.connect(user1);
		const arexaTokenFacetUser1 = arexa.pfmTokenFacet.connect(user1);

		const tokenId = arexa.const.AREXA_TOKEN_ID;

		const user1USDTOpenBalance = await usdtTokenFacetUser1.balanceOf(user1.address);

		//user buy token, 100 000 quantity = 10 000 USDT
		let trx = platformFacetUser1.buyArexaToken(10000n * BigInt(10 ** usdt.DECIMALS), arexa.const.AMOUNT);
		await expect(trx).not.to.be.reverted;

		let user1ArexaTokenBalance = await arexaTokenFacetUser1.balanceOf(user1.address, tokenId);
		expect(user1ArexaTokenBalance).to.be.equal(100000);

		const user1USDTCloseBalance = await usdtTokenFacetUser1.balanceOf(user1.address);
		expect(user1USDTCloseBalance).to.be.equal(user1USDTOpenBalance.sub(10000n * BigInt(10 ** usdt.DECIMALS)));

		await mine(1);
		expect(await arexa.restrictionFacet.calcUnrestrictedAmount(user1.address, tokenId, 10000)).to.be.equal(0);

		await mine(1);
		expect(await arexa.restrictionFacet.calcUnrestrictedAmount(user1.address, tokenId, 10000)).to.be.equal(8333);

		const checkResult1 = arexa.restrictionFacet.checkRestriction(user1.address, tokenId, 10000);
		await expect(checkResult1).to.be.revertedWith("The amount is grater then the accumlated ('sellable') amount!");

		const checkResult2 = await arexa.restrictionFacet.checkRestriction(user1.address, tokenId, 8333);
		expect(checkResult2).to.be.equal(true); //revertedWith("The amount is grater then the accumlated ('sellable') amount!");
	});

	it("Batch Check restriction", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const usdtTokenFacetUser1 = usdt.tokenFacet.connect(user1);
		const platformFacetUser1 = arexa.platformFacet.connect(user1);
		const arexaTokenFacetUser1 = arexa.pfmTokenFacet.connect(user1);

		const tokenId = arexa.const.AREXA_TOKEN_ID;

		const user1USDTOpenBalance = await usdtTokenFacetUser1.balanceOf(user1.address);

		//user buy token, 100 000 quantity = 10 000 USDT
		let trx = platformFacetUser1.buyArexaToken(10000n * BigInt(10 ** usdt.DECIMALS), arexa.const.AMOUNT);
		await expect(trx).not.to.be.reverted;

		let user1ArexaTokenBalance = await arexaTokenFacetUser1.balanceOf(user1.address, tokenId);
		expect(user1ArexaTokenBalance).to.be.equal(100000);

		const user1USDTCloseBalance = await usdtTokenFacetUser1.balanceOf(user1.address);
		expect(user1USDTCloseBalance).to.be.equal(user1USDTOpenBalance.sub(10000n * BigInt(10 ** usdt.DECIMALS)));

		await mine(1);
		expect(await arexa.restrictionFacet.calcUnrestrictedAmount(user1.address, tokenId, 10000)).to.be.equal(0);

		await mine(1);
		expect(await arexa.restrictionFacet.calcUnrestrictedAmount(user1.address, tokenId, 10000)).to.be.equal(8333);

		const checkResult1 = arexa.restrictionFacet.checkRestrictions(user1.address, [tokenId, tokenId], [8333, 8334]);
		await expect(checkResult1).to.be.revertedWith("The amount is grater then the accumlated ('sellable') amount!");

		const checkResult2 = await arexa.restrictionFacet.checkRestrictions(user1.address, [tokenId, tokenId], [8333, 0]);
		expect(checkResult2).to.be.equal(true);
	});
});
