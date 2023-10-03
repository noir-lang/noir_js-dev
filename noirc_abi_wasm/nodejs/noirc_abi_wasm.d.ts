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


