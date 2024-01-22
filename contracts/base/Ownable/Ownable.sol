// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import { IERC173 } from "../../interfaces/IERC173.sol";
import { LibAccessControl } from "../AccessControl/LibAccessControl.sol";
import { AddressUtils } from "../../utils/AddressUtils.sol";

import { ModifierRole } from "../AccessControl/ModifierRole.sol";

abstract contract Ownable is IERC173, ModifierRole {
	using AddressUtils for address;

	/**
	 * @notice get the ERC173 contract owner
	 * @return contract owner
	 */
	function owner() external view returns (address) {
		return LibAccessControl._owner();
	}

	/// @notice Set the address of the new owner of the contract
	/// @dev Set _newOwner to address(0) to renounce any ownership.
	/// @param _newOwner The address of the new owner of the contract
	function transferOwnership(address _newOwner) public virtual onlyOwner {
		LibAccessControl._setOwner(_newOwner);
	}
}
