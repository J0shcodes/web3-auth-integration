// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract VotingSystem {
    mapping (string => uint) public votes;
    mapping (address => bool) public voted;
    
    function vote(string memory candidate) public {
        require(!voted[msg.sender], "You have already voted!");
        votes[candidate] += 1;
        voted[msg.sender] = true;
    }
    
    function getVotes(string memory candidate) public view returns (uint) {
        return votes[candidate];
    }
}