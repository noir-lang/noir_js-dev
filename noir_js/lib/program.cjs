"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Noir = void 0;
const witness_generation_js_1 = require("./witness_generation.cjs");
const noirc_abi_1 = __importDefault(require("@noir-lang/noirc_abi"));
const acvm_js_1 = __importDefault(require("@noir-lang/acvm_js"));
class Noir {
    circuit;
    backend;
    constructor(circuit, backend) {
        this.circuit = circuit;
        this.backend = backend;
    }
    async init() {
        // If these are available, then we are in the
        // web environment. For the node environment, this
        // is a no-op.
        if (typeof noirc_abi_1.default === 'function') {
            await Promise.all([(0, noirc_abi_1.default)(), (0, acvm_js_1.default)()]);
        }
    }
    // Initial inputs to your program
    async generateFinalProof(inputs) {
        await this.init();
        const serializedWitness = await (0, witness_generation_js_1.generateWitness)(this.circuit, inputs);
        return this.backend.generateFinalProof(serializedWitness);
    }
    async verifyFinalProof(proof) {
        return this.backend.verifyFinalProof(proof);
    }
}
exports.Noir = Noir;
