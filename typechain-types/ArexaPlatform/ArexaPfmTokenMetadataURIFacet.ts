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

export interface ArexaPfmTokenMetadataURIFacetInterface
  extends utils.Interface {
  functions: {
    "getTokenBaseUri()": FunctionFragment;
    "getTokenUri(uint256)": FunctionFragment;
    "getUri()": FunctionFragment;
    "setTokenBaseURI(string)": FunctionFragment;
    "setTokenURI(uint256,string)": FunctionFragment;
    "setURI(string)": FunctionFragment;
    "uri(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getTokenBaseUri"
      | "getTokenUri"
      | "getUri"
      | "setTokenBaseURI"
      | "setTokenURI"
      | "setURI"
      | "uri"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getTokenBaseUri",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenUri",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "getUri", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setTokenBaseURI",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenURI",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setURI",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "uri",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "getTokenBaseUri",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenUri",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getUri", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setTokenBaseURI",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTokenURI",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setURI", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "uri", data: BytesLike): Result;

  events: {};
}

export interface ArexaPfmTokenMetadataURIFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ArexaPfmTokenMetadataURIFacetInterface;

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
    getTokenBaseUri(overrides?: CallOverrides): Promise<[string]>;

    getTokenUri(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getUri(overrides?: CallOverrides): Promise<[string]>;

    setTokenBaseURI(
      newuri: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setTokenURI(
      id: PromiseOrValue<BigNumberish>,
      newuri: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setURI(
      newuri: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    uri(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  getTokenBaseUri(overrides?: CallOverrides): Promise<string>;

  getTokenUri(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  getUri(overrides?: CallOverrides): Promise<string>;

  setTokenBaseURI(
    newuri: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setTokenURI(
    id: PromiseOrValue<BigNumberish>,
    newuri: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setURI(
    newuri: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  uri(
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    getTokenBaseUri(overrides?: CallOverrides): Promise<string>;

    getTokenUri(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getUri(overrides?: CallOverrides): Promise<string>;

    setTokenBaseURI(
      newuri: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setTokenURI(
      id: PromiseOrValue<BigNumberish>,
      newuri: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setURI(
      newuri: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    uri(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getTokenBaseUri(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenUri(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUri(overrides?: CallOverrides): Promise<BigNumber>;

    setTokenBaseURI(
      newuri: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setTokenURI(
      id: PromiseOrValue<BigNumberish>,
      newuri: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setURI(
      newuri: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    uri(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getTokenBaseUri(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTokenUri(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUri(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setTokenBaseURI(
      newuri: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setTokenURI(
      id: PromiseOrValue<BigNumberish>,
      newuri: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setURI(
      newuri: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    uri(
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
