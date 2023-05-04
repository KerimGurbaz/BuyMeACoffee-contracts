// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract ByMeACoffee {

    // Event to emit when a Memo is created.
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    // Memo struct.
    struct Memo{
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // List of all memos received from frends.
    Memo[] memos;
    

    // Address of contract deployer.

    address payable owner;

}
