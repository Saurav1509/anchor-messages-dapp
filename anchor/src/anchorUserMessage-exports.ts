// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import anchor_user_messageIDL from "../target/idl/anchor_user_message.json"
import type {AnchorUserMessage} from "../target/types/anchor_user_message"

// Re-export the generated IDL and type
export { AnchorUserMessage, anchor_user_messageIDL };

// The programId is imported from the program IDL.
export const ANCHORUSERMESSAGE_PROGRAM_ID = new PublicKey(anchor_user_messageIDL.address);

// This is a helper function to get the User Message Anchor program.
export function getAnchorUserMessageProgram(provider: AnchorProvider) {
  return new Program(anchor_user_messageIDL as AnchorUserMessage, provider);
}

// This is a helper function to get the program ID for the User Message program depending on the cluster.
export function getAnchorUserMessageProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the User Message program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg');
    case 'mainnet-beta':
    default:
      return ANCHORUSERMESSAGE_PROGRAM_ID;
  }
}
