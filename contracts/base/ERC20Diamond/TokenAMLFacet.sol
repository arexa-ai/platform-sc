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

	function getAccountBlackWhiteList(bytes32 _target, address _account) external view returns (bool) {
		return LibBlackWhiteList._getAccountBlackWhiteList(_target, _account);
	}

	function setAccountBlackWhiteList(
		bytes32 _target,
		address _account,
		bool _lockValue
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.AML_ROLE) {
		LibBlackWhiteList._setAccountBlackWhiteList(_target, _account, _lockValue);
	}

	function getSourceAccountBL(address _account) external view protectedCall returns (bool) {
		return LibBlackWhiteList._getAccountBlackWhiteList(SENDER_BLACKLIST, _account);
	}

	function setSourceAccountBL(
		address _account,
		bool _lockValue
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.AML_ROLE) {
		LibBlackWhiteList._setAccountBlackWhiteList(SENDER_BLACKLIST, _account, _lockValue);
	}

	function setBatchSourceAccountBL(
		address[] calldata _addresses,
		bool _lockValue
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.AML_ROLE) {
		require(_addresses.length <= 255, "Batch: too many addresses");
		for (uint256 i = 0; i < _addresses.length; i++) {
			LibBlackWhiteList._setAccountBlackWhiteList(SENDER_BLACKLIST, _addresses[i], _lockValue);
		}
	}

	function getDestinationAccountBL(address _account) external view protectedCall returns (bool) {
		return LibBlackWhiteList._getAccountBlackWhiteList(RECIPIENT_BLACKLIST, _account);
	}

	function setDestinationAccountBL(
		address _account,
		bool _lockValue
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.AML_ROLE) {
		LibBlackWhiteList._setAccountBlackWhiteList(RECIPIENT_BLACKLIST, _account, _lockValue);
	}

	function setBatchDestinationAccountBL(
		address[] calldata _addresses,
		bool _lockValue
	) external protectedCall whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.AML_ROLE) {
		require(_addresses.length <= 255, "Batch: too many addresses");
		for (uint256 i = 0; i < _addresses.length; i++) {
			LibBlackWhiteList._setAccountBlackWhiteList(RECIPIENT_BLACKLIST, _addresses[i], _lockValue);
		}
	}

	//ide az blck lista kezelés, illetve 1404 kezelés kellene
	//végleg elégetni egy számlát, és tokent kivonni
	function withdrawUserTokenByCompliance(address _account) external protectedCall onlyRole(LibTokenConst.COMPLIANCE_ROLE) {
		//
		//ha számla végleg törölt listában van ÉS blacklistán is van
		//akkor a teljes összeget transferálni kell a treasury számlára???
	}
}
