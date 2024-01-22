// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { EnumerableSet } from "../../utils/EnumerableSet.sol";

struct BlackWhiteListStorage {
	mapping(bytes32 => mapping(address => bool)) whiteList;
}

library LibBlackWhiteListStorage {
	bytes32 internal constant STORAGE_SLOT = keccak256("usmart.common.white-list.storage.v1");

	function layout() internal pure returns (BlackWhiteListStorage storage layout_) {
		bytes32 position = STORAGE_SLOT;
		assembly {
			layout_.slot := position
		}
	}
}
