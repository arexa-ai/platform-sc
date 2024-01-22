// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { EnumerableSet } from "../../utils/EnumerableSet.sol";
import { IERC20 } from "../../base/ERC20/IERC20.sol";

struct ArexaTokenPool {
	uint256 total;
	uint256 sold;
}

struct ArexaIncomeParameter {
	uint32 pool;
	uint32 arexa;
}

struct ArexaPlatformStorage {
	mapping(uint8 => ArexaTokenPool) arexaTokenPool;
	mapping(uint256 => ArexaIncomeParameter) arexaIncomeParameter;
	IERC20 payingERC20Token; //USDT
	uint256 poolBalance; //The "pool" part of the sum income
	uint256 arexaBalance; //The "owner" part of the sum income
	//tokenType => lastSubscriptionTokenId
	mapping(uint256 => uint256) lastSubscriptionTokenIds;
	IERC20 arexaERC20Token; //AREXA
	uint256 stakedArexaERC20TokenQuantity;
}

library LibArexaPlatformStorage {
	bytes32 internal constant STORAGE_SLOT = keccak256("usmart.contracts.arexa-platform.storage.v1");

	function layout() internal pure returns (ArexaPlatformStorage storage layout_) {
		bytes32 position = STORAGE_SLOT;
		assembly {
			layout_.slot := position
		}
	}
}
