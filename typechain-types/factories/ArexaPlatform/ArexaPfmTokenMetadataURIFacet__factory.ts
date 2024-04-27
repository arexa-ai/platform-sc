/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  ArexaPfmTokenMetadataURIFacet,
  ArexaPfmTokenMetadataURIFacetInterface,
} from "../../ArexaPlatform/ArexaPfmTokenMetadataURIFacet";

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
    inputs: [],
    name: "getTokenBaseUri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
    name: "getTokenUri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newuri",
        type: "string",
      },
    ],
    name: "setTokenBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "newuri",
        type: "string",
      },
    ],
    name: "setTokenURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newuri",
        type: "string",
      },
    ],
    name: "setURI",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611176806100206000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80634e16fc8b1161005b5780634e16fc8b146100ea5780638ad91345146101085780638ef79e9114610138578063b762fcfc146101545761007d565b806302fe5305146100825780630e89341c1461009e578063162094c4146100ce575b600080fd5b61009c60048036038101906100979190610b2e565b610172565b005b6100b860048036038101906100b39190610bad565b610209565b6040516100c59190610c59565b60405180910390f35b6100e860048036038101906100e39190610c7b565b61021b565b005b6100f26102e5565b6040516100ff9190610c59565b60405180910390f35b610122600480360381019061011d9190610bad565b6102f4565b60405161012f9190610c59565b60405180910390f35b610152600480360381019061014d9190610b2e565b610306565b005b61015c61039d565b6040516101699190610c59565b60405180910390f35b61017a6103ac565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146101e7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101de90610d23565b60405180910390fd5b6101ef6103e4565b6000801b6101fc81610452565b61020582610495565b5050565b6060610214826104b7565b9050919050565b6102236103ac565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610290576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161028790610d23565b60405180910390fd5b6102986103e4565b6000801b6102a581610452565b826040516020016102b69190610d64565b604051602081830303815290604052805190602001206102d581610452565b6102df8484610631565b50505050565b60606102ef61069d565b905090565b60606102ff8261073e565b9050919050565b61030e6103ac565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161461037b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161037290610d23565b60405180910390fd5b6103836103e4565b6000801b61039081610452565b610399826107f2565b5050565b60606103a7610814565b905090565b6000806103b76108b5565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b6103ec6108e2565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610450576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b61045b8161091a565b15610492576040517f2d0a436a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b600061049f61094d565b9050818160070190816104b29190610f8b565b505050565b606060006104c361094d565b9050600081600901600085815260200190815260200160002080546104e790610dae565b80601f016020809104026020016040519081016040528092919081815260200182805461051390610dae565b80156105605780601f1061053557610100808354040283529160200191610560565b820191906000526020600020905b81548152906001019060200180831161054357829003601f168201915b5050505050905060008151116106025781600701805461057f90610dae565b80601f01602080910402602001604051908101604052809291908181526020018280546105ab90610dae565b80156105f85780601f106105cd576101008083540402835291602001916105f8565b820191906000526020600020905b8154815290600101906020018083116105db57829003601f168201915b5050505050610628565b816008018160405160200161061892919061111c565b6040516020818303038152906040525b92505050919050565b600061063b61094d565b905081816009016000858152602001908152602001600020908161065f9190610f8b565b50827f6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b836040516106909190610c59565b60405180910390a2505050565b606060006106a961094d565b90508060070180546106ba90610dae565b80601f01602080910402602001604051908101604052809291908181526020018280546106e690610dae565b80156107335780601f1061070857610100808354040283529160200191610733565b820191906000526020600020905b81548152906001019060200180831161071657829003601f168201915b505050505091505090565b6060600061074a61094d565b9050806009016000848152602001908152602001600020805461076c90610dae565b80601f016020809104026020016040519081016040528092919081815260200182805461079890610dae565b80156107e55780601f106107ba576101008083540402835291602001916107e5565b820191906000526020600020905b8154815290600101906020018083116107c857829003601f168201915b5050505050915050919050565b60006107fc61094d565b90508181600801908161080f9190610f8b565b505050565b6060600061082061094d565b905080600801805461083190610dae565b80601f016020809104026020016040519081016040528092919081815260200182805461085d90610dae565b80156108aa5780601f1061087f576101008083540402835291602001916108aa565b820191906000526020600020905b81548152906001019060200180831161088d57829003601f168201915b505050505091505090565b6000807ff72346055b4d7224c7ec19860d22963ca622fbb313761bfba507c1a3aeedf37290508091505090565b6000806108ed61097a565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b60006109246109a7565b600001600083815260200190815260200160002060009054906101000a900460ff169050919050565b6000807fe20f5a7f7e820e4505f9ef8ed1186e372d3490e37d8001618819927829be4e0590508091505090565b6000807f746c6723185dc95a8925081faed89cbd4670299390e2ebfb0b9c3e755e204ef490508091505090565b6000807fe8ceb94393aac3e803a9d4b376f7c5ffd7e8b6caab697212a5360c34a283caa190508091505090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610a3b826109f2565b810181811067ffffffffffffffff82111715610a5a57610a59610a03565b5b80604052505050565b6000610a6d6109d4565b9050610a798282610a32565b919050565b600067ffffffffffffffff821115610a9957610a98610a03565b5b610aa2826109f2565b9050602081019050919050565b82818337600083830152505050565b6000610ad1610acc84610a7e565b610a63565b905082815260208101848484011115610aed57610aec6109ed565b5b610af8848285610aaf565b509392505050565b600082601f830112610b1557610b146109e8565b5b8135610b25848260208601610abe565b91505092915050565b600060208284031215610b4457610b436109de565b5b600082013567ffffffffffffffff811115610b6257610b616109e3565b5b610b6e84828501610b00565b91505092915050565b6000819050919050565b610b8a81610b77565b8114610b9557600080fd5b50565b600081359050610ba781610b81565b92915050565b600060208284031215610bc357610bc26109de565b5b6000610bd184828501610b98565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610c14578082015181840152602081019050610bf9565b60008484015250505050565b6000610c2b82610bda565b610c358185610be5565b9350610c45818560208601610bf6565b610c4e816109f2565b840191505092915050565b60006020820190508181036000830152610c738184610c20565b905092915050565b60008060408385031215610c9257610c916109de565b5b6000610ca085828601610b98565b925050602083013567ffffffffffffffff811115610cc157610cc06109e3565b5b610ccd85828601610b00565b9150509250929050565b7f4e4f545f414c4c4f574544000000000000000000000000000000000000000000600082015250565b6000610d0d600b83610be5565b9150610d1882610cd7565b602082019050919050565b60006020820190508181036000830152610d3c81610d00565b9050919050565b6000819050919050565b610d5e610d5982610b77565b610d43565b82525050565b6000610d708284610d4d565b60208201915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610dc657607f821691505b602082108103610dd957610dd8610d7f565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302610e417fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610e04565b610e4b8683610e04565b95508019841693508086168417925050509392505050565b6000819050919050565b6000610e88610e83610e7e84610b77565b610e63565b610b77565b9050919050565b6000819050919050565b610ea283610e6d565b610eb6610eae82610e8f565b848454610e11565b825550505050565b600090565b610ecb610ebe565b610ed6818484610e99565b505050565b5b81811015610efa57610eef600082610ec3565b600181019050610edc565b5050565b601f821115610f3f57610f1081610ddf565b610f1984610df4565b81016020851015610f28578190505b610f3c610f3485610df4565b830182610edb565b50505b505050565b600082821c905092915050565b6000610f6260001984600802610f44565b1980831691505092915050565b6000610f7b8383610f51565b9150826002028217905092915050565b610f9482610bda565b67ffffffffffffffff811115610fad57610fac610a03565b5b610fb78254610dae565b610fc2828285610efe565b600060209050601f831160018114610ff55760008415610fe3578287015190505b610fed8582610f6f565b865550611055565b601f19841661100386610ddf565b60005b8281101561102b57848901518255600182019150602085019450602081019050611006565b868310156110485784890151611044601f891682610f51565b8355505b6001600288020188555050505b505050505050565b600081905092915050565b6000815461107581610dae565b61107f818661105d565b9450600182166000811461109a57600181146110af576110e2565b60ff19831686528115158202860193506110e2565b6110b885610ddf565b60005b838110156110da578154818901526001820191506020810190506110bb565b838801955050505b50505092915050565b60006110f682610bda565b611100818561105d565b9350611110818560208601610bf6565b80840191505092915050565b60006111288285611068565b915061113482846110eb565b9150819050939250505056fea26469706673582212201b429ebea664f398c0fbb00ce385a71751071506c370a0a71027b4720d17f81264736f6c63430008110033";

type ArexaPfmTokenMetadataURIFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ArexaPfmTokenMetadataURIFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ArexaPfmTokenMetadataURIFacet__factory extends ContractFactory {
  constructor(...args: ArexaPfmTokenMetadataURIFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ArexaPfmTokenMetadataURIFacet> {
    return super.deploy(
      overrides || {}
    ) as Promise<ArexaPfmTokenMetadataURIFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ArexaPfmTokenMetadataURIFacet {
    return super.attach(address) as ArexaPfmTokenMetadataURIFacet;
  }
  override connect(signer: Signer): ArexaPfmTokenMetadataURIFacet__factory {
    return super.connect(signer) as ArexaPfmTokenMetadataURIFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ArexaPfmTokenMetadataURIFacetInterface {
    return new utils.Interface(_abi) as ArexaPfmTokenMetadataURIFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ArexaPfmTokenMetadataURIFacet {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ArexaPfmTokenMetadataURIFacet;
  }
}
