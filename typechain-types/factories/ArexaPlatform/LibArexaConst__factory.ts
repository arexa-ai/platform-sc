/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  LibArexaConst,
  LibArexaConstInterface,
} from "../../ArexaPlatform/LibArexaConst";

const _abi = [
  {
    inputs: [],
    name: "AREXA_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "AREXA_TOKEN",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "AREXA_TOKEN_ID",
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
    inputs: [],
    name: "AREXA_TOKEN_POOL_AREXAINC",
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
    name: "AREXA_TOKEN_POOL_DEVELOPMENT",
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
    name: "AREXA_TOKEN_POOL_INVESTOR",
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
    name: "AREXA_TOKEN_POOL_MARKETING",
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
    name: "AREXA_TOKEN_POOL_RESERVED",
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
    name: "FULL",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAGIC100_FIRST_BUYER",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAGIC_TOKEN",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAGIC_TOKEN_ID",
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
    inputs: [],
    name: "SUBSCR1_TOKEN",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SUBSCR1_TOKEN_TYPE",
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
    inputs: [],
    name: "SUBSCR2_TOKEN",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SUBSCR2_TOKEN_TYPE",
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
    inputs: [],
    name: "TRADER_TOKEN",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRADER_TOKEN_ID",
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
  "0x610626610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106101205760003560e01c80636e229259116100ac578063d19bcdf31161007b578063d19bcdf3146102ab578063da473202146102c9578063dbc0b2ba146102e7578063dbcc4d9414610305578063f396f3d61461032357610120565b80636e2292591461023357806371ba4d241461025157806373fea8511461026f578063cd3043551461028d57610120565b8063550cb31d116100f3578063550cb31d1461019d57806356dc795c146101bb5780635fc86ab9146101d95780636442a5ed146101f75780636ac83f6b1461021557610120565b806308e7f2c5146101255780632db4e5691461014357806336b0142314610161578063507074e61461017f575b600080fd5b61012d610341565b60405161013a91906104d3565b60405180910390f35b61014b610346565b6040516101589190610507565b60405180910390f35b61016961034e565b6040516101769190610507565b60405180910390f35b610187610356565b604051610194919061053b565b60405180910390f35b6101a5610384565b6040516101b2919061053b565b60405180910390f35b6101c36103a8565b6040516101d0919061053b565b60405180910390f35b6101e16103af565b6040516101ee91906104d3565b60405180910390f35b6101ff6103b4565b60405161020c9190610507565b60405180910390f35b61021d6103bc565b60405161022a919061053b565b60405180910390f35b61023b6103ea565b604051610248919061053b565b60405180910390f35b610259610418565b604051610266919061053b565b60405180910390f35b610277610446565b604051610284919061053b565b60405180910390f35b610295610474565b6040516102a291906104d3565b60405180910390f35b6102b3610479565b6040516102c091906104d3565b60405180910390f35b6102d161047e565b6040516102de9190610507565b60405180910390f35b6102ef610486565b6040516102fc919061053b565b60405180910390f35b61030d6104aa565b60405161031a91906104d3565b60405180910390f35b61032b6104af565b6040516103389190610507565b60405180910390f35b600581565b631dcd650081565b6317d7840081565b631dcd650060405160200161036b91906105c2565b6040516020818303038152906040528051906020012081565b7f72a415ccbbed7752b009b01c3fad0a1694ff64e2a51c65a309c0517cd732d2d181565b6000801b81565b600481565b630bebc20081565b6317d784006040516020016103d191906105c2565b6040516020818303038152906040528051906020012081565b6311e1a3006040516020016103ff91906105c2565b6040516020818303038152906040528051906020012081565b630bebc20060405160200161042d91906105c2565b6040516020818303038152906040528051906020012081565b6305f5e10060405160200161045b91906105c2565b6040516020818303038152906040528051906020012081565b600381565b600281565b6311e1a30081565b7f6d6775b5e502c1f5932b823e8901beec555ffec897aad6fd00846e01363884c881565b600181565b6305f5e10081565b600060ff82169050919050565b6104cd816104b7565b82525050565b60006020820190506104e860008301846104c4565b92915050565b6000819050919050565b610501816104ee565b82525050565b600060208201905061051c60008301846104f8565b92915050565b6000819050919050565b61053581610522565b82525050565b6000602082019050610550600083018461052c565b92915050565b600082825260208201905092915050565b7f544f4b454e000000000000000000000000000000000000000000000000000000600082015250565b600061059d600583610556565b91506105a882610567565b602082019050919050565b6105bc816104ee565b82525050565b600060408201905081810360008301526105db81610590565b90506105ea60208301846105b3565b9291505056fea264697066735822122015f1f1786ba25d5c3b0a7bc62cc040a2643952e28650a0e52135ff3ba8d4a38564736f6c63430008110033";

type LibArexaConstConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LibArexaConstConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LibArexaConst__factory extends ContractFactory {
  constructor(...args: LibArexaConstConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LibArexaConst> {
    return super.deploy(overrides || {}) as Promise<LibArexaConst>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LibArexaConst {
    return super.attach(address) as LibArexaConst;
  }
  override connect(signer: Signer): LibArexaConst__factory {
    return super.connect(signer) as LibArexaConst__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LibArexaConstInterface {
    return new utils.Interface(_abi) as LibArexaConstInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LibArexaConst {
    return new Contract(address, _abi, signerOrProvider) as LibArexaConst;
  }
}
