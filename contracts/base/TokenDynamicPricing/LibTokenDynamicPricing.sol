// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import "./LibTokenDynamicPricingStorage.sol";

import "../../utils/Math.sol";

library LibTokenDynamicPricing {
	function initialize(uint256 _tokenId, uint256 _initialQuantity, uint256 _min, uint256 _max) internal {
		TokenDynamicPricingStorage storage dynamicPricing = LibTokenDynamicPricingStorage.layout();
		DynamicPricing storage pricing = dynamicPricing.tokenDynamicPricing[_tokenId];

		pricing.isEnabled = true;
		pricing.quantity = _initialQuantity;
		pricing.k = (_min == 0) ? _initialQuantity * _initialQuantity : _initialQuantity * _initialQuantity * _min;
		pricing.min = _min; //must contain the decimals of the paying token!!!
		pricing.max = (_max == 0 || _max < _min) ? pricing.k : _max; //must contain the decimals of the paying token!!!
	}

	function _calcTotalValue(DynamicPricing storage pricing, uint256 _quantity) internal view returns (uint256) {
		require(pricing.isEnabled, "Calculation is not enabled for the token!");
		require(_quantity <= pricing.quantity, "Not enought quantity left!");
		uint256 totalValue = (((10 * _quantity * pricing.k) / (pricing.quantity * (pricing.quantity - _quantity + 1))) + 5) / 10;
		return Math.min(_quantity * pricing.max, Math.max(_quantity * pricing.min, totalValue));
	}

	function calcTotalValue(uint256 _tokenId, uint256 _quantity) internal view returns (uint256) {
		TokenDynamicPricingStorage storage dynamicPricing = LibTokenDynamicPricingStorage.layout();
		DynamicPricing storage pricing = dynamicPricing.tokenDynamicPricing[_tokenId];
		return _calcTotalValue(pricing, _quantity);
	}

	function buyQuantity(uint256 _tokenId, uint256 _quantity) internal returns (uint256) {
		TokenDynamicPricingStorage storage dynamicPricing = LibTokenDynamicPricingStorage.layout();
		DynamicPricing storage pricing = dynamicPricing.tokenDynamicPricing[_tokenId];
		uint256 totalValue = _calcTotalValue(pricing, _quantity);

		pricing.quantity = pricing.quantity - _quantity;
		pricing.totalValue = pricing.totalValue + totalValue;

		if (pricing.quantity == 0) {
			pricing.isEnabled = false;
		}

		return totalValue;
	}

	function getEnabled(uint256 _tokenId) internal view returns (bool) {
		//
		TokenDynamicPricingStorage storage dynamicPricing = LibTokenDynamicPricingStorage.layout();
		DynamicPricing storage pricing = dynamicPricing.tokenDynamicPricing[_tokenId];
		return pricing.isEnabled;
	}

	function setPricingEnabled(uint256 _tokenId, bool _enabledValue) internal {
		TokenDynamicPricingStorage storage dynamicPricing = LibTokenDynamicPricingStorage.layout();
		DynamicPricing storage pricing = dynamicPricing.tokenDynamicPricing[_tokenId];
		require(
			!_enabledValue || (_enabledValue && pricing.quantity > 0),
			"Reenable of token pricing is only availabe is there is som token left to sell!"
		);
		pricing.isEnabled = _enabledValue;
	}
}
