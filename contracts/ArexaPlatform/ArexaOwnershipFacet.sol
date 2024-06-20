// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
import { Ownable } from "../base/Ownable/Ownable.sol";
import { LibAccessControl } from "../base/AccessControl/LibAccessControl.sol";

import { LibArexaConst } from "./LibArexaConst.sol";

contract ArexaOwnershipFacet is CallProtection, Ownable {
	function transferOwnership(address newOwner) public override protectedCall onlyOwner {
		super.transferOwnership(newOwner);

		LibAccessControl._setRoleAdmin(LibArexaConst.AREXA_ADMIN_ROLE, LibArexaConst.AREXA_ADMIN_ROLE);

		LibAccessControl._grantRole(LibArexaConst.AREXA_ADMIN_ROLE, LibAccessControl._owner());
	}
}
