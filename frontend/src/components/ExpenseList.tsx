'use client';
import { useEffect, useState } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { getContract } from '../utils/contract';

interface Expense {
  id: number;
  description: string;
  amount: ethers.BigNumber;
  tag: string;
  date: ethers.BigNumber;
}

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('all'); useSigner();
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
    }
  };

  const filteredExpenses = selectedTag === 'all' 
    ? expenses 
    : expenses.filter(expense => expense.tag === selectedTag);

  const calculateTotal = (expenses: Expense[]) => {
    return expenses.reduce((acc, expense) => acc.add(expense.amount), ethers.BigNumber.from(0));
  };

  if (!isConnected) {
    return <div className="text-center py-4">Please connect your wallet to view expenses</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Expenses</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Expenses:</p>
          <p className="font-bold">
            {ethers.utils.formatEther(calculateTotal(filteredExpenses))} ETH
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(expense.date.toNumber() * 1000).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
