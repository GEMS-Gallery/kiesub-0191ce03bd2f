import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Category = { 'Chemicals' : null } |
  { 'TestEquipment' : null } |
  { 'Batteries' : null };
export interface Item {
  'id' : bigint,
  'name' : string,
  'description' : [] | [string],
  'stock' : bigint,
  'category' : Category,
  'price' : number,
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : string };
export interface _SERVICE {
  'addItem' : ActorMethod<
    [string, [] | [string], number, bigint, Category],
    Result_1
  >,
  'deleteItem' : ActorMethod<[bigint], Result>,
  'getItems' : ActorMethod<[], Array<Item>>,
  'getItemsByCategory' : ActorMethod<[Category], Array<Item>>,
  'updateItemStock' : ActorMethod<[bigint, bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
