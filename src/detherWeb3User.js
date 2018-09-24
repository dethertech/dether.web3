/* eslint-disable max-len, no-multi-spaces, object-curly-newline, import/first */

import Web3 from 'web3'
import web3Abi from 'web3-eth-abi';
// import Ethers from 'ethers';
import { TICKER, EXCHANGE_CONTRACTS, ALLOWED_EXCHANGE_PAIRS } from './constants/appConstants';
import { getDthContract, getErc20Contract, getSmsContract } from './contracts';
import { add0x, getMaxUint256Value } from './utils/eth';
import DthContract from 'dethercontract/contracts/DetherToken.json';
import DetherCore from 'dethercontract/contracts/DetherCore.json';
// import { validateSellPoint, validateSendCoin, validatePassword } from './utils/validation';
// import Contracts from './utils/contracts';
import { updateToContract } from './utils/formatters';
import { exchangeTokens } from './utils/exchangeTokens';
import * as ExternalContracts from './utils/externalContracts';

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


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @example
 * import DetherJS from 'dether.js';
 *
 * const wallet = DetherJS.Ethers.Wallet.createRandom();
 * const encryptedWallet = await wallet.encrypt('password');
 *
 * const User = dether.getUser(encryptedWallet);
 */
class DetherWeb3User {
  /**
   * Creates an instance of DetherUser.
   *
   * You may not instanciate from here, prefer from DetherJS.getUser method
   *
   * @param {object} opts
   * @param {string} opts.encryptedWallet user wallet
   */
  constructor(opts) {
    if (!opts.dether || !opts.encryptedWallet) {
      throw new Error('Need dether instance and wallet');
    }
    /** @ignore */
    this.dether = opts.dether;
    this.web3js = opts.dether.getWeb3();
    this.networkId = opts.dether.getNetworkId();
    /** @ignore */
    this.encryptedWallet = opts.encryptedWallet;
    const parsedWallet = JSON.parse(opts.encryptedWallet);
    this.address = add0x(parsedWallet.address);
  }

  /**
   * Returns decrypted wallet
   *
   * @param {string} password             user password
   * @return {Wallet}     User wallet
   * @private
   * @ignore
   */
  async _getWallet(password) {
    return { address: this.address };
  }

  /**
   * Get user ethereum address
   * @return {Promise<string>} user ethereum address
   */
  async getAddress() {
    return this.address;
  }

  /**
   * Get user teller info
   * @return {Promise<object>}
   */
  async getInfo() {
    return this.dether.getTeller(this.address);
  }

  /**
   * Get user balance in escrow
   * @return {Promise<string>}
   */
  async getBalance() {
    return this.dether.getBalance(this.address);
  }


  // gas used = 223319
  // gas price average (mainnet) = 25000000000 wei
  // 250000 * 25000000000 = 0.006250000000000000 ETH
  // need 0.006250000000000000 ETH to process this function
  /**
   * Register a sell point
   * @param {object} sellPoint
   * @param {string} sellPoint.lat        latitude min -90 max +90 , 5 decimel
   * @param {string} sellPoint.lng        longitude min -180 max +180 , 5 decimal
   * @param {string} sellPoint.countryId  geographic zone ISO , 2 charactere
   * @param {string} sellPoint.postalCode   postal code 0-16 char
   * @param {string} sellPoint.avatarId      avatar id (0-99)
   * @param {string} sellPoint.currencyId  currency id (0-99) 1:USD 2:EUR 3:YEN
   * @param {string} sellPoint.messenger   16 char max , just the http://t.me/(xxxxxxxxxxxxxxxx)
   * @param {string} sellPoint.rates     rates you want to take as seller of crypto
   * @param {string} sellPoint.buyRates   rates you want to take as a buyer of crypto
   * @param {bool}   sellPoint.buyer      if user want to be a buyer as well
   * @param {string} sellPoint.amount  Amount to put in escrow as a sell point
   * @param {Number} sellPoint.gasPrice   (optional) gasprice you want to use in the tsx in WEI ex: 20000000000 for 20 GWEI
   * @param {string} password             user password
   * @return {Promise<object>} Hash tsx
   */
  // async addTeller(sellPoint, password) {

  sellPoints = {
    shop: 'shop',
    teller: 'teller',
  }

