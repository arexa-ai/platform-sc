// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { IERC20Extended } from "./IERC20Extended.sol";

import { ERC20Base } from "../base/ERC20Base.sol";
import { LibERC20Base } from "../base/LibERC20Base.sol";

/**
 * @title ERC20 safe approval extensions
 * @dev mitigations for transaction-ordering vulnerability (see https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)
 */
abstract contract ERC20Extended is IERC20Extended, ERC20Base {
	/**
	 * @notice increase spend amount granted to spender
	 * @param spender address whose allowance to increase
	 * @param amount quantity by which to increase allowance
	 * @return success status (always true; otherwise function will revert)
	 */
	function increaseAllowance(address spender, uint256 amount) external returns (bool) {
		return _increaseAllowance(spender, amount);
	}

	function _increaseAllowance(address spender, uint256 amount) internal virtual returns (bool) {
		uint256 allowance = LibERC20Base._allowance(msg.sender, spender);

		unchecked {
			if (allowance > allowance + amount) revert ERC20Extended__ExcessiveAllowance();

			return LibERC20Base._approve(msg.sender, spender, allowance + amount);
		}
	}

	/**
	 * @notice decrease spend amount granted to spender
	 * @param spender address whose allowance to decrease
	 * @param amount quantity by which to decrease allowance
	 * @return success status (always true; otherwise function will revert)
	 */
	function decreaseAllowance(address spender, uint256 amount) external virtual returns (bool) {
		return _decreaseAllowance(msg.sender, spender, amount);
	}

	function _decreaseAllowance(address holder, address spender, uint256 amount) internal virtual returns (bool) {
		LibERC20Base._decreaseAllowance(holder, spender, amount);
		return true;
	}
}
