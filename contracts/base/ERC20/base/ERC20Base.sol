// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { IERC20 } from "../IERC20.sol";
import { LibERC20Base } from "./LibERC20Base.sol";

/**
 * @title Base ERC20 implementation, excluding optional extensions
 */
abstract contract ERC20Base is IERC20 {
	modifier onlyPayloadSize(uint size) {
		require(!(msg.data.length < size + 4));
		_;
	}

	/**
	 * @notice query the total minted token supply
	 * @return totalSupply_ token supply
	 */
	function totalSupply() external view returns (uint256 totalSupply_) {
		return LibERC20Base._totalSupply();
	}

	/**
	 * @notice query the token balance of given account
	 * @param account address to query
	 * @return balance_ token balance
	 */
	function balanceOf(address account) external view returns (uint256 balance_) {
		return LibERC20Base._balanceOf(account);
	}

	/**
	 * @notice query the allowance granted from given holder to given spender
	 * @param holder approver of allowance
	 * @param spender recipient of allowance
	 * @return allowance_ token allowance
	 */
	function allowance(address holder, address spender) external view returns (uint256 allowance_) {
		return _allowance(holder, spender);
	}

	function _allowance(address holder, address spender) internal view virtual returns (uint256 allowance_) {
		return LibERC20Base._allowance(holder, spender);
	}

	/**
	 * @notice enable spender to spend tokens on behalf of holder
	 * @param spender recipient of allowance
	 * @param amount quantity of tokens approved for spending
	 * @return status_ success status (always true; otherwise function should revert)
	 */
	function approve(address spender, uint256 amount) external virtual onlyPayloadSize(2 * 32) returns (bool status_) {
		return _approve(msg.sender, spender, amount);
	}

	function _approve(address holder, address spender, uint256 amount) internal virtual returns (bool status_) {
		return LibERC20Base._approve(holder, spender, amount);
	}

	/**
	 * @notice transfer tokens from holder to recipient
	 * @param recipient beneficiary of transfer
	 * @param amount quantity of tokens transferred
	 * @return status_ success status (always true; otherwise function should revert)
	 */
	function transfer(address recipient, uint256 amount) external onlyPayloadSize(2 * 32) returns (bool status_) {
		return _transfer(msg.sender, recipient, amount);
	}

	/**
	 * @notice transfer tokens to given recipient on behalf of given holder
	 * @param holder holder of tokens prior to transfer
	 * @param recipient beneficiary of token transfer
	 * @param amount quantity of tokens to transfer
	 * @return status_ success status (always true; otherwise function should revert)
	 */
	function transferFrom(address holder, address recipient, uint256 amount) external onlyPayloadSize(3 * 32) returns (bool status_) {
		return _transferFrom(holder, recipient, amount);
	}

	/**
	 * @notice mint tokens for given account
	 * @param account recipient of minted tokens
	 * @param amount quantity of tokens minted
	 */
	function _mint(address account, uint256 amount) internal virtual {
		require(account != address(0), "MintToZeroAddress");

		_beforeTokenTransfer(address(0), account, amount);
		LibERC20Base._mint(account, amount);
	}

	/**
	 * @notice burn tokens held by given account
	 * @param account holder of burned tokens
	 * @param amount quantity of tokens burned
	 */
	function _burn(address account, uint256 amount) internal virtual {
		require(account != address(0), "BurnFromZeroAddress");

		_beforeTokenTransfer(account, address(0), amount);

		LibERC20Base._burn(account, amount);
	}

	/**
	 * @notice transfer tokens from holder to recipient
	 * @param holder owner of tokens to be transferred
	 * @param recipient beneficiary of transfer
	 * @param amount quantity of tokens transferred
	 * @return status_ success status (always true; otherwise function should revert)
	 */
	function _transfer(address holder, address recipient, uint256 amount) internal virtual returns (bool status_) {
		require(holder != address(0), "TransferFromZeroAddress");
		require(recipient != address(0), "TransferToZeroAddress");

		_beforeTokenTransfer(holder, recipient, amount);

		return LibERC20Base._transfer(holder, recipient, amount);
	}

	/**
	 * @notice transfer tokens to given recipient on behalf of given holder
	 * @param holder holder of tokens prior to transfer
	 * @param recipient beneficiary of token transfer
	 * @param amount quantity of tokens to transfer
	 * @return success status (always true; otherwise function should revert)
	 */
	function _transferFrom(address holder, address recipient, uint256 amount) internal virtual returns (bool) {
		LibERC20Base._decreaseAllowance(holder, msg.sender, amount);

		_transfer(holder, recipient, amount);

		return true;
	}

	/**
	 * @notice ERC20 hook, called before all transfers including mint and burn
	 * @dev function should be overridden and new implementation must call super
	 * @param from sender of tokens
	 * @param to receiver of tokens
	 * @param amount quantity of tokens transferred
	 */
	function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual {}
}
