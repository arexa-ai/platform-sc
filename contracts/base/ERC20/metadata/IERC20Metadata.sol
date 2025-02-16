// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

/**
 * @title ERC20 metadata interface
 */
interface IERC20Metadata {
	/**
	 * @notice return token name
	 * @return token name
	 */
	function name() external view returns (string memory);

	/**
	 * @notice return token symbol
	 * @return token symbol
	 */
	function symbol() external view returns (string memory);

	/**
	 * @notice return token decimals, generally used only for display purposes
	 * @return token decimals
	 */
	function decimals() external view returns (uint8);
}
