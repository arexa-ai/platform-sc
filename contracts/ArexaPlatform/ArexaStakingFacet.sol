// SPDX-License-Identifier: UNLICENCED
/**
 * Copyright (C) 2024 AREXA
 */
pragma solidity ^0.8.9;

import { LibArexaPlatformStaking } from "./Platform/LibArexaPlatformStaking.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
import { ReentryProtection } from "../base/Shared/ReentryProtection.sol";

contract ArexaStakingFacet is CallProtection, ReentryProtection {
	function stakeArexaToken(uint256 quantity) external protectedCall {
		LibArexaPlatformStaking.stakeArexaToken(msg.sender, msg.sender, quantity);
	}

	function withdrawArexaToken(address fromAccount, address toAccount, uint256 quantity) external protectedCall noReentry {
		LibArexaPlatformStaking.withdrawArexaToken(msg.sender, fromAccount, toAccount, quantity);
	}
}
