/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  ArexaPoolPNLFacet,
  ArexaPoolPNLFacetInterface,
} from "../../ArexaPlatform/ArexaPoolPNLFacet";

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
    name: "TargetedPausable__TargetedPaused",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "calcDivident",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getArexaIncomeParameter",
    outputs: [
      {
        internalType: "uint32",
        name: "pool_",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "arexa_",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInventory",
    outputs: [
      {
        internalType: "bool",
        name: "isEnabled",
        type: "bool",
      },
      {
        internalType: "int256",
        name: "sumQuantity",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "sumAmount",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "sumPnl",
        type: "int256",
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
    name: "getInventoryItem",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "quantity",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "deltaPnl",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "payedPnl",
            type: "int256",
          },
        ],
        internalType: "struct InventoryItem",
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
        internalType: "address",
        name: "toAccount",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "payoutArexaDivident",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "toAccount",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "payoutArexaIncome",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "payoutDivident",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "pool",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "arexa",
        type: "uint32",
      },
    ],
    name: "setArexaIncomeParameter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611a71806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80636a4600ad1161005b5780636a4600ad146101025780637dd06ce21461011e578063958e3ea81461014e578063abc16e771461017f57610088565b806305acb1301461008d5780631e5da67c146100a9578063384b2c62146100c55780635d7f850c146100e1575b600080fd5b6100a760048036038101906100a29190611245565b6101af565b005b6100c360048036038101906100be91906112d0565b610240565b005b6100df60048036038101906100da91906112d0565b610304565b005b6100e96103c0565b6040516100f99493929190611344565b60405180910390f35b61011c600480360381019061011791906113c5565b61045e565b005b61013860048036038101906101339190611418565b610584565b6040516101459190611445565b60405180910390f35b61016860048036038101906101639190611245565b610618565b60405161017692919061146f565b60405180910390f35b61019960048036038101906101949190611418565b61070e565b6040516101a691906114e9565b60405180910390f35b6101b76107a8565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610224576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161021b90611561565b60405180910390fd5b6000801b610231816107e0565b61023c333384610823565b5050565b6102486107a8565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146102b5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102ac90611561565b60405180910390fd5b7f72a415ccbbed7752b009b01c3fad0a1694ff64e2a51c65a309c0517cd732d2d16102df816108f8565b6000801b6102ec816107e0565b6102fe6102f76107a8565b8585610823565b50505050565b61030c6107a8565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610379576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161037090611561565b60405180910390fd5b7f72a415ccbbed7752b009b01c3fad0a1694ff64e2a51c65a309c0517cd732d2d16103a3816108f8565b6000801b6103b0816107e0565b6103ba8484610905565b50505050565b6000806000806103ce6107a8565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161461043b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161043290611561565b60405180910390fd5b610450610446610a09565b6317d78400610a41565b935093509350935090919293565b6104666107a8565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146104d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ca90611561565b60405180910390fd5b7f72a415ccbbed7752b009b01c3fad0a1694ff64e2a51c65a309c0517cd732d2d16104fd816108f8565b6000801b61050a816107e0565b60006305f5e100808761051d91906115df565b6105279190611610565b90506305f5e10081148061053e5750630bebc20081145b8061054c57506311e1a30081145b8061055a57506317d7840081145b806105685750631dcd650081145b61057157600080fd5b61057c868686610add565b505050505050565b600061058e6107a8565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146105fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105f290611561565b60405180910390fd5b610611610606610a09565b6317d7840084610b5d565b9050919050565b6000806106236107a8565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610690576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068790611561565b60405180910390fd5b60006305f5e10080856106a391906115df565b6106ad9190611610565b90506305f5e1008114806106c45750630bebc20081145b806106d257506311e1a30081145b806106e057506317d7840081145b806106ee5750631dcd650081145b6106f757600080fd5b61070081610cc9565b809350819450505050915091565b6107166111e9565b61071e6107a8565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161461078b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078290611561565b60405180910390fd5b6107a1610796610a09565b6317d7840084610d34565b9050919050565b6000806107b3610e13565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b6107e981610e40565b15610820576040517f2d0a436a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b600061082d610e73565b905061084661083a610a09565b6317d784008685610ea0565b8060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd61088e6107a8565b85856040518463ffffffff1660e01b81526004016108ae93929190611670565b6020604051808303816000875af11580156108cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108f191906116d3565b5050505050565b610902813361101d565b50565b600061090f610e73565b90508060040154821115610958576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161094f9061174c565b60405180910390fd5b8060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd6109a06107a8565b85856040518463ffffffff1660e01b81526004016109c093929190611670565b6020604051808303816000875af11580156109df573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a0391906116d3565b50505050565b600080610a14610e73565b90508060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b6000806000806000610a5161106e565b905060008160000160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600088815260200190815260200160002090508060000160009054906101000a900460ff168160010154826002015483600301549550955095509550505092959194509250565b6000610ae7610e73565b90508281600101600086815260200190815260200160002060000160006101000a81548163ffffffff021916908363ffffffff1602179055508181600101600086815260200190815260200160002060000160046101000a81548163ffffffff021916908363ffffffff16021790555050505050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610b9b5760009050610cc2565b6000610ba561106e565b905060008160000160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600086815260200190815260200160002090508060000160009054906101000a900460ff16610c1e57600092505050610cc2565b60008160040160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050600080836001015414610c9657826001015482600001548460030154610c89919061176c565b610c9391906117e4565b90505b60008260020154836001015483610cad919061184e565b610cb79190611892565b905080955050505050505b9392505050565b6000806000610cd6610e73565b905080600101600085815260200190815260200160002060000160009054906101000a900463ffffffff16925080600101600085815260200190815260200160002060000160049054906101000a900463ffffffff16915050915091565b610d3c6111e9565b6000610d4661106e565b905060008160000160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600086815260200190815260200160002090508060040160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060600160405290816000820154815260200160018201548152602001600282015481525050925050509392505050565b6000807ff72346055b4d7224c7ec19860d22963ca622fbb313761bfba507c1a3aeedf37290508091505090565b6000610e4a61109b565b600001600083815260200190815260200160002060009054906101000a900460ff169050919050565b6000807f1a2f703e435318ee39feac62abda44020ca215505d5ba3284195182c842a2d3090508091505090565b6000610eaa61106e565b905060008160000160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600086815260200190815260200160002090508060000160009054906101000a900460ff16610f1f575050611017565b6000831215610f63576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f5a90611947565b60405180910390fd5b6000610f70878787610b5d565b905080841315610fb5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fac906119d9565b60405180910390fd5b60008260040160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905084816002015461100a919061184e565b8160020181905550505050505b50505050565b61102782826110c8565b61106a5781816040517f521dcf0d000000000000000000000000000000000000000000000000000000008152600401611061929190611a12565b60405180910390fd5b5050565b6000807ff0375085caeab71645bf74d020ee2aa37bc7b653d9e55911c1084d8c88b3c05c90508091505090565b6000807fe8ceb94393aac3e803a9d4b376f7c5ffd7e8b6caab697212a5360c34a283caa190508091505090565b6000806110d3611169565b9050611160838260010160008460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600087815260200190815260200160002060010161119690919063ffffffff16565b91505092915050565b6000807f746c6723185dc95a8925081faed89cbd4670299390e2ebfb0b9c3e755e204ef490508091505090565b60006111be836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6111c6565b905092915050565b600080836001016000848152602001908152602001600020541415905092915050565b60405180606001604052806000815260200160008152602001600081525090565b600080fd5b6000819050919050565b6112228161120f565b811461122d57600080fd5b50565b60008135905061123f81611219565b92915050565b60006020828403121561125b5761125a61120a565b5b600061126984828501611230565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061129d82611272565b9050919050565b6112ad81611292565b81146112b857600080fd5b50565b6000813590506112ca816112a4565b92915050565b600080604083850312156112e7576112e661120a565b5b60006112f5858286016112bb565b925050602061130685828601611230565b9150509250929050565b60008115159050919050565b61132581611310565b82525050565b6000819050919050565b61133e8161132b565b82525050565b6000608082019050611359600083018761131c565b6113666020830186611335565b6113736040830185611335565b6113806060830184611335565b95945050505050565b600063ffffffff82169050919050565b6113a281611389565b81146113ad57600080fd5b50565b6000813590506113bf81611399565b92915050565b6000806000606084860312156113de576113dd61120a565b5b60006113ec86828701611230565b93505060206113fd868287016113b0565b925050604061140e868287016113b0565b9150509250925092565b60006020828403121561142e5761142d61120a565b5b600061143c848285016112bb565b91505092915050565b600060208201905061145a6000830184611335565b92915050565b61146981611389565b82525050565b60006040820190506114846000830185611460565b6114916020830184611460565b9392505050565b6114a18161132b565b82525050565b6060820160008201516114bd6000850182611498565b5060208201516114d06020850182611498565b5060408201516114e36040850182611498565b50505050565b60006060820190506114fe60008301846114a7565b92915050565b600082825260208201905092915050565b7f4e4f545f414c4c4f574544000000000000000000000000000000000000000000600082015250565b600061154b600b83611504565b915061155682611515565b602082019050919050565b6000602082019050818103600083015261157a8161153e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006115ea8261120f565b91506115f58361120f565b92508261160557611604611581565b5b828204905092915050565b600061161b8261120f565b91506116268361120f565b92508282026116348161120f565b9150828204841483151761164b5761164a6115b0565b5b5092915050565b61165b81611292565b82525050565b61166a8161120f565b82525050565b60006060820190506116856000830186611652565b6116926020830185611652565b61169f6040830184611661565b949350505050565b6116b081611310565b81146116bb57600080fd5b50565b6000815190506116cd816116a7565b92915050565b6000602082840312156116e9576116e861120a565b5b60006116f7848285016116be565b91505092915050565b7f4e6f7420656e6f75676820616d6f756e7420746f20706179206f757421000000600082015250565b6000611736601d83611504565b915061174182611700565b602082019050919050565b6000602082019050818103600083015261176581611729565b9050919050565b60006117778261132b565b91506117828361132b565b92508282026117908161132b565b91507f800000000000000000000000000000000000000000000000000000000000000084146000841216156117c8576117c76115b0565b5b82820584148315176117dd576117dc6115b0565b5b5092915050565b60006117ef8261132b565b91506117fa8361132b565b92508261180a57611809611581565b5b600160000383147f800000000000000000000000000000000000000000000000000000000000000083141615611843576118426115b0565b5b828205905092915050565b60006118598261132b565b91506118648361132b565b92508282019050828112156000831216838212600084121516171561188c5761188b6115b0565b5b92915050565b600061189d8261132b565b91506118a88361132b565b92508282039050818112600084121682821360008512151617156118cf576118ce6115b0565b5b92915050565b7f4f6e6c7920706f73697469766520616d6f756e742063616e206265207061796560008201527f64206f7574210000000000000000000000000000000000000000000000000000602082015250565b6000611931602683611504565b915061193c826118d5565b604082019050919050565b6000602082019050818103600083015261196081611924565b9050919050565b7f54686520616d6f756e7420697320626967676572207468656e2074686120706160008201527f7961626c65206469766964656e74210000000000000000000000000000000000602082015250565b60006119c3602f83611504565b91506119ce82611967565b604082019050919050565b600060208201905081810360008301526119f2816119b6565b9050919050565b6000819050919050565b611a0c816119f9565b82525050565b6000604082019050611a276000830185611a03565b611a346020830184611652565b939250505056fea2646970667358221220ea0034b5282c81651024944586ea4bb2d80be069676f9e9f174efc43155698b364736f6c63430008110033";

type ArexaPoolPNLFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ArexaPoolPNLFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ArexaPoolPNLFacet__factory extends ContractFactory {
  constructor(...args: ArexaPoolPNLFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ArexaPoolPNLFacet> {
    return super.deploy(overrides || {}) as Promise<ArexaPoolPNLFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ArexaPoolPNLFacet {
    return super.attach(address) as ArexaPoolPNLFacet;
  }
  override connect(signer: Signer): ArexaPoolPNLFacet__factory {
    return super.connect(signer) as ArexaPoolPNLFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ArexaPoolPNLFacetInterface {
    return new utils.Interface(_abi) as ArexaPoolPNLFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ArexaPoolPNLFacet {
    return new Contract(address, _abi, signerOrProvider) as ArexaPoolPNLFacet;
  }
}
