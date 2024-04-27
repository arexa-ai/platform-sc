// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

import "./LibArexaPlatformStorage.sol";
import "./LibArexaPlatformShared.sol";
import "../../utils/SafeERC20.sol";
import "../../base/Diamond/LibDiamond.sol";
import "../../base/ERC1155/base/LibERC1155.sol";
import "../../base/TokenRestriction/LibTokenRestriction.sol";
import "../../base/TokenPNL/LibTokenPNL.sol";
import "../../base/TokenDynamicPricing/LibTokenDynamicPricing.sol";

import "../LibArexaConst.sol";

import { IERC20 } from "../../base/ERC20/IERC20.sol";
import { IERC20Metadata } from "../../base/ERC20/metadata/IERC20Metadata.sol";
import "../../base/BridgeCentralized/IBridgeableToken.sol";

library LibArexaPlatform {
	function _initArexaTokenPool(uint8 _tokenPool, address _operator, address _tokenOwner, uint256 _amount) internal {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		require(arexa.arexaTokenPool[_tokenPool].total == 0, "Arexa token pool is already initialized with the give type!");
		arexa.arexaTokenPool[_tokenPool].total = _amount;
		LibERC1155.mint(_operator, _tokenOwner, LibArexaConst.AREXA_TOKEN_ID, _amount, "");
	}

	function initialize(address _operator, IERC20 payingToken, IERC20 arexaERC20Token, uint64 restrictionTimeDelta) internal {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		address contractAddress = LibDiamond.getDiamondAddress();

		arexa.payingERC20Token = payingToken;
		arexa.arexaERC20Token = arexaERC20Token;

		/*
		 * Tier I: LibArexaConst.SUBSCR_TOKEN_TYPE_1
		 */
		setArexaIncomeParameter(LibArexaConst.SUBSCR1_TOKEN_TYPE, 90, 10);

		/*
		 * Tier II: LibArexaConst.SUBSCR_TOKEN_TYPE_2
		 */
		setArexaIncomeParameter(LibArexaConst.SUBSCR2_TOKEN_TYPE, 95, 5);

		/*
		 * Tier III: LibArexaConst.TRADER_TOKEN_ID
		 */
		setArexaIncomeParameter(LibArexaConst.TRADER_TOKEN_ID, 995, 5);

		/*
		 * Tier IV: LibArexaConst.AREXA_TOKEN_ID
		 */
		setArexaIncomeParameter(LibArexaConst.AREXA_TOKEN_ID, 90, 10);

		//Engedélyezzük a tokenre a PNL számolást, így inicializálódik teljes darabszám is a PNLnél.
		LibTokenPNL.initTokenPNL(address(payingToken), LibArexaConst.AREXA_TOKEN_ID);

		//Ez által olyan mintha már nem kéne restriction-t kezelni, és a teljes összeg megy a kifizethetőbe
		LibTokenRestriction.initTokenRestriction(LibArexaConst.AREXA_TOKEN_ID, block.number, block.number + 1, restrictionTimeDelta);

		//kibocsájtjuk a poolba a tokeneket, de azonnal eladhatóak lesznek, a reserved tokeneket csak restriction élesítés után
		_initArexaTokenPool(LibArexaConst.AREXA_TOKEN_POOL_INVESTOR, _operator, contractAddress, 35000000);
		_initArexaTokenPool(LibArexaConst.AREXA_TOKEN_POOL_AREXAINC, _operator, contractAddress, 5000000);
		_initArexaTokenPool(LibArexaConst.AREXA_TOKEN_POOL_MARKETING, _operator, contractAddress, 5000000);
		_initArexaTokenPool(LibArexaConst.AREXA_TOKEN_POOL_DEVELOPMENT, _operator, contractAddress, 5000000);

		//Véglegesítjük a restriction paramétereket
		LibTokenRestriction.initTokenRestriction(
			LibArexaConst.AREXA_TOKEN_ID,
			block.number + 12 * restrictionTimeDelta + 1,
			block.number + 12 * restrictionTimeDelta + 1 + 12 * restrictionTimeDelta + 1,
			restrictionTimeDelta
		);

		//A reserved poolba most hozzuk létre, így a restriction érvényes lesz rá
		_initArexaTokenPool(LibArexaConst.AREXA_TOKEN_POOL_RESERVED, _operator, contractAddress, 50000000);

		/*
		 * Tier V: LibArexaConst.MAGIC_TOKEN_ID
		 */
		setArexaIncomeParameter(LibArexaConst.MAGIC_TOKEN_ID, 0, 100);
		LibERC1155.mint(_operator, contractAddress, LibArexaConst.MAGIC_TOKEN_ID, 100, "");
	}

	function setArexaIncomeParameter(uint256 _tokenId, uint32 _pool, uint32 _arexa) internal {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		arexa.arexaIncomeParameter[_tokenId].pool = _pool;
		arexa.arexaIncomeParameter[_tokenId].arexa = _arexa;
	}

	function setPayingToken(IERC20 _token) internal {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		arexa.payingERC20Token = _token;
	}
}
