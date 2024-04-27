/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  ArexaStakingFacet,
  ArexaStakingFacetInterface,
} from "../../ArexaPlatform/ArexaStakingFacet";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
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
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
    ],
    name: "stakeArexaToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "fromAccount",
        type: "address",
      },
      {
        internalType: "address",
        name: "toAccount",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_quantity",
        type: "uint256",
      },
    ],
    name: "withdrawArexaToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50612ab5806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806387ed85ac1461003b5780638b94028714610057575b600080fd5b61005560048036038101906100509190611e10565b610073565b005b610071600480360381019061006c9190611e63565b6100f9565b005b61007b61017c565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16146100e8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100df90611eed565b60405180910390fd5b6100f4338484846101b4565b505050565b61010161017c565b73ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161461016e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161016590611eed565b60405180910390fd5b61017933338361034d565b50565b60008061018761054b565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b60006101be610578565b905060008160060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa158015610231573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102559190611f46565b600a61026191906120d5565b9050600081846102719190612120565b905061029b878761028061017c565b6317d7840088604051806020016040528060008152506105a5565b8260060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166340c10f1986836040518363ffffffff1660e01b81526004016102fa929190612180565b600060405180830381600087803b15801561031457600080fd5b505af1158015610328573d6000803e3d6000fd5b5050505083836007015461033c91906121a9565b836007018190555050505050505050565b6000610357610578565b905060008160060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663313ce5676040518163ffffffff1660e01b8152600401602060405180830381865afa1580156103ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ee9190611f46565b600a6103fa91906120d5565b90506000818461040a919061220c565b90506000828261041a9190612120565b905060008211801561042c5750600081115b61046b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610462906122af565b60405180910390fd5b8360060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166379cc679088836040518363ffffffff1660e01b81526004016104ca929190612180565b600060405180830381600087803b1580156104e457600080fd5b505af11580156104f8573d6000803e3d6000fd5b50505050600061050661017c565b90506105298182896317d7840087604051806020016040528060008152506105a5565b82856007015461053991906122cf565b85600701819055505050505050505050565b6000807ff72346055b4d7224c7ec19860d22963ca622fbb313761bfba507c1a3aeedf37290508091505090565b6000807f1a2f703e435318ee39feac62abda44020ca215505d5ba3284195182c842a2d3090508091505090565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff160361060b576040517fa25202b800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000610616846109d0565b90506000610623846109d0565b9050610633888888858588610a4a565b600061063d610cfb565b90506106498187610d28565b600081600001600088815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050808611156106da576040517fb38aedf300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6106e68a8a8989610d98565b85810382600001600089815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508873ffffffffffffffffffffffffffffffffffffffff168a73ffffffffffffffffffffffffffffffffffffffff16146108c15781600201600088815260200190815260200160002060009054906101000a900460ff16156108c057858260030160008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600089815260200190815260200160002054038260030160008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000898152602001908152602001600020819055505b5b8582600001600089815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461092391906122cf565b925050819055508773ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff168b73ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628a8a6040516109a0929190612303565b60405180910390a46109b68a8a8a87878a610f95565b6109c48a8a8a8a8a8a610fab565b50505050505050505050565b60606000600167ffffffffffffffff8111156109ef576109ee61232c565b5b604051908082528060200260200182016040528015610a1d5781602001602082028036833780820191505090505b5090508281600081518110610a3557610a3461235b565b5b60200260200101818152505080915050919050565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614610ce5576000610a87610cfb565b9050600081600501905060008260060160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008360060160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060005b8751811015610cdf576000878281518110610b3c57610b3b61235b565b5b602002602001015190506000811115610cd1576000898381518110610b6457610b6361235b565b5b60200260200101519050600073ffffffffffffffffffffffffffffffffffffffff168c73ffffffffffffffffffffffffffffffffffffffff1603610bd357818760040160008381526020019081526020016000206000828254610bc791906122cf565b92505081905550610c1e565b81610bde8d83611170565b03610c1d57610c078c87600084815260200190815260200160002061123f90919063ffffffff16565b50610c1b818661126f90919063ffffffff16565b505b5b600073ffffffffffffffffffffffffffffffffffffffff168b73ffffffffffffffffffffffffffffffffffffffff1603610c8357818760040160008381526020019081526020016000206000828254610c7791906121a9565b92505081905550610ccf565b6000610c8f8c83611170565b03610cce57610cb88b87600084815260200190815260200160002061128990919063ffffffff16565b50610ccc81856112b990919063ffffffff16565b505b5b505b818060010192505050610b1e565b50505050505b610cf38686868686866112d3565b505050505050565b6000807fe20f5a7f7e820e4505f9ef8ed1186e372d3490e37d8001618819927829be4e0590508091505090565b610d318261131c565b81600b01600082815260200190815260200160002060009054906101000a900460ff1615610d94576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d8b906123d6565b60405180910390fd5b5050565b6000610da2610cfb565b90508473ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614610f8e578060010160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610e99576040517f3d2f0b3700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600201600084815260200190815260200160002060009054906101000a900460ff168015610f565750818160030160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002054105b15610f8d576040517f32af163800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5b5050505050565b610fa3868686868686611371565b505050505050565b610fca8473ffffffffffffffffffffffffffffffffffffffff1661145f565b15611168578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b8152600401611010959493929190612486565b6020604051808303816000875af192505050801561104c57506040513d601f19601f820116820180604052508101906110499190612538565b60015b6110e857611058612572565b806308c379a0036110b4575061106c6125c5565b8061107757506110b6565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110ab9190612699565b60405180910390fd5b505b6040517f4eebd08100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611166576040517f542073e700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b505b505050505050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036111d7576040517f4a772c2700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006111e1610cfb565b905080600001600084815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205491505092915050565b6000611267836000018373ffffffffffffffffffffffffffffffffffffffff1660001b611472565b905092915050565b6000611281836000018360001b611472565b905092915050565b60006112b1836000018373ffffffffffffffffffffffffffffffffffffffff1660001b611556565b905092915050565b60006112cb836000018360001b611556565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614611314576113128584846115bd565b505b505050505050565b80600a0160009054906101000a900460ff161561136e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161136590612707565b60405180910390fd5b50565b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16146113b3576113b2858484600061165f565b5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16146113f5576113f4848484600161165f565b5b60005b83518110156114565761144961140c6116fa565b85838151811061141f5761141e61235b565b5b6020026020010151888887868151811061143c5761143b61235b565b5b6020026020010151611732565b80806001019150506113f8565b50505050505050565b600080823b905060008111915050919050565b6000808360010160008481526020019081526020016000205490506000811461154f576000846000016001866000018054905003815481106114b7576114b661235b565b5b90600052602060002001549050808560000160018403815481106114de576114dd61235b565b5b90600052602060002001819055508185600101600083815260200190815260200160002081905550508360000180548061151b5761151a612727565b5b6001900381819060005260206000200160009055905583600101600084815260200190815260200160002060009055600191505b5092915050565b60006115628383611866565b6115b75782600001829080600181540180825580915050600190039060005260206000200160009091909190915055826000018054905083600101600084815260200190815260200160002081905550600190505b92915050565b600081518351146115fa576040517f583b4bea00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b8351811015611653576116458585838151811061161d5761161c61235b565b5b60200260200101518584815181106116385761163761235b565b5b6020026020010151611889565b5080806001019150506115fd565b50600190509392505050565b815183511461169a576040517f583b4bea00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b83518110156116f3576116e6858583815181106116bd576116bc61235b565b5b60200260200101518584815181106116d8576116d761235b565b5b6020026020010151856119db565b808060010191505061169d565b5050505050565b600080611705610578565b90508060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b600061173c611b79565b905060008160000160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600087815260200190815260200160002090508060000160009054906101000a900460ff166117b157505061185f565b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161461181c5761181b8186857fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6118169190612760565b611ba6565b5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161461185c5761185b818585611ba6565b5b50505b5050505050565b600080836001016000848152602001908152602001600020541415905092915050565b600080611894611d27565b905060008160000160008681526020019081526020016000209050438160010154116118c5576001925050506119d4565b60008160030160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506000600c8260030154836000015461192291906121a9565b61192c919061220c565b836002015483600201544361194191906121a9565b61194b919061220c565b6119559190612120565b90506000826001015461197b83856003015461197191906122cf565b8560000154611d54565b61198591906121a9565b9050808711156119ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119c19061284a565b60405180910390fd5b6001955050505050505b9392505050565b60006119e5611d27565b90506000816000016000868152602001908152602001600020905043816001015411611a12575050611b73565b60008160030160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905043826000015411611aac5760018460ff1603611aa45784816000016000828254611a8191906122cf565b9250508190555084816003016000828254611a9c91906122cf565b925050819055505b505050611b73565b6000600c82600301548360000154611ac491906121a9565b611ace919061220c565b8360020154836002015443611ae391906121a9565b611aed919061220c565b611af79190612120565b9050611b16818360030154611b0c91906122cf565b8360000154611d54565b826003018190555060018560ff1603611b495785826000016000828254611b3d91906122cf565b92505081905550611b65565b85826001016000828254611b5d91906122cf565b925050819055505b438260020181905550505050505b50505050565b6000807ff0375085caeab71645bf74d020ee2aa37bc7b653d9e55911c1084d8c88b3c05c90508091505090565b60008360040160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506000828560010154611bfd919061286a565b1215611c3e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c3590612920565b60405180910390fd5b6000828260000154611c50919061286a565b1215611c91576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c88906129b2565b60405180910390fd5b600080856001015414611cc0578460010154838660030154611cb39190612760565b611cbd91906129d2565b90505b828560010154611cd0919061286a565b8560010181905550808560030154611ce8919061286a565b8560030181905550828260000154611d00919061286a565b8260000181905550808260010154611d189190612a3c565b82600101819055505050505050565b6000807fb666c964c288db81fc3205a9feeb13cfebbde2a4a4664c45ea26ef9d3d8de79290508091505090565b6000818311611d635782611d65565b815b905092915050565b6000604051905090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611da782611d7c565b9050919050565b611db781611d9c565b8114611dc257600080fd5b50565b600081359050611dd481611dae565b92915050565b6000819050919050565b611ded81611dda565b8114611df857600080fd5b50565b600081359050611e0a81611de4565b92915050565b600080600060608486031215611e2957611e28611d77565b5b6000611e3786828701611dc5565b9350506020611e4886828701611dc5565b9250506040611e5986828701611dfb565b9150509250925092565b600060208284031215611e7957611e78611d77565b5b6000611e8784828501611dfb565b91505092915050565b600082825260208201905092915050565b7f4e4f545f414c4c4f574544000000000000000000000000000000000000000000600082015250565b6000611ed7600b83611e90565b9150611ee282611ea1565b602082019050919050565b60006020820190508181036000830152611f0681611eca565b9050919050565b600060ff82169050919050565b611f2381611f0d565b8114611f2e57600080fd5b50565b600081519050611f4081611f1a565b92915050565b600060208284031215611f5c57611f5b611d77565b5b6000611f6a84828501611f31565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b6001851115611ff957808604811115611fd557611fd4611f73565b5b6001851615611fe45780820291505b8081029050611ff285611fa2565b9450611fb9565b94509492505050565b60008261201257600190506120ce565b8161202057600090506120ce565b816001811461203657600281146120405761206f565b60019150506120ce565b60ff84111561205257612051611f73565b5b8360020a91508482111561206957612068611f73565b5b506120ce565b5060208310610133831016604e8410600b84101617156120a45782820a90508381111561209f5761209e611f73565b5b6120ce565b6120b18484846001611faf565b925090508184048111156120c8576120c7611f73565b5b81810290505b9392505050565b60006120e082611dda565b91506120eb83611f0d565b92506121187fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484612002565b905092915050565b600061212b82611dda565b915061213683611dda565b925082820261214481611dda565b9150828204841483151761215b5761215a611f73565b5b5092915050565b61216b81611d9c565b82525050565b61217a81611dda565b82525050565b60006040820190506121956000830185612162565b6121a26020830184612171565b9392505050565b60006121b482611dda565b91506121bf83611dda565b92508282039050818111156121d7576121d6611f73565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061221782611dda565b915061222283611dda565b925082612232576122316121dd565b5b828204905092915050565b7f54686520696e70757420616d6f756e7420697320746f6f20736d616c6c20666f60008201527f72207374616b696e672028415245584120414920746f6b656e29000000000000602082015250565b6000612299603a83611e90565b91506122a48261223d565b604082019050919050565b600060208201905081810360008301526122c88161228c565b9050919050565b60006122da82611dda565b91506122e583611dda565b92508282019050808211156122fd576122fc611f73565b5b92915050565b60006040820190506123186000830185612171565b6123256020830184612171565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f546f6b656e206973207061757365642100000000000000000000000000000000600082015250565b60006123c0601083611e90565b91506123cb8261238a565b602082019050919050565b600060208201905081810360008301526123ef816123b3565b9050919050565b600081519050919050565b600082825260208201905092915050565b60005b83811015612430578082015181840152602081019050612415565b60008484015250505050565b6000601f19601f8301169050919050565b6000612458826123f6565b6124628185612401565b9350612472818560208601612412565b61247b8161243c565b840191505092915050565b600060a08201905061249b6000830188612162565b6124a86020830187612162565b6124b56040830186612171565b6124c26060830185612171565b81810360808301526124d4818461244d565b90509695505050505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b612515816124e0565b811461252057600080fd5b50565b6000815190506125328161250c565b92915050565b60006020828403121561254e5761254d611d77565b5b600061255c84828501612523565b91505092915050565b60008160e01c9050919050565b600060033d11156125915760046000803e61258e600051612565565b90505b90565b61259d8261243c565b810181811067ffffffffffffffff821117156125bc576125bb61232c565b5b80604052505050565b600060443d10612652576125d7611d6d565b60043d036004823e80513d602482011167ffffffffffffffff821117156125ff575050612652565b808201805167ffffffffffffffff81111561261d5750505050612652565b80602083010160043d03850181111561263a575050505050612652565b61264982602001850186612594565b82955050505050505b90565b600081519050919050565b600061266b82612655565b6126758185611e90565b9350612685818560208601612412565b61268e8161243c565b840191505092915050565b600060208201905081810360008301526126b38184612660565b905092915050565b7f416c6c20746f6b656e2069732070617573656421000000000000000000000000600082015250565b60006126f1601483611e90565b91506126fc826126bb565b602082019050919050565b60006020820190508181036000830152612720816126e4565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b6000819050919050565b600061276b82612756565b915061277683612756565b925082820261278481612756565b91507f800000000000000000000000000000000000000000000000000000000000000084146000841216156127bc576127bb611f73565b5b82820584148315176127d1576127d0611f73565b5b5092915050565b7f54686520616d6f756e7420697320677261746572207468656e2074686520616360008201527f63756d6c6174656420282773656c6c61626c65272920616d6f756e7421000000602082015250565b6000612834603d83611e90565b915061283f826127d8565b604082019050919050565b6000602082019050818103600083015261286381612827565b9050919050565b600061287582612756565b915061288083612756565b9250828201905082811215600083121683821260008412151617156128a8576128a7611f73565b5b92915050565b7f506f6f6c20746f6b656e207175616e6974792063616e2774206265206c65737360008201527f207468656e207a65726f21000000000000000000000000000000000000000000602082015250565b600061290a602b83611e90565b9150612915826128ae565b604082019050919050565b60006020820190508181036000830152612939816128fd565b9050919050565b7f5573657220746f6b656e207175616e6974792063616e2774206265206c65737360008201527f207468656e207a65726f21000000000000000000000000000000000000000000602082015250565b600061299c602b83611e90565b91506129a782612940565b604082019050919050565b600060208201905081810360008301526129cb8161298f565b9050919050565b60006129dd82612756565b91506129e883612756565b9250826129f8576129f76121dd565b5b600160000383147f800000000000000000000000000000000000000000000000000000000000000083141615612a3157612a30611f73565b5b828205905092915050565b6000612a4782612756565b9150612a5283612756565b9250828203905081811260008412168282136000851215161715612a7957612a78611f73565b5b9291505056fea26469706673582212205e707af9b1c10c2270cfdb90d87cfb04f2a8bd5883adf9787e59365bf8f718b264736f6c63430008110033";

type ArexaStakingFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ArexaStakingFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ArexaStakingFacet__factory extends ContractFactory {
  constructor(...args: ArexaStakingFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ArexaStakingFacet> {
    return super.deploy(overrides || {}) as Promise<ArexaStakingFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ArexaStakingFacet {
    return super.attach(address) as ArexaStakingFacet;
  }
  override connect(signer: Signer): ArexaStakingFacet__factory {
    return super.connect(signer) as ArexaStakingFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ArexaStakingFacetInterface {
    return new utils.Interface(_abi) as ArexaStakingFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ArexaStakingFacet {
    return new Contract(address, _abi, signerOrProvider) as ArexaStakingFacet;
  }
}
