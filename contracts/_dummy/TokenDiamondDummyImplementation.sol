
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * This is a generated dummy diamond implementation for compatibility with
 * etherscan. For full contract implementation, check out the diamond on https://louper.dev
 */

contract TokenDiamondDummyImplementation {


    struct Tuple6871229 {
        address facetAddress;
        uint8 action;
        bytes4[] functionSelectors;
    }

    struct Tuple1236461 {
        address facetAddress;
        bytes4[] functionSelectors;
    }
    

   function diamondCut(Tuple6871229[] memory _diamondCut, address  _init, bytes memory _calldata) external {}

   function facetAddress(bytes4  _functionSelector) external view returns (address  facetAddress_) {}

   function facetAddresses() external view returns (address[] memory facetAddresses_) {}

   function facetFunctionSelectors(address  _facet) external view returns (bytes4[] memory facetFunctionSelectors_) {}

   function facets() external view returns (Tuple1236461[] memory facets_) {}

   function supportsInterface(bytes4  _interfaceId) external view returns (bool ) {}

   function implementation() external view returns (address ) {}

   function setDummyImplementation(address  _implementation) external {}

   function owner() external view returns (address ) {}

   function transferOwnership(address  _newOwner) external {}

   function PAUSABLE_FULL() external view returns (bytes32 ) {}

   function pause(bytes32  target) external {}

   function paused(bytes32  target) external view returns (bool  status_) {}

   function unpause(bytes32  target) external {}

   function AML_ROLE() external view returns (bytes32 ) {}

   function COMPLIANCE_ROLE() external view returns (bytes32 ) {}

   function TOKEN_ADMIN_ROLE() external view returns (bytes32 ) {}

   function TREASURY_ROLE() external view returns (bytes32 ) {}

   function getRoleAdmin(bytes32  role) external view returns (bytes32 ) {}

   function grantRole(bytes32  role, address  account) external {}

   function hasRole(bytes32  role, address  account) external view returns (bool ) {}

   function renounceRole(bytes32  role) external {}

   function revokeRole(bytes32  role, address  account) external {}

   function setRoleAdmin(bytes32  role, bytes32  adminRole) external {}

   function getGeneralFee() external view returns (uint16 ) {}

   function getGeneralFeeAddress() external view returns (address ) {}

   function getPoolFee() external view returns (uint16 ) {}

   function getPoolFeeAddress() external view returns (address ) {}

   function getTreasuryAddress() external view returns (address ) {}

   function getURL() external view returns (string memory) {}

   function setGeneralFee(uint16  _generalFee) external {}

   function setGeneralFeeAddress(address  _generalFeeAddress) external {}

   function setPoolFee(uint16  _PoolFee) external {}

   function setPoolFeeAddress(address  _PoolFeeAddress) external {}

   function setTreasuryAddress(address  _treasuryAddress) external {}

   function setURL(string memory _url) external {}

   function RECIPIENT_BLACKLIST() external view returns (bytes32 ) {}

   function SENDER_BLACKLIST() external view returns (bytes32 ) {}

   function getAccountBlackWhiteList(bytes32  _target, address  _account) external view returns (bool ) {}

   function getDestinationAccountBL(address  _account) external view returns (bool ) {}

   function getSourceAccountBL(address  _account) external view returns (bool ) {}

   function setAccountBlackWhiteList(bytes32  _target, address  _account, bool  _lockValue) external {}

   function setBatchDestinationAccountBL(address[] memory _addresses, bool  _lockValue) external {}

   function setBatchSourceAccountBL(address[] memory _addresses, bool  _lockValue) external {}

   function setDestinationAccountBL(address  _account, bool  _lockValue) external {}

   function setSourceAccountBL(address  _account, bool  _lockValue) external {}

   function withdrawUserTokenByCompliance(address  _account) external {}

   function allowance(address  holder, address  spender) external view returns (uint256  allowance_) {}

   function approve(address  spender, uint256  amount) external returns (bool  status_) {}

   function balanceOf(address  account) external view returns (uint256  balance_) {}

   function burn(uint256  amount) external {}

   function burnFrom(address  account, uint256  amount) external {}

   function decimals() external view returns (uint8 ) {}

   function decreaseAllowance(address  spender, uint256  amount) external returns (bool ) {}

   function increaseAllowance(address  spender, uint256  amount) external returns (bool ) {}

   function mint(address  account, uint256  amount) external {}

   function name() external view returns (string memory) {}

   function symbol() external view returns (string memory) {}

   function totalSupply() external view returns (uint256  totalSupply_) {}

   function transfer(address  recipient, uint256  amount) external returns (bool  status_) {}

   function transferFrom(address  holder, address  recipient, uint256  amount) external returns (bool  status_) {}
}
