// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { IERC1155 } from "../base/ERC1155/IERC1155.sol";
import { IERC1155MetadataURI } from "../base/ERC1155/IERC1155MetadataURI.sol";

import { LibERC1155 } from "../base/ERC1155/base/LibERC1155.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";
import { LibArexaConst } from "./LibArexaConst.sol";

contract ArexaPfmTokenMetadataURIFacet is IERC1155MetadataURI, CallProtection, ModifierRole, ModifierPausable {
	function uri(uint256 _id) external view virtual override returns (string memory) {
		return LibERC1155.getUri(_id);
	}

	function getUri() external view returns (string memory) {
		return LibERC1155.getUri();
	}

	function setURI(string memory newuri) external virtual protectedCall onlyOwner whenNotPaused(LibArexaConst.FULL) {
		LibERC1155.setURI(newuri);
	}

	function getTokenBaseUri() external view returns (string memory) {
		return LibERC1155.getTokenBaseUri();
	}

	function setTokenBaseURI(string memory newuri) external virtual protectedCall onlyOwner whenNotPaused(LibArexaConst.FULL) {
		LibERC1155.setTokenBaseURI(newuri);
	}

	function getTokenUri(uint256 _id) external view returns (string memory) {
		return LibERC1155.getTokenUri(_id);
	}

	function setTokenURI(
		uint256 _id,
		string memory newuri
	) external virtual protectedCall onlyOwner whenNotPaused(LibArexaConst.FULL) whenNotPaused(keccak256(abi.encodePacked(_id))) {
		LibERC1155.setTokenURI(_id, newuri);
	}
}
