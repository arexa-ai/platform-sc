// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

struct ERC20BaseStorage {
	mapping(address => uint256) balances;
	mapping(address => mapping(address => uint256)) allowances;
	uint256 totalSupply;
}

library LibERC20BaseStorage {
	bytes32 internal constant STORAGE_SLOT = keccak256("usmart.contracts.erc20-base.storage.v1");

	function layout() internal pure returns (ERC20BaseStorage storage layout_) {
		bytes32 position = STORAGE_SLOT;
		assembly {
			layout_.slot := position
		}
	}
}
