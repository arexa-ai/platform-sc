// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

interface IERC1155Enumerable {
	/**
	 * @notice query total minted supply of given token
	 * @param _id token id to query
	 * @return token supply
	 */
	function totalSupply(uint256 _id) external view returns (uint256);

	/**
	 * @notice query total number of holders for given token
	 * @param _id token id to query
	 * @return quantity of holders
	 */
	function totalHolders(uint256 _id) external view returns (uint256);

	/**
	 * @notice query holders of given token
	 * @param _id token id to query
	 * @return list of holder addresses
	 */
	function accountsByToken(uint256 _id) external view returns (address[] memory);

	/**
	 * @notice query tokens held by given address
	 * @param _account address to query
	 * @return list of token ids
	 */
	function tokensByAccount(address _account) external view returns (uint256[] memory);
}
