// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { LibCustomERC20ExtensionStorage } from "./LibCustomERC20ExtensionStorage.sol";

library LibCustomERC20Extension {
	///LibBlockBenERC20ExtensionStorage
	//URL, Fee and other usfull extension will come here

	function _getTreasuryAddress() internal view returns (address) {
		return LibCustomERC20ExtensionStorage.layout().treasuryAddress;
	}

	function _setTreasuryAddress(address _treasuryAddress) internal {
		LibCustomERC20ExtensionStorage.layout().treasuryAddress = _treasuryAddress;
	}

	function _getURL() internal view returns (string memory) {
		return LibCustomERC20ExtensionStorage.layout().url;
	}

	function _setURL(string calldata _url) internal {
		LibCustomERC20ExtensionStorage.layout().url = _url;
	}

	function _getGeneralFeeAddress() internal view returns (address) {
		return LibCustomERC20ExtensionStorage.layout().generalFeeAddress;
	}

	function _setGeneralFeeAddress(address _generalFeeAddress) internal {
		LibCustomERC20ExtensionStorage.layout().generalFeeAddress = _generalFeeAddress;
	}

	function _getGeneralFee() internal view returns (uint16) {
		return LibCustomERC20ExtensionStorage.layout().generalFee;
	}

	function _setGeneralFee(uint16 _generalFee) internal {
		LibCustomERC20ExtensionStorage.layout().generalFee = _generalFee;
	}

	function _getPoolFee() internal view returns (uint16) {
		return LibCustomERC20ExtensionStorage.layout().poolFee;
	}

	function _setPoolFee(uint16 _poolFee) internal {
		LibCustomERC20ExtensionStorage.layout().poolFee = _poolFee;
	}

	function _getPoolFeeAddress() internal view returns (address) {
		return LibCustomERC20ExtensionStorage.layout().poolFeeAddress;
	}

	function _setPoolFeeAddress(address _poolFeeAddress) internal {
		LibCustomERC20ExtensionStorage.layout().poolFeeAddress = _poolFeeAddress;
	}
}
