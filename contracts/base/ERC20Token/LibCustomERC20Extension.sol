// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { LibCustomERC20ExtensionStorage } from "./LibCustomERC20ExtensionStorage.sol";

library LibCustomERC20Extension {
	///LibBlockBenERC20ExtensionStorage
	//URL, Fee and other usfull extension will come here

	function getTreasuryAddress() internal view returns (address) {
		return LibCustomERC20ExtensionStorage.layout().treasuryAddress;
	}

	function setTreasuryAddress(address _treasuryAddress) internal {
		LibCustomERC20ExtensionStorage.layout().treasuryAddress = _treasuryAddress;
	}

	function getURL() internal view returns (string memory) {
		return LibCustomERC20ExtensionStorage.layout().url;
	}

	function setURL(string calldata _url) internal {
		LibCustomERC20ExtensionStorage.layout().url = _url;
	}

	function getGeneralFeeAddress() internal view returns (address) {
		return LibCustomERC20ExtensionStorage.layout().generalFeeAddress;
	}

	function setGeneralFeeAddress(address _generalFeeAddress) internal {
		LibCustomERC20ExtensionStorage.layout().generalFeeAddress = _generalFeeAddress;
	}

	function getGeneralFee() internal view returns (uint16) {
		return LibCustomERC20ExtensionStorage.layout().generalFee;
	}

	function setGeneralFee(uint16 _generalFee) internal {
		LibCustomERC20ExtensionStorage.layout().generalFee = _generalFee;
	}

	function getPoolFee() internal view returns (uint16) {
		return LibCustomERC20ExtensionStorage.layout().poolFee;
	}

	function setPoolFee(uint16 _poolFee) internal {
		LibCustomERC20ExtensionStorage.layout().poolFee = _poolFee;
	}

	function getPoolFeeAddress() internal view returns (address) {
		return LibCustomERC20ExtensionStorage.layout().poolFeeAddress;
	}

	function setPoolFeeAddress(address _poolFeeAddress) internal {
		LibCustomERC20ExtensionStorage.layout().poolFeeAddress = _poolFeeAddress;
	}
}
