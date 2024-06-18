import "@nomicfoundation/hardhat-chai-matchers";
import { ethers } from "hardhat";
import { time, mine, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { namedAccounts } from "../deploy-lib/namedAccounts";
import { deployDiamond } from "./ArexaPlatform";
import { zeroAddress } from "../deploy-lib/utils";

describe("ArexaPlatformPausableFacet", function () {
	it("Paying token is set", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const tokenAdminFacet = arexa.adminFacet.connect(accounts[namedAccounts.diamondOwner]);

		const payingToken = await tokenAdminFacet.getPayingToken();
		expect(payingToken).to.be.equal("0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82");
	});

	it("Arexa ERC20 token is set", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const tokenAdminFacet = arexa.adminFacet.connect(accounts[namedAccounts.diamondOwner]);

		const arexaERC20Token = await tokenAdminFacet.getArexaERC20Token();
		expect(arexaERC20Token).to.be.equal("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
	});

	it("Modify Paying token is not possible", async function () {
		const { accounts, user1, user2, arexa, rxai, usdt } = await loadFixture(deployDiamond);

		const tokenAdminFacet = arexa.adminFacet.connect(accounts[namedAccounts.diamondOwner]);

		const result = tokenAdminFacet.setPayingToken(zeroAddress);
		await expect(result).to.be.revertedWith("Currently changing payment token is not permitted.");
	});
});
