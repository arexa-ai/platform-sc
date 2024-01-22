// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { EnumerableSet } from "../../utils/EnumerableSet.sol";

struct RestrictionCalc {
	uint256 bought;
	uint256 sold;
	uint256 time; //blockheight * 1 000 000 000
	uint256 accumulated;
}

struct Restriction {
	uint256 endOfRestriction; //if act-time is lower then endOfRestriction then only calculating the a previous data, new tokens do not restircted
	uint256 endOfRestrictionCalc; //if act-time is lower then endOfRestrictionCalc then now calculation at all
	uint256 timeDelta; //if time is blockHeight based then delta should be calculated like that. If second based then...
	//Account - restriction calculation params
	mapping(address => RestrictionCalc) restriction;
}

struct TokenRestrictionStorage {
	//tokenId => restriction, every token have
	mapping(uint256 => Restriction) tokenRestriction;
}

library LibTokenRestrictionStorage {
	bytes32 internal constant STORAGE_SLOT = keccak256("usmart.common.token-restriction.storage.v1");

	function layout() internal pure returns (TokenRestrictionStorage storage layout_) {
		bytes32 position = STORAGE_SLOT;
		assembly {
			layout_.slot := position
		}
	}
}
