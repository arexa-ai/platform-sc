import "@nomicfoundation/hardhat-chai-matchers";
import { ethers } from "hardhat";
import { time, mine, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { namedAccounts } from "../deploy-lib/namedAccounts";
import { deployDiamond } from "./ArexaPlatform";
import { call } from "./helpers/CallHelper";

describe("ArexaPlatformPoolPNLFacet", function () {
	it("Paremters of income sharing", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const tokenPNLFacet = arexa.poolPNLFacet;

		const t1 = await arexa.platformFacet.SUBSCR1_TOKEN_TYPE();
		const t2 = await arexa.platformFacet.SUBSCR2_TOKEN_TYPE();
		const t3 = await arexa.platformFacet.TRADER_TOKEN_ID();
		const t4 = await arexa.platformFacet.AREXA_TOKEN_ID();
		const t5 = await arexa.platformFacet.MAGIC_TOKEN_ID();

		const t1Param = await tokenPNLFacet.getArexaIncomeParameter(t1);
		expect(t1Param.pool).to.be.equal(90);
		expect(t1Param.arexa).to.be.equal(10);

		const t2Param = await tokenPNLFacet.getArexaIncomeParameter(t2);
		expect(t2Param.pool).to.be.equal(95);
		expect(t2Param.arexa).to.be.equal(5);

		const t3Param = await tokenPNLFacet.getArexaIncomeParameter(t3);
		expect(t3Param.pool).to.be.equal(995);
		expect(t3Param.arexa).to.be.equal(5);

		const t4Param = await tokenPNLFacet.getArexaIncomeParameter(t4);
		expect(t4Param.pool).to.be.equal(90);
		expect(t4Param.arexa).to.be.equal(10);

		const t5Param = await tokenPNLFacet.getArexaIncomeParameter(t5);
		expect(t5Param.pool).to.be.equal(0);
		expect(t5Param.arexa).to.be.equal(100);

		const wrongTokenId = tokenPNLFacet.getArexaIncomeParameter(0);
		await expect(wrongTokenId).to.be.reverted;
	});

	it("Setting paremters!", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const tokenPNLFacet = arexa.poolPNLFacet.connect(accounts[namedAccounts.diamondOwner]);

		const t1 = await arexa.platformFacet.SUBSCR1_TOKEN_TYPE();
		const t2 = await arexa.platformFacet.SUBSCR2_TOKEN_TYPE();
		const t3 = await arexa.platformFacet.TRADER_TOKEN_ID();
		const t4 = await arexa.platformFacet.AREXA_TOKEN_ID();
		const t5 = await arexa.platformFacet.MAGIC_TOKEN_ID();

		let t1Param = await tokenPNLFacet.getArexaIncomeParameter(t1);
		expect(t1Param.pool).to.be.equal(90);
		expect(t1Param.arexa).to.be.equal(10);
		const t1ParamNew = tokenPNLFacet.setArexaIncomeParameter(t1, 10, 20);
		await expect(t1ParamNew).not.to.be.reverted;
		t1Param = await tokenPNLFacet.getArexaIncomeParameter(t1);
		expect(t1Param.pool).to.be.equal(10);
		expect(t1Param.arexa).to.be.equal(20);

		let t2Param = await tokenPNLFacet.getArexaIncomeParameter(t2);
		expect(t2Param.pool).to.be.equal(95);
		expect(t2Param.arexa).to.be.equal(5);
		const t2ParamNew = tokenPNLFacet.setArexaIncomeParameter(t2, 11, 21);
		await expect(t2ParamNew).not.to.be.reverted;
		t2Param = await tokenPNLFacet.getArexaIncomeParameter(t2);
		expect(t2Param.pool).to.be.equal(11);
		expect(t2Param.arexa).to.be.equal(21);

		let t3Param = await tokenPNLFacet.getArexaIncomeParameter(t3);
		expect(t3Param.pool).to.be.equal(995);
		expect(t3Param.arexa).to.be.equal(5);
		const t3ParamNew = tokenPNLFacet.setArexaIncomeParameter(t3, 12, 22);
		await expect(t3ParamNew).not.to.be.reverted;
		t3Param = await tokenPNLFacet.getArexaIncomeParameter(t3);
		expect(t3Param.pool).to.be.equal(12);
		expect(t3Param.arexa).to.be.equal(22);

		let t4Param = await tokenPNLFacet.getArexaIncomeParameter(t4);
		expect(t4Param.pool).to.be.equal(90);
		expect(t4Param.arexa).to.be.equal(10);
		const t4ParamNew = tokenPNLFacet.setArexaIncomeParameter(t4, 9, 15);
		await expect(t4ParamNew).not.to.be.reverted;
		t4Param = await tokenPNLFacet.getArexaIncomeParameter(t4);
		expect(t4Param.pool).to.be.equal(9);
		expect(t4Param.arexa).to.be.equal(15);

		let t5Param = await tokenPNLFacet.getArexaIncomeParameter(t5);
		expect(t5Param.pool).to.be.equal(0);
		expect(t5Param.arexa).to.be.equal(100);
		const t5ParamNew = tokenPNLFacet.setArexaIncomeParameter(t5, 94, 81);
		await expect(t5ParamNew).not.to.be.reverted;
		t5Param = await tokenPNLFacet.getArexaIncomeParameter(t5);
		expect(t5Param.pool).to.be.equal(94);
		expect(t5Param.arexa).to.be.equal(81);

		const cannotSet = arexa.poolPNLFacet.setArexaIncomeParameter(0, 10, 5);
		await expect(cannotSet).to.be.reverted;
	});

	it("Payout Arexa Income and Arexa dividend", async function () {
		const { accounts, user1, user2, owner, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const platformFacetUser1 = arexa.platformFacet.connect(user1);
		const arexaTokenFacetUser1 = arexa.pfmTokenFacet.connect(user1);
		const poolPNLFacetUser1 = arexa.poolPNLFacet.connect(user1);
		const poolPNLFacetAdmin = arexa.poolPNLFacet.connect(owner);

		await call(platformFacetUser1.buyArexaToken(10000n * BigInt(10 ** usdt.DECIMALS), arexa.const.AMOUNT)); //

		let user1ArexaTokenBalance = await arexaTokenFacetUser1.balanceOf(user1.address, arexa.const.AREXA_TOKEN_ID);
		expect(user1ArexaTokenBalance).to.be.equal(100_000);

		let balances = await arexa.poolPNLFacet.getPoolAndArexaIncomeBalances();
		expect(balances.pool).to.be.equal(9_000n * BigInt(10 ** usdt.DECIMALS));
		expect(balances.poolPaidOut).to.be.equal(0n);
		expect(balances.arexa).to.be.equal(1_000n * BigInt(10 ** usdt.DECIMALS));
		expect(balances.arexaPaidOut).to.be.equal(0n);

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

		balances = await arexa.poolPNLFacet.getPoolAndArexaIncomeBalances();
		expect(balances.pool).to.be.equal(18_000n * BigInt(10 ** usdt.DECIMALS));
		expect(balances.poolPaidOut).to.be.equal(0n);
		expect(balances.arexa).to.be.equal(2_000n * BigInt(10 ** usdt.DECIMALS));
		expect(balances.arexaPaidOut).to.be.equal(0n);

		let trx = poolPNLFacetUser1.payoutArexaIncome(user1.address, 1994n * BigInt(10 ** usdt.DECIMALS));
		await expect(trx).to.be.reverted;
		trx = poolPNLFacetUser1.payoutArexaDivident(user1.address, 1994n * BigInt(10 ** usdt.DECIMALS));
		await expect(trx).to.be.reverted;

		trx = poolPNLFacetAdmin.payoutArexaIncome(owner.address, 1994n * BigInt(10 ** usdt.DECIMALS));
		await expect(trx).not.to.be.reverted;

		balances = await arexa.poolPNLFacet.getPoolAndArexaIncomeBalances();
		expect(balances.pool).to.be.equal(18_000n * BigInt(10 ** usdt.DECIMALS));
		expect(balances.poolPaidOut).to.be.equal(0n * BigInt(10 ** usdt.DECIMALS));
		expect(balances.arexa).to.be.equal(2_000n * BigInt(10 ** usdt.DECIMALS));
		expect(balances.arexaPaidOut).to.be.equal(1994n * BigInt(10 ** usdt.DECIMALS));

		trx = poolPNLFacetAdmin.payoutArexaDivident(owner.address, 1994n * BigInt(10 ** usdt.DECIMALS));
		await expect(trx).not.to.be.reverted;

		balances = await arexa.poolPNLFacet.getPoolAndArexaIncomeBalances();
		expect(balances.pool).to.be.equal(18_000n * BigInt(10 ** usdt.DECIMALS));
		expect(balances.poolPaidOut).to.be.equal(1994n * BigInt(10 ** usdt.DECIMALS));
		expect(balances.arexa).to.be.equal(2_000n * BigInt(10 ** usdt.DECIMALS));
		expect(balances.arexaPaidOut).to.be.equal(1994n * BigInt(10 ** usdt.DECIMALS));

		trx = poolPNLFacetAdmin.payoutArexaIncome(owner.address, 7n * BigInt(10 ** usdt.DECIMALS));
		await expect(trx).to.be.reverted;
		trx = poolPNLFacetAdmin.payoutArexaDivident(owner.address, 15_998n * BigInt(10 ** usdt.DECIMALS));
		await expect(trx).to.be.revertedWith("The amount is bigger then tha payable divident!");

		trx = poolPNLFacetAdmin.payoutArexaIncome(owner.address, 6n * BigInt(10 ** usdt.DECIMALS));
		await expect(trx).not.to.be.reverted;

		balances = await arexa.poolPNLFacet.getPoolAndArexaIncomeBalances();
		expect(balances.pool).to.be.equal(18_000n * BigInt(10 ** usdt.DECIMALS));
		expect(balances.poolPaidOut).to.be.equal(1994n * BigInt(10 ** usdt.DECIMALS));
		expect(balances.arexa).to.be.equal(2_000n * BigInt(10 ** usdt.DECIMALS));
		expect(balances.arexaPaidOut).to.be.equal(2_000n * BigInt(10 ** usdt.DECIMALS));

		trx = poolPNLFacetAdmin.payoutArexaDivident(owner.address, 15_997n * BigInt(10 ** usdt.DECIMALS));
		await expect(trx).not.to.be.reverted;

		balances = await arexa.poolPNLFacet.getPoolAndArexaIncomeBalances();
		expect(balances.pool).to.be.equal(18_000n * BigInt(10 ** usdt.DECIMALS));
		expect(balances.poolPaidOut).to.be.equal((9000n + 8991n) * BigInt(10 ** usdt.DECIMALS));
		expect(balances.arexa).to.be.equal(2_000n * BigInt(10 ** usdt.DECIMALS));
		expect(balances.arexaPaidOut).to.be.equal(2_000n * BigInt(10 ** usdt.DECIMALS));
	});

	it("Inventory calculations", async function () {
		const { accounts, user1, user2, owner, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const platformFacetUser1 = arexa.platformFacet.connect(user1);
		const arexaTokenFacetUser1 = arexa.pfmTokenFacet.connect(user1);

		await call(platformFacetUser1.buyArexaToken(10000n * BigInt(10 ** usdt.DECIMALS), arexa.const.AMOUNT));

		let user1ArexaTokenBalance = await arexaTokenFacetUser1.balanceOf(user1.address, arexa.const.AREXA_TOKEN_ID);
		expect(user1ArexaTokenBalance).to.be.equal(100_000);

		const inv = await arexa.poolPNLFacet.getInventory();
		const invItem = await arexa.poolPNLFacet.getInventoryItem(user1.address);
		expect(inv.sumQuantity).to.be.equal(100n * BigInt(10 ** usdt.DECIMALS));
		expect(inv.sumAmount).to.be.equal(9_000n * BigInt(10 ** usdt.DECIMALS));
		expect(invItem.quantity).to.be.equal(100_000n);
		expect(invItem.deltaPnl).to.be.equal(-9n * BigInt(10 ** usdt.DECIMALS));
		expect(invItem.payedPnl).to.be.equal(0n);
	});
});
