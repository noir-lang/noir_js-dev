import { InputMap } from '@noir-lang/noirc_abi';
import { CompiledCircuit } from '@noir-lang/types';
export declare function generateWitness(compiledProgram: CompiledCircuit, inputs: InputMap): Promise<Uint8Array>;
