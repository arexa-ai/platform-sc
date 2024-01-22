// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

interface IDiamondEvents {
	event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

	event RoleAdminChanged(address indexed owner, bytes32 role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole);
	event RoleGranted(address indexed owner, bytes32 role, address indexed account, address indexed sender);
	event RoleRevoked(address indexed owner, bytes32 role, address indexed account, address indexed sender);

	error AccessDenied(bytes32 role, address account);

	error TargetedPausable__TargetedPaused();
	error TargetedPausable__NotTargetedPaused();

	event TargetedPaused(bytes32 indexed target, address indexed account);
	event TargetedUnpaused(bytes32 indexed target, address indexed account);
}
