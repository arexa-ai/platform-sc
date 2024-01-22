// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { Ownable } from "../base/Ownable/Ownable.sol";
import { LibAccessControl } from "../base/AccessControl/LibAccessControl.sol";

import { LibArexaConst } from "./LibArexaConst.sol";

contract ArexaOwnershipFacet is Ownable {
	function transferOwnership(address _newOwner) public override onlyOwner {
		super.transferOwnership(_newOwner);

		LibAccessControl._setRoleAdmin(LibArexaConst.AREXA_ADMIN_ROLE, LibArexaConst.AREXA_ADMIN_ROLE);

		LibAccessControl._grantRole(LibArexaConst.AREXA_ADMIN_ROLE, LibAccessControl._owner());
		//LibAccessControl._grantRole(LibArexaConst.AREXA_ADMIN_ROLE, LibAccessControl._owner());
	}
}
