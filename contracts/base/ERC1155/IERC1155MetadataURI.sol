// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

/**
 * https://eips.ethereum.org/EIPS/eip-1155.
 */
interface IERC1155MetadataURI {
	/**
	 * @dev URIs are defined in RFC 3986.
	 * The URI MUST point to a JSON file that conforms to the "ERC-1155 Metadata URI JSON Schema".
	 * @return URI string
	 */
	function uri(uint256 _id) external view returns (string memory);
}
