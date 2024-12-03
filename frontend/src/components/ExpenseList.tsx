// components/ExpenseList.tsx
'use client';
import { useState, useEffect } from 'react';
import { useEthersSigner } from '../utils/getSigner';
import { getContract } from '../utils/contract';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

interface Expense {
  id: ethers.BigNumber;
  description: string;
  amount: ethers.BigNumber;
  tag: string;
  date: ethers.BigNumber;
}

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const signer = useEthersSigner();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (signer) {
      loadExpenses();
    }
  }, [signer]);

  const loadExpenses = async () => {
    if (!signer) return;
    try {
      const contract = getContract(signer);
      const expenses = await contract.getExpenses();
      setExpenses(expenses);
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredExpenses = selectedTag === 'all' 
    ? expenses 
    : expenses.filter(expense => expense.tag === selectedTag);

  const calculateTotal = (expenses: Expense[]) => {
    return expenses.reduce(
      (total, expense) => total.add(expense.amount),
      ethers.BigNumber.from(0)
    );
  };

  if (!isConnected) {
    return <div className="text-center py-4">Please connect your wallet to view expenses</div>;
  }

  if (isLoading) {
    return <div className="text-center py-4">Loading expenses...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Expenses</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total:</p>
          <p className="font-bold">
            {ethers.utils.formatEther(calculateTotal(filteredExpenses))} ETH
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount (ETH)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tag
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredExpenses.map((expense) => (
              <tr key={expense.id.toString()}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {expense.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ethers.utils.formatEther(expense.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {expense.tag}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(expense.date.toNumber() * 1000).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
