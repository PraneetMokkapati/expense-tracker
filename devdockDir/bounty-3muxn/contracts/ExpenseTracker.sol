// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ExpenseTracker {
    struct Expense {
        uint256 id;
        string description;
        uint256 amount;
        string[] tags;
        uint256 timestamp;
    }

    struct Tag {
        string name;
        bool exists;
    }

    mapping(address => Expense[]) private userExpenses;
    mapping(address => mapping(string => Tag)) private userTags;
    mapping(address => string[]) private userTagList;

    event ExpenseAdded(address indexed user, uint256 id, string description, uint256 amount, string[] tags);
    event TagCreated(address indexed user, string tagName);

    function addExpense(string memory _description, uint256 _amount, string[] memory _tags) public {
        require(_amount > 0, "Amount must be greater than 0");
        
        for(uint i = 0; i < _tags.length; i++) {
            require(userTags[msg.sender][_tags[i]].exists, "Tag does not exist");
        }

        uint256 expenseId = userExpenses[msg.sender].length;
        userExpenses[msg.sender].push(
            Expense(expenseId, _description, _amount, _tags, block.timestamp)
        );

        emit ExpenseAdded(msg.sender, expenseId, _description, _amount, _tags);
    }

    function createTag(string memory _tagName) public {
        require(!userTags[msg.sender][_tagName].exists, "Tag already exists");
        
        userTags[msg.sender][_tagName] = Tag(_tagName, true);
        userTagList[msg.sender].push(_tagName);
        
        emit TagCreated(msg.sender, _tagName);
    }

    function getUserExpenses() public view returns (Expense[] memory) {
        return userExpenses[msg.sender];
    }

    function getUserTags() public view returns (string[] memory) {
        return userTagList[msg.sender];
    }
}