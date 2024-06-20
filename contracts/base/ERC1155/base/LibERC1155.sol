// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import "./LibERC1155Storage.sol";

import "../customization/LibERC1155Customization.sol";

import { AddressUtils } from "../../../utils/AddressUtils.sol";
import { EnumerableSet } from "../../../utils/EnumerableSet.sol";
import { IERC1155Receiver } from "../IERC1155Receiver.sol";

error LibERC1155__BalanceQueryZeroAddress(); //Ok
error LibERC1155__ArrayLengthMismatch(); //Ok
error LibERC1155__MintToZeroAddress(); //ok
error LibERC1155__BurnExceedsBalance(); ///Ok
error LibERC1155__BurnFromZeroAddress(); //Ok
error LibERC1155__ERC1155ReceiverRejected(); // OK
error LibERC1155__ERC1155ReceiverNotImplemented(); //ok
error LibERC1155__TransferExceedsBalance(); //Ok
error LibERC1155__TransferToZeroAddress(); //Ok
error LibERC1155__NotOwnerOrApproved(); //Ok
error LibERC1155__NotOwnerOrApprovedLimit(); //Ok
error LibERC1155__SelfApproval(); //OK

library LibERC1155 {
	/************************************************************************************************************
	 *
	 * EVENTS from IERC1155
	 *
	 ************************************************************************************************************/
	event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);

	event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values);

	event ApprovalForAll(address indexed account, address indexed operator, bool approved);

	event URI(string value, uint256 indexed tokenId);

	/************************************************************************************************************
	 *
	 * EVENTS from IERC1155Allowance
	 *
	 ************************************************************************************************************/
	event Approval(address indexed owner, address indexed operator, uint256 indexed id, uint256 currenctValue, uint256 newValue);

	/************************************************************************************************************
	 *
	 * EVENTS from IERC1155Paused
	 *
	 ************************************************************************************************************/
	event AllTokenPaused(address indexed account);

	event AllTokenUnpaused(address indexed account);

	event TokenPaused(address indexed account, uint256 indexed tokenId);

	event TokenUnpaused(address indexed account, uint256 indexed tokenId);

	/************************************************************************************************************
	 *
	 * Usings
	 *
	 ************************************************************************************************************/
	using AddressUtils for address;
	using EnumerableSet for EnumerableSet.AddressSet;
	using EnumerableSet for EnumerableSet.UintSet;

	/************************************************************************************************************
	 *
	 * IERC1155
	 *
	 ************************************************************************************************************/

	/**
	 * @notice query the balance of given token held by given address
	 * @param _account address to query
	 * @param _tokenId token to query
	 * @return token balance
	 */
	function balanceOf(address _account, uint256 _tokenId) internal view returns (uint256) {
		if (_account == address(0)) revert LibERC1155__BalanceQueryZeroAddress();
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		return e1155s.balances[_tokenId][_account];
	}

	/**
	 * @notice query the balance of given token held by the given addresses
	 * @param _accounts addresses to query
	 * @param _tokenIds list of token IDs to query
	 * @return tokens' balance
	 */
	function balanceOfBatch(address[] memory _accounts, uint256[] memory _tokenIds) internal view returns (uint256[] memory) {
		require(_accounts.length == _tokenIds.length, "ERC1155: accounts and ids length mismatch");
		if (_tokenIds.length != _accounts.length) revert LibERC1155__ArrayLengthMismatch();

		uint256[] memory batchBalances = new uint256[](_accounts.length);

		for (uint256 i = 0; i < _accounts.length; ++i) {
			batchBalances[i] = balanceOf(_accounts[i], _tokenIds[i]);
		}

		return batchBalances;
	}

	/**
	 * @notice mint given quantity of tokens for given address
	 * @param _operator caller, msg.sender or msgSender()
	 * @param _toAccount beneficiary of minting
	 * @param _tokenId token ID
	 * @param _amount quantity of tokens to mint
	 * @param _data data payload
	 */
	function mint(address _operator, address _toAccount, uint256 _tokenId, uint256 _amount, bytes memory _data) internal {
		if (_toAccount == address(0)) revert LibERC1155__MintToZeroAddress();

		uint256[] memory tokenIds = _asSingletonArray(_tokenId);
		uint256[] memory amounts = _asSingletonArray(_amount);

		_beforeTokenTransfer(_operator, address(0), _toAccount, tokenIds, amounts, _data);

		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		_whenTokenNotPaused(e1155s, _tokenId);

		e1155s.balances[_tokenId][_toAccount] += _amount;
		emit TransferSingle(_operator, address(0), _toAccount, _tokenId, _amount);

		_afterTokenTransfer(_operator, address(0), _toAccount, tokenIds, amounts, _data);

		_doSafeTransferAcceptanceCheck(_operator, address(0), _toAccount, _tokenId, _amount, _data);
	}

	/**
	 * @notice mint batch of tokens for given address
	 * @param _operator caller, msg.sender or msgSender()
	 * @param _toAccount beneficiary of minting
	 * @param _tokenIds list of token IDs
	 * @param _amounts list of quantities of tokens to mint
	 * @param _data data payload
	 */
	function mintBatch(
		address _operator,
		address _toAccount,
		uint256[] memory _tokenIds,
		uint256[] memory _amounts,
		bytes memory _data
	) internal {
		if (_toAccount == address(0)) revert LibERC1155__MintToZeroAddress();
		if (_tokenIds.length != _amounts.length) revert LibERC1155__ArrayLengthMismatch();

		_beforeTokenTransfer(_operator, address(0), _toAccount, _tokenIds, _amounts, _data);

		ERC1155Storage storage e1155s = LibERC1155Storage.layout();

		for (uint256 i = 0; i < _tokenIds.length; ) {
			uint256 tokenId = _tokenIds[i];
			_whenTokenNotPaused(e1155s, tokenId);
			e1155s.balances[tokenId][_toAccount] += _amounts[i];
			unchecked {
				i++;
			}
		}

		emit TransferBatch(_operator, address(0), _toAccount, _tokenIds, _amounts);

		_afterTokenTransfer(_operator, address(0), _toAccount, _tokenIds, _amounts, _data);

		_doSafeBatchTransferAcceptanceCheck(_operator, address(0), _toAccount, _tokenIds, _amounts, _data);
	}

	/**
	 * @notice burn given quantity of tokens held by given address
	 * @param _operator caller, msg.sender or msgSender()
	 * @param _fromAccount holder of tokens to burn
	 * @param _tokenId token ID
	 * @param _amount quantity of tokens to burn
	 */
	function burn(address _operator, address _fromAccount, uint256 _tokenId, uint256 _amount) internal {
		if (_fromAccount == address(0)) revert LibERC1155__BurnFromZeroAddress();

		_beforeTokenTransfer(_operator, _fromAccount, address(0), _asSingletonArray(_tokenId), _asSingletonArray(_amount), "");

		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		_whenTokenNotPaused(e1155s, _tokenId);

		if (_amount > e1155s.balances[_tokenId][_fromAccount]) revert LibERC1155__BurnExceedsBalance();

		unchecked {
			e1155s.balances[_tokenId][_fromAccount] -= _amount;
		}

		emit TransferSingle(_operator, _fromAccount, address(0), _tokenId, _amount);
	}

	/**
	 * @notice burn given batch of tokens held by given address
	 * @param _operator caller, msg.sender or msgSender()
	 * @param _fromAccount holder of tokens to burn
	 * @param _tokenIds token IDs
	 * @param _amounts quantities of tokens to burn
	 */
	function burnBatch(address _operator, address _fromAccount, uint256[] memory _tokenIds, uint256[] memory _amounts) internal {
		if (_fromAccount == address(0)) revert LibERC1155__BurnFromZeroAddress();
		if (_tokenIds.length != _amounts.length) revert LibERC1155__ArrayLengthMismatch();

		_beforeTokenTransfer(_operator, _fromAccount, address(0), _tokenIds, _amounts, "");

		ERC1155Storage storage e1155s = LibERC1155Storage.layout();

		unchecked {
			for (uint256 i; i < _tokenIds.length; i++) {
				uint256 tokenId = _tokenIds[i];
				_whenTokenNotPaused(e1155s, tokenId);
				if (_amounts[i] > e1155s.balances[tokenId][_fromAccount]) revert LibERC1155__BurnExceedsBalance();
				e1155s.balances[tokenId][_fromAccount] -= _amounts[i];
			}
		}

		emit TransferBatch(_operator, _fromAccount, address(0), _tokenIds, _amounts);
	}

	/**
	 * @notice transfer tokens between given addresses
	 * @param _operator executor of transfer
	 * @param _fromAccount sender of tokens
	 * @param _toAccount receiver of tokens
	 * @param _tokenId token ID
	 * @param _amount quantity of tokens to transfer
	 * @param _data data payload
	 */
	function safeTransfer(
		address _operator,
		address _fromAccount,
		address _toAccount,
		uint256 _tokenId,
		uint256 _amount,
		bytes memory _data
	) internal {
		if (_toAccount == address(0)) revert LibERC1155__TransferToZeroAddress();

		uint256[] memory tokenIds = _asSingletonArray(_tokenId);
		uint256[] memory amounts = _asSingletonArray(_amount);

		_beforeTokenTransfer(_operator, _fromAccount, _toAccount, tokenIds, amounts, _data);

		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		_whenTokenNotPaused(e1155s, _tokenId);

		uint256 senderBalance = e1155s.balances[_tokenId][_fromAccount];

		if (_amount > senderBalance) revert LibERC1155__TransferExceedsBalance();
		checkAllowance(_operator, _fromAccount, _tokenId, _amount);

		unchecked {
			e1155s.balances[_tokenId][_fromAccount] = senderBalance - _amount;
			if (_operator != _fromAccount) {
				if (e1155s.operatorSpendingLimitEnabled[_tokenId]) {
					e1155s.allowances[_fromAccount][_operator][_tokenId] = e1155s.allowances[_fromAccount][_operator][_tokenId] - _amount;
				}
			}
		}

		e1155s.balances[_tokenId][_toAccount] += _amount;

		emit TransferSingle(_operator, _fromAccount, _toAccount, _tokenId, _amount);

		_afterTokenTransfer(_operator, _fromAccount, _toAccount, tokenIds, amounts, _data);

		_doSafeTransferAcceptanceCheck(_operator, _fromAccount, _toAccount, _tokenId, _amount, _data);
	}

	/**
	 * @notice transfer batch of tokens between given addresses
	 * @param _operator executor of transfer
	 * @param _fromAccount sender of tokens
	 * @param _toAccount receiver of tokens
	 * @param _tokenIds token IDs
	 * @param _amounts quantities of tokens to transfer
	 * @param _data data payload
	 */
	function safeTransferBatch(
		address _operator,
		address _fromAccount,
		address _toAccount,
		uint256[] memory _tokenIds,
		uint256[] memory _amounts,
		bytes memory _data
	) internal {
		if (_toAccount == address(0)) revert LibERC1155__TransferToZeroAddress();
		if (_tokenIds.length != _amounts.length) revert LibERC1155__ArrayLengthMismatch();

		_beforeTokenTransfer(_operator, _fromAccount, _toAccount, _tokenIds, _amounts, _data);

		ERC1155Storage storage e1155s = LibERC1155Storage.layout();

		checkAllowanceBach(_operator, _fromAccount, _tokenIds, _amounts);

		for (uint256 i; i < _tokenIds.length; ) {
			uint256 tokenId = _tokenIds[i];
			uint256 amount = _amounts[i];

			unchecked {
				_whenTokenNotPaused(e1155s, tokenId);

				uint256 senderBalance = e1155s.balances[tokenId][_fromAccount];

				if (amount > senderBalance) revert LibERC1155__TransferExceedsBalance();

				e1155s.balances[tokenId][_fromAccount] = senderBalance - amount;

				if (_operator != _fromAccount) {
					if (e1155s.operatorSpendingLimitEnabled[tokenId]) {
						e1155s.allowances[_fromAccount][_operator][tokenId] = e1155s.allowances[_fromAccount][_operator][tokenId] - amount;
					}
				}

				i++;
			}

			// balance increase cannot be unchecked because ERC1155Base neither tracks nor validates a totalSupply
			e1155s.balances[tokenId][_toAccount] += amount;
		}

		emit TransferBatch(_operator, _fromAccount, _toAccount, _tokenIds, _amounts);

		_afterTokenTransfer(_operator, _fromAccount, _toAccount, _tokenIds, _amounts, _data);

		_doSafeBatchTransferAcceptanceCheck(_operator, _fromAccount, _toAccount, _tokenIds, _amounts, _data);
	}

	/**
	 * @notice Enable or disable approval for a third party ("operator") to manage all of the caller's tokens.
	 * @dev MUST emit the ApprovalForAll event on success.
	 * @param _account The owner of the tokens
	 * @param _operator Address to add to the set of authorized operators
	 * @param _approved True if the operator is approved, false to revoke approval
	 */
	function setApprovalForAll(address _account, address _operator, bool _approved) internal {
		if (_account == _operator) revert LibERC1155__SelfApproval();
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		e1155s.operatorApprovals[_account][_operator] = _approved;
		emit ApprovalForAll(_account, _operator, _approved);
	}

	/**
	 * @notice Queries the approval status of an operator for a given owner.
	 * @param _account The owner of the tokens
	 * @param _operator Address of authorized operator
	 * @return True if the operator is approved, false if not
	 */
	function isApprovedForAll(address _account, address _operator) internal view returns (bool) {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		return e1155s.operatorApprovals[_account][_operator];
	}

	/************************************************************************************************************
	 *
	 * IERC1155Receiver
	 *
	 ************************************************************************************************************/
	bytes4 internal constant ERC1155_ACCEPTED = 0xf23a6e61; // bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))
	bytes4 internal constant ERC1155_BATCH_ACCEPTED = 0xbc197c81; // bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))

	function onERC1155Received(
		address _operator,
		address _from,
		uint256 _id,
		uint256 _value,
		bytes calldata _data
	) internal returns (bytes4) {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		ERC1155ReceiverStorage storage receivedData = e1155s.receivedTokens[e1155s.receivedTokensLength];
		receivedData.operator = _operator;
		receivedData.from = _from;
		receivedData.ids = _asSingletonArray(_id);
		receivedData.values = _asSingletonArray(_value);
		receivedData.data = _data;
		e1155s.receivedTokensLength++;

		// if (shouldReject == true) {
		// 	revert("onERC1155Received: transfer not accepted");
		// } else {
		// 	return ERC1155_ACCEPTED;
		// }
		return ERC1155_ACCEPTED;
	}

	function onERC1155BatchReceived(
		address _operator,
		address _from,
		uint256[] calldata _ids,
		uint256[] calldata _values,
		bytes calldata _data
	) internal returns (bytes4) {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		ERC1155ReceiverStorage storage receivedData = e1155s.receivedTokens[e1155s.receivedTokensLength];
		receivedData.operator = _operator;
		receivedData.from = _from;
		receivedData.ids = _ids;
		receivedData.values = _values;
		receivedData.data = _data;
		e1155s.receivedTokensLength++;
		return ERC1155_BATCH_ACCEPTED;
	}

	/************************************************************************************************************
	 *
	 * IERC1155Allowance
	 *
	 ************************************************************************************************************/

	function isOperatorSpendingLimitEnabled(uint256 _tokenId) internal view returns (bool) {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		return e1155s.operatorSpendingLimitEnabled[_tokenId];
	}

	function setOperatorSpendingLimitEnabled(uint256 _tokenId, bool _enabled) internal {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		e1155s.operatorSpendingLimitEnabled[_tokenId] = _enabled;
	}

	/**
	 * @notice Allow other accounts/contracts to spend tokens on behalf of msg.sender
	 * @dev MUST emit Approval event on success.
	 * To minimize the risk of the approve/transferFrom attack vector (see https://docs.google.com/document/d/1YLPtQxZu1UAvO9cZ1O2RPXBbT0mooh4DYKjA_jp-RLM/), this function will throw if the current approved allowance does not equal the expected _currentValue, unless _value is 0.
	 * @param _owner Address of token owner
	 * @param _operator Address to approve, _operator will ba able to send token
	 * @param _tokenId ID of the Token
	 * @param _currentValue Expected current value of approved allowance.
	 * @param _newValue Allowance amount
	 */
	function approve(address _owner, address _operator, uint256 _tokenId, uint256 _currentValue, uint256 _newValue) internal {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		require(e1155s.allowances[_owner][_operator][_tokenId] == _currentValue, "Current value mismatch");
		e1155s.allowances[_owner][_operator][_tokenId] = _newValue;

		emit Approval(_owner, _operator, _tokenId, _currentValue, _newValue);
	}

	/**
	 * @notice Queries the spending limit approved for an account
	 * @param _owner The owner allowing the spending
	 * @param _operator The address allowed to spend.
	 * @param _tokenId ID of the Token
	 * @return The _operator's allowed spending balance of the Token requested
	 */
	function allowance(address _owner, address _operator, uint256 _tokenId) internal view returns (uint256) {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		return e1155s.allowances[_owner][_operator][_tokenId];
	}

	function checkAllowance(address _operator, address _fromAccount, uint256 _tokenId, uint256 _value) internal view {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		if (_fromAccount != _operator) {
			if (!e1155s.operatorApprovals[_fromAccount][_operator]) {
				revert LibERC1155__NotOwnerOrApproved();
			}
			if (e1155s.operatorSpendingLimitEnabled[_tokenId] && e1155s.allowances[_fromAccount][_operator][_tokenId] < _value) {
				revert LibERC1155__NotOwnerOrApprovedLimit();
			}
		}
	}

	function checkAllowanceBach(
		address _operator,
		address _fromAccount,
		uint256[] memory _tokenIds,
		uint256[] memory _amounts
	) internal view {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		if (_fromAccount != _operator) {
			if (!e1155s.operatorApprovals[_fromAccount][_operator]) {
				revert LibERC1155__NotOwnerOrApproved();
			}

			if (_tokenIds.length != _amounts.length) revert LibERC1155__ArrayLengthMismatch();

			for (uint256 i; i < _tokenIds.length; ) {
				unchecked {
					uint256 tokenId = _tokenIds[i];
					uint256 amount = _amounts[i];
					if (e1155s.operatorSpendingLimitEnabled[tokenId] && e1155s.allowances[_fromAccount][_operator][tokenId] < amount) {
						revert LibERC1155__NotOwnerOrApprovedLimit();
					}
					i++;
				}
			}
		}
	}

	/************************************************************************************************************
	 *
	 * IERC1155Metadata
	 *
	 ************************************************************************************************************/

	/**
	 * @notice Query global metadata URI, can contain {id}, client will replace with a valid token id
	 */
	function getUri() internal view returns (string memory) {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		return e1155s.uri;
	}

	/**
	 * @notice set global metadata URI, can contain {id}, client will
	 * @param _URI global URI
	 */
	function setURI(string memory _URI) internal {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		e1155s.uri = _URI;
	}

	function getTokenBaseUri() internal view returns (string memory) {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		return e1155s.baseURI;
	}

	/**
	 * @notice set base metadata URI
	 * @dev base URI is a non-standard feature adapted from the ERC721 specification
	 * @param _baseURI base URI
	 */
	function setTokenBaseURI(string memory _baseURI) internal {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		e1155s.baseURI = _baseURI;
	}

	function getTokenUri(uint256 _tokenId) internal view returns (string memory) {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		return e1155s.tokenURIs[_tokenId];
	}

	/**
	 * @notice set pre-token metadata URI
	 * @param _tokenId token whose metadata URI to set
	 * @param _tokenURI per-token URI
	 */
	function setTokenURI(uint256 _tokenId, string memory _tokenURI) internal {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		e1155s.tokenURIs[_tokenId] = _tokenURI;
		emit URI(_tokenURI, _tokenId);
	}

	/**
	 * This implementation returns the concatenation of the `_baseURI`
	 * and the token-specific uri if the latter is set
	 *
	 * This enables the following behaviors:
	 *
	 * - if `_tokenURIs[tokenId]` is set, then the result is the concatenation
	 *   of `_baseURI` and `_tokenURIs[tokenId]`
	 *
	 * - if `_tokenURIs[tokenId]` is NOT set then we fallback to the defaut URI
	 *   which contains `ERC1155.uri`;
	 */
	function getUri(uint256 tokenId) internal view returns (string memory) {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		string memory tokenURI = e1155s.tokenURIs[tokenId];

		// If token URI is set, concatenate base URI and tokenURI (via abi.encodePacked).
		return bytes(tokenURI).length > 0 ? string(abi.encodePacked(e1155s.baseURI, tokenURI)) : e1155s.uri;
	}

	/************************************************************************************************************
	 *
	 * IERC1155Enumerable
	 *
	 ************************************************************************************************************/

	/**
	 * @notice query total minted supply of given token
	 * @param _tokenId token id to query
	 * @return token supply
	 */
	function totalSupply(uint256 _tokenId) internal view returns (uint256) {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		return e1155s.totalSupply[_tokenId];
	}

	/**
	 * @notice query total number of holders for given token
	 * @param id token id to query
	 * @return quantity of holders
	 */
	function totalHolders(uint256 id) internal view returns (uint256) {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		return e1155s.accountsByToken[id].length();
	}

	/**
	 * @notice query holders of given token
	 * @param _tokenId token id to query
	 * @return list of holder addresses
	 */
	function accountsByToken(uint256 _tokenId) internal view returns (address[] memory) {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		EnumerableSet.AddressSet storage accounts = e1155s.accountsByToken[_tokenId];

		address[] memory addresses = new address[](accounts.length());

		unchecked {
			for (uint256 i; i < accounts.length(); i++) {
				addresses[i] = accounts.at(i);
			}
		}

		return addresses;
	}

	/**
	 * @notice query tokens held by given address
	 * @param _account address to query
	 * @return list of token ids
	 */
	function tokensByAccount(address _account) internal view returns (uint256[] memory) {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		EnumerableSet.UintSet storage tokens = e1155s.tokensByAccount[_account];

		uint256[] memory ids = new uint256[](tokens.length());

		unchecked {
			for (uint256 i; i < tokens.length(); i++) {
				ids[i] = tokens.at(i);
			}
		}

		return ids;
	}

	/************************************************************************************************************
	 *
	 * IERC1155Pausable
	 *
	 ************************************************************************************************************/
	function whenNotPaused(ERC1155Storage storage e1155s) internal view {
		require(!e1155s.paused, "All token is paused!");
	}

	function _whenTokenNotPaused(ERC1155Storage storage e1155s, uint256 _tokenId) internal view {
		whenNotPaused(e1155s);
		require(!e1155s.pausedToken[_tokenId], "Token is paused!");
	}

	function whenNotPaused() internal view {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		whenNotPaused(e1155s);
	}

	function whenTokenNotPaused(uint256 _tokenId) internal view {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		_whenTokenNotPaused(e1155s, _tokenId);
	}

	function pauseAllToken(address _operator) internal {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		require(!e1155s.paused, "All tokens are already paused");
		e1155s.paused = true;
		emit AllTokenPaused(_operator);
	}

	function unpauseAllToken(address _operator) internal {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		require(e1155s.paused, "All tokens are not paused yet");
		e1155s.paused = false;
		emit AllTokenUnpaused(_operator);
	}

	function pauseToken(address _operator, uint256 _tokenId) internal {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		require(!e1155s.pausedToken[_tokenId], "Token is already paused");
		e1155s.pausedToken[_tokenId] = true;
		emit TokenPaused(_operator, _tokenId);
	}

	function unpauseToken(address _operator, uint256 _tokenId) internal {
		ERC1155Storage storage e1155s = LibERC1155Storage.layout();
		require(e1155s.pausedToken[_tokenId], "Token is not paused yet");
		e1155s.pausedToken[_tokenId] = false;
		emit TokenUnpaused(_operator, _tokenId);
	}

	/************************************************************************************************************
	 *
	 * Library internal helper functions
	 *
	 ************************************************************************************************************/

	/**
	 * @notice revert if applicable transfer recipient is not valid ERC1155Receiver
	 * @param _operator executor of transfer
	 * @param _fromAccount sender of tokens
	 * @param _toAccount receiver of tokens
	 * @param _tokenId token ID
	 * @param _amount quantity of tokens to transfer
	 * @param _data data payload
	 */
	function _doSafeTransferAcceptanceCheck(
		address _operator,
		address _fromAccount,
		address _toAccount,
		uint256 _tokenId,
		uint256 _amount,
		bytes memory _data
	) internal {
		if (_toAccount.isContract()) {
			try IERC1155Receiver(_toAccount).onERC1155Received(_operator, _fromAccount, _tokenId, _amount, _data) returns (
				bytes4 response
			) {
				if (response != IERC1155Receiver.onERC1155Received.selector) revert LibERC1155__ERC1155ReceiverRejected();
			} catch Error(string memory reason) {
				revert(reason);
			} catch {
				revert LibERC1155__ERC1155ReceiverNotImplemented();
			}
		}
	}

	/**
	 * @notice revert if applicable transfer recipient is not valid ERC1155Receiver
	 * @param _operator executor of transfer
	 * @param _fromAccount sender of tokens
	 * @param _toAccount receiver of tokens
	 * @param _tokenIds token IDs
	 * @param _amounts quantities of tokens to transfer
	 * @param _data data payload
	 */
	function _doSafeBatchTransferAcceptanceCheck(
		address _operator,
		address _fromAccount,
		address _toAccount,
		uint256[] memory _tokenIds,
		uint256[] memory _amounts,
		bytes memory _data
	) private {
		if (_toAccount.isContract()) {
			try IERC1155Receiver(_toAccount).onERC1155BatchReceived(_operator, _fromAccount, _tokenIds, _amounts, _data) returns (
				bytes4 response
			) {
				if (response != IERC1155Receiver.onERC1155BatchReceived.selector) revert LibERC1155__ERC1155ReceiverRejected();
			} catch Error(string memory reason) {
				revert(reason);
			} catch {
				revert LibERC1155__ERC1155ReceiverNotImplemented();
			}
		}
	}

	function _asSingletonArray(uint256 element) internal pure returns (uint256[] memory) {
		uint256[] memory array = new uint256[](1);
		array[0] = element;
		return array;
	}

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
	 * @param _operator executor of transfer
	 * @param _fromAccount sender of tokens
	 * @param _toAccount receiver of tokens
	 * @param _tokenIds token IDs
	 * @param _amounts quantities of tokens to transfer
	 * @param _data data payload
	 */
	function _beforeTokenTransfer(
		address _operator,
		address _fromAccount,
		address _toAccount,
		uint256[] memory _tokenIds,
		uint256[] memory _amounts,
		bytes memory _data
	) internal {
		if (_fromAccount != _toAccount) {
			ERC1155Storage storage e1155s = LibERC1155Storage.layout();

			mapping(uint256 => EnumerableSet.AddressSet) storage tokenAccounts = e1155s.accountsByToken;

			EnumerableSet.UintSet storage fromAccountTokens = e1155s.tokensByAccount[_fromAccount];
			EnumerableSet.UintSet storage toAccountTokens = e1155s.tokensByAccount[_toAccount];

			for (uint256 i; i < _tokenIds.length; ) {
				uint256 amount = _amounts[i];

				if (amount > 0) {
					uint256 id = _tokenIds[i];

					if (_fromAccount == address(0)) {
						e1155s.totalSupply[id] += amount;
					} else if (balanceOf(_fromAccount, id) == amount) {
						tokenAccounts[id].remove(_fromAccount);
						fromAccountTokens.remove(id);
					}

					if (_toAccount == address(0)) {
						e1155s.totalSupply[id] -= amount;
					} else if (balanceOf(_toAccount, id) == 0) {
						tokenAccounts[id].add(_toAccount);
						toAccountTokens.add(id);
					}
				}

				unchecked {
					i++;
				}
			}
		}
		LibERC1155Customization.beforeTokenTransfer(_operator, _fromAccount, _toAccount, _tokenIds, _amounts, _data);
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
	 * @param _operator executor of transfer
	 * @param _fromAccount sender of tokens
	 * @param _toAccount receiver of tokens
	 * @param _tokenIds token IDs
	 * @param _amounts quantities of tokens to transfer
	 * @param _data data payload
	 */
	function _afterTokenTransfer(
		address _operator,
		address _fromAccount,
		address _toAccount,
		uint256[] memory _tokenIds,
		uint256[] memory _amounts,
		bytes memory _data
	) internal {
		LibERC1155Customization.afterTokenTransfer(_operator, _fromAccount, _toAccount, _tokenIds, _amounts, _data);
	}
}
