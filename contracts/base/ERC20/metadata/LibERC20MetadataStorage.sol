// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

struct ERC20MetadataStorage {
	string name;
	string symbol;
	uint8 decimals;
}

library LibERC20MetadataStorage {
	bytes32 internal constant STORAGE_SLOT = keccak256("usmart.common.erc20-metadata.storage.v1");

	function layout() internal pure returns (ERC20MetadataStorage storage layout_) {
		bytes32 position = STORAGE_SLOT;
		assembly {
			layout_.slot := position
		}
	}
}
