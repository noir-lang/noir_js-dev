import { Backend, CompiledCircuit, ProofData } from '@noir-lang/types';
export declare class Noir {
    private circuit;
    private backend;
    constructor(circuit: CompiledCircuit, backend: Backend);
    init(): Promise<void>;
    generateFinalProof(inputs: any): Promise<ProofData>;
    verifyFinalProof(proofData: ProofData): Promise<boolean>;
}
