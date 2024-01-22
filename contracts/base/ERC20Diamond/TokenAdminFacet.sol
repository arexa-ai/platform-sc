// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { LibAccessControl } from "../AccessControl/LibAccessControl.sol";
//import { LibBlackWhiteList } from "../base/BlackWhiteList/LibBlackWhiteList.sol";
import { LibTargetedPausable } from "../TargetedPausable/LibTargetedPausable.sol";

import { LibCustomERC20Extension } from "../ERC20Token/LibCustomERC20Extension.sol";
import { LibTokenConst } from "../ERC20Token/LibTokenConst.sol";

import { ModifierRole } from "../AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../TargetedPausable/ModifierPausable.sol";
import { CallProtection } from "../Shared/ProtectedCall.sol";

abstract contract TokenAdminFacet is CallProtection, ModifierRole, ModifierPausable {
	constructor() {}

	function getTreasuryAddress() external view protectedCall returns (address) {
		return LibCustomERC20Extension._getTreasuryAddress();
	}

	function setTreasuryAddress(
		address _treasuryAddress
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.TOKEN_ADMIN_ROLE) {
		LibCustomERC20Extension._setTreasuryAddress(_treasuryAddress);
	}

	function getURL() external view protectedCall returns (string memory) {
		return LibCustomERC20Extension._getURL();
	}

	function setURL(
		string calldata _url
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.TOKEN_ADMIN_ROLE) {
		LibCustomERC20Extension._setURL(_url);
	}

	function getGeneralFeeAddress() external view protectedCall returns (address) {
		return LibCustomERC20Extension._getGeneralFeeAddress();
	}

	function setGeneralFeeAddress(
		address _generalFeeAddress
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.TOKEN_ADMIN_ROLE) {
		LibCustomERC20Extension._setGeneralFeeAddress(_generalFeeAddress);
	}

	function getGeneralFee() external view protectedCall returns (uint16) {
		return LibCustomERC20Extension._getGeneralFee();
	}

	function setGeneralFee(
		uint16 _generalFee
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.TOKEN_ADMIN_ROLE) {
		LibCustomERC20Extension._setGeneralFee(_generalFee);
	}

	function getPoolFee() external view protectedCall returns (uint16) {
		return LibCustomERC20Extension._getPoolFee();
	}

	function setPoolFee(uint16 _PoolFee) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.TOKEN_ADMIN_ROLE) {
		LibCustomERC20Extension._setPoolFee(_PoolFee);
	}

	function getPoolFeeAddress() external view protectedCall returns (address) {
		return LibCustomERC20Extension._getPoolFeeAddress();
	}

	function setPoolFeeAddress(
		address _PoolFeeAddress
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.TOKEN_ADMIN_ROLE) {
		LibCustomERC20Extension._setPoolFeeAddress(_PoolFeeAddress);
	}
}
