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

export interface ArexaPfmTokenAllowanceFacetInterface extends utils.Interface {
  functions: {
    "allowance(address,address,uint256)": FunctionFragment;
    "approve(address,uint256,uint256,uint256)": FunctionFragment;
    "isOperatorSpendingLimitEnabled(uint256)": FunctionFragment;
    "setOperatorSpendingLimitEnabled(uint256,bool)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "allowance"
      | "approve"
      | "isOperatorSpendingLimitEnabled"
      | "setOperatorSpendingLimitEnabled"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "allowance",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "isOperatorSpendingLimitEnabled",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setOperatorSpendingLimitEnabled",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]
  ): string;

  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isOperatorSpendingLimitEnabled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setOperatorSpendingLimitEnabled",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
}

export interface ApprovalEventObject {
  owner: string;
  operator: string;
  id: BigNumber;
  currenctValue: BigNumber;
  newValue: BigNumber;
}
export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber, BigNumber, BigNumber],
  ApprovalEventObject
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export interface ArexaPfmTokenAllowanceFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ArexaPfmTokenAllowanceFacetInterface;

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
    allowance(
      owner_: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      operator: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      currentValue: PromiseOrValue<BigNumberish>,
      newValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isOperatorSpendingLimitEnabled(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    setOperatorSpendingLimitEnabled(
      tokenId: PromiseOrValue<BigNumberish>,
      enabled: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  allowance(
    owner_: PromiseOrValue<string>,
    operator: PromiseOrValue<string>,
    id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    operator: PromiseOrValue<string>,
    id: PromiseOrValue<BigNumberish>,
    currentValue: PromiseOrValue<BigNumberish>,
    newValue: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isOperatorSpendingLimitEnabled(
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  setOperatorSpendingLimitEnabled(
    tokenId: PromiseOrValue<BigNumberish>,
    enabled: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    allowance(
      owner_: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      operator: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      currentValue: PromiseOrValue<BigNumberish>,
      newValue: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    isOperatorSpendingLimitEnabled(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setOperatorSpendingLimitEnabled(
      tokenId: PromiseOrValue<BigNumberish>,
      enabled: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Approval(address,address,uint256,uint256,uint256)"(
      owner?: PromiseOrValue<string> | null,
      operator?: PromiseOrValue<string> | null,
      id?: PromiseOrValue<BigNumberish> | null,
      currenctValue?: null,
      newValue?: null
    ): ApprovalEventFilter;
    Approval(
      owner?: PromiseOrValue<string> | null,
      operator?: PromiseOrValue<string> | null,
      id?: PromiseOrValue<BigNumberish> | null,
      currenctValue?: null,
      newValue?: null
    ): ApprovalEventFilter;
  };

  estimateGas: {
    allowance(
      owner_: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      operator: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      currentValue: PromiseOrValue<BigNumberish>,
      newValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isOperatorSpendingLimitEnabled(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setOperatorSpendingLimitEnabled(
      tokenId: PromiseOrValue<BigNumberish>,
      enabled: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    allowance(
      owner_: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      operator: PromiseOrValue<string>,
      id: PromiseOrValue<BigNumberish>,
      currentValue: PromiseOrValue<BigNumberish>,
      newValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isOperatorSpendingLimitEnabled(
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setOperatorSpendingLimitEnabled(
      tokenId: PromiseOrValue<BigNumberish>,
      enabled: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
