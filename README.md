# dether.web3

## Usage

#### Instanciate
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = await new DetherWeb3();
} catch (e) {
  throw new Error(e);
}
```

### Methods

#### Get Balance
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = await new DetherWeb3();

  const balances = await detherWeb3.getBalance();

  console.log(balances);
} catch (e) {
  throw new Error(e);
}
```

#### Is sms registered
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = await new DetherWeb3();

  const isSmsReg = await detherWeb3.isSmsReg();

  console.log(isSmsReg);
} catch (e) {
  throw new Error(e);
}
```

#### Get zone price
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = await new DetherWeb3();

  const zoneId = 'GI'

  const zonePrice = await detherWeb3.getZonePrice(zoneId);

  console.log(zonePrice);
} catch (e) {
  throw new Error(e);
}
```

#### Get transaction status
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = await new DetherWeb3();

  const hash = '' // ethereum transaction hash

  const transactionStatus = await detherWeb3.getTransactionStatus(hash);

  console.log(transactionStatus);
} catch (e) {
  throw new Error(e);
}
```

#### Get transaction status
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = await new DetherWeb3();

  const zoneId = 'GI'

  const open = await detherWeb3.isZoneOpen(zoneId);

  console.log(open);
} catch (e) {
  throw new Error(e);
}
```

### Getters

#### Get ethereum address
```js
const address = await detherWeb3.ethAddress;
```

### Get network id
```js
const networkId = await detherWeb3.network;
```

### Is web3
```js
const isWeb3 = await detherWeb3.isWeb3;
```

### Is connected
```js
const isConnected = await detherWeb3.isConnected;
```
