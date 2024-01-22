// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

library LibTokenConst {
	//Pausable
	bytes32 public constant FULL = 0x00;

	//Roles
	bytes32 public constant TOKEN_ADMIN_ROLE = keccak256("TOKEN_ADMIN_ROLE");
	bytes32 public constant TREASURY_ROLE = keccak256("TREASURY_ROLE");
	bytes32 public constant AML_ROLE = keccak256("AML_ROLE");
	bytes32 public constant COMPLIANCE_ROLE = keccak256("COMPLIANCE_ROLE");

	//BlackWhite lists, these accounts could not send/receive token
	bytes32 public constant SENDER_BL = keccak256("SENDER_BLACKLIST");
	bytes32 public constant RECIPIENT_BL = keccak256("RECIPIENT_BLACKLIST");

	//FreeFee WhiteList, these accounts don't pay fee...
	bytes32 public constant SENDER_FREE_FEE_WL = keccak256("SENDER_FREE_FEE_WHITELIST");
	bytes32 public constant RECIPIENT_FREE_FEE_WL = keccak256("RECIPIENT_FREE_FEE_WHITELIST");
}
