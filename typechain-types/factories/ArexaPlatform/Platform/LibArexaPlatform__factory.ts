/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  LibArexaPlatform,
  LibArexaPlatformInterface,
} from "../../../ArexaPlatform/Platform/LibArexaPlatform";

const _abi = [
  {
    inputs: [],
    name: "AMOUNT_VALUE_TYPE",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "QUANTITY_VALUE_TYPE",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60e9610052600b82828239805160001a607314610045577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe7300000000000000000000000000000000000000003014608060405260043610603d5760003560e01c80635aecf189146042578063d5ddea0414605c575b600080fd5b60486076565b60405160539190609a565b60405180910390f35b6062607b565b604051606d9190609a565b60405180910390f35b600081565b600181565b600060ff82169050919050565b6094816080565b82525050565b600060208201905060ad6000830184608d565b9291505056fea264697066735822122015f53a46fbbed30c4c4306064670d108dec426427b85eef25eea29c5fb682c7964736f6c63430008110033";

type LibArexaPlatformConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LibArexaPlatformConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LibArexaPlatform__factory extends ContractFactory {
  constructor(...args: LibArexaPlatformConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LibArexaPlatform> {
    return super.deploy(overrides || {}) as Promise<LibArexaPlatform>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LibArexaPlatform {
    return super.attach(address) as LibArexaPlatform;
  }
  override connect(signer: Signer): LibArexaPlatform__factory {
    return super.connect(signer) as LibArexaPlatform__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LibArexaPlatformInterface {
    return new utils.Interface(_abi) as LibArexaPlatformInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LibArexaPlatform {
    return new Contract(address, _abi, signerOrProvider) as LibArexaPlatform;
  }
}
