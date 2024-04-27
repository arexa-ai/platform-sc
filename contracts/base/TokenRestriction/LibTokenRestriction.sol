// SPDX-License-Identifier: MIT
/**
 * Copyright (C) 2024 uSmart
 */
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

import "./LibTokenRestrictionStorage.sol";
import "../../base/ERC1155/base/LibERC1155.sol";
import "../../utils/Math.sol";

import { IERC20 } from "../../base/ERC20/IERC20.sol";

library LibTokenRestriction {
	function initTokenRestriction(uint256 _tokenId, uint256 _endOfRestriction, uint256 _endOfRestrictionCalc, uint256 _timeDelta) internal {
		// require(block.number + 12 * _timeDelta < _endOfRestriction);
		// require(_endOfRestriction + 12 * _timeDelta < _endOfRestrictionCalc);

		TokenRestrictionStorage storage arexa = LibTokenRestrictionStorage.layout();
		Restriction storage restriction = arexa.tokenRestriction[_tokenId];
		if ((restriction.endOfRestrictionCalc == 0) || (restriction.endOfRestriction + 1 == restriction.endOfRestrictionCalc)) {
			restriction.endOfRestriction = _endOfRestriction;
			restriction.endOfRestrictionCalc = _endOfRestrictionCalc;
			restriction.timeDelta = _timeDelta;
		}
	}

	function calcUnrestrictedAmount(address _account, uint256 _tokenId, uint256 _amount) internal view returns (uint256) {
		TokenRestrictionStorage storage arexa = LibTokenRestrictionStorage.layout();
		Restriction storage restriction = arexa.tokenRestriction[_tokenId];

		if (restriction.endOfRestrictionCalc < block.number) {
			return _amount;
		}

		// if (restriction.endOfRestriction < block.number) {
		// 	return _amount;
		// }

		RestrictionCalc storage accRestr = restriction.restriction[_account];

		//=FLOOR.MATH(FLOOR.MATH((K8-I8)/L8)*(E8-M8)/12)
		//=FLOOR.MATH(FLOOR.MATH((actTime-time)/timeDelta)*(bought-accumulated)/12)
		// console.log("calcUnrestrictedAmount");
		// console.log("account", _account);
		// console.log("blocknumber", block.number);
		// console.log("accRestr.time", accRestr.time);
		// console.log("restriction.timeDelta", restriction.timeDelta);
		// console.log("accRestr.bought", accRestr.bought);
		// console.log("accRestr.accumulated", accRestr.accumulated);
		uint256 helper = ((block.number - accRestr.time) / restriction.timeDelta) * ((accRestr.bought - accRestr.accumulated) / 12);
		// console.log("helper", helper);

		//=MIN(M10+Q10;E10)-G10
		//=MIN(accumulated+helper;bought)-sold
		uint256 canSell = Math.min(accRestr.accumulated + helper, accRestr.bought) - accRestr.sold;
		// console.log("canSell", canSell);

		return canSell;
	}

	function checkRestriction(address _account, uint256 _tokenId, uint256 _amount) internal view returns (bool) {
		TokenRestrictionStorage storage arexa = LibTokenRestrictionStorage.layout();
		Restriction storage restriction = arexa.tokenRestriction[_tokenId];

		if (restriction.endOfRestrictionCalc <= block.number) {
			return true;
		}

		// if (restriction.endOfRestriction < block.number) {
		// 	return;
		// }

		RestrictionCalc storage accRestr = restriction.restriction[_account];

		//=FLOOR.MATH(FLOOR.MATH((K8-I8)/L8)*(E8-M8)/12)
		//=FLOOR.MATH(FLOOR.MATH((actTime-time)/timeDelta)*(bought-accumulated)/12)
		// console.log("CheckRestriction");
		// console.log("account", _account);
		// console.log("blocknumber", block.number);
		// console.log("accRestr.time", accRestr.time);
		// console.log("restriction.timeDelta", restriction.timeDelta);
		// console.log("accRestr.bought", accRestr.bought);
		// console.log("accRestr.accumulated", accRestr.accumulated);
		uint256 helper = ((block.number - accRestr.time) / restriction.timeDelta) * ((accRestr.bought - accRestr.accumulated) / 12);
		// console.log("helper", helper);

		//=MIN(M10+Q10;E10)-G10
		//=MIN(accumulated+helper;bought)-sold
		uint256 canSell = Math.min(accRestr.accumulated + helper, accRestr.bought) - accRestr.sold;
		// console.log("canSell", canSell);

		require(_amount <= canSell, "The amount is grater then the accumlated ('sellable') amount!");

		return true;
	}

	function checkRestrictions(address _account, uint256[] memory _tokenIds, uint256[] memory _amounts) internal view returns (bool) {
		if (_tokenIds.length != _amounts.length) revert LibERC1155__ArrayLengthMismatch();

		for (uint256 i; i < _tokenIds.length; ) {
			checkRestriction(_account, _tokenIds[i], _amounts[i]);
			unchecked {
				i++;
			}
		}

		return true;
	}

	function recalcRestriction(address _account, uint256 _tokenId, uint256 _amount, uint8 _direction) internal {
		//eladható mennyiség kalkulációhoz
		TokenRestrictionStorage storage arexa = LibTokenRestrictionStorage.layout();
		Restriction storage restriction = arexa.tokenRestriction[_tokenId];

		if (restriction.endOfRestrictionCalc <= block.number) {
			return;
		}

		RestrictionCalc storage accRestr = restriction.restriction[_account];

		if (restriction.endOfRestriction <= block.number) {
			//valami mást kell csinálni
			if (_direction == 1) {
				accRestr.bought += _amount;
				accRestr.accumulated += _amount;
			}
			return;
		}

		//frissíteni üzemszerűen.
		//=FLOOR.MATH(FLOOR.MATH((J12-I12)/L12)*(E12-M12)/12)
		//=FLOOR.MATH(FLOOR.MATH((actTime-time)/timeDelta)*(bought-accumlated)/12)
		// console.log("RecalcRestriction");
		// console.log("account", _account);
		// console.log("blocknumber", block.number);
		// console.log("accRestr.time", accRestr.time);
		// console.log("restriction.timeDelta", restriction.timeDelta);
		// console.log("accRestr.bought", accRestr.bought);
		// console.log("accRestr.accumulated", accRestr.accumulated);
		uint256 helper = ((block.number - accRestr.time) / restriction.timeDelta) * ((accRestr.bought - accRestr.accumulated) / 12);
		// console.log("helper", helper);

		//=MIN(M12+N12; E12)
		//=MIN(accumulated+helper; bought)
		accRestr.accumulated = Math.min(accRestr.accumulated + helper, accRestr.bought);
		// console.log("NEW accRestr.accumulated", accRestr.accumulated);

		//vesz, elad
		if (_direction == 1) {
			accRestr.bought += _amount;
		} else {
			accRestr.sold += _amount;
		}

		accRestr.time = block.number;

		// console.log("NEW accRestr.bought", accRestr.bought);
		// console.log("NEW accRestr.sold", accRestr.sold);
		// console.log("NEW accRestr.time", accRestr.time);
	}

	function recalcRestrictions(address _account, uint256[] memory _tokenIds, uint256[] memory _amounts, uint8 _direction) internal {
		if (_tokenIds.length != _amounts.length) revert LibERC1155__ArrayLengthMismatch();

		for (uint256 i; i < _tokenIds.length; ) {
			recalcRestriction(_account, _tokenIds[i], _amounts[i], _direction);
			unchecked {
				i++;
			}
		}
	}
}
