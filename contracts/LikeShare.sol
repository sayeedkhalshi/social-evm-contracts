// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./UserManager.sol";
import "./PostManager.sol";

contract LikeShare {
    UserManager private userManager;
    PostManager private postManager;

    struct PostInteraction {
        uint256 likes;
        uint256 shares;
        mapping(address => bool) hasLiked;
        mapping(address => bool) hasShared;
    }

    mapping(uint256 => PostInteraction) private postInteractions;

    event PostLiked(uint256 indexed postId, address indexed user);
    event PostUnliked(uint256 indexed postId, address indexed user);
    event PostShared(uint256 indexed postId, address indexed user);

    constructor(address _userManagerAddress, address _postManagerAddress) {
        userManager = UserManager(_userManagerAddress);
        postManager = PostManager(_postManagerAddress);
    }

    function likePost(uint256 _postId) public {
        require(
            !postInteractions[_postId].hasLiked[msg.sender],
            "User has already liked this post."
        );

        postInteractions[_postId].hasLiked[msg.sender] = true;
        postInteractions[_postId].likes++;

        emit PostLiked(_postId, msg.sender);
    }

    function unlikePost(uint256 _postId) public {
        require(
            postInteractions[_postId].hasLiked[msg.sender],
            "User has not liked this post."
        );

        postInteractions[_postId].hasLiked[msg.sender] = false;
        postInteractions[_postId].likes--;

        emit PostUnliked(_postId, msg.sender);
    }

    function sharePost(uint256 _postId) public {
        require(
            !postInteractions[_postId].hasShared[msg.sender],
            "User has already shared this post."
        );

        postInteractions[_postId].hasShared[msg.sender] = true;
        postInteractions[_postId].shares++;

        emit PostShared(_postId, msg.sender);
    }

    function getPostLikes(uint256 _postId) public view returns (uint256) {
        return postInteractions[_postId].likes;
    }

    function getPostShares(uint256 _postId) public view returns (uint256) {
        return postInteractions[_postId].shares;
    }
}
