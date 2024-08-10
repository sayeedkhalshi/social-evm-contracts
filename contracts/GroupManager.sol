// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./UserManager.sol"; // Assuming UserManager is in the same directory

contract GroupManager {
    struct Group {
        uint256 groupId;
        string name;
        address[] members;
        address owner;
    }

    uint256 private nextGroupId;
    mapping(uint256 => Group) private groups;
    mapping(address => uint256[]) private userGroups;

    UserManager private userManager;

    event GroupCreated(
        uint256 indexed groupId,
        string name,
        address indexed owner
    );
    event UserJoinedGroup(uint256 indexed groupId, address indexed user);
    event UserLeftGroup(uint256 indexed groupId, address indexed user);

    modifier onlyGroupOwner(uint256 _groupId) {
        require(
            groups[_groupId].owner == msg.sender,
            "Caller is not the group owner."
        );
        _;
    }

    constructor(address _userManagerAddress) {
        userManager = UserManager(_userManagerAddress);
        nextGroupId = 1;
    }

    function createGroup(string memory _name) public {
        require(bytes(_name).length > 0, "Group name cannot be empty.");

        address[] memory members;
        groups[nextGroupId] = Group({
            groupId: nextGroupId,
            name: _name,
            members: members,
            owner: msg.sender
        });

        groups[nextGroupId].members.push(msg.sender);
        userGroups[msg.sender].push(nextGroupId);

        emit GroupCreated(nextGroupId, _name, msg.sender);

        nextGroupId++;
    }

    function joinGroup(uint256 _groupId) public {
        require(groups[_groupId].groupId == _groupId, "Group does not exist.");

        groups[_groupId].members.push(msg.sender);
        userGroups[msg.sender].push(_groupId);

        emit UserJoinedGroup(_groupId, msg.sender);
    }

    function leaveGroup(uint256 _groupId) public {
        require(groups[_groupId].groupId == _groupId, "Group does not exist.");

        // Remove the user from the group's member list
        address[] storage members = groups[_groupId].members;
        for (uint256 i = 0; i < members.length; i++) {
            if (members[i] == msg.sender) {
                members[i] = members[members.length - 1];
                members.pop();
                break;
            }
        }

        // Remove the group from the user's group list
        uint256[] storage userGroupList = userGroups[msg.sender];
        for (uint256 i = 0; i < userGroupList.length; i++) {
            if (userGroupList[i] == _groupId) {
                userGroupList[i] = userGroupList[userGroupList.length - 1];
                userGroupList.pop();
                break;
            }
        }

        emit UserLeftGroup(_groupId, msg.sender);
    }

    function getGroup(
        uint256 _groupId
    ) public view returns (uint256, string memory, address[] memory, address) {
        require(groups[_groupId].groupId == _groupId, "Group does not exist.");
        Group memory group = groups[_groupId];
        return (group.groupId, group.name, group.members, group.owner);
    }

    function getUserGroups(
        address _user
    ) public view returns (uint256[] memory) {
        return userGroups[_user];
    }
}
