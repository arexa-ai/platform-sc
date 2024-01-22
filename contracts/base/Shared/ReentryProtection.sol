// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import "./LibReentryProtectionStorage.sol";

contract ReentryProtection {
	modifier noReentry() {
		// Use counter to only write to storage once
		ReentryProtectionStorage storage rps = LibReentryProtectionStorage.layout();
		rps.lockCounter++;
		uint256 lockValue = rps.lockCounter;
		_;
		require(lockValue == rps.lockCounter, "ReentryProtection: reentry detected!");
	}
}
