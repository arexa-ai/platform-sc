// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { TokenACLFacet } from "../base/ERC20Diamond/TokenACLFacet.sol";

contract ArexaTokenACLFacet is TokenACLFacet {
	constructor() TokenACLFacet() {}
}
