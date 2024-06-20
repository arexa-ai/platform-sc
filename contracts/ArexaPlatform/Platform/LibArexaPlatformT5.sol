// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import "./LibArexaPlatformStorage.sol";
import "../../utils/SafeERC20.sol";
import "../../base/Diamond/LibDiamond.sol";
import "../../base/ERC1155/base/LibERC1155.sol";

import "../LibArexaConst.sol";

import { IERC20Metadata } from "../../base/ERC20/metadata/IERC20Metadata.sol";
import "../../base/BridgeCentralized/IBridgeableToken.sol";

import "./LibArexaPlatformShared.sol";

library LibArexaPlatformT5 {
	function buyMagic100Token(address _account, uint16 _discountPercent) internal {
		//Tier5
		//MAGIC_TOKEN_ID
		//Price: 100.0 USDT/piece
		//Quantity: 1

		require(_discountPercent <= 10000, "Discount percent cannot be more then 100,00%");

		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();

		uint256 decimal = 10 ** IERC20Metadata(address(arexa.payingERC20Token)).decimals();
		uint256 amount = (((100 * decimal * (10000 - _discountPercent) * 10) / 10000) + 5) / 10;

		address contractAddress = LibDiamond.getDiamondAddress();

		if (amount > 0) {
			SafeERC20.safeTransferFrom(arexa.payingERC20Token, _account, contractAddress, amount);
		}

		LibERC1155.safeTransfer(contractAddress, contractAddress, _account, LibArexaConst.MAGIC_TOKEN_ID, 1, "");

		//divide the amount to pool and arexa, fontos a sorrend, miután megkapta a tokent és adminisztráltuk a PNL változást, utána növeljük a pool értéket csak!
		LibArexaPlatformShared._divideAmountPoolAndArexa(LibArexaConst.MAGIC_TOKEN_ID, amount);
	}
}
