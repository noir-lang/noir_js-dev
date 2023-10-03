import { CompiledCircuit } from '@noir-lang/types';
export declare function generateWitness(compiledProgram: CompiledCircuit, inputs: unknown): Promise<Uint8Array>;
