// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

interface IBridgeableToken {
	function mint(address to, uint256 amount) external;

	function burnFrom(address from, uint256 amount) external;
}
