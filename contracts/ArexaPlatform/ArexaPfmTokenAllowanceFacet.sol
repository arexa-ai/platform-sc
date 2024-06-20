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
	function isOperatorSpendingLimitEnabled(uint256 tokenId) external view returns (bool) {
		return LibERC1155.isOperatorSpendingLimitEnabled(tokenId);
	}

	function setOperatorSpendingLimitEnabled(uint256 tokenId, bool enabled) external protectedCall onlyOwner {
		LibERC1155.setOperatorSpendingLimitEnabled(tokenId, enabled);
	}

	function approve(
		address operator,
		uint256 id,
		uint256 currentValue,
		uint256 newValue
	) external virtual override protectedCall whenNotPaused(LibArexaConst.FULL) {
		LibERC1155.approve(msg.sender, operator, id, currentValue, newValue);
	}

	function allowance(address owner_, address operator, uint256 id) external view override protectedCall returns (uint256) {
		return LibERC1155.allowance(owner_, operator, id);
	}
}
