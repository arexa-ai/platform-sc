// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { LibERC20MetadataStorage } from "./LibERC20MetadataStorage.sol";

/**
 * @title ERC20Metadata internal functions
 */
library LibERC20Metadata {
	/**
	 * @notice return token name
	 * @return token name
	 */
	function _name() internal view returns (string memory) {
		return LibERC20MetadataStorage.layout().name;
	}

	/**
	 * @notice return token symbol
	 * @return token symbol
	 */
	function _symbol() internal view returns (string memory) {
		return LibERC20MetadataStorage.layout().symbol;
	}

	/**
	 * @notice return token decimals, generally used only for display purposes
	 * @return token decimals
	 */
	function _decimals() internal view returns (uint8) {
		return LibERC20MetadataStorage.layout().decimals;
	}

	function _setName(string memory name) internal {
		LibERC20MetadataStorage.layout().name = name;
	}

	function _setSymbol(string memory symbol) internal {
		LibERC20MetadataStorage.layout().symbol = symbol;
	}

	function _setDecimals(uint8 decimals) internal {
		LibERC20MetadataStorage.layout().decimals = decimals;
	}
}
