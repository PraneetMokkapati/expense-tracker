'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import AddExpense from '../components/AddExpense';
import ExpenseList from '../components/ExpenseList';
import TagManager from '../components/TagManager';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <ConnectButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ExpenseList />
        </div>
        <div className="md:col-span-1">
          <div className="space-y-6">
            <TagManager />
            <AddExpense />
          </div>
        </div>
      </div>
    </div>
  );
}
