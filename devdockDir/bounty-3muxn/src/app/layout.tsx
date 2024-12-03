"use client";

import { WagmiConfig, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

const walletConnectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet,
      rainbowWallet,
      walletConnectWallet,
    ],
  },
]);

const config = createConfig(
  getDefaultConfig({
    appName: "Expense Tracker DApp",
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
    wallets: walletConnectors,
    chains: [sepolia],
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <WagmiConfig config={config}>
        <RainbowKitProvider>
          <body>{children}</body>
        </RainbowKitProvider>
      </WagmiConfig>
    </html>
  );
}