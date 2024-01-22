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
	constructor() {}

	function safeTransferFrom(
		address _from,
		address _to,
		uint256 _id,
		uint256 _value,
		bytes calldata _data
	) external override protectedCall whenNotPaused(LibArexaConst.FULL) {
		LibERC1155.safeTransfer(msg.sender, _from, _to, _id, _value, _data);
	}

	function safeBatchTransferFrom(
		address _from,
		address _to,
		uint256[] calldata _ids,
		uint256[] calldata _values,
		bytes calldata _data
	) external override protectedCall whenNotPaused(LibArexaConst.FULL) {
		LibERC1155.safeTransferBatch(msg.sender, _from, _to, _ids, _values, _data);
	}

	function balanceOf(address _owner, uint256 _id) external view override returns (uint256) {
		return LibERC1155.balanceOf(_owner, _id);
	}

	function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view override returns (uint256[] memory) {
		return LibERC1155.balanceOfBatch(_owners, _ids);
	}

	function setApprovalForAll(address _operator, bool _approved) external override protectedCall whenNotPaused(LibArexaConst.FULL) {
		LibERC1155.setApprovalForAll(msg.sender, _operator, _approved);
	}

	function isApprovedForAll(address _owner, address _operator) external view override returns (bool) {
		return LibERC1155.isApprovedForAll(_owner, _operator);
	}
}
