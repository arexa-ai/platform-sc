// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { LibAccessControl } from "../base/AccessControl/LibAccessControl.sol";

import { LibArexaConst } from "./LibArexaConst.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";

contract ArexaACLFacet is CallProtection, ModifierRole, ModifierPausable {
	bytes32 public constant AREXA_ADMIN_ROLE = LibArexaConst.AREXA_ADMIN_ROLE;

	function hasRole(bytes32 role, address account) external view virtual protectedCall returns (bool) {
		return LibAccessControl._hasRole(role, account);
	}

	function grantRole(bytes32 role, address account) external virtual protectedCall onlyRoleAdmin(role) {
		_grantRole(role, account);
	}

	function revokeRole(bytes32 role, address account) external virtual protectedCall onlyRoleAdmin(role) {
		require(!(role == AREXA_ADMIN_ROLE && account == LibAccessControl._owner()), "Role cannot revoke from owner!");
		_revokeRole(role, account);
	}

	function renounceRole(bytes32 role) external virtual protectedCall {
		_renounceRole(role);
	}

	function getRoleAdmin(bytes32 role) external view virtual protectedCall returns (bytes32) {
		return LibAccessControl._getRoleAdmin(role);
	}

	function setRoleAdmin(bytes32 role, bytes32 adminRole) external protectedCall onlyOwner {
		_setRoleAdmin(role, adminRole);
	}

	function _setRoleAdmin(bytes32 role, bytes32 adminRole) internal virtual protectedCall {
		LibAccessControl._setRoleAdmin(role, adminRole);
	}

	function _grantRole(bytes32 role, address account) internal virtual protectedCall {
		LibAccessControl._grantRole(role, account);
	}

	function _revokeRole(bytes32 role, address account) internal virtual protectedCall {
		LibAccessControl._revokeRole(role, account);
	}

	function _renounceRole(bytes32 role) internal virtual protectedCall {
		LibAccessControl._renounceRole(role);
	}
}
