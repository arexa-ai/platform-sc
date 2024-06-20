// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import "./LibArexaPlatformStorage.sol";
import "../../utils/SafeERC20.sol";
import "../../base/Diamond/LibDiamond.sol";
import "../../base/ERC1155/base/LibERC1155.sol";

import "../LibArexaConst.sol";

import { IERC20Metadata } from "../../base/ERC20/metadata/IERC20Metadata.sol";

import "./LibArexaPlatformShared.sol";

library LibArexaPlatformT3 {
	function buyTraderToken(address _operator, address _account, uint128 _value, uint8 _valueType, uint16 _discountPercent) internal {
		//Tier3
		//AREXA_TOKEN
		//Price: 1.0 USDT/piece
		//Quantity: No limit to buy
		//_valueType: 0 is amount, 1 is quantity
		require(_valueType == 0 || _valueType == 1, "valueType can be 0 or 1 only!");

		require(_discountPercent <= 10000, "Discount percent cannot be more then 100,00%");

		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();

		uint256 decimal = 10 ** IERC20Metadata(address(arexa.payingERC20Token)).decimals();
		uint256 priceFactor = 10;
		uint256 price = decimal * priceFactor * 1;

		uint256 amount = 0;
		uint256 quantity = 0;
		if (_valueType == 1) {
			amount = ((_value * 10 * price) / priceFactor + 5) / 10; //add 5 and div 10: rounding to the nearest
			quantity = (amount * priceFactor) / price;
			require(amount > 0 && quantity > 0, "The input quantity is too small for paying token!");
		} else {
			quantity = (_value * priceFactor) / price;
			amount = (quantity * price) / priceFactor;
			require(amount > 0 && quantity > 0, "The input amount is too small for buying a token!");
		}

		amount = (((amount * (10000 - _discountPercent) * 10) / 10000) + 5) / 10;

		address contractAddress = LibDiamond.getDiamondAddress();

		if (amount > 0) {
			SafeERC20.safeTransferFrom(arexa.payingERC20Token, _account, contractAddress, amount);
		}

		//divide the amount to pool and arexa, fontos a sorrend, mielőtt megkapta a tokent és adminisztráltuk a PNL változást, előtte növeljük a pool értéket
		//azért mert így a deltaPNLben nem napja meg maga után járó részt.
		LibArexaPlatformShared._divideAmountPoolAndArexa(LibArexaConst.TRADER_TOKEN_ID, amount);

		LibERC1155.mint(_operator, _account, LibArexaConst.TRADER_TOKEN_ID, quantity, "");
	}
}
