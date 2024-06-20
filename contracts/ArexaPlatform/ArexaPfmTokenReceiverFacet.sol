// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { LibERC1155 } from "../base/ERC1155/base/LibERC1155.sol";

import { IERC1155 } from "../base/ERC1155/IERC1155.sol";
import { IERC1155Receiver } from "../base/ERC1155/IERC1155Receiver.sol";
import { CallProtection } from "../base/Shared/ProtectedCall.sol";

contract ArexaPfmTokenReceiverFacet is IERC1155Receiver, CallProtection {
	function onERC1155Received(
		address operator,
		address from,
		uint256 id,
		uint256 value,
		bytes calldata data
	) external override protectedCall returns (bytes4) {
		return LibERC1155.onERC1155Received(operator, from, id, value, data);
	}

	function onERC1155BatchReceived(
		address operator,
		address from,
		uint256[] calldata ids,
		uint256[] calldata values,
		bytes calldata data
	) external override protectedCall returns (bytes4) {
		return LibERC1155.onERC1155BatchReceived(operator, from, ids, values, data);
	}
}
