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

abstract contract TokenACLFacet is CallProtection, ModifierRole, ModifierPausable {
	bytes32 public constant TOKEN_ADMIN_ROLE = LibTokenConst.TOKEN_ADMIN_ROLE;
	bytes32 public constant TREASURY_ROLE = LibTokenConst.TREASURY_ROLE;
	bytes32 public constant AML_ROLE = LibTokenConst.AML_ROLE;
	bytes32 public constant COMPLIANCE_ROLE = LibTokenConst.COMPLIANCE_ROLE;

	//ide az accesscontroll kell
	function hasRole(bytes32 role, address account) external view virtual protectedCall returns (bool) {
		return LibAccessControl._hasRole(role, account);
	}

	function grantRole(bytes32 role, address account) external virtual protectedCall onlyRoleAdmin(role) {
		_grantRole(role, account);
	}

	function revokeRole(bytes32 role, address account) external virtual protectedCall onlyRoleAdmin(role) {
		require(!(role == TOKEN_ADMIN_ROLE && account == LibAccessControl._owner()), "Role cannot revoke from owner!");
		_revokeRole(role, account);
	}

	function renounceRole(bytes32 role) external virtual protectedCall {
		_renounceRole(role);
	}

	function getRoleAdmin(bytes32 role) external view virtual protectedCall returns (bytes32) {
		return LibAccessControl._getRoleAdmin(role);
	}

	function setRoleAdmin(bytes32 role, bytes32 adminRole) external virtual protectedCall onlyOwner {
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
