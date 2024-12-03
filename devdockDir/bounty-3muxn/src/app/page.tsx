"use client";

import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { parseEther } from 'viem';
import ExpenseTrackerABI from '../contracts/ExpenseTracker.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

export default function Home() {
  const { address } = useAccount();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const { data: userTags } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ExpenseTrackerABI,
    functionName: 'getUserTags',
    account: address,
  });

  const {Read({
    address: CONTRACT_ADDRESS,
    abi: ExpenseTrackerABI,
    functionName: 'getUserExpenses',
    account: address,
  });

  const { config: addExpenseConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ExpenseTrackerABI,
    functionName: 'addExpense',
    args: [description, parseEther(amount || '0'), selectedTags],
  });

  const { write: addExpense } = useContractWrite(addExpenseConfig);

  const { config: createTagConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ExpenseTrackerABI,
    functionName: 'createTag',
    args: [newTag],
  });

  const { write: createTag } = useContractWrite(createTagConfig);

  const handleAddExpense = () => {
    if (!description || !amount || selectedTags.length === 0) return;
    addExpense?.();
  };

  const handleCreateTag = () => {
    if (!newTag) return;
    createTag?.();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Expense Tracker</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Tag</h2>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Tag name"
        />
        <button
          onClick={handleCreateTag}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Tag
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Description"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Amount (ETH)"
        />
        <select
          multiple
          value={selectedTags}
          onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, option => option.value))}
          className="border p-2 mr-2"
        >
          {userTags?.map((tag: string) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
        <button
          onClick={handleAddExpense}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Expense
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Expenses</h2>
        <div className="grid gap-4">
          {expenses?.map((expense: any) => (
            <div key={expense.id} className="border p-4 rounded">
              <p><strong>Description:</strong> {expense.description}</p>
              <p><strong>Amount:</strong> {expense.amount} ETH</p>
              <p><strong>Tags:</strong> {expense.tags.join(', ')}</p>
              <p><strong>Date:</strong> {new Date(Number(expense.timestamp) * 1000).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}