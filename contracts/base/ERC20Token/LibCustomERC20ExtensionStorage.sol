// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

struct CustomERC20ExtensionStorage {
	string url;
	address treasuryAddress;
	uint16 generalFee;
	address generalFeeAddress;
	uint16 poolFee;
	address poolFeeAddress;
}

library LibCustomERC20ExtensionStorage {
	bytes32 internal constant STORAGE_SLOT = keccak256("usmart.constract.custom-erc20-extension.storage.v1");

	function layout() internal pure returns (CustomERC20ExtensionStorage storage layout_) {
		bytes32 position = STORAGE_SLOT;
		assembly {
			layout_.slot := position
		}
	}
}
