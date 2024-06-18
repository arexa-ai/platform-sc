// SPDX-License-Identifier: UNLICENCED
/**
 * Copyright (C) 2023 AREXA
 */
pragma solidity ^0.8.9;

import { LibBlackWhiteList } from "../base/BlackWhiteList/LibBlackWhiteList.sol";

import { LibERC1155 } from "../base/ERC1155/base/LibERC1155.sol";
import { LibArexaPlatformShared } from "./Platform/LibArexaPlatform.sol";
import { LibArexaPlatformSubscriptions } from "./Platform/LibArexaPlatformSubscriptions.sol";
import { LibArexaPlatformT3 } from "./Platform/LibArexaPlatformT3.sol";
import { LibArexaPlatformT4 } from "./Platform/LibArexaPlatformT4.sol";
import { LibArexaPlatformT5 } from "./Platform/LibArexaPlatformT5.sol";

import { ArexaTokenPool } from "./Platform/LibArexaPlatformStorage.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";
import { LibArexaConst } from "./LibArexaConst.sol";

contract ArexaPlatformAdminFacet is CallProtection, ModifierRole, ModifierPausable {
	function getArexaTokenPool(uint8 _tokenType) external view protectedCall returns (uint256 total, uint256 sold) {
		(total, sold) = LibArexaPlatformShared.getArexaTokenPool(_tokenType);
	}

	function createSubscription(
		uint256 tokenType,
		uint16 year,
		uint8 month,
		uint256 quantity,
		uint256 min,
		uint256 max
	) external protectedCall onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) whenNotPaused(LibArexaConst.FULL) returns (uint256 tokenId) {
		require(
			tokenType == LibArexaConst.SUBSCR1_TOKEN_TYPE || tokenType == LibArexaConst.SUBSCR2_TOKEN_TYPE,
			"Only subscription token type is permitted!"
		);
		tokenId = LibArexaPlatformSubscriptions.createSubscriptions(msg.sender, tokenType, year, month, quantity, min, max);
		LibERC1155.setTokenURI(tokenId, LibERC1155.getTokenUri(tokenType));
	}

	function payArexaTokenFromPool(
		uint8 poolType,
		address account,
		uint32 quantity
	) external protectedCall onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) whenNotPaused(LibArexaConst.FULL) {
		//Tier4
		//AREXA_TOKEN
		//Price: priceless ;)
		//Quantity: No limit to buy
		//transfer from pool to account
		require(
			poolType == LibArexaConst.AREXA_TOKEN_POOL_AREXAINC ||
				poolType == LibArexaConst.AREXA_TOKEN_POOL_MARKETING ||
				poolType == LibArexaConst.AREXA_TOKEN_POOL_DEVELOPMENT,
			"Payout can be made from Arexa, Marketing or Development pool!"
		);
		LibArexaPlatformT4.payByArexaToken(poolType, account, quantity);
	}

	function buySubscriptionAdmin(
		address toAccount,
		uint256 tokenId,
		uint32 quantity,
		uint16 discountPercent
	) external protectedCall onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) whenNotPaused(LibArexaConst.FULL) {
		//Tier1 Oracle or Tier2 Edge
		//Price: variable USDT/piece, based on algorithm
		//Quantity: 1 per account
		// uint256 balance = LibERC1155.balanceOf(msg.sender, tokenId);
		// require(balance == 0, "Only 1 token can be bought per account!");
		LibArexaPlatformSubscriptions.buySubscription(tokenId, toAccount, quantity, discountPercent);
	}

	function buyOracleSubscriptionAdmin(
		address toAccount,
		uint32 quantity,
		uint16 discountPercent
	) external protectedCall onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) whenNotPaused(LibArexaConst.FULL) {
		//Tier1 Oracle
		//SUBSCR1_TOKEN_TYPE
		//Price: variable USDT/piece, based on algorithm
		//Quantity: 1 per account
		uint256 tokenId = LibArexaPlatformSubscriptions.getCurrentSubscriptionTokenId(LibArexaConst.SUBSCR1_TOKEN_TYPE);
		// uint256 balance = LibERC1155.balanceOf(msg.sender, tokenId);
		// require(balance == 0, "Only 1 token can be bought per account!");
		LibArexaPlatformSubscriptions.buySubscription(tokenId, toAccount, quantity, discountPercent);
	}

	function buyEdgeSubscriptionAdmin(
		address toAccount,
		uint32 quantity,
		uint16 discountPercent
	) external protectedCall onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) whenNotPaused(LibArexaConst.FULL) {
		//Tier2 Edge
		//SUBSCR2_TOKEN_TYPE
		//Price: variable USDT/piece, based on algorithm
		//Quantity: 1 per account
		uint256 tokenId = LibArexaPlatformSubscriptions.getCurrentSubscriptionTokenId(LibArexaConst.SUBSCR2_TOKEN_TYPE);
		// uint256 balance = LibERC1155.balanceOf(msg.sender, tokenId);
		// require(balance == 1, "Only 1 token can be bought per account!");
		LibArexaPlatformSubscriptions.buySubscription(tokenId, toAccount, quantity, discountPercent);
	}

	function buyTraderTokenAdmin(
		address toAccount,
		uint128 value,
		uint8 valueType,
		uint16 discountPercent
	) external protectedCall onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) whenNotPaused(LibArexaConst.FULL) {
		//Tier3 Singularity
		//TRADER_TOKEN
		//Price: 1.0 USDT/piece
		//Quantity: No limit to buy
		//valueType: 0 is amount, 1 is quantity
		LibArexaPlatformT3.buyTraderToken(msg.sender, toAccount, value, valueType, discountPercent);
	}

	function buyArexaTokenAdmin(
		address toAccount,
		uint128 value,
		uint8 valueType,
		uint16 discountPercent
	) external protectedCall onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) whenNotPaused(LibArexaConst.FULL) {
		//Tier4
		//AREXA_TOKEN
		//Price: 0.1 USDT/piece
		//Quantity: No limit to buy
		//valueType: 0 is amount, 1 is quantity
		LibArexaPlatformT4.buyArexaToken(toAccount, value, valueType, discountPercent);
	}

	function buyMagic100TokenAdmin(
		address toAccount,
		uint16 discountPercent //1 means 0,01%, 100 means 1%, 10000 means 100%, 1564 means 15,64% discount
	) external protectedCall onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) whenNotPaused(LibArexaConst.FULL) {
		//Tier5
		//MAGIC_TOKEN_ID
		//Price: 100.0 USDT/piece
		//An ADMIN can buy to itself token, and then transfer for free

		LibArexaPlatformT5.buyMagic100Token(toAccount, discountPercent);
	}
}
