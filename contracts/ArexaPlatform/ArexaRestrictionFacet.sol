// SPDX-License-Identifier: UNLICENCED
/**
 * Copyright (C) 2023 AREXA
 */
pragma solidity ^0.8.9;

import { LibBlackWhiteList } from "../base/BlackWhiteList/LibBlackWhiteList.sol";

import { LibERC1155 } from "../base/ERC1155/base/LibERC1155.sol";

import { CallProtection } from "../base/Shared/ProtectedCall.sol";
// import { ModifierRole } from "../base/AccessControl/ModifierRole.sol";
// import { ModifierPausable } from "../base/TargetedPausable/ModifierPausable.sol";

//import { LibArexaConst } from "./LibArexaConst.sol";
import { LibTokenRestriction } from "../base/TokenRestriction/LibTokenRestriction.sol";

contract ArexaRestrictionFacet is CallProtection {
	function calcUnrestrictedAmount(address account, uint256 tokenId, uint256 amount) external view protectedCall returns (uint256) {
		return LibTokenRestriction.calcUnrestrictedAmount(account, tokenId, amount);
	}

	function checkRestriction(address account, uint256 tokenId, uint256 amount) external view protectedCall returns (bool) {
		return LibTokenRestriction.checkRestriction(account, tokenId, amount);
	}

	function checkRestrictions(
		address account,
		uint256[] calldata tokenIds,
		uint256[] calldata amounts
	) external view protectedCall returns (bool) {
		return LibTokenRestriction.checkRestrictions(account, tokenIds, amounts);
	}
}
