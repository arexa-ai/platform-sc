/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  ArexaPfmTokenReceiverFacet,
  ArexaPfmTokenReceiverFacetInterface,
} from "../../ArexaPlatform/ArexaPfmTokenReceiverFacet";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "_from",
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
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
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
        internalType: "address",
        name: "_from",
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
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610ba0806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063bc197c811461003b578063f23a6e611461006b575b600080fd5b610055600480360381019061005091906105ac565b61009b565b60405161006291906106c3565b60405180910390f35b61008560048036038101906100809190610714565b6100bb565b60405161009291906106c3565b60405180910390f35b60006100ad89898989898989896100d7565b905098975050505050505050565b60006100cb8787878787876101f5565b90509695505050505050565b6000806100e261032b565b9050600081600d01600083600c0154815260200190815260200160002090508a8160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550898160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550888882600301919061019a9291906103d2565b5086868260040191906101ae9291906103d2565b5084848260000191826101c29291906109f4565b5081600c0160008154809291906101d890610af3565b919050555063bc197c8160e01b9250505098975050505050505050565b60008061020061032b565b9050600081600d01600083600c015481526020019081526020016000209050888160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550878160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506102ae87610358565b8160030190805190602001906102c592919061041f565b506102cf86610358565b8160040190805190602001906102e692919061041f565b5084848260000191826102fa9291906109f4565b5081600c01600081548092919061031090610af3565b919050555063f23a6e6160e01b925050509695505050505050565b6000807fe20f5a7f7e820e4505f9ef8ed1186e372d3490e37d8001618819927829be4e0590508091505090565b60606000600167ffffffffffffffff811115610377576103766107b9565b5b6040519080825280602002602001820160405280156103a55781602001602082028036833780820191505090505b50905082816000815181106103bd576103bc610b3b565b5b60200260200101818152505080915050919050565b82805482825590600052602060002090810192821561040e579160200282015b8281111561040d5782358255916020019190600101906103f2565b5b50905061041b919061046c565b5090565b82805482825590600052602060002090810192821561045b579160200282015b8281111561045a57825182559160200191906001019061043f565b5b509050610468919061046c565b5090565b5b8082111561048557600081600090555060010161046d565b5090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006104be82610493565b9050919050565b6104ce816104b3565b81146104d957600080fd5b50565b6000813590506104eb816104c5565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f840112610516576105156104f1565b5b8235905067ffffffffffffffff811115610533576105326104f6565b5b60208301915083602082028301111561054f5761054e6104fb565b5b9250929050565b60008083601f84011261056c5761056b6104f1565b5b8235905067ffffffffffffffff811115610589576105886104f6565b5b6020830191508360018202830111156105a5576105a46104fb565b5b9250929050565b60008060008060008060008060a0898b0312156105cc576105cb610489565b5b60006105da8b828c016104dc565b98505060206105eb8b828c016104dc565b975050604089013567ffffffffffffffff81111561060c5761060b61048e565b5b6106188b828c01610500565b9650965050606089013567ffffffffffffffff81111561063b5761063a61048e565b5b6106478b828c01610500565b9450945050608089013567ffffffffffffffff81111561066a5761066961048e565b5b6106768b828c01610556565b92509250509295985092959890939650565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6106bd81610688565b82525050565b60006020820190506106d860008301846106b4565b92915050565b6000819050919050565b6106f1816106de565b81146106fc57600080fd5b50565b60008135905061070e816106e8565b92915050565b60008060008060008060a0878903121561073157610730610489565b5b600061073f89828a016104dc565b965050602061075089828a016104dc565b955050604061076189828a016106ff565b945050606061077289828a016106ff565b935050608087013567ffffffffffffffff8111156107935761079261048e565b5b61079f89828a01610556565b92509250509295509295509295565b600082905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061082f57607f821691505b602082108103610842576108416107e8565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026108aa7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261086d565b6108b4868361086d565b95508019841693508086168417925050509392505050565b6000819050919050565b60006108f16108ec6108e7846106de565b6108cc565b6106de565b9050919050565b6000819050919050565b61090b836108d6565b61091f610917826108f8565b84845461087a565b825550505050565b600090565b610934610927565b61093f818484610902565b505050565b5b818110156109635761095860008261092c565b600181019050610945565b5050565b601f8211156109a85761097981610848565b6109828461085d565b81016020851015610991578190505b6109a561099d8561085d565b830182610944565b50505b505050565b600082821c905092915050565b60006109cb600019846008026109ad565b1980831691505092915050565b60006109e483836109ba565b9150826002028217905092915050565b6109fe83836107ae565b67ffffffffffffffff811115610a1757610a166107b9565b5b610a218254610817565b610a2c828285610967565b6000601f831160018114610a5b5760008415610a49578287013590505b610a5385826109d8565b865550610abb565b601f198416610a6986610848565b60005b82811015610a9157848901358255600182019150602085019450602081019050610a6c565b86831015610aae5784890135610aaa601f8916826109ba565b8355505b6001600288020188555050505b50505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610afe826106de565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610b3057610b2f610ac4565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea2646970667358221220c4379ee2cba4663bedd781d971da7cfb7e8b678cb7af099f616268db74c35b9e64736f6c63430008110033";

type ArexaPfmTokenReceiverFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ArexaPfmTokenReceiverFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ArexaPfmTokenReceiverFacet__factory extends ContractFactory {
  constructor(...args: ArexaPfmTokenReceiverFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ArexaPfmTokenReceiverFacet> {
    return super.deploy(overrides || {}) as Promise<ArexaPfmTokenReceiverFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ArexaPfmTokenReceiverFacet {
    return super.attach(address) as ArexaPfmTokenReceiverFacet;
  }
  override connect(signer: Signer): ArexaPfmTokenReceiverFacet__factory {
    return super.connect(signer) as ArexaPfmTokenReceiverFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ArexaPfmTokenReceiverFacetInterface {
    return new utils.Interface(_abi) as ArexaPfmTokenReceiverFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ArexaPfmTokenReceiverFacet {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ArexaPfmTokenReceiverFacet;
  }
}
