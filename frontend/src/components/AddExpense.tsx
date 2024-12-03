// components/AddExpense.tsx
'use client';
import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/contract-config';
import { parseEther } from 'viem';
import { useContract } from '../utils/contract';

export default function AddExpense() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [tag, setTag] = useState('');
  const { publicClient, walletClient } = useContract();

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'addExpense',
    args: [description, parseEther(amount || '0'), tag],
  });

  const { write } = useContractWrite(config);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!write || !walletClient) return;

    try {
      write();
      
      setDescription('');
      setAmount('');
      setTag('');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Tag"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
        disabled={!write}
      >
        Add Expense
      </button>
    </form>
  );
}
