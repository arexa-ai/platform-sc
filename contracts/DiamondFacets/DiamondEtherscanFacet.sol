// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { LibDiamond } from "../base/Diamond/LibDiamond.sol";
import { LibDiamondEtherscan } from "../base/Diamond/LibDiamondEtherscan.sol";

contract DiamondEtherscanFacet {
	function setDummyImplementation(address _implementation) external {
		LibDiamond.enforceIsContractOwner();
		LibDiamondEtherscan._setDummyImplementation(_implementation);
	}

	function implementation() external view returns (address) {
		return LibDiamondEtherscan._dummyImplementation();
	}
}
