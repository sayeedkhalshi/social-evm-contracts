import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x";

const config: HardhatUserConfig = {
    solidity: "0.8.18",
    networks: {
        // baseMainnet: {
        //     url: "https://mainnet.base.org",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 8453,
        // },
        // polygonMainnet: {
        //     url: process.env.POLYGON_RPC_URL,
        //     accounts: [PRIVATE_KEY],
        //     chainId: 137,
        // },
        // metisMainnet: {
        //     url: "https://lb.nodies.app/v1/d4b4abc42ddb4372a23cfc6edc08b592",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 1088,
        // },
        ethSepolia: {
            url: "https://eth-sepolia.g.alchemy.com/v2/dFxiveV70jruw7zuJ5ybDJcj1uZOiROy",
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },

        metisSepolia: {
            url: "https://sepolia.metisdevops.link",
            accounts: [PRIVATE_KEY],
            chainId: 59902,
        },
        tabiTestnet: {
            url: "https://rpc.testnet.tabichain.com",
            accounts: [PRIVATE_KEY],
            chainId: 9789,
        },
        vanarTestnet: {
            //vanguard
            url: "https://rpc-vanguard.vanarchain.com",
            accounts: [PRIVATE_KEY],
            chainId: 78600,
        },
        tenTestnet: {
            url: "https://testnet.ten.xyz/v1/?token=66a94ca7ff8715ae7ecb0cd7a2a9065de1330c02",
            accounts: [PRIVATE_KEY],
            chainId: 443,
        },
        TaikoHekla: {
            url: "https://taiko-hekla.blockpi.network/v1/rpc/public",
            accounts: [PRIVATE_KEY],
            chainId: 167009,
        }, //done

        // zksyncSepolia: {
        //     url: "https://zksync2-testnet.zksync.io",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 31337,
        // },
        // lineaSepolia: {
        //     url: "https://rpc.linea.io",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 250,
        // },
        beraTestnet: {
            url: "https://rpc.bera.network",
            accounts: [PRIVATE_KEY],
            chainId: 977,
        },
        baseSepolia: {
            url: "https://sepolia.base.org",
            accounts: [PRIVATE_KEY],
            chainId: 84532,
        },
        // polygonZKEVM: {
        //     url: "https://rpc-mainnet.maticvigil.com",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 80001,
        // },
        // opBNBTestnet: {
        //     url: "https://rpc-testnet.openbank.network",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 97,
        // },
        // zetaTestnet: {
        //     url: "https://rpc-testnet.zeta.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10000,
        // },
        // scrollSepolia: {},
        // zoraSepolia: {
        //     url: "https://zora-mainnet-v1-rpc.zoraswap.com",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 1285,
        // },
        // quaiTestnet: {
        //     url: "https://rpc.testnet.quai.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10001,
        // },
        // blastTestnet: {
        //     url: "https://rpc.testnet.blast.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10002,
        // },
        // lightLinkTestnet: {
        //     url: "https://rpc.testnet.light.eth.linkpool.io",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10003,
        // },
        // shardeumTestnet: {
        //     url: "https://rpc.testnet.shardeum.network",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10004,
        // },
        // modeTestnet: {
        //     url: "https://rpc.testnet.mode.network",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10005,
        // },
        // zkLinkTestnet: {
        //     url: "https://rpc.testnet.zklink.io",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10006,
        // },
        // astarTestnet: {
        //     url: "https://rpc.testnet.astar.network",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10007,
        // },
        // promTestnet: {
        //     url: "https://rpc.testnet.provenance.io",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10008,
        // },
        // zkSatsTestnet: {
        //     url: "https://rpc.testnet.zksync.io",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10009,
        // },
        // mantaTestnet: {
        //     url: "https://rpc.testnet.manta.network",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10010,
        // },
        // merlinTestnet: {
        //     url: "https://rpc.testnet.merlin.network",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10011,
        // },
        // fuseTestnet: {
        //     url: "https://rpc.testnet.fuse.io",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10012,
        // },
        // lumerinTestnet: {
        //     url: "https://rpc.testnet.lumerin.com",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10013,
        // },
        // mantraTestnet: {
        //     url: "https://rpc.testnet.mantra.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10014,
        // },
        // orderlyTestnet: {
        //     url: "https://rpc.testnet.orderly.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10015,
        // },
        // zkmTestnet: {
        //     url: "https://rpc.testnet.zkm.finance",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10016,
        // },
        // burntXionTestnet: {
        //     url: "https://rpc.testnet.burntxion.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10017,
        // },
        // particleTestnet: {
        //     url: "https://rpc.testnet.particle.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10018,
        // },
        // lavaTestnet: {
        //     url: "https://rpc.testnet.lava.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10019,
        // },
        // ajaxTestnet: {
        //     url: "https://rpc.testnet.ajax.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10020,
        // },
        // sideTestnet: {
        //     url: "https://rpc.testnet.side.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10021,
        // },
        // alongSideTestnet: {
        //     url: "https://rpc.testnet.alongside.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10022,
        // },
        // overProtocolTestnet: {
        //     url: "https://rpc.testnet.over.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10023,
        // },
        // neonTestnet: {
        //     url: "https://rpc.testnet.neon.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10024,
        // },
        // fuelTestnet: {
        //     url: "https://rpc.testnet.fuel.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10025,
        // },
        // fairblockTestnet: {
        //     url: "https://rpc.testnet.fairblock.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10026,
        // },
        // superFormTestnet: {
        //     url: "https://rpc.testnet.superformal.com",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10027,
        // },
        // ogTestnet: {
        //     url: "https://rpc.testnet.astar.network",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10028,
        // },
        // nebulaTestnet: {
        //     url: "https://rpc.testnet.nebula.finance",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10029,
        // },
        // coralTestnet: {
        //     url: "https://rpc.testnet.coral.network",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10030,
        // },
    },
};

export default config;
