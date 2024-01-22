// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { LibERC1155 } from "../base/ERC1155/base/LibERC1155.sol";
import { IERC1155Pausable } from "../base/ERC1155/IERC1155Pausable.sol";

import { LibAccessControl } from "../base/AccessControl/LibAccessControl.sol";
import { LibTargetedPausable } from "../base/TargetedPausable/LibTargetedPausable.sol";
import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";
import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
import { LibArexaConst } from "./LibArexaConst.sol";

contract ArexaPausableFacet is IERC1155Pausable, ModifierRole, ModifierPausable {
	bytes32 public constant PAUSABLE_FULL = LibArexaConst.FULL; //LibTokenConst LibBlockBenTokenConst
	bytes32 public constant PAUSABLE_SUBSCR1_TOKEN = LibArexaConst.SUBSCR1_TOKEN; //LibTokenConst LibBlockBenTokenConst
	bytes32 public constant PAUSABLE_SUBSCR2_TOKEN = LibArexaConst.SUBSCR2_TOKEN; //LibTokenConst LibBlockBenTokenConst
	bytes32 public constant PAUSABLE_TRADER_TOKEN = LibArexaConst.TRADER_TOKEN; //LibTokenConst LibBlockBenTokenConst
	bytes32 public constant PAUSABLE_AREXA_TOKEN = LibArexaConst.AREXA_TOKEN; //LibTokenConst LibBlockBenTokenConst
	bytes32 public constant PAUSABLE_MAGIC_TOKEN = LibArexaConst.MAGIC_TOKEN; //LibTokenConst LibBlockBenTokenConst

	constructor() {}

	function paused(bytes32 target) external view returns (bool status_) {
		status_ = LibTargetedPausable._paused(target);
	}

	function pause(bytes32 target) external whenNotPaused(target) onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) {
		LibTargetedPausable._pause(target, msg.sender);
	}

	function unpause(bytes32 target) external whenPaused(target) onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) {
		LibTargetedPausable._unpause(target, msg.sender);
	}

	/**
	 *
	 * WARNING! pause and unpause controls the token selling functions, but not the transfers
	 *
	 */
	function pauseAllToken() external override whenNotPaused(LibArexaConst.FULL) onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) {
		LibERC1155.pauseAllToken(msg.sender);
	}

	function unpauseAllToken() external override whenNotPaused(LibArexaConst.FULL) onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) {
		LibERC1155.unpauseAllToken(msg.sender);
	}

	function pauseToken(uint256 tokenId) external override whenNotPaused(LibArexaConst.FULL) onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) {
		LibERC1155.pauseToken(msg.sender, tokenId);
	}

	function unpauseToken(uint256 tokenId) external override whenNotPaused(LibArexaConst.FULL) onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) {
		LibERC1155.unpauseToken(msg.sender, tokenId);
	}
}
