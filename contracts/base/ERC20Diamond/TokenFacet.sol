// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { uSmartERC20 } from "../ERC20Token/ERC20Token.sol";

abstract contract TokenFacet is uSmartERC20 {
	constructor() uSmartERC20() {}
}
