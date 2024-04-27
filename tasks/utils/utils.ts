import {
	ArexaInitParams,
	DescriptorTypeArexa,
	getArexaDeploymentDescriptor,
} from "../../deploy-lib/arexa-platform-deployment/arexa-deployment-descriptor";
import {
	DescriptorTypeToken,
	getArexaTokenDeploymentDescriptor,
} from "../../deploy-lib/arexa-token-deployment/arexa-token-deployment-descriptor";
import { namedAccounts } from "../../deploy-lib/namedAccounts";
import { zeroAddress } from "../../deploy-lib/utils";
import {
	ArexaACLFacet,
	ArexaAMLFacet,
	ArexaAdminFacet,
	ArexaOwnershipFacet,
	ArexaPausableFacet,
	ArexaPfmTokenAllowanceFacet,
	ArexaPfmTokenEnumerableFacet,
	ArexaPfmTokenFacet,
	ArexaPfmTokenMetadataURIFacet,
	ArexaPfmTokenReceiverFacet,
	ArexaPlatformAdminFacet,
	ArexaPlatformDiamondInit,
	ArexaPlatformFacet,
	ArexaPoolPNLFacet,
	ArexaRestrictionFacet,
	ArexaStakingFacet,
	ArexaTokenACLFacet,
	ArexaTokenAMLFacet,
	ArexaTokenAdminFacet,
	ArexaTokenDiamondInit,
	ArexaTokenFacet,
	ArexaTokenOwnershipFacet,
	ArexaTokenPausableFacet,
	Diamond,
	DiamondCutFacet,
	DiamondLoupeFacet,
	IERC20Metadata,
} from "../../typechain-types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { erc20Abi } from "./abi.erc20";

export async function getAREXASmartContracts(hre: HardhatRuntimeEnvironment) {
	const { network, ethers, deployments } = hre;
	const signers = await ethers.getSigners();

	console.log(`Network: ${network.name}`);

	let descriptorTypeAREXA = DescriptorTypeArexa.hAREXA;
	switch (network.name) {
		case "hardhat":
		case "localhost":
			break;
		case "bsctest":
			descriptorTypeAREXA = DescriptorTypeArexa.btAREXA;
			break;
		case "amoy":
			descriptorTypeAREXA = DescriptorTypeArexa.ptAREXA;
			break;
		case "sepolia":
			descriptorTypeAREXA = DescriptorTypeArexa.etAREXA;
			break;
		case "bscmain":
			descriptorTypeAREXA = DescriptorTypeArexa.bAREXA;
			break;
		case "polygon":
			descriptorTypeAREXA = DescriptorTypeArexa.pAREXA;
			break;
		case "mainnet":
			descriptorTypeAREXA = DescriptorTypeArexa.eAREXA;
			break;
		default:
			throw new Error("Network not supported yet!");
	}
	const descriptorArexa = getArexaDeploymentDescriptor(descriptorTypeAREXA);

	const arexaAddress = (await deployments.get(descriptorArexa.diamond.name)).address;

	//AREXA platform
	const arexaFacets = descriptorArexa.facets;
	//
	const arexaDiamond = await ethers.getContractAt(descriptorArexa.diamond.artifact, arexaAddress, signers[0]);
	const arexaDiamondInitializer = await ethers.getContractAt(descriptorArexa.initializer.artifact, arexaAddress, signers[0]);
	const arexaDiamondCutFacet = await ethers.getContractAt(descriptorArexa.diamondCutFacet.artifact, arexaAddress, signers[0]);
	const arexaDiamondLoupeFacet = await ethers.getContractAt(arexaFacets.diamondLoupeFacet.artifact, arexaAddress, signers[0]);
	const arexaOwnershipFacet = await ethers.getContractAt(arexaFacets.ownershipFacet.artifact, arexaAddress, signers[0]);
	const arexaPausableFacet = await ethers.getContractAt(arexaFacets.pausableFacet.artifact, arexaAddress, signers[0]);
	const arexaACLFacet = await ethers.getContractAt(arexaFacets.aclFacet.artifact, arexaAddress, signers[0]);
	const arexaAdminFacet = await ethers.getContractAt(arexaFacets.adminFacet.artifact, arexaAddress, signers[0]);
	const arexaAMLFacet = await ethers.getContractAt(arexaFacets.amlFacet.artifact, arexaAddress, signers[0]);
	const arexaPlatformFacet = await ethers.getContractAt(arexaFacets.platformFacet.artifact, arexaAddress, signers[0]);
	const arexaPlatformAdminFacet = await ethers.getContractAt(arexaFacets.platformAdminFacet.artifact, arexaAddress, signers[0]);
	const arexaPoolPNLFacet = await ethers.getContractAt(arexaFacets.poolPNLFacet.artifact, arexaAddress, signers[0]);
	const arexaRestrictionFacet = await ethers.getContractAt(arexaFacets.restrictionFacet.artifact, arexaAddress, signers[0]);
	const arexaStakingFacet = await ethers.getContractAt(arexaFacets.stakingFacet.artifact, arexaAddress, signers[0]);
	const arexaPfmTokenFacet = await ethers.getContractAt(arexaFacets.tokenFacet.artifact, arexaAddress, signers[0]);
	const arexaPfmTokenAllowanceFacet = await ethers.getContractAt(arexaFacets.tokenAllowanceFacet.artifact, arexaAddress, signers[0]);
	const arexaPfmTokenEnumerableFacet = await ethers.getContractAt(arexaFacets.tokenEnumerableFacet.artifact, arexaAddress, signers[0]);
	const arexaPfmTokenMetadataURIFacet = await ethers.getContractAt(arexaFacets.tokenMetadataURIFacet.artifact, arexaAddress, signers[0]);
	const arexaPfmTokenReceiverFacet = await ethers.getContractAt(arexaFacets.tokenReceiverFacet.artifact, arexaAddress, signers[0]);

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
		signers: signers,
		namedAccounts: namedAccounts,
		deployerSigner: signers[namedAccounts.deployer],
		deployerSignerAddress: signers[namedAccounts.deployer].address,
		ownerSigner: signers[namedAccounts.diamondOwner],
		ownerSignerAddress: signers[namedAccounts.diamondOwner].address,
		deploymentDescriptor: descriptorArexa,
		diamondAddress: arexaAddress,
		diamond: arexaDiamond as Diamond,
		diamondInitializer: arexaDiamondInitializer as ArexaPlatformDiamondInit,
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
	};
}

