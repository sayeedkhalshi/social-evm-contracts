// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./UserManager.sol"; // Assuming UserManager is in the same directory

contract MessagingSystem {
    struct Message {
        uint256 messageId;
        address sender;
        address receiver;
        string content;
        uint256 timestamp;
    }

    mapping(uint256 => Message) private messages;
    mapping(address => uint256[]) private userMessages;
    uint256 private nextMessageId;

    UserManager private userManager;

    event MessageSent(
        uint256 indexed messageId,
        address indexed sender,
        address indexed receiver,
        string content,
        uint256 timestamp
    );

    // modifier onlyExistingUser(address _userAddress) {
    //     // Retrieve the user profile
    //     (string memory name, , , ) = userManager.getUserProfile(_userAddress);
    //     // Check if the name field is not empty
    //     require(bytes(name).length > 0, "User does not exist.");
    //     _;
    // }

    constructor(address _userManagerAddress) {
        userManager = UserManager(_userManagerAddress);
        nextMessageId = 1;
    }

    function sendMessage(address _receiver, string memory _content) public {
        require(bytes(_content).length > 0, "Message content cannot be empty.");

        messages[nextMessageId] = Message({
            messageId: nextMessageId,
            sender: msg.sender,
            receiver: _receiver,
            content: _content,
            timestamp: block.timestamp
        });

        userMessages[msg.sender].push(nextMessageId);
        userMessages[_receiver].push(nextMessageId);

        emit MessageSent(
            nextMessageId,
            msg.sender,
            _receiver,
            _content,
            block.timestamp
        );

        nextMessageId++;
    }

    function getMessage(
        uint256 _messageId
    ) public view returns (address, address, string memory, uint256) {
        Message memory message = messages[_messageId];
        return (
            message.sender,
            message.receiver,
            message.content,
            message.timestamp
        );
    }

    function getUserMessages(
        address _userAddress
    ) public view returns (uint256[] memory) {
        return userMessages[_userAddress];
    }

    function updateMessage(
        uint256 _messageId,
        string memory _newContent
    ) public {
        Message storage message = messages[_messageId];
        require(
            message.sender == msg.sender,
            "Only the sender can update the message."
        );
        require(bytes(_newContent).length > 0, "New content cannot be empty.");
        message.content = _newContent;
    }
}
