// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

struct BridgeRequest {
	uint256 fromChainId;
	address fromToken;
	address fromAddress;
	uint256 toChainId;
	address toToken;
	address toAddress;
	uint256 amount;
	uint256 nonce;
}
