import "@nomicfoundation/hardhat-chai-matchers";
import { ethers, deployments, network } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { namedAccounts } from "../deploy-lib/namedAccounts";
import { ArexaTokenACLFacet, ArexaTokenAMLFacet } from "../typechain-types";
import { Address } from "hardhat-deploy/types";
import { ParamType } from "ethers/lib/utils";
import { EIP712Domain, EIP712TypeDefinition } from "./helpers/EIP712.types";
import { signTypedData } from "./helpers/EIP712";
import {
	DescriptorTypeToken,
	getArexaTokenDeploymentDescriptor,
} from "../deploy-lib/arexa-token-deployment/arexa-token-deployment-descriptor";

describe("ArexaTokenOwnershipFacet", function () {
	async function deployDiamondWithFacet() {
		const accounts = await ethers.getSigners();

		await deployments.fixture(["hRXAIDiamond"]);

		const descriptorToken = getArexaTokenDeploymentDescriptor(DescriptorTypeToken.hRXAI);

		const diamond = await deployments.get(descriptorToken.diamond.name);

		const tokenAMLFacetDefault = (await ethers.getContractAt(
			descriptorToken.facets.amlFacet.artifact,
			diamond.address,
			accounts[namedAccounts.diamondOwner],
		)) as ArexaTokenAMLFacet;

		return {
			accounts,
			diamondAddress: diamond.address,
			tokenAMLFacetDefault,
		};
	}

	// it("Check signature", async function () {
	// 	const { accounts, diamondAddress, tokenAMLFacetDefault } = await loadFixture(deployDiamondWithFacet);

	// 	let tokenAMLFacet = tokenAMLFacetDefault;

	// 	// Create an EIP712 domainSeparator
	// 	// https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator
	// 	const domainName = "BlockBen Sphere"; // the user readable name of signing domain, i.e. the name of the DApp or the protocol.
	// 	const signatureVersion = "1"; // the current major version of the signing domain. Signatures from different versions are not compatible.
	// 	const chainId = network.config.chainId as number; // the EIP-155 chain id. The user-agent should refuse signing if it does not match the currently active chain.
	// 	// The typeHash is designed to turn into a compile time constant in Solidity. For example:
	// 	// bytes32 constant MAIL_TYPEHASH = keccak256("Mail(address from,address to,string contents)");
	// 	// https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash
	// 	//const typeHash = "Ticket(string eventName,uint256 price)";
	// 	//const argumentTypeHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(typeHash)); // convert to byteslike, then hash it

	// 	// https://eips.ethereum.org/EIPS/eip-712#specification-of-the-eth_signtypeddata-json-rpc
	// 	const types: EIP712TypeDefinition = {
	// 		BridgeRequestTest: [
	// 			{ name: "fromChainId", type: "uint256" },
	// 			{ name: "fromToken", type: "address" },
	// 			{ name: "fromAddress", type: "address" },
	// 			{ name: "toChainId", type: "uint256" },
	// 			{ name: "toToken", type: "address" },
	// 			{ name: "toAddress", type: "address" },
	// 			{ name: "amount", type: "uint256" },
	// 			{ name: "nonce", type: "uint256" },
	// 		],
	// 	};

	// 	const domain: EIP712Domain = {
	// 		name: domainName,
	// 		version: signatureVersion,
	// 		chainId: chainId,
	// 		verifyingContract: diamondAddress,
	// 	};

	// 	const request = {
	// 		fromChainId: 1,
	// 		fromToken: diamondAddress,
	// 		fromAddress: await accounts[namedAccounts.user1].getAddress(),
	// 		toChainId: 97,
	// 		toToken: diamondAddress,
	// 		toAddress: await accounts[namedAccounts.user1].getAddress(),
	// 		amount: 100,
	// 		nonce: 52342342323,
	// 	};

	// 	const user1Signer = accounts[namedAccounts.user1];
	// 	const user2Signer = accounts[namedAccounts.user2];

	// 	const signature = await signTypedData(domain, types, request, user1Signer);
	// 	const badSignature = await signTypedData(domain, types, request, user2Signer);

	// 	tokenAMLFacet = tokenAMLFacet.connect(user2Signer);
	// 	await tokenAMLFacet.initializeDoaminSeparator(domainName, signatureVersion);
	// 	await expect(tokenAMLFacet.connect(user2Signer).testRequestSig(request, badSignature)).to.be.revertedWith("Wrong signature 2");
	// 	await expect(tokenAMLFacet.connect(user1Signer).testRequestSig(request, signature)).not.to.be.reverted;
	// });

	it("Only a new AML admin can set!", async function () {
		const { accounts, diamondAddress, tokenAMLFacetDefault } = await loadFixture(deployDiamondWithFacet);

		let tokenAMLFacet = tokenAMLFacetDefault;

		const ownerSigner = accounts[namedAccounts.diamondOwner];
		const amlAdminSigner = accounts[namedAccounts.tokenAML];
		const amlAdminAccount = await amlAdminSigner.getAddress();
		const userAccount = await accounts[namedAccounts.user2].getAddress();

		const SenderBlackList = await tokenAMLFacetDefault.SENDER_BLACKLIST();
		const RecipientBlackList = await tokenAMLFacetDefault.RECIPIENT_BLACKLIST();

		const descriptorToken = getArexaTokenDeploymentDescriptor(DescriptorTypeToken.hRXAI);
		const tokenACLFacet = (await ethers.getContractAt(
			descriptorToken.facets.aclFacet.artifact,
			diamondAddress,
			accounts[namedAccounts.diamondOwner],
		)) as ArexaTokenACLFacet;

		const amlAdminRole = await tokenACLFacet.AML_ROLE();

		let hasRole = await tokenACLFacet.hasRole(amlAdminRole, amlAdminAccount);
		expect(hasRole).to.be.equal(false);

		let result = tokenACLFacet.grantRole(amlAdminRole, amlAdminAccount);
		await expect(result).not.to.be.reverted;

		hasRole = await tokenACLFacet.hasRole(amlAdminRole, amlAdminAccount);
		expect(hasRole).to.be.equal(true);

		//new AML admin can set
		tokenAMLFacet = tokenAMLFacet.connect(amlAdminSigner);

		let isOnList = await tokenAMLFacet.getAccountBlackWhiteList(SenderBlackList, userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(RecipientBlackList, userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getSourceAccountBL(userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(userAccount);
		expect(isOnList).to.be.equal(false);

		result = tokenAMLFacet.setAccountBlackWhiteList(SenderBlackList, userAccount, true);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(SenderBlackList, userAccount);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(RecipientBlackList, userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getSourceAccountBL(userAccount);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(userAccount);
		expect(isOnList).to.be.equal(false);

		result = tokenAMLFacet.setAccountBlackWhiteList(RecipientBlackList, userAccount, true);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(SenderBlackList, userAccount);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(RecipientBlackList, userAccount);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getSourceAccountBL(userAccount);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(userAccount);
		expect(isOnList).to.be.equal(true);

		result = tokenAMLFacet.setAccountBlackWhiteList(SenderBlackList, userAccount, false);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(SenderBlackList, userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(RecipientBlackList, userAccount);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getSourceAccountBL(userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(userAccount);
		expect(isOnList).to.be.equal(true);

		result = tokenAMLFacet.setAccountBlackWhiteList(RecipientBlackList, userAccount, false);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(SenderBlackList, userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(RecipientBlackList, userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getSourceAccountBL(userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(userAccount);
		expect(isOnList).to.be.equal(false);

		//revoke amlAdmin role
		tokenAMLFacet = tokenAMLFacet.connect(ownerSigner);

		result = tokenACLFacet.revokeRole(amlAdminRole, amlAdminAccount);
		await expect(result).not.to.be.reverted;

		tokenAMLFacet = tokenAMLFacet.connect(amlAdminSigner);

		hasRole = await tokenACLFacet.hasRole(amlAdminRole, amlAdminAccount);
		expect(hasRole).to.be.equal(false);

		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(SenderBlackList, userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(RecipientBlackList, userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getSourceAccountBL(userAccount);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(userAccount);
		expect(isOnList).to.be.equal(false);

		result = tokenAMLFacet.setAccountBlackWhiteList(SenderBlackList, userAccount, true);
		await expect(result).to.be.revertedWithCustomError(tokenAMLFacet, "AccessDenied");

		result = tokenAMLFacet.setAccountBlackWhiteList(RecipientBlackList, userAccount, true);
		await expect(result).to.be.revertedWithCustomError(tokenAMLFacet, "AccessDenied");

		result = tokenAMLFacet.setAccountBlackWhiteList(SenderBlackList, userAccount, false);
		await expect(result).to.be.revertedWithCustomError(tokenAMLFacet, "AccessDenied");

		result = tokenAMLFacet.setAccountBlackWhiteList(RecipientBlackList, userAccount, false);
		await expect(result).to.be.revertedWithCustomError(tokenAMLFacet, "AccessDenied");
	});

	it("Check add/delete account to/from black lists", async function () {
		const { accounts, tokenAMLFacetDefault } = await loadFixture(deployDiamondWithFacet);

		const tokenAMLFacet = tokenAMLFacetDefault;

		const SenderBlackList = await tokenAMLFacetDefault.SENDER_BLACKLIST();
		const RecipientBlackList = await tokenAMLFacetDefault.RECIPIENT_BLACKLIST();

		const account = await accounts[namedAccounts.user1].getAddress();

		let isOnList = await tokenAMLFacet.getAccountBlackWhiteList(SenderBlackList, account);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(RecipientBlackList, account);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getSourceAccountBL(account);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(account);
		expect(isOnList).to.be.equal(false);

		let result = tokenAMLFacet.setAccountBlackWhiteList(SenderBlackList, account, true);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(SenderBlackList, account);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(RecipientBlackList, account);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getSourceAccountBL(account);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(account);
		expect(isOnList).to.be.equal(false);

		result = tokenAMLFacet.setAccountBlackWhiteList(RecipientBlackList, account, true);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(SenderBlackList, account);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(RecipientBlackList, account);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getSourceAccountBL(account);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(account);
		expect(isOnList).to.be.equal(true);

		result = tokenAMLFacet.setAccountBlackWhiteList(SenderBlackList, account, false);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(SenderBlackList, account);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(RecipientBlackList, account);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getSourceAccountBL(account);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(account);
		expect(isOnList).to.be.equal(true);

		result = tokenAMLFacet.setAccountBlackWhiteList(RecipientBlackList, account, false);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(SenderBlackList, account);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getAccountBlackWhiteList(RecipientBlackList, account);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getSourceAccountBL(account);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(account);
		expect(isOnList).to.be.equal(false);
	});

	it("Check SourceAccountBL", async function () {
		const { accounts, tokenAMLFacetDefault } = await loadFixture(deployDiamondWithFacet);

		const tokenAMLFacet = tokenAMLFacetDefault;

		const user1 = accounts[namedAccounts.user1];
		const user2 = accounts[namedAccounts.user2];

		let isOnList = await tokenAMLFacet.getSourceAccountBL(user1.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user1.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getSourceAccountBL(user2.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user2.address);
		expect(isOnList).to.be.equal(false);

		let result = tokenAMLFacet.setSourceAccountBL(user1.address, true);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getSourceAccountBL(user1.address);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user1.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getSourceAccountBL(user2.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user2.address);
		expect(isOnList).to.be.equal(false);

		result = tokenAMLFacet.setSourceAccountBL(user1.address, false);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getSourceAccountBL(user1.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user1.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getSourceAccountBL(user2.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user2.address);
		expect(isOnList).to.be.equal(false);

		result = tokenAMLFacet.setBatchSourceAccountBL([user1.address, user2.address], true);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getSourceAccountBL(user1.address);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user1.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getSourceAccountBL(user2.address);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user2.address);
		expect(isOnList).to.be.equal(false);
	});

	it("Check DestinationAccountBL", async function () {
		const { accounts, tokenAMLFacetDefault } = await loadFixture(deployDiamondWithFacet);

		const tokenAMLFacet = tokenAMLFacetDefault;

		const user1 = accounts[namedAccounts.user1];
		const user2 = accounts[namedAccounts.user2];

		let isOnList = await tokenAMLFacet.getSourceAccountBL(user1.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user1.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getSourceAccountBL(user2.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user2.address);
		expect(isOnList).to.be.equal(false);

		let result = tokenAMLFacet.setDestinationAccountBL(user1.address, true);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getSourceAccountBL(user1.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user1.address);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getSourceAccountBL(user2.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user2.address);
		expect(isOnList).to.be.equal(false);

		result = tokenAMLFacet.setDestinationAccountBL(user1.address, false);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getSourceAccountBL(user1.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user1.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getSourceAccountBL(user2.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user2.address);
		expect(isOnList).to.be.equal(false);

		result = tokenAMLFacet.setBatchDestinationAccountBL([user1.address, user2.address], true);
		await expect(result).not.to.be.reverted;
		isOnList = await tokenAMLFacet.getSourceAccountBL(user1.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user1.address);
		expect(isOnList).to.be.equal(true);
		isOnList = await tokenAMLFacet.getSourceAccountBL(user2.address);
		expect(isOnList).to.be.equal(false);
		isOnList = await tokenAMLFacet.getDestinationAccountBL(user2.address);
		expect(isOnList).to.be.equal(true);
	});
});
