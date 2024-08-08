'use client';

import { getAnchorUserMessageProgram, getAnchorUserMessageProgramId } from '@chat-app/anchor';
// import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

interface AddUserMessageArgs {
  name: string,
  message: string,
}

export function useUserMessageProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getAnchorUserMessageProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getAnchorUserMessageProgram(provider);

  const accounts = useQuery({
    queryKey: ['counter', 'all', { cluster }],
    queryFn: () => program.account.userMessageState.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const addUserMessage = useMutation<string, Error, AddUserMessageArgs>({
    mutationKey: ['userMessage', 'add', { cluster }],
    mutationFn: async ({name, message}) => {
      const [userMessagePda] = await PublicKey.findProgramAddressSync(
        [Buffer.from(name), provider.wallet.publicKey.toBuffer()],
        programId
      );
      return program.methods
        .addUserMessage(name, message)
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError:error => toast.error(`Failed to initialize account: ${error.message}`),
  });

  return {
    program,
    programId,
    accounts,
    provider,
    getProgramAccount,
    addUserMessage,
  };
}

export function useUserMessageProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts, programId, provider } = useUserMessageProgram();

  const accountQuery = useQuery({
    queryKey: ['userMessage', 'fetch', { cluster, account }],
    queryFn: () => program.account.userMessageState.fetch(account),
  });

  const updateUserMessage = useMutation<string, Error, AddUserMessageArgs>({
    mutationKey: ["journalEntry", "update", { cluster }],
    mutationFn: async ({ name, message }) => {
      const [userMessagePda] = await PublicKey.findProgramAddressSync(
        [Buffer.from(name), provider.wallet.publicKey.toBuffer()],
        programId,
      );
   
      return program.methods
        .updateUserMessage(name, message)
        .rpc();
    },
    onSuccess: signature => {
      transactionToast(signature);
      accounts.refetch();
    },
    onError: error => {
      toast.error(`Failed to update user Message: ${error.message}`);
    },
  });

  const deleteUserMessage = useMutation<string, Error, AddUserMessageArgs>({
    mutationKey: ['userMessage', 'close', { cluster, account }],
    mutationFn: ({name}) =>
      program.methods.deleteUserMessage(name).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  return {
    accountQuery,
    deleteUserMessage,
    updateUserMessage,
  };
}
