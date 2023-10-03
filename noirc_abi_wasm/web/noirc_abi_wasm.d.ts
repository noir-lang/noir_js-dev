/* tslint:disable */
/* eslint-disable */
/**
* @param {any} abi
* @param {any} inputs
* @param {any} return_value
* @returns {WitnessMap}
*/
export function abiEncode(abi: any, inputs: any, return_value: any): WitnessMap;
/**
* @param {any} abi
* @param {WitnessMap} witness_map
* @returns {any}
*/
export function abiDecode(abi: any, witness_map: WitnessMap): any;

// Map from witness index to hex string value of witness.
export type WitnessMap = Map<number, string>;



export type ABIError = Error;



export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly abiEncode: (a: number, b: number, c: number, d: number) => void;
  readonly abiDecode: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h345d08f7c40b28d9: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
