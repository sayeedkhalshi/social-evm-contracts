// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./UserManager.sol"; // Assuming UserManager is in the same directory
import "./PostManager.sol"; // Assuming PostManager is in the same directory
import "./CommentManager.sol"; // Assuming CommentManager is in the same directory

contract ContentModeration {
    struct Report {
        uint256 reportId;
        address reporter;
        uint256 postId;
        uint256 commentId;
        string reason;
        uint256 timestamp;
        bool resolved;
    }

    mapping(uint256 => Report) private reports;
    uint256 private nextReportId;

    UserManager private userManager;
    PostManager private postManager;
    CommentManager private commentManager;

    event ReportCreated(
        uint256 indexed reportId,
        address indexed reporter,
        uint256 postId,
        uint256 commentId,
        string reason,
        uint256 timestamp
    );
    event ReportResolved(uint256 indexed reportId, bool resolved);

    // modifier onlyExistingUser(address _userAddress) {
    //     require(userManager.getUserProfile(_userAddress).length > 0, "User does not exist.");
    //     _;
    // }

    constructor(
        address _userManagerAddress,
        address _postManagerAddress,
        address _commentManagerAddress
    ) {
        userManager = UserManager(_userManagerAddress);
        postManager = PostManager(_postManagerAddress);
        commentManager = CommentManager(_commentManagerAddress);
        nextReportId = 1;
    }

    function reportPost(uint256 _postId, string memory _reason) public {
        //require(postManager.getPost(_postId).length > 0, "Post does not exist.");
        require(bytes(_reason).length > 0, "Reason cannot be empty.");

        reports[nextReportId] = Report({
            reportId: nextReportId,
            reporter: msg.sender,
            postId: _postId,
            commentId: 0,
            reason: _reason,
            timestamp: block.timestamp,
            resolved: false
        });

        emit ReportCreated(
            nextReportId,
            msg.sender,
            _postId,
            0,
            _reason,
            block.timestamp
        );

        nextReportId++;
    }

    function reportComment(uint256 _commentId, string memory _reason) public {
        // require(commentManager.getComment(_commentId).length > 0, "Comment does not exist.");
        require(bytes(_reason).length > 0, "Reason cannot be empty.");

        reports[nextReportId] = Report({
            reportId: nextReportId,
            reporter: msg.sender,
            postId: 0,
            commentId: _commentId,
            reason: _reason,
            timestamp: block.timestamp,
            resolved: false
        });

        emit ReportCreated(
            nextReportId,
            msg.sender,
            0,
            _commentId,
            _reason,
            block.timestamp
        );

        nextReportId++;
    }

    function reviewPostReport(uint256 _reportId, bool decision) public {
        require(
            reports[_reportId].reportId == _reportId,
            "Report does not exist."
        );
        require(!reports[_reportId].resolved, "Report already resolved.");

        reports[_reportId].resolved = decision;

        emit ReportResolved(_reportId, decision);
    }

    function reviewCommentReport(uint256 _reportId, bool decision) public {
        require(
            reports[_reportId].reportId == _reportId,
            "Report does not exist."
        );
        require(!reports[_reportId].resolved, "Report already resolved.");

        reports[_reportId].resolved = decision;

        emit ReportResolved(_reportId, decision);
    }

    function resolveReport(uint256 _reportId) public {
        require(
            reports[_reportId].reportId == _reportId,
            "Report does not exist."
        );
        require(!reports[_reportId].resolved, "Report already resolved.");

        reports[_reportId].resolved = true;

        emit ReportResolved(_reportId, true);
    }

    function getReport(
        uint256 _reportId
    )
        public
        view
        returns (address, uint256, uint256, string memory, uint256, bool)
    {
        Report memory report = reports[_reportId];
        return (
            report.reporter,
            report.postId,
            report.commentId,
            report.reason,
            report.timestamp,
            report.resolved
        );
    }

    function getAllReports() public view returns (Report[] memory) {
        Report[] memory allReports = new Report[](nextReportId - 1);
        for (uint256 i = 1; i < nextReportId; i++) {
            allReports[i - 1] = reports[i];
        }
        return allReports;
    }
}
