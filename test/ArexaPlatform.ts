import "@nomicfoundation/hardhat-chai-matchers";
import { ethers, deployments, getNamedAccounts } from "hardhat";
import { time, mine, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { Contract } from "ethers";
import { getSelectors } from "../deploy-lib/diamond-utils";
import { zeroAddress } from "../deploy-lib/utils";
import {
	ArexaACLFacet,
	ArexaAMLFacet,
	ArexaAdminFacet,
	ArexaPausableFacet,
	ArexaPlatformFacet,
	ArexaPoolPNLFacet,
	ArexaRestrictionFacet,
	ArexaStakingFacet,
	ArexaPfmTokenAllowanceFacet,
	ArexaPfmTokenEnumerableFacet,
	ArexaPfmTokenFacet,
	ArexaPfmTokenMetadataURIFacet,
	ArexaPfmTokenReceiverFacet,
	ArexaTokenFacet,
	TokenFacet,
	ArexaTokenACLFacet,
	ArexaOwnershipFacet,
	DiamondLoupeFacet,
	DiamondCutFacet,
	ArexaTokenOwnershipFacet,
	ArexaTokenPausableFacet,
	ArexaTokenAdminFacet,
	ArexaTokenAMLFacet,
	TokenAMLFacet,
	TokenOwnershipFacet,
	TokenPausableFacet,
	TokenACLFacet,
	TokenAdminFacet,
	ArexaPlatformAdminFacet,
} from "../typechain-types";
import { namedAccounts } from "../deploy-lib/namedAccounts";
import { call } from "./helpers/CallHelper";

import { DescriptorTypeArexa, getArexaDeploymentDescriptor } from "../deploy-lib/arexa-platform-deployment/arexa-deployment-descriptor";
import {
	DescriptorTypeToken,
	getArexaTokenDeploymentDescriptor,
} from "../deploy-lib/arexa-token-deployment/arexa-token-deployment-descriptor";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

export async function deployDiamond() {
	await deployments.fixture(["hArexaPlatformDiamond"]);

	const accounts = await ethers.getSigners();

	const descriptorArexa = getArexaDeploymentDescriptor(DescriptorTypeArexa.hAREXA);
	const descriptorRXAI = getArexaTokenDeploymentDescriptor(DescriptorTypeToken.hRXAI);
	const descriptorUSDT = getArexaTokenDeploymentDescriptor(DescriptorTypeToken.hUSDT);

	const diamondArexa = await deployments.get(descriptorArexa.diamond.name);
	const diamondRXAI = await deployments.get(descriptorRXAI.diamond.name);
	const diamondUSDT = await deployments.get(descriptorUSDT.diamond.name);

	const rxaiFacets = descriptorRXAI.facets;
	const rxaiDiamondCutFacet = await ethers.getContractAt(descriptorRXAI.diamondCutFacet.artifact, diamondRXAI.address);
	const rxaiDiamondLoupeFacet = await ethers.getContractAt(rxaiFacets.diamondLoupeFacet.artifact, diamondRXAI.address);
	const rxaiOwnershipFacet = await ethers.getContractAt(rxaiFacets.ownershipFacet.artifact, diamondRXAI.address);
	const rxaiPausableFacet = await ethers.getContractAt(rxaiFacets.pausableFacet.artifact, diamondRXAI.address);
	const rxaiACLFacet = await ethers.getContractAt(rxaiFacets.aclFacet.artifact, diamondRXAI.address);
	const rxaiAdminFacet = await ethers.getContractAt(rxaiFacets.adminFacet.artifact, diamondRXAI.address);
	const rxaiAMLFacet = await ethers.getContractAt(rxaiFacets.amlFacet.artifact, diamondRXAI.address);
	const rxaiTokenFacet = await ethers.getContractAt(rxaiFacets.tokenFacet.artifact, diamondRXAI.address);

	const rxaiDecimals = await rxaiTokenFacet.decimals();
	//SET Treasuery role in RXAI token to AREXA
	const rxaiACLFacetOwner = rxaiACLFacet.connect(accounts[namedAccounts.diamondOwner]) as ArexaTokenACLFacet;

	//set treasury role to contract
	const TreasuryRole = await rxaiACLFacetOwner.TREASURY_ROLE();
	const grantResult = await rxaiACLFacetOwner.grantRole(TreasuryRole, diamondArexa.address);

	//USDT token
	const usdtFacets = descriptorRXAI.facets;
	const usdtDiamondCutFacet = await ethers.getContractAt(descriptorUSDT.diamondCutFacet.artifact, diamondUSDT.address);
	const usdtDiamondLoupeFacet = await ethers.getContractAt(usdtFacets.diamondLoupeFacet.artifact, diamondUSDT.address);
	const usdtOwnershipFacet = await ethers.getContractAt(usdtFacets.ownershipFacet.artifact, diamondUSDT.address);
	const usdtPausableFacet = await ethers.getContractAt(usdtFacets.pausableFacet.artifact, diamondUSDT.address);
	const usdtACLFacet = await ethers.getContractAt(usdtFacets.aclFacet.artifact, diamondUSDT.address);
	const usdtAdminFacet = await ethers.getContractAt(usdtFacets.adminFacet.artifact, diamondUSDT.address);
	const usdtAMLFacet = await ethers.getContractAt(usdtFacets.amlFacet.artifact, diamondUSDT.address);
	const usdtTokenFacet = await ethers.getContractAt(usdtFacets.tokenFacet.artifact, diamondUSDT.address);

	//Give some usdt token to the users....
	const usdtDecimals = await usdtTokenFacet.decimals();
	const usdtTokenFacetOwner = (usdtTokenFacet as TokenFacet).connect(accounts[namedAccounts.diamondOwner]);
	await call(usdtTokenFacetOwner.mint(accounts[namedAccounts.user1].getAddress(), 1000000n * BigInt(10 ** usdtDecimals)));
	await call(usdtTokenFacetOwner.mint(accounts[namedAccounts.user2].getAddress(), 1000000n * BigInt(10 ** usdtDecimals)));

	//Approve some USDT tokens to Arexa.address by the users
	const usdtTokenFacetUser1 = usdtTokenFacet.connect(accounts[namedAccounts.user1]);
	const usdtTokenFacetUser2 = usdtTokenFacet.connect(accounts[namedAccounts.user2]);
	await call(usdtTokenFacetUser1.approve(diamondArexa.address, 80000n * BigInt(10 ** usdtDecimals)));
	await call(usdtTokenFacetUser2.approve(diamondArexa.address, 80000n * BigInt(10 ** usdtDecimals)));

	// let blockNumber = (await ethers.provider.getBlock("latest")).number;
	// console.log(blockNumber);

	//AREXA platform
	const arexaFacets = descriptorArexa.facets;
	const arexaDiamondCutFacet = await ethers.getContractAt(descriptorArexa.diamondCutFacet.artifact, diamondArexa.address);
	const arexaDiamondLoupeFacet = await ethers.getContractAt(arexaFacets.diamondLoupeFacet.artifact, diamondArexa.address);
	const arexaOwnershipFacet = await ethers.getContractAt(arexaFacets.ownershipFacet.artifact, diamondArexa.address);
	const arexaPausableFacet = await ethers.getContractAt(arexaFacets.pausableFacet.artifact, diamondArexa.address);
	const arexaACLFacet = await ethers.getContractAt(arexaFacets.aclFacet.artifact, diamondArexa.address);
	const arexaAdminFacet = await ethers.getContractAt(arexaFacets.adminFacet.artifact, diamondArexa.address);
	const arexaAMLFacet = await ethers.getContractAt(arexaFacets.amlFacet.artifact, diamondArexa.address);
	const arexaPlatformFacet = await ethers.getContractAt(arexaFacets.platformFacet.artifact, diamondArexa.address);
	const arexaPlatformAdminFacet = await ethers.getContractAt(arexaFacets.platformAdminFacet.artifact, diamondArexa.address);
	const arexaPoolPNLFacet = await ethers.getContractAt(arexaFacets.poolPNLFacet.artifact, diamondArexa.address);
	const arexaRestrictionFacet = await ethers.getContractAt(arexaFacets.restrictionFacet.artifact, diamondArexa.address);
	const arexaStakingFacet = await ethers.getContractAt(arexaFacets.stakingFacet.artifact, diamondArexa.address);
	const arexaPfmTokenFacet = await ethers.getContractAt(arexaFacets.tokenFacet.artifact, diamondArexa.address);
	const arexaPfmTokenAllowanceFacet = await ethers.getContractAt(arexaFacets.tokenAllowanceFacet.artifact, diamondArexa.address);
	const arexaPfmTokenEnumerableFacet = await ethers.getContractAt(arexaFacets.tokenEnumerableFacet.artifact, diamondArexa.address);
	const arexaPfmTokenMetadataURIFacet = await ethers.getContractAt(arexaFacets.tokenMetadataURIFacet.artifact, diamondArexa.address);
	const arexaPfmTokenReceiverFacet = await ethers.getContractAt(arexaFacets.tokenReceiverFacet.artifact, diamondArexa.address);

	const arexaSubsription1TokenType = await (arexaPlatformFacet as ArexaPlatformFacet).SUBSCR1_TOKEN_TYPE();
	const arexaSubsription2TokenType = await (arexaPlatformFacet as ArexaPlatformFacet).SUBSCR2_TOKEN_TYPE();
	const arexaTraderTokenId = await (arexaPlatformFacet as ArexaPlatformFacet).TRADER_TOKEN_ID();
	const arexaArexaTokenId = await (arexaPlatformFacet as ArexaPlatformFacet).AREXA_TOKEN_ID();
	const arexaMagicTokenId = await (arexaPlatformFacet as ArexaPlatformFacet).MAGIC_TOKEN_ID();

	const arexaTokenPoolInverstor = await (arexaPlatformFacet as ArexaPlatformFacet).AREXA_TOKEN_POOL_INVESTOR();
	const arexaTokenPoolArexaINC = await (arexaPlatformFacet as ArexaPlatformFacet).AREXA_TOKEN_POOL_AREXAINC();
	const arexaTokenPoolMarketing = await (arexaPlatformFacet as ArexaPlatformFacet).AREXA_TOKEN_POOL_MARKETING();
	const arexaTokenPoolDevelopment = await (arexaPlatformFacet as ArexaPlatformFacet).AREXA_TOKEN_POOL_DEVELOPMENT();
	const arexaTokenPoolReserved = await (arexaPlatformFacet as ArexaPlatformFacet).AREXA_TOKEN_POOL_RESERVED();

	const arexaAmountValueType = await (arexaPlatformFacet as ArexaPlatformFacet).AMOUNT_VALUE_TYPE();
	const arexaQuantityValueType = await (arexaPlatformFacet as ArexaPlatformFacet).QUANTITY_VALUE_TYPE();

	return {
		accounts,
		deployer: accounts[namedAccounts.deployer],
		user1: accounts[namedAccounts.user1],
		user2: accounts[namedAccounts.user2],
		owner: accounts[namedAccounts.diamondOwner],
		arexa: {
			deployer: accounts[namedAccounts.deployer],
			ownerAddress: accounts[namedAccounts.diamondOwner],
			diamondAddress: diamondArexa.address,
			diamondCutFacet: arexaDiamondCutFacet as DiamondCutFacet,
			diamondLoupeFacet: arexaDiamondLoupeFacet as DiamondLoupeFacet,
			ownershipFacet: arexaOwnershipFacet as ArexaOwnershipFacet,
			pausableFacet: arexaPausableFacet as ArexaPausableFacet,
			aclFacet: arexaACLFacet as ArexaACLFacet,
			adminFacet: arexaAdminFacet as ArexaAdminFacet,
			amlFacet: arexaAMLFacet as ArexaAMLFacet,
			platformFacet: arexaPlatformFacet as ArexaPlatformFacet,
			platformAdminFacet: arexaPlatformAdminFacet as ArexaPlatformAdminFacet,
			poolPNLFacet: arexaPoolPNLFacet as ArexaPoolPNLFacet,
			restrictionFacet: arexaRestrictionFacet as ArexaRestrictionFacet,
			stakingFacet: arexaStakingFacet as ArexaStakingFacet,
			pfmTokenFacet: arexaPfmTokenFacet as ArexaPfmTokenFacet,
			pfmTokenAllowanceFacet: arexaPfmTokenAllowanceFacet as ArexaPfmTokenAllowanceFacet,
			pfmTokenEnumerableFacet: arexaPfmTokenEnumerableFacet as ArexaPfmTokenEnumerableFacet,
			pfmTokenMetadataURIFacet: arexaPfmTokenMetadataURIFacet as ArexaPfmTokenMetadataURIFacet,
			pfmTokenReceiverFacet: arexaPfmTokenReceiverFacet as ArexaPfmTokenReceiverFacet,
			const: {
				SUBSRIPTION1_TOKEN_TYPE: arexaSubsription1TokenType,
				SUBSRIPTION2_TOKEN_TYPE: arexaSubsription2TokenType,
				TRDAER_TOKEN_ID: arexaTraderTokenId,
				AREXA_TOKEN_ID: arexaArexaTokenId,
				MAGIC_TOKEN_ID: arexaMagicTokenId,

				POOL_INVESTOR: arexaTokenPoolInverstor,
				POOL_AREXAINC: arexaTokenPoolArexaINC,
				POOL_MARKETING: arexaTokenPoolMarketing,
				POOL_DEVELOPMENT: arexaTokenPoolDevelopment,
				POOL_RESERVED: arexaTokenPoolReserved,

				AMOUNT: arexaAmountValueType,
				QUANTITY: arexaQuantityValueType,
			},
		},
		rxai: {
			deployer: accounts[namedAccounts.deployer],
			ownerAddress: accounts[namedAccounts.diamondOwner],
			diamondAddress: diamondRXAI.address,
			diamondCutFacet: rxaiDiamondCutFacet as DiamondCutFacet,
			diamondLoupeFacet: rxaiDiamondLoupeFacet as DiamondLoupeFacet,
			ownershipFacet: rxaiOwnershipFacet as ArexaTokenOwnershipFacet,
			pausableFacet: rxaiPausableFacet as ArexaTokenPausableFacet,
			aclFacet: rxaiACLFacet as ArexaTokenACLFacet,
			adminFacet: rxaiAdminFacet as ArexaTokenAdminFacet,
			amlFacet: rxaiAMLFacet as ArexaTokenAMLFacet,
			tokenFacet: rxaiTokenFacet as ArexaTokenFacet,
			DECIMALS: rxaiDecimals,
		},
		usdt: {
			deployer: accounts[namedAccounts.deployer],
			ownerAddress: accounts[namedAccounts.diamondOwner],
			diamondAddress: diamondUSDT.address,
			diamondCutFacet: usdtDiamondCutFacet as DiamondCutFacet,
			diamondLoupeFacet: usdtDiamondLoupeFacet as DiamondLoupeFacet,
			ownershipFacet: usdtOwnershipFacet as TokenOwnershipFacet,
			pausableFacet: usdtPausableFacet as TokenPausableFacet,
			aclFacet: usdtACLFacet as TokenACLFacet,
			adminFacet: usdtAdminFacet as TokenAdminFacet,
			amlFacet: usdtAMLFacet as TokenAMLFacet,
			tokenFacet: usdtTokenFacet as TokenFacet,
			DECIMALS: usdtDecimals,
		},
	};
}
