// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { LibTargetedPausable } from "./LibTargetedPausable.sol";

abstract contract ModifierPausable {
	//
	modifier whenNotPaused(bytes32 target) {
		LibTargetedPausable.whenNotPaused(target);
		_;
	}

	modifier whenPaused(bytes32 target) {
		LibTargetedPausable.whenPaused(target);
		_;
	}
}
