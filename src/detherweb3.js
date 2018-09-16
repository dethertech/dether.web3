/* global window */
import DthContract from 'dethercontract/contracts/DetherToken.json';
import DetherCore from 'dethercontract/contracts/DetherCore.json';
import web3Abi from 'web3-eth-abi';
import Web3 from 'web3';
import DetherWeb3User from './detherWeb3User';
import BigNumber from './utils/BigNumber';
import * as ExternalContracts from './utils/externalContracts';
import { getAddress } from './wallet';
import { add0x, isEmptyObj, addEthersDec, isAddr } from './utils/eth';
import { TICKER } from './constants/appConstants'

import {
  toNBytes,
  getOverLoadTransferAbi,
  tellerFromContract,
  sellPointFromContract,
  sellPointToContract,
  sendTransaction,
  validateSellPoint,
  reputFromContract,
} from './utils';

import {
  getSmsContract,
  getDthContract,
  getDetherContract,
  getErc20Contract,
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
    this._networkId = providerData.network;
    // if (providerData.address) {
    //   this._address = providerData.address;
    // }
    // else {
    //   console.log('WARNING: no address provided for non-asyn init')
    // }

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
      this._address = this._address.toLowerCase();

      // this._networkId = await this._web3js.eth.net.getId();

      this._smsContract = getSmsContract(this._web3js, this._networkId);
      this._dthContract = getDthContract(this._web3js, this._networkId);
      this._detherContract = getDetherContract(this._web3js, this._networkId);

      console.log('detherweb3 init complete: ', this._address);
    } catch (e) {
      throw new Error(e);
    }
  }

  sellPoints = {
    shop: 'shop',
    teller: 'teller',
  }

  addShop = (shop) => this.addSellPoint(shop, this.sellPoints.shop)
  getShop = (address = this._address) => this.getSellPoint(this.sellPoints.shop, address);
  deleteShop = () => this.deleteSellPoint(this.sellPoints.shop)
  getShopZonePrice = (zoneId) => this.getZonePrice(zoneId, this.sellPoints.shop);
  isShopZoneOpen = (zoneId) => this.isZoneOpen(zoneId, this.sellPoints.shop)

  addTeller = (teller) => this.addSellPoint(teller, this.sellPoints.teller)
  getTeller = (address = this._address) => this.getSellPoint(this.sellPoints.teller, address)
  deleteTeller = () => this.deleteSellPoint(this.sellPoints.teller)
  getTellerZonePrice = (zoneId) => this.getZonePrice(zoneId, this.sellPoints.teller);
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

  getInfo = () => this.getTeller();

  async getAddress() {
    return this._address;
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
  getBalance() {
    return new Promise(async (res, rej) => {
      try {
        this._web3js.eth.getBalance(this._address)
          .then(async (result, error) => {
            if (!error) {
              return res(
                // {
                // eth: parseFloat(this._web3js.utils.fromWei(result, 'ether')),
                // new BigNumber(parseFloat(this._web3js.utils.fromWei(result, 'ether'))),
                new BigNumber(result),
                // new BigNumber(this._web3js.utils.fromWei(result, 'ether')),
                // TODO: error test
                // dth: parseFloat(this._web3js.utils.fromWei(
                //   await this._getDthContract
                //   .methods.balanceOf(this._address).call(),
                //   'ether',
                // )),
              // }
              );
            }
            return rej(new TypeError(`Invalid shop profile: ${error.message}`));
          });
      } catch (e) {
        rej(new Error(e));
      }
    });
  }


  /**
   * is the user registered
   * @return {Boolean} returns a boolean if the user is registered
   */
  isSmsReg() {
    return new Promise(async (res, rej) => {
      try {
        const isReg = await this._smsContract
          .methods
          .certified(this._address)
          .call();
        return res(isReg);
      } catch (e) {
        return rej(e);
      }
    });
  }

  /**
   * Get zone price
   * @param  {string} zoneId Zone id is a string of capitals characters
   * @return {number}        Licence price
   */
  getZonePrice(zoneId, sellPoint) {
    const sellPointMethods = {
      shop: 'licenceShop',
      teller: 'licenceTeller',
    };
    const methodName = sellPointMethods[sellPoint];
    return new Promise(async (res, rej) => {
      try {
        const price = await this._detherContract
          .methods[methodName](`0x${toNBytes(zoneId, 2)}`)
          .call();

        return res(this._web3js.utils.fromWei(price));
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
  async getReput(address = this._address) {
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
        const id = this._web3js.utils.hexToUtf8(rawSellPoint[2]).replace(/\0/g, '');

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
    const result = addrs || await this.contractInstance.getAllShops();
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
    return Number(this._web3js.utils.fromWei(result));
  }


// get all balance
/**
 * get all balance of the current account
 * @param {array} ticker of ERC 20/223
 * @param {string} address of account to check
 */
async getAllBalance(address, ticker) {
  if (!isAddr(address)) throw new TypeError('Invalid ETH address');

  // ETH is handled at end of this function
  ticker = ticker.filter(x => x !== 'ETH');
  const result = {};
  for (const tick of ticker) { // eslint-disable-line no-restricted-syntax
    let tokenAddress;
    // try {
      tokenAddress = TICKER['kovan'][tick] //ExternalContracts.getTokenContractAddr(this._web3js, tick);
    // } catch (err) {
    //   throw new TypeError(`found no address for token: ${tick}`);
    // }
    let erc20;
    if (tick === 'DTH') {
      erc20 = await getDthContract(this._web3js, '42');
    } else {
      erc20 = await getErc20Contract(this._web3js, tokenAddress);
      //  erc20 = this._web3js.eth.Contract('',tokenAddress)
    }
    const tokenBalance = await erc20.methods.balanceOf(address).call()
    result[tick] = addEthersDec(this._web3js.utils.fromWei(tokenBalance)); // eslint-disable-line no-await-in-loop
  }
  const ethBalance = await this._web3js.eth.getBalance(this._address)
  result.ETH = addEthersDec(this._web3js.utils.fromWei(ethBalance));

  return result;
}

/**
 * getReput
 * @param address
 * @return {promise} reput
 */
async getTellerReputation(addr) {
  const rawTeller = await this._detherContract.methods.getTeller(addr).call();
  const tellerFormatted = isEmptyObj(rawTeller) ? {messenger: ''} : await tellerFromContract(rawTeller);
  return Object.assign(
    {},
    await this.getReput(addr),
    {
      messenger: tellerFormatted.messenger,
    },
  );
}

  /**
   * Delete shop from the smart contract
   * @return {Object} transaction
   */
  deleteSellPoint(sellPoint) {
    const sellPointMethods = {
      shop: 'deleteShop',
      teller: 'deleteTeller',
    };
    const methodName = sellPointMethods[sellPoint];
    return new Promise(async (res, rej) => {
      try {
        const tsx = await this._detherContract
          .methods[methodName]()
          .send({
            from: this._address,
            gas: 150000,
          });

        return res(tsx);
      } catch (e) {
        return rej(new TypeError(`Invalid transaction: ${e.message}`));
      }
    });
  }

  /**
   * Add shop on the smart contract
   * @param {object} shop Shop information
   * @return {Object} transaction
   */
  addSellPoint(sellPointInst, sellPoint) {
    return new Promise(async (res, rej) => {
      try {
        await validateSellPoint(sellPointInst, sellPoint);
        const licencePrice = await this.getZonePrice(sellPointInst.countryId, sellPoint);

        if (!licencePrice) return rej(new Error('Invalid country ID'));

        const overloadedTransferAbi = getOverLoadTransferAbi();
        const hexSellPoint = sellPointToContract(sellPointInst, sellPoint);
        const transferMethodTransactionData = web3Abi.encodeFunctionCall(
          overloadedTransferAbi,
          [
            DetherCore.networks[this._networkId].address,
            this._web3js.utils.toWei(licencePrice),
            hexSellPoint,
          ],
        );
        const rawTx = {
            from: this._address,
            to: DthContract.networks[this._networkId].address,
            data: transferMethodTransactionData,
            value: 0,
            gas: 400000,
          };
        const txReceipt = await sendTransaction(this._web3js, rawTx);
        return res(txReceipt);
      } catch (e) {
        return rej(new TypeError(`Invalid add ${sellPoint} transaction: ${e.message}`));
      }
    });
  }

  /**
   * get the price of the licence for the shop
   * @return {string} country
   */
  async getLicenceShop(country) {
    // verif
    const price = await this._detherContract.methods.licenceShop(this._web3js.utils.toHex(country)).call();
    return addEthersDec(this._web3js.utils.fromWei(price.toString()));
  }

  /**
   * get the price of the licence for teller
   * @return {string} country
   */
  async getLicenceTeller(country) {
    // verif
    const price = await this._detherContract.methods.licenceTeller(this._web3js.utils.toHex(country)).call();
    return addEthersDec(this._web3js.utils.fromWei(price.toString()));
  }

  /**
   * is zone open?
   * @param {string} countryCode in MAJ
   * @return {Bool}
   */
  async isZoneShopOpen(country) {
    const res = await this._detherContract.methods.openedCountryShop(this._web3js.utils.toHex(country)).call();
    return res;
  }

  /**
   * is zone open?
   * @param {string} countryCode in MAJ
   * @return {Bool}
   */
  async isZoneTellerOpen(country) {
    const res = await this._detherContract.methods.openedCountryTeller(this._web3js.utils.toHex(country)).call();
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
