'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import { useUserMessageProgram } from './userMessage-data-access';
import { UserMessageCreate, UserMessageList } from './userMessage-ui';

export default function UserMessageFeature() {
  const { publicKey } = useWallet();
  const { programId } = useUserMessageProgram();

  return publicKey ? (
    <div>
      <AppHero
        title="User Messages"
        subtitle={
          'Create a new account by clicking the "Create" button. The state of a account is stored on-chain and can be manipulated by calling the program\'s methods (Add new Message, Update your Message, and Delete the message). Just have a Solana Wallet like Phantom or Backpack. Get some devnet SOLs into your wallets and start sending messages. Share me your thoughts'
        }
      >
        <p className="mb-6">
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <UserMessageCreate />
      </AppHero>
      <UserMessageList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  );
}
