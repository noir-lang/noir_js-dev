import { Backend, CompiledCircuit, ProofData } from '@noir-lang/types';
export declare class BarretenbergBackend implements Backend {
    private api;
    private acirComposer;
    private acirUncompressedBytecode;
    private numberOfThreads;
    constructor(acirCircuit: CompiledCircuit, numberOfThreads?: number);
    private instantiate;
    generateFinalProof(decompressedWitness: Uint8Array): Promise<ProofData>;
    generateIntermediateProof(witness: Uint8Array): Promise<ProofData>;
    generateProof(decompressedWitness: Uint8Array, makeEasyToVerifyInCircuit: boolean): Promise<ProofData>;
    generateIntermediateProofArtifacts(proofData: ProofData, numOfPublicInputs?: number): Promise<{
        proofAsFields: string[];
        vkAsFields: string[];
        vkHash: string;
    }>;
    verifyFinalProof(proofData: ProofData): Promise<boolean>;
    verifyIntermediateProof(proofData: ProofData): Promise<boolean>;
    verifyProof(proof: Uint8Array, makeEasyToVerifyInCircuit: boolean): Promise<boolean>;
    destroy(): Promise<void>;
}
