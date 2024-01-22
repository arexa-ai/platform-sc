// SPDX-License-Identifier: UNLICENCED
/**
 * Copyright (C) 2023 AREXA
 */
pragma solidity ^0.8.9;

import { LibBlackWhiteList } from "../base/BlackWhiteList/LibBlackWhiteList.sol";

import { LibDiamond } from "../base/Diamond/LibDiamond.sol";

import { LibArexaPlatform } from "./Platform/LibArexaPlatform.sol";
import { LibTokenPNL } from "../base/TokenPNL/LibTokenPNL.sol";
import { InventoryItem } from "../base/TokenPNL/LibTokenPNLStorage.sol";
//import { LibERC1155 } from "../base/ERC1155/base/LibERC1155.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";

import { LibArexaConst } from "./LibArexaConst.sol";

contract ArexaPoolPNLFacet is CallProtection, ModifierRole, ModifierPausable {
	constructor() {}

	function getInventory() external view protectedCall returns (bool isEnabled, int256 sumQuantity, int256 sumAmount, int256 sumPnl) {
		return LibTokenPNL.getInventory(address(LibArexaPlatform.getPayingToken()), LibArexaConst.AREXA_TOKEN_ID);
	}

	function getInventoryItem(address account) external view protectedCall returns (InventoryItem memory) {
		return LibTokenPNL.getInventoryItem(address(LibArexaPlatform.getPayingToken()), LibArexaConst.AREXA_TOKEN_ID, account);
	}

	function calcDivident(address account) external view protectedCall returns (int256) {
		return LibTokenPNL.calcDivident(address(LibArexaPlatform.getPayingToken()), LibArexaConst.AREXA_TOKEN_ID, account);
	}

	function getArexaIncomeParameter(uint256 tokenId) external view protectedCall returns (uint32 pool_, uint32 arexa_) {
		uint256 tokenIdType = (tokenId / 100000000) * 100000000;
		require(
			tokenIdType == LibArexaConst.SUBSCR1_TOKEN_TYPE ||
				tokenIdType == LibArexaConst.SUBSCR2_TOKEN_TYPE ||
				tokenIdType == LibArexaConst.TRADER_TOKEN_ID ||
				tokenIdType == LibArexaConst.AREXA_TOKEN_ID ||
				tokenIdType == LibArexaConst.MAGIC_TOKEN_ID
		);
		(pool_, arexa_) = LibArexaPlatform.getArexaIncomeParameter(tokenIdType);
	}

	function setArexaIncomeParameter(
		uint256 tokenId,
		uint32 pool,
		uint32 arexa
	) external protectedCall onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) whenNotPaused(LibArexaConst.FULL) {
		uint256 tokenIdType = (tokenId / 100000000) * 100000000;
		require(
			tokenIdType == LibArexaConst.SUBSCR1_TOKEN_TYPE ||
				tokenIdType == LibArexaConst.SUBSCR2_TOKEN_TYPE ||
				tokenIdType == LibArexaConst.TRADER_TOKEN_ID ||
				tokenIdType == LibArexaConst.AREXA_TOKEN_ID ||
				tokenIdType == LibArexaConst.MAGIC_TOKEN_ID
		);
		LibArexaPlatform.setArexaIncomeParameter(tokenId, pool, arexa);
	}

	function payoutArexaIncome(
		address toAccount,
		uint256 value
	) external protectedCall onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) whenNotPaused(LibArexaConst.FULL) {
		LibArexaPlatform.payoutArexaIncome(toAccount, value);
	}

	function payoutArexaDivident(
		address toAccount,
		uint256 value
	) external protectedCall onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) whenNotPaused(LibArexaConst.FULL) {
		LibArexaPlatform.payoutPoolDivident(LibDiamond.getDiamondAddress(), toAccount, value);
	}

	function payoutDivident(uint256 value) external protectedCall whenNotPaused(LibArexaConst.FULL) {
		LibArexaPlatform.payoutPoolDivident(msg.sender, msg.sender, value);
	}
}
