// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { LibAccessControl } from "./LibAccessControl.sol";

abstract contract ModifierRole {
	modifier onlyOwner() {
		LibAccessControl._enforceIsOwner();
		_;
	}

	modifier onlyTransitiveOwner() {
		LibAccessControl._enforceIsTransitiveOwner();
		_;
	}

	modifier onlyRole(bytes32 role) {
		LibAccessControl._checkRole(role);
		_;
	}

	modifier onlyRoleAdmin(bytes32 role) {
		LibAccessControl._checkRole(LibAccessControl._getRoleAdmin(role));
		_;
	}
}
