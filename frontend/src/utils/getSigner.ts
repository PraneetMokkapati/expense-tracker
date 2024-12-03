// src/utils/getSigner.ts
import { providers } from 'ethers';
import { type WalletClient, type PublicClient, type HttpTransport } from 'viem';
import { useWalletClient, usePublicClient } from 'wagmi';

export function publicClientToProvider(publicClient: PublicClient) {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type !== 'http') throw new Error('Transport must be http');
  return new providers.JsonRpcProvider(transport.url, network);
}

export function walletClientToSigner(walletClient: WalletClient) {
  const provider = new providers.Web3Provider(walletClient.transport as any);
  return provider.getSigner();
}

export function useEthersSigner({ chainId }: { chainId?: number } = {})
{
 const walletClient  = useWalletClient({ chainId });
  return walletClient ? walletClientToSigner(walletClient) : undefined;
}

export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId });
  return publicClient ? publicClientToProvider(publicClient) : undefined;
}
