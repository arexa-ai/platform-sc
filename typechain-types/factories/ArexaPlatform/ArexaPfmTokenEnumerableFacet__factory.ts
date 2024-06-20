/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  ArexaPfmTokenEnumerableFacet,
  ArexaPfmTokenEnumerableFacetInterface,
} from "../../ArexaPlatform/ArexaPfmTokenEnumerableFacet";

const _abi = [
  {
    inputs: [],
    name: "EnumerableSet__IndexOutOfBounds",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
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
        name: "account",
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
        name: "id",
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
        name: "id",
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
  "0x608060405234801561001057600080fd5b50610af2806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806313ba55df146100515780636dcfd8411461008157806385bff2e7146100b1578063bd85b039146100e1575b600080fd5b61006b6004803603810190610066919061073f565b610111565b604051610078919061077b565b60405180910390f35b61009b6004803603810190610096919061073f565b610198565b6040516100a89190610886565b60405180910390f35b6100cb60048036038101906100c691906108d4565b61021f565b6040516100d891906109bf565b60405180910390f35b6100fb60048036038101906100f6919061073f565b6102a6565b604051610108919061077b565b60405180910390f35b600061011b61032d565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610188576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161017f90610a3e565b60405180910390fd5b61019182610365565b9050919050565b60606101a261032d565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161461020f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161020690610a3e565b60405180910390fd5b61021882610397565b9050919050565b606061022961032d565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610296576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161028d90610a3e565b60405180910390fd5b61029f8261049f565b9050919050565b60006102b061032d565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161461031d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161031490610a3e565b60405180910390fd5b610326826105a5565b9050919050565b6000806103386105d0565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b6000806103706105fd565b905061038f81600501600085815260200190815260200160002061062a565b915050919050565b606060006103a36105fd565b90506000816005016000858152602001908152602001600020905060006103c98261062a565b67ffffffffffffffff8111156103e2576103e1610a5e565b5b6040519080825280602002602001820160405280156104105781602001602082028036833780820191505090505b50905060005b61041f8361062a565b81101561049357610439818461063f90919063ffffffff16565b82828151811061044c5761044b610a8d565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508080600101915050610416565b50809350505050919050565b606060006104ab6105fd565b905060008160060160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060006104fd82610659565b67ffffffffffffffff81111561051657610515610a5e565b5b6040519080825280602002602001820160405280156105445781602001602082028036833780820191505090505b50905060005b61055383610659565b8110156105995761056d818461066e90919063ffffffff16565b8282815181106105805761057f610a8d565b5b602002602001018181525050808060010191505061054a565b50809350505050919050565b6000806105b06105fd565b905080600401600084815260200190815260200160002054915050919050565b6000807ff72346055b4d7224c7ec19860d22963ca622fbb313761bfba507c1a3aeedf37290508091505090565b6000807fe20f5a7f7e820e4505f9ef8ed1186e372d3490e37d8001618819927829be4e0590508091505090565b600061063882600001610688565b9050919050565b600061064e8360000183610699565b60001c905092915050565b600061066782600001610688565b9050919050565b600061067d8360000183610699565b60001c905092915050565b600081600001805490509050919050565b6000826000018054905082106106db576040517fe637bf3b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8260000182815481106106f1576106f0610a8d565b5b9060005260206000200154905092915050565b600080fd5b6000819050919050565b61071c81610709565b811461072757600080fd5b50565b60008135905061073981610713565b92915050565b60006020828403121561075557610754610704565b5b60006107638482850161072a565b91505092915050565b61077581610709565b82525050565b6000602082019050610790600083018461076c565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006107ed826107c2565b9050919050565b6107fd816107e2565b82525050565b600061080f83836107f4565b60208301905092915050565b6000602082019050919050565b600061083382610796565b61083d81856107a1565b9350610848836107b2565b8060005b838110156108795781516108608882610803565b975061086b8361081b565b92505060018101905061084c565b5085935050505092915050565b600060208201905081810360008301526108a08184610828565b905092915050565b6108b1816107e2565b81146108bc57600080fd5b50565b6000813590506108ce816108a8565b92915050565b6000602082840312156108ea576108e9610704565b5b60006108f8848285016108bf565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61093681610709565b82525050565b6000610948838361092d565b60208301905092915050565b6000602082019050919050565b600061096c82610901565b610976818561090c565b93506109818361091d565b8060005b838110156109b2578151610999888261093c565b97506109a483610954565b925050600181019050610985565b5085935050505092915050565b600060208201905081810360008301526109d98184610961565b905092915050565b600082825260208201905092915050565b7f4e4f545f414c4c4f574544000000000000000000000000000000000000000000600082015250565b6000610a28600b836109e1565b9150610a33826109f2565b602082019050919050565b60006020820190508181036000830152610a5781610a1b565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea26469706673582212202a7d7ddddfaced17f7d8e673bc32cd0c4541327bf6edfe455b2ad7e2ac0de09d64736f6c63430008110033";

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
