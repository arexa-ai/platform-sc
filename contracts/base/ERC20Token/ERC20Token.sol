// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { IERC20 } from "../ERC20/IERC20.sol";
import { ERC20Base } from "../ERC20/base/ERC20Base.sol";
import { ERC20Extended } from "../ERC20/extended/ERC20Extended.sol";
import { ERC20Metadata } from "../ERC20/metadata/ERC20Metadata.sol";

import { LibAccessControl } from "../AccessControl/LibAccessControl.sol";
import { LibBlackWhiteList } from "../BlackWhiteList/LibBlackWhiteList.sol";
import { LibTargetedPausable } from "../TargetedPausable/LibTargetedPausable.sol";

import { LibTokenConst } from "./LibTokenConst.sol";
import { LibCustomERC20Extension } from "./LibCustomERC20Extension.sol";

import { SafeMath } from "../../utils/SafeMath.sol";

import { ModifierRole } from "../AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../TargetedPausable/ModifierPausable.sol";

/**
 * @title uSmart's ERC20 implementation, including recommended extensions and other usfull stuff
 */
//ERC20Permit
abstract contract uSmartERC20 is ERC20Base, ERC20Extended, ERC20Metadata, ModifierRole, ModifierPausable {
	using SafeMath for uint256;

	constructor() {}

	function _approve(
		address _holder,
		address _spender,
		uint256 _value
	) internal override whenNotPaused(LibTokenConst.FULL) returns (bool) {
		require((_value == 0) || (_allowance(msg.sender, _spender) == 0), "Approve: zero first");
		return super._approve(_holder, _spender, _value);
	}

	function _increaseAllowance(address _spender, uint256 _addedValue) internal override whenNotPaused(LibTokenConst.FULL) returns (bool) {
		return super._increaseAllowance(_spender, _addedValue);
	}

	function _decreaseAllowance(
		address _holder,
		address _spender,
		uint256 _subtractValue
	) internal override whenNotPaused(LibTokenConst.FULL) returns (bool) {
		return super._decreaseAllowance(_holder, _spender, _subtractValue);
	}

	function mint(address account, uint256 amount) external whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.TREASURY_ROLE) {
		_mint(account, amount);
	}

	function burn(uint256 amount) external whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.TREASURY_ROLE) {
		_burn(msg.sender, amount);
	}

	function burnFrom(address account, uint256 amount) external whenNotPaused(LibTokenConst.FULL) onlyRole(LibTokenConst.TREASURY_ROLE) {
		_burn(account, amount);
	}

	//function _setName(string memory name) internal virtual override(ERC20Metadata, ERC20PermitInternal) {
	function _setName(string memory name) internal virtual override {
		super._setName(name);
	}

	/**
	 * Transfer token between accounts, based on BNOX TOS.
	 * - poolFee% of the transferred amount is going to poolAddress
	 * - generalFee% of the transferred amount is going to amountGeneral
	 *
	 * @param _sender The address from where the token sent
	 * @param _recipient Recipient address
	 * @param _amount The amount to be transferred
	 */
	function _transfer(address _sender, address _recipient, uint256 _amount) internal override returns (bool) {
		if (
			(LibBlackWhiteList._getAccountBlackWhiteList(LibTokenConst.SENDER_FREE_FEE_WL, _sender)) ||
			(LibBlackWhiteList._getAccountBlackWhiteList(LibTokenConst.RECIPIENT_FREE_FEE_WL, _recipient))
		) {
			return super._transfer(_sender, _recipient, _amount);
		} else {
			/**
			 * Three decimal in percent.
			 * The decimal correction is 100.000, but to avoid rounding errors, first divide by 10.000
			 * and after that the calculation must add 5 and divide 10 at the end.
			 */
			uint256 decimalCorrection = 10000;
			uint256 generalFeePercent256 = LibCustomERC20Extension._getGeneralFee();
			uint256 bsoFeePercent256 = LibCustomERC20Extension._getPoolFee();
			uint256 totalFeePercent = generalFeePercent256.add(bsoFeePercent256);

			uint256 totalFeeAmount = _amount.mul(totalFeePercent).div(decimalCorrection).add(5).div(10);
			uint256 amountBso = _amount.mul(bsoFeePercent256).div(decimalCorrection).add(5).div(10);
			uint256 amountGeneral = totalFeeAmount.sub(amountBso);

			uint256 recipientTransferAmount = _amount.sub(totalFeeAmount);

			bool result = super._transfer(_sender, _recipient, recipientTransferAmount);
			require(result, "Transfer error");

			if (amountGeneral > 0) {
				result = super._transfer(_sender, LibCustomERC20Extension._getGeneralFeeAddress(), amountGeneral);
				require(result, "General fee transfer error");
			}

			if (amountBso > 0) {
				result = super._transfer(_sender, LibCustomERC20Extension._getPoolFeeAddress(), amountBso);
				require(result, "Pool fee transfer error");
			}
		}
		return true;
	}

	function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override whenNotPaused(LibTokenConst.FULL) {
		require(!LibBlackWhiteList._getAccountBlackWhiteList(LibTokenConst.SENDER_BL, from), "Blacklist: sender");
		require(!LibBlackWhiteList._getAccountBlackWhiteList(LibTokenConst.RECIPIENT_BL, to), "Blacklist: recipient");
		super._beforeTokenTransfer(from, to, amount);
	}
}
