import { ethers } from "hardhat";
import { waitForRandomTime } from "./waiter";

import * as fs from "fs";
import * as path from "path";
import { NEW_DEPLOY, TEST_LOCAL, VERIFY_CONTRACTS } from "../../settings";

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
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
