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
