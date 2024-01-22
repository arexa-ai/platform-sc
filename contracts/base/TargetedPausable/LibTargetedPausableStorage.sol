// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { EnumerableSet } from "../../utils/EnumerableSet.sol";

struct TargetedPausableStorage {
	mapping(bytes32 => bool) paused;
}

library LibTargetedPausableStorage {
	bytes32 internal constant STORAGE_SLOT = keccak256("usmart.common.targeted-pausable.storage.v1");

	function layout() internal pure returns (TargetedPausableStorage storage layout_) {
		bytes32 position = STORAGE_SLOT;
		assembly {
			layout_.slot := position
		}
	}
}
