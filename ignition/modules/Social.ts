import { ethers } from "hardhat";
import { getRandomWeightedNumber, waitForRandomTime } from "./waiter";
import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { NEW_DEPLOY, TEST_LOCAL, VERIFY_CONTRACTS } from "../../settings";
import { getRandomUsername } from "../../contracts-settings/getRandomName";
import { getRandomText } from "../../contracts-settings/getRandomText";
import { getRandomReportReason } from "../../contracts-settings/getRandomReportReason";
import { getRandomGroupname } from "../../contracts-settings/getRandomGroupName";

function updateContractAddress(
    contractName: string,
    contractAddress: any,
    contractsFile: string
) {
    const regex = new RegExp(
        `export const ${contractName} = "0x[a-fA-F0-9]{40}";`
    );
    const newEntry = `export const ${contractName} = "${contractAddress}";`;

    if (regex.test(contractsFile)) {
        return contractsFile.replace(regex, newEntry);
    } else {
        return contractsFile + `\n${newEntry}`;
    }
}

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("Account balance:", balance.toString());

    const chainId = (await deployer.provider.getNetwork()).chainId;
    console.log("Chain ID:", chainId);

    //get random data
    const name1 = getRandomUsername();
    const name2 = getRandomUsername();
    const name3 = getRandomUsername();
    const bio1 = getRandomText();
    const bio2 = getRandomText();
    const bio3 = getRandomText();
    const text1 = getRandomText();
    const text2 = getRandomText();
    const text3 = getRandomText();
    const text4 = getRandomText();
    const text5 = getRandomText();
    const profilePic1 = getRandomText();
    const profilePic2 = getRandomText();
    const profilePic3 = getRandomText();
    const amount1 = getRandomWeightedNumber();
    const amount2 = getRandomWeightedNumber();
    const amount3 = getRandomWeightedNumber();
    const comment1 = getRandomText();
    const comment2 = getRandomText();
    const comment3 = getRandomText();
    const message1 = getRandomText();
    const message2 = getRandomText();
    const message3 = getRandomText();
    const reportReason1 = getRandomReportReason();
    const reportReason2 = getRandomReportReason();
    const groupJanena = getRandomGroupname();
    const groupJanena2 = getRandomGroupname();

    const directoryPath = path.join(
        __dirname,
        `../../chain-settings/${chainId}`
    );
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    const contractsFilePath = path.join(directoryPath, "contracts.ts");
    const contractsFile = fs.existsSync(contractsFilePath)
        ? fs.readFileSync(contractsFilePath, "utf8")
        : "";

    let updatedContractsFile = contractsFile;

    const deployOrFetch = async (contractName: string, deployArgs: any[]) => {
        let contractInstance;

        if (NEW_DEPLOY) {
            const contractFactory = await ethers.getContractFactory(
                contractName
            );
            contractInstance = await contractFactory.deploy(...deployArgs);
            console.log(
                `${contractName} deployed to:`,
                contractInstance.target
            );
            const contractAddress = contractInstance.target;
            updatedContractsFile = updateContractAddress(
                contractName,
                contractAddress,
                updatedContractsFile
            );
            await waitForRandomTime();
        } else {
            const regex = new RegExp(
                `export const ${contractName} = "(0x[a-fA-F0-9]{40})";`
            );
            const match = contractsFile.match(regex);
            if (match) {
                const contractAddress = match[1];
                console.log(
                    `${contractName} fetched from contracts file:`,
                    contractAddress
                );
                const contractFactory = await ethers.getContractFactory(
                    contractName
                );
                contractInstance = contractFactory.attach(contractAddress); // Attach to the already deployed contract
            } else {
                throw new Error(
                    `Contract ${contractName} not found in contracts file.`
                );
            }
        }
        return contractInstance;
    };

    const userManager = await deployOrFetch("UserManager", []);
    const socialToken = await deployOrFetch("SocialToken", []);
    const postManager = await deployOrFetch("PostManager", [
        userManager.target,
    ]);
    const commentManager = await deployOrFetch("CommentManager", [
        userManager.target,
        postManager.target,
    ]);
    const followSystem = await deployOrFetch("FollowSystem", [
        userManager.target,
    ]);
    const messagingSystem = await deployOrFetch("MessagingSystem", [
        userManager.target,
    ]);
    const rewardsSystem = await deployOrFetch("RewardsSystem", [
        socialToken.target,
        userManager.target,
    ]);
    const contentModeration = await deployOrFetch("ContentModeration", [
        userManager.target,
        postManager.target,
        commentManager.target,
    ]);
    const groupManager = await deployOrFetch("GroupManager", [
        deployer.address,
    ]);

    // Write updated contracts to contracts.ts
    if (NEW_DEPLOY) {
        fs.writeFileSync(contractsFilePath, updatedContractsFile, "utf8");
    }

    const contractAddressArray = [
        userManager.target,
        socialToken.target,
        postManager.target,
        commentManager.target,
        followSystem.target,
        messagingSystem.target,
        rewardsSystem.target,
        contentModeration.target,
        groupManager.target,
    ];

    //**Interaction Starts */ */
    //! 1 Follow system starts
    // Interactions with UserManager Contract

    // Adding users
    async function addUser(
        userManager: any,
        name: any,
        bio: any,
        age: any,
        profilePic: any
    ) {
        console.log(`Adding user: ${name}`);
        await userManager.registerUser(name, bio, age, profilePic);
    }

    // Updating user profile
    async function updateUserProfile(
        userManager: any,
        name: any,
        bio: any,
        age: any,
        profilePic: any
    ) {
        console.log(`Updating user profile for address: ${name}`);
        await userManager.updateUserProfile(name, bio, age, profilePic);
    }

    // Retrieving user profile
    async function getUserProfile(userManager: any, userAddress: any) {
        console.log(`Retrieving user profile for address: ${userAddress}`);
        const profile = await userManager.getUserProfile(userAddress);
        console.log(`Profile for ${userAddress}:`, profile);
    }

    async function getUserByUsername(userManager: any, username: any) {
        console.log(`Retrieving user profile for username: ${username}`);
        const profile = await userManager.getUserByUsername(username);
        console.log(`Profile for ${username}:`, profile);
    }

    // Example user addresses
    const userAddressAlice = "0x89De2C53352850d8c1f18E7D3d1Ba999cEB2E1f5"; // pre created Replace with actual address of Alice
    const userAddressBob = TEST_LOCAL
        ? "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        : "0x713b8F6E2e42C0481E8B2A4095A4f878BF932716"; // Replace with actual address of Bob

    // Adding users
    await addUser(
        userManager,
        name1,
        bio1,
        getRandomWeightedNumber() / 100,
        profilePic1
    );
    await waitForRandomTime();

    //await addUser(userManager, "Jaimi", "I write", "Pic link");
    await waitForRandomTime();

    // Updating user profiles
    await updateUserProfile(
        userManager,
        name1,
        bio2,
        getRandomWeightedNumber() / 100,
        profilePic2
    );
    await waitForRandomTime();

    // Retrieving user profiles
    await getUserProfile(userManager, userAddressAlice);
    const alice = await getUserByUsername(userManager, name1);
    console.log("Alice profile", alice);

    //! 1 Follow system Ends

    //! 2 Follow system starts
    // Interactions with SocialToken Contract

    // Minting tokens to an address
    async function mintTokens(socialToken: any, recipient: any, amount: any) {
        console.log(`Minting ${amount} tokens to ${recipient}`);
        await socialToken.mint(
            recipient,
            ethers.parseUnits(amount.toString(), 18)
        );
    }

    // Transferring tokens from one address to another
    async function transferTokens(
        socialToken: any,
        from: any,
        to: any,
        amount: any
    ) {
        console.log(`Transferring ${amount} tokens from ${from} to ${to}`);
        await socialToken
            .connect(from)
            .transfer(to, ethers.parseUnits(amount.toString(), 18));
    }

    // Checking token balance of an address
    async function checkBalance(socialToken: any, address: any) {
        const balance = await socialToken.balanceOf(address);
        console.log(`Balance of ${address}:`, ethers.formatUnits(balance, 18));
    }

    // Minting tokens
    await mintTokens(socialToken, deployer.address, amount1); // Mint 1000 tokens to deployer
    await waitForRandomTime();

    await mintTokens(socialToken, userAddressAlice, amount2); // Mint 500 tokens to Alice
    await waitForRandomTime();

    await mintTokens(socialToken, userAddressBob, amount3); // Mint 300 tokens to Bob

    await waitForRandomTime();

    // Checking balances after minting
    await checkBalance(socialToken, deployer.address);
    await checkBalance(socialToken, userAddressAlice);
    await checkBalance(socialToken, userAddressBob);

    // Transferring tokens
    await transferTokens(
        socialToken,
        deployer,
        userAddressAlice,
        amount2 - 100
    ); // Transfer 100 tokens from deployer to Alice

    //await transferTokens(socialToken, userAddressAlice, userAddressBob, 50); // Transfer 50 tokens from Alice to Bob

    // Checking balances after transfers
    await checkBalance(socialToken, deployer.address);
    await checkBalance(socialToken, userAddressAlice);
    await checkBalance(socialToken, userAddressBob);

    //! 2 Follow system Ends

    //! 3 Follow system starts
    // Interactions with PostManager Contract
    await waitForRandomTime();

    // Creating a post
    async function createPost(postManager: any, content: any) {
        console.log(`Creating post: ${content}`);
        await postManager.createPost(content);
    }

    // Updating a post
    async function updatePost(postManager: any, postId: any, newContent: any) {
        console.log(
            `Updating post ID ${postId} with new content: ${newContent}`
        );
        await postManager.updatePost(postId, newContent);
    }

    // Retrieving a post
    async function getPost(postManager: any, postId: any) {
        console.log(`Retrieving post ID: ${postId}`);
        const post = await postManager.getPost(postId);
        console.log(`Post ID ${postId}:`, post);
    }

    async function getUserPostsCount(postManager: any, userAddress: any) {
        console.log(`Retrieving post count for user: ${userAddress}`);
        const count = await postManager.getUserPostsCount(userAddress);
        console.log(`Post count for ${userAddress}:`, count);
    }

    // Deleting a post
    async function deletePost(postManager: any, postId: any) {
        console.log(`Deleting post ID: ${postId}`);
        await postManager.deletePost(postId);
    }

    // Creating posts
    await createPost(postManager, text1);
    await waitForRandomTime();

    await createPost(postManager, text2);

    await waitForRandomTime();

    await createPost(postManager, text3);
    await waitForRandomTime();

    await createPost(postManager, text4);
    await waitForRandomTime();

    await createPost(postManager, text5);
    await waitForRandomTime();

    // Assuming post IDs are 1 and 2 for the created posts
    const postId1 = 1;
    const postId2 = 2;
    const postId3 = 3;
    const postId4 = 4;
    const postId5 = 5;

    // Retrieving posts
    await getPost(postManager, postId1);
    await getPost(postManager, postId2);

    getUserPostsCount(postManager, deployer.address);
    await waitForRandomTime();

    // Updating a post
    await updatePost(postManager, postId1, text3);

    // Retrieving updated post
    await getPost(postManager, postId1);
    await waitForRandomTime();

    //await deletePost(postManager, postId3);

    //! 3 Follow system Ends

    //! 4 Follow system starts
    // Interactions with CommentManager Contract

    // Creating a comment on a post
    async function createComment(
        commentManager: any,
        postId: any,
        content: any
    ) {
        console.log(`Creating comment on post ID ${postId}: ${content}`);
        await commentManager.createComment(postId, content);
    }

    // Updating a comment
    async function updateComment(
        commentManager: any,
        commentId: any,
        newContent: any
    ) {
        console.log(
            `Updating comment ID ${commentId} with new content: ${newContent}`
        );
        await commentManager.updateComment(commentId, newContent);
    }

    // Retrieving a comment
    async function getComment(commentManager: any, commentId: any) {
        console.log(`Retrieving comment ID: ${commentId}`);
        const comment = await commentManager.getComment(commentId);
        console.log(`Comment ID ${commentId}:`, comment);
    }

    // Deleting a comment
    async function deleteComment(commentManager: any, commentId: any) {
        console.log(`Deleting comment ID: ${commentId}`);
        await commentManager.deleteComment(commentId);
    }

    // Example interactions
    const postId = 1; // Replace with an actual post ID

    // Creating comments
    await createComment(commentManager, postId, comment1);
    await waitForRandomTime();

    await createComment(commentManager, postId, comment2);
    await waitForRandomTime();

    // Assuming comment IDs are 1 and 2 for the created comments
    const commentId1 = 1;
    const commentId2 = 2;

    // Retrieving comments
    await getComment(commentManager, commentId1);
    //await getComment(commentManager, commentId2);

    // Updating a comment
    await updateComment(commentManager, commentId1, comment3);
    await waitForRandomTime();

    // Retrieving updated comment
    await getComment(commentManager, commentId1);

    // Deleting a comment
    // await deleteComment(commentManager, commentId2);
    //await waitForRandomTime();

    // Attempt to retrieve deleted comment
    // await getComment(commentManager, commentId2);

    //! 4 Follow system Ends

    //! 5 Follow system starts
    // Interactions with FollowSystem Contract

    // Following a user
    async function followUser(followSystem: any, userToFollow: any) {
        console.log(`Following user: ${userToFollow}`);
        await followSystem.followUser(userToFollow);
    }

    // Unfollowing a user
    async function unfollowUser(followSystem: any, userToUnfollow: any) {
        console.log(`Unfollowing user: ${userToUnfollow}`);
        await followSystem.unfollowUser(userToUnfollow);
    }

    // Retrieving the list of followers for a user
    async function getFollowers(followSystem: any, user: any) {
        console.log(`Retrieving followers for user: ${user}`);
        const followers = await followSystem.getFollowers(user);
        console.log(`Followers of ${user}:`, followers);
    }

    // Retrieving the list of users a user is following
    async function getFollowing(followSystem: any, user: any) {
        console.log(`Retrieving following list for user: ${user}`);
        const following = await followSystem.getFollowing(user);
        console.log(`Users followed by ${user}:`, following);
    }

    // Following users
    await followUser(followSystem, userAddressAlice);
    // await followUser(followSystem, userAddressBob);

    // Retrieving followers

    await getFollowers(followSystem, userAddressAlice);

    await getFollowers(followSystem, userAddressBob);

    // Retrieving following lists
    await getFollowing(followSystem, deployer.address);

    // Unfollowing a user
    await waitForRandomTime();
    await unfollowUser(followSystem, userAddressAlice);

    // Retrieving updated following list
    await getFollowing(followSystem, deployer.address);

    //! 5 Follow syustem ends

    //! 6 Messaging system starts
    // Interactions with MessagingSystem Contract

    // Sending a message
    async function sendMessage(
        messagingSystem: any,
        recipient: any,
        content: any
    ) {
        console.log(`Sending message to ${recipient}: ${content}`);
        await messagingSystem.sendMessage(recipient, content);
    }

    // Retrieving messages sent by a user
    async function getSentMessages(messagingSystem: any, sender: any) {
        console.log(`Retrieving messages sent by ${sender}`);
        const messages = await messagingSystem.getUserMessages(sender);
        console.log(`Messages sent by ${sender}:`, messages);
    }

    // Retrieving messages received by a user
    // async function getReceivedMessages(messagingSystem: any, recipient: any) {
    //     console.log(`Retrieving messages received by ${recipient}`);
    //     const messages = await messagingSystem.getReceivedMessages(recipient);
    //     console.log(`Messages received by ${recipient}:`, messages);
    // }

    // Deleting a message
    // async function deleteMessage(messagingSystem: any, messageId: any) {
    //     console.log(`Deleting message ID: ${messageId}`);
    //     await messagingSystem.deleteMessage(messageId);
    // }

    //Get a message by id
    async function getMessage(messagingSystem: any, messageId: any) {
        console.log(`Retrieving message ID: ${messageId}`);
        const message = await messagingSystem.getMessage(messageId);
        console.log(`Message ID: ${messageId}`, message);
    }

    // Example addresses and message content
    const recipientAddress = "0x89De2C53352850d8c1f18E7D3d1Ba999cEB2E1f5"; // Replace with actual recipient address
    const messageContent1 = message1;
    const messageContent2 = message2;
    const senderAddress = deployer.address; // Assuming the sender is the deployer

    // Sending messages
    await sendMessage(messagingSystem, recipientAddress, messageContent1);

    await waitForRandomTime();

    await sendMessage(messagingSystem, recipientAddress, messageContent2);

    // Assuming message IDs are 1 and 2 for the sent messages
    const messageId1 = 1;
    const messageId2 = 2;
    await getMessage(messagingSystem, messageId1);
    // Retrieving sent messages
    await getSentMessages(messagingSystem, senderAddress);

    // Retrieving received messages
    //await getReceivedMessages(messagingSystem, recipientAddress);

    // Deleting a message
    // await deleteMessage(messagingSystem, messageId1);

    // Attempt to retrieve deleted message (should not exist)
    //await getSentMessages(messagingSystem, senderAddress);
    //await getReceivedMessages(messagingSystem, recipientAddress);

    //! 6 messaging system ends

    //! 7 reward system starts
    // Interactions with RewardsSystem Contract

    // Approve the RewardsSystem contract to distribute tokens on behalf of the owner
    async function approveRewardsSystem(
        socialToken: any,
        rewardsSystemAddress: any,
        owner: any
    ) {
        console.log(
            `Approving RewardsSystem at ${rewardsSystemAddress} to manage rewards on behalf of the owner.`
        );
        await socialToken.connect(owner).approveContract(rewardsSystemAddress);
        console.log("RewardsSystem approved.");
    }

    // Rewarding a user for post creation
    async function rewardForPostCreation(rewardsSystem: any, user: any) {
        console.log(`Rewarding user ${user} for post creation`);
        await rewardsSystem.rewardForPostCreation(user);
    }

    // Rewarding a user for comment creation
    async function rewardForCommentCreation(rewardsSystem: any, user: any) {
        console.log(`Rewarding user ${user} for comment creation`);
        await rewardsSystem.rewardForCommentCreation(user);
    }

    // Rewarding a user for following another user
    async function rewardForFollowing(rewardsSystem: any, user: any) {
        console.log(`Rewarding user ${user} for following another user`);
        await rewardsSystem.rewardForFollowingUser(user);
    }

    // Checking rewards balance of a user
    async function checkRewardsBalance(socialToken: any, user: any) {
        console.log(`Checking rewards balance for user: ${user}`);
        const balance = await socialToken.balanceOf(user);
        console.log(
            `Rewards balance of ${user}:`,
            ethers.formatUnits(balance, 18)
        );
    }
    await waitForRandomTime();
    // Rewarding users for actions
    // Approve the RewardsSystem contract to distribute tokens on behalf of the owner
    await approveRewardsSystem(socialToken, rewardsSystem.target, deployer);
    await waitForRandomTime();

    // Rewarding users for actions
    await rewardForPostCreation(rewardsSystem, userAddressAlice);
    await waitForRandomTime();

    await rewardForCommentCreation(rewardsSystem, userAddressBob);
    await waitForRandomTime();

    await rewardForFollowing(rewardsSystem, userAddressAlice);
    await waitForRandomTime();

    // Checking rewards balances
    await checkRewardsBalance(socialToken, userAddressAlice);
    await checkRewardsBalance(socialToken, userAddressBob);

    //! 7 reward system ends

    //! 8 content moderation starts
    // Interactions with ContentModeration Contract

    // Reporting a post
    async function reportPost(
        contentModeration: any,
        postId: any,
        reason: any
    ) {
        console.log(`Reporting post ID ${postId} for reason: ${reason}`);
        await contentModeration.reportPost(postId, reason);
    }

    // Reporting a comment
    async function reportComment(
        contentModeration: any,
        commentId: any,
        reason: any
    ) {
        console.log(`Reporting comment ID ${commentId} for reason: ${reason}`);
        await contentModeration.reportComment(commentId, reason);
    }

    // Reviewing a post report
    async function reviewPostReport(
        contentModeration: any,
        reportId: any,
        decision: any
    ) {
        console.log(
            `Reviewing post report ID ${reportId} with decision: ${decision}`
        );
        await contentModeration.reviewPostReport(reportId, decision);
    }

    // Reviewing a comment report
    async function reviewCommentReport(
        contentModeration: any,
        reportId: any,
        decision: any
    ) {
        console.log(
            `Reviewing comment report ID ${reportId} with decision: ${decision}`
        );
        await contentModeration.reviewCommentReport(reportId, decision);
    }

    // Example IDs and reasons
    //const postId = 1; // Replace with an actual post ID
    const commentId = 1; // Replace with an actual comment ID
    const reportReason = reportReason1;
    const reviewDecision = true; // true for approve, false for reject

    // Reporting posts and comments
    await reportPost(contentModeration, postId, reportReason);
    await waitForRandomTime();

    await reportComment(contentModeration, commentId, reportReason);
    await waitForRandomTime();

    // Assuming report IDs are 1 for the created reports
    const reportId1 = 1;

    // Reviewing reports
    //await reviewPostReport(contentModeration, reportId1, reviewDecision);

    //await reviewCommentReport(contentModeration, reportId1, reviewDecision);

    //! 8 content moderation ends

    //! 9 Group system starts

    // Creating a new group
    async function createGroup(groupManager: any, groupName: string) {
        console.log(`Creating group: ${groupName}`);
        await groupManager.createGroup(groupName);
    }

    // Joining a group
    async function joinGroup(groupManager: any, groupId: number) {
        console.log(`Joining group ID: ${groupId}`);
        await groupManager.joinGroup(groupId);
    }

    // Leaving a group
    async function leaveGroup(groupManager: any, groupId: number) {
        console.log(`Leaving group ID: ${groupId}`);
        await groupManager.leaveGroup(groupId);
    }

    // Getting group details
    async function getGroup(groupManager: any, groupId: number) {
        console.log(`Getting details for group ID: ${groupId}`);
        const group = await groupManager.getGroup(groupId);
        console.log(
            `Group ID: ${group[0]}, Name: ${group[1]}, Members: ${group[2]}, Owner: ${group[3]}`
        );
    }

    // Getting user's groups
    async function getUserGroups(groupManager: any, user: any) {
        console.log(`Getting groups for user: ${user}`);
        const groups = await groupManager.getUserGroups(user);
        console.log(`Groups: ${groups}`);
    }
    // Creating groups
    await waitForRandomTime();

    await createGroup(groupManager, groupJanena);
    await waitForRandomTime();

    await createGroup(groupManager, groupJanena2);
    await waitForRandomTime();

    // User1 joining the "Developers Group"
    await joinGroup(groupManager, 1);
    await waitForRandomTime();

    // User2 joining the "Designers Group"
    await joinGroup(groupManager, 2);
    await waitForRandomTime();

    // User1 leaving the "Developers Group"
    await leaveGroup(groupManager, 1);
    await waitForRandomTime();

    // Getting group details
    await getGroup(groupManager, 1);
    await getGroup(groupManager, 2);

    // Getting user groups
    await getUserGroups(groupManager, deployer);

    //! 9 Group system ends
    console.log("All interactions completed successfully.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
