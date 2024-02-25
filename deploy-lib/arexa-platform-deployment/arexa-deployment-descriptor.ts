import { DiamondDeploymentDescriptorNew } from "../deployment-descriptors";
import { zeroAddress } from "../utils";

//Set here the businessFacet keys (not artifacet, not contract, these are just keys)
export enum BusinessFacets {
	PausableFacet = "pausableFacet",
	ACLFacet = "aclFacet",
	AdminFacet = "adminFacet",
	AMLFacet = "amlFacet",
	PlatformFacet = "platformFacet",
	PlatformAdminFacet = "platformAdminFacet",
	PoolPNLFacet = "poolPNLFacet",
	RestrictionFacet = "restrictionFacet",
	StakingFacet = "stakingFacet",
	TokenFacet = "tokenFacet",
	TokenAllowanceFacet = "tokenAllowanceFacet",
	TokenEnumerableFacet = "tokenEnumerableFacet",
	TokenMetadataURIFacet = "tokenMetadataURIFacet",
	TokenReceiverFacet = "tokenReceiverFacet",
}

//Set here who many veriants are there
export enum DescriptorTypeArexa {
	hAREXA = "hAREXA", //harhad network or local
	etAREXA = "etAREXA", //Ethereum network
	btAREXA = "btAREXA", //BSC network
	ptAREXA = "ptAREXA", //Polygon network
	eAREXA = "eAREXA", //Ethereum network
	bAREXA = "bAREXA", //BSC network
	pAREXA = "pAREXA", //Polygon network
}

type ArexaInitParamsType = {
	payingToken: string; //address
	arexaERC20Token: string; //address
	restrictionTimeDelta: number;
};

export const ArexaInitParams: Record<DescriptorTypeArexa, ArexaInitParamsType> = {
	hAREXA: { payingToken: zeroAddress, arexaERC20Token: zeroAddress, restrictionTimeDelta: 2 },
	etAREXA: { payingToken: zeroAddress, arexaERC20Token: zeroAddress, restrictionTimeDelta: 2 },
	btAREXA: { payingToken: zeroAddress, arexaERC20Token: zeroAddress, restrictionTimeDelta: 2 },
	ptAREXA: { payingToken: zeroAddress, arexaERC20Token: zeroAddress, restrictionTimeDelta: 2 },
	eAREXA: { payingToken: "0xdAC17F958D2ee523a2206206994597C13D831ec7", arexaERC20Token: zeroAddress, restrictionTimeDelta: 219000 }, //12sec
	bAREXA: { payingToken: "0x69bab60997a2f5cbee668e5087dd9f91437206bb", arexaERC20Token: zeroAddress, restrictionTimeDelta: 876000 }, //3sec
	pAREXA: { payingToken: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", arexaERC20Token: zeroAddress, restrictionTimeDelta: 1314000 }, //2sec
};

export function getArexaDeploymentDescriptor(descriptorType: DescriptorTypeArexa): DiamondDeploymentDescriptorNew<BusinessFacets> {
	const initParams = ArexaInitParams[descriptorType];
	return {
		diamond: { name: `${descriptorType}Diamond`, artifact: "Diamond" },
		diamondCutFacet: { name: `${descriptorType}DiamondCutFacet`, artifact: "DiamondCutFacet" },
		diamondDummyImplementation: {
			name: `${descriptorType}ArexaDiamondDummyImplementation`,
			artifact: "ArexaDiamondDummyImplementation",
		},
		facets: {
			diamondLoupeFacet: { name: `${descriptorType}DiamondLoupeFacet`, artifact: "DiamondLoupeFacet" },
			diamondEtherscanFacet: { name: `${descriptorType}DiamondEtherscanFacet`, artifact: "DiamondEtherscanFacet" },
			ownershipFacet: { name: `${descriptorType}ArexaOwnershipFacet`, artifact: "ArexaOwnershipFacet" },
			pausableFacet: { name: `${descriptorType}ArexaPausableFacet`, artifact: "ArexaPausableFacet" },
			aclFacet: { name: `${descriptorType}ArexaACLFacet`, artifact: "ArexaACLFacet" },
			adminFacet: { name: `${descriptorType}ArexaAdminFacet`, artifact: "ArexaAdminFacet" },
			amlFacet: { name: `${descriptorType}ArexaAMLFacet`, artifact: "ArexaAMLFacet" },
			platformFacet: { name: `${descriptorType}ArexaPlatformFacet`, artifact: "ArexaPlatformFacet" },
			platformAdminFacet: { name: `${descriptorType}ArexaPlatformAdminFacet`, artifact: "ArexaPlatformAdminFacet" },
			poolPNLFacet: { name: `${descriptorType}ArexaPoolPNLFacet`, artifact: "ArexaPoolPNLFacet" },
			restrictionFacet: { name: `${descriptorType}ArexaRestrictionFacet`, artifact: "ArexaRestrictionFacet" },
			stakingFacet: { name: `${descriptorType}ArexaStakingFacet`, artifact: "ArexaStakingFacet" },
			tokenFacet: { name: `${descriptorType}ArexaPfmTokenFacet`, artifact: "ArexaPfmTokenFacet" },
			tokenAllowanceFacet: { name: `${descriptorType}ArexaPfmTokenAllowanceFacet`, artifact: "ArexaPfmTokenAllowanceFacet" },
			tokenEnumerableFacet: { name: `${descriptorType}ArexaPfmTokenEnumerableFacet`, artifact: "ArexaPfmTokenEnumerableFacet" },
			tokenMetadataURIFacet: { name: `${descriptorType}ArexaPfmTokenMetadataURIFacet`, artifact: "ArexaPfmTokenMetadataURIFacet" },
			tokenReceiverFacet: { name: `${descriptorType}ArexaPfmTokenReceiverFacet`, artifact: "ArexaPfmTokenReceiverFacet" },
		},
		initializer: {
			name: `${descriptorType}ArexaPlatformDiamondInit`,
			artifact: "ArexaPlatformDiamondInit",
			functionName: "init",
			params: [initParams.payingToken, initParams.arexaERC20Token, initParams.restrictionTimeDelta],
		},
	};
}
