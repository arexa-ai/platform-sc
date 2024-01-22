import "@nomicfoundation/hardhat-chai-matchers";
import { time, mine, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { call } from "./helpers/CallHelper";

import { deployDiamond } from "./ArexaPlatform";

describe("ArexaPlatform - T4 - AREXA AI", function () {
	describe("User buy T4 (Arexa AI)", async function () {
		//
		it("Amount is given, but not approved payment token", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformFacetUser1 = arexa.platformFacet.connect(user1);

			//user buy token, 100 000 quantity = 10 000 USDT
			const result = platformFacetUser1.buyArexaToken(100000n * BigInt(10 ** usdt.DECIMALS), arexa.const.AMOUNT);
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

		it("Quantity is given", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const usdtTokenFacetUser1 = usdt.tokenFacet.connect(user1);
			const platformFacetUser1 = arexa.platformFacet.connect(user1);
			const arexaTokenFacetUser1 = arexa.pfmTokenFacet.connect(user1);

			const user1USDTOpenBalance = await usdtTokenFacetUser1.balanceOf(user1.address);

			//user buy token, 123456 quantity = 12345,6 USDT
			const result = platformFacetUser1.buyArexaToken(123456n, arexa.const.QUANTITY);
			await expect(result).not.to.be.reverted;

			const user1ArexaTokenBalance = await arexaTokenFacetUser1.balanceOf(user1.address, arexa.const.AREXA_TOKEN_ID);
			expect(user1ArexaTokenBalance).to.be.equal(123456);

			const user1USDTCloseBalance = await usdtTokenFacetUser1.balanceOf(user1.address);
			expect(user1USDTCloseBalance).to.be.equal(user1USDTOpenBalance.sub((123456n * BigInt(10 ** usdt.DECIMALS)) / 10n));
		});

		it("Selling restricted quantity after buying", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const usdtTokenFacetUser1 = usdt.tokenFacet.connect(user1);
			const platformFacetUser1 = arexa.platformFacet.connect(user1);
			const arexaTokenFacetUser1 = arexa.pfmTokenFacet.connect(user1);

			const tokenId = arexa.const.AREXA_TOKEN_ID;

			const user1USDTOpenBalance = await usdtTokenFacetUser1.balanceOf(user1.address);

			//user buy token, 100 000 quantity = 10 000 USDT
			let result = platformFacetUser1.buyArexaToken(10000n * BigInt(10 ** usdt.DECIMALS), arexa.const.AMOUNT);
			await expect(result).not.to.be.reverted;

			let user1ArexaTokenBalance = await arexaTokenFacetUser1.balanceOf(user1.address, tokenId);
			expect(user1ArexaTokenBalance).to.be.equal(100000);

			const user1USDTCloseBalance = await usdtTokenFacetUser1.balanceOf(user1.address);
			expect(user1USDTCloseBalance).to.be.equal(user1USDTOpenBalance.sub(10000n * BigInt(10 ** usdt.DECIMALS)));

			await mine(1);
			expect(await arexa.restrictionFacet.calcUnrestrictedAmount(user1.address, tokenId, 10000)).to.be.equal(0);

			await mine(1);
			expect(await arexa.restrictionFacet.calcUnrestrictedAmount(user1.address, tokenId, 10000)).to.be.equal(8333);

			result = arexaTokenFacetUser1.safeTransferFrom(user1.address, user2.address, tokenId, 10000, []);
			await expect(result).to.be.revertedWith("The amount is grater then the accumlated ('sellable') amount!");
		});

		it("Selling unrestricted quantity after buying", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const usdtTokenFacetUser1 = usdt.tokenFacet.connect(user1);
			const platformFacetUser1 = arexa.platformFacet.connect(user1);
			const arexaTokenFacetUser1 = arexa.pfmTokenFacet.connect(user1);

			const tokenId = arexa.const.AREXA_TOKEN_ID;

			const user1USDTOpenBalance = await usdtTokenFacetUser1.balanceOf(user1.address);

			//user buy token, 100 000 quantity = 10 000 USDT
			let result = platformFacetUser1.buyArexaToken(10000n * BigInt(10 ** usdt.DECIMALS), arexa.const.AMOUNT);
			await expect(result).not.to.be.reverted;

			let user1ArexaTokenBalance = await arexaTokenFacetUser1.balanceOf(user1.address, tokenId);
			expect(user1ArexaTokenBalance).to.be.equal(100000);

			const user1USDTCloseBalance = await usdtTokenFacetUser1.balanceOf(user1.address);
			expect(user1USDTCloseBalance).to.be.equal(user1USDTOpenBalance.sub(10000n * BigInt(10 ** usdt.DECIMALS)));

			await mine(1);
			expect(await arexa.restrictionFacet.calcUnrestrictedAmount(user1.address, tokenId, 10000)).to.be.equal(0);

			await mine(1);
			expect(await arexa.restrictionFacet.calcUnrestrictedAmount(user1.address, tokenId, 10000)).to.be.equal(8333);

			result = arexaTokenFacetUser1.safeTransferFrom(user1.address, user2.address, tokenId, 8333, []);
			await expect(result).not.to.be.reverted;
			expect(await arexaTokenFacetUser1.balanceOf(user1.address, tokenId)).to.be.equal(100000 - 8333);
			expect(await arexaTokenFacetUser1.balanceOf(user2.address, tokenId)).to.be.equal(8333);
		});

		// * User1 vesz T4, User1 vesz T4, User2 vesz T4 és PNL részlet jól számolódik
		it("PNL calculation after buying", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const usdtTokenFacetUser1 = usdt.tokenFacet.connect(user1);
			const platformFacetUser1 = arexa.platformFacet.connect(user1);
			const arexaTokenFacetUser1 = arexa.pfmTokenFacet.connect(user1);

			const usdtTokenFacetUser2 = usdt.tokenFacet.connect(user2);
			const platformFacetUser2 = arexa.platformFacet.connect(user2);
			const arexaTokenFacetUser2 = arexa.pfmTokenFacet.connect(user2);

			await call(platformFacetUser1.buyArexaToken(10000n * BigInt(10 ** usdt.DECIMALS), arexa.const.AMOUNT)); //

			let user1ArexaTokenBalance = await arexaTokenFacetUser1.balanceOf(user1.address, arexa.const.AREXA_TOKEN_ID);
			expect(user1ArexaTokenBalance).to.be.equal(100000);

			let inv = await arexa.poolPNLFacet.getInventory();
			let invItem = await arexa.poolPNLFacet.getInventoryItem(user1.address);
			expect(inv.sumQuantity).to.be.equal(100_000_000n);
			expect(inv.sumAmount).to.be.equal(9000_000_000n);
			expect(invItem.quantity).to.be.equal(100_000n);
			expect(invItem.deltaPnl).to.be.equal(-9_000_000n);
			expect(invItem.payedPnl).to.be.equal(0n);

			let divident = await arexa.poolPNLFacet.calcDivident(user1.address);
			expect(divident).to.be.equal(0);

			divident = await arexa.poolPNLFacet.calcDivident(arexa.diamondAddress);
			expect(divident).to.be.equal(9000n * BigInt(10 ** usdt.DECIMALS));

			//await mine(2);

			await call(platformFacetUser1.buyArexaToken(100000, arexa.const.QUANTITY)); //
			user1ArexaTokenBalance = await arexaTokenFacetUser1.balanceOf(user1.address, arexa.const.AREXA_TOKEN_ID);
			expect(user1ArexaTokenBalance).to.be.equal(200000);

			//calculate divident: only after the first payment pays divident, so only the first a 100 000 quantity
			//but not all the amount, only the fraction...
			//calculate divident: pool   * (quantity / sumQuantity) * 90%
			//calculate divident: 10 000 * (100 000  / 100 000 000) * 90%
			//calculate divident: 10     * (100      / 100        ) * 90% = 10 * 90% = 9 ;)
			divident = await arexa.poolPNLFacet.calcDivident(user1.address);
			expect(divident).to.be.equal(9n * BigInt(10 ** usdt.DECIMALS));

			divident = await arexa.poolPNLFacet.calcDivident(arexa.diamondAddress);
			expect(divident).to.be.equal((9000n + 8991n) * BigInt(10 ** usdt.DECIMALS));

			await call(platformFacetUser2.buyArexaToken(100000, await arexa.const.QUANTITY)); //
			let user2ArexaTokenBalance = await arexaTokenFacetUser2.balanceOf(user2.address, arexa.const.AREXA_TOKEN_ID);
			expect(user2ArexaTokenBalance).to.be.equal(100000);

			divident = await arexa.poolPNLFacet.calcDivident(user1.address);
			expect(divident).to.be.equal(27n * BigInt(10 ** usdt.DECIMALS));

			divident = await arexa.poolPNLFacet.calcDivident(user2.address);
			expect(divident).to.be.equal(0n * BigInt(10 ** usdt.DECIMALS));

			divident = await arexa.poolPNLFacet.calcDivident(arexa.diamondAddress);
			expect(divident).to.be.equal((9000n + 8982n + 8991n) * BigInt(10 ** usdt.DECIMALS));

			await call(platformFacetUser2.buyArexaToken(100000, arexa.const.QUANTITY)); //
			user2ArexaTokenBalance = await arexaTokenFacetUser2.balanceOf(user2.address, arexa.const.AREXA_TOKEN_ID);
			expect(user2ArexaTokenBalance).to.be.equal(200000);

			divident = await arexa.poolPNLFacet.calcDivident(user1.address);
			expect(divident).to.be.equal(45n * BigInt(10 ** usdt.DECIMALS));

			divident = await arexa.poolPNLFacet.calcDivident(user2.address);
			expect(divident).to.be.equal(9n * BigInt(10 ** usdt.DECIMALS));

			divident = await arexa.poolPNLFacet.calcDivident(arexa.diamondAddress);
			expect(divident).to.be.equal((9000n + 8991n + 8982n + 8973n) * BigInt(10 ** usdt.DECIMALS));
		});

		// * User1 vesz T4, ami felgyűlt azt withdraw, sikeres, és stakelt egyenleg csökken, saját számlára megy, más számlára csak allowance esetén
		it("Withdraw from staking and calculate PNLs", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const paymentTokenFacetUser1 = usdt.tokenFacet.connect(user1);
			const platformFacetUser1 = arexa.platformFacet.connect(user1);
			const arexaTokenFacetUser1 = arexa.pfmTokenFacet.connect(user1);
			const stakingFacetUser1 = arexa.stakingFacet.connect(user1);
			const rxaiTokenFacetUser1 = rxai.tokenFacet.connect(user1);

			const tokenId = arexa.const.AREXA_TOKEN_ID;

			const paymentTokenFacetUser2 = usdt.tokenFacet.connect(user2);
			const platformFacetUser2 = arexa.platformFacet.connect(user2);
			const arexaTokenFacetUser2 = arexa.pfmTokenFacet.connect(user2);
			const stakingFacetUser2 = arexa.stakingFacet.connect(user2);

			await call(platformFacetUser1.buyArexaToken(10000n * BigInt(10 ** usdt.DECIMALS), arexa.const.AMOUNT));

			let user1ArexaTokenBalance = await arexaTokenFacetUser1.balanceOf(user1.address, tokenId);
			expect(user1ArexaTokenBalance).to.be.equal(100000);

			expect(await arexa.restrictionFacet.calcUnrestrictedAmount(user1.address, tokenId, 1)).to.be.equal(0);

			await mine(1);
			expect(await arexa.restrictionFacet.calcUnrestrictedAmount(user1.address, tokenId, 1)).to.be.equal(0);

			await mine(1);
			expect(await arexa.restrictionFacet.calcUnrestrictedAmount(user1.address, tokenId, 0)).to.be.equal(8333);

			const withdrawResultError = stakingFacetUser1.withdrawArexaToken(user1.address, user1.address, 10000);
			await expect(withdrawResultError).to.be.revertedWith("The amount is grater then the accumlated ('sellable') amount!");

			const withdrawResult = stakingFacetUser1.withdrawArexaToken(user1.address, user1.address, 1000);
			await expect(withdrawResult).not.to.be.reverted;

			user1ArexaTokenBalance = await arexaTokenFacetUser1.balanceOf(user1.address, tokenId);
			expect(user1ArexaTokenBalance).to.be.equal(99000n);

			let user1RXAITokenBalance = await rxaiTokenFacetUser1.balanceOf(user1.address);
			expect(user1RXAITokenBalance).to.be.equal(1000n * BigInt(10 ** rxai.DECIMALS));
			//checRXIBalance(user1.address, 1000n)
			//

			//the calculated value is 0 because only change the distirbution of tokens. So the pool value does not change.
			let divident = await arexa.poolPNLFacet.calcDivident(user1.address);
			expect(divident).to.be.equal(0n * BigInt(10 ** usdt.DECIMALS));

			await call(platformFacetUser1.buyArexaToken(100000, arexa.const.QUANTITY)); //
			user1ArexaTokenBalance = await arexaTokenFacetUser1.balanceOf(user1.address, tokenId);
			expect(user1ArexaTokenBalance).to.be.equal(199000);

			divident = await arexa.poolPNLFacet.calcDivident(arexa.diamondAddress);
			expect(divident).to.be.equal(((900000n + 899109n) * BigInt(10 ** usdt.DECIMALS)) / 100n);

			await call(platformFacetUser2.buyArexaToken(100000, arexa.const.QUANTITY)); //
			let user2ArexaTokenBalance = await arexaTokenFacetUser2.balanceOf(user2.address, tokenId);
			expect(user2ArexaTokenBalance).to.be.equal(100000);

			divident = await arexa.poolPNLFacet.calcDivident(user1.address);
			expect(divident).to.be.equal((2682n * BigInt(10 ** usdt.DECIMALS)) / 100n);

			divident = await arexa.poolPNLFacet.calcDivident(user2.address);
			expect(divident).to.be.equal(0n * BigInt(10 ** usdt.DECIMALS));

			divident = await arexa.poolPNLFacet.calcDivident(arexa.diamondAddress);
			expect(divident).to.be.equal(((900000n + 899109n + 898209n) * BigInt(10 ** usdt.DECIMALS)) / 100n);

			await call(platformFacetUser2.buyArexaToken(100000, arexa.const.QUANTITY)); //
			user2ArexaTokenBalance = await arexaTokenFacetUser2.balanceOf(user2.address, tokenId);
			expect(user2ArexaTokenBalance).to.be.equal(200000);

			divident = await arexa.poolPNLFacet.calcDivident(user1.address);
			expect(divident).to.be.equal((4473n * BigInt(10 ** usdt.DECIMALS)) / 100n);

			divident = await arexa.poolPNLFacet.calcDivident(user2.address);
			expect(divident).to.be.equal(9n * BigInt(10 ** usdt.DECIMALS));

			divident = await arexa.poolPNLFacet.calcDivident(arexa.diamondAddress);
			expect(divident).to.be.equal(((900000n + 899109n + 898209n + 897309n) * BigInt(10 ** usdt.DECIMALS)) / 100n);
		});

		// * User1 vesz T4, ami felgyűlt azt withdraw, átutalja User2-nek és User2 stake-el viszont csak saját számláról lehet stake
		it("Withdraw then stake and calculate PNLs", async function () {
			const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformFacetUser1 = arexa.platformFacet.connect(user1);
			const stakingFacetUser1 = arexa.stakingFacet.connect(user1);
			const rxaiTokenFacetUser1 = rxai.tokenFacet.connect(user1);

			const tokenId = arexa.const.AREXA_TOKEN_ID;

			const platformFacetUser2 = arexa.platformFacet.connect(user2);
			const stakingFacetUser2 = arexa.stakingFacet.connect(user2);

			//------
			await call(platformFacetUser1.buyArexaToken(10000n * BigInt(10 ** usdt.DECIMALS), arexa.const.AMOUNT));

			let tokenBalance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, tokenId);
			expect(tokenBalance).to.be.equal(99900000n);

			tokenBalance = await arexa.pfmTokenFacet.balanceOf(user1.address, tokenId);
			expect(tokenBalance).to.be.equal(100000);

			let divident = await arexa.poolPNLFacet.calcDivident(arexa.diamondAddress);
			expect(divident).to.be.equal((900000n * BigInt(10 ** usdt.DECIMALS)) / 100n); //9000

			divident = await arexa.poolPNLFacet.calcDivident(user1.address);
			expect(divident).to.be.equal(0n * BigInt(10 ** usdt.DECIMALS));

			divident = await arexa.poolPNLFacet.calcDivident(user2.address);
			expect(divident).to.be.equal(0n * BigInt(10 ** usdt.DECIMALS));

			//restriction
			expect(await arexa.restrictionFacet.calcUnrestrictedAmount(user1.address, tokenId, 1)).to.be.equal(0);

			await mine(1);
			expect(await arexa.restrictionFacet.calcUnrestrictedAmount(user1.address, tokenId, 1)).to.be.equal(0);

			await mine(1);
			expect(await arexa.restrictionFacet.calcUnrestrictedAmount(user1.address, tokenId, 0)).to.be.equal(8333);

			//Withdraw
			const withdrawResultError = stakingFacetUser1.withdrawArexaToken(user1.address, user1.address, 10000);
			await expect(withdrawResultError).to.be.revertedWith("The amount is grater then the accumlated ('sellable') amount!");

			const withdrawResult = stakingFacetUser1.withdrawArexaToken(user1.address, user1.address, 1000);
			await expect(withdrawResult).not.to.be.reverted;

			tokenBalance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, tokenId);
			expect(tokenBalance).to.be.equal(99901000n);

			tokenBalance = await arexa.pfmTokenFacet.balanceOf(user1.address, tokenId);
			expect(tokenBalance).to.be.equal(99000n);

			divident = await arexa.poolPNLFacet.calcDivident(arexa.diamondAddress);
			expect(divident).to.be.equal((900000n * BigInt(10 ** usdt.DECIMALS)) / 100n); //9000

			divident = await arexa.poolPNLFacet.calcDivident(user1.address);
			expect(divident).to.be.equal(0n * BigInt(10 ** usdt.DECIMALS));

			divident = await arexa.poolPNLFacet.calcDivident(user2.address);
			expect(divident).to.be.equal(0n * BigInt(10 ** usdt.DECIMALS));

			tokenBalance = await rxai.tokenFacet.balanceOf(user1.address);
			expect(tokenBalance).to.be.equal(1000n * BigInt(10 ** rxai.DECIMALS));
			tokenBalance = await rxai.tokenFacet.balanceOf(user2.address);
			expect(tokenBalance).to.be.equal(0n * BigInt(10 ** rxai.DECIMALS));

			await call(rxaiTokenFacetUser1.transfer(user2.address, 1000n * BigInt(10 ** rxai.DECIMALS)));

			tokenBalance = await rxai.tokenFacet.balanceOf(user1.address);
			expect(tokenBalance).to.be.equal(0n * BigInt(10 ** rxai.DECIMALS));
			tokenBalance = await rxai.tokenFacet.balanceOf(user2.address);
			expect(tokenBalance).to.be.equal(1000n * BigInt(10 ** rxai.DECIMALS));

			//the calculated value is 0 because only change the distirbution of tokens. So the pool value does not change.
			divident = await arexa.poolPNLFacet.calcDivident(arexa.diamondAddress);
			expect(divident).to.be.equal((900000n * BigInt(10 ** usdt.DECIMALS)) / 100n); //9000

			divident = await arexa.poolPNLFacet.calcDivident(user1.address);
			expect(divident).to.be.equal(0n * BigInt(10 ** usdt.DECIMALS));

			divident = await arexa.poolPNLFacet.calcDivident(user2.address);
			expect(divident).to.be.equal(0n * BigInt(10 ** usdt.DECIMALS));

			//------
			await call(platformFacetUser1.buyArexaToken(100000, arexa.const.QUANTITY)); //
			tokenBalance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, tokenId);
			expect(tokenBalance).to.be.equal(99801000n);

			tokenBalance = await arexa.pfmTokenFacet.balanceOf(user1.address, tokenId);
			expect(tokenBalance).to.be.equal(199000n);

			divident = await arexa.poolPNLFacet.calcDivident(arexa.diamondAddress);
			expect(divident).to.be.equal(((900000n + 899109n) * BigInt(10 ** usdt.DECIMALS)) / 100n);

			divident = await arexa.poolPNLFacet.calcDivident(user1.address);
			expect(divident).to.be.equal((891n * BigInt(10 ** usdt.DECIMALS)) / 100n);

			divident = await arexa.poolPNLFacet.calcDivident(user2.address);
			expect(divident).to.be.equal(0n * BigInt(10 ** usdt.DECIMALS));

			//------
			await call(platformFacetUser2.buyArexaToken(100000, arexa.const.QUANTITY)); //
			tokenBalance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, tokenId);
			expect(tokenBalance).to.be.equal(99701000n);
			tokenBalance = await arexa.pfmTokenFacet.balanceOf(user2.address, tokenId);
			expect(tokenBalance).to.be.equal(100000n);

			divident = await arexa.poolPNLFacet.calcDivident(arexa.diamondAddress);
			expect(divident).to.be.equal(((900000n + 899109n + 898209n) * BigInt(10 ** usdt.DECIMALS)) / 100n);

			//await calcDivident(arexa, usdt, user1.address, 2682n, 100n); //26,82
			divident = await arexa.poolPNLFacet.calcDivident(user1.address);
			expect(divident).to.be.equal(((891n + 891n + 900n) * BigInt(10 ** usdt.DECIMALS)) / 100n);

			divident = await arexa.poolPNLFacet.calcDivident(user2.address);
			expect(divident).to.be.equal(0n * BigInt(10 ** usdt.DECIMALS));

			await call(stakingFacetUser2.stakeArexaToken(1000n * BigInt(10 ** 18)));
			tokenBalance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, tokenId);
			expect(tokenBalance).to.be.equal(99700000n);

			tokenBalance = await arexa.pfmTokenFacet.balanceOf(user2.address, tokenId);
			expect(tokenBalance).to.be.equal(101000);

			divident = await arexa.poolPNLFacet.calcDivident(arexa.diamondAddress);
			expect(divident).to.be.equal(((900000n + 899109n + 898209n) * BigInt(10 ** usdt.DECIMALS)) / 100n);

			//await calcDivident(arexa, usdt, user1.address, 2682n, 100n); //26,82
			divident = await arexa.poolPNLFacet.calcDivident(user1.address);
			expect(divident).to.be.equal(((891n + 891n + 900n) * BigInt(10 ** usdt.DECIMALS)) / 100n);

			divident = await arexa.poolPNLFacet.calcDivident(user2.address);
			expect(divident).to.be.equal(0n * BigInt(10 ** usdt.DECIMALS));

			await call(platformFacetUser2.buyArexaToken(100000, arexa.const.QUANTITY)); //
			tokenBalance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, tokenId);
			expect(tokenBalance).to.be.equal(99600000n);
			tokenBalance = await arexa.pfmTokenFacet.balanceOf(user2.address, tokenId);
			expect(tokenBalance).to.be.equal(201000);

			divident = await arexa.poolPNLFacet.calcDivident(arexa.diamondAddress);
			expect(divident).to.be.equal(((900000n + 899109n + 898209n + 897300n) * BigInt(10 ** usdt.DECIMALS)) / 100n);

			divident = await arexa.poolPNLFacet.calcDivident(user1.address);
			expect(divident).to.be.equal(((891n + 891n + 900n + 891n + 900n) * BigInt(10 ** usdt.DECIMALS)) / 100n);

			divident = await arexa.poolPNLFacet.calcDivident(user2.address);
			expect(divident).to.be.equal((909n * BigInt(10 ** usdt.DECIMALS)) / 100n);
		});
	});

	describe("Pay T4 (Arexa AI) form pool", async function () {
		it("Pay Arexa token from pool - POOL_AREXAINC", async function () {
			const { accounts, user1, user2, owner, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformFacetOwner = arexa.platformAdminFacet.connect(owner);

			const result = platformFacetOwner.payArexaTokenFromPool(arexa.const.POOL_AREXAINC, user1.address, 10_000);
			await expect(result).not.to.be.reverted;

			const pool = await platformFacetOwner.getArexaTokenPool(arexa.const.POOL_AREXAINC);
			expect(pool.total).to.be.equal(5_000_000);
			expect(pool.sold).to.be.equal(10_000);

			let balance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, arexa.const.AREXA_TOKEN_ID);
			expect(balance).to.be.equal(99_990_000);

			balance = await arexa.pfmTokenFacet.balanceOf(user1.address, arexa.const.AREXA_TOKEN_ID);
			expect(balance).to.be.equal(10_000);
		});

		it("Pay Arexa token from pool - POOL_MARKETING", async function () {
			const { accounts, user1, user2, owner, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformFacetOwner = arexa.platformAdminFacet.connect(owner);

			const result = platformFacetOwner.payArexaTokenFromPool(arexa.const.POOL_MARKETING, user1.address, 10_000);
			await expect(result).not.to.be.reverted;

			const pool = await platformFacetOwner.getArexaTokenPool(arexa.const.POOL_MARKETING);
			expect(pool.total).to.be.equal(5_000_000);
			expect(pool.sold).to.be.equal(10_000);

			let balance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, arexa.const.AREXA_TOKEN_ID);
			expect(balance).to.be.equal(99_990_000);

			balance = await arexa.pfmTokenFacet.balanceOf(user1.address, arexa.const.AREXA_TOKEN_ID);
			expect(balance).to.be.equal(10_000);
		});

		it("Pay Arexa token from pool - POOL_DEVELOPMENT", async function () {
			const { accounts, user1, user2, owner, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformFacetOwner = arexa.platformAdminFacet.connect(owner);

			const result = platformFacetOwner.payArexaTokenFromPool(arexa.const.POOL_DEVELOPMENT, user1.address, 10_000);
			await expect(result).not.to.be.reverted;

			const pool = await platformFacetOwner.getArexaTokenPool(arexa.const.POOL_DEVELOPMENT);
			expect(pool.total).to.be.equal(5_000_000);
			expect(pool.sold).to.be.equal(10_000);

			let balance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, arexa.const.AREXA_TOKEN_ID);
			expect(balance).to.be.equal(99_990_000);

			balance = await arexa.pfmTokenFacet.balanceOf(user1.address, arexa.const.AREXA_TOKEN_ID);
			expect(balance).to.be.equal(10_000);
		});

		it("Pay Arexa token from pool when it is empty is not possible", async function () {
			const { accounts, user1, user2, owner, arexa, rxai, usdt } = await loadFixture(deployDiamond);

			const platformFacetOwner = arexa.platformAdminFacet.connect(owner);

			const result1 = platformFacetOwner.payArexaTokenFromPool(arexa.const.POOL_DEVELOPMENT, user1.address, 4_000_000);
			await expect(result1).not.to.be.reverted;

			const result2 = platformFacetOwner.payArexaTokenFromPool(arexa.const.POOL_DEVELOPMENT, user1.address, 1_000_000);
			await expect(result2).not.to.be.reverted;

			const pool = await platformFacetOwner.getArexaTokenPool(arexa.const.POOL_DEVELOPMENT);
			expect(pool.total).to.be.equal(5_000_000);
			expect(pool.sold).to.be.equal(5_000_000);

			let balance = await arexa.pfmTokenFacet.balanceOf(arexa.diamondAddress, arexa.const.AREXA_TOKEN_ID);
			expect(balance).to.be.equal(95_000_000);

			balance = await arexa.pfmTokenFacet.balanceOf(user1.address, arexa.const.AREXA_TOKEN_ID);
			expect(balance).to.be.equal(5_000_000);

			const result3 = platformFacetOwner.payArexaTokenFromPool(arexa.const.POOL_DEVELOPMENT, user1.address, 1);
			await expect(result3).to.be.revertedWith("Not enoguh token to gift");
		});
	});
});
