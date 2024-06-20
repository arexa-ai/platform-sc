/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  ArexaOwnershipFacet,
  ArexaOwnershipFacetInterface,
} from "../../ArexaPlatform/ArexaOwnershipFacet";

const _abi = [
  {
    inputs: [],
    name: "Ownable__NotOwner",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506109b0806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80638da5cb5b1461003b578063f2fde38b14610059575b600080fd5b610043610075565b6040516100509190610850565b60405180910390f35b610073600480360381019061006e919061089c565b610084565b005b600061007f610168565b905090565b61008c6101a0565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146100f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100f090610926565b60405180910390fd5b6101016101d8565b61010a81610246565b6101347f72a415ccbbed7752b009b01c3fad0a1694ff64e2a51c65a309c0517cd732d2d18061025a565b6101657f72a415ccbbed7752b009b01c3fad0a1694ff64e2a51c65a309c0517cd732d2d1610160610168565b61036b565b50565b6000806101736104b7565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b6000806101ab6104e4565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b6101e0610168565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610244576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b61024e6101d8565b61025781610511565b50565b60006102646104b7565b90506000610271846105f5565b9050828260010160008460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008681526020019081526020016000206000018190555082818360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f723017596f662d5bad698223ec9b9d90c19cd1ebc637a2ad7ef27b3d9f85f79c8760405161035d919061095f565b60405180910390a450505050565b60006103756104b7565b90506103818383610684565b6104b257610410828260010160008460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600086815260200190815260200160002060010161072590919063ffffffff16565b503373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff168260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fc1ddb807f72f9e732ef6f32805c68a3b77ca377c0e141fe3bcaf19fe667f3534866040516104a9919061095f565b60405180910390a45b505050565b6000807f746c6723185dc95a8925081faed89cbd4670299390e2ebfb0b9c3e755e204ef490508091505090565b6000807ff72346055b4d7224c7ec19860d22963ca622fbb313761bfba507c1a3aeedf37290508091505090565b600061051b6104b7565b905060008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050828260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506105966000801b8461036b565b8273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3505050565b6000806106006104b7565b90508060010160008260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002060000154915050919050565b60008061068f6104b7565b905061071c838260010160008460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600087815260200190815260200160002060010161075590919063ffffffff16565b91505092915050565b600061074d836000018373ffffffffffffffffffffffffffffffffffffffff1660001b610785565b905092915050565b600061077d836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6107ec565b905092915050565b600061079183836107ec565b6107e65782600001829080600181540180825580915050600190039060005260206000200160009091909190915055826000018054905083600101600084815260200190815260200160002081905550600190505b92915050565b600080836001016000848152602001908152602001600020541415905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061083a8261080f565b9050919050565b61084a8161082f565b82525050565b60006020820190506108656000830184610841565b92915050565b600080fd5b6108798161082f565b811461088457600080fd5b50565b60008135905061089681610870565b92915050565b6000602082840312156108b2576108b161086b565b5b60006108c084828501610887565b91505092915050565b600082825260208201905092915050565b7f4e4f545f414c4c4f574544000000000000000000000000000000000000000000600082015250565b6000610910600b836108c9565b915061091b826108da565b602082019050919050565b6000602082019050818103600083015261093f81610903565b9050919050565b6000819050919050565b61095981610946565b82525050565b60006020820190506109746000830184610950565b9291505056fea2646970667358221220f6a56db21409796028b378e4601d6c93785d2d8a50ddf94eff121b1db058ce2764736f6c63430008110033";

type ArexaOwnershipFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ArexaOwnershipFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ArexaOwnershipFacet__factory extends ContractFactory {
  constructor(...args: ArexaOwnershipFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ArexaOwnershipFacet> {
    return super.deploy(overrides || {}) as Promise<ArexaOwnershipFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ArexaOwnershipFacet {
    return super.attach(address) as ArexaOwnershipFacet;
  }
  override connect(signer: Signer): ArexaOwnershipFacet__factory {
    return super.connect(signer) as ArexaOwnershipFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ArexaOwnershipFacetInterface {
    return new utils.Interface(_abi) as ArexaOwnershipFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ArexaOwnershipFacet {
    return new Contract(address, _abi, signerOrProvider) as ArexaOwnershipFacet;
  }
}
