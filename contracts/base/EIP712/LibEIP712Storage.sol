// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { EnumerableSet } from "../../utils/EnumerableSet.sol";

using EnumerableSet for EnumerableSet.AddressSet;
using EnumerableSet for EnumerableSet.UintSet;

struct EIP712Storage {
	string name;
	string version;
	uint256 chainId;
	address verifyingContract;
	bytes32 domainSeparator;
}

library LibEIP712Storage {
	bytes32 internal constant STORAGE_SLOT = keccak256("usmart.common.eip712.storage.v1");

	function layout() internal pure returns (EIP712Storage storage layout_) {
		bytes32 position = STORAGE_SLOT;
		assembly {
			layout_.slot := position
		}
	}
}
