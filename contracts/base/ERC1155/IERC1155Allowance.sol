// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

interface IERC1155Allowance {
	event Approval(address indexed owner, address indexed operator, uint256 indexed id, uint256 currenctValue, uint256 newValue);

	/**
	 * @notice Allow other accounts/contracts to spend tokens on behalf of msg.sender
	 * @dev MUST emit Approval event on success.
	 * To minimize the risk of the approve/transferFrom attack vector (see https://docs.google.com/document/d/1YLPtQxZu1UAvO9cZ1O2RPXBbT0mooh4DYKjA_jp-RLM/), this function will throw if the current approved allowance does not equal the expected _currentValue, unless _value is 0.
	 * @param _operator Address to approve, _operator will ba able to send token
	 * @param _id ID of the Token
	 * @param _currentValue Expected current value of approved allowance.
	 * @param _newValue Allowance amount
	 */
	function approve(address _operator, uint256 _id, uint256 _currentValue, uint256 _newValue) external;

	/**
	 * @notice Queries the spending limit approved for an account
	 * @param _owner The owner allowing the spending
	 * @param _operator The address allowed to spend.
	 * @param _id ID of the Token
	 * @return The operator's allowed spending balance of the Token requested
	 */
	function allowance(address _owner, address _operator, uint256 _id) external view returns (uint256);
}
