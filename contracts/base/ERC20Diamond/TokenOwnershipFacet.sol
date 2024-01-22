// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { Ownable } from "../Ownable/Ownable.sol";
import { LibAccessControl } from "../AccessControl/LibAccessControl.sol";

import { LibTokenConst } from "../ERC20Token/LibTokenConst.sol";

//import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
import { ModifierPausable } from "../TargetedPausable/ModifierPausable.sol";
import { CallProtection } from "../Shared/ProtectedCall.sol";

abstract contract TokenOwnershipFacet is Ownable, CallProtection, ModifierPausable {
	function transferOwnership(address _newOwner) public override protectedCall whenNotPaused(LibTokenConst.FULL) onlyOwner {
		super.transferOwnership(_newOwner);

		LibAccessControl._setRoleAdmin(LibTokenConst.TOKEN_ADMIN_ROLE, LibTokenConst.TOKEN_ADMIN_ROLE);
		LibAccessControl._setRoleAdmin(LibTokenConst.TREASURY_ROLE, LibTokenConst.TOKEN_ADMIN_ROLE);
		LibAccessControl._setRoleAdmin(LibTokenConst.AML_ROLE, LibTokenConst.TOKEN_ADMIN_ROLE);
		LibAccessControl._setRoleAdmin(LibTokenConst.COMPLIANCE_ROLE, LibTokenConst.TOKEN_ADMIN_ROLE);

		LibAccessControl._grantRole(LibTokenConst.TOKEN_ADMIN_ROLE, LibAccessControl._owner());
		LibAccessControl._grantRole(LibTokenConst.TREASURY_ROLE, LibAccessControl._owner());
		LibAccessControl._grantRole(LibTokenConst.AML_ROLE, LibAccessControl._owner());
		LibAccessControl._grantRole(LibTokenConst.COMPLIANCE_ROLE, LibAccessControl._owner());
	}
}
