let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
const { TextDecoder, TextEncoder } = require(`util`);

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedFloat64Memory0 = null;

function getFloat64Memory0() {
    if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedBigInt64Memory0 = null;

function getBigInt64Memory0() {
    if (cachedBigInt64Memory0 === null || cachedBigInt64Memory0.byteLength === 0) {
        cachedBigInt64Memory0 = new BigInt64Array(wasm.memory.buffer);
    }
    return cachedBigInt64Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_54(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__heb1f60a5b015b6c5(arg0, arg1, addHeapObject(arg2));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1) >>> 0;
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* Executes an ACIR circuit to generate the solved witness from the initial witness.
*
* @param {&WasmBlackBoxFunctionSolver} solver - A black box solver.
* @param {Uint8Array} circuit - A serialized representation of an ACIR circuit
* @param {WitnessMap} initial_witness - The initial witness map defining all of the inputs to `circuit`..
* @param {ForeignCallHandler} foreign_call_handler - A callback to process any foreign calls from the circuit.
* @returns {WitnessMap} The solved witness calculated by executing the circuit on the provided inputs.
*/
module.exports.executeCircuitWithBlackBoxSolver = function(solver, circuit, initial_witness, foreign_call_handler) {
    _assertClass(solver, WasmBlackBoxFunctionSolver);
    const ptr0 = passArray8ToWasm0(circuit, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.executeCircuitWithBlackBoxSolver(solver.__wbg_ptr, ptr0, len0, addHeapObject(initial_witness), addHeapObject(foreign_call_handler));
    return takeObject(ret);
};

/**
* Executes an ACIR circuit to generate the solved witness from the initial witness.
*
* @param {Uint8Array} circuit - A serialized representation of an ACIR circuit
* @param {WitnessMap} initial_witness - The initial witness map defining all of the inputs to `circuit`..
* @param {ForeignCallHandler} foreign_call_handler - A callback to process any foreign calls from the circuit.
* @returns {WitnessMap} The solved witness calculated by executing the circuit on the provided inputs.
*/
module.exports.executeCircuit = function(circuit, initial_witness, foreign_call_handler) {
    const ptr0 = passArray8ToWasm0(circuit, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.executeCircuit(ptr0, len0, addHeapObject(initial_witness), addHeapObject(foreign_call_handler));
    return takeObject(ret);
};

/**
* @returns {Promise<WasmBlackBoxFunctionSolver>}
*/
module.exports.createBlackBoxSolver = function() {
    const ret = wasm.createBlackBoxSolver();
    return takeObject(ret);
};

/**
* Decompresses a compressed witness as outputted by Nargo into a `WitnessMap`.
*
* @param {Uint8Array} compressed_witness - A compressed witness.
* @returns {WitnessMap} The decompressed witness map.
*/
module.exports.decompressWitness = function(compressed_witness) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(compressed_witness, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.decompressWitness(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return takeObject(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
};

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
* Compresses a `WitnessMap` into the binary format outputted by Nargo.
*
* @param {Uint8Array} compressed_witness - A witness map.
* @returns {WitnessMap} A compressed witness map
*/
module.exports.compressWitness = function(witness_map) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.compressWitness(retptr, addHeapObject(witness_map));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        var r3 = getInt32Memory0()[retptr / 4 + 3];
        if (r3) {
            throw takeObject(r2);
        }
        var v1 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v1;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
};

/**
* Verifies a ECDSA signature over the secp256r1 curve.
* @param {Uint8Array} hashed_msg
* @param {Uint8Array} public_key_x_bytes
* @param {Uint8Array} public_key_y_bytes
* @param {Uint8Array} signature
* @returns {boolean}
*/
module.exports.ecdsa_secp256r1_verify = function(hashed_msg, public_key_x_bytes, public_key_y_bytes, signature) {
    const ptr0 = passArray8ToWasm0(hashed_msg, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray8ToWasm0(public_key_x_bytes, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArray8ToWasm0(public_key_y_bytes, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    const ptr3 = passArray8ToWasm0(signature, wasm.__wbindgen_malloc);
    const len3 = WASM_VECTOR_LEN;
    const ret = wasm.ecdsa_secp256r1_verify(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    return ret !== 0;
};

/**
* Calculates the Blake2s256 hash of the input bytes and represents these as a single field element.
* Verifies a ECDSA signature over the secp256k1 curve.
* @param {Uint8Array} hashed_msg
* @param {Uint8Array} public_key_x_bytes
* @param {Uint8Array} public_key_y_bytes
* @param {Uint8Array} signature
* @returns {boolean}
*/
module.exports.ecdsa_secp256k1_verify = function(hashed_msg, public_key_x_bytes, public_key_y_bytes, signature) {
    const ptr0 = passArray8ToWasm0(hashed_msg, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray8ToWasm0(public_key_x_bytes, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArray8ToWasm0(public_key_y_bytes, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    const ptr3 = passArray8ToWasm0(signature, wasm.__wbindgen_malloc);
    const len3 = WASM_VECTOR_LEN;
    const ret = wasm.ecdsa_secp256k1_verify(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    return ret !== 0;
};

/**
* Calculates the Keccak256 hash of the input bytes
* @param {Uint8Array} inputs
* @returns {Uint8Array}
*/
module.exports.keccak256 = function(inputs) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(inputs, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.keccak256(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v2 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v2;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
};

/**
* Calculates the Blake2s256 hash of the input bytes
* @param {Uint8Array} inputs
* @returns {Uint8Array}
*/
module.exports.blake2s256 = function(inputs) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(inputs, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.blake2s256(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v2 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v2;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
};

/**
* Calculates the SHA256 hash of the input bytes
* @param {Uint8Array} inputs
* @returns {Uint8Array}
*/
module.exports.sha256 = function(inputs) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(inputs, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sha256(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v2 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v2;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
};

/**
* Performs a bitwise XOR operation between `lhs` and `rhs`
* @param {string} lhs
* @param {string} rhs
* @returns {string}
*/
module.exports.xor = function(lhs, rhs) {
    const ret = wasm.xor(addHeapObject(lhs), addHeapObject(rhs));
    return takeObject(ret);
};

/**
* Performs a bitwise AND operation between `lhs` and `rhs`
* @param {string} lhs
* @param {string} rhs
* @returns {string}
*/
module.exports.and = function(lhs, rhs) {
    const ret = wasm.and(addHeapObject(lhs), addHeapObject(rhs));
    return takeObject(ret);
};

/**
* Returns the `BuildInfo` object containing information about how the installed package was built.
* @returns {BuildInfo} - Information on how the installed package was built.
*/
module.exports.buildInfo = function() {
    const ret = wasm.buildInfo();
    return takeObject(ret);
};

/**
* Sets the package's logging level.
*
* @param {LogLevel} level - The maximum level of logging to be emitted.
*/
module.exports.initLogLevel = function(level) {
    wasm.initLogLevel(addHeapObject(level));
};

/**
* Extracts a `WitnessMap` containing the witness indices corresponding to the circuit's public inputs.
*
* @param {Uint8Array} circuit - A serialized representation of an ACIR circuit
* @param {WitnessMap} witness_map - The completed witness map after executing the circuit.
* @returns {WitnessMap} A witness map containing the circuit's public inputs.
* @param {Uint8Array} circuit
* @param {WitnessMap} solved_witness
* @returns {WitnessMap}
*/
module.exports.getPublicWitness = function(circuit, solved_witness) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(circuit, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.getPublicWitness(retptr, ptr0, len0, addHeapObject(solved_witness));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return takeObject(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
};

/**
* Extracts a `WitnessMap` containing the witness indices corresponding to the circuit's public parameters.
*
* @param {Uint8Array} circuit - A serialized representation of an ACIR circuit
* @param {WitnessMap} witness_map - The completed witness map after executing the circuit.
* @returns {WitnessMap} A witness map containing the circuit's public parameters.
* @param {Uint8Array} circuit
* @param {WitnessMap} solved_witness
* @returns {WitnessMap}
*/
module.exports.getPublicParametersWitness = function(circuit, solved_witness) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(circuit, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.getPublicParametersWitness(retptr, ptr0, len0, addHeapObject(solved_witness));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return takeObject(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
};

/**
* Extracts a `WitnessMap` containing the witness indices corresponding to the circuit's return values.
*
* @param {Uint8Array} circuit - A serialized representation of an ACIR circuit
* @param {WitnessMap} witness_map - The completed witness map after executing the circuit.
* @returns {WitnessMap} A witness map containing the circuit's return values.
* @param {Uint8Array} circuit
* @param {WitnessMap} witness_map
* @returns {WitnessMap}
*/
module.exports.getReturnWitness = function(circuit, witness_map) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(circuit, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.getReturnWitness(retptr, ptr0, len0, addHeapObject(witness_map));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        if (r2) {
            throw takeObject(r1);
        }
        return takeObject(r0);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
};

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
function __wbg_adapter_155(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h72933b4dbc34aade(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
* A struct representing a Trap
*/
class Trap {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_trap_free(ptr);
    }
    /**
    * @returns {Symbol}
    */
    static __wbgd_downcast_token() {
        const ret = wasm.trap___wbgd_downcast_token();
        return takeObject(ret);
    }
}
module.exports.Trap = Trap;
/**
*/
class WasmBlackBoxFunctionSolver {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WasmBlackBoxFunctionSolver.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmblackboxfunctionsolver_free(ptr);
    }
}
module.exports.WasmBlackBoxFunctionSolver = WasmBlackBoxFunctionSolver;

module.exports.__wbindgen_object_clone_ref = function(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

module.exports.__wbindgen_error_new = function(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbindgen_is_string = function(arg0) {
    const ret = typeof(getObject(arg0)) === 'string';
    return ret;
};

module.exports.__wbindgen_is_array = function(arg0) {
    const ret = Array.isArray(getObject(arg0));
    return ret;
};

module.exports.__wbg_wasmblackboxfunctionsolver_new = function(arg0) {
    const ret = WasmBlackBoxFunctionSolver.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

module.exports.__wbindgen_is_undefined = function(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

module.exports.__wbindgen_number_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
};

module.exports.__wbg_constructor_bd5b3ba6619fce81 = function(arg0) {
    const ret = new Error(takeObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbindgen_string_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

module.exports.__wbindgen_cb_drop = function(arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    const ret = false;
    return ret;
};

module.exports.__wbg_new_d6cb182577c81490 = function() {
    const ret = new Map();
    return addHeapObject(ret);
};

module.exports.__wbindgen_number_new = function(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
};

module.exports.__wbg_new_abda76e883ba8a5f = function() {
    const ret = new Error();
    return addHeapObject(ret);
};

module.exports.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
    const ret = getObject(arg1).stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

module.exports.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1);
    }
};

module.exports.__wbindgen_bigint_from_i64 = function(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
};

module.exports.__wbindgen_jsval_eq = function(arg0, arg1) {
    const ret = getObject(arg0) === getObject(arg1);
    return ret;
};

module.exports.__wbindgen_ge = function(arg0, arg1) {
    const ret = getObject(arg0) >= getObject(arg1);
    return ret;
};

module.exports.__wbindgen_is_bigint = function(arg0) {
    const ret = typeof(getObject(arg0)) === 'bigint';
    return ret;
};

module.exports.__wbindgen_bigint_from_u64 = function(arg0) {
    const ret = BigInt.asUintN(64, arg0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_shr = function(arg0, arg1) {
    const ret = getObject(arg0) >> getObject(arg1);
    return addHeapObject(ret);
};

module.exports.__wbindgen_bigint_from_u128 = function(arg0, arg1) {
    const ret = BigInt.asUintN(64, arg0) << BigInt(64) | BigInt.asUintN(64, arg1);
    return addHeapObject(ret);
};

module.exports.__wbindgen_is_object = function(arg0) {
    const val = getObject(arg0);
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

module.exports.__wbindgen_is_function = function(arg0) {
    const ret = typeof(getObject(arg0)) === 'function';
    return ret;
};

module.exports.__wbg_instanceof_Global_68951a6a6244ac6e = function(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof WebAssembly.Global;
    } catch {
        result = false;
    }
    const ret = result;
    return ret;
};

module.exports.__wbg_static_accessor_SYMBOL_45d4d15e3c4aeb33 = function() {
    const ret = Symbol;
    return addHeapObject(ret);
};

module.exports.__wbindgen_is_symbol = function(arg0) {
    const ret = typeof(getObject(arg0)) === 'symbol';
    return ret;
};

module.exports.__wbg_getRandomValues_37fa2ca9e4e07fab = function() { return handleError(function (arg0, arg1) {
    getObject(arg0).getRandomValues(getObject(arg1));
}, arguments) };

module.exports.__wbg_randomFillSync_dc1e9a60c158336d = function() { return handleError(function (arg0, arg1) {
    getObject(arg0).randomFillSync(takeObject(arg1));
}, arguments) };

module.exports.__wbg_crypto_c48a774b022d20ac = function(arg0) {
    const ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

module.exports.__wbg_process_298734cf255a885d = function(arg0) {
    const ret = getObject(arg0).process;
    return addHeapObject(ret);
};

module.exports.__wbg_versions_e2e78e134e3e5d01 = function(arg0) {
    const ret = getObject(arg0).versions;
    return addHeapObject(ret);
};

module.exports.__wbg_node_1cd7a5d853dbea79 = function(arg0) {
    const ret = getObject(arg0).node;
    return addHeapObject(ret);
};

module.exports.__wbg_msCrypto_bcb970640f50a1e8 = function(arg0) {
    const ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
};

module.exports.__wbg_require_8f08ceecec0f4fee = function() { return handleError(function () {
    const ret = module.require;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_debug_efabe4eb183aa5d4 = function(arg0, arg1, arg2, arg3) {
    console.debug(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
};

module.exports.__wbg_error_a7e23606158b68b9 = function(arg0) {
    console.error(getObject(arg0));
};

module.exports.__wbg_error_50f42b952a595a23 = function(arg0, arg1, arg2, arg3) {
    console.error(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
};

module.exports.__wbg_info_24d8f53d98f12b95 = function(arg0, arg1, arg2, arg3) {
    console.info(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
};

module.exports.__wbg_log_9b164efbe6db702f = function(arg0, arg1, arg2, arg3) {
    console.log(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
};

module.exports.__wbg_warn_8342bfbc6028193a = function(arg0, arg1, arg2, arg3) {
    console.warn(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
};

module.exports.__wbg_get_7303ed2ef026b2f5 = function(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
};

module.exports.__wbg_length_820c786973abdd8a = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

module.exports.__wbg_new_0394642eae39db16 = function() {
    const ret = new Array();
    return addHeapObject(ret);
};

module.exports.__wbg_BigInt_9523742cb675bb6f = function(arg0) {
    const ret = BigInt(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_newnoargs_c9e6043b8ad84109 = function(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_get_f53c921291c381bd = function() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_call_557a2f2deacc4912 = function() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_new_2b6fea4ea03b1b95 = function() {
    const ret = new Object();
    return addHeapObject(ret);
};

module.exports.__wbg_self_742dd6eab3e9211e = function() { return handleError(function () {
    const ret = self.self;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_window_c409e731db53a0e2 = function() { return handleError(function () {
    const ret = window.window;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_globalThis_b70c095388441f2d = function() { return handleError(function () {
    const ret = globalThis.globalThis;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_global_1c72617491ed7194 = function() { return handleError(function () {
    const ret = global.global;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_newwithlength_cd1db47a173e3944 = function(arg0) {
    const ret = new Array(arg0 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_set_b4da98d504ac6091 = function(arg0, arg1, arg2) {
    getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
};

module.exports.__wbg_from_6bc98a09a0b58bb1 = function(arg0) {
    const ret = Array.from(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_push_109cfc26d02582dd = function(arg0, arg1) {
    const ret = getObject(arg0).push(getObject(arg1));
    return ret;
};

module.exports.__wbg_byteLength_1a59a59856fc656a = function(arg0) {
    const ret = getObject(arg0).byteLength;
    return ret;
};

module.exports.__wbg_toString_68dcf9fa017bbb08 = function(arg0, arg1, arg2) {
    const ret = getObject(arg1).toString(arg2);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

module.exports.__wbg_new_87297f22973157c8 = function(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_setcause_394738aae0ce9341 = function(arg0, arg1) {
    getObject(arg0).cause = getObject(arg1);
};

module.exports.__wbg_instanceof_Function_8e1bcaacb89c4438 = function(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof Function;
    } catch {
        result = false;
    }
    const ret = result;
    return ret;
};

module.exports.__wbg_call_587b30eea3e09332 = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_call_4c73e4aecced6a7d = function() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2), getObject(arg3));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_bind_7d5ce7224bedd5b8 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).bind(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
};

module.exports.__wbg_bind_f5218b29220675c3 = function(arg0, arg1, arg2, arg3) {
    const ret = getObject(arg0).bind(getObject(arg1), getObject(arg2), getObject(arg3));
    return addHeapObject(ret);
};

module.exports.__wbg_forEach_942772130a8d06a6 = function(arg0, arg1, arg2) {
    try {
        var state0 = {a: arg1, b: arg2};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_155(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        getObject(arg0).forEach(cb0);
    } finally {
        state0.a = state0.b = 0;
    }
};

module.exports.__wbg_set_da7be7bf0e037b14 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
};

module.exports.__wbg_constructor_f2623999a1f453eb = function(arg0) {
    const ret = getObject(arg0).constructor;
    return addHeapObject(ret);
};

module.exports.__wbg_new_2b55e405e4af4986 = function(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_155(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        const ret = new Promise(cb0);
        return addHeapObject(ret);
    } finally {
        state0.a = state0.b = 0;
    }
};

module.exports.__wbg_resolve_ae38ad63c43ff98b = function(arg0) {
    const ret = Promise.resolve(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_then_8df675b8bb5d5e3c = function(arg0, arg1) {
    const ret = getObject(arg0).then(getObject(arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_then_835b073a479138e5 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
};

module.exports.__wbg_buffer_55ba7a6b1b92e2ac = function(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

module.exports.__wbg_newwithbyteoffsetandlength_88d1d8be5df94b9b = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_new_09938a7d020f049b = function(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_set_3698e3ca519b3c3c = function(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

module.exports.__wbg_length_0aab7ffd65ad19ed = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

module.exports.__wbg_newwithlength_89eeca401d8918c2 = function(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_subarray_d82be056deb4ad27 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_compile_eefe73dfb19bff3d = function(arg0) {
    const ret = WebAssembly.compile(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_instantiate_e61ee50cd947cd36 = function(arg0, arg1) {
    const ret = WebAssembly.instantiate(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_exports_311291a1333429a3 = function(arg0) {
    const ret = getObject(arg0).exports;
    return addHeapObject(ret);
};

module.exports.__wbg_exports_12505982ae149cb0 = function(arg0) {
    const ret = WebAssembly.Module.exports(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_instanceof_Table_b0af5234a12a19f9 = function(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof WebAssembly.Table;
    } catch {
        result = false;
    }
    const ret = result;
    return ret;
};

module.exports.__wbg_get_b5def15f90c3e295 = function() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).get(arg1 >>> 0);
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_instanceof_Memory_331618ccd3fa615d = function(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof WebAssembly.Memory;
    } catch {
        result = false;
    }
    const ret = result;
    return ret;
};

module.exports.__wbg_new_e40873b83efb2dcd = function() { return handleError(function (arg0) {
    const ret = new WebAssembly.Memory(getObject(arg0));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_apply_46ea2bb0ad750196 = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.apply(getObject(arg0), getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_getPrototypeOf_7dc7a2328db2bc0e = function() { return handleError(function (arg0) {
    const ret = Reflect.getPrototypeOf(getObject(arg0));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_set_07da13cc24b69217 = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
    return ret;
}, arguments) };

module.exports.__wbg_parse_76a8a18ca3f8730b = function() { return handleError(function (arg0, arg1) {
    const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbindgen_bigint_get_as_i64 = function(arg0, arg1) {
    const v = getObject(arg1);
    const ret = typeof(v) === 'bigint' ? v : undefined;
    getBigInt64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? BigInt(0) : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
};

module.exports.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

module.exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

module.exports.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return addHeapObject(ret);
};

module.exports.__wbindgen_function_table = function() {
    const ret = wasm.__wbindgen_export_2;
    return addHeapObject(ret);
};

module.exports.__wbindgen_closure_wrapper605 = function(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 193, __wbg_adapter_54);
    return addHeapObject(ret);
};

const path = require('path').join(__dirname, 'acvm_js_bg.wasm');
const bytes = require('fs').readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;

