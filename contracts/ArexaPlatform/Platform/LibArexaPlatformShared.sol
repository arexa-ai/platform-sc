// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

import "./LibArexaPlatformStorage.sol";
import "../../base/TokenPNL/LibTokenPNL.sol";

import "../LibArexaConst.sol";

library LibArexaPlatformShared {
	uint8 public constant AMOUNT_VALUE_TYPE = 0;
	uint8 public constant QUANTITY_VALUE_TYPE = 1;

	function getPayingToken() internal view returns (IERC20) {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		return arexa.payingERC20Token;
	}

	function getArexaERC20Token() internal view returns (IERC20) {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		return arexa.arexaERC20Token;
	}

	function getArexaTokenPool(uint8 _tokenPool) internal view returns (uint256 total_, uint256 sold_) {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		total_ = arexa.arexaTokenPool[_tokenPool].total;
		sold_ = arexa.arexaTokenPool[_tokenPool].sold;
	}

	function getArexaIncomeParameter(uint256 _tokenId) internal view returns (uint32 pool_, uint32 arexa_) {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		pool_ = arexa.arexaIncomeParameter[_tokenId].pool;
		arexa_ = arexa.arexaIncomeParameter[_tokenId].arexa;
	}

	function _divideAmountPoolAndArexa(uint256 _tokenId, uint256 _value) internal {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();

		uint256 poolAmount = (_value * arexa.arexaIncomeParameter[_tokenId].pool) /
			(arexa.arexaIncomeParameter[_tokenId].pool + arexa.arexaIncomeParameter[_tokenId].arexa);
		uint256 arexaAmount = _value - poolAmount;

		LibTokenPNL.changeTotalValue(address(arexa.payingERC20Token), LibArexaConst.AREXA_TOKEN_ID, int256(poolAmount));
		arexa.poolBalance += poolAmount;
		arexa.arexaBalance += arexaAmount;
	}
}
