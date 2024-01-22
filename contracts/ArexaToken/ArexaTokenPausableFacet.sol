// SPDX-License-Identifier: UNLICENCED
/**
 * Copyright (C) 2023 uSmart (Andras Szabolcsi)
 */
pragma solidity ^0.8.9;

import { TokenPausableFacet } from "../base/ERC20Diamond/TokenPausableFacet.sol";

contract ArexaTokenPausableFacet is TokenPausableFacet {
	constructor() TokenPausableFacet() {}
}
