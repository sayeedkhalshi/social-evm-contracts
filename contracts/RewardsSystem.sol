// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./SocialToken.sol";
import "./UserManager.sol";

contract RewardsSystem {
    SocialToken private socialToken;
    UserManager private userManager;

    event RewardDistributed(
        address indexed user,
        uint256 amount,
        string reason
    );

    constructor(address _socialTokenAddress, address _userManagerAddress) {
        socialToken = SocialToken(_socialTokenAddress);
        userManager = UserManager(_userManagerAddress);
    }

    function distributeReward(
        address _user,
        uint256 _amount,
        string memory _reason
    ) public {
        require(_amount > 0, "Reward amount must be greater than zero.");

        // Assuming RewardsSystem is approved to transfer tokens on behalf of the owner
        socialToken.transferFromOwner(_user, _amount);

        emit RewardDistributed(_user, _amount, _reason);
    }

    function rewardForPostCreation(address _user) public {
        uint256 rewardAmount = 10 * 10 ** 18; // Reward amount can be adjusted
        distributeReward(_user, rewardAmount, "Post Creation");
    }

    function rewardForCommentCreation(address _user) public {
        uint256 rewardAmount = 5 * 10 ** 18; // Reward amount can be adjusted
        distributeReward(_user, rewardAmount, "Comment Creation");
    }

    function rewardForLikingPost(address _user) public {
        uint256 rewardAmount = 2 * 10 ** 18; // Reward amount can be adjusted
        distributeReward(_user, rewardAmount, "Post Liked");
    }

    function rewardForFollowingUser(address _user) public {
        uint256 rewardAmount = 3 * 10 ** 18; // Reward amount can be adjusted
        distributeReward(_user, rewardAmount, "User Followed");
    }
}
