// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { IERC1155 } from "../base/ERC1155/IERC1155.sol";

import { LibERC1155 } from "../base/ERC1155/base/LibERC1155.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";
import { LibArexaConst } from "./LibArexaConst.sol";

contract ArexaPfmTokenFacet is IERC1155, CallProtection, ModifierPausable {
	string public constant name = "Arexa AI Platform";
	string public constant symbol = "AREXA";

	function safeTransferFrom(
		address from,
		address to,
		uint256 id,
		uint256 value,
		bytes calldata data
	) external override protectedCall whenNotPaused(LibArexaConst.FULL) {
		LibERC1155.safeTransfer(msg.sender, from, to, id, value, data);
	}

	function safeBatchTransferFrom(
		address from,
		address to,
		uint256[] calldata ids,
		uint256[] calldata values,
		bytes calldata data
	) external override protectedCall whenNotPaused(LibArexaConst.FULL) {
		LibERC1155.safeTransferBatch(msg.sender, from, to, ids, values, data);
	}

	//When creating the dummy contract, it is a name collision
	function balanceOf(address owner_, uint256 id) external view override protectedCall returns (uint256) {
		return LibERC1155.balanceOf(owner_, id);
	}

	function balanceOfBatch(
		address[] calldata owners,
		uint256[] calldata ids
	) external view override protectedCall returns (uint256[] memory) {
		return LibERC1155.balanceOfBatch(owners, ids);
	}

	function setApprovalForAll(address operator, bool approved) external override protectedCall whenNotPaused(LibArexaConst.FULL) {
		LibERC1155.setApprovalForAll(msg.sender, operator, approved);
	}

	function isApprovedForAll(address owner_, address operator) external view override protectedCall returns (bool) {
		return LibERC1155.isApprovedForAll(owner_, operator);
	}
}
