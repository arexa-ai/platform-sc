// SPDX-License-Identifier: UNLICENCED
/**
 * Copyright (C) 2023 uSmart (Andras Szabolcsi)
 */
pragma solidity ^0.8.9;

import { TokenOwnershipFacet } from "../base/ERC20Diamond/TokenOwnershipFacet.sol";

contract ArexaTokenOwnershipFacet is TokenOwnershipFacet {
	constructor() TokenOwnershipFacet() {}
}
