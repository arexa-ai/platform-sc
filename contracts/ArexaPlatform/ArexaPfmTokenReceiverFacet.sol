// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { LibERC1155 } from "../base/ERC1155/base/LibERC1155.sol";

import { IERC1155 } from "../base/ERC1155/IERC1155.sol";
import { IERC1155Receiver } from "../base/ERC1155/IERC1155Receiver.sol";

contract ArexaPfmTokenReceiverFacet is IERC1155Receiver {
	function onERC1155Received(
		address _operator,
		address _from,
		uint256 _id,
		uint256 _value,
		bytes calldata _data
	) external override returns (bytes4) {
		return LibERC1155.onERC1155Received(_operator, _from, _id, _value, _data);
	}

	function onERC1155BatchReceived(
		address _operator,
		address _from,
		uint256[] calldata _ids,
		uint256[] calldata _values,
		bytes calldata _data
	) external override returns (bytes4) {
		return LibERC1155.onERC1155BatchReceived(_operator, _from, _ids, _values, _data);
	}
}
