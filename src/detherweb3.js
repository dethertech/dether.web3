/* global window */
import Web3 from 'web3';
import DetherWeb3User from './detherWeb3User';
import BigNumber from './utils/BigNumber';
import { add0x, isEmptyObj, addEthersDec, isAddr, isNumDec, getMaxUint256Value } from './utils/eth';
import { TICKER, ALLOWED_EXCHANGE_PAIRS, EXCHANGE_CONTRACTS } from './constants/appConstants';
import { getRateEstimation } from './utils/exchangeTokens';

import {
  toNBytes,
  tellerFromContract,
  sellPointFromContract,
  reputFromContract,
} from './utils';

import {
  getSmsContract,
  getDthContract,
  getDetherBank,
  getDetherContract,
  getErc20Contract,
  getExchangeRateOracleContract,
} from './contracts';

/**
 * DetherWeb3
 */
class DetherWeb3 {
  /**
   * Init
   * @return {Promise} instantiate web3 and dether's contract
   */

  constructor(providerData, { manualInitContracts = false } = {}) {
    const networks = { kovan: 42, mainnet: 1 };
    this._network = providerData.network;
    this._networkId = networks[providerData.network];
    this.init();
  }

  init() {
    try {
      this._provider = window.web3 && window.web3.currentProvider;

      if (typeof this._provider === 'undefined') throw new Error('Invalid provider');

      this._web3js = new Web3(this._provider);

      if (typeof this._web3js === 'undefined') throw new Error('Invalid web3js instance');

      // this._address = await getAddress(this._web3js) || null;
      this._address = window.web3.eth.defaultAccount; // synchronous
      if (this._address) {
        this._address = this._address.toLowerCase();
      }
      // this._networkId = await this._web3js.eth.net.getId();

      this._smsContract = getSmsContract(this._web3js, this._networkId);
      this._dthContract = getDthContract(this._web3js, this._networkId);
      this._detherContract = getDetherContract(this._web3js, this._networkId);
    } catch (e) {
      throw new Error(e);
    }
  }

  sellPoints = {
    shop: 'shop',
    teller: 'teller',
  }

  getShop = (address) => this.getSellPoint(this.sellPoints.shop, address);
  getTeller = (address) => this.getSellPoint(this.sellPoints.teller, address)
  isShopZoneOpen = (zoneId) => this.isZoneOpen(zoneId, this.sellPoints.shop)
  isTellerZoneOpen = (zoneId) => this.isZoneOpen(zoneId, this.sellPoints.teller)

  /**
   * is Ready
   * @return {Boolean} returns a boolean if web3 and dether's contract are instantiated
   */
  isReady() {
    return (!!this._provider
      && !!this._web3js
      && !!this._address
      && !!this._networkId
      && !!this._smsContract
      && !!this._smsContract._address
      && !!this._dthContract
      && !!this._dthContract._address
      && !!this._detherContract
      && !!this._detherContract._address
    );
  }

  /**
   * Get instance of DetherUser linked to this Dether instance
   * @param  {object}  encryptedWallet Encrypted user wallet
   * @return {Object} DetherUser
   */
  getUser(encryptedWallet) {
    return new DetherWeb3User({
      encryptedWallet,
      dether: this,
    });
  }


  /**
   * getBalance return eth and dth balances from eth address
   * @return {object} eth & dth balances
   */
  getBalance(address) {
    return new Promise(async (res, rej) => {
      try {
        this._web3js.eth.getBalance(address)
          .then(async (result, error) => {
            if (!error) {
              return res(new BigNumber(result));
            }
            return rej(new TypeError(`Invalid shop profile: ${error.message}`));
          });
      } catch (e) {
        rej(new Error(e));
      }
    });
  }

  getWeb3() {
    return this._web3js;
  }

  getNetwork() {
    return this._network;
  }
  /**
   * is the user registered
   * @return {Boolean} returns a boolean if the user is registered
   */
  isSmsReg(address) {
    return new Promise(async (res, rej) => {
      try {
        const isReg = await this._smsContract
          .methods
          .certified(address)
          .call();
        return res(isReg);
      } catch (e) {
        return rej(e);
      }
    });
  }