export async function getRXAISmartContracts(hre: HardhatRuntimeEnvironment) {
	const { network, ethers, deployments } = hre;
	const signers = await ethers.getSigners();

	console.log(`Network: ${network.name}`);

	let descriptorType = DescriptorTypeToken.hRXAI;
	switch (network.name) {
		case "hardhat":
		case "localhost":
			break;
		case "bsctest":
			descriptorType = DescriptorTypeToken.bRXAI;
			break;
		case "amoy":
			descriptorType = DescriptorTypeToken.pRXAI;
			break;
		case "sepolia":
			descriptorType = DescriptorTypeToken.eRXAI;
			break;
		case "bscmain":
			descriptorType = DescriptorTypeToken.bRXAI;
			break;
		case "polygon":
			descriptorType = DescriptorTypeToken.pRXAI;
			break;
		case "mainnet":
			descriptorType = DescriptorTypeToken.eRXAI;
			break;
		default:
			throw new Error("Network not supported yet!");
	}

	const descriptor = getArexaTokenDeploymentDescriptor(descriptorType);

	const rxaiAddress = (await deployments.get(descriptor.diamond.name)).address;

	const rxaiDiamond = await ethers.getContractAt(descriptor.diamond.artifact, rxaiAddress, signers[0]);
	const rxaiDiamondInitializer = await ethers.getContractAt(descriptor.initializer.artifact, rxaiAddress, signers[0]);
	const rxaiFacets = descriptor.facets;
	const rxaiDiamondCutFacet = await ethers.getContractAt(descriptor.diamondCutFacet.artifact, rxaiAddress, signers[0]);
	const rxaiDiamondLoupeFacet = await ethers.getContractAt(rxaiFacets.diamondLoupeFacet.artifact, rxaiAddress, signers[0]);
	const rxaiOwnershipFacet = await ethers.getContractAt(rxaiFacets.ownershipFacet.artifact, rxaiAddress, signers[0]);
	const rxaiPausableFacet = await ethers.getContractAt(rxaiFacets.pausableFacet.artifact, rxaiAddress, signers[0]);
	const rxaiACLFacet = await ethers.getContractAt(rxaiFacets.aclFacet.artifact, rxaiAddress, signers[0]);
	const rxaiAdminFacet = await ethers.getContractAt(rxaiFacets.adminFacet.artifact, rxaiAddress, signers[0]);
	const rxaiAMLFacet = await ethers.getContractAt(rxaiFacets.amlFacet.artifact, rxaiAddress, signers[0]);
	const rxaiTokenFacet = await ethers.getContractAt(rxaiFacets.tokenFacet.artifact, rxaiAddress, signers[0]);

	const rxaiDecimals = await rxaiTokenFacet.decimals();

	return {
		signers: signers,
		namedAccounts: namedAccounts,
		deployerSigner: signers[namedAccounts.deployer],
		deployerSignerAddress: signers[namedAccounts.deployer].address,
		ownerSigner: signers[namedAccounts.diamondOwner],
		ownerSignerAddress: signers[namedAccounts.diamondOwner].address,
		deploymentDescriptor: descriptor,
		diamondAddress: rxaiAddress,
		diamond: rxaiDiamond as Diamond,
		diamondInitializer: rxaiDiamondInitializer as ArexaTokenDiamondInit,
		diamondCutFacet: rxaiDiamondCutFacet as DiamondCutFacet,
		diamondLoupeFacet: rxaiDiamondLoupeFacet as DiamondLoupeFacet,
		ownershipFacet: rxaiOwnershipFacet as ArexaTokenOwnershipFacet,
		pausableFacet: rxaiPausableFacet as ArexaTokenPausableFacet,
		aclFacet: rxaiACLFacet as ArexaTokenACLFacet,
		adminFacet: rxaiAdminFacet as ArexaTokenAdminFacet,
		amlFacet: rxaiAMLFacet as ArexaTokenAMLFacet,
		tokenFacet: rxaiTokenFacet as ArexaTokenFacet,
		DECIMALS: rxaiDecimals,
	};
}

