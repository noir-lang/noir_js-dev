import { generateWitness } from "./witness_generation.mjs";
import initAbi from '@noir-lang/noirc_abi';
import initACVM from '@noir-lang/acvm_js';
export class Noir {
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
        if (typeof initAbi === 'function') {
            await Promise.all([initAbi(), initACVM()]);
        }
    }
    // Initial inputs to your program
    async generateFinalProof(inputs) {
        await this.init();
        const serializedWitness = await generateWitness(this.circuit, inputs);
        return this.backend.generateFinalProof(serializedWitness);
    }
    async verifyFinalProof(proof) {
        return this.backend.verifyFinalProof(proof);
    }
}
