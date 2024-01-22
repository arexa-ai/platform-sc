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
import { IERC1155 } from "../base/ERC1155/IERC1155.sol";
import { IERC1155Allowance } from "../base/ERC1155/IERC1155Allowance.sol";
import { IERC1155Enumerable } from "../base/ERC1155/IERC1155Enumerable.sol";
import { IERC1155MetadataURI } from "../base/ERC1155/IERC1155MetadataURI.sol";
import { IERC1155Pausable } from "../base/ERC1155/IERC1155Pausable.sol";
import { IERC1155Receiver } from "../base/ERC1155/IERC1155Receiver.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";

import { LibAccessControl } from "../base/AccessControl/LibAccessControl.sol";

import { LibArexaConst } from "../ArexaPlatform/LibArexaConst.sol";
import { LibArexaPlatform } from "../ArexaPlatform/Platform/LibArexaPlatform.sol";

// It is expected that this contract is customized if you want to deploy your diamond
// with data from a deployment script. Use the init function to initialize state variables
// of your diamond. Add parameters to the init funciton if you need to.

contract ArexaPlatformDiamondInit is CallProtection {
	// You can add parameters to this function in order to pass in
	// data to set your own state variables
	function init(IERC20 payingToken, IERC20 arexaERC20Token, uint64 restrictionTimeDelta) external protectedCall {
		LibAccessControl._enforceIsOwner();

		require(restrictionTimeDelta > 0, "INVALID_PARAMS");

		// adding ERC165 data
		DiamondStorage storage ds = LibDiamondStorage.layout();
		ds.supportedInterfaces[type(IERC165).interfaceId] = true;
		ds.supportedInterfaces[type(IDiamondCut).interfaceId] = true;
		ds.supportedInterfaces[type(IDiamondLoupe).interfaceId] = true;
		ds.supportedInterfaces[type(IERC173).interfaceId] = true;

		ds.supportedInterfaces[type(IERC1155).interfaceId] = false;
		ds.supportedInterfaces[type(IERC1155Allowance).interfaceId] = false;
		ds.supportedInterfaces[type(IERC1155Enumerable).interfaceId] = false;
		ds.supportedInterfaces[type(IERC1155MetadataURI).interfaceId] = false;
		ds.supportedInterfaces[type(IERC1155Pausable).interfaceId] = false;
		ds.supportedInterfaces[type(IERC1155Receiver).interfaceId] = false;

		//AccessControl
		LibAccessControl._setRoleAdmin(LibArexaConst.AREXA_ADMIN_ROLE, LibArexaConst.AREXA_ADMIN_ROLE);
		LibAccessControl._grantRole(LibArexaConst.AREXA_ADMIN_ROLE, LibAccessControl._owner());

		LibArexaPlatform.initialize(msg.sender, payingToken, arexaERC20Token, restrictionTimeDelta);

		// add your own state variables
		// EIP-2535 specifies that the `diamondCut` function takes two optional
		// arguments: address _init and bytes calldata _calldata
		// These arguments are used to execute an arbitrary function using delegatecall
		// in order to set state variables in the diamond during deployment or an upgrade
		// More info here: https://eips.ethereum.org/EIPS/eip-2535#diamond-interface
	}
}
