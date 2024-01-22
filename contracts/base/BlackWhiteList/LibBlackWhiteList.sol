// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import "./LibBlackWhiteListStorage.sol";

library LibBlackWhiteList {
	//_target: which list is belongs to...
	//_account: an account on a _target
	//_lockValue:
	//  - if _target is a blackList than true _lockValue means that the account is prohibited
	//  - if _target is a blackList than false _lockValue means that the account is acceptable
	//  - if _target is a whiteList than true _lockValue means that the account is acceptable
	//  - if _target is a whiteList than false _lockValue means that the account is prohibited
	event AccountBlackWhiteList(bytes32 indexed _target, address indexed _account, bool _lockValue);

	function _getAccountBlackWhiteList(bytes32 _target, address _account) internal view returns (bool lockValue_) {
		BlackWhiteListStorage storage wls = LibBlackWhiteListStorage.layout();
		lockValue_ = wls.whiteList[_target][_account];
	}

	function _setAccountBlackWhiteList(bytes32 _target, address _account, bool _lockValue) internal {
		BlackWhiteListStorage storage wls = LibBlackWhiteListStorage.layout();
		wls.whiteList[_target][_account] = _lockValue;
		emit AccountBlackWhiteList(_target, _account, _lockValue);
	}

	function _setBatchAccountBlackWhiteList(bytes32 _target, address[] calldata _accounts, bool _lockValue) internal {
		require(_accounts.length <= 255, "Batch: too many addresses");
		BlackWhiteListStorage storage wls = LibBlackWhiteListStorage.layout();
		for (uint8 i = 0; i < _accounts.length; i++) {
			wls.whiteList[_target][_accounts[i]] = _lockValue;
		}
	}
}
