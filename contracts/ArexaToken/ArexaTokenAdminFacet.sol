// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { TokenAdminFacet } from "../base/ERC20Diamond/TokenAdminFacet.sol";

contract ArexaTokenAdminFacet is TokenAdminFacet {
	constructor() TokenAdminFacet() {}
}
