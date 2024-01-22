// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { LibAccessControl } from "../base/AccessControl/LibAccessControl.sol";
//import { LibBlackWhiteList } from "../base/BlackWhiteList/LibBlackWhiteList.sol";
import { LibTargetedPausable } from "../base/TargetedPausable/LibTargetedPausable.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";

import { IERC20 } from "../base/ERC20/IERC20.sol";

import { LibArexaConst } from "./LibArexaConst.sol";

import { LibArexaPlatform } from "./Platform/LibArexaPlatform.sol";

contract ArexaAdminFacet is CallProtection, ModifierRole, ModifierPausable {
	constructor() {}

	//Platform paraméterek állítása
	function getPayingToken() external view protectedCall returns (IERC20) {
		return LibArexaPlatform.getPayingToken();
	}

	function setPayingToken(IERC20 _token) external whenNotPaused(LibArexaConst.FULL) onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) {
		//require(address(LibArexaPlatform.getPayingToken()) == address(0), "Currently changing payment token is not permitted.");
		LibArexaPlatform.setPayingToken(_token);
	}

	function getArexaERC20Token() external view protectedCall returns (IERC20) {
		return LibArexaPlatform.getArexaERC20Token();
	}
}
