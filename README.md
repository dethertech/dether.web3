# dether.web3

## Run example

* Google Chrome
* Metamask

TODO
* Check if the user is logged

Build the package
```
yarn build
```

Creage new React app
```
cd examples
npx create-react-app test
cd ..
```

Copy lib directory to node_modules
```
mv lib detherweb3
mv detherweb3 examples/test/node_modules
```

Copy package json
```
cp package.json examples/test/node_modules/detherweb3
cd examples/test/node_modules/detherweb3
yarn
cd ../../../
```

Copy example.js to src
```
cp example.js test/src
```

Remove everything in src/index.js and paste this code
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './example';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

```

Run the app and watch the console on the browser
```
cd test/
yarn start
```

Update the Build
```
yarn build
cp -r lib/* examples/test/node_modules/detherweb3/
```

## Usage

#### Instanciate
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = new DetherWeb3();
  await detherWeb3.init()
} catch (e) {
  console.log(e)
}
```

### Methods

#### Get Balance
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = new DetherWeb3();
  await detherWeb3.init()

  const balances = await detherWeb3.getBalance();

  console.log(balances);
} catch (e) {
  console.log(e)
}
```

#### Is sms registered
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = new DetherWeb3();
  await detherWeb3.init()

  const isSmsReg = await detherWeb3.isSmsReg();

  console.log(isSmsReg);
} catch (e) {
  console.log(e)
}
```

#### Get zone price
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = new DetherWeb3();
  await detherWeb3.init()

  const zoneId = 'GI'

  const zonePrice = await detherWeb3.getZonePrice(zoneId);

  console.log(zonePrice);
} catch (e) {
  console.log(e)
}
```

#### Get transaction status
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = new DetherWeb3();
  await detherWeb3.init()

  const hash = '' // ethereum transaction hash

  const transactionStatus = await detherWeb3.getTransactionStatus(hash);

  console.log(transactionStatus);
} catch (e) {
  console.log(e)
}
```

#### Is zone open
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = new DetherWeb3();
  await detherWeb3.init()

  const zoneId = 'GI'

  const open = await detherWeb3.isZoneOpen(zoneId);

  console.log(open);
} catch (e) {
  console.log(e)
}
```

#### Get shop
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = new DetherWeb3();
  await detherWeb3.init()

  const shop = await detherWeb3.getShop();

  console.log(shop);
} catch (e) {
  console.log(e)
}
```

#### Delete shop
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = new DetherWeb3();
  await detherWeb3.init()

  const hash = await detherWeb3.deleteShop();

  console.log(hash);
} catch (e) {
  console.log(e)
}
```

#### Add shop
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = new DetherWeb3();
  await detherWeb3.init()

  const data = {
    lat: 1.23,
    lng: 12.324,
    countryId: 'GI',
    postalCode: '34584',
    cat: 'catch',
    name: 'name',
    description: 'desc',
    opening: '0000000',
  };

  const hash = await detherWeb3.addShop(data);

  console.log(hash);
} catch (e) {
  console.log(e)
}
```

### Getters

#### Get ethereum address
```js
const address = detherWeb3.ethAddress;
```

### Get network id
```js
const networkId = detherWeb3.network;
```

### Is web3
```js
const isWeb3 = detherWeb3.isWeb3;
```

### Is connected
```js
const isConnected = detherWeb3.isConnected;
```

### Is initialized
```js
const isInit = detherWeb3.isInit;
```

## TODO

* Add more test
* Add tellers feature
* Add DTH transfer feature
