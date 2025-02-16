// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { LibAccessControl } from "../base/AccessControl/LibAccessControl.sol";
import { LibTargetedPausable } from "../base/TargetedPausable/LibTargetedPausable.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";

import { IERC20 } from "../base/ERC20/IERC20.sol";

import { LibArexaConst } from "./LibArexaConst.sol";

import { LibArexaPlatform } from "./Platform/LibArexaPlatform.sol";
import { LibArexaPlatformShared } from "./Platform/LibArexaPlatformShared.sol";

contract ArexaAdminFacet is CallProtection, ModifierRole, ModifierPausable {
	function getPayingToken() external view protectedCall returns (IERC20) {
		return LibArexaPlatformShared.getPayingToken();
	}

	function setPayingToken(
		IERC20 token
	) external protectedCall whenNotPaused(LibArexaConst.FULL) onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) {
		require(address(LibArexaPlatformShared.getPayingToken()) == address(0), "Currently changing payment token is not permitted.");
		LibArexaPlatform.setPayingToken(token);
	}

	function getArexaERC20Token() external view protectedCall returns (IERC20) {
		return LibArexaPlatformShared.getArexaERC20Token();
	}
}
