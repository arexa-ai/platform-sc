// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

struct ReentryProtectionStorage {
	uint256 lockCounter;
}

library LibReentryProtectionStorage {
	bytes32 internal constant STORAGE_SLOT = keccak256("usmart.common.reentry-protection.storage.v1");

	function layout() internal pure returns (ReentryProtectionStorage storage layout_) {
		bytes32 position = STORAGE_SLOT;
		assembly {
			layout_.slot := position
		}
	}
}
