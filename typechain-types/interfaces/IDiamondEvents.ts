/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { BaseContract, BytesLike, Signer, utils } from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface IDiamondEventsInterface extends utils.Interface {
  functions: {};

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "RoleAdminChanged(address,bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(address,bytes32,address,address)": EventFragment;
    "RoleRevoked(address,bytes32,address,address)": EventFragment;
    "TargetedPaused(bytes32,address)": EventFragment;
    "TargetedUnpaused(bytes32,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TargetedPaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TargetedUnpaused"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface RoleAdminChangedEventObject {
  owner: string;
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string, string],
  RoleAdminChangedEventObject
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export interface RoleGrantedEventObject {
  owner: string;
  role: string;
  account: string;
  sender: string;
}
export type RoleGrantedEvent = TypedEvent<
  [string, string, string, string],
  RoleGrantedEventObject
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export interface RoleRevokedEventObject {
  owner: string;
  role: string;
  account: string;
  sender: string;
}
export type RoleRevokedEvent = TypedEvent<
  [string, string, string, string],
  RoleRevokedEventObject
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export interface TargetedPausedEventObject {
  target: string;
  account: string;
}
export type TargetedPausedEvent = TypedEvent<
  [string, string],
  TargetedPausedEventObject
>;

export type TargetedPausedEventFilter = TypedEventFilter<TargetedPausedEvent>;

export interface TargetedUnpausedEventObject {
  target: string;
  account: string;
}
export type TargetedUnpausedEvent = TypedEvent<
  [string, string],
  TargetedUnpausedEventObject
>;

export type TargetedUnpausedEventFilter =
  TypedEventFilter<TargetedUnpausedEvent>;

export interface IDiamondEvents extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IDiamondEventsInterface;

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

  functions: {};

  callStatic: {};

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "RoleAdminChanged(address,bytes32,bytes32,bytes32)"(
      owner?: PromiseOrValue<string> | null,
      role?: null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      owner?: PromiseOrValue<string> | null,
      role?: null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(address,bytes32,address,address)"(
      owner?: PromiseOrValue<string> | null,
      role?: null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      owner?: PromiseOrValue<string> | null,
      role?: null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(address,bytes32,address,address)"(
      owner?: PromiseOrValue<string> | null,
      role?: null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      owner?: PromiseOrValue<string> | null,
      role?: null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter;

    "TargetedPaused(bytes32,address)"(
      target?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null
    ): TargetedPausedEventFilter;
    TargetedPaused(
      target?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null
    ): TargetedPausedEventFilter;

    "TargetedUnpaused(bytes32,address)"(
      target?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null
    ): TargetedUnpausedEventFilter;
    TargetedUnpaused(
      target?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null
    ): TargetedUnpausedEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}
