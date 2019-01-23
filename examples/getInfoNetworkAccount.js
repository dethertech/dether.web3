/* eslint-disable no-console */
/* eslint-disable-next-line */

import Web3 from 'web3';
import DetherWeb3 from '../src/index';

const getInfo = async () => {

  const providerData = {
    network: 'mainnet',
  };
  
    console.log('Instantiate DetherWeb3');
    const detherWeb3 = new DetherWeb3(providerData);
    console.log('Getters:');
    const address = detherWeb3.ethAddress;
    console.log(`ethAddress: ${address}`);
    const networkId = detherWeb3.network;
    console.log(`network: ${networkId}`);
    const { isWeb3 } = detherWeb3;
    console.log(`isWeb3: ${isWeb3}`);
    const { isConnected } = detherWeb3;
    console.log(`isConnected: ${isConnected}`);

    const balances = await detherWeb3.getBalance();
    console.log('Balance:');
    console.log(Web3.utils.fromWei(balances._bn.toString()), 'ETH');

    const isSmsReg = await detherWeb3.isSmsReg();
    console.log(`isSmsReg: ${isSmsReg}`);

    const zoneId = 'GB';
    const zonePrice = await detherWeb3.getLicenceTeller(zoneId);
    console.log(`zonePrice: ${zonePrice}`);

    const open = await detherWeb3.isTellerZoneOpen(zoneId);
    console.log(`open: ${open}`);
};

getInfo();
