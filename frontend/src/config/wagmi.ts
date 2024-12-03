import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'viem/chains';

export const config = getDefaultConfig({
  appName: 'Expense Tracker',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  chains: [sepolia],
  ssr: true, // For NextJS
});
