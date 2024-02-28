/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  ArexaPlatformAdminFacet,
  ArexaPlatformAdminFacetInterface,
} from "../../ArexaPlatform/ArexaPlatformAdminFacet";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AccessDenied",
    type: "error",
  },
  {
    inputs: [],
    name: "AddressUtils__NotContract",
    type: "error",
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
    name: "LibERC1155__MintToZeroAddress",
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
    name: "LibERC1155__TransferExceedsBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "LibERC1155__TransferToZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    inputs: [],
    name: "TargetedPausable__TargetedPaused",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "toAccount",
        type: "address",
      },
    ],
    name: "buyMagic100TokenAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenType",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "year",
        type: "uint16",
      },
      {
        internalType: "uint8",
        name: "month",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "min",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "max",
        type: "uint256",
      },
    ],
    name: "createSubscription",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_tokenType",
        type: "uint8",
      },
    ],
    name: "getArexaTokenPool",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "total",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "sold",
            type: "uint256",
          },
        ],
        internalType: "struct ArexaTokenPool",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "poolType",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "quantity",
        type: "uint32",
      },
    ],
    name: "payArexaTokenFromPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506140a9806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063065ab2ea14610051578063780ea57214610081578063dd5072b81461009d578063fdb23101146100cd575b600080fd5b61006b60048036038101906100669190612be6565b6100e9565b6040516100789190612c82565b60405180910390f35b61009b60048036038101906100969190612d37565b61021a565b005b6100b760048036038101906100b29190612d8a565b610343565b6040516100c49190612df5565b60405180910390f35b6100e760048036038101906100e29190612e10565b6103d0565b005b60006100f361048a565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610160576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161015790612e9a565b60405180910390fd5b7f72a415ccbbed7752b009b01c3fad0a1694ff64e2a51c65a309c0517cd732d2d161018a816104c2565b6000801b610197816104cf565b6305f5e1008914806101ac5750630bebc20089145b6101eb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101e290612f2c565b60405180910390fd5b6101fa338a8a8a8a8a8a610512565b925061020e836102098b610674565b610728565b50509695505050505050565b61022261048a565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161461028f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161028690612e9a565b60405180910390fd5b7f72a415ccbbed7752b009b01c3fad0a1694ff64e2a51c65a309c0517cd732d2d16102b9816104c2565b6000801b6102c6816104cf565b600260ff168560ff1614806102e15750600360ff168560ff16145b806102f25750600460ff168560ff16145b610331576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161032890612fbe565b60405180910390fd5b61033c858585610794565b5050505050565b61034b612b14565b61035361048a565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146103c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103b790612e9a565b60405180910390fd5b6103c982610892565b9050919050565b6103d861048a565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610445576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161043c90612e9a565b60405180910390fd5b7f72a415ccbbed7752b009b01c3fad0a1694ff64e2a51c65a309c0517cd732d2d161046f816104c2565b6000801b61047c816104cf565b610485836108e8565b505050565b600080610495610a1b565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b6104cc8133610a48565b50565b6104d881610a99565b1561050f576040517f2d0a436a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b60008061051d610acc565b9050600060648760ff16610531919061300d565b6127108961ffff16610543919061300d565b8a61054e919061304f565b610558919061304f565b90506063818360050160008c81526020019081526020016000205461057d919061308d565b126105bd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105b49061311c565b60405180910390fd5b808260050160008b81526020019081526020016000205410156105f557808260050160008b8152602001908152602001600020819055505b8160050160008a8152602001908152602001600020600081548092919061061b9061313c565b91905055508160050160008a815260200190815260200160002054925061064483878787610af9565b6106678a61065061048a565b858960405180602001604052806000815250610bb4565b5050979650505050505050565b60606000610680610d69565b905080600901600084815260200190815260200160002080546106a2906131b3565b80601f01602080910402602001604051908101604052809291908181526020018280546106ce906131b3565b801561071b5780601f106106f05761010080835404028352916020019161071b565b820191906000526020600020905b8154815290600101906020018083116106fe57829003601f168201915b5050505050915050919050565b6000610732610d69565b905081816009016000858152602001908152602001600020908161075691906133ca565b50827f6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b836040516107879190613510565b60405180910390a2505050565b600061079e610acc565b905060008160000160008660ff1660ff168152602001908152602001600020905080600001548363ffffffff1682600101546107da919061304f565b111561081b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108129061357e565b60405180910390fd5b8263ffffffff168160010154610831919061304f565b8160010181905550600061084361048a565b905061086c8182876317d784008863ffffffff1660405180602001604052806000815250610d96565b8363ffffffff168360070154610882919061304f565b8360070181905550505050505050565b61089a612b14565b60006108a4610acc565b90508060000160008460ff1660ff16815260200190815260200160002060405180604001604052908160008201548152602001600182015481525050915050919050565b60006108f2610acc565b905060008160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610965573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061098991906135b3565b600a6109959190613713565b905060008160646109a6919061300d565b905060006109b261048a565b90506109e48460020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168683856111c1565b610a06818287631dcd6500600160405180602001604052806000815250610d96565b610a14631dcd6500836112cc565b5050505050565b6000807ff72346055b4d7224c7ec19860d22963ca622fbb313761bfba507c1a3aeedf37290508091505090565b610a528282611402565b610a955781816040517f521dcf0d000000000000000000000000000000000000000000000000000000008152600401610a8c929190613786565b60405180910390fd5b5050565b6000610aa36114a3565b600001600083815260200190815260200160002060009054906101000a900460ff169050919050565b6000807f1a2f703e435318ee39feac62abda44020ca215505d5ba3284195182c842a2d3090508091505090565b6000610b036114d0565b90506000816000016000878152602001908152602001600020905060018160000160006101000a81548160ff02191690831515021790555084816001018190555060008414610b6857838586610b59919061300d565b610b63919061300d565b610b75565b8485610b74919061300d565b5b81600301819055508381600401819055506000831480610b9457508383105b610b9e5782610ba4565b80600301545b8160050181905550505050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610c1a576040517fefac521700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000610c25846114fd565b90506000610c32846114fd565b9050610c4387600088858588611577565b6000610c4d610d69565b9050610c598187611828565b8481600001600088815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610cbb919061304f565b925050819055508673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628989604051610d399291906137af565b60405180910390a4610d5088600089868689611898565b610d5f886000898989896118ae565b5050505050505050565b6000807fe20f5a7f7e820e4505f9ef8ed1186e372d3490e37d8001618819927829be4e0590508091505090565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610dfc576040517fa25202b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000610e07846114fd565b90506000610e14846114fd565b9050610e24888888858588611577565b6000610e2e610d69565b9050610e3a8187611828565b600081600001600088815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905080861115610ecb576040517fb38aedf300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610ed78a8a8989611a73565b85810382600001600089815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508873ffffffffffffffffffffffffffffffffffffffff168a73ffffffffffffffffffffffffffffffffffffffff16146110b25781600201600088815260200190815260200160002060009054906101000a900460ff16156110b157858260030160008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600089815260200190815260200160002054038260030160008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000898152602001908152602001600020819055505b5b8582600001600089815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611114919061304f565b925050819055508773ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff168b73ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628a8a6040516111919291906137af565b60405180910390a46111a78a8a8a87878a611898565b6111b58a8a8a8a8a8a6118ae565b50505050505050505050565b600061125e8573ffffffffffffffffffffffffffffffffffffffff166323b872dd8686866040516024016111f7939291906137d8565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050508673ffffffffffffffffffffffffffffffffffffffff16611c7090919063ffffffff16565b905060008151141580156112835750808060200190518101906112819190613847565b155b156112c557846040517f5274afe70000000000000000000000000000000000000000000000000000000081526004016112bc9190613874565b60405180910390fd5b5050505050565b60006112d6610acc565b9050600081600101600085815260200190815260200160002060000160049054906101000a900463ffffffff1682600101600086815260200190815260200160002060000160009054906101000a900463ffffffff16611336919061388f565b63ffffffff1682600101600086815260200190815260200160002060000160009054906101000a900463ffffffff1663ffffffff1684611376919061300d565b61138091906138f6565b9050600081846113909190613927565b90506113c58360020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166317d7840084611c9d565b818360030160008282546113d9919061304f565b92505081905550808360040160008282546113f4919061304f565b925050819055505050505050565b60008061140d611d9e565b905061149a838260010160008460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000878152602001908152602001600020600101611dcb90919063ffffffff16565b91505092915050565b6000807fe8ceb94393aac3e803a9d4b376f7c5ffd7e8b6caab697212a5360c34a283caa190508091505090565b6000807f47b8e8b32475ba6530f41efddbadc333684d4f798e5f4689344334684c5f262590508091505090565b60606000600167ffffffffffffffff81111561151c5761151b6131ef565b5b60405190808252806020026020018201604052801561154a5781602001602082028036833780820191505090505b50905082816000815181106115625761156161395b565b5b60200260200101818152505080915050919050565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16146118125760006115b4610d69565b9050600081600501905060008260060160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008360060160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060005b875181101561180c5760008782815181106116695761166861395b565b5b6020026020010151905060008111156117fe5760008983815181106116915761169061395b565b5b60200260200101519050600073ffffffffffffffffffffffffffffffffffffffff168c73ffffffffffffffffffffffffffffffffffffffff1603611700578187600401600083815260200190815260200160002060008282546116f4919061304f565b9250508190555061174b565b8161170b8d83611dfb565b0361174a576117348c876000848152602001908152602001600020611eca90919063ffffffff16565b506117488186611efa90919063ffffffff16565b505b5b600073ffffffffffffffffffffffffffffffffffffffff168b73ffffffffffffffffffffffffffffffffffffffff16036117b0578187600401600083815260200190815260200160002060008282546117a49190613927565b925050819055506117fc565b60006117bc8c83611dfb565b036117fb576117e58b876000848152602001908152602001600020611f1490919063ffffffff16565b506117f98185611f4490919063ffffffff16565b505b5b505b81806001019250505061164b565b50505050505b611820868686868686611f5e565b505050505050565b61183182611fa6565b81600b01600082815260200190815260200160002060009054906101000a900460ff1615611894576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161188b906139d6565b60405180910390fd5b5050565b6118a6868686868686611ffb565b505050505050565b6118cd8473ffffffffffffffffffffffffffffffffffffffff166120e9565b15611a6b578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b8152600401611913959493929190613a4b565b6020604051808303816000875af192505050801561194f57506040513d601f19601f8201168201806040525081019061194c9190613afd565b60015b6119eb5761195b613b37565b806308c379a0036119b7575061196f613b8a565b8061197a57506119b9565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119ae9190613510565b60405180910390fd5b505b6040517f4eebd08100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611a69576040517f542073e700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505b505050505050565b6000611a7d610d69565b90508473ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614611c69578060010160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16611b74576040517f3d2f0b3700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600201600084815260200190815260200160002060009054906101000a900460ff168015611c315750818160030160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002054105b15611c68576040517f32af163800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5b5050505050565b6060611c958383604051806060016040528060238152602001614051602391396120fc565b905092915050565b6000611ca7612114565b905060008160000160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002090508060000160009054906101000a900460ff16611d1c575050611d99565b6000831215611d60576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d5790613c66565b60405180910390fd5b82816002016000828254611d749190613c86565b9250508190555082816003016000828254611d8f9190613c86565b9250508190555050505b505050565b6000807f746c6723185dc95a8925081faed89cbd4670299390e2ebfb0b9c3e755e204ef490508091505090565b6000611df3836000018373ffffffffffffffffffffffffffffffffffffffff1660001b612141565b905092915050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611e62576040517f4a772c2700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000611e6c610d69565b905080600001600084815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205491505092915050565b6000611ef2836000018373ffffffffffffffffffffffffffffffffffffffff1660001b612164565b905092915050565b6000611f0c836000018360001b612164565b905092915050565b6000611f3c836000018373ffffffffffffffffffffffffffffffffffffffff1660001b612248565b905092915050565b6000611f56836000018360001b612248565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614611f9e57611f9d8584846122af565b5b505050505050565b80600a0160009054906101000a900460ff1615611ff8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611fef90613d16565b60405180910390fd5b50565b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161461203d5761203c8584846000612348565b5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161461207f5761207e8484846001612348565b5b60005b83518110156120e0576120d36120966123e3565b8583815181106120a9576120a861395b565b5b602002602001015188888786815181106120c6576120c561395b565b5b602002602001015161241b565b8080600101915050612082565b50505050505050565b600080823b905060008111915050919050565b606061210b848460008561254f565b90509392505050565b6000807ff0375085caeab71645bf74d020ee2aa37bc7b653d9e55911c1084d8c88b3c05c90508091505090565b600080836001016000848152602001908152602001600020541415905092915050565b60008083600101600084815260200190815260200160002054905060008114612241576000846000016001866000018054905003815481106121a9576121a861395b565b5b90600052602060002001549050808560000160018403815481106121d0576121cf61395b565b5b90600052602060002001819055508185600101600083815260200190815260200160002081905550508360000180548061220d5761220c613d36565b5b6001900381819060005260206000200160009055905583600101600084815260200190815260200160002060009055600191505b5092915050565b60006122548383612141565b6122a95782600001829080600181540180825580915050600190039060005260206000200160009091909190915055826000018054905083600101600084815260200190815260200160002081905550600190505b92915050565b80518251146122ea576040517f583b4bea00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b8251811015612342576123358484838151811061230d5761230c61395b565b5b60200260200101518484815181106123285761232761395b565b5b6020026020010151612668565b80806001019150506122ed565b50505050565b8151835114612383576040517f583b4bea00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b83518110156123dc576123cf858583815181106123a6576123a561395b565b5b60200260200101518584815181106123c1576123c061395b565b5b6020026020010151856127af565b8080600101915050612386565b5050505050565b6000806123ee610acc565b90508060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b6000612425612114565b905060008160000160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600087815260200190815260200160002090508060000160009054906101000a900460ff1661249a575050612548565b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614612505576125048186857fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6124ff9190613d65565b61294d565b5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16146125455761254481858561294d565b5b50505b5050505050565b606061255a856120e9565b612590576040517f89c35afc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516125b99190613e19565b60006040518083038185875af1925050503d80600081146125f6576040519150601f19603f3d011682016040523d82523d6000602084013e6125fb565b606091505b50915091508115612610578092505050612660565b6000815111156126235780518082602001fd5b836040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016126579190613510565b60405180910390fd5b949350505050565b6000612672612ace565b9050600081600001600085815260200190815260200160002090504381600101541161269f5750506127aa565b60008160030160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506000600c826003015483600001546126fc9190613927565b61270691906138f6565b836002015483600201544361271b9190613927565b61272591906138f6565b61272f919061300d565b90506000826001015461275583856003015461274b919061304f565b8560000154612afb565b61275f9190613927565b9050808611156127a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161279b90613ea2565b60405180910390fd5b50505050505b505050565b60006127b9612ace565b905060008160000160008681526020019081526020016000209050438160010154116127e6575050612947565b60008160030160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050438260000154116128805760018460ff16036128785784816000016000828254612855919061304f565b9250508190555084816003016000828254612870919061304f565b925050819055505b505050612947565b6000600c826003015483600001546128989190613927565b6128a291906138f6565b83600201548360020154436128b79190613927565b6128c191906138f6565b6128cb919061300d565b90506128ea8183600301546128e0919061304f565b8360000154612afb565b826003018190555060018560ff160361291d5785826000016000828254612911919061304f565b92505081905550612939565b85826001016000828254612931919061304f565b925050819055505b438260020181905550505050505b50505050565b60008360040160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008285600101546129a49190613c86565b12156129e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016129dc90613f34565b60405180910390fd5b60008282600001546129f79190613c86565b1215612a38576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612a2f90613fc6565b60405180910390fd5b600080856001015414612a67578460010154838660030154612a5a9190613d65565b612a649190613fe6565b90505b828560010154612a779190613c86565b8560010181905550808560030154612a8f9190613c86565b8560030181905550828260000154612aa79190613c86565b8260000181905550808260010154612abf919061308d565b82600101819055505050505050565b6000807fb666c964c288db81fc3205a9feeb13cfebbde2a4a4664c45ea26ef9d3d8de79290508091505090565b6000818311612b0a5782612b0c565b815b905092915050565b604051806040016040528060008152602001600081525090565b6000604051905090565b600080fd5b6000819050919050565b612b5081612b3d565b8114612b5b57600080fd5b50565b600081359050612b6d81612b47565b92915050565b600061ffff82169050919050565b612b8a81612b73565b8114612b9557600080fd5b50565b600081359050612ba781612b81565b92915050565b600060ff82169050919050565b612bc381612bad565b8114612bce57600080fd5b50565b600081359050612be081612bba565b92915050565b60008060008060008060c08789031215612c0357612c02612b38565b5b6000612c1189828a01612b5e565b9650506020612c2289828a01612b98565b9550506040612c3389828a01612bd1565b9450506060612c4489828a01612b5e565b9350506080612c5589828a01612b5e565b92505060a0612c6689828a01612b5e565b9150509295509295509295565b612c7c81612b3d565b82525050565b6000602082019050612c976000830184612c73565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000612cc882612c9d565b9050919050565b612cd881612cbd565b8114612ce357600080fd5b50565b600081359050612cf581612ccf565b92915050565b600063ffffffff82169050919050565b612d1481612cfb565b8114612d1f57600080fd5b50565b600081359050612d3181612d0b565b92915050565b600080600060608486031215612d5057612d4f612b38565b5b6000612d5e86828701612bd1565b9350506020612d6f86828701612ce6565b9250506040612d8086828701612d22565b9150509250925092565b600060208284031215612da057612d9f612b38565b5b6000612dae84828501612bd1565b91505092915050565b612dc081612b3d565b82525050565b604082016000820151612ddc6000850182612db7565b506020820151612def6020850182612db7565b50505050565b6000604082019050612e0a6000830184612dc6565b92915050565b600060208284031215612e2657612e25612b38565b5b6000612e3484828501612ce6565b91505092915050565b600082825260208201905092915050565b7f4e4f545f414c4c4f574544000000000000000000000000000000000000000000600082015250565b6000612e84600b83612e3d565b9150612e8f82612e4e565b602082019050919050565b60006020820190508181036000830152612eb381612e77565b9050919050565b7f4f6e6c7920737562736372697074696f6e20746f6b656e20747970652069732060008201527f7065726d69747465642100000000000000000000000000000000000000000000602082015250565b6000612f16602a83612e3d565b9150612f2182612eba565b604082019050919050565b60006020820190508181036000830152612f4581612f09565b9050919050565b7f5061796f75742063616e206265206d6164652066726f6d2041726578612c204d60008201527f61726b6574696e67206f7220446576656c6f706d656e7420706f6f6c21000000602082015250565b6000612fa8603d83612e3d565b9150612fb382612f4c565b604082019050919050565b60006020820190508181036000830152612fd781612f9b565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061301882612b3d565b915061302383612b3d565b925082820261303181612b3d565b9150828204841483151761304857613047612fde565b5b5092915050565b600061305a82612b3d565b915061306583612b3d565b925082820190508082111561307d5761307c612fde565b5b92915050565b6000819050919050565b600061309882613083565b91506130a383613083565b92508282039050818112600084121682821360008512151617156130ca576130c9612fde565b5b92915050565b7f43616e27742063726561746520666f72206f6c64206d6f6e7468730000000000600082015250565b6000613106601b83612e3d565b9150613111826130d0565b602082019050919050565b60006020820190508181036000830152613135816130f9565b9050919050565b600061314782612b3d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361317957613178612fde565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806131cb57607f821691505b6020821081036131de576131dd613184565b5b50919050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026132807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82613243565b61328a8683613243565b95508019841693508086168417925050509392505050565b6000819050919050565b60006132c76132c26132bd84612b3d565b6132a2565b612b3d565b9050919050565b6000819050919050565b6132e1836132ac565b6132f56132ed826132ce565b848454613250565b825550505050565b600090565b61330a6132fd565b6133158184846132d8565b505050565b5b818110156133395761332e600082613302565b60018101905061331b565b5050565b601f82111561337e5761334f8161321e565b61335884613233565b81016020851015613367578190505b61337b61337385613233565b83018261331a565b50505b505050565b600082821c905092915050565b60006133a160001984600802613383565b1980831691505092915050565b60006133ba8383613390565b9150826002028217905092915050565b6133d3826131e4565b67ffffffffffffffff8111156133ec576133eb6131ef565b5b6133f682546131b3565b61340182828561333d565b600060209050601f8311600181146134345760008415613422578287015190505b61342c85826133ae565b865550613494565b601f1984166134428661321e565b60005b8281101561346a57848901518255600182019150602085019450602081019050613445565b868310156134875784890151613483601f891682613390565b8355505b6001600288020188555050505b505050505050565b60005b838110156134ba57808201518184015260208101905061349f565b60008484015250505050565b6000601f19601f8301169050919050565b60006134e2826131e4565b6134ec8185612e3d565b93506134fc81856020860161349c565b613505816134c6565b840191505092915050565b6000602082019050818103600083015261352a81846134d7565b905092915050565b7f4e6f7420656e6f67756820746f6b656e20746f20676966740000000000000000600082015250565b6000613568601883612e3d565b915061357382613532565b602082019050919050565b600060208201905081810360008301526135978161355b565b9050919050565b6000815190506135ad81612bba565b92915050565b6000602082840312156135c9576135c8612b38565b5b60006135d78482850161359e565b91505092915050565b60008160011c9050919050565b6000808291508390505b60018511156136375780860481111561361357613612612fde565b5b60018516156136225780820291505b8081029050613630856135e0565b94506135f7565b94509492505050565b600082613650576001905061370c565b8161365e576000905061370c565b8160018114613674576002811461367e576136ad565b600191505061370c565b60ff8411156136905761368f612fde565b5b8360020a9150848211156136a7576136a6612fde565b5b5061370c565b5060208310610133831016604e8410600b84101617156136e25782820a9050838111156136dd576136dc612fde565b5b61370c565b6136ef84848460016135ed565b9250905081840481111561370657613705612fde565b5b81810290505b9392505050565b600061371e82612b3d565b915061372983612bad565b92506137567fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484613640565b905092915050565b6000819050919050565b6137718161375e565b82525050565b61378081612cbd565b82525050565b600060408201905061379b6000830185613768565b6137a86020830184613777565b9392505050565b60006040820190506137c46000830185612c73565b6137d16020830184612c73565b9392505050565b60006060820190506137ed6000830186613777565b6137fa6020830185613777565b6138076040830184612c73565b949350505050565b60008115159050919050565b6138248161380f565b811461382f57600080fd5b50565b6000815190506138418161381b565b92915050565b60006020828403121561385d5761385c612b38565b5b600061386b84828501613832565b91505092915050565b60006020820190506138896000830184613777565b92915050565b600061389a82612cfb565b91506138a583612cfb565b9250828201905063ffffffff8111156138c1576138c0612fde565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061390182612b3d565b915061390c83612b3d565b92508261391c5761391b6138c7565b5b828204905092915050565b600061393282612b3d565b915061393d83612b3d565b925082820390508181111561395557613954612fde565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f546f6b656e206973207061757365642100000000000000000000000000000000600082015250565b60006139c0601083612e3d565b91506139cb8261398a565b602082019050919050565b600060208201905081810360008301526139ef816139b3565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000613a1d826139f6565b613a278185613a01565b9350613a3781856020860161349c565b613a40816134c6565b840191505092915050565b600060a082019050613a606000830188613777565b613a6d6020830187613777565b613a7a6040830186612c73565b613a876060830185612c73565b8181036080830152613a998184613a12565b90509695505050505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b613ada81613aa5565b8114613ae557600080fd5b50565b600081519050613af781613ad1565b92915050565b600060208284031215613b1357613b12612b38565b5b6000613b2184828501613ae8565b91505092915050565b60008160e01c9050919050565b600060033d1115613b565760046000803e613b53600051613b2a565b90505b90565b613b62826134c6565b810181811067ffffffffffffffff82111715613b8157613b806131ef565b5b80604052505050565b600060443d10613c1757613b9c612b2e565b60043d036004823e80513d602482011167ffffffffffffffff82111715613bc4575050613c17565b808201805167ffffffffffffffff811115613be25750505050613c17565b80602083010160043d038501811115613bff575050505050613c17565b613c0e82602001850186613b59565b82955050505050505b90565b7f506f6f6c2063616e206f6e6c7920696e63726561736521000000000000000000600082015250565b6000613c50601783612e3d565b9150613c5b82613c1a565b602082019050919050565b60006020820190508181036000830152613c7f81613c43565b9050919050565b6000613c9182613083565b9150613c9c83613083565b925082820190508281121560008312168382126000841215161715613cc457613cc3612fde565b5b92915050565b7f416c6c20746f6b656e2069732070617573656421000000000000000000000000600082015250565b6000613d00601483612e3d565b9150613d0b82613cca565b602082019050919050565b60006020820190508181036000830152613d2f81613cf3565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b6000613d7082613083565b9150613d7b83613083565b9250828202613d8981613083565b91507f80000000000000000000000000000000000000000000000000000000000000008414600084121615613dc157613dc0612fde565b5b8282058414831517613dd657613dd5612fde565b5b5092915050565b600081905092915050565b6000613df3826139f6565b613dfd8185613ddd565b9350613e0d81856020860161349c565b80840191505092915050565b6000613e258284613de8565b915081905092915050565b7f54686520616d6f756e7420697320677261746572207468656e2074686520616360008201527f63756d6c6174656420282773656c6c61626c65272920616d6f756e7421000000602082015250565b6000613e8c603d83612e3d565b9150613e9782613e30565b604082019050919050565b60006020820190508181036000830152613ebb81613e7f565b9050919050565b7f506f6f6c20746f6b656e207175616e6974792063616e2774206265206c65737360008201527f207468656e207a65726f21000000000000000000000000000000000000000000602082015250565b6000613f1e602b83612e3d565b9150613f2982613ec2565b604082019050919050565b60006020820190508181036000830152613f4d81613f11565b9050919050565b7f5573657220746f6b656e207175616e6974792063616e2774206265206c65737360008201527f207468656e207a65726f21000000000000000000000000000000000000000000602082015250565b6000613fb0602b83612e3d565b9150613fbb82613f54565b604082019050919050565b60006020820190508181036000830152613fdf81613fa3565b9050919050565b6000613ff182613083565b9150613ffc83613083565b92508261400c5761400b6138c7565b5b600160000383147f80000000000000000000000000000000000000000000000000000000000000008314161561404557614044612fde565b5b82820590509291505056fe416464726573735574696c733a206661696c6564206c6f772d6c6576656c2063616c6ca264697066735822122078862e4b3cc51c4b25f9a733374ea2ebee080b9cc317f3e024d94966fe5cadf364736f6c63430008110033";

type ArexaPlatformAdminFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ArexaPlatformAdminFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ArexaPlatformAdminFacet__factory extends ContractFactory {
  constructor(...args: ArexaPlatformAdminFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ArexaPlatformAdminFacet> {
    return super.deploy(overrides || {}) as Promise<ArexaPlatformAdminFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ArexaPlatformAdminFacet {
    return super.attach(address) as ArexaPlatformAdminFacet;
  }
  override connect(signer: Signer): ArexaPlatformAdminFacet__factory {
    return super.connect(signer) as ArexaPlatformAdminFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ArexaPlatformAdminFacetInterface {
    return new utils.Interface(_abi) as ArexaPlatformAdminFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ArexaPlatformAdminFacet {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ArexaPlatformAdminFacet;
  }
}
