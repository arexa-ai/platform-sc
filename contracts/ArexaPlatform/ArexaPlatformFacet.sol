// SPDX-License-Identifier: UNLICENCED
/**
 * Copyright (C) 2023 AREXA
 */
pragma solidity ^0.8.9;

import { LibBlackWhiteList } from "../base/BlackWhiteList/LibBlackWhiteList.sol";

import { LibArexaPlatformShared } from "./Platform/LibArexaPlatformShared.sol";
import { LibArexaPlatformSubscriptions } from "./Platform/LibArexaPlatformSubscriptions.sol";
import { LibArexaPlatformT3 } from "./Platform/LibArexaPlatformT3.sol";
import { LibArexaPlatformT4 } from "./Platform/LibArexaPlatformT4.sol";
import { LibArexaPlatformT5 } from "./Platform/LibArexaPlatformT5.sol";

import { LibERC1155 } from "../base/ERC1155/base/LibERC1155.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";
import { LibArexaConst } from "./LibArexaConst.sol";

contract ArexaPlatformFacet is CallProtection, ModifierRole, ModifierPausable {
	constructor() {}

	uint256 public constant SUBSCR1_TOKEN_TYPE = LibArexaConst.SUBSCR1_TOKEN_TYPE; //Tier 1, every month
	uint256 public constant SUBSCR2_TOKEN_TYPE = LibArexaConst.SUBSCR2_TOKEN_TYPE; //Tier 2, every month
	uint256 public constant TRADER_TOKEN_ID = LibArexaConst.TRADER_TOKEN_ID; //Tier 3, unlimited, always mint
	uint256 public constant AREXA_TOKEN_ID = LibArexaConst.AREXA_TOKEN_ID; //Tier 4, 100000000 piece
	uint256 public constant MAGIC_TOKEN_ID = LibArexaConst.MAGIC_TOKEN_ID; //Tier 5, 100 piece

	uint8 public constant AREXA_TOKEN_POOL_INVESTOR = LibArexaConst.AREXA_TOKEN_POOL_INVESTOR;
	uint8 public constant AREXA_TOKEN_POOL_AREXAINC = LibArexaConst.AREXA_TOKEN_POOL_AREXAINC;
	uint8 public constant AREXA_TOKEN_POOL_MARKETING = LibArexaConst.AREXA_TOKEN_POOL_MARKETING;
	uint8 public constant AREXA_TOKEN_POOL_DEVELOPMENT = LibArexaConst.AREXA_TOKEN_POOL_DEVELOPMENT;
	uint8 public constant AREXA_TOKEN_POOL_RESERVED = LibArexaConst.AREXA_TOKEN_POOL_RESERVED;

	uint8 public constant AMOUNT_VALUE_TYPE = LibArexaPlatformShared.AMOUNT_VALUE_TYPE;
	uint8 public constant QUANTITY_VALUE_TYPE = LibArexaPlatformShared.QUANTITY_VALUE_TYPE;

	function getCurrentSubscriptionTokenId(uint256 tokenType) external view protectedCall returns (uint256) {
		return LibArexaPlatformSubscriptions.getCurrentSubscriptionTokenId(tokenType);
	}

	function calcSubscriptionPrice(uint256 tokenId, uint32 quantity) external view protectedCall returns (uint256) {
		return LibArexaPlatformSubscriptions.calcSubscriptionPrice(tokenId, quantity);
	}

	function buySubscription(uint256 tokenId, uint32 quantity) external protectedCall whenNotPaused(LibArexaConst.FULL) {
		//Tier1 Oracle or Tier2 Edge
		//Price: variable USDT/piece, based on algorithm
		//Quantity: 1 per account
		// uint256 balance = LibERC1155.balanceOf(msg.sender, tokenId);
		// require(balance == 0, "Only 1 token can be bought per account!");
		LibArexaPlatformSubscriptions.buySubscription(tokenId, msg.sender, quantity, 0);
	}

	function buyOracleSubscription(uint32 quantity) external protectedCall whenNotPaused(LibArexaConst.FULL) {
		//Tier1 Oracle
		//SUBSCR1_TOKEN_TYPE
		//Price: variable USDT/piece, based on algorithm
		//Quantity: 1 per account
		uint256 tokenId = LibArexaPlatformSubscriptions.getCurrentSubscriptionTokenId(SUBSCR1_TOKEN_TYPE);
		// uint256 balance = LibERC1155.balanceOf(msg.sender, tokenId);
		// require(balance == 0, "Only 1 token can be bought per account!");
		LibArexaPlatformSubscriptions.buySubscription(tokenId, msg.sender, quantity, 0);
	}

	function buyEdgeSubscription(uint32 quantity) external protectedCall whenNotPaused(LibArexaConst.FULL) {
		//Tier2 Edge
		//SUBSCR2_TOKEN_TYPE
		//Price: variable USDT/piece, based on algorithm
		//Quantity: 1 per account
		uint256 tokenId = LibArexaPlatformSubscriptions.getCurrentSubscriptionTokenId(SUBSCR2_TOKEN_TYPE);
		// uint256 balance = LibERC1155.balanceOf(msg.sender, tokenId);
		// require(balance == 1, "Only 1 token can be bought per account!");
		LibArexaPlatformSubscriptions.buySubscription(tokenId, msg.sender, quantity, 0);
	}

	function buyTraderToken(uint128 value, uint8 valueType) external protectedCall whenNotPaused(LibArexaConst.FULL) {
		//Tier3 Singularity
		//TRADER_TOKEN
		//Price: 1.0 USDT/piece
		//Quantity: No limit to buy
		//valueType: 0 is amount, 1 is quantity
		LibArexaPlatformT3.buyTraderToken(msg.sender, msg.sender, value, valueType, 0);
	}

	function buyArexaToken(uint128 value, uint8 valueType) external protectedCall whenNotPaused(LibArexaConst.FULL) {
		//Tier4
		//AREXA_TOKEN
		//Price: 0.1 USDT/piece
		//Quantity: No limit to buy
		//valueType: 0 is amount, 1 is quantity
		LibArexaPlatformT4.buyArexaToken(msg.sender, value, valueType, 0);
	}

	function buyMagic100Token() external protectedCall whenNotPaused(LibArexaConst.FULL) {
		//Tier5
		//MAGIC_TOKEN_ID
		//Price: 100.0 USDT/piece
		//Quantity: 1

		require(
			LibBlackWhiteList._getAccountBlackWhiteList(LibArexaConst.MAGIC100_FIRST_BUYER, msg.sender),
			"Only an approved account can buy the Magic token"
		);

		LibBlackWhiteList._setAccountBlackWhiteList(LibArexaConst.MAGIC100_FIRST_BUYER, msg.sender, false);

		uint256 balance = LibERC1155.balanceOf(msg.sender, LibArexaConst.MAGIC_TOKEN_ID);
		require(balance == 0, "Only 1 Magic token can be bought now!");

		LibArexaPlatformT5.buyMagic100Token(msg.sender, 0);
	}
}
