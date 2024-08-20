import { exec } from "child_process";
import {
    UserManager,
    CommentManager,
    ContentModeration,
    GroupManager,
    MessagingSystem,
    PostManager,
    RewardsSystem,
    SocialToken,
    FollowSystem,
} from "./contracts";

const contractAddressArray = [
    UserManager,
    SocialToken,
    PostManager,
    CommentManager,
    FollowSystem,
    MessagingSystem,
    RewardsSystem,
    ContentModeration,
    GroupManager,
];
// Verify the contract on Etherscan
for (const contractAddress of contractAddressArray) {
    exec(
        `npx hardhat verify --network bartio_testnet ${contractAddress} --force`,
        (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        }
    );
}
