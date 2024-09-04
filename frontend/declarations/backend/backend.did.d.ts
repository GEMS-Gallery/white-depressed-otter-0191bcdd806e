import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : bigint } |
  { 'err' : string };
export interface TaxPayer {
  'tid' : bigint,
  'sunnyDay' : boolean,
  'address' : string,
  'image' : [] | [string],
  'lastName' : string,
  'firstName' : string,
}
export interface _SERVICE {
  'addTaxPayer' : ActorMethod<
    [string, string, string, [] | [string], boolean],
    Result
  >,
  'getAllTaxPayers' : ActorMethod<[], Array<TaxPayer>>,
  'getTaxPayerByTID' : ActorMethod<[bigint], [] | [TaxPayer]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
