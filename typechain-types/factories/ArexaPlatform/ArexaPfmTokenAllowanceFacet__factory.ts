/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  ArexaPfmTokenAllowanceFacet,
  ArexaPfmTokenAllowanceFacetInterface,
} from "../../ArexaPlatform/ArexaPfmTokenAllowanceFacet";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Ownable__NotOwner",
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
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currenctValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    name: "Approval",
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
        internalType: "address",
        name: "_operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "_operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_currentValue",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_newValue",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "isOperatorSpendingLimitEnabled",
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
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_enabled",
        type: "bool",
      },
    ],
    name: "setOperatorSpendingLimitEnabled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610acc806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806340cf0ba1146100515780634f4df4421461006d578063598af9e714610089578063ea2fbed0146100b9575b600080fd5b61006b600480360381019061006691906107ab565b6100e9565b005b61008760048036038101906100829190610849565b610174565b005b6100a3600480360381019061009e91906108b0565b61020a565b6040516100b09190610912565b60405180910390f35b6100d360048036038101906100ce919061092d565b610220565b6040516100e09190610969565b60405180910390f35b6100f1610232565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161461015e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610155906109e1565b60405180910390fd5b61016661026a565b61017082826102d8565b5050565b61017c610232565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146101e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101e0906109e1565b60405180910390fd5b6000801b6101f681610316565b6102033386868686610359565b5050505050565b600061021784848461053a565b90509392505050565b600061022b826105e1565b9050919050565b60008061023d610619565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b610272610646565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102d6576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60006102e261067e565b90508181600201600085815260200190815260200160002060006101000a81548160ff021916908315150217905550505050565b61031f816106ab565b15610356576040517f2d0a436a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b600061036361067e565b9050828160030160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008681526020019081526020016000205414610436576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161042d90610a4d565b60405180910390fd5b818160030160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600086815260200190815260200160002081905550838573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff167f3a9c85c6b31f7a9d7fe1478f53e1be42e85db97ca30d1789cfef9196dbc472c9868660405161052a929190610a6d565b60405180910390a4505050505050565b60008061054561067e565b90508060030160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000848152602001908152602001600020549150509392505050565b6000806105ec61067e565b905080600201600084815260200190815260200160002060009054906101000a900460ff16915050919050565b6000807ff72346055b4d7224c7ec19860d22963ca622fbb313761bfba507c1a3aeedf37290508091505090565b6000806106516106de565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b6000807fe20f5a7f7e820e4505f9ef8ed1186e372d3490e37d8001618819927829be4e0590508091505090565b60006106b561070b565b600001600083815260200190815260200160002060009054906101000a900460ff169050919050565b6000807f746c6723185dc95a8925081faed89cbd4670299390e2ebfb0b9c3e755e204ef490508091505090565b6000807fe8ceb94393aac3e803a9d4b376f7c5ffd7e8b6caab697212a5360c34a283caa190508091505090565b600080fd5b6000819050919050565b6107508161073d565b811461075b57600080fd5b50565b60008135905061076d81610747565b92915050565b60008115159050919050565b61078881610773565b811461079357600080fd5b50565b6000813590506107a58161077f565b92915050565b600080604083850312156107c2576107c1610738565b5b60006107d08582860161075e565b92505060206107e185828601610796565b9150509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610816826107eb565b9050919050565b6108268161080b565b811461083157600080fd5b50565b6000813590506108438161081d565b92915050565b6000806000806080858703121561086357610862610738565b5b600061087187828801610834565b94505060206108828782880161075e565b93505060406108938782880161075e565b92505060606108a48782880161075e565b91505092959194509250565b6000806000606084860312156108c9576108c8610738565b5b60006108d786828701610834565b93505060206108e886828701610834565b92505060406108f98682870161075e565b9150509250925092565b61090c8161073d565b82525050565b60006020820190506109276000830184610903565b92915050565b60006020828403121561094357610942610738565b5b60006109518482850161075e565b91505092915050565b61096381610773565b82525050565b600060208201905061097e600083018461095a565b92915050565b600082825260208201905092915050565b7f4e4f545f414c4c4f574544000000000000000000000000000000000000000000600082015250565b60006109cb600b83610984565b91506109d682610995565b602082019050919050565b600060208201905081810360008301526109fa816109be565b9050919050565b7f43757272656e742076616c7565206d69736d6174636800000000000000000000600082015250565b6000610a37601683610984565b9150610a4282610a01565b602082019050919050565b60006020820190508181036000830152610a6681610a2a565b9050919050565b6000604082019050610a826000830185610903565b610a8f6020830184610903565b939250505056fea2646970667358221220bcaf8fad2b09fcf7006b494ae5b8b9c8914054cf21b621c937ecc1a79a28b79a64736f6c63430008110033";

type ArexaPfmTokenAllowanceFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ArexaPfmTokenAllowanceFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ArexaPfmTokenAllowanceFacet__factory extends ContractFactory {
  constructor(...args: ArexaPfmTokenAllowanceFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ArexaPfmTokenAllowanceFacet> {
    return super.deploy(
      overrides || {}
    ) as Promise<ArexaPfmTokenAllowanceFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ArexaPfmTokenAllowanceFacet {
    return super.attach(address) as ArexaPfmTokenAllowanceFacet;
  }
  override connect(signer: Signer): ArexaPfmTokenAllowanceFacet__factory {
    return super.connect(signer) as ArexaPfmTokenAllowanceFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ArexaPfmTokenAllowanceFacetInterface {
    return new utils.Interface(_abi) as ArexaPfmTokenAllowanceFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ArexaPfmTokenAllowanceFacet {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ArexaPfmTokenAllowanceFacet;
  }
}
