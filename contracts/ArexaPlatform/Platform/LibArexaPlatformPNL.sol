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
import "../../base/TokenPNL/LibTokenPNL.sol";

import "../LibArexaConst.sol";

library LibArexaPlatformPNL {
	function getPoolAndArexaIncomeBalances()
		internal
		view
		returns (uint256 pool_, uint256 poolPaidOut_, uint256 arexa_, uint256 arexaPaidOut_)
	{
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		pool_ = arexa.poolBalance;
		poolPaidOut_ = arexa.poolPaidOutBalance;
		arexa_ = arexa.arexaBalance;
		arexaPaidOut_ = arexa.arexaPaidOutBalance;
	}

	function payoutArexaIncome(address _account, uint256 _amount) internal {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();
		require((arexa.arexaPaidOutBalance + _amount) <= arexa.arexaBalance, "Not enough amount to pay out!");

		arexa.arexaPaidOutBalance = arexa.arexaPaidOutBalance + _amount;

		// arexa.payingERC20Token.approve(LibDiamond.getDiamondAddress(), _amount);
		// SafeERC20.safeTransferFrom(arexa.payingERC20Token, LibDiamond.getDiamondAddress(), _account, _amount);
		SafeERC20.safeTransfer(arexa.payingERC20Token, _account, _amount);
	}

	function payoutPoolDivident(address _collectingAccount, address _toAccount, uint256 _amount) internal {
		ArexaPlatformStorage storage arexa = LibArexaPlatformStorage.layout();

		LibTokenPNL.refreshPayoutDivident(
			address(LibArexaPlatformShared.getPayingToken()),
			LibArexaConst.AREXA_TOKEN_ID,
			_collectingAccount,
			int256(_amount)
		);

		arexa.poolPaidOutBalance = arexa.poolPaidOutBalance + _amount;

		SafeERC20.safeTransfer(arexa.payingERC20Token, _toAccount, _amount);
	}
}
