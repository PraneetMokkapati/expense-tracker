'use client';
import { useState, useEffect } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { getContract } from '../utils/contract';

export default function TagManager() {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (signer) {
      loadTags();
    }
  }, [signer]);

  const loadTags = async () => {
    if (!signer) return;
    try {
      const contract = getContract(signer);
      const tags = await contract.getTags();
      setTags(tags);
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  };

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signer || !newTag.trim()) return;

    setIsLoading(true);
    try {
      const contract = getContract(signer);
      const tx = await contract.addTag(newTag.trim());
      await tx.wait();
      
      setNewTag('');
      await loadTags();
    } catch (error) {
      console.error('Error adding tag:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveTag = async (tagName: string) => {
    if (!signer) return;

    setIsLoading(true);
    try {
      const contract = getContract(signer);
      const tx = await contract.removeTag(tagName);
      await tx.wait();
      
      await loadTags();
    } catch (error) {
      console.error('Error removing tag:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return <div className="text-center py-4">Please connect your wallet to manage tags</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Manage Tags</h2>
      
      <form onSubmit={handleAddTag} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter new tag"
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading || !newTag.trim()}
          >
            Add Tag
          </button>
        </div>
      </form>

      <div className="space-y-2">
        <h3 className="font-semibold mb-2">Current Tags:</h3>
        {tags.length === 0 ? (
          <p className="text-gray-500">No tags created yet</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded"
              >
                <span>{tag}</span>
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-500 hover:text-red-700"
                  disabled={isLoading}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
