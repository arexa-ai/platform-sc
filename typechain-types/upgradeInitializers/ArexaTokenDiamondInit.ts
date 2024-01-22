/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface ArexaTokenDiamondInitInterface extends utils.Interface {
  functions: {
    "init(string,string,uint8,uint256)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "init"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "init",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;

  events: {};
}

export interface ArexaTokenDiamondInit extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ArexaTokenDiamondInitInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    init(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      initialSupply: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  init(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    decimals: PromiseOrValue<BigNumberish>,
    initialSupply: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    init(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      initialSupply: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    init(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      initialSupply: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    init(
      name: PromiseOrValue<string>,
      symbol: PromiseOrValue<string>,
      decimals: PromiseOrValue<BigNumberish>,
      initialSupply: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
