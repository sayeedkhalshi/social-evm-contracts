// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import './UserManager.sol'; // Assuming UserManager is in the same directory

contract FollowSystem {
    struct Follower {
        address followerAddress;
        uint256 followDate;
    }

    mapping(address => address[]) private followers;
    mapping(address => address[]) private following;
    mapping(address => mapping(address => bool)) private isFollowing;

    UserManager private userManager;

    event Followed(address indexed follower, address indexed followee, uint256 followDate);
    event Unfollowed(address indexed follower, address indexed followee);


// modifier onlyExistingUser(address _userAddress) {
//     // Retrieve the user profile
//     (string memory name, , , ) = userManager.getUserProfile(_userAddress);
//     // Check if the name field is not empty
//     require(bytes(name).length > 0, "User does not exist.");
//     _;
// }

    constructor(address _userManagerAddress) {
        userManager = UserManager(_userManagerAddress);
    }

    function followUser(address _followee) public  {
        require(_followee != msg.sender, "You cannot follow yourself.");
        require(!isFollowing[msg.sender][_followee], "You are already following this user.");

        followers[_followee].push(msg.sender);
        following[msg.sender].push(_followee);
        isFollowing[msg.sender][_followee] = true;

        emit Followed(msg.sender, _followee, block.timestamp);
    }

    function unfollowUser(address _followee) public {
        require(isFollowing[msg.sender][_followee], "You are not following this user.");

        // Remove follower
        for (uint256 i = 0; i < followers[_followee].length; i++) {
            if (followers[_followee][i] == msg.sender) {
                followers[_followee][i] = followers[_followee][followers[_followee].length - 1];
                followers[_followee].pop();
                break;
            }
        }

        // Remove followee
        for (uint256 i = 0; i < following[msg.sender].length; i++) {
            if (following[msg.sender][i] == _followee) {
                following[msg.sender][i] = following[msg.sender][following[msg.sender].length - 1];
                following[msg.sender].pop();
                break;
            }
        }

        isFollowing[msg.sender][_followee] = false;

        emit Unfollowed(msg.sender, _followee);
    }

    function getFollowers(address _userAddress) public view returns (address[] memory) {
        return followers[_userAddress];
    }

    function getFollowing(address _userAddress) public view returns (address[] memory) {
        return following[_userAddress];
    }

    function isUserFollowing(address _follower, address _followee) public view returns (bool) {
        return isFollowing[_follower][_followee];
    }
}
