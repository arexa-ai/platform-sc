// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

import "./LibTokenPNLStorage.sol";

library LibTokenPNL {
	function initTokenPNL(address _contract, uint256 _tokenId) internal {
		TokenPNLStorage storage tokenPNL = LibTokenPNLStorage.layout();
		Inventory storage inventory = tokenPNL.inventory[_contract][_tokenId];
		inventory.isEnabled = true;
		inventory.sumQuantity = 0;
		inventory.sumAmount = 0;
		inventory.sumPnl = 0;
	}

	function changeTotalValue(address _contract, uint256 _tokenId, int256 _amount) internal {
		TokenPNLStorage storage tokenPNL = LibTokenPNLStorage.layout();
		Inventory storage inventory = tokenPNL.inventory[_contract][_tokenId];
		if (!inventory.isEnabled) {
			return;
		}

		//because every transfer, mint and burn do like ralizing the pnl
		//and after this realizing the user can payout the collected a PNL
		//so decreasing the value can cause money loss in the contract!!!
		//if wanted full inventory feature in a distributed way: ask uSmart ;)
		require(_amount >= 0, "Pool can only increase!");

		inventory.sumAmount += _amount;
		inventory.sumPnl += _amount; //Here is the MAGIC!
	}

	function getInventory(
		address _contract,
		uint256 _tokenId
	) internal view returns (bool isEnabled, int256 sumQuantity, int256 sumAmount, int256 sumPnl) {
		//
		TokenPNLStorage storage tokenPNL = LibTokenPNLStorage.layout();
		Inventory storage inventory = tokenPNL.inventory[_contract][_tokenId];
		return (inventory.isEnabled, inventory.sumQuantity, inventory.sumAmount, inventory.sumPnl);
	}

	function getInventoryItem(
		address _contract,
		uint256 _tokenId,
		address _account
	) internal view returns (int256 quantity, int256 deltaPnl, int256 payedPnl) {
		TokenPNLStorage storage tokenPNL = LibTokenPNLStorage.layout();
		Inventory storage inventory = tokenPNL.inventory[_contract][_tokenId];
		return (inventory.divident[_account].quantity, inventory.divident[_account].deltaPnl, inventory.divident[_account].payedPnl);
	}

	function _refreshDividentInternal(Inventory storage inventory, address _account, int256 _quantity) internal {
		InventoryItem storage inventoryItem = inventory.divident[_account];

		require(inventory.sumQuantity + _quantity >= 0, "Pool token quanity can't be less then zero!");
		require(inventoryItem.quantity + _quantity >= 0, "User token quanity can't be less then zero!");

		int256 addressPnlDelta = 0;
		if (inventory.sumQuantity != 0) {
			addressPnlDelta = (inventory.sumPnl * _quantity) / inventory.sumQuantity;
		}

		inventory.sumQuantity = inventory.sumQuantity + _quantity;
		inventory.sumPnl = inventory.sumPnl + addressPnlDelta;
		inventoryItem.quantity = inventoryItem.quantity + _quantity;
		inventoryItem.deltaPnl = inventoryItem.deltaPnl - addressPnlDelta;
	}

	function refreshDivident(address _contract, uint256 _tokenId, address _fromAccount, address _toAccount, uint256 _quantity) internal {
		TokenPNLStorage storage tokenPNL = LibTokenPNLStorage.layout();
		Inventory storage inventory = tokenPNL.inventory[_contract][_tokenId];
		if (!inventory.isEnabled) {
			return;
		}

		if (_fromAccount != address(0)) {
			_refreshDividentInternal(inventory, _fromAccount, -1 * int256(_quantity));
		}

		if (_toAccount != address(0)) {
			_refreshDividentInternal(inventory, _toAccount, int256(_quantity));
		}
	}

	function calcDivident(address _contract, uint256 _tokenId, address _account) internal view returns (int256) {
		if (_account == address(0)) {
			return 0;
		}

		TokenPNLStorage storage tokenPNL = LibTokenPNLStorage.layout();
		Inventory storage inventory = tokenPNL.inventory[_contract][_tokenId];
		if (!inventory.isEnabled) {
			return 0;
		}

		InventoryItem storage inventoryItem = inventory.divident[_account];
		//calculate actual value of the token
		int256 actValue = 0;
		if (inventory.sumQuantity != 0) {
			actValue = (inventory.sumPnl * inventoryItem.quantity) / inventory.sumQuantity;
		}
		//the divident is equal with the actual value minus the summa pnlDelta
		//note: the pnlDelta already have the negative sign!!!
		int256 actDivident = actValue + inventoryItem.deltaPnl - inventoryItem.payedPnl;

		return actDivident;
	}

	function refreshPayoutDivident(address _contract, uint256 _tokenId, address _account, int256 _amount) internal {
		TokenPNLStorage storage tokenPNL = LibTokenPNLStorage.layout();
		Inventory storage inventory = tokenPNL.inventory[_contract][_tokenId];
		if (!inventory.isEnabled) {
			return;
		}
		require(_amount >= 0, "Only positive amount can be payed out!");

		int256 payableDivident = calcDivident(_contract, _tokenId, _account);

		require(_amount <= payableDivident, "The amount is bigger then tha payable divident!");

		InventoryItem storage inventoryItem = inventory.divident[_account];
		inventoryItem.payedPnl = inventoryItem.payedPnl + _amount;
	}
}