export async function getUSDTSmartContracts(hre: HardhatRuntimeEnvironment) {
	const { network, ethers, deployments } = hre;
	const signers = await ethers.getSigners();

	console.log(`Network: ${network.name}`);

	let descriptorTypeUSDT = DescriptorTypeToken.hUSDT;
	let descriptorTypeAREXA = DescriptorTypeArexa.hAREXA;
	let isTestNetwork = false;
	switch (network.name) {
		case "hardhat":
		case "localhost":
			isTestNetwork = true;
			break;
		case "bsctest":
			descriptorTypeUSDT = DescriptorTypeToken.bUSDT;
			descriptorTypeAREXA = DescriptorTypeArexa.btAREXA;
			isTestNetwork = true;
			break;
		case "amoy":
			descriptorTypeUSDT = DescriptorTypeToken.pUSDT;
			descriptorTypeAREXA = DescriptorTypeArexa.ptAREXA;
			isTestNetwork = true;
			break;
		case "sepolia":
			descriptorTypeUSDT = DescriptorTypeToken.eUSDT;
			descriptorTypeAREXA = DescriptorTypeArexa.etAREXA;
			isTestNetwork = true;
			break;
		case "bscmain":
			descriptorTypeUSDT = DescriptorTypeToken.bUSDT;
			descriptorTypeAREXA = DescriptorTypeArexa.bAREXA;
			break;
		case "polygon":
			descriptorTypeUSDT = DescriptorTypeToken.pUSDT;
			descriptorTypeAREXA = DescriptorTypeArexa.pAREXA;
			break;
		case "mainnet":
			descriptorTypeUSDT = DescriptorTypeToken.eUSDT;
			descriptorTypeAREXA = DescriptorTypeArexa.eAREXA;
			break;
		default:
			throw new Error("Network not supported yet!");
	}

	if (isTestNetwork) {
		const descriptor = getArexaTokenDeploymentDescriptor(descriptorTypeUSDT);

		const usdtAddress = (await deployments.get(descriptor.diamond.name)).address;

		const usdtDiamond = await ethers.getContractAt(descriptor.diamond.artifact, usdtAddress, signers[0]);
		const usdtDiamondInitializer = await ethers.getContractAt(descriptor.initializer.artifact, usdtAddress, signers[0]);
		const usdtFacets = descriptor.facets;
		const usdtDiamondCutFacet = await ethers.getContractAt(descriptor.diamondCutFacet.artifact, usdtAddress, signers[0]);
		const usdtDiamondLoupeFacet = await ethers.getContractAt(usdtFacets.diamondLoupeFacet.artifact, usdtAddress, signers[0]);
		const usdtOwnershipFacet = await ethers.getContractAt(usdtFacets.ownershipFacet.artifact, usdtAddress, signers[0]);
		const usdtPausableFacet = await ethers.getContractAt(usdtFacets.pausableFacet.artifact, usdtAddress, signers[0]);
		const usdtACLFacet = await ethers.getContractAt(usdtFacets.aclFacet.artifact, usdtAddress, signers[0]);
		const usdtAdminFacet = await ethers.getContractAt(usdtFacets.adminFacet.artifact, usdtAddress, signers[0]);
		const usdtAMLFacet = await ethers.getContractAt(usdtFacets.amlFacet.artifact, usdtAddress, signers[0]);
		const usdtTokenFacet = await ethers.getContractAt(usdtFacets.tokenFacet.artifact, usdtAddress, signers[0]);

		const usdtDecimals = (await usdtTokenFacet.decimals()) as number;

		return {
			signers: signers,
			namedAccounts: namedAccounts,
			deployerSigner: signers[namedAccounts.deployer],
			deployerSignerAddress: signers[namedAccounts.deployer].address,
			ownerSigner: signers[namedAccounts.diamondOwner],
			ownerSignerAddress: signers[namedAccounts.diamondOwner].address,
			deploymentDescriptor: descriptor,
			diamondAddress: usdtAddress,
			diamond: usdtDiamond as Diamond,
			diamondInitializer: usdtDiamondInitializer as ArexaTokenDiamondInit,
			diamondCutFacet: usdtDiamondCutFacet as DiamondCutFacet,
			diamondLoupeFacet: usdtDiamondLoupeFacet as DiamondLoupeFacet,
			ownershipFacet: usdtOwnershipFacet as ArexaTokenOwnershipFacet,
			pausableFacet: usdtPausableFacet as ArexaTokenPausableFacet,
			aclFacet: usdtACLFacet as ArexaTokenACLFacet,
			adminFacet: usdtAdminFacet as ArexaTokenAdminFacet,
			amlFacet: usdtAMLFacet as ArexaTokenAMLFacet,
			tokenFacet: usdtTokenFacet as ArexaTokenFacet,
			DECIMALS: usdtDecimals,
		};
	}

	if (ArexaInitParams[descriptorTypeAREXA].payingToken === zeroAddress) {
		const descriptorUSDT = getArexaTokenDeploymentDescriptor(descriptorTypeUSDT);
		const usdtAddress = (await deployments.get(descriptorUSDT.diamond.name)).address;
		const usdtToken = (await ethers.getContractAt(descriptorUSDT.facets.tokenFacet.artifact, usdtAddress)) as unknown;
		const decimals = await (usdtToken as unknown as IERC20Metadata).decimals();
		return {
			signers: signers,
			namedAccounts: namedAccounts,
			deployerSigner: signers[namedAccounts.deployer],
			deployerSignerAddress: signers[namedAccounts.deployer].address,
			ownerSigner: signers[namedAccounts.diamondOwner],
			ownerSignerAddress: signers[namedAccounts.diamondOwner].address,
			diamondAddress: usdtAddress,
			tokenFacet: usdtToken as ArexaTokenFacet,
			DECIMALS: decimals,
		};
	} else {
		const usdtToken = (await ethers.getContractAt(erc20Abi, ArexaInitParams[descriptorTypeAREXA].payingToken)) as unknown;
		const decimals = await (usdtToken as unknown as IERC20Metadata).decimals();
		return {
			signers: signers,
			namedAccounts: namedAccounts,
			deployerSigner: signers[namedAccounts.deployer],
			deployerSignerAddress: signers[namedAccounts.deployer].address,
			ownerSigner: signers[namedAccounts.diamondOwner],
			ownerSignerAddress: signers[namedAccounts.diamondOwner].address,
			diamondAddress: ArexaInitParams[descriptorTypeAREXA].payingToken,
			tokenFacet: usdtToken as ArexaTokenFacet,
			DECIMALS: decimals,
		};
	}
}
