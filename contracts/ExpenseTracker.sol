// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ExpenseTracker {
    struct Expense {
        uint256 id;
        string description;
        uint256 amount;
        string tag;
        uint256 date;
        address owner;
    }

    struct Tag {
        string name;
        bool exists;
    }

    mapping(address => Expense[]) private userExpenses;
    mapping(address => mapping(string => Tag)) private userTags;
    mapping(address => string[]) private userTagList;

    event ExpenseAdded(uint256 id, string description, uint256 amount, string tag, uint256 date);
    event TagAdded(string name);
    event TagRemoved(string name);

    function addExpense(string memory _description, uint256 _amount, string memory _tag) public {
        require(userTags[msg.sender][_tag].exists, "Tag does not exist");
        
        uint256 expenseId = userExpenses[msg.sender].length;
        Expense memory newExpense = Expense(
            expenseId,
            _description,
            _amount,
            _tag,
            block.timestamp,
            msg.sender
        );
        
        userExpenses[msg.sender].push(newExpense);
        emit ExpenseAdded(expenseId, _description, _amount, _tag, block.timestamp);
    }

    function addTag(string memory _name) public {
        require(!userTags[msg.sender][_name].exists, "Tag already exists");
        
        userTags[msg.sender][_name] = Tag(_name, true);
        userTagList[msg.sender].push(_name);
        emit TagAdded(_name);
    }

    function removeTag(string memory _name) public {
        require(userTags[msg.sender][_name].exists, "Tag does not exist");
        
        userTags[msg.sender][_name].exists = false;
        emit TagRemoved(_name);
    }

    function getExpenses() public view returns (Expense[] memory) {
        return userExpenses[msg.sender];
    }

    function getTags() public view returns (string[] memory) {
        return userTagList[msg.sender];
    }
}