  /**
   * Is zone open
   * @param  {string} zoneId Zone id is a string of capitals characters
   * @return {boolean}       returns boolean if the zone is open
   */
  isZoneOpen(zoneId, sellPoint) {
    const sellPointMethods = {
      shop: 'openedCountryShop',
      teller: 'openedCountryTeller',
    };
    const methodName = sellPointMethods[sellPoint];
    return new Promise(async (res, rej) => {
      try {
        const isopen = await this._detherContract
          .methods[methodName](`0x${toNBytes(zoneId, 2)}`)
          .call();

        return res(isopen);
      } catch (e) {
        return rej(e);
      }
    });
  }

  async getReput(address) {
    const rawReput = await this._detherContract.methods.getReput(address).call();
    const reput = reputFromContract(rawReput);
    return reput;
  }
  /**
   * Get get from smart contract
   * @return {object} sell point informations
   */
  getSellPoint(sellPoint, address) {
    const sellPointMethods = {
      shop: 'getShop',
      teller: 'getTeller',
    };
    const methodName = sellPointMethods[sellPoint];
    return new Promise(async (res, rej) => {
      try {
        const rawSellPoint = await this._detherContract.methods[methodName](address).call();
        const rawReput = await this._detherContract.methods.getReput(address).call();
        const id = Web3.utils.hexToUtf8(rawSellPoint[2]).replace(/\0/g, '');

        if (!id) return res(null);
        if (sellPoint === 'teller') {
        return res(Object.assign(
          {},
          await sellPointFromContract(rawSellPoint, sellPoint),
          reputFromContract(rawReput),
          {
            ethAddress: address,
          },
        ));
        }
        return res(Object.assign(
          {},
          await sellPointFromContract(rawSellPoint, sellPoint),
          {
            ethAddress: address,
          },
        ));
      } catch (e) {
        return rej(new TypeError(`Invalid sell point profile: ${e.message}`));
      }
    });
  }

  async getAllTellers(addrs) {
    if (addrs && !Array.isArray(addrs)) throw new TypeError('Need array of addresses as parameter');
    // const result = addrs || await this.contractInstance.getAllTellers();
    const result = addrs;
    if (!result || !result.length) return [];
    const tellerAddrList = result;
    // const tellers = await Promise.all(result.map(this.getTeller.bind(this)));

    const tellers = await Promise.all(tellerAddrList.map(this.getTeller.bind(this)));
    return tellers;
    // return DetherJS._filterTellerList(tellers);
  }

  async getAllShops(addrs) {
    if (addrs && !Array.isArray(addrs)) throw new TypeError('Need array of addresses as parameter');
    // const result = addrs || await this.contractInstance.getAllShops();
    const result = addrs;
    if (!result || !result.length) return [];
    const shopAddrList = result;
    const shops = await Promise.all(shopAddrList.map(this.getShop.bind(this)));
    return shops;
    // return DetherJS._filterTellerList(shops);
  }

  async getTellerBalance(address) {
    if (!isAddr(address)) throw new TypeError('Invalid ETH address');
    const fullAddress = add0x(address);
    const result = await this._detherContract.methods.getTellerBalance(fullAddress).call();
    return Number(Web3.utils.fromWei(result));
  }


// get all balance
/**
 * get all balance of the current account
 * @param {array} ticker of ERC 20/223
 * @param {string} address of account to check
 */
async getAllBalance(address, ticker) {
  if (!isAddr(address)) throw new TypeError('Invalid ETH address');

  const formatBalance = (weiBalance) => addEthersDec(Web3.utils.fromWei(weiBalance));
  const erc20Contract = (token) => getErc20Contract(this._web3js, TICKER[this._network][token]);
  const tokens = ticker.filter(x => x !== 'ETH' && x !== 'DTH');

  const tokenBalancePromises = tokens.map(token => (erc20Contract(token)).methods.balanceOf(address).call());
  const dthBalancePromise = this._dthContract.methods.balanceOf(address).call();
  const ethBalancePromise = this._web3js.eth.getBalance(address);

  tokenBalancePromises.push(dthBalancePromise, ethBalancePromise);
  const weiBalances = await Promise.all(tokenBalancePromises.map(p => p.catch(e => e))); // continue if error

  const balances = weiBalances.map(formatBalance);
  tokens.push('DTH', 'ETH');

  // {token[0]: balance[0], token[1]: balance[1]...}
  const result = balances.reduce((acc, bal, index) => {
    if (isNumDec(bal)) { // if bal is not error  // https://github.com/ethereum/web3.js/issues/1089
    acc[tokens[index].toString()] = bal;
    } else {
      console.log(`error result from balanceOf() token: ${tokens[index]}. Not including in results object`);
    }
    return acc;
  }, {});
  return result;
}

/**
 * getReput
 * @param address
 * @return {promise} reput
 */
async getTellerReputation(addr) {
  const rawTeller = await this._detherContract.methods.getTeller(addr).call();
  const tellerFormatted = isEmptyObj(rawTeller) ? { messenger: '' } : await tellerFromContract(rawTeller);
  return Object.assign(
    {},
    await this.getReput(addr),
    {
      messenger: tellerFormatted.messenger,
    },
  );
}

  /**
   * get the price of the licence for the shop
   * @return {string} country
   */
  async getLicenceShop(country) {
    // verif
    const price = await this._detherContract.methods.licenceShop(Web3.utils.toHex(country)).call();
    return addEthersDec(Web3.utils.fromWei(price.toString()));
  }

  /**
   * get the price of the licence for teller
   * @return {string} country
   */
  async getLicenceTeller(country) {
    // verif
    const price = await this._detherContract.methods.licenceTeller(Web3.utils.toHex(country)).call();
    return addEthersDec(Web3.utils.fromWei(price.toString()));
  }

  /**
   * is zone open?
   * @param {string} countryCode in MAJ
   * @return {Bool}
   */
  async isZoneShopOpen(country) {
    const res = await this._detherContract.methods.openedCountryShop(Web3.utils.toHex(country)).call();
    return res;
  }

  /**
   * is zone open?
   * @param {string} countryCode in MAJ
   * @return {Bool}
   */
  async isZoneTellerOpen(country) {
    const res = await this._detherContract.methods.openedCountryTeller(Web3.utils.toHex(country)).call();
    return res;
  }

  /**
   * Get zone shop
   * @param {object} opts
   * @param {string} opts.countryId code
   * @param {string} opts.postalCode code
   */
  async getZoneShop(opts) {
    const res = await this._detherContract.methods.getZoneShop(
      `0x${toNBytes(opts.countryId, 2)}`,
      `0x${toNBytes(opts.postalCode, 16)}`,
    ).call();
    return res;
  }

  /**
   * Get zone teller
   * @param {object} opts
   * @param {string} opts.countryId code
   * @param {string} opts.postalCode code
   */
  async getZoneTeller(opts) {
    const res = await this._detherContract.methods.getZoneTeller(
      `0x${toNBytes(opts.countryId, 2)}`,
      `0x${toNBytes(opts.postalCode, 16)}`,
    ).call();
    return res;
  }

    /**
   * Get Transaction status
   * @param  {string} hash transaction hash
   * @return {object}      transaction status
   */

  async getTransactionStatus(hash) {
    return new Promise(async (res, rej) => {
      try {
        if (hash === 'UNKNOWN') {
          return res({ status: 'unknow' });
        }
        const transaction = await this._web3js.eth.getTransactionReceipt(hash);

        if (!transaction) res({ status: 'pending' });
        else if (Web3.utils.toHex(transaction.status) === '0x01') res({ status: 'success' });
        return res({ status: 'error' });
      } catch (e) {
        return rej(new Error(e));
      }
    });
  }
    /**
   * Verif if user is sms whitelisted
   * @param  {string} address  Teller ethereum address
   * @return {Promise<Bool>} Escrow balance of teller at address
   */
  async isCertified(address) {
    if (!isAddr(address)) throw new TypeError('Invalid ETH address');
    const fullAddress = add0x(address);
    const res = await this._smsContract.methods.certified(fullAddress).call();
    return res;
  }

