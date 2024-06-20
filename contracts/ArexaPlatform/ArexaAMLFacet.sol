// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { LibAccessControl } from "../base/AccessControl/LibAccessControl.sol";
import { LibBlackWhiteList } from "../base/BlackWhiteList/LibBlackWhiteList.sol";
import { LibTargetedPausable } from "../base/TargetedPausable/LibTargetedPausable.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";
import { LibArexaConst } from "./LibArexaConst.sol";

contract ArexaAMLFacet is CallProtection, ModifierRole, ModifierPausable {
	bytes32 public constant MAGIC100_FIRST_BUYER = LibArexaConst.MAGIC100_FIRST_BUYER; //LibTokenConst LibBlockBenTokenConst

	function getAccountBlackWhiteList(bytes32 target, address account) external view protectedCall returns (bool) {
		return LibBlackWhiteList.getAccountBlackWhiteList(target, account);
	}

	function setAccountBlackWhiteList(
		bytes32 target,
		address account,
		bool lockValue
	) external protectedCall whenNotPaused(LibArexaConst.FULL) onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) {
		LibBlackWhiteList.setAccountBlackWhiteList(target, account, lockValue);
	}

	function getMagic100FirstBuyerWL(address account) external view protectedCall returns (bool) {
		return LibBlackWhiteList.getAccountBlackWhiteList(MAGIC100_FIRST_BUYER, account);
	}

	function setMagic100FirstBuyerWL(
		address account,
		bool lockValue
	) external protectedCall whenNotPaused(LibArexaConst.FULL) onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) {
		LibBlackWhiteList.setAccountBlackWhiteList(MAGIC100_FIRST_BUYER, account, lockValue);
	}

	function setBatchMagic100FirstBuyerWL(
		address[] calldata addresses,
		bool lockValue
	) external protectedCall whenNotPaused(LibArexaConst.FULL) onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) {
		require(addresses.length <= 255, "Batch: too many addresses");
		for (uint256 i = 0; i < addresses.length; i++) {
			LibBlackWhiteList.setAccountBlackWhiteList(MAGIC100_FIRST_BUYER, addresses[i], lockValue);
		}
	}
}
