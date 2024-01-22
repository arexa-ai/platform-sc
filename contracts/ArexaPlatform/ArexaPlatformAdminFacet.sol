// SPDX-License-Identifier: UNLICENCED
/**
 * Copyright (C) 2023 AREXA
 */
pragma solidity ^0.8.9;

import { LibBlackWhiteList } from "../base/BlackWhiteList/LibBlackWhiteList.sol";

import { LibERC1155 } from "../base/ERC1155/base/LibERC1155.sol";
import { LibArexaPlatform } from "./Platform/LibArexaPlatform.sol";
import { ArexaTokenPool } from "./Platform/LibArexaPlatformStorage.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";
import { LibArexaConst } from "./LibArexaConst.sol";

contract ArexaPlatformAdminFacet is CallProtection, ModifierRole, ModifierPausable {
	constructor() {}

	function getArexaTokenPool(uint8 _tokenType) external view protectedCall returns (ArexaTokenPool memory) {
		return LibArexaPlatform.getArexaTokenPool(_tokenType);
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
		tokenId = LibArexaPlatform.createSubscriptions(msg.sender, tokenType, year, month, quantity, min, max);
	}

	// function buySubscriptionAdmin(
	// 	uint256 tokenId,
	// 	address toAccount,
	// 	uint32 quantity
	// ) external protectedCall onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) whenNotPaused(LibArexaConst.FULL) {
	// 	//Tier1 Oracle or Tier2 Edge
	// 	//Price: variable USDT/piece, based on algorithm
	// 	//Quantity: 1 per account, but with admin can be more...

	// 	LibArexaPlatform.buySubscription(tokenId, toAccount, quantity);
	// }

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
		LibArexaPlatform.payByArexaToken(poolType, account, quantity);
	}

	function buyMagic100TokenAdmin(
		address toAccount
	) external protectedCall onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) whenNotPaused(LibArexaConst.FULL) {
		//Tier5
		//MAGIC_TOKEN_ID
		//Price: 100.0 USDT/piece
		//An ADMIN can buy to itself token, and then transfer for free

		LibArexaPlatform.buyMagic100Token(toAccount);
	}
}
