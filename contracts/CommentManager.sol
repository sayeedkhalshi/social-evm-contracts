// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./UserManager.sol"; // Assuming UserManager is in the same directory
import "./PostManager.sol"; // Assuming PostManager is in the same directory

contract CommentManager {
    struct Comment {
        uint256 commentId;
        uint256 postId;
        address commenter;
        string content;
        uint256 timestamp;
        bool exists;
    }

    struct Reply {
        uint256 commentId;
        uint256 parentCommentId;
        address replyer;
        string content;
        uint256 timestamp;
    }

    mapping(uint256 => Comment) private comments;
    mapping(uint256 => uint256[]) private postComments;
    mapping(uint256 => Reply[]) private commentReplies;
    uint256 private nextCommentId;

    UserManager private userManager;
    PostManager private postManager;

    event CommentCreated(
        uint256 indexed commentId,
        uint256 indexed postId,
        address indexed commenter,
        string content,
        uint256 timestamp
    );
    event CommentUpdated(
        uint256 indexed commentId,
        string content,
        uint256 timestamp
    );
    event CommentDeleted(uint256 indexed commentId);

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

        emit CommentCreated(
            nextCommentId,
            _postId,
            msg.sender,
            _content,
            block.timestamp
        );

        nextCommentId++;
    }

    function createReply(uint256 _commentId, string memory _content) public {
        require(bytes(_content).length > 0, "Reply content cannot be empty.");
        require(comments[_commentId].exists, "Comment does not exist.");

        Reply memory newReply = Reply({
            commentId: _commentId,
            parentCommentId: _commentId,
            replyer: msg.sender,
            content: _content,
            timestamp: block.timestamp
        });

        commentReplies[_commentId].push(newReply);
        emit CommentCreated(
            nextCommentId,
            _commentId,
            msg.sender,
            _content,
            block.timestamp
        );
        nextCommentId++;
    }

    function updateComment(uint256 _commentId, string memory _content) public {
        require(bytes(_content).length > 0, "Comment content cannot be empty.");

        Comment storage comment = comments[_commentId];
        require(comment.exists, "Comment does not exist.");
        require(
            comment.commenter == msg.sender,
            "Only the commenter can update the comment."
        );

        comment.content = _content;
        comment.timestamp = block.timestamp;

        emit CommentUpdated(_commentId, _content, block.timestamp);
    }

    function deleteComment(uint256 _commentId) public {
        Comment storage comment = comments[_commentId];
        require(comment.exists, "Comment does not exist.");
        require(
            comment.commenter == msg.sender,
            "Only the commenter can delete the comment."
        );

        uint256 postId = comment.postId;

        // Remove the comment from the postComments mapping
        uint256[] storage commentIds = postComments[postId];
        for (uint256 i = 0; i < commentIds.length; i++) {
            if (commentIds[i] == _commentId) {
                // Replace the removed comment ID with the last comment ID
                commentIds[i] = commentIds[commentIds.length - 1];
                commentIds.pop();
                break;
            }
        }

        // Remove the comment from the comments mapping
        delete comments[_commentId];

        emit CommentDeleted(_commentId);
    }

    function getComment(
        uint256 _commentId
    ) public view returns (uint256, address, string memory, uint256) {
        require(comments[_commentId].exists, "Comment does not exist.");

        Comment memory comment = comments[_commentId];
        return (
            comment.postId,
            comment.commenter,
            comment.content,
            comment.timestamp
        );
    }

    function getCommentsByPost(
        uint256 _postId
    ) public view returns (uint256[] memory) {
        return postComments[_postId];
    }

    function getRepliesByComment(
        uint256 _commentId
    ) public view returns (Reply[] memory) {
        return commentReplies[_commentId];
    }
}
