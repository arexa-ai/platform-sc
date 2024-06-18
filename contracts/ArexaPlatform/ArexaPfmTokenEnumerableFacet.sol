// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { LibERC1155 } from "../base/ERC1155/base/LibERC1155.sol";
import { IERC1155Enumerable } from "../base/ERC1155/IERC1155Enumerable.sol";

contract ArexaPfmTokenEnumerableFacet is IERC1155Enumerable {
	function totalSupply(uint256 _id) external view override returns (uint256) {
		return LibERC1155.totalSupply(_id);
	}

	function totalHolders(uint256 _id) external view override returns (uint256) {
		return LibERC1155.totalHolders(_id);
	}

	function accountsByToken(uint256 _id) external view override returns (address[] memory) {
		return LibERC1155.accountsByToken(_id);
	}

	function tokensByAccount(address _account) external view override returns (uint256[] memory) {
		return LibERC1155.tokensByAccount(_account);
	}
}
