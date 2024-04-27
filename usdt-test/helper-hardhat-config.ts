export const developmentChains = ["hardhat", "localhost"];

export interface networkConfigItem {
	ethUsdPriceFeed?: string;
	rpc?: string;
	wss?: string;
	chainId?: number; //80001
	blockConfirmations?: number;
	saveDeployments?: boolean;
}

export interface networkConfigInfo {
	[key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
	localhost: {
		blockConfirmations: 1,
	},
	hardhat: {
		blockConfirmations: 1,
	},
	bsctest: {
		blockConfirmations: 1,
	},
	bscmain: {
		blockConfirmations: 6,
	},
	amoy: {
		blockConfirmations: 1,
	},
	polygon: {
		blockConfirmations: 6,
	},
	sepolia: {
		blockConfirmations: 1,
	},
	mainnet: {
		blockConfirmations: 6,
	},
};
