// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { TokenAMLFacet } from "../base/ERC20Diamond/TokenAMLFacet.sol";

contract ArexaTokenAMLFacet is TokenAMLFacet {
	constructor() TokenAMLFacet() {}
}
