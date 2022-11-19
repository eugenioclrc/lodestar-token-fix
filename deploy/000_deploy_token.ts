import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy, get, save} = deployments;

  const {deployer} = await getNamedAccounts();

  const oldToken = '0x241e54490505bc1a9e3bfdb7c79494c52c29e52c' // dai on arbitrumgoerli
  const newToken = '0x6b6e2dE69838dd7f5Cc8b3f7c527Bb70F4f0Ca74' // usdc on arbitrumgoerli

  const lode = await deploy('TokenFix', {
    from: deployer,
    contract: 'TokenFix',
    args: [
      oldToken,
      newToken
    ],
    log: true
  });

};
export default func;
func.tags = ['TokenFix'];