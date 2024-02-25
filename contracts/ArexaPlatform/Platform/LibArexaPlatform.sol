// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import "hardhat/console.sol";

import "./LibArexaPlatformStorage.sol";
import "../../utils/Math.sol";

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
	uint8 public constant AMOUNT_VALUE_TYPE = 0;
	uint8 public constant QUANTITY_VALUE_TYPE = 1;

	function _initArexaTokenPool(uint8 _tokenType, address _operator, address _tokenOwner, uint256 _amount) internal {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		require(arexa.arexaTokenPool[_tokenType].total == 0, "Arexa token pool is already initialized with the give type!");
		arexa.arexaTokenPool[_tokenType].total = _amount;
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

	//TODO do the other functions...
	function getArexaTokenPool(uint8 _tokenType) internal view returns (ArexaTokenPool memory) {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		return arexa.arexaTokenPool[_tokenType];
	}

	function setArexaIncomeParameter(uint256 _tokenId, uint32 _pool, uint32 _arexa) internal {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		arexa.arexaIncomeParameter[_tokenId].pool = _pool;
		arexa.arexaIncomeParameter[_tokenId].arexa = _arexa;
	}

	function getArexaIncomeParameter(uint256 _tokenId) internal view returns (uint32 pool_, uint32 arexa_) {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		pool_ = arexa.arexaIncomeParameter[_tokenId].pool;
		arexa_ = arexa.arexaIncomeParameter[_tokenId].arexa;
	}

	function getPayingToken() internal view returns (IERC20) {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		return arexa.payingERC20Token;
	}

	function setPayingToken(IERC20 _token) internal {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		arexa.payingERC20Token = _token;
	}

	function getArexaERC20Token() internal view returns (IERC20) {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		return arexa.arexaERC20Token;
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

	function buySubscription(uint256 _tokenId, address _account, uint32 _quantity) internal {
		//Tier3
		//AREXA_TOKEN
		//Price: d USDT/piece
		//Quantity: No limit to buy
		//_valueType: 0 is amount, 1 is quantity
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();

		uint256 amount = LibTokenDynamicPricing.buyQuantity(_tokenId, _quantity);

		address contractAddress = LibDiamond.getDiamondAddress();

		arexa.payingERC20Token.transferFrom(_account, contractAddress, amount);
		// bool result = arexa.payingERC20Token.transferFrom(_account, contractAddress, amount);
		// require(result, "Something wrong with the payment!");

		//divide the amount to pool and arexa
		//SUBSCR1_TOKEN_TYPE OR SUBSCR2_TOKEN_TYPE lesz a vége
		uint256 tokenType = (_tokenId / 100000000) * 100000000;
		_divideAmountPoolAndArexa(tokenType, amount);

		LibERC1155.safeTransfer(contractAddress, contractAddress, _account, _tokenId, _quantity, "");
	}

	function buyTraderToken(address _operator, address _account, uint128 _value, uint8 _valueType) internal {
		//Tier3
		//AREXA_TOKEN
		//Price: 1.0 USDT/piece
		//Quantity: No limit to buy
		//_valueType: 0 is amount, 1 is quantity
		require(_valueType == 0 || _valueType == 1, "valueType can be 0 or 1 only!");

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

		address contractAddress = LibDiamond.getDiamondAddress();

		arexa.payingERC20Token.transferFrom(_account, contractAddress, amount);
		// bool result = arexa.payingERC20Token.transferFrom(_account, contractAddress, amount);
		// require(result, "Something wrong with the payment!");

		//divide the amount to pool and arexa, fontos a sorrend, mielőtt megkapta a tokent és adminisztráltuk a PNL változást, előtte növeljük a pool értéket
		//azért mert így a deltaPNLben nem napja meg maga után járó részt.
		_divideAmountPoolAndArexa(LibArexaConst.TRADER_TOKEN_ID, amount);

		LibERC1155.mint(_operator, _account, LibArexaConst.TRADER_TOKEN_ID, quantity, "");
	}

	function buyArexaToken(address _account, uint128 _value, uint8 _valueType) internal {
		//Tier4
		//AREXA_TOKEN
		//Price: 0.1 USDT/piece
		//Quantity: No limit to buy
		//_valueType: 0 is amount, 1 is quantity

		require(_valueType == 0 || _valueType == 1, "valueType can be 0 or 1 only!");

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

		ArexaTokenPool storage tokenPool = arexa.arexaTokenPool[LibArexaConst.AREXA_TOKEN_POOL_INVESTOR];
		require(tokenPool.sold + quantity <= tokenPool.total, "Not enough token to sell");
		tokenPool.sold = tokenPool.sold + quantity;

		address contractAddress = LibDiamond.getDiamondAddress();

		arexa.payingERC20Token.transferFrom(_account, contractAddress, amount);
		// bool result = arexa.payingERC20Token.transferFrom(_account, contractAddress, amount);
		// require(result, "Something wrong with the payment!");

		//divide the amount to pool and arexa, fontos a sorrend, mielőtt megkapta a tokent és adminisztráltuk a PNL változást, előtte növeljük a pool értéket
		//azért mert így a deltaPNLben nem napja meg maga után járó részt.
		_divideAmountPoolAndArexa(LibArexaConst.AREXA_TOKEN_ID, amount);

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

	function buyMagic100Token(address _account) internal {
		//Tier5
		//MAGIC_TOKEN_ID
		//Price: 100.0 USDT/piece
		//Quantity: 1

		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();

		uint256 decimal = 10 ** IERC20Metadata(address(arexa.payingERC20Token)).decimals();
		uint256 amount = 100 * decimal;

		address contractAddress = LibDiamond.getDiamondAddress();

		arexa.payingERC20Token.transferFrom(_account, contractAddress, amount);
		// bool result = arexa.payingERC20Token.transferFrom(_account, contractAddress, amount);
		// require(result, "Something wrong with the payment!");

		LibERC1155.safeTransfer(contractAddress, contractAddress, _account, LibArexaConst.MAGIC_TOKEN_ID, 1, "");

		//divide the amount to pool and arexa, fontos a sorrend, miután megkapta a tokent és adminisztráltuk a PNL változást, utána növeljük a pool értéket csak!
		_divideAmountPoolAndArexa(LibArexaConst.MAGIC_TOKEN_ID, amount);
	}

	function payoutArexaIncome(address _account, uint256 _value) internal {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		require(_value <= arexa.arexaBalance, "Not enough amount to pay out!");

		arexa.payingERC20Token.transferFrom(LibDiamond.getDiamondAddress(), _account, _value);
		// bool result = arexa.payingERC20Token.transferFrom(LibDiamond.getDiamondAddress(), _account, _value);
		// require(result, "Something wrong with the payment!");
	}

	function payoutPoolDivident(address _collectingAccount, address _toAccount, uint256 _amount) internal {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();

		LibTokenPNL.refreshPayoutDivident(
			address(LibArexaPlatform.getPayingToken()),
			LibArexaConst.AREXA_TOKEN_ID,
			_collectingAccount,
			int256(_amount)
		);
		arexa.payingERC20Token.transferFrom(LibDiamond.getDiamondAddress(), _toAccount, _amount);
		// bool result = arexa.payingERC20Token.transferFrom(LibDiamond.getDiamondAddress(), _toAccount, _amount);
		// require(result, "Something wrong with the payment!");
	}

	function stakeArexaToken(address _fromAccount, address _toAccount, uint256 _quantity) internal {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();

		//Caclulate each token quantity from input. Input is an arexa20Quantity, but can have decimals fractions, so have to "round floor"
		//arexa11555Quantity have only whole number
		uint256 decimal = 10 ** IERC20Metadata(address(arexa.arexaERC20Token)).decimals();
		uint256 arexa11555Quantity = _quantity / decimal;
		uint256 arexa20Quantity = arexa11555Quantity * decimal;

		require(arexa11555Quantity > 0 && arexa20Quantity > 0, "The input amount is too small for staking (AREXA AI token)");

		//Burn the Arexa AI ERC20 from user
		IBridgeableToken(address(arexa.arexaERC20Token)).burnFrom(_fromAccount, arexa20Quantity);

		address contractAddress = LibDiamond.getDiamondAddress();

		//Transfer Arexa AI Token from contract to user
		LibERC1155.safeTransfer(contractAddress, contractAddress, _toAccount, LibArexaConst.AREXA_TOKEN_ID, arexa11555Quantity, "");
		arexa.stakedArexaERC20TokenQuantity = arexa.stakedArexaERC20TokenQuantity + arexa11555Quantity;
	}

	function withdrawArexaToken(address _operator, address _fromAccount, address _toAccount, uint256 _quantity) internal {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();

		//Caclulate each token quantity from input. Input is an arexa11555Quantity
		//arexa11555Quantity have only whole number
		uint256 decimal = 10 ** IERC20Metadata(address(arexa.arexaERC20Token)).decimals();
		uint256 arexa20Quantity = _quantity * decimal;

		//Transfer Arexa AI Token from user to contract
		LibERC1155.safeTransfer(_operator, _fromAccount, LibDiamond.getDiamondAddress(), LibArexaConst.AREXA_TOKEN_ID, _quantity, "");

		//Mint the Arexa AI ERC20 to user
		IBridgeableToken(address(arexa.arexaERC20Token)).mint(_toAccount, arexa20Quantity);

		arexa.stakedArexaERC20TokenQuantity = arexa.stakedArexaERC20TokenQuantity - _quantity;
	}
}
