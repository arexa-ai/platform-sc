// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { LibAccessControl } from "../AccessControl/LibAccessControl.sol";
import { LibTargetedPausable } from "../TargetedPausable/LibTargetedPausable.sol";

import { LibTokenConst } from "../ERC20Token/LibTokenConst.sol";

import { ModifierRole } from "../AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../TargetedPausable/ModifierPausable.sol";
import { CallProtection } from "../Shared/ProtectedCall.sol";

abstract contract TokenPausableFacet is CallProtection, ModifierRole, ModifierPausable {
	bytes32 public constant PAUSABLE_FULL = LibTokenConst.FULL; //LibTokenConst LibBlockBenTokenConst

	constructor() {}

	function paused(bytes32 target) external view returns (bool status_) {
		status_ = LibTargetedPausable._paused(target);
	}

	function pause(bytes32 target) external whenNotPaused(target) onlyRole(LibTokenConst.TOKEN_ADMIN_ROLE) {
		LibTargetedPausable._pause(target, msg.sender);
	}

	function unpause(bytes32 target) external whenPaused(target) onlyRole(LibTokenConst.TOKEN_ADMIN_ROLE) {
		LibTargetedPausable._unpause(target, msg.sender);
	}
}
