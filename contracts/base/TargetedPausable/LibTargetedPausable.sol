// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import "./LibTargetedPausableStorage.sol";

library LibTargetedPausable {
	error TargetedPausable__TargetedPaused();
	error TargetedPausable__NotTargetedPaused();

	//target: what was paused
	//account: the operator who is paused the target
	event TargetedPaused(bytes32 indexed target, address indexed account);

	//target: what was unpaused
	//account: the operator who is unpaused the target
	event TargetedUnpaused(bytes32 target, address indexed account);

	function _whenNotPaused(bytes32 _target) internal view {
		if (LibTargetedPausable._paused(_target)) revert TargetedPausable__TargetedPaused();
	}

	function _whenPaused(bytes32 _target) internal view {
		if (!LibTargetedPausable._paused(_target)) revert TargetedPausable__NotTargetedPaused();
	}

	function _paused(bytes32 _target) internal view returns (bool paused_) {
		paused_ = LibTargetedPausableStorage.layout().paused[_target];
	}

	function _pause(bytes32 _target, address _operator) internal {
		TargetedPausableStorage storage ps = LibTargetedPausableStorage.layout();
		if (ps.paused[_target]) revert TargetedPausable__TargetedPaused();
		ps.paused[_target] = true;
		emit TargetedPaused(_target, _operator);
	}

	function _unpause(bytes32 _target, address _operator) internal {
		TargetedPausableStorage storage ps = LibTargetedPausableStorage.layout();
		if (!ps.paused[_target]) revert TargetedPausable__NotTargetedPaused();
		ps.paused[_target] = false;
		delete ps.paused[_target];
		emit TargetedUnpaused(_target, _operator);
	}
}
