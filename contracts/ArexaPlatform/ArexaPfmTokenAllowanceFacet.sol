// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { LibERC1155 } from "../base/ERC1155/base/LibERC1155.sol";

import { LibAccessControl } from "../base/AccessControl/LibAccessControl.sol";
import { LibTargetedPausable } from "../base/TargetedPausable/LibTargetedPausable.sol";

import { IERC1155Allowance } from "../base/ERC1155/IERC1155Allowance.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";
import { LibArexaConst } from "./LibArexaConst.sol";

contract ArexaPfmTokenAllowanceFacet is IERC1155Allowance, CallProtection, ModifierRole, ModifierPausable {
	function isOperatorSpendingLimitEnabled(uint256 _tokenId) external view returns (bool) {
		return LibERC1155.isOperatorSpendingLimitEnabled(_tokenId);
	}

	function setOperatorSpendingLimitEnabled(uint256 _tokenId, bool _enabled) external protectedCall onlyOwner {
		LibERC1155.setOperatorSpendingLimitEnabled(_tokenId, _enabled);
	}

	function approve(
		address _operator,
		uint256 _id,
		uint256 _currentValue,
		uint256 _newValue
	) external virtual override protectedCall whenNotPaused(LibArexaConst.FULL) {
		LibERC1155.approve(msg.sender, _operator, _id, _currentValue, _newValue);
	}

	function allowance(address _owner, address _operator, uint256 _id) external view override returns (uint256) {
		return LibERC1155.allowance(_owner, _operator, _id);
	}
}
