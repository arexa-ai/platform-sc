// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { LibAccessControl } from "../AccessControl/LibAccessControl.sol";
import { LibTargetedPausable } from "../TargetedPausable/LibTargetedPausable.sol";

import { LibCustomERC20Extension } from "../ERC20Token/LibCustomERC20Extension.sol";
import { LibTokenConst } from "../ERC20Token/LibTokenConst.sol";

import { ModifierRole } from "../AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../TargetedPausable/ModifierPausable.sol";
import { CallProtection } from "../Shared/ProtectedCall.sol";

abstract contract TokenAdminFacet is CallProtection, ModifierRole, ModifierPausable {
	function getTreasuryAddress() external view protectedCall returns (address) {
		return LibCustomERC20Extension.getTreasuryAddress();
	}

	function setTreasuryAddress(
		address treasuryAddress
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.TOKEN_ADMIN_ROLE) {
		LibCustomERC20Extension.setTreasuryAddress(treasuryAddress);
	}

	function getURL() external view protectedCall returns (string memory) {
		return LibCustomERC20Extension.getURL();
	}

	function setURL(string calldata url) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.TOKEN_ADMIN_ROLE) {
		LibCustomERC20Extension.setURL(url);
	}

	function getGeneralFeeAddress() external view protectedCall returns (address) {
		return LibCustomERC20Extension.getGeneralFeeAddress();
	}

	function setGeneralFeeAddress(
		address generalFeeAddress
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.TOKEN_ADMIN_ROLE) {
		LibCustomERC20Extension.setGeneralFeeAddress(generalFeeAddress);
	}

	function getGeneralFee() external view protectedCall returns (uint16) {
		return LibCustomERC20Extension.getGeneralFee();
	}

	function setGeneralFee(
		uint16 generalFee
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.TOKEN_ADMIN_ROLE) {
		LibCustomERC20Extension.setGeneralFee(generalFee);
	}

	function getPoolFee() external view protectedCall returns (uint16) {
		return LibCustomERC20Extension.getPoolFee();
	}

	function setPoolFee(uint16 poolFee) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.TOKEN_ADMIN_ROLE) {
		LibCustomERC20Extension.setPoolFee(poolFee);
	}

	function getPoolFeeAddress() external view protectedCall returns (address) {
		return LibCustomERC20Extension.getPoolFeeAddress();
	}

	function setPoolFeeAddress(
		address poolFeeAddress
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.TOKEN_ADMIN_ROLE) {
		LibCustomERC20Extension.setPoolFeeAddress(poolFeeAddress);
	}
}
