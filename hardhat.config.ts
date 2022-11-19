import 'dotenv/config';
import {HardhatUserConfig} from 'hardhat/types';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-contract-sizer';
import { task } from "hardhat/config";
//import './scripts/build-network-files.js';
import { ethers } from "ethers";

task('networks', 'Creates network config file', async() => {
});

const config: HardhatUserConfig = {
  defaultNetwork: 'arbitrumgoerli',
  solidity: {
    version: '0.8.10',
    settings: {
      optimizer: {
        enabled: true
      }
    }
  },
  namedAccounts: {
    deployer: 0,
    poster: `${process.env.ADMIN}`,
    admin: {
      arbitrum: `${process.env.ADMIN}`,
      arbitrumgoerli: `${process.env.ADMIN}`
    },
    nativeUsdAggregator: {
      arbitrumgoerli: '0x62CAe0FA2da220f43a51F86Db2EDb36DcA9A5A08',
      arbitrum: '0x639fe6ab55c921f74e7fac1ee960c0b6293ba612'
    },
    sequencer: {
      arbitrumgoerli: '0x4da69F028a5790fCCAfe81a75C0D24f46ceCDd69',
      arbitrum: '0xFdB631F5EE196F0ed6FAa767959853A9F217697D'
    },
    glpAddress: '0x1aDDD80E6039594eE970E5872D247bf0414C8903',
    glpManagerAddress: '0x321F653eED006AD1C29D174e17d96351BDe22649',
    plvglp: '0x5326E71Ff593Ecc2CF7AcaE5Fe57582D6e74CFF1'
  },
  networks: {
    hardhat: {
      forking: {
        url: 'https://api.avax.network/ext/bc/C/rpc'
      }
    },
    arbitrum: {
      url: `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_ARBITRUM}`,
      accounts: process.env.DEPLOY_PRIVATE_KEY == undefined ? [] : [`0x${process.env.DEPLOY_PRIVATE_KEY}`],
    },
    arbitrumgoerli: {
      url: `https://arb-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_ARBITRUMGOERLI}`,
      chainId: 421613,
      accounts: process.env.DEPLOY_PRIVATE_KEY == undefined ? [] : [`0x${process.env.DEPLOY_PRIVATE_KEY}`],
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/448697ced2cd4adeb091d14fce4f0681',
      accounts: process.env.DEPLOY_PRIVATE_KEY == undefined ? [] : [`0x${process.env.DEPLOY_PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "arbitrumgoerli",
        chainId: 421613,
        urls: {
          apiURL: "https://api-goerli.arbiscan.io/api",
          browserURL: "https://goerli.arbiscan.io"
        }
      }
    ]
  },  
};



export default config;