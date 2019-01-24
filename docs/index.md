# dether.web3

[API documentation](https://dethertech.github.io/dether.web3)


# DetherWeb3

DetherWeb3 is Javascript SDK to easily interact with [DetherContracts](https://github.com/dethertech/detherContracts) through an injected web3

It provides wrappers for all the public methods of the contract and formats values in and out.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Instanciate](##Instanciate_dether)
- [Get teller](#Get_Teller)
- [Get all teller](#Get_all_tellers)
- [Get teller in zone](#Get_Tellers_In_Zone)
- [Get Teller Balance](#Get_Teller_Balance)
- [Instanciate User](#Instanciate_User)
- [Add Sell Point](#Add_Sell_Point)
- [Add_Eth](#Add_Eth)
- [Delete Sell Point](#Delete_Sell_Point)
- [Send To Buyer](#Send_To_Buyer)
- [certify new user](#certify_new_user)
- [certify new user API CALL](#certify_new_user_API_CALL)

## Install

Use NPM to get the package

```
npm install --save detherweb3
or
yarn add detherweb3
```

## Usage

In detherJS you can instanciate 2 object:

1. dether object:
   For reading easily all the data present in the contract
2. dether user object: for changing state of the dether contracts

---

## Instanciate_dether

```javascript
import DetherWeb3 from "detherweb3";

const detherweb3 = new DetherWeb3({
  network: "mainnet" // can be kovan
});
```

#### Inputs

- `network`: Network
- `rpcURL`: Provider URL (optionnal)

#### Return value

New instance of DetherWeb3

---

### Get_Teller_Or_Shop

```javascript
const addr = '0xab5801a7d398351b8be11c439e05c5b3259aec9b';

try {
  const teller = await detherweb3.getSellPoint('getTeller',addr)
} catch () {
  console.log(e);
}
```

#### Inputs

- `methodName`: either 'getTeller' or 'getShop'
- `addr`: Ethereum address

#### Return value

For a teller

```javascript
{
  lat: 1, // Latitude
  lng: 2, // Longitude
  countryId: 'FR', // Country ID
  postalCode: 75019,
  escrowBalance: 0.01, // Escrow balance
  rates: 20, // Fees
  volumeTrade: 0, // Volume of Trade
  nbTrade: 0, // Number of trade
  currencyId: 1, // Currency id (1 === 'USD')
  avatarId: 1, // Avatar ID
  messengerAddr1: 'bobychou', // Telegram username
  ethAddress: '0x085b30734fD4f48369D53225b410d7D04b2d9011', // Ethereum address
}
```

---

### Get_Tellers_In_Zone

You can specify a zone to get all the tellers presents in this zone

```Javascript
const opts = {
    countryId = 'CZ', // DE for Czech republic
    postalCode = '170 00'
};

try {
  const tellersInZone = await detherweb3.getZoneTeller(opts);
} catch (e) {
  console.log(e);
}
```

#### Inputs

`getZoneTeller` can receive an array of zones ID

- `opts`: params obj
- `opts.countryId`: ISO2 country code
- `opts.postalCode`: country postal Code

#### Return value

Array of tellers

---

## Instanciate_User

```

## TO DO

Add instanciate user example
```
