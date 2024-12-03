import { ethers } from 'ethers';

export const CONTRACT_ADDRESS = '0x016f8c6226B3D4F2C5cA600B22EB45046D8Cf896' as `0x${string}`;

export const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "tag",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "date",
            "type": "uint256"
          }
        ],
        "name": "ExpenseAdded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "name",
            "type": "string"
          }
        ],
        "name": "TagAdded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "name",
            "type": "string"
          }
        ],
        "name": "TagRemoved",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_tag",
            "type": "string"
          }
        ],
        "name": "addExpense",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          }
        ],
        "name": "addTag",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getExpenses",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "tag",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "date",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              }
            ],
            "internalType": "struct ExpenseTracker.Expense[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getTags",
        "outputs": [
          {
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          }
        ],
        "name": "removeTag",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }  
];

export function getContractConfig() {
    return {
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
    } as const;
}
