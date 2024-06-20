// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import "./LibArexaPlatformStorage.sol";
import "../../base/Diamond/LibDiamond.sol";
import "../../base/ERC1155/base/LibERC1155.sol";

import "../LibArexaConst.sol";

import { IERC20 } from "../../base/ERC20/IERC20.sol";
import { IERC20Metadata } from "../../base/ERC20/metadata/IERC20Metadata.sol";
import "../../base/BridgeCentralized/IBridgeableToken.sol";

library LibArexaPlatformStaking {
	//
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
