// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import "../base/ERC20/IERC20.sol";
import { AddressUtils } from "./AddressUtils.sol";

library SafeERC20 {
	error SafeERC20FailedOperation(address token);
	using AddressUtils for address;

	function safeTransferFrom(IERC20 token, address from, address to, uint256 value) internal {
		bytes memory returndata = address(token).functionCall(abi.encodeCall(token.transferFrom, (from, to, value)));
		if (returndata.length != 0 && !abi.decode(returndata, (bool))) {
			revert SafeERC20FailedOperation(address(token));
		}
	}
}
