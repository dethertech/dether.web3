/* eslint-disable no-console */
/* eslint-disable-next-line */
import DetherWeb3 from 'detherWeb3';

const getInfo = async () => {
  try {
    console.log('Instantiate DetherWeb3');
    const detherWeb3 = await new DetherWeb3();

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
    console.log(balances);

    const isSmsReg = await detherWeb3.isSmsReg();
    console.log(`isSmsReg: ${isSmsReg}`);

    const zoneId = 'FR';
    const zonePrice = await detherWeb3.getZonePrice(zoneId);
    console.log(`zonePrice: ${zonePrice}`);

    const open = await detherWeb3.isZoneOpen(zoneId);
    console.log(`open: ${open}`);

    const data = {
      lat: 1.23,
      lng: 12.324,
      countryId: 'FR',
      postalCode: '34584',
      cat: 'catch',
      name: 'name',
      description: 'desc',
      opening: '0000000',
    };


    const hash = await detherWeb3.addShop(data);
    console.log(`hash add: ${hash.transactionHash}`);

    setTimeout(async () => {
      const transactionStatus = await detherWeb3.getTransactionStatus(hash.transactionHash);
      console.log(`Transaction status: ${transactionStatus}`);

      setTimeout(async () => {
        try {
          const shop = await detherWeb3.getShop();
          console.log(`Get shop: ${shop}`);

          setTimeout(async () => {
            try {
              const hashDelete = await detherWeb3.deleteShop();
              console.log(`Delete shop: ${hashDelete.transactionHash}`);
            } catch (e) {
              console.log(e);
            }
          }, 15000);
        } catch (e) {
          console.log(e);
        }
      }, 15000);
    }, 10000);
  } catch (e) {
    console.log(e);
  }
};

getInfo();
