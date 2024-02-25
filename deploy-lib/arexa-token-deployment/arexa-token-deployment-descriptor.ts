import { DiamondDeploymentDescriptorNew } from "../deployment-descriptors";

export enum BusinessFacets {
	PausableFacet = "pausableFacet",
	ACLFacet = "aclFacet",
	AdminFacet = "adminFacet",
	AMLFacet = "amlFacet",
	TokenFacet = "tokenFacet",
}

export enum DescriptorTypeToken {
	hRXAI = "hRXAI", //local network
	eRXAI = "eRXAI", //Ethereum network
	bRXAI = "bRXAI", //BSC network
	pRXAI = "pRXAI", //Polygon network

	hUSDT = "hUSDT", //only local to have a payment token!
	eUSDT = "eUSDT", //only local to have a payment token!
	bUSDT = "bUSDT", //only local to have a payment token!
	pUSDT = "pUSDT", //only local to have a payment token!
}

type TokenInitParamType = {
	name: string;
	symbol: string;
	decimal: number;
	initialSupply: number;
};

export const TokenInitParams: Record<DescriptorTypeToken, TokenInitParamType> = {
	hRXAI: { name: "h Arexa AI", symbol: "hRXAI", decimal: 18, initialSupply: 0 },
	eRXAI: { name: "Arexa AI", symbol: "RXAI", decimal: 18, initialSupply: 0 },
	bRXAI: { name: "Arexa AI", symbol: "RXAI", decimal: 18, initialSupply: 0 },
	pRXAI: { name: "Arexa AI", symbol: "RXAI", decimal: 18, initialSupply: 0 },

	hUSDT: { name: "h USDT", symbol: "hUSDT", decimal: 6, initialSupply: 0 },
	eUSDT: { name: "e USDT", symbol: "eUSDT", decimal: 6, initialSupply: 0 },
	bUSDT: { name: "b USDT", symbol: "bUSDT", decimal: 6, initialSupply: 0 },
	pUSDT: { name: "p USDT", symbol: "pUSDT", decimal: 6, initialSupply: 0 },
};

export function getArexaTokenDeploymentDescriptor(descriptorType: DescriptorTypeToken): DiamondDeploymentDescriptorNew<BusinessFacets> {
	const initParams = TokenInitParams[descriptorType];
	return {
		diamond: { name: `${descriptorType}Diamond`, artifact: "Diamond" },
		diamondCutFacet: { name: `${descriptorType}DiamondCutFacet`, artifact: "DiamondCutFacet" },
		diamondDummyImplementation: {
			name: `${descriptorType}TokenDiamondDummyImplementation`,
			artifact: "TokenDiamondDummyImplementation",
		},
		facets: {
			diamondLoupeFacet: { name: `${descriptorType}DiamondLoupeFacet`, artifact: "DiamondLoupeFacet" },
			diamondEtherscanFacet: { name: `${descriptorType}DiamondEtherscanFacet`, artifact: "DiamondEtherscanFacet" },
			ownershipFacet: { name: `${descriptorType}ArexaTokenOwnershipFacet`, artifact: "ArexaTokenOwnershipFacet" },
			pausableFacet: { name: `${descriptorType}ArexaTokenPausableFacet`, artifact: "ArexaTokenPausableFacet" },
			aclFacet: { name: `${descriptorType}ArexaTokenACLFacet`, artifact: "ArexaTokenACLFacet" },
			adminFacet: { name: `${descriptorType}ArexaTokenAdminFacet`, artifact: "ArexaTokenAdminFacet" },
			amlFacet: { name: `${descriptorType}ArexaTokenAMLFacet`, artifact: "ArexaTokenAMLFacet" },
			tokenFacet: { name: `${descriptorType}ArexaTokenFacet`, artifact: "ArexaTokenFacet" },
		},
		initializer: {
			name: `${descriptorType}ArexaTokenDiamondInit`,
			artifact: "ArexaTokenDiamondInit",
			functionName: "init",
			params: [initParams.name, initParams.symbol, initParams.decimal, initParams.initialSupply],
		},
	};
}
