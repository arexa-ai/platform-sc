// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import "./LibAccessControl.sol";

import { IAccessControl } from "./IAccessControl.sol";

abstract contract AccessControl is IAccessControl {
	modifier onlyRole(bytes32 role) {
		LibAccessControl._checkRole(role);
		_;
	}

	function hasRole(bytes32 role, address account) external view virtual returns (bool) {
		return LibAccessControl._hasRole(role, account);
	}

	function grantRole(bytes32 role, address account) external virtual onlyRole(LibAccessControl._getRoleAdmin(role)) {
		LibAccessControl._grantRole(role, account);
	}

	function revokeRole(bytes32 role, address account) external virtual onlyRole(LibAccessControl._getRoleAdmin(role)) {
		LibAccessControl._revokeRole(role, account);
	}

	function renounceRole(bytes32 role, address account) external virtual {
		require(account == msg.sender, "AccessControl: can only renounce roles for self");

		LibAccessControl._revokeRole(role, account);
	}

	function getRoleAdmin(bytes32 role) external view virtual override returns (bytes32) {
		return LibAccessControl._getRoleAdmin(role);
	}

	function _setRoleAdmin(bytes32 role, bytes32 adminRole) internal virtual {
		LibAccessControl._setRoleAdmin(role, adminRole);
	}

	function _grantRole(bytes32 role, address account) internal virtual {
		LibAccessControl._grantRole(role, account);
	}

	function _revokeRole(bytes32 role, address account) internal virtual {
		LibAccessControl._revokeRole(role, account);
	}
}
