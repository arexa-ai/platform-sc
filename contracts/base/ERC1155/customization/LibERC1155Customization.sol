// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import "../../TokenRestriction/LibTokenRestriction.sol";
import "../../TokenPNL/LibTokenPNL.sol";

import "../../../ArexaPlatform/Platform/LibArexaPlatform.sol";

library LibERC1155Customization {
	/**
	 * @notice ERC1155 hook, called before all transfers including mint and burn
	 * The same hook is called on both single and batched variants. For single
	 * transfers, the length of the `ids` and `amounts` arrays will be 1.
	 * Calling conditions (for each `id` and `amount` pair):
	 * - When `from` and `to` are both non-zero, `amount` of ``from``'s tokens of token type `id` will be  transferred to `to`.
	 * - When `from` is zero, `amount` tokens of token type `id` will be minted for `to`.
	 * - when `to` is zero, `amount` of ``from``'s tokens of token type `id` will be burned.
	 * - `from` and `to` are never both zero.
	 * - `ids` and `amounts` have the same, non-zero length.
	 *  param_operator executor of transfer
	 * @param _fromAccount sender of tokens
	 *  param_toAccount receiver of tokens
	 * @param _tokenIds token IDs
	 * @param _amounts quantities of tokens to transfer
	 *  param _data data payload
	 */
	function _beforeTokenTransfer(
		address, //_operator,
		address _fromAccount,
		address, //_toAccount,
		uint256[] memory _tokenIds,
		uint256[] memory _amounts,
		bytes memory //_data
	) internal view {
		if (_fromAccount != address(0)) {
			LibTokenRestriction.checkRestrictions(_fromAccount, _tokenIds, _amounts);
		}
	}

	/**
	 * @notice ERC1155 hook, called after all transfers including mint and burn
	 * The same hook is called on both single and batched variants. For single
	 * transfers, the length of the `id` and `amount` arrays will be 1.
	 * Calling conditions (for each `id` and `amount` pair):
	 * - When `from` and `to` are both non-zero, `amount` of ``from``'s tokens of token type `id` will be  transferred to `to`.
	 * - When `from` is zero, `amount` tokens of token type `id` will be minted for `to`.
	 * - when `to` is zero, `amount` of ``from``'s tokens of token type `id` will be burned.
	 * - `from` and `to` are never both zero.
	 * - `ids` and `amounts` have the same, non-zero length.
	 * _operator executor of transfer
	 * @param _fromAccount sender of tokens
	 * @param _toAccount receiver of tokens
	 * @param _tokenIds token IDs
	 * @param _amounts quantities of tokens to transfer
	 * _data data payload
	 */
	function _afterTokenTransfer(
		address, //_operator
		address _fromAccount,
		address _toAccount,
		uint256[] memory _tokenIds,
		uint256[] memory _amounts,
		bytes memory //_data
	) internal {
		if (_fromAccount != address(0)) {
			LibTokenRestriction.recalcRestrictions(_fromAccount, _tokenIds, _amounts, 0);
		}

		if (_toAccount != address(0)) {
			LibTokenRestriction.recalcRestrictions(_toAccount, _tokenIds, _amounts, 1);
		}

		for (uint256 i; i < _tokenIds.length; ) {
			LibTokenPNL.refreshDivident(address(LibArexaPlatform.getPayingToken()), _tokenIds[i], _fromAccount, _toAccount, _amounts[i]);

			unchecked {
				i++;
			}
		}
	}
}
