// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { IERC20Metadata } from "./IERC20Metadata.sol";
import { LibERC20Metadata } from "./LibERC20Metadata.sol";

/**
 * @title ERC20 metadata extensions
 */
abstract contract ERC20Metadata is IERC20Metadata {
	/**
	 * @inheritdoc IERC20Metadata
	 */
	function name() external view returns (string memory) {
		return _name();
	}

	function _name() internal view virtual returns (string memory) {
		return LibERC20Metadata._name();
	}

	/**
	 * @inheritdoc IERC20Metadata
	 */
	function symbol() external view returns (string memory) {
		return _symbol();
	}

	function _symbol() internal view virtual returns (string memory) {
		return LibERC20Metadata._symbol();
	}

	/**
	 * @inheritdoc IERC20Metadata
	 */
	function decimals() external view returns (uint8) {
		return _decimals();
	}

	function _decimals() internal view returns (uint8) {
		return LibERC20Metadata._decimals();
	}

	function _setName(string memory __name) internal virtual {
		LibERC20Metadata._setName(__name);
	}

	function _setSymbol(string memory __symbol) internal virtual {
		LibERC20Metadata._setSymbol(__symbol);
	}

	function _setDecimals(uint8 __decimals) internal virtual {
		LibERC20Metadata._setDecimals(__decimals);
	}
}
