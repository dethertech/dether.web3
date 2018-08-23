/* eslint-disable no-console */
/* eslint-disable-next-line */
import detherWeb3 from 'detherweb3';

const getInfo = async () => {
  try {
    console.log('Instantiate DetherWeb3');
    await detherWeb3.init();

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

    const zoneId = 'GI';
    const zonePrice = await detherWeb3.getTellerZonePrice(zoneId);
    console.log(`zonePrice: ${zonePrice}`);

    const open = await detherWeb3.isTellerZoneOpen(zoneId);
    console.log(`open: ${open}`);

    const tellerData = {
      lat: '48.86747',
      lng: '2.34092',
      countryId: 'GI',
      postalCode: '75009',
      avatarId: '06',
      currencyId: '2',
      messenger: 'teller3',
      rates: 30,
      buyer: true,
      buyRates: 10,
    };

    try {
          await detherWeb3.addTeller(tellerData);
          console.log('Teller added');
          const teller = await detherWeb3.getTeller();
          console.log(`Get teller: ${teller}`);
          const hashDelete = await detherWeb3.deleteTeller();
          console.log(`Delete teller: ${hashDelete.transactionHash}`);
        } catch (e) {
          console.log(e);
        }
  } catch (e) {
    console.log(e);
  }
};

getInfo();
