// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { EnumerableSet } from "../../../utils/EnumerableSet.sol";

struct ERC1155ReceiverStorage {
	bytes data;
	address operator;
	address from;
	uint256[] ids;
	uint256[] values;
}

struct ERC1155Storage {
	mapping(uint256 => mapping(address => uint256)) balances; // Mapping from token ID to account balances
	mapping(address => mapping(address => bool)) operatorApprovals; // Mapping from account to operator approvals
	mapping(uint256 => bool) operatorSpendingLimitEnabled;
	mapping(address => mapping(address => mapping(uint256 => uint256))) allowances;
	mapping(uint256 => uint256) totalSupply;
	mapping(uint256 => EnumerableSet.AddressSet) accountsByToken;
	mapping(address => EnumerableSet.UintSet) tokensByAccount;
	string uri; // Used as the URI for all token types by relying on ID substitution, e.g. https://token-cdn-domain/{id}.json
	string baseURI; // Optional base URI, e.g. ipfs://53453534
	mapping(uint256 => string) tokenURIs; // Optional mapping for token URIs, e.g. 4236464216781, so tokenURI will be: ipfs://53453534/4236464216781
	bool paused;
	mapping(uint256 => bool) pausedToken;
	uint256 receivedTokensLength;
	mapping(uint256 => ERC1155ReceiverStorage) receivedTokens;
}

library LibERC1155Storage {
	bytes32 internal constant ERC1155_STORAGE_SLOT = keccak256("usmart.contracts.erc1155-base.storage.v1");

	function layout() internal pure returns (ERC1155Storage storage e1155s_) {
		bytes32 position = ERC1155_STORAGE_SLOT;
		assembly {
			e1155s_.slot := position
		}
	}
}
