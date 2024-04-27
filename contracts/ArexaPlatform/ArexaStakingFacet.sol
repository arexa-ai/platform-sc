// SPDX-License-Identifier: UNLICENCED
/**
 * Copyright (C) 2023 AREXA
 */
pragma solidity ^0.8.9;

import { LibArexaPlatformStaking } from "./Platform/LibArexaPlatformStaking.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";

// import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
// import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";

//import { LibArexaConst } from "./LibArexaConst.sol";

contract ArexaStakingFacet is CallProtection {
	constructor() {}

	function stakeArexaToken(uint256 quantity) external protectedCall {
		LibArexaPlatformStaking.stakeArexaToken(msg.sender, msg.sender, quantity);
	}

	function withdrawArexaToken(address fromAccount, address toAccount, uint256 _quantity) external protectedCall {
		LibArexaPlatformStaking.withdrawArexaToken(msg.sender, fromAccount, toAccount, _quantity);
	}
}
