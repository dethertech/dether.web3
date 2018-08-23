/* global window */
import DthContract from 'dethercontract/contracts/DetherToken.json';
import DetherCore from 'dethercontract/contracts/DetherCore.json';
import web3Abi from 'web3-eth-abi';
import Web3 from 'web3';

import { getAddress } from './wallet';
import { validateShop } from './constants';

import {
  toNBytes,
  getOverLoadTransferAbi,
  sellPointFromContract,
  sellPointToContract,
  sendTransaction,
} from './utils';

import {
  getSmsContract,
  getDthContract,
  getDetherContract,
} from './contracts';

/**
 * DetherWeb3
 */
class DetherWeb3 {
  /**
   * Init
   * @return {Promise} instantiate web3 and dether's contract
   */
  async init() {
    try {
      this._provider = window.web3 && window.web3.currentProvider;

      if (typeof this._provider === 'undefined') throw new Error('Invalid provider');

      this._web3js = new Web3(this._provider);

      if (typeof this._web3js === 'undefined') throw new Error('Invalid web3js instance');

      this._address = await getAddress(this._web3js) || null;
      this._networkId = await this._web3js.eth.net.getId();

      this._smsContract = await getSmsContract(this._web3js, this._networkId);
      this._dthContract = await getDthContract(this._web3js, this._networkId);
      this._detherContract = await getDetherContract(this._web3js, this._networkId);
    } catch (e) {
      throw new Error(e);
    }
  }

  sellPoints = {
    shop: 'shop',
    teller: 'teller',
  }

  addShop = (shop) => this.addSellPoint(shop, this.sellPoints.shop)
  getShop = () => this.getSellPoint(this.sellPoints.shop);
  deleteShop = () => this.deleteSellPoint(this.sellPoints.shop)
  getShopZonePrice = (zoneId) => this.getZonePrice(zoneId, this.sellPoints.shop);
  isShopZoneOpen = (zoneId) => this.isZoneOpen(zoneId, this.sellPoints.shop)

  addTeller = (teller) => this.addSellPoint(teller, this.sellPoints.teller)
  getTeller = () => this.getSellPoint(this.sellPoints.teller)
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
              return res({
                eth: parseFloat(this._web3js.utils.fromWei(result, 'ether')),
                // TODO: error test
                // dth: parseFloat(this._web3js.utils.fromWei(
                //   await this._getDthContract
                //   .methods.balanceOf(this._address).call(),
                //   'ether',
                // )),
              });
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

  /**
   * Get get from smart contract
   * @return {object} sell point informations
   */
  getSellPoint(sellPoint) {
    const sellPointMethods = {
      shop: 'getShop',
      teller: 'getTeller',
    };
    const methodName = sellPointMethods[sellPoint];
    return new Promise(async (res, rej) => {
      try {
        const rawSellPoint = await this._detherContract
          .methods[methodName](this._address).call();

        const id = this._web3js.utils.hexToUtf8(rawSellPoint[2]).replace(/\0/g, '');

        if (!id) return res(null);

        return res(Object.assign(
          {},
          await sellPointFromContract(rawSellPoint, this._web3js),
          {
            ethAddress: this._address,
          },
        ));
      } catch (e) {
        return rej(new TypeError(`Invalid sell point profile: ${e.message}`));
      }
    });
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
        // await validateSellPoint(sellPointInst);// TODO
        const licencePrice = await this.getZonePrice(sellPointInst.countryId, sellPoint);

        if (!licencePrice) return rej(new Error('Invalid country ID'));

        const overloadedTransferAbi = getOverLoadTransferAbi();
        const hexSellPoint = sellPointToContract(sellPointInst);
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
        return rej(new TypeError(`Invalid shop transaction: ${e.message}`));
      }
    });
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

export default new DetherWeb3();
