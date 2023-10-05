/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} bytes
* @returns {any}
*/
export function acir_read_bytes(bytes: Uint8Array): any;
/**
* @param {any} acir
* @returns {Uint8Array}
*/
export function acir_write_bytes(acir: any): Uint8Array;
/**
* @param {string} level
*/
export function init_log_level(level: string): void;
/**
* @returns {any}
*/
export function build_info(): any;
/**
* @param {string} entry_point
* @param {boolean | undefined} contracts
* @param {string[] | undefined} dependencies
* @returns {any}
*/
export function compile(entry_point: string, contracts?: boolean, dependencies?: string[]): any;

export type CompileError = Error;


