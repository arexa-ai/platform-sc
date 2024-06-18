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
        name: "pool",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "arexa",
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPoolAndArexaIncomeBalances",
    outputs: [
      {
        internalType: "uint256",
        name: "pool",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "poolPaidOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "arexa",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "arexaPaidOut",
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
  "0x608060405234801561001057600080fd5b50611ef5806100206000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80636a4600ad116100665780636a4600ad1461010d5780637dd06ce214610129578063958e3ea814610159578063abc16e771461018a578063bb28a839146101bc57610093565b806305acb130146100985780631e5da67c146100b4578063384b2c62146100d05780635d7f850c146100ec575b600080fd5b6100b260048036038101906100ad9190611556565b6101dd565b005b6100ce60048036038101906100c991906115e1565b61026e565b005b6100ea60048036038101906100e591906115e1565b610332565b005b6100f46103ee565b6040516101049493929190611655565b60405180910390f35b610127600480360381019061012291906116d6565b610494565b005b610143600480360381019061013e9190611729565b6105ba565b6040516101509190611756565b60405180910390f35b610173600480360381019061016e9190611556565b61064e565b604051610181929190611780565b60405180910390f35b6101a4600480360381019061019f9190611729565b610744565b6040516101b3939291906117a9565b60405180910390f35b6101c46107e7565b6040516101d494939291906117ef565b60405180910390f35b6101e5610880565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610252576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161024990611891565b60405180910390fd5b6000801b61025f816108b8565b61026a3333846108fb565b5050565b610276610880565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146102e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102da90611891565b60405180910390fd5b7f72a415ccbbed7752b009b01c3fad0a1694ff64e2a51c65a309c0517cd732d2d161030d8161096b565b6000801b61031a816108b8565b61032c610325610880565b85856108fb565b50505050565b61033a610880565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146103a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161039e90611891565b60405180910390fd5b7f72a415ccbbed7752b009b01c3fad0a1694ff64e2a51c65a309c0517cd732d2d16103d18161096b565b6000801b6103de816108b8565b6103e88484610978565b50505050565b6000806000806103fc610880565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610469576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161046090611891565b60405180910390fd5b61047e610474610a26565b6317d78400610a5e565b8094508195508296508397505050505090919293565b61049c610880565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610509576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050090611891565b60405180910390fd5b7f72a415ccbbed7752b009b01c3fad0a1694ff64e2a51c65a309c0517cd732d2d16105338161096b565b6000801b610540816108b8565b60006305f5e1008087610553919061190f565b61055d9190611940565b90506305f5e1008114806105745750630bebc20081145b8061058257506311e1a30081145b8061059057506317d7840081145b8061059e5750631dcd650081145b6105a757600080fd5b6105b2868686610afa565b505050505050565b60006105c4610880565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610631576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062890611891565b60405180910390fd5b61064761063c610a26565b6317d7840084610b7a565b9050919050565b600080610659610880565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146106c6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106bd90611891565b60405180910390fd5b60006305f5e10080856106d9919061190f565b6106e39190611940565b90506305f5e1008114806106fa5750630bebc20081145b8061070857506311e1a30081145b8061071657506317d7840081145b806107245750631dcd650081145b61072d57600080fd5b61073681610ce6565b809350819450505050915091565b6000806000610751610880565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146107be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107b590611891565b60405180910390fd5b6107d46107c9610a26565b6317d7840086610d51565b8093508194508295505050509193909250565b6000806000806107f5610880565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610862576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161085990611891565b60405180910390fd5b61086a610e97565b8094508195508296508397505050505090919293565b60008061088b610ecc565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b6108c181610ef9565b156108f8576040517f2d0a436a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b6000610905610f2c565b905061091e610912610a26565b6317d784008685610f59565b81816008015461092e9190611982565b81600801819055506109658160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684846110d6565b50505050565b61097581336111de565b50565b6000610982610f2c565b905080600401548282600901546109999190611982565b11156109da576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109d190611a02565b60405180910390fd5b8181600901546109ea9190611982565b8160090181905550610a218160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684846110d6565b505050565b600080610a31610f2c565b90508060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b6000806000806000610a6e61122f565b905060008160000160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600088815260200190815260200160002090508060000160009054906101000a900460ff168160010154826002015483600301549550955095509550505092959194509250565b6000610b04610f2c565b90508281600101600086815260200190815260200160002060000160006101000a81548163ffffffff021916908363ffffffff1602179055508181600101600086815260200190815260200160002060000160046101000a81548163ffffffff021916908363ffffffff16021790555050505050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610bb85760009050610cdf565b6000610bc261122f565b905060008160000160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600086815260200190815260200160002090508060000160009054906101000a900460ff16610c3b57600092505050610cdf565b60008160040160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050600080836001015414610cb357826001015482600001548460030154610ca69190611a22565b610cb09190611a9a565b90505b60008260020154836001015483610cca9190611b04565b610cd49190611b48565b905080955050505050505b9392505050565b6000806000610cf3610f2c565b905080600101600085815260200190815260200160002060000160009054906101000a900463ffffffff16925080600101600085815260200190815260200160002060000160049054906101000a900463ffffffff16915050915091565b600080600080610d5f61122f565b905060008160000160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600088815260200190815260200160002090508060040160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001548160040160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101548260040160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154945094509450505093509350939050565b6000806000806000610ea7610f2c565b9050806003015494508060080154935080600401549250806009015491505090919293565b6000807ff72346055b4d7224c7ec19860d22963ca622fbb313761bfba507c1a3aeedf37290508091505090565b6000610f0361125c565b600001600083815260200190815260200160002060009054906101000a900460ff169050919050565b6000807f1a2f703e435318ee39feac62abda44020ca215505d5ba3284195182c842a2d3090508091505090565b6000610f6361122f565b905060008160000160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600086815260200190815260200160002090508060000160009054906101000a900460ff16610fd85750506110d0565b600083121561101c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161101390611bfd565b60405180910390fd5b6000611029878787610b7a565b90508084131561106e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161106590611c8f565b60405180910390fd5b60008260040160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508481600201546110c39190611b04565b8160020181905550505050505b50505050565b60006111718473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb858560405160240161110a929190611cbe565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050508573ffffffffffffffffffffffffffffffffffffffff1661128990919063ffffffff16565b905060008151141580156111965750808060200190518101906111949190611d13565b155b156111d857836040517f5274afe70000000000000000000000000000000000000000000000000000000081526004016111cf9190611d40565b60405180910390fd5b50505050565b6111e882826112b6565b61122b5781816040517f521dcf0d000000000000000000000000000000000000000000000000000000008152600401611222929190611d74565b60405180910390fd5b5050565b6000807ff0375085caeab71645bf74d020ee2aa37bc7b653d9e55911c1084d8c88b3c05c90508091505090565b6000807fe8ceb94393aac3e803a9d4b376f7c5ffd7e8b6caab697212a5360c34a283caa190508091505090565b60606112ae8383604051806060016040528060238152602001611e9d60239139611357565b905092915050565b6000806112c161136f565b905061134e838260010160008460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600087815260200190815260200160002060010161139c90919063ffffffff16565b91505092915050565b606061136684846000856113cc565b90509392505050565b6000807f746c6723185dc95a8925081faed89cbd4670299390e2ebfb0b9c3e755e204ef490508091505090565b60006113c4836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6114e5565b905092915050565b60606113d785611508565b61140d576040517f89c35afc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516114369190611e0e565b60006040518083038185875af1925050503d8060008114611473576040519150601f19603f3d011682016040523d82523d6000602084013e611478565b606091505b5091509150811561148d5780925050506114dd565b6000815111156114a05780518082602001fd5b836040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114d49190611e7a565b60405180910390fd5b949350505050565b600080836001016000848152602001908152602001600020541415905092915050565b600080823b905060008111915050919050565b600080fd5b6000819050919050565b61153381611520565b811461153e57600080fd5b50565b6000813590506115508161152a565b92915050565b60006020828403121561156c5761156b61151b565b5b600061157a84828501611541565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006115ae82611583565b9050919050565b6115be816115a3565b81146115c957600080fd5b50565b6000813590506115db816115b5565b92915050565b600080604083850312156115f8576115f761151b565b5b6000611606858286016115cc565b925050602061161785828601611541565b9150509250929050565b60008115159050919050565b61163681611621565b82525050565b6000819050919050565b61164f8161163c565b82525050565b600060808201905061166a600083018761162d565b6116776020830186611646565b6116846040830185611646565b6116916060830184611646565b95945050505050565b600063ffffffff82169050919050565b6116b38161169a565b81146116be57600080fd5b50565b6000813590506116d0816116aa565b92915050565b6000806000606084860312156116ef576116ee61151b565b5b60006116fd86828701611541565b935050602061170e868287016116c1565b925050604061171f868287016116c1565b9150509250925092565b60006020828403121561173f5761173e61151b565b5b600061174d848285016115cc565b91505092915050565b600060208201905061176b6000830184611646565b92915050565b61177a8161169a565b82525050565b60006040820190506117956000830185611771565b6117a26020830184611771565b9392505050565b60006060820190506117be6000830186611646565b6117cb6020830185611646565b6117d86040830184611646565b949350505050565b6117e981611520565b82525050565b600060808201905061180460008301876117e0565b61181160208301866117e0565b61181e60408301856117e0565b61182b60608301846117e0565b95945050505050565b600082825260208201905092915050565b7f4e4f545f414c4c4f574544000000000000000000000000000000000000000000600082015250565b600061187b600b83611834565b915061188682611845565b602082019050919050565b600060208201905081810360008301526118aa8161186e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061191a82611520565b915061192583611520565b925082611935576119346118b1565b5b828204905092915050565b600061194b82611520565b915061195683611520565b925082820261196481611520565b9150828204841483151761197b5761197a6118e0565b5b5092915050565b600061198d82611520565b915061199883611520565b92508282019050808211156119b0576119af6118e0565b5b92915050565b7f4e6f7420656e6f75676820616d6f756e7420746f20706179206f757421000000600082015250565b60006119ec601d83611834565b91506119f7826119b6565b602082019050919050565b60006020820190508181036000830152611a1b816119df565b9050919050565b6000611a2d8261163c565b9150611a388361163c565b9250828202611a468161163c565b91507f80000000000000000000000000000000000000000000000000000000000000008414600084121615611a7e57611a7d6118e0565b5b8282058414831517611a9357611a926118e0565b5b5092915050565b6000611aa58261163c565b9150611ab08361163c565b925082611ac057611abf6118b1565b5b600160000383147f800000000000000000000000000000000000000000000000000000000000000083141615611af957611af86118e0565b5b828205905092915050565b6000611b0f8261163c565b9150611b1a8361163c565b925082820190508281121560008312168382126000841215161715611b4257611b416118e0565b5b92915050565b6000611b538261163c565b9150611b5e8361163c565b9250828203905081811260008412168282136000851215161715611b8557611b846118e0565b5b92915050565b7f4f6e6c7920706f73697469766520616d6f756e742063616e206265207061796560008201527f64206f7574210000000000000000000000000000000000000000000000000000602082015250565b6000611be7602683611834565b9150611bf282611b8b565b604082019050919050565b60006020820190508181036000830152611c1681611bda565b9050919050565b7f54686520616d6f756e7420697320626967676572207468656e2074686120706160008201527f7961626c65206469766964656e74210000000000000000000000000000000000602082015250565b6000611c79602f83611834565b9150611c8482611c1d565b604082019050919050565b60006020820190508181036000830152611ca881611c6c565b9050919050565b611cb8816115a3565b82525050565b6000604082019050611cd36000830185611caf565b611ce060208301846117e0565b9392505050565b611cf081611621565b8114611cfb57600080fd5b50565b600081519050611d0d81611ce7565b92915050565b600060208284031215611d2957611d2861151b565b5b6000611d3784828501611cfe565b91505092915050565b6000602082019050611d556000830184611caf565b92915050565b6000819050919050565b611d6e81611d5b565b82525050565b6000604082019050611d896000830185611d65565b611d966020830184611caf565b9392505050565b600081519050919050565b600081905092915050565b60005b83811015611dd1578082015181840152602081019050611db6565b60008484015250505050565b6000611de882611d9d565b611df28185611da8565b9350611e02818560208601611db3565b80840191505092915050565b6000611e1a8284611ddd565b915081905092915050565b600081519050919050565b6000601f19601f8301169050919050565b6000611e4c82611e25565b611e568185611834565b9350611e66818560208601611db3565b611e6f81611e30565b840191505092915050565b60006020820190508181036000830152611e948184611e41565b90509291505056fe416464726573735574696c733a206661696c6564206c6f772d6c6576656c2063616c6ca264697066735822122032182302051fe39f9fd67a7e8cfeb25fc89453806a84c1e9b657a9198a802b5364736f6c63430008110033";

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
