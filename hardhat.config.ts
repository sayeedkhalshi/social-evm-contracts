import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x";
const ANVIL_KEY = process.env.ANVIL_KEY || "0x";

const config: HardhatUserConfig = {
    solidity: "0.8.18",
    etherscan: {
        apiKey: {
            bartio_testnet: "bartio_testnet", // apiKey is not required, just set a placeholder
        },
        customChains: [
            {
                network: "bartio_testnet",
                chainId: 80084,
                urls: {
                    apiURL: "https://api.routescan.io/v2/network/testnet/evm/80084/etherscan",
                    browserURL: "https://bartio.beratrail.io",
                },
            },
        ],
    },
    networks: {
        anvilLocalhost: {
            url: "http://127.0.0.1:8545",
            accounts: [ANVIL_KEY],
            chainId: 31337,
        },
        ethSepolia: {
            url: "https://eth-sepolia.g.alchemy.com/v2/dFxiveV70jruw7zuJ5ybDJcj1uZOiROy",
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },

        tabiTestnet: {
            url: "https://rpc.testnet.tabichain.com",
            accounts: [PRIVATE_KEY],
            chainId: 9789,
        },

        tenTestnet: {
            url: "https://testnet.ten.xyz/v1/?token=474DCD7D16298E42C788F6F2CE0BD633888538EF",
            accounts: [PRIVATE_KEY],
            chainId: 443,
        },
        TaikoHekla: {
            url: "https://taiko-hekla.blockpi.network/v1/rpc/public",
            accounts: [PRIVATE_KEY],
            chainId: 167009,
        }, //done

        lineaSepolia: {
            url: "https://rpc.linea.io",
            accounts: [PRIVATE_KEY],
            chainId: 250,
        },
        bartio_testnet: {
            url: "https://bartio.rpc.berachain.com/",
            accounts: [PRIVATE_KEY],
            chainId: 80084,
        },
        baseSepolia: {
            url: "https://sepolia.base.org",
            accounts: [PRIVATE_KEY],
            chainId: 84532,
        },

        // quaiTestnet: {
        //     url: "https://rpc.testnet.quai.xyz",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 10001,
        // },

        shardeumTestnet: {
            url: "https://rpc.testnet.shardeum.network",
            accounts: [PRIVATE_KEY],
            chainId: 10004,
        },

        haven1Testnet: {
            url: "https://testnet-rpc.haven1.org",
            accounts: [PRIVATE_KEY],
            chainId: 810,
        },

        etherlinkTestnet: {
            url: "https://node.ghostnet.etherlink.com",
            accounts: [PRIVATE_KEY],
            chainId: 128123,
        },
        zkscamTestnet: {
            url: "https://zkscam.io/rpc/",
            accounts: [PRIVATE_KEY],
            chainId: 63658,
        },
        fluentTestnet: {
            url: "https://rpc.dev.thefluent.xyz/",
            accounts: [PRIVATE_KEY],
            chainId: 20993,
        },

        quaiTestnet: {
            url: "https://rpc.paxos1.colosseum.quaiscan.io",
            accounts: [PRIVATE_KEY],
            chainId: 9000,
        },
        zircuittestnet: {
            url: "https://zircuit1.p2pify.com/",
            accounts: [PRIVATE_KEY],
            chainId: 48899,
        },

        zamaTestnet: {
            url: "https://devnet.zama.ai",
            accounts: [PRIVATE_KEY],
            chainId: 8009,
        },

        fhenixTestnet: {
            url: "https://api.helium.fhenix.zone",
            accounts: [PRIVATE_KEY],
            chainId: 8008135,
        },
        atletaTestnet: {
            url: "https://testnet-rpc.atleta.network:9944/",
            accounts: [PRIVATE_KEY],
            chainId: 2340,
        },
        artelaTestnet: {
            url: "https://betanet-rpc1.artela.network",
            accounts: [PRIVATE_KEY],
            chainId: 11822,
        },
        citreaTestnet: {
            url: "https://rpc.devnet.citrea.xyz",
            accounts: [PRIVATE_KEY],
            chainId: 62298,
        },

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
