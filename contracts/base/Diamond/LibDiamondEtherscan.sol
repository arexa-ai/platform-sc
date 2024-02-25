// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

struct DiamondEtherscanStorage {
	address proxyAddress;
}

library LibDiamondEtherscan {
	event Upgraded(address indexed implementation);

	/**
	 * @dev Storage slot with the address of the current dummy-implementation.
	 * This is the keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1
	 */
	bytes32 internal constant STORAGE_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

	function layout() internal pure returns (DiamondEtherscanStorage storage layout_) {
		bytes32 position = STORAGE_SLOT;
		assembly {
			layout_.slot := position
		}
	}

	function _setDummyImplementation(address implementationAddress) internal {
		DiamondEtherscanStorage storage des = layout();
		des.proxyAddress = implementationAddress;
		emit Upgraded(implementationAddress);
	}

	function _dummyImplementation() internal view returns (address) {
		DiamondEtherscanStorage storage des = layout();
		return des.proxyAddress;
	}
}
