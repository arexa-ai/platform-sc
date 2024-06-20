// SPDX-License-Identifier: UNLICENCED
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

library LibArexaConst {
	//
	//Pausable
	bytes32 public constant FULL = 0x00;
	bytes32 public constant SUBSCR1_TOKEN = keccak256(abi.encode("TOKEN", LibArexaConst.SUBSCR1_TOKEN_TYPE));
	bytes32 public constant SUBSCR2_TOKEN = keccak256(abi.encode("TOKEN", LibArexaConst.SUBSCR2_TOKEN_TYPE));
	bytes32 public constant TRADER_TOKEN = keccak256(abi.encode("TOKEN", LibArexaConst.TRADER_TOKEN_ID));
	bytes32 public constant AREXA_TOKEN = keccak256(abi.encode("TOKEN", LibArexaConst.AREXA_TOKEN_ID));
	bytes32 public constant MAGIC_TOKEN = keccak256(abi.encode("TOKEN", LibArexaConst.MAGIC_TOKEN_ID));

	//Roles
	bytes32 public constant AREXA_ADMIN_ROLE = keccak256("AREXA_ADMIN_ROLE");
	//bytes32 public constant TOKEN_ADMIN_ROLE = keccak256("AREXA_TOKEN_ADMIN_ROLE");
	//bytes32 public constant TREASURY_ROLE = keccak256("AREXA_TREASURY_ROLE");

	//BlackWhite lists
	bytes32 public constant MAGIC100_FIRST_BUYER = keccak256("MAGIC100_FIRST_BUYER"); //WhiteList

	//TokenIDs:
	uint256 public constant SUBSCR1_TOKEN_TYPE = 100000000; //Tier 1, every month
	uint256 public constant SUBSCR2_TOKEN_TYPE = 200000000; //Tier 2, every month
	uint256 public constant TRADER_TOKEN_ID = 300000000; //Tier 3, unlimited, always mint
	uint256 public constant AREXA_TOKEN_ID = 400000000; //Tier 4, 100000000 piece
	uint256 public constant MAGIC_TOKEN_ID = 500000000; //Tier 5, 100 piece

	//AREXA TOKEN POOL TYPES:
	uint8 public constant AREXA_TOKEN_POOL_INVESTOR = 1; //35M
	uint8 public constant AREXA_TOKEN_POOL_AREXAINC = 2; //5M
	uint8 public constant AREXA_TOKEN_POOL_MARKETING = 3; //5M
	uint8 public constant AREXA_TOKEN_POOL_DEVELOPMENT = 4; //5M
	uint8 public constant AREXA_TOKEN_POOL_RESERVED = 5; //50M
}
