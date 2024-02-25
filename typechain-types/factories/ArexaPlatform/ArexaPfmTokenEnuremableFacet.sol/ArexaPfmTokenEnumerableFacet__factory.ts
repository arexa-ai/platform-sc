/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  ArexaPfmTokenEnumerableFacet,
  ArexaPfmTokenEnumerableFacetInterface,
} from "../../../ArexaPlatform/ArexaPfmTokenEnuremableFacet.sol/ArexaPfmTokenEnumerableFacet";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "EnumerableSet__IndexOutOfBounds",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "accountsByToken",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "tokensByAccount",
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
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "totalHolders",
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
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "totalSupply",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061083c806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806313ba55df146100515780636dcfd8411461008157806385bff2e7146100b1578063bd85b039146100e1575b600080fd5b61006b60048036038101906100669190610506565b610111565b6040516100789190610542565b60405180910390f35b61009b60048036038101906100969190610506565b610123565b6040516100a8919061064d565b60405180910390f35b6100cb60048036038101906100c6919061069b565b610135565b6040516100d89190610786565b60405180910390f35b6100fb60048036038101906100f69190610506565b610147565b6040516101089190610542565b60405180910390f35b600061011c82610159565b9050919050565b606061012e8261018b565b9050919050565b606061014082610293565b9050919050565b600061015282610399565b9050919050565b6000806101646103c4565b90506101838160050160008581526020019081526020016000206103f1565b915050919050565b606060006101976103c4565b90506000816005016000858152602001908152602001600020905060006101bd826103f1565b67ffffffffffffffff8111156101d6576101d56107a8565b5b6040519080825280602002602001820160405280156102045781602001602082028036833780820191505090505b50905060005b610213836103f1565b8110156102875761022d818461040690919063ffffffff16565b8282815181106102405761023f6107d7565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050808060010191505061020a565b50809350505050919050565b6060600061029f6103c4565b905060008160060160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060006102f182610420565b67ffffffffffffffff81111561030a576103096107a8565b5b6040519080825280602002602001820160405280156103385781602001602082028036833780820191505090505b50905060005b61034783610420565b81101561038d57610361818461043590919063ffffffff16565b828281518110610374576103736107d7565b5b602002602001018181525050808060010191505061033e565b50809350505050919050565b6000806103a46103c4565b905080600401600084815260200190815260200160002054915050919050565b6000807fe20f5a7f7e820e4505f9ef8ed1186e372d3490e37d8001618819927829be4e0590508091505090565b60006103ff8260000161044f565b9050919050565b60006104158360000183610460565b60001c905092915050565b600061042e8260000161044f565b9050919050565b60006104448360000183610460565b60001c905092915050565b600081600001805490509050919050565b6000826000018054905082106104a2576040517fe637bf3b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8260000182815481106104b8576104b76107d7565b5b9060005260206000200154905092915050565b600080fd5b6000819050919050565b6104e3816104d0565b81146104ee57600080fd5b50565b600081359050610500816104da565b92915050565b60006020828403121561051c5761051b6104cb565b5b600061052a848285016104f1565b91505092915050565b61053c816104d0565b82525050565b60006020820190506105576000830184610533565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006105b482610589565b9050919050565b6105c4816105a9565b82525050565b60006105d683836105bb565b60208301905092915050565b6000602082019050919050565b60006105fa8261055d565b6106048185610568565b935061060f83610579565b8060005b8381101561064057815161062788826105ca565b9750610632836105e2565b925050600181019050610613565b5085935050505092915050565b6000602082019050818103600083015261066781846105ef565b905092915050565b610678816105a9565b811461068357600080fd5b50565b6000813590506106958161066f565b92915050565b6000602082840312156106b1576106b06104cb565b5b60006106bf84828501610686565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6106fd816104d0565b82525050565b600061070f83836106f4565b60208301905092915050565b6000602082019050919050565b6000610733826106c8565b61073d81856106d3565b9350610748836106e4565b8060005b838110156107795781516107608882610703565b975061076b8361071b565b92505060018101905061074c565b5085935050505092915050565b600060208201905081810360008301526107a08184610728565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea26469706673582212206acb290ccc6db2d2f15386bc89251033c0b98e46e9c32832189f32fe46c1d94364736f6c63430008110033";

type ArexaPfmTokenEnumerableFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ArexaPfmTokenEnumerableFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ArexaPfmTokenEnumerableFacet__factory extends ContractFactory {
  constructor(...args: ArexaPfmTokenEnumerableFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ArexaPfmTokenEnumerableFacet> {
    return super.deploy(
      overrides || {}
    ) as Promise<ArexaPfmTokenEnumerableFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ArexaPfmTokenEnumerableFacet {
    return super.attach(address) as ArexaPfmTokenEnumerableFacet;
  }
  override connect(signer: Signer): ArexaPfmTokenEnumerableFacet__factory {
    return super.connect(signer) as ArexaPfmTokenEnumerableFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ArexaPfmTokenEnumerableFacetInterface {
    return new utils.Interface(_abi) as ArexaPfmTokenEnumerableFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ArexaPfmTokenEnumerableFacet {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ArexaPfmTokenEnumerableFacet;
  }
}
