// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { LibDiamond } from "../Diamond/LibDiamond.sol";

contract CallProtection {
	modifier protectedCall() {
		require(address(this) == LibDiamond.getDiamondAddress(), "NOT_ALLOWED");
		_;
	}
}
