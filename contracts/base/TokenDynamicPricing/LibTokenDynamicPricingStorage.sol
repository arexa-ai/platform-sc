// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { EnumerableSet } from "../../utils/EnumerableSet.sol";

struct DynamicPricing {
	bool isEnabled;
	uint256 quantity;
	uint256 totalValue;
	uint256 k;
	uint256 min;
	uint256 max;
}

struct TokenDynamicPricingStorage {
	//tokenId => restriction, every token have
	mapping(uint256 => DynamicPricing) tokenDynamicPricing;
}

library LibTokenDynamicPricingStorage {
	bytes32 internal constant STORAGE_SLOT = keccak256("usmart.common.token-dynamic-pricing.storage.v1");

	function layout() internal pure returns (TokenDynamicPricingStorage storage layout_) {
		bytes32 position = STORAGE_SLOT;
		assembly {
			layout_.slot := position
		}
	}
}
