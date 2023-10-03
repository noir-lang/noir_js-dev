export interface Backend {
    generateFinalProof(decompressedWitness: Uint8Array): Promise<Uint8Array>;
    generateIntermediateProof(decompressedWitness: Uint8Array): Promise<Uint8Array>;
    verifyFinalProof(proof: Uint8Array): Promise<boolean>;
    verifyIntermediateProof(proof: Uint8Array): Promise<boolean>;
}
export type CompiledCircuit = {
    bytecode: string;
    abi: object;
};
