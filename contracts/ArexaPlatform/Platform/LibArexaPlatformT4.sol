// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import "./LibArexaPlatformStorage.sol";
import "./LibArexaPlatformShared.sol";

import "../LibArexaConst.sol";

import "../../utils/SafeERC20.sol";
import "../../base/Diamond/LibDiamond.sol";
import "../../base/ERC1155/base/LibERC1155.sol";

import { IERC20Metadata } from "../../base/ERC20/metadata/IERC20Metadata.sol";

library LibArexaPlatformT4 {
	function buyArexaToken(address _account, uint128 _value, uint8 _valueType, uint16 _discountPercent) internal {
		//Tier4
		//AREXA_TOKEN
		//Price: 0.1 USDT/piece
		//Quantity: No limit to buy
		//_valueType: 0 is amount, 1 is quantity

		require(_valueType == 0 || _valueType == 1, "valueType can be 0 or 1 only!");

		require(_discountPercent <= 10000, "Discount percent cannot be more then 100,00%");

		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();

		uint256 decimal = 10 ** IERC20Metadata(address(arexa.payingERC20Token)).decimals();
		uint256 priceFactor = 10;
		uint256 price = ((decimal * priceFactor) * 1) / 10;

		uint256 amount = 0;
		uint256 quantity = 0;
		if (_valueType == 1) {
			amount = ((_value * 10 * price) / priceFactor + 5) / 10; //add 5 and div 10: rounding to the nearest
			quantity = (amount * priceFactor) / price;
			require(amount > 0 && quantity > 0, "The input quantity is too small for paying token");
		} else {
			quantity = (_value * priceFactor) / price;
			amount = (quantity * price) / priceFactor;
			require(amount > 0 && quantity > 0, "The input amount is too small for buying a token");
		}

		amount = (((amount * (10000 - _discountPercent) * 10) / 10000) + 5) / 10;

		ArexaTokenPool storage tokenPool = arexa.arexaTokenPool[LibArexaConst.AREXA_TOKEN_POOL_INVESTOR];
		require(tokenPool.sold + quantity <= tokenPool.total, "Not enough token to sell");
		tokenPool.sold = tokenPool.sold + quantity;

		address contractAddress = LibDiamond.getDiamondAddress();

		if (amount > 0) {
			SafeERC20.safeTransferFrom(arexa.payingERC20Token, _account, contractAddress, amount);
		}

		//divide the amount to pool and arexa, fontos a sorrend, mielőtt megkapta a tokent és adminisztráltuk a PNL változást, előtte növeljük a pool értéket
		//azért mert így a deltaPNLben nem napja meg maga után járó részt.
		LibArexaPlatformShared._divideAmountPoolAndArexa(LibArexaConst.AREXA_TOKEN_ID, amount);

		LibERC1155.safeTransfer(contractAddress, contractAddress, _account, LibArexaConst.AREXA_TOKEN_ID, quantity, "");
		arexa.stakedArexaERC20TokenQuantity = arexa.stakedArexaERC20TokenQuantity + quantity;
	}

	function payByArexaToken(uint8 _poolType, address _account, uint32 _quantity) internal {
		//Tier4
		//AREXA_TOKEN GIFT
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();

		ArexaTokenPool storage tokenPool = arexa.arexaTokenPool[_poolType];
		require(tokenPool.sold + _quantity <= tokenPool.total, "Not enoguh token to gift");
		tokenPool.sold = tokenPool.sold + _quantity;

		address contractAddress = LibDiamond.getDiamondAddress();

		LibERC1155.safeTransfer(contractAddress, contractAddress, _account, LibArexaConst.AREXA_TOKEN_ID, _quantity, "");
		arexa.stakedArexaERC20TokenQuantity = arexa.stakedArexaERC20TokenQuantity + _quantity;
	}
}
