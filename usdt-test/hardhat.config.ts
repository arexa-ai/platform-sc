import "@nomicfoundation/hardhat-chai-matchers";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import "hardhat-abi-exporter";
import "hardhat-tracer";
//import "hardhat-diamond-abi";
import "./tasks";
import { namedAccounts } from "./deploy-lib/namedAccounts";
//"hardhat-diamond-abi": "^3.0.1",

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

//API keys!
const INFURA_API_KEY = process.env.INFURA_API_KEY || "Your INFURA API key";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "Your polygonscan API key";
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "Your etherscan API key";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVATE_KEYS = process.env.PRIVATE_KEYS
	? (JSON.parse(process.env.PRIVATE_KEYS) as string[])
	: PRIVATE_KEY
	? ([PRIVATE_KEY] as string[])
	: undefined;
const MNEMONIC = process.env.MNEMONIC || "Your mnemonic";

//FORKING Opations for hardhat network
const FORKING_BLOCK_NUMBER = Number.parseInt(process.env.FORKING_BLOCK_NUMBER ?? "0");

//RPC URLs
const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;
const GOERLI_RPC_URL = `https://goerli.infura.io/v3/${INFURA_API_KEY}`;

const POLYGON_MAINNET_RPC_URL = `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`;
const POLYGON_MUMBAI_RPC_URL = `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`;

//https://testnet.bscscan.com/
const BSC_MAINNET_RPC_URL = "https://bsc-dataseed.binance.org/";
const BSC_TESTNET_RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545";

const REPORT_GAS = true;

const config: HardhatUserConfig = {
	solidity: {
		version: "0.4.22",
		settings: {
			viaIR: false,
			optimizer: {
				enabled: false,
				// details: {
				// 	yul: true,
				// 	yulDetails: {
				// 		//optimizerSteps: "u",
				// 		optimizerSteps: "u",
				// 	},
				// },
				runs: 200,
			},
		},
	},
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			hardfork: "merge",
			// If you want to do some forking set `enabled` to true
			forking: {
				url: MAINNET_RPC_URL,
				blockNumber: FORKING_BLOCK_NUMBER,
				enabled: FORKING_BLOCK_NUMBER > 0,
			},
			saveDeployments: true,
			chainId: 31337,
		},
		localhost: {
			saveDeployments: true,
			chainId: 31337,
		},

		bsctest: {
			url: BSC_TESTNET_RPC_URL,
			accounts: PRIVATE_KEYS !== undefined ? PRIVATE_KEYS : { mnemonic: MNEMONIC },
			saveDeployments: true,
			chainId: 97,
			gasPrice: 20000000000,
		},
		bscmain: {
			url: BSC_MAINNET_RPC_URL,
			accounts: PRIVATE_KEYS !== undefined ? PRIVATE_KEYS : { mnemonic: MNEMONIC },
			saveDeployments: true,
			chainId: 56,
			gasPrice: 20000000000,
		},
		mumbai: {
			url: POLYGON_MUMBAI_RPC_URL,
			accounts: PRIVATE_KEYS !== undefined ? PRIVATE_KEYS : { mnemonic: MNEMONIC },
			saveDeployments: true,
			chainId: 137,
		},
		polygon: {
			url: POLYGON_MAINNET_RPC_URL,
			accounts: PRIVATE_KEYS !== undefined ? PRIVATE_KEYS : { mnemonic: MNEMONIC },
			saveDeployments: true,
			chainId: 137,
		},
		goerli: {
			url: GOERLI_RPC_URL,
			accounts: PRIVATE_KEYS !== undefined ? PRIVATE_KEYS : { mnemonic: MNEMONIC },
			saveDeployments: true,
			chainId: 5,
		},
		mainnet: {
			url: MAINNET_RPC_URL,
			accounts: PRIVATE_KEYS !== undefined ? PRIVATE_KEYS : { mnemonic: MNEMONIC },
			saveDeployments: true,
			chainId: 1,
		},
	},
	etherscan: {
		// npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
		apiKey: {
			bscTestnet: "", //get from here: https://bscscan.com/
			bsc: "",
			// mumbai: POLYGONSCAN_API_KEY,
			polygon: POLYGONSCAN_API_KEY,
			goerli: ETHERSCAN_API_KEY,
			mainnet: ETHERSCAN_API_KEY,
		},
	},
	gasReporter: {
		currency: "USD",
		gasPrice: 14, //ETH: 10-21; MATIC: 42
		enabled: true,
		noColors: true,
		token: "ETH", //outputFile: "./docs/gasReport/report.txt",
		coinmarketcap: "a05a81ec-dfd7-4da2-95b0-1eeb2241cc5f",
		outputFile: "./docs/gasReport/report.txt",
	},
	contractSizer: {
		alphaSort: true,
		disambiguatePaths: true,
		runOnCompile: false,
		strict: true,
		outputFile: "./docs/contractSize/report.txt",
	},
	abiExporter: [
		{
			path: "./docs/abi/json",
			format: "json",
			runOnCompile: false,
			clear: true,
			spacing: 2,
		},
		{
			path: "./docs/abi/minimal",
			format: "minimal",
			runOnCompile: false,
			clear: true,
			spacing: 2,
		},
		{
			path: "./docs/abi/fullName",
			format: "fullName",
			runOnCompile: false,
			clear: true,
			spacing: 2,
		},
	],
	tracer: {
		enabled: true,
		gasCost: true,
	},
	namedAccounts: namedAccounts,
	mocha: {
		timeout: 200000, // 200 seconds max for running tests
	},
};

export default config;
