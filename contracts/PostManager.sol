// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import './UserManager.sol'; // Assuming UserManager is in the same directory

contract PostManager {
    struct Post {
        uint256 postId;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
        bool exists;
    }

    mapping(uint256 => Post) private posts;
    mapping(address => uint256[]) private userPosts;
    uint256 private nextPostId;

    UserManager private userManager;

    event PostCreated(uint256 indexed postId, address indexed author, string content, uint256 timestamp);
    event PostUpdated(uint256 indexed postId, string content, uint256 timestamp);
    event PostLiked(uint256 indexed postId, address indexed liker);

   

// modifier onlyExistingUser(address _userAddress) {
//     // Retrieve the user profile
//     (string memory name, , , ) = userManager.getUserProfile(_userAddress);
//     // Check if the name field is not empty
//     require(bytes(name).length > 0, "User does not exist.");
//     _;
// }

  

    constructor(address _userManagerAddress) {
        userManager = UserManager(_userManagerAddress);
        nextPostId = 1;
    }

    function createPost(string memory _content) public {
        require(bytes(_content).length > 0, "Post content cannot be empty.");

        posts[nextPostId] = Post({
            postId: nextPostId,
            author: msg.sender,
            content: _content,
            timestamp: block.timestamp,
            likes: 0,
            exists: true
        });

        userPosts[msg.sender].push(nextPostId);

        emit PostCreated(nextPostId, msg.sender, _content, block.timestamp);

        nextPostId++;
    }

    function updatePost(uint256 _postId, string memory _content) public {
        require(bytes(_content).length > 0, "Post content cannot be empty.");

        Post storage post = posts[_postId];
        post.content = _content;
        post.timestamp = block.timestamp;

        emit PostUpdated(_postId, _content, block.timestamp);
    }

    function likePost(uint256 _postId) public {
        require(posts[_postId].exists, "Post does not exist.");

        posts[_postId].likes++;

        emit PostLiked(_postId, msg.sender);
    }

    function getPost(uint256 _postId) public view returns (address, string memory, uint256, uint256) {
        require(posts[_postId].exists, "Post does not exist.");

        Post memory post = posts[_postId];
        return (post.author, post.content, post.timestamp, post.likes);
    }

    function getUserPosts(address _userAddress) public view returns (uint256[] memory) {
        return userPosts[_userAddress];
    }
}
