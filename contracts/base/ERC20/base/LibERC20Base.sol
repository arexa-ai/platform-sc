// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { LibERC20BaseStorage, ERC20BaseStorage } from "./LibERC20Storage.sol";

library LibERC20Base {
	//Come from IERC20
	event Transfer(address indexed from, address indexed to, uint256 value);
	event Approval(address indexed owner, address indexed spender, uint256 value);

	//Come from IERC20Base
	// error ERC20Base__ApproveFromZeroAddress();
	// error ERC20Base__ApproveToZeroAddress();
	// error ERC20Base__BurnExceedsBalance();
	// error ERC20Base__BurnFromZeroAddress();
	// error ERC20Base__InsufficientAllowance();
	// error ERC20Base__MintToZeroAddress();
	// error ERC20Base__TransferExceedsBalance();
	// error ERC20Base__TransferFromZeroAddress();
	// error ERC20Base__TransferToZeroAddress();

	//
	/**
	 * @notice query the total minted token supply
	 * @return token supply
	 */
	function _totalSupply() internal view returns (uint256) {
		return LibERC20BaseStorage.layout().totalSupply;
	}

	/**
	 * @notice query the token balance of given account
	 * @param account address to query
	 * @return balanceOf_ token balance
	 */
	function _balanceOf(address account) internal view returns (uint256 balanceOf_) {
		return LibERC20BaseStorage.layout().balances[account];
	}

	/**
	 * @notice query the allowance granted from given holder to given spender
	 * @param holder approver of allowance
	 * @param spender recipient of allowance
	 * @return allowance_ token allowance
	 */
	function _allowance(address holder, address spender) internal view returns (uint256 allowance_) {
		return LibERC20BaseStorage.layout().allowances[holder][spender];
	}

	/**
	 * @notice enable spender to spend tokens on behalf of holder
	 * @param holder address on whose behalf tokens may be spent
	 * @param spender recipient of allowance
	 * @param amount quantity of tokens approved for spending
	 * @return status_ success status (always true; otherwise function should revert)
	 */
	function _approve(address holder, address spender, uint256 amount) internal returns (bool status_) {
		require(holder != address(0), "ApproveFromZeroAddress");
		require(spender != address(0), "ApproveToZeroAddress");

		LibERC20BaseStorage.layout().allowances[holder][spender] = amount;

		emit Approval(holder, spender, amount);

		return true;
	}

	/**
	 * @notice decrease spend amount granted by holder to spender
	 * @param holder address on whose behalf tokens may be spent
	 * @param spender address whose allowance to decrease
	 * @param amount quantity by which to decrease allowance
	 */
	function _decreaseAllowance(address holder, address spender, uint256 amount) internal {
		uint256 allowance = _allowance(holder, spender);

		require(amount <= allowance, "InsufficientAllowance");

		unchecked {
			_approve(holder, spender, allowance - amount);
		}
	}

	/**
	 * @notice mint tokens for given account
	 * @param account recipient of minted tokens
	 * @param amount quantity of tokens minted
	 */
	function _mint(address account, uint256 amount) internal {
		//WARNING always check this before calling _mint:
		//if (account == address(0)) revert ERC20Base__MintToZeroAddress();

		ERC20BaseStorage storage e20s = LibERC20BaseStorage.layout();
		e20s.totalSupply += amount;
		e20s.balances[account] += amount;

		emit Transfer(address(0), account, amount);
	}

	/**
	 * @notice burn tokens held by given account
	 * @param account holder of burned tokens
	 * @param amount quantity of tokens burned
	 */
	function _burn(address account, uint256 amount) internal {
		//WARNING always check this before calling _burn:
		//if (account == address(0)) revert ERC20Base__BurnFromZeroAddress();

		ERC20BaseStorage storage e20s = LibERC20BaseStorage.layout();

		uint256 balance = e20s.balances[account];
		require(amount <= balance, "BurnExceedsBalance");
		unchecked {
			e20s.balances[account] = balance - amount;
		}
		e20s.totalSupply -= amount;

		emit Transfer(account, address(0), amount);
	}

	/**
	 * @notice transfer tokens from holder to recipient
	 * @param holder owner of tokens to be transferred
	 * @param recipient beneficiary of transfer
	 * @param amount quantity of tokens transferred
	 * @return status_ success status (always true; otherwise function should revert)
	 */
	function _transfer(address holder, address recipient, uint256 amount) internal returns (bool status_) {
		ERC20BaseStorage storage e20s = LibERC20BaseStorage.layout();

		uint256 holderBalance = e20s.balances[holder];
		require(amount <= holderBalance, "TransferExceedsBalance");
		unchecked {
			e20s.balances[holder] = holderBalance - amount;
		}
		e20s.balances[recipient] += amount;

		emit Transfer(holder, recipient, amount);

		return true;
	}
}
