/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
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

export interface ArexaAdminFacetInterface extends utils.Interface {
  functions: {
    "getArexaERC20Token()": FunctionFragment;
    "getPayingToken()": FunctionFragment;
    "setPayingToken(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getArexaERC20Token"
      | "getPayingToken"
      | "setPayingToken"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getArexaERC20Token",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPayingToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setPayingToken",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "getArexaERC20Token",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPayingToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPayingToken",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ArexaAdminFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ArexaAdminFacetInterface;

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
    getArexaERC20Token(overrides?: CallOverrides): Promise<[string]>;

    getPayingToken(overrides?: CallOverrides): Promise<[string]>;

    setPayingToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getArexaERC20Token(overrides?: CallOverrides): Promise<string>;

  getPayingToken(overrides?: CallOverrides): Promise<string>;

  setPayingToken(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getArexaERC20Token(overrides?: CallOverrides): Promise<string>;

    getPayingToken(overrides?: CallOverrides): Promise<string>;

    setPayingToken(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    getArexaERC20Token(overrides?: CallOverrides): Promise<BigNumber>;

    getPayingToken(overrides?: CallOverrides): Promise<BigNumber>;

    setPayingToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getArexaERC20Token(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPayingToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setPayingToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
