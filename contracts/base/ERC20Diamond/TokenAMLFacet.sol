// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { LibAccessControl } from "../AccessControl/LibAccessControl.sol";
import { LibBlackWhiteList } from "../BlackWhiteList/LibBlackWhiteList.sol";
import { LibTargetedPausable } from "../TargetedPausable/LibTargetedPausable.sol";

import { LibTokenConst } from "../ERC20Token/LibTokenConst.sol";

import { ModifierRole } from "../AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../TargetedPausable/ModifierPausable.sol";
import { CallProtection } from "../Shared/ProtectedCall.sol";

abstract contract TokenAMLFacet is CallProtection, ModifierRole, ModifierPausable {
	bytes32 public constant SENDER_BLACKLIST = LibTokenConst.SENDER_BL;
	bytes32 public constant RECIPIENT_BLACKLIST = LibTokenConst.RECIPIENT_BL;

	function getAccountBlackWhiteList(bytes32 target, address account) external view returns (bool) {
		return LibBlackWhiteList.getAccountBlackWhiteList(target, account);
	}

	function setAccountBlackWhiteList(
		bytes32 target,
		address account,
		bool lockValue
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.AML_ROLE) {
		LibBlackWhiteList.setAccountBlackWhiteList(target, account, lockValue);
	}

	function getSourceAccountBL(address account) external view protectedCall returns (bool) {
		return LibBlackWhiteList.getAccountBlackWhiteList(SENDER_BLACKLIST, account);
	}

	function setSourceAccountBL(
		address account,
		bool lockValue
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.AML_ROLE) {
		LibBlackWhiteList.setAccountBlackWhiteList(SENDER_BLACKLIST, account, lockValue);
	}

	function setBatchSourceAccountBL(
		address[] calldata addresses,
		bool lockValue
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.AML_ROLE) {
		require(addresses.length <= 255, "Batch: too many addresses");
		for (uint256 i = 0; i < addresses.length; i++) {
			LibBlackWhiteList.setAccountBlackWhiteList(SENDER_BLACKLIST, addresses[i], lockValue);
		}
	}

	function getDestinationAccountBL(address account) external view protectedCall returns (bool) {
		return LibBlackWhiteList.getAccountBlackWhiteList(RECIPIENT_BLACKLIST, account);
	}

	function setDestinationAccountBL(
		address account,
		bool lockValue
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.AML_ROLE) {
		LibBlackWhiteList.setAccountBlackWhiteList(RECIPIENT_BLACKLIST, account, lockValue);
	}

	function setBatchDestinationAccountBL(
		address[] calldata addresses,
		bool lockValue
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.AML_ROLE) {
		require(addresses.length <= 255, "Batch: too many addresses");
		for (uint256 i = 0; i < addresses.length; i++) {
			LibBlackWhiteList.setAccountBlackWhiteList(RECIPIENT_BLACKLIST, addresses[i], lockValue);
		}
	}

	//ide az blck lista kezelés, illetve 1404 kezelés kellene
	//végleg elégetni egy számlát, és tokent kivonni
	function withdrawUserTokenByCompliance(address account) external protectedCall onlyRole(LibTokenConst.COMPLIANCE_ROLE) {
		//
		//ha számla végleg törölt listában van ÉS blacklistán is van
		//akkor a teljes összeget transferálni kell a treasury számlára???
	}
}