  async getEstimation({ sellToken, buyToken, sellAmount }) {
    if (!['kovan', 'mainnet', 'rinkeby'].includes(this._network)) {
      throw new TypeError('only works on kovan, rinkeby and mainnet');
    }
    // check if pair is one of the accepted trading pairs
    const acceptedPair = ALLOWED_EXCHANGE_PAIRS.some((pairStr) => {
      const [sell, buy] = pairStr.split('-');
      return (sell === sellToken && buy === buyToken)
        || (sell === buyToken && buy === sellToken);
    });
    if (!acceptedPair) {
      throw new TypeError('Trading pair not implemented');
    }
    if (!sellAmount || typeof sellAmount !== 'number' || sellAmount < 0) {
      throw new TypeError('sellAmount should be a positive number');
    }
    const buyAmount = await getRateEstimation({
      sellToken,
      buyToken,
      sellAmount,
    });

    return buyAmount;
  }

  async availableSellAmount(address, unit = 'eth') { // eslint-disable-line
    if (!['eth', 'usd', 'wei'].includes(unit)) {
      throw new TypeError('invalid unit (2nd arg) specified, allowed values: eth, wei, usd');
    }
    const DetherCoreContract = this._detherContract;
    const DetherBank = getDetherBank(this._web3js, this._networkId);
    const DetherExchangeRateOracle = getExchangeRateOracleContract(this._web3js, this._networkId);

    if (!DetherCoreContract.methods.isTeller(address).call()) {
      throw new TypeError('address is not a Teller');
    }

    const countryId = (await DetherCoreContract.methods.getTeller(address).call())[2];
    const tier = (await DetherCoreContract.methods.isTier2(address).call()) ? 2
                 : (await DetherCoreContract.methods.isTier1(address).call()) ? 1
                 : 0;

    const weiSoldToday = await DetherBank.methods.getWeiSoldToday(address).call();
    const usdDailyLimit = await DetherCoreContract.methods.getSellDailyLimit(tier, Web3.utils.toHex(countryId)).call();
    const weiPriceOneUsd = await DetherExchangeRateOracle.methods.getWeiPriceOneUsd().call();
    const weiDailyLimit = parseInt(usdDailyLimit) * parseInt(weiPriceOneUsd);
    const weiLeftToSell = parseInt(weiDailyLimit) - parseInt(weiSoldToday);

    switch (unit) {
      case 'usd':
        return (weiLeftToSell / weiPriceOneUsd).toString();
      case 'eth':
        return Web3.utils.fromWei(weiLeftToSell);
      case 'wei':
        return weiLeftToSell.toString();
      default:
        break;
    }
  }

  async hasAirswapAllowance({ ethAddress, ticker }) {
    const tokenAddress = TICKER[this._network][ticker];
    const erc20Contract = getErc20Contract(this._web3js, tokenAddress);
    const airswapAddress = EXCHANGE_CONTRACTS[this._network].airswapExchange;
    const allowance = await erc20Contract.methods.allowance(ethAddress, airswapAddress).call();
    return allowance > (getMaxUint256Value() / 2);
  }

  // Getters

  /**
   * Network Id
   * @return {string} return the network Id
   */
  get network() {
    return this._networkId;
  }

  /**
   * ethereum address
   * @return {string} return the user ethereum address
   */
  get ethAddress() {
    return this._address;
  }

  /**
   * Is Web3 on browser
   * @return {Boolean} returns a boolean if metamask is installed on user browser
   */
  get isWeb3() {
    return this._provider !== null;
  }

  /**
   * Is connected
   * @return {Boolean} returns a boolean if the user is connected to metamask
   */
  get isConnected() {
    return this._address !== null;
  }
}

export default DetherWeb3;