  addShop = (shop, password) => this.addSellPoint(shop, this.sellPoints.shop)
  deleteShop = (opts, password) => this.deleteSellPoint(this.sellPoints.shop, opts)
  addTeller = (teller, password) => this.addSellPoint(teller, this.sellPoints.teller)
  deleteTeller = (opts, password) => this.deleteSellPoint(this.sellPoints.teller, opts)
  getShopZonePrice = (zoneId) => this.getZonePrice(zoneId, this.sellPoints.shop);
  getTellerZonePrice = (zoneId) => this.getZonePrice(zoneId, this.sellPoints.teller);

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
            DetherCore.networks[this.networkId].address,
            this.web3js.utils.toWei(licencePrice),
            hexSellPoint,
          ],
        );
        const rawTx = {
            from: this.address,
            to: DthContract.networks[this.networkId].address,
            data: transferMethodTransactionData,
            value: 0,
            gas: 400000,
          };
        const txReceipt = await sendTransaction(this.web3js, rawTx);
        return res(txReceipt);
      } catch (e) {
        return rej(new TypeError(`Invalid add ${sellPoint} transaction: ${e.message}`));
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
        const price = await this.dether._detherContract
          .methods[methodName](`0x${toNBytes(zoneId, 2)}`)
          .call();

        return res(this.web3js.utils.fromWei(price));
      } catch (e) {
        return rej(e);
      }
    });
  }

  /**
   * Add Eth into teller sellpoint
   * @param {object} opts
   * @param {number} opts.amount
   * @param {number} opts.gasPrice (optional) gasprice you want to use in the tsx in WEI ex: 20000000000 for 20 GWEI
   * @param {string} password
   * @return {string} Hash tsx
   */
  async addEth(opts, password) {
    const { amount } = opts;
    const wallet = await this._getWallet(password);
    const detherCoreContract = this.dether._detherContract;
    const weiAmount = this.dether._web3js.utils.toWei(amount);
    const transactionAddEth = await detherCoreContract.methods.addFunds().send({
       from: this.address,
        value: weiAmount,
        gasPrice: opts.gasPrice ? opts.gasPrice : '20000000000',
        gasLimit: '110000', });
    return transactionAddEth.hash;
  }

  /**
   * Update Teller
   * @param {object} opts
   * @param {int} opts.currencyId
   * @param {string} opts.messenger
   * @param {int} opts.avatarId
   * @param {int} opts.rates
   * @param {float} opts.amount
   * @param {number} opts.gasPrice (optional) gasprice you want to use in the tsx in WEI ex: 20000000000 for 20 GWEI
   */
   async updateTeller(opts, password) {
    const weiAmount = this.dether._web3js.utils.toWei(opts.amount.toString());
    const detherCoreContract = this.dether._detherContract;
     const formatedUpdate = updateToContract(opts);
     const transaction = await detherCoreContract.methods.updateTeller(...Object.values(formatedUpdate)).send({ from: this.address, value: weiAmount, gas: 1000000 });
     return transaction.hash;
   }

  /**
   * Send eth from teller escrow
   * @param  {object}  opts
   * @param  {string}  opts.receiver Receiver ethereum address
   * @param  {number}  opts.amount   Amount to send
   * @param  {number} opts.gasPrice (optional) gasprice you want to use in the tsx in WEI ex: 20000000000 for 20 GWEI
   * @param  {string}  password      Wallet password
   * @return {Promise<object>} hash tsx
   */
  async sendToBuyer(opts, password) {
    const { amount, receiver } = opts;

    const weiAmount = Web3.eth.utils.toWei(amount.toString());
    const detherCoreContract = this.dether._detherContract;
    const transaction = await detherCoreContract.methods
      .sellEth(
        add0x(receiver),
        weiAmount,
      ).send({ address: this.address, gas: 1000000 });
    return transaction.hash;
  }

  /**
   * Delete sell point, this function withdraw automatically balance escrow to owner and delete all info
   * @param  {string} password  Wallet password
   * @param {number} opts.gasPrice  gasprice you want to use in the tsx in WEI ex: 20000000000 for 20 GWEI
   * @return {Promise<object>}  Transaction
   */

    /**
   * Delete shop from the smart contract
   * @return {Object} transaction
   */
  deleteSellPoint(sellPoint, opts) {
    const sellPointMethods = {
      shop: 'deleteShop',
      teller: 'deleteTeller',
    };
    const methodName = sellPointMethods[sellPoint];
    return new Promise(async (res, rej) => {
      try {
        const tsx = await this.dether._detherContract
          .methods[methodName]()
          .send({
            from: this.address,
            gas: 200000,
          });

        return res(tsx);
      } catch (e) {
        return rej(new TypeError(`Invalid transaction: ${e.message}`));
      }
    });
  }

  /**
   * Delete sell point, this function withdraw automatically balance escrow to owner and delete all info
   * msg.sender should be dether.TELLERMODERATOR
   * @param {Object} opts
   * @param {string} opts.toDelete User addr
   * @param {Number} opts.nonce nonceToAdd
   * @param {number} opts.gasPrice (optional) gasprice you want to use in the tsx in WEI ex: 20000000000 for 20 GWEI
   * @param  {string} password  Wallet password
   * @return {Promise<object>}  Transaction
   */
  async deleteSellPointModerator(opts, password) {
    const detherCoreContract = this.dether._detherContract;
    const transaction = await detherCoreContract.methods.deleteTellerMods(opts.toDelete).send({ from: this.address, gas: 1000000 });
    // // const minedTsx = await this.dether.provider.waitForTransaction(transaction.hash);
    return transaction.hash;
  }

  // gas used = 26497
  // gas price average (mainnet) = 25000000000 wei
  // 50000 * 25000000000 = 0.001250000000000000 ETH
  // need 0.001250000000000000 ETH to process this function
  /**
   * Turn Offline SellPoint withdraw automatically balance escrow to owner but keep info
   * @param  {string} password  Wallet password
   * @param {number} opts.gasPrice (optional) gasprice you want to use in the tsx in WEI ex: 20000000000 for 20 GWEI
   * @return {Promise<object>}  Transaction
   */
  async turnOfflineSellPoint(opts ,password) {
    const detherCoreContract = await this.dether._detherContract;
    const transaction = await detherCoreContract.methods.switchTellerOffline().send({ from: this.address, gas: 1000000 });
    // const minedTsx = await this.dether.provider.waitForTransaction(transaction.hash);
    // return minedTsx;
    return transaction.hash;
  }

  /**
   * Send ETH OR ERC21 TOKEN
   * @param  {object}  opts
   * @param  {string}  opts.token Ticker of the token
   * @param  {string}  opts.amount value to send
   * @param  {string}  opts.receiverAddress address to send
   * @param  {string}  opts.nonce nonce for the transaction
   * @param  {Number}  opts.gasPrice (optional) gasprice you want to use in the tsx in WEI ex: 20000000000 for 20 GWEI
   * @param  {string} password  Wallet password
   * @return {Promise<object>}  Transaction
   */
   async sendToken(opts, password) {
      if (opts.token === 'ETH') {
        const weiAmount = this.dether._web3js.utils.toWei(opts.amount);
        const txReceipt = await this.dether._web3js.eth.sendTransaction({
          from: this.address,
          to: opts.receiverAddress,
          value: weiAmount,
          gasPrice: opts.gasPrice ? opts.gasPrice : '12000000000',
          gas: 100000,
        });
        return txReceipt.transactionHash;
      } else if (opts.token === 'DTH') {
        const dthContract = await getDthContract(this.dether._web3js, this.dether._networkId);
        const weiAmount = this.dether._web3js.utils.toWei(opts.amount);
        const txReceipt = await dthContract.methods.transfer(opts.receiverAddress, weiAmount).send({
          from: this.address,
          gasPrice: opts.gasPrice ? opts.gasPrice : '12000000000',
          gas: 100000,
        });
        return txReceipt.transactionHash;
      } else if (TICKER[this.dether.network][opts.token]) {
        // it's not DTH token but another token
        const erc20 = await getErc20Contract(this.dether._web3js, TICKER[this.dether.network][opts.token]);
        const weiAmount = this.dether._web3js.utils.toWei(opts.amount);
        const txReceipt = await erc20.methods.transfer(opts.receiverAddress, weiAmount).send({
          from: this.address,
          gasPrice: opts.gasPrice ? opts.gasPrice : '12000000000',
          gas: 100000,
        });
        return txReceipt.transactionHash;
      }
        throw new TypeError('invalid sendToken request');
    }

  /**
   * Certify New User, this function whitelist by sms new user, USER SHOULD BE SMS.DELEGATE
   * @param  {object}  opts
   * @param  {string}  opts.user ethereum address
   * @param {string} opts.nonce
   * @param  {string} opts.gasPrice (optional) gasprice you want to use in the tsx in WEI ex: 20000000000 for 20 GWEI
   * @param  {string} password  Wallet password
   * @return {Promise<object>}  Transaction
   */
  async certifyNewUser(opts, password) {
    const smsContract = await getSmsContract(this.dether._web3js, this.dether._networkId);
    const transaction = await smsContract.methods.certify(opts.user).send({ from: this.address, gas: 1000000 });
    // // const minedTsx = await this.dether.provider.waitForTransaction(transaction.hash);
    return transaction.hash;
  }

  /**
   * Revoke User, this function revoke user, USER SHOULD BE SMS.DELEGATE
   * @param  {object}  opts
   * @param  {string}  opts.user ethereum address
   * @param {string} opts.nonce
   * @param  {string} opts.gasPrice (optional) gasprice you want to use in the tsx in WEI ex: 20000000000 for 20 GWEI
   * @param  {string} password  Wallet password
   * @return {Promise<object>}  Transaction
   */
  async revokeUser(opts, password) {
    const smsContract = await getSmsContract(this.dether._web3js, this.dether._networkId);
    const transaction = await smsContract.methods.revoke(opts.user).send({ from: this.address, gas: 1000000 });
    // // const minedTsx = await this.dether.provider.waitForTransaction(transaction.hash);
    return transaction.hash;
  }

  /**
   * exchange
   * @param {object} opts
   * @param {string} opts.sellToken sell ticker
   * @param {string} opts.buyToken buy ticker
   * @param {float}  opts.sellAmount sell value in ETH equivalent (18 decimal)
   * @param {float}  opts.buyAmount amount we get for selling sellAmount of sellToken,
   *                                we retrieve this from detherJs.getEstimation()
   * @param {password} password
   * @return {string} tsx hash - transaction is mined
   */
  async exchange({ sellToken, buyToken, sellAmount, buyAmount, gasPrice }, password) {
    if (!['kovan', 'mainnet', 'rinkeby'].includes(this.dether._network)) {
      throw new TypeError('only works on kovan, rinkeby and mainnet');
    }
    // whitelist accepted trading pairs
    const acceptedPair = ALLOWED_EXCHANGE_PAIRS.some((pair) => {
      const [sell, buy] = pair.split('-');
      if ((sell === sellToken && buy === buyToken)
       || (sell === buyToken && buy === sellToken)) {
        return true;
      }
      return false;
    });
    if (!acceptedPair) {
      throw new TypeError('Trading pair not implemented');
    }
    if (!sellAmount || typeof sellAmount !== 'number') {
      throw new TypeError('sellAmount should be a positive number');
    }
    if (!buyAmount || typeof buyAmount !== 'number') {
      throw new TypeError('buyAmount should be a positive number');
    }

    try {
      const tsx = await exchangeTokens({
        sellToken,
        buyToken,
        sellAmount,
        buyAmount,
        gasPrice,
        wallet: await this._getWallet(password),
      });
      if (tsx && tsx.hash) {
        return tsx.hash;
      }
      // TODO remove and handle error result in front
      // return '0x0000000000000000000000000000000000000000000000000000000000000000';
      throw new TypeError('Unknow error, retry later');
    } catch (e) {
      throw new TypeError(e);
    }
  }

  /**
   * Revoke User, this function revoke user, USER SHOULD BE SMS.DELEGATE
   * @param  {object}  opts
   * @param  {string} opts.ticker (optional) token address to allow
   * @param  {string} opts.gasPrice (optional) gasprice you want to use in the tsx in WEI ex: 20000000000 for 20 GWEI
   * @param  {string} password  Wallet password
   * @return {Promise<object>}  Transaction hash
   */
  async addAirswapAllowance(opts, password) { // TODO
    const tokenContractAddress = TICKER[this.network][opts.ticker];
    const tokenContract = getErc20Contract(this.dether._web3js, tokenContractAddress);
    const sentTsx = await tokenContract.methods.approve(
      EXCHANGE_CONTRACTS[this.network]['airswapExchange'],
       getMaxUint256Value(),
       );
    return sentTsx.hash;
    }
  }

export default DetherWeb3User;
