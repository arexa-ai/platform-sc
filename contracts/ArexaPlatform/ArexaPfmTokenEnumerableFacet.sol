// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { LibERC1155 } from "../base/ERC1155/base/LibERC1155.sol";
import { IERC1155Enumerable } from "../base/ERC1155/IERC1155Enumerable.sol";
import { CallProtection } from "../base/Shared/ProtectedCall.sol";

contract ArexaPfmTokenEnumerableFacet is IERC1155Enumerable, CallProtection {
	function totalSupply(uint256 id) external view override protectedCall returns (uint256) {
		return LibERC1155.totalSupply(id);
	}

	function totalHolders(uint256 id) external view override protectedCall returns (uint256) {
		return LibERC1155.totalHolders(id);
	}

	function accountsByToken(uint256 id) external view override protectedCall returns (address[] memory) {
		return LibERC1155.accountsByToken(id);
	}

	function tokensByAccount(address account) external view override protectedCall returns (uint256[] memory) {
		return LibERC1155.tokensByAccount(account);
	}
}
