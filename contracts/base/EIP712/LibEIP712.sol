// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import "./LibEIP712Storage.sol";

import { ECDSA } from "../../utils/ECDSA.sol";

library LibEIP712 {
	bytes32 constant EIP712DOMAIN_TYPEHASH =
		keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");

	function buildCustomDomainSeapratorV4(
		string memory name,
		string memory version,
		uint256 chainid,
		address verifyingContract
	) internal pure returns (bytes32) {
		return keccak256(abi.encode(EIP712DOMAIN_TYPEHASH, keccak256(bytes(name)), keccak256(bytes(version)), chainid, verifyingContract));
	}

	function buildDomainSeparatorV4(string memory name, string memory version, uint256 chainid, address verifyingContract) internal {
		EIP712Storage storage eip712s = LibEIP712Storage.layout();
		eip712s.domainSeparator = keccak256(
			abi.encode(EIP712DOMAIN_TYPEHASH, keccak256(bytes(name)), keccak256(bytes(version)), chainid, verifyingContract)
		);
	}

	function domainSeparatorV4() internal view returns (bytes32) {
		EIP712Storage storage eip712s = LibEIP712Storage.layout();

		require(eip712s.domainSeparator != 0, "DomainSeparator not initialized!");

		return eip712s.domainSeparator;
	}

	function isDomainSeparatorV4() internal view returns (bool) {
		EIP712Storage storage eip712s = LibEIP712Storage.layout();
		return eip712s.domainSeparator != 0;
	}

	function hashTypedDataV4(bytes32 domainSeparator, bytes32 messageHash) internal pure returns (bytes32) {
		return ECDSA.toTypedDataHash(domainSeparator, messageHash);
	}

	function hashTypedDataV4(bytes32 messageHash) internal view returns (bytes32) {
		return ECDSA.toTypedDataHash(domainSeparatorV4(), messageHash);
	}
}
