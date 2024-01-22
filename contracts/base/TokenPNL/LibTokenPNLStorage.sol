// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { EnumerableSet } from "../../utils/EnumerableSet.sol";
import { IERC20 } from "../../base/ERC20/IERC20.sol";

struct InventoryItem {
	int256 quantity;
	int256 deltaPnl; //After calculating the act Pnl based on the quantity this is a Pnl modification factor!
	int256 payedPnl;
}

struct Inventory {
	bool isEnabled;
	int256 sumQuantity;
	int256 sumAmount;
	int256 sumPnl;
	//Account - pool divident calculation
	mapping(address => InventoryItem) divident;
}

struct TokenPNLStorage {
	//contract => tokenId => inventory map
	//Eg: IERC20 => 0 => inventory
	//Eg: IERC1155 => tokenId => Inventory
	mapping(address => mapping(uint256 => Inventory)) inventory;
}

library LibTokenPNLStorage {
	bytes32 internal constant STORAGE_SLOT = keccak256("usmart.common.token-pnl.storage.v1");

	function layout() internal pure returns (TokenPNLStorage storage layout_) {
		bytes32 position = STORAGE_SLOT;
		assembly {
			layout_.slot := position
		}
	}
}
