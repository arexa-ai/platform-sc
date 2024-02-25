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
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface ArexaPfmTokenFacetInterface extends utils.Interface {
  functions: {
    "balanceOf(address,uint256)": FunctionFragment;
    "balanceOfBatch(address[],uint256[])": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "name()": FunctionFragment;
    "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "safeTransferFrom(address,address,uint256,uint256,bytes)": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "symbol()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "balanceOf"
      | "balanceOfBatch"
      | "isApprovedForAll"
      | "name"
      | "safeBatchTransferFrom"
      | "safeTransferFrom"
      | "setApprovalForAll"
      | "symbol"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfBatch",
    values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "safeBatchTransferFrom",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;

  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "safeBatchTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;

  events: {
    "ApprovalForAll(address,address,bool)": EventFragment;
    "TransferBatch(address,address,address,uint256[],uint256[])": EventFragment;
    "TransferSingle(address,address,address,uint256,uint256)": EventFragment;
    "URI(string,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferBatch"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferSingle"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "URI"): EventFragment;
}

export interface ApprovalForAllEventObject {
  _owner: string;
  _operator: string;
  _approved: boolean;
}
export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean],
  ApprovalForAllEventObject
>;

export type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;

export interface TransferBatchEventObject {
  _operator: string;
  _from: string;
  _to: string;
  _ids: BigNumber[];
  _values: BigNumber[];
}
export type TransferBatchEvent = TypedEvent<
  [string, string, string, BigNumber[], BigNumber[]],
  TransferBatchEventObject
>;

export type TransferBatchEventFilter = TypedEventFilter<TransferBatchEvent>;

export interface TransferSingleEventObject {
  _operator: string;
  _from: string;
  _to: string;
  _id: BigNumber;
  _value: BigNumber;
}
export type TransferSingleEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber],
  TransferSingleEventObject
>;

export type TransferSingleEventFilter = TypedEventFilter<TransferSingleEvent>;

export interface URIEventObject {
  _value: string;
  _id: BigNumber;
}
export type URIEvent = TypedEvent<[string, BigNumber], URIEventObject>;

export type URIEventFilter = TypedEventFilter<URIEvent>;

export interface ArexaPfmTokenFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ArexaPfmTokenFacetInterface;

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
    balanceOf(
      _owner: PromiseOrValue<string>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    balanceOfBatch(
      _owners: PromiseOrValue<string>[],
      _ids: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    isApprovedForAll(
      _owner: PromiseOrValue<string>,
      _operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    safeBatchTransferFrom(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _ids: PromiseOrValue<BigNumberish>[],
      _values: PromiseOrValue<BigNumberish>[],
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    safeTransferFrom(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _id: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      _operator: PromiseOrValue<string>,
      _approved: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    symbol(overrides?: CallOverrides): Promise<[string]>;
  };

  balanceOf(
    _owner: PromiseOrValue<string>,
    _id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  balanceOfBatch(
    _owners: PromiseOrValue<string>[],
    _ids: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  isApprovedForAll(
    _owner: PromiseOrValue<string>,
    _operator: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  name(overrides?: CallOverrides): Promise<string>;

  safeBatchTransferFrom(
    _from: PromiseOrValue<string>,
    _to: PromiseOrValue<string>,
    _ids: PromiseOrValue<BigNumberish>[],
    _values: PromiseOrValue<BigNumberish>[],
    _data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  safeTransferFrom(
    _from: PromiseOrValue<string>,
    _to: PromiseOrValue<string>,
    _id: PromiseOrValue<BigNumberish>,
    _value: PromiseOrValue<BigNumberish>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    _operator: PromiseOrValue<string>,
    _approved: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  symbol(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    balanceOf(
      _owner: PromiseOrValue<string>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOfBatch(
      _owners: PromiseOrValue<string>[],
      _ids: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    isApprovedForAll(
      _owner: PromiseOrValue<string>,
      _operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    name(overrides?: CallOverrides): Promise<string>;

    safeBatchTransferFrom(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _ids: PromiseOrValue<BigNumberish>[],
      _values: PromiseOrValue<BigNumberish>[],
      _data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    safeTransferFrom(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _id: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(
      _operator: PromiseOrValue<string>,
      _approved: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    symbol(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "ApprovalForAll(address,address,bool)"(
      _owner?: PromiseOrValue<string> | null,
      _operator?: PromiseOrValue<string> | null,
      _approved?: null
    ): ApprovalForAllEventFilter;
    ApprovalForAll(
      _owner?: PromiseOrValue<string> | null,
      _operator?: PromiseOrValue<string> | null,
      _approved?: null
    ): ApprovalForAllEventFilter;

    "TransferBatch(address,address,address,uint256[],uint256[])"(
      _operator?: PromiseOrValue<string> | null,
      _from?: PromiseOrValue<string> | null,
      _to?: PromiseOrValue<string> | null,
      _ids?: null,
      _values?: null
    ): TransferBatchEventFilter;
    TransferBatch(
      _operator?: PromiseOrValue<string> | null,
      _from?: PromiseOrValue<string> | null,
      _to?: PromiseOrValue<string> | null,
      _ids?: null,
      _values?: null
    ): TransferBatchEventFilter;

    "TransferSingle(address,address,address,uint256,uint256)"(
      _operator?: PromiseOrValue<string> | null,
      _from?: PromiseOrValue<string> | null,
      _to?: PromiseOrValue<string> | null,
      _id?: null,
      _value?: null
    ): TransferSingleEventFilter;
    TransferSingle(
      _operator?: PromiseOrValue<string> | null,
      _from?: PromiseOrValue<string> | null,
      _to?: PromiseOrValue<string> | null,
      _id?: null,
      _value?: null
    ): TransferSingleEventFilter;

    "URI(string,uint256)"(
      _value?: null,
      _id?: PromiseOrValue<BigNumberish> | null
    ): URIEventFilter;
    URI(
      _value?: null,
      _id?: PromiseOrValue<BigNumberish> | null
    ): URIEventFilter;
  };

  estimateGas: {
    balanceOf(
      _owner: PromiseOrValue<string>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOfBatch(
      _owners: PromiseOrValue<string>[],
      _ids: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isApprovedForAll(
      _owner: PromiseOrValue<string>,
      _operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    safeBatchTransferFrom(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _ids: PromiseOrValue<BigNumberish>[],
      _values: PromiseOrValue<BigNumberish>[],
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    safeTransferFrom(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _id: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setApprovalForAll(
      _operator: PromiseOrValue<string>,
      _approved: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    balanceOf(
      _owner: PromiseOrValue<string>,
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balanceOfBatch(
      _owners: PromiseOrValue<string>[],
      _ids: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isApprovedForAll(
      _owner: PromiseOrValue<string>,
      _operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    safeBatchTransferFrom(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _ids: PromiseOrValue<BigNumberish>[],
      _values: PromiseOrValue<BigNumberish>[],
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    safeTransferFrom(
      _from: PromiseOrValue<string>,
      _to: PromiseOrValue<string>,
      _id: PromiseOrValue<BigNumberish>,
      _value: PromiseOrValue<BigNumberish>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      _operator: PromiseOrValue<string>,
      _approved: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
