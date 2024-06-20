// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import "./LibArexaPlatformStorage.sol";
import "../../utils/SafeERC20.sol";
import "../../base/Diamond/LibDiamond.sol";
import "../../base/ERC1155/base/LibERC1155.sol";
import "../../base/TokenDynamicPricing/LibTokenDynamicPricing.sol";

import "../LibArexaConst.sol";

import "./LibArexaPlatformShared.sol";

library LibArexaPlatformSubscriptions {
	//
	function createSubscriptions(
		address _operator,
		uint256 _tokenType,
		uint16 _year,
		uint8 _month,
		uint256 _quantity,
		uint256 _min,
		uint256 _max
	) internal returns (uint256 tokenId) {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		//100 000 000 10**8
		// 20 240 000
		uint256 monthlyTokenType = _tokenType + uint256(_year) * 10 ** 4 + uint256(_month) * 10 ** 2;

		require(int256(arexa.lastSubscriptionTokenIds[_tokenType]) - int256(monthlyTokenType) < 99, "Can't create for old months");

		if (arexa.lastSubscriptionTokenIds[_tokenType] < monthlyTokenType) {
			arexa.lastSubscriptionTokenIds[_tokenType] = monthlyTokenType;
		}
		arexa.lastSubscriptionTokenIds[_tokenType]++;
		tokenId = arexa.lastSubscriptionTokenIds[_tokenType];
		LibTokenDynamicPricing.initialize(tokenId, _quantity, _min, _max);
		LibERC1155.mint(_operator, LibDiamond.getDiamondAddress(), tokenId, _quantity, "");
	}

	function getCurrentSubscriptionTokenId(uint256 _tokenType) internal view returns (uint256) {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		return arexa.lastSubscriptionTokenIds[_tokenType];
	}

	function calcSubscriptionPrice(uint256 _tokenId, uint32 _quantity) internal view returns (uint256) {
		return LibTokenDynamicPricing.calcTotalValue(_tokenId, _quantity);
	}

	function buySubscription(uint256 _tokenId, address _account, uint32 _quantity, uint16 _discountPercent) internal {
		//Tier1 or Tier2
		//AREXA_TOKEN
		//Price: X USDT/piece
		//Quantity: No limit to buy

		require(_discountPercent <= 10000, "Discount percent cannot be more then 100,00%");

		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();

		uint256 amount = LibTokenDynamicPricing.buyQuantity(_tokenId, _quantity);

		amount = (((amount * (10000 - _discountPercent) * 10) / 10000) + 5) / 10;

		address contractAddress = LibDiamond.getDiamondAddress();

		//Transfer "payingERC20Token" from "_account" account to "contractAddress" account
		if (amount > 0) {
			SafeERC20.safeTransferFrom(arexa.payingERC20Token, _account, contractAddress, amount);
		}

		//divide the amount to pool and arexa
		//SUBSCR1_TOKEN_TYPE OR SUBSCR2_TOKEN_TYPE lesz a vége
		uint256 tokenType = (_tokenId / 100000000) * 100000000;
		LibArexaPlatformShared._divideAmountPoolAndArexa(tokenType, amount);

		LibERC1155.safeTransfer(contractAddress, contractAddress, _account, _tokenId, _quantity, "");
	}
}
