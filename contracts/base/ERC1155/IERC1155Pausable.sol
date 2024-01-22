// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

interface IERC1155Pausable {
	/**
	 * @notice Emitted when the pause is triggered by account.
	 */
	event AllTokenPaused(address indexed account);

	/**
	 * @notice Emitted when the pause is lifted by account.
	 */
	event AllTokenUnpaused(address indexed account);

	/**
	 * @notice Emitted when the pause of token is triggered by account.
	 */
	event TokenPaused(address indexed account, uint256 indexed tokenId);

	/**
	 * @notice Emitted when the pause of token is lifted by account.
	 */
	event TokenUnpaused(address indexed account, uint256 indexed tokenId);

	function pauseAllToken() external;

	function unpauseAllToken() external;

	function pauseToken(uint256 tokenId) external;

	function unpauseToken(uint256 tokenId) external;
}
