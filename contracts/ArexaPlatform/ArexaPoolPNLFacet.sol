// SPDX-License-Identifier: UNLICENCED
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { LibBlackWhiteList } from "../base/BlackWhiteList/LibBlackWhiteList.sol";

import { LibDiamond } from "../base/Diamond/LibDiamond.sol";

import { LibArexaPlatform } from "./Platform/LibArexaPlatform.sol";
import { LibArexaPlatformPNL } from "./Platform/LibArexaPlatformPNL.sol";
import { LibArexaPlatformShared } from "./Platform/LibArexaPlatformShared.sol";
import { LibTokenPNL } from "../base/TokenPNL/LibTokenPNL.sol";
import { InventoryItem } from "../base/TokenPNL/LibTokenPNLStorage.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
import { ReentryProtection } from "../base/Shared/ReentryProtection.sol";
import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";

import { LibArexaConst } from "./LibArexaConst.sol";

contract ArexaPoolPNLFacet is CallProtection, ReentryProtection, ModifierRole, ModifierPausable {
	function getInventory() external view protectedCall returns (bool isEnabled, int256 sumQuantity, int256 sumAmount, int256 sumPnl) {
		(isEnabled, sumQuantity, sumAmount, sumPnl) = LibTokenPNL.getInventory(
			address(LibArexaPlatformShared.getPayingToken()),
			LibArexaConst.AREXA_TOKEN_ID
		);
	}

	function getInventoryItem(address account) external view protectedCall returns (int256 quantity, int256 deltaPnl, int256 payedPnl) {
		(quantity, deltaPnl, payedPnl) = LibTokenPNL.getInventoryItem(
			address(LibArexaPlatformShared.getPayingToken()),
			LibArexaConst.AREXA_TOKEN_ID,
			account
		);
	}

	function calcDivident(address account) external view protectedCall returns (int256) {
		return LibTokenPNL.calcDivident(address(LibArexaPlatformShared.getPayingToken()), LibArexaConst.AREXA_TOKEN_ID, account);
	}

	function getArexaIncomeParameter(uint256 tokenId) external view protectedCall returns (uint32 pool, uint32 arexa) {
		uint256 tokenIdType = (tokenId / 100000000) * 100000000;
		require(
			tokenIdType == LibArexaConst.SUBSCR1_TOKEN_TYPE ||
				tokenIdType == LibArexaConst.SUBSCR2_TOKEN_TYPE ||
				tokenIdType == LibArexaConst.TRADER_TOKEN_ID ||
				tokenIdType == LibArexaConst.AREXA_TOKEN_ID ||
				tokenIdType == LibArexaConst.MAGIC_TOKEN_ID
		);
		(pool, arexa) = LibArexaPlatformShared.getArexaIncomeParameter(tokenIdType);
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

	function getPoolAndArexaIncomeBalances()
		external
		view
		protectedCall
		returns (uint256 pool, uint256 poolPaidOut, uint256 arexa, uint256 arexaPaidOut)
	{
		(pool, poolPaidOut, arexa, arexaPaidOut) = LibArexaPlatformPNL.getPoolAndArexaIncomeBalances();
	}

	function payoutArexaIncome(
		address toAccount,
		uint256 value
	) external protectedCall noReentry onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) whenNotPaused(LibArexaConst.FULL) {
		LibArexaPlatformPNL.payoutArexaIncome(toAccount, value);
	}

	function payoutArexaDivident(
		address toAccount,
		uint256 value
	) external protectedCall noReentry onlyRole(LibArexaConst.AREXA_ADMIN_ROLE) whenNotPaused(LibArexaConst.FULL) {
		LibArexaPlatformPNL.payoutPoolDivident(LibDiamond.getDiamondAddress(), toAccount, value);
	}

	function payoutDivident(uint256 value) external protectedCall noReentry whenNotPaused(LibArexaConst.FULL) {
		LibArexaPlatformPNL.payoutPoolDivident(msg.sender, msg.sender, value);
	}
}
