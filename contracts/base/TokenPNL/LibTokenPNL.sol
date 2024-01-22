// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

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

		// console.log("ChangeTotalValue");
		// console.log("_tokenId", _tokenId);
		// if (inventory.sumAmount >= 0) {
		// 	console.log("inventory.sumAmount", uint256(inventory.sumAmount));
		// } else {
		// 	console.log("inventory.sumAmount -", uint256(-1 * inventory.sumAmount));
		// }

		// if (inventory.sumPnl >= 0) {
		// 	console.log("inventory.sumPnl", uint256(inventory.sumPnl));
		// } else {
		// 	console.log("inventory.sumPnl -", uint256(-1 * inventory.sumPnl));
		// }
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
	) internal view returns (InventoryItem memory inventoryItem) {
		TokenPNLStorage storage tokenPNL = LibTokenPNLStorage.layout();
		Inventory storage inventory = tokenPNL.inventory[_contract][_tokenId];
		inventoryItem = inventory.divident[_account];
	}

	function _refreshDividentInternal(Inventory storage inventory, address _account, int256 _quantity) internal {
		InventoryItem storage inventoryItem = inventory.divident[_account];

		require(inventory.sumQuantity + _quantity >= 0, "Pool token quanity can't be less then zero!");
		require(inventoryItem.quantity + _quantity >= 0, "User token quanity can't be less then zero!");

		// console.log("_refreshDividentInternal");
		// console.log("account", _account);

		// if (inventory.sumQuantity >= 0) {
		// 	console.log("inventory.sumQuantity", uint256(inventory.sumQuantity));
		// } else {
		// 	console.log("inventory.sumQuantity -", uint256(-1 * inventory.sumQuantity));
		// }
		// if (inventory.sumPnl >= 0) {
		// 	console.log("inventory.sumPnl", uint256(inventory.sumPnl));
		// } else {
		// 	console.log("inventory.sumPnl -", uint256(-1 * inventory.sumPnl));
		// }

		int256 addressPnlDelta = 0;
		if (inventory.sumQuantity != 0) {
			addressPnlDelta = (inventory.sumPnl * _quantity) / inventory.sumQuantity;
		}
		// if (addressPnlDelta >= 0) {
		// 	console.log("addressPnlDelta", uint256(addressPnlDelta));
		// } else {
		// 	console.log("addressPnlDelta -", uint256(-1 * addressPnlDelta));
		// }

		inventory.sumQuantity = inventory.sumQuantity + _quantity;
		inventory.sumPnl = inventory.sumPnl + addressPnlDelta;
		inventoryItem.quantity = inventoryItem.quantity + _quantity;
		inventoryItem.deltaPnl = inventoryItem.deltaPnl - addressPnlDelta;

		// if (inventory.sumQuantity >= 0) {
		// 	console.log("NEW inventory.sumQuantity", uint256(inventory.sumQuantity));
		// } else {
		// 	console.log("NEW inventory.sumQuantity -", uint256(-1 * inventory.sumQuantity));
		// }
		// if (inventory.sumPnl >= 0) {
		// 	console.log("NEW inventory.sumPnl", uint256(inventory.sumPnl));
		// } else {
		// 	console.log("NEW inventory.sumPnl -", uint256(-1 * inventory.sumPnl));
		// }
		// if (inventoryItem.quantity >= 0) {
		// 	console.log("NEW inventoryItem.quantity", uint256(inventoryItem.quantity));
		// } else {
		// 	console.log("NEW inventoryItem.quantity -", uint256(-1 * inventoryItem.quantity));
		// }
		// if (inventoryItem.deltaPnl >= 0) {
		// 	console.log("NEW inventoryItem.deltaPnl", uint256(inventoryItem.deltaPnl));
		// } else {
		// 	console.log("NEW inventoryItem.deltaPnl -", uint256(-1 * inventoryItem.deltaPnl));
		// }
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

		// console.log("calcDivident");
		// if (inventory.sumPnl >= 0) {
		// 	console.log("inventory.sumPnl", uint256(inventory.sumPnl));
		// } else {
		// 	console.log("inventory.sumPnl -", uint256(-1 * inventory.sumPnl));
		// }
		// if (inventoryItem.quantity >= 0) {
		// 	console.log("inventoryItem.quantity", uint256(inventoryItem.quantity));
		// } else {
		// 	console.log("inventoryItem.quantity -", uint256(-1 * inventoryItem.quantity));
		// }
		// if (inventory.sumQuantity >= 0) {
		// 	console.log("inventory.sumQuantity", uint256(inventory.sumQuantity));
		// } else {
		// 	console.log("inventory.sumQuantity -", uint256(-1 * inventory.sumQuantity));
		// }
		// if (inventoryItem.deltaPnl >= 0) {
		// 	console.log("inventoryItem.deltaPnl", uint256(inventoryItem.deltaPnl));
		// } else {
		// 	console.log("inventoryItem.deltaPnl -", uint256(-1 * inventoryItem.deltaPnl));
		// }
		// if (inventoryItem.payedPnl >= 0) {
		// 	console.log("inventoryItem.payedPnl", uint256(inventoryItem.payedPnl));
		// } else {
		// 	console.log("inventoryItem.payedPnl -", uint256(-1 * inventoryItem.payedPnl));
		// }
		// if (actDivident >= 0) {
		// 	console.log("actDivident", uint256(actDivident));
		// } else {
		// 	console.log("actDivident -", uint256(-1 * actDivident));
		// }

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
