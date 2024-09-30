import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const balance = await deployer.provider.getBalance(deployer.address);
    console.log("Account balance:", balance.toString());

    const chainId = (await deployer.provider.getNetwork()).chainId;
    console.log("Chain ID:", chainId);

    const tokenArray = [
        { name: "Bitcoin", symbol: "BTC" },
        { name: "Ethereum", symbol: "ETH" },
        { name: "Binance Coin", symbol: "BNB" },
        { name: "Tether", symbol: "USDT" },
        { name: "Cardano", symbol: "ADA" },
        { name: "Solana", symbol: "SOL" },
        { name: "XRP", symbol: "XRP" },
        { name: "Polkadot", symbol: "DOT" },
        { name: "Dogecoin", symbol: "DOGE" },
        { name: "Shiba Inu", symbol: "SHIB" },
        { name: "Avalanche", symbol: "AVAX" },
        { name: "Terra", symbol: "LUNA" },
        { name: "Chainlink", symbol: "LINK" },
        { name: "Litecoin", symbol: "LTC" },
        { name: "Uniswap", symbol: "UNI" },
        { name: "Polygon", symbol: "MATIC" },
        { name: "Stellar", symbol: "XLM" },
        { name: "VeChain", symbol: "VET" },
        { name: "TRON", symbol: "TRX" },
        { name: "Cosmos", symbol: "ATOM" },
        { name: "Algorand", symbol: "ALGO" },
        { name: "Elrond", symbol: "EGLD" },
        { name: "Aave", symbol: "AAVE" },
        { name: "Filecoin", symbol: "FIL" },
        { name: "Tezos", symbol: "XTZ" },
        { name: "Theta", symbol: "THETA" },
        { name: "Axie Infinity", symbol: "AXS" },
        { name: "EOS", symbol: "EOS" },
        { name: "Zcash", symbol: "ZEC" },
        { name: "Maker", symbol: "MKR" },
    ];

    const contractFactory = await ethers.getContractFactory("Token");

    for (let i = 0; i < tokenArray.length; i++) {
        const contractInstance = await contractFactory.deploy(
            tokenArray[i].name,
            tokenArray[i].symbol
        );
        console.log(
            `${tokenArray[i].name} deployed to:`,
            contractInstance.target
        );
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
