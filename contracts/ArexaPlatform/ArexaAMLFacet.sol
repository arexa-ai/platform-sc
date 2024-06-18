// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { LibAccessControl } from "../base/AccessControl/LibAccessControl.sol";
import { LibBlackWhiteList } from "../base/BlackWhiteList/LibBlackWhiteList.sol";
import { LibTargetedPausable } from "../base/TargetedPausable/LibTargetedPausable.sol";

//import { LibTokenConst } from "./LibTokenConst.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";
import { LibArexaConst } from "./LibArexaConst.sol";

contract ArexaAMLFacet is CallProtection, ModifierRole, ModifierPausable {
	bytes32 public constant MAGIC100_FIRST_BUYER = LibArexaConst.MAGIC100_FIRST_BUYER; //LibTokenConst LibBlockBenTokenConst

	function getAccountBlackWhiteList(bytes32 _target, address _account) external view returns (bool) {
		return LibBlackWhiteList._getAccountBlackWhiteList(_target, _account);
	}

	function setAccountBlackWhiteList(
		bytes32 _target,
		address _account,
		bool _lockValue
	) external whenNotPaused(LibArexaConst.FULL) onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) {
		LibBlackWhiteList._setAccountBlackWhiteList(_target, _account, _lockValue);
	}

	function getMagic100FirstBuyerWL(address _account) external view returns (bool) {
		return LibBlackWhiteList._getAccountBlackWhiteList(MAGIC100_FIRST_BUYER, _account);
	}

	function setMagic100FirstBuyerWL(
		address _account,
		bool _lockValue
	) external whenNotPaused(LibArexaConst.FULL) onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) {
		LibBlackWhiteList._setAccountBlackWhiteList(MAGIC100_FIRST_BUYER, _account, _lockValue);
	}

	function setBatchMagic100FirstBuyerWL(
		address[] calldata _addresses,
		bool _lockValue
	) external whenNotPaused(LibArexaConst.FULL) onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) {
		require(_addresses.length <= 255, "Batch: too many addresses");
		for (uint256 i = 0; i < _addresses.length; i++) {
			LibBlackWhiteList._setAccountBlackWhiteList(MAGIC100_FIRST_BUYER, _addresses[i], _lockValue);
		}
	}
}
