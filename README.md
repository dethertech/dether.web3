# dether.web3

## Usage

### Instanciate
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = await new DetherWeb3();
} catch (e) {
  throw new Error(e);
}
```

### Get Balance
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

### Get ethereum address
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = await new DetherWeb3();

  const address = await detherWeb3.ethAddress;

  console.log(address);
} catch (e) {
  throw new Error(e);
}
```

### Get network id
```js
import DetherWeb3 from 'detherweb3';

try {
  const detherWeb3 = await new DetherWeb3();

  const networkId = await detherWeb3.network;

  console.log(networkId);
} catch (e) {
  throw new Error(e);
}
```
