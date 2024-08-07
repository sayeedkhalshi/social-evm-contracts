// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import './UserManager.sol'; // Assuming UserManager is in the same directory
import './PostManager.sol'; // Assuming PostManager is in the same directory

contract CommentManager {
    struct Comment {
        uint256 commentId;
        uint256 postId;
        address commenter;
        string content;
        uint256 timestamp;
        bool exists;
    }

    mapping(uint256 => Comment) private comments;
    mapping(uint256 => uint256[]) private postComments;
    uint256 private nextCommentId;

    UserManager private userManager;
    PostManager private postManager;

    event CommentCreated(uint256 indexed commentId, uint256 indexed postId, address indexed commenter, string content, uint256 timestamp);
    event CommentUpdated(uint256 indexed commentId, string content, uint256 timestamp);

    // modifier onlyExistingUser(address _userAddress) {
    //     require(userManager.getUserProfile(_userAddress).length > 0, "User does not exist.");
    //     _;
    // }



 

    constructor(address _userManagerAddress, address _postManagerAddress) {
        userManager = UserManager(_userManagerAddress);
        postManager = PostManager(_postManagerAddress);
        nextCommentId = 1;
    }

    function createComment(uint256 _postId, string memory _content) public {
        require(bytes(_content).length > 0, "Comment content cannot be empty.");

        comments[nextCommentId] = Comment({
            commentId: nextCommentId,
            postId: _postId,
            commenter: msg.sender,
            content: _content,
            timestamp: block.timestamp,
            exists: true
        });

        postComments[_postId].push(nextCommentId);

        emit CommentCreated(nextCommentId, _postId, msg.sender, _content, block.timestamp);

        nextCommentId++;
    }

    function updateComment(uint256 _commentId, string memory _content) public  {
        require(bytes(_content).length > 0, "Comment content cannot be empty.");

        Comment storage comment = comments[_commentId];
        comment.content = _content;
        comment.timestamp = block.timestamp;

        emit CommentUpdated(_commentId, _content, block.timestamp);
    }

    function getComment(uint256 _commentId) public view returns (uint256, address, string memory, uint256) {
        require(comments[_commentId].exists, "Comment does not exist.");

        Comment memory comment = comments[_commentId];
        return (comment.postId, comment.commenter, comment.content, comment.timestamp);
    }

    function getCommentsByPost(uint256 _postId) public view returns (uint256[] memory) {
        return postComments[_postId];
    }
}
