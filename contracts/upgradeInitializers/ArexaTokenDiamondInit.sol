// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { LibDiamond } from "../base/Diamond/LibDiamond.sol";
import "../base/Diamond/LibDiamondStorage.sol";

import { IDiamondLoupe } from "../interfaces/IDiamondLoupe.sol";
import { IDiamondCut } from "../interfaces/IDiamondCut.sol";
import { IERC173 } from "../interfaces/IERC173.sol";
import { IERC165 } from "../interfaces/IERC165.sol";
import { IERC20 } from "../base/ERC20/IERC20.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";

import { LibAccessControl } from "../base/AccessControl/LibAccessControl.sol";
import { LibERC20Base } from "../base/ERC20/base/LibERC20Base.sol";
import { LibERC20Metadata } from "../base/ERC20/metadata/LibERC20Metadata.sol";
import { LibTokenConst } from "../base/ERC20Token/LibTokenConst.sol";

// It is expected that this contract is customized if you want to deploy your diamond
// with data from a deployment script. Use the init function to initialize state variables
// of your diamond. Add parameters to the init funciton if you need to.

contract ArexaTokenDiamondInit is CallProtection {
	// You can add parameters to this function in order to pass in
	// data to set your own state variables
	function init(string calldata name, string calldata symbol, uint8 decimals, uint256 initialSupply) external protectedCall {
		LibAccessControl._enforceIsOwner();
		require(bytes(LibERC20Metadata._name()).length == 0 && bytes(LibERC20Metadata._symbol()).length == 0, "ALREADY_INITIALIZED");
		require(bytes(name).length != 0 && bytes(symbol).length != 0, "INVALID_PARAMS");

		// adding ERC165 data
		DiamondStorage storage ds = LibDiamondStorage.layout();
		ds.supportedInterfaces[type(IERC165).interfaceId] = true;
		ds.supportedInterfaces[type(IDiamondCut).interfaceId] = true;
		ds.supportedInterfaces[type(IDiamondLoupe).interfaceId] = true;
		ds.supportedInterfaces[type(IERC173).interfaceId] = true;
		ds.supportedInterfaces[type(IERC20).interfaceId] = false;

		LibERC20Metadata._setName(name);
		LibERC20Metadata._setSymbol(symbol);
		LibERC20Metadata._setDecimals(decimals);

		LibAccessControl._setRoleAdmin(LibTokenConst.TOKEN_ADMIN_ROLE, LibTokenConst.TOKEN_ADMIN_ROLE);
		LibAccessControl._setRoleAdmin(LibTokenConst.TREASURY_ROLE, LibTokenConst.TOKEN_ADMIN_ROLE);
		LibAccessControl._setRoleAdmin(LibTokenConst.AML_ROLE, LibTokenConst.TOKEN_ADMIN_ROLE);
		LibAccessControl._setRoleAdmin(LibTokenConst.COMPLIANCE_ROLE, LibTokenConst.TOKEN_ADMIN_ROLE);

		LibAccessControl._grantRole(LibTokenConst.TOKEN_ADMIN_ROLE, LibAccessControl._owner());
		LibAccessControl._grantRole(LibTokenConst.TREASURY_ROLE, LibAccessControl._owner());
		LibAccessControl._grantRole(LibTokenConst.AML_ROLE, LibAccessControl._owner());
		LibAccessControl._grantRole(LibTokenConst.COMPLIANCE_ROLE, LibAccessControl._owner());

		if (initialSupply > 0) {
			LibERC20Base._mint(msg.sender, initialSupply);
		}

		// add your own state variables
		// EIP-2535 specifies that the `diamondCut` function takes two optional
		// arguments: address _init and bytes calldata _calldata
		// These arguments are used to execute an arbitrary function using delegatecall
		// in order to set state variables in the diamond during deployment or an upgrade
		// More info here: https://eips.ethereum.org/EIPS/eip-2535#diamond-interface
	}
}
