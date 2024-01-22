/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  ArexaPfmTokenFacet,
  ArexaPfmTokenFacetInterface,
} from "../../ArexaPlatform/ArexaPfmTokenFacet";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "LibERC1155__ArrayLengthMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "LibERC1155__BalanceQueryZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "LibERC1155__ERC1155ReceiverNotImplemented",
    type: "error",
  },
  {
    inputs: [],
    name: "LibERC1155__ERC1155ReceiverRejected",
    type: "error",
  },
  {
    inputs: [],
    name: "LibERC1155__NotOwnerOrApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "LibERC1155__NotOwnerOrApprovedLimit",
    type: "error",
  },
  {
    inputs: [],
    name: "LibERC1155__SelfApproval",
    type: "error",
  },
  {
    inputs: [],
    name: "LibERC1155__TransferExceedsBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "LibERC1155__TransferToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "TargetedPausable__TargetedPaused",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_owners",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "_ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_values",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50613af1806100206000396000f3fe608060405234801561001057600080fd5b50600436106100615760003560e01c8062fdd58e146100665780632eb2c2d6146100965780634e1273f4146100b2578063a22cb465146100e2578063e985e9c5146100fe578063f242432a1461012e575b600080fd5b610080600480360381019061007b9190612acd565b61014a565b60405161008d9190612b1c565b60405180910390f35b6100b060048036038101906100ab9190612bf2565b61015e565b005b6100cc60048036038101906100c79190612d24565b6102bf565b6040516100d99190612e63565b60405180910390f35b6100fc60048036038101906100f79190612ebd565b610357565b005b61011860048036038101906101139190612efd565b6103e9565b6040516101259190612f4c565b60405180910390f35b61014860048036038101906101439190612f67565b6103fd565b005b600061015683836104da565b905092915050565b6101666105a9565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146101d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ca9061305e565b60405180910390fd5b6000801b6101e0816105e1565b6102b4338a8a8a8a80806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f82011690508083019250505050505050898980806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f8201169050808301925050505050505088888080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050610624565b505050505050505050565b606061034d858580806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f82011690508083019250505050505050848480806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f82011690508083019250505050505050610ac8565b9050949350505050565b61035f6105a9565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146103cc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103c39061305e565b60405180910390fd5b6000801b6103d9816105e1565b6103e4338484610c1c565b505050565b60006103f58383610d8e565b905092915050565b6104056105a9565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610472576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104699061305e565b60405180910390fd5b6000801b61047f816105e1565b6104d1338888888888888080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050610e30565b50505050505050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610541576040517f4a772c2700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600061054b61125b565b905080600001600084815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205491505092915050565b6000806105b4611288565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b6105ea816112b5565b15610621576040517f2d0a436a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff160361068a576040517fa25202b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81518351146106c5576040517f583b4bea00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6106d38686868686866112e8565b60006106dd61125b565b90506106eb87878686611599565b60005b8451811015610a2457600085828151811061070c5761070b61307e565b5b60200260200101519050600085838151811061072b5761072a61307e565b5b6020026020010151905061073f848361182b565b600084600001600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050808211156107d0576040517fb38aedf300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81810385600001600085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508973ffffffffffffffffffffffffffffffffffffffff168b73ffffffffffffffffffffffffffffffffffffffff16146109ab5784600201600084815260200190815260200160002060009054906101000a900460ff16156109aa57818560030160008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008d73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002054038560030160008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008d73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000858152602001908152602001600020819055505b5b8380600101945050508084600001600084815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610a1691906130dc565b9250508190555050506106ee565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610a9b929190613110565b60405180910390a4610ab187878787878761189b565b610abf8787878787876118b1565b50505050505050565b60608151835114610b0e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b05906131b9565b60405180910390fd5b8251825114610b49576040517f583b4bea00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000835167ffffffffffffffff811115610b6657610b656131d9565b5b604051908082528060200260200182016040528015610b945781602001602082028036833780820191505090505b50905060005b8451811015610c1157610be1858281518110610bb957610bb861307e565b5b6020026020010151858381518110610bd457610bd361307e565b5b60200260200101516104da565b828281518110610bf457610bf361307e565b5b60200260200101818152505080610c0a90613208565b9050610b9a565b508091505092915050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610c81576040517f1f46a43700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000610c8b61125b565b9050818160010160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3184604051610d809190612f4c565b60405180910390a350505050565b600080610d9961125b565b90508060010160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1691505092915050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610e96576040517fa25202b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000610ea184611a76565b90506000610eae84611a76565b9050610ebe8888888585886112e8565b6000610ec861125b565b9050610ed4818761182b565b600081600001600088815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905080861115610f65576040517fb38aedf300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610f718a8a8989611af0565b85810382600001600089815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508873ffffffffffffffffffffffffffffffffffffffff168a73ffffffffffffffffffffffffffffffffffffffff161461114c5781600201600088815260200190815260200160002060009054906101000a900460ff161561114b57858260030160008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600089815260200190815260200160002054038260030160008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000898152602001908152602001600020819055505b5b8582600001600089815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546111ae91906130dc565b925050819055508773ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff168b73ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628a8a60405161122b929190613250565b60405180910390a46112418a8a8a87878a61189b565b61124f8a8a8a8a8a8a611ced565b50505050505050505050565b6000807fe20f5a7f7e820e4505f9ef8ed1186e372d3490e37d8001618819927829be4e0590508091505090565b6000807ff72346055b4d7224c7ec19860d22963ca622fbb313761bfba507c1a3aeedf37290508091505090565b60006112bf611eb2565b600001600083815260200190815260200160002060009054906101000a900460ff169050919050565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161461158357600061132561125b565b9050600081600501905060008260060160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008360060160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060005b875181101561157d5760008782815181106113da576113d961307e565b5b60200260200101519050600081111561156f5760008983815181106114025761140161307e565b5b60200260200101519050600073ffffffffffffffffffffffffffffffffffffffff168c73ffffffffffffffffffffffffffffffffffffffff16036114715781876004016000838152602001908152602001600020600082825461146591906130dc565b925050819055506114bc565b8161147c8d836104da565b036114bb576114a58c876000848152602001908152602001600020611edf90919063ffffffff16565b506114b98186611f0f90919063ffffffff16565b505b5b600073ffffffffffffffffffffffffffffffffffffffff168b73ffffffffffffffffffffffffffffffffffffffff1603611521578187600401600083815260200190815260200160002060008282546115159190613279565b9250508190555061156d565b600061152d8c836104da565b0361156c576115568b876000848152602001908152602001600020611f2990919063ffffffff16565b5061156a8185611f5990919063ffffffff16565b505b5b505b8180600101925050506113bc565b50505050505b611591868686868686611f73565b505050505050565b60006115a361125b565b90508473ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614611824578060010160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1661169a576040517f3d2f0b3700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81518351146116d5576040517f583b4bea00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b83518110156118225760008482815181106116f6576116f561307e565b5b6020026020010151905060008483815181106117155761171461307e565b5b6020026020010151905083600201600083815260200190815260200160002060009054906101000a900460ff1680156117dc5750808460030160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002054105b15611813576040517f32af163800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b828060010193505050506116d8565b505b5050505050565b61183482611fbb565b81600b01600082815260200190815260200160002060009054906101000a900460ff1615611897576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161188e906132f9565b60405180910390fd5b5050565b6118a9868686868686612010565b505050505050565b6118d08473ffffffffffffffffffffffffffffffffffffffff166120fe565b15611a6e578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b81526004016119169594939291906133b8565b6020604051808303816000875af192505050801561195257506040513d601f19601f8201168201806040525081019061194f9190613478565b60015b6119ee5761195e6134b2565b806308c379a0036119ba5750611972613505565b8061197d57506119bc565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119b191906135d9565b60405180910390fd5b505b6040517f4eebd08100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611a6c576040517f542073e700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff811115611a9557611a946131d9565b5b604051908082528060200260200182016040528015611ac35781602001602082028036833780820191505090505b5090508281600081518110611adb57611ada61307e565b5b60200260200101818152505080915050919050565b6000611afa61125b565b90508473ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614611ce6578060010160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611bf1576040517f3d2f0b3700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600201600084815260200190815260200160002060009054906101000a900460ff168015611cae5750818160030160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002054105b15611ce5576040517f32af163800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5b5050505050565b611d0c8473ffffffffffffffffffffffffffffffffffffffff166120fe565b15611eaa578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b8152600401611d529594939291906135fb565b6020604051808303816000875af1925050508015611d8e57506040513d601f19601f82011682018060405250810190611d8b9190613478565b60015b611e2a57611d9a6134b2565b806308c379a003611df65750611dae613505565b80611db95750611df8565b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ded91906135d9565b60405180910390fd5b505b6040517f4eebd08100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611ea8576040517f542073e700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505b505050505050565b6000807fe8ceb94393aac3e803a9d4b376f7c5ffd7e8b6caab697212a5360c34a283caa190508091505090565b6000611f07836000018373ffffffffffffffffffffffffffffffffffffffff1660001b612111565b905092915050565b6000611f21836000018360001b612111565b905092915050565b6000611f51836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6121f5565b905092915050565b6000611f6b836000018360001b6121f5565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614611fb357611fb285848461225c565b5b505050505050565b80600a0160009054906101000a900460ff161561200d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612004906136a1565b60405180910390fd5b50565b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16146120525761205185848460006122f5565b5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16146120945761209384848460016122f5565b5b60005b83518110156120f5576120e86120ab612390565b8583815181106120be576120bd61307e565b5b602002602001015188888786815181106120db576120da61307e565b5b60200260200101516123c8565b8080600101915050612097565b50505050505050565b600080823b905060008111915050919050565b600080836001016000848152602001908152602001600020549050600081146121ee576000846000016001866000018054905003815481106121565761215561307e565b5b906000526020600020015490508085600001600184038154811061217d5761217c61307e565b5b9060005260206000200181905550818560010160008381526020019081526020016000208190555050836000018054806121ba576121b96136c1565b5b6001900381819060005260206000200160009055905583600101600084815260200190815260200160002060009055600191505b5092915050565b600061220183836124fc565b6122565782600001829080600181540180825580915050600190039060005260206000200160009091909190915055826000018054905083600101600084815260200190815260200160002081905550600190505b92915050565b8051825114612297576040517f583b4bea00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b82518110156122ef576122e2848483815181106122ba576122b961307e565b5b60200260200101518484815181106122d5576122d461307e565b5b602002602001015161251f565b808060010191505061229a565b50505050565b8151835114612330576040517f583b4bea00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b83518110156123895761237c858583815181106123535761235261307e565b5b602002602001015185848151811061236e5761236d61307e565b5b602002602001015185612666565b8080600101915050612333565b5050505050565b60008061239b612804565b90508060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b60006123d2612831565b905060008160000160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600087815260200190815260200160002090508060000160009054906101000a900460ff166124475750506124f5565b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16146124b2576124b18186857fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6124ac91906136fa565b61285e565b5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16146124f2576124f181858561285e565b5b50505b5050505050565b600080836001016000848152602001908152602001600020541415905092915050565b60006125296129df565b90506000816000016000858152602001908152602001600020905043816001015411612556575050612661565b60008160030160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506000600c826003015483600001546125b39190613279565b6125bd91906137a1565b83600201548360020154436125d29190613279565b6125dc91906137a1565b6125e691906137d2565b90506000826001015461260c83856003015461260291906130dc565b8560000154612a0c565b6126169190613279565b90508086111561265b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161265290613886565b60405180910390fd5b50505050505b505050565b60006126706129df565b9050600081600001600086815260200190815260200160002090504381600101541161269d5750506127fe565b60008160030160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050438260000154116127375760018460ff160361272f578481600001600082825461270c91906130dc565b925050819055508481600301600082825461272791906130dc565b925050819055505b5050506127fe565b6000600c8260030154836000015461274f9190613279565b61275991906137a1565b836002015483600201544361276e9190613279565b61277891906137a1565b61278291906137d2565b90506127a181836003015461279791906130dc565b8360000154612a0c565b826003018190555060018560ff16036127d457858260000160008282546127c891906130dc565b925050819055506127f0565b858260010160008282546127e891906130dc565b925050819055505b438260020181905550505050505b50505050565b6000807f1a2f703e435318ee39feac62abda44020ca215505d5ba3284195182c842a2d3090508091505090565b6000807ff0375085caeab71645bf74d020ee2aa37bc7b653d9e55911c1084d8c88b3c05c90508091505090565b60008360040160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008285600101546128b591906138a6565b12156128f6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016128ed9061395c565b60405180910390fd5b600082826000015461290891906138a6565b1215612949576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612940906139ee565b60405180910390fd5b60008085600101541461297857846001015483866003015461296b91906136fa565b6129759190613a0e565b90505b82856001015461298891906138a6565b85600101819055508085600301546129a091906138a6565b85600301819055508282600001546129b891906138a6565b82600001819055508082600101546129d09190613a78565b82600101819055505050505050565b6000807fb666c964c288db81fc3205a9feeb13cfebbde2a4a4664c45ea26ef9d3d8de79290508091505090565b6000818311612a1b5782612a1d565b815b905092915050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000612a6482612a39565b9050919050565b612a7481612a59565b8114612a7f57600080fd5b50565b600081359050612a9181612a6b565b92915050565b6000819050919050565b612aaa81612a97565b8114612ab557600080fd5b50565b600081359050612ac781612aa1565b92915050565b60008060408385031215612ae457612ae3612a2f565b5b6000612af285828601612a82565b9250506020612b0385828601612ab8565b9150509250929050565b612b1681612a97565b82525050565b6000602082019050612b316000830184612b0d565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f840112612b5c57612b5b612b37565b5b8235905067ffffffffffffffff811115612b7957612b78612b3c565b5b602083019150836020820283011115612b9557612b94612b41565b5b9250929050565b60008083601f840112612bb257612bb1612b37565b5b8235905067ffffffffffffffff811115612bcf57612bce612b3c565b5b602083019150836001820283011115612beb57612bea612b41565b5b9250929050565b60008060008060008060008060a0898b031215612c1257612c11612a2f565b5b6000612c208b828c01612a82565b9850506020612c318b828c01612a82565b975050604089013567ffffffffffffffff811115612c5257612c51612a34565b5b612c5e8b828c01612b46565b9650965050606089013567ffffffffffffffff811115612c8157612c80612a34565b5b612c8d8b828c01612b46565b9450945050608089013567ffffffffffffffff811115612cb057612caf612a34565b5b612cbc8b828c01612b9c565b92509250509295985092959890939650565b60008083601f840112612ce457612ce3612b37565b5b8235905067ffffffffffffffff811115612d0157612d00612b3c565b5b602083019150836020820283011115612d1d57612d1c612b41565b5b9250929050565b60008060008060408587031215612d3e57612d3d612a2f565b5b600085013567ffffffffffffffff811115612d5c57612d5b612a34565b5b612d6887828801612cce565b9450945050602085013567ffffffffffffffff811115612d8b57612d8a612a34565b5b612d9787828801612b46565b925092505092959194509250565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b612dda81612a97565b82525050565b6000612dec8383612dd1565b60208301905092915050565b6000602082019050919050565b6000612e1082612da5565b612e1a8185612db0565b9350612e2583612dc1565b8060005b83811015612e56578151612e3d8882612de0565b9750612e4883612df8565b925050600181019050612e29565b5085935050505092915050565b60006020820190508181036000830152612e7d8184612e05565b905092915050565b60008115159050919050565b612e9a81612e85565b8114612ea557600080fd5b50565b600081359050612eb781612e91565b92915050565b60008060408385031215612ed457612ed3612a2f565b5b6000612ee285828601612a82565b9250506020612ef385828601612ea8565b9150509250929050565b60008060408385031215612f1457612f13612a2f565b5b6000612f2285828601612a82565b9250506020612f3385828601612a82565b9150509250929050565b612f4681612e85565b82525050565b6000602082019050612f616000830184612f3d565b92915050565b60008060008060008060a08789031215612f8457612f83612a2f565b5b6000612f9289828a01612a82565b9650506020612fa389828a01612a82565b9550506040612fb489828a01612ab8565b9450506060612fc589828a01612ab8565b935050608087013567ffffffffffffffff811115612fe657612fe5612a34565b5b612ff289828a01612b9c565b92509250509295509295509295565b600082825260208201905092915050565b7f4e4f545f414c4c4f574544000000000000000000000000000000000000000000600082015250565b6000613048600b83613001565b915061305382613012565b602082019050919050565b600060208201905081810360008301526130778161303b565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006130e782612a97565b91506130f283612a97565b925082820190508082111561310a576131096130ad565b5b92915050565b6000604082019050818103600083015261312a8185612e05565b9050818103602083015261313e8184612e05565b90509392505050565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b60006131a3602983613001565b91506131ae82613147565b604082019050919050565b600060208201905081810360008301526131d281613196565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600061321382612a97565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203613245576132446130ad565b5b600182019050919050565b60006040820190506132656000830185612b0d565b6132726020830184612b0d565b9392505050565b600061328482612a97565b915061328f83612a97565b92508282039050818111156132a7576132a66130ad565b5b92915050565b7f546f6b656e206973207061757365642100000000000000000000000000000000600082015250565b60006132e3601083613001565b91506132ee826132ad565b602082019050919050565b60006020820190508181036000830152613312816132d6565b9050919050565b61332281612a59565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015613362578082015181840152602081019050613347565b60008484015250505050565b6000601f19601f8301169050919050565b600061338a82613328565b6133948185613333565b93506133a4818560208601613344565b6133ad8161336e565b840191505092915050565b600060a0820190506133cd6000830188613319565b6133da6020830187613319565b81810360408301526133ec8186612e05565b905081810360608301526134008185612e05565b90508181036080830152613414818461337f565b90509695505050505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61345581613420565b811461346057600080fd5b50565b6000815190506134728161344c565b92915050565b60006020828403121561348e5761348d612a2f565b5b600061349c84828501613463565b91505092915050565b60008160e01c9050919050565b600060033d11156134d15760046000803e6134ce6000516134a5565b90505b90565b6134dd8261336e565b810181811067ffffffffffffffff821117156134fc576134fb6131d9565b5b80604052505050565b600060443d1061359257613517612a25565b60043d036004823e80513d602482011167ffffffffffffffff8211171561353f575050613592565b808201805167ffffffffffffffff81111561355d5750505050613592565b80602083010160043d03850181111561357a575050505050613592565b613589826020018501866134d4565b82955050505050505b90565b600081519050919050565b60006135ab82613595565b6135b58185613001565b93506135c5818560208601613344565b6135ce8161336e565b840191505092915050565b600060208201905081810360008301526135f381846135a0565b905092915050565b600060a0820190506136106000830188613319565b61361d6020830187613319565b61362a6040830186612b0d565b6136376060830185612b0d565b8181036080830152613649818461337f565b90509695505050505050565b7f416c6c20746f6b656e2069732070617573656421000000000000000000000000600082015250565b600061368b601483613001565b915061369682613655565b602082019050919050565b600060208201905081810360008301526136ba8161367e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b6000819050919050565b6000613705826136f0565b9150613710836136f0565b925082820261371e816136f0565b91507f80000000000000000000000000000000000000000000000000000000000000008414600084121615613756576137556130ad565b5b828205841483151761376b5761376a6130ad565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006137ac82612a97565b91506137b783612a97565b9250826137c7576137c6613772565b5b828204905092915050565b60006137dd82612a97565b91506137e883612a97565b92508282026137f681612a97565b9150828204841483151761380d5761380c6130ad565b5b5092915050565b7f54686520616d6f756e7420697320677261746572207468656e2074686520616360008201527f63756d6c6174656420282773656c6c61626c65272920616d6f756e7421000000602082015250565b6000613870603d83613001565b915061387b82613814565b604082019050919050565b6000602082019050818103600083015261389f81613863565b9050919050565b60006138b1826136f0565b91506138bc836136f0565b9250828201905082811215600083121683821260008412151617156138e4576138e36130ad565b5b92915050565b7f506f6f6c20746f6b656e207175616e6974792063616e2774206265206c65737360008201527f207468656e207a65726f21000000000000000000000000000000000000000000602082015250565b6000613946602b83613001565b9150613951826138ea565b604082019050919050565b6000602082019050818103600083015261397581613939565b9050919050565b7f5573657220746f6b656e207175616e6974792063616e2774206265206c65737360008201527f207468656e207a65726f21000000000000000000000000000000000000000000602082015250565b60006139d8602b83613001565b91506139e38261397c565b604082019050919050565b60006020820190508181036000830152613a07816139cb565b9050919050565b6000613a19826136f0565b9150613a24836136f0565b925082613a3457613a33613772565b5b600160000383147f800000000000000000000000000000000000000000000000000000000000000083141615613a6d57613a6c6130ad565b5b828205905092915050565b6000613a83826136f0565b9150613a8e836136f0565b9250828203905081811260008412168282136000851215161715613ab557613ab46130ad565b5b9291505056fea2646970667358221220c5dd277affe12c73d49c9fd29dd12dbe48f1bea9766921e9a000a992d2ca909364736f6c63430008110033";

type ArexaPfmTokenFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ArexaPfmTokenFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ArexaPfmTokenFacet__factory extends ContractFactory {
  constructor(...args: ArexaPfmTokenFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ArexaPfmTokenFacet> {
    return super.deploy(overrides || {}) as Promise<ArexaPfmTokenFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ArexaPfmTokenFacet {
    return super.attach(address) as ArexaPfmTokenFacet;
  }
  override connect(signer: Signer): ArexaPfmTokenFacet__factory {
    return super.connect(signer) as ArexaPfmTokenFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ArexaPfmTokenFacetInterface {
    return new utils.Interface(_abi) as ArexaPfmTokenFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ArexaPfmTokenFacet {
    return new Contract(address, _abi, signerOrProvider) as ArexaPfmTokenFacet;
  }
}
