/* eslint-disable max-len, no-multi-spaces, object-curly-newline, import/first */

import Web3 from 'web3';
import web3Abi from 'web3-eth-abi';
import { TICKER, EXCHANGE_CONTRACTS, ALLOWED_EXCHANGE_PAIRS, NETWORK_NAME_ID } from './constants/appConstants';
import { getDthContract, getErc20Contract, getSmsContract } from './contracts';
import { add0x, getMaxUint256Value } from './utils/eth';
import DthContract from 'dethercontract/contracts/DetherToken.json';
import DetherCore from 'dethercontract/contracts/DetherCore.json';
import SmsCertifier from 'dethercontract/contracts/SmsCertifier.json';
// import { validateSellPoint, validateSendCoin, validatePassword } from './utils/validation';
// import Contracts from './utils/contracts';
import { updateToContract } from './utils/formatters';
import { exchangeTokens } from './utils/exchangeTokens';

import {
  toNBytes,
  getDetherCoreMethodAbi,
  getDetherTokenMethodAbi,
  getSmsCertifierMethodAbi,
  getErc20MethodAbi,
  sellPointToContract,
  sendTransaction,
  validateSellPoint,
} from './utils';


class DetherWeb3User {
  /**
   * Creates an instance of DetherWeb3User.
   *
   * You may not instanciate from here, prefer from DetherWeb3.getUser method
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
    this.network = opts.dether.getNetwork();
    this.networkId = NETWORK_NAME_ID[this.network];
    /** @ignore */
    this.encryptedWallet = opts.encryptedWallet;
    const parsedWallet = JSON.parse(opts.encryptedWallet);
    if (!parsedWallet.address) {
      throw new TypeError('dether web3 user wallet must contains address');
    }
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
    const signMessage = msg => this.web3js.eth.sign(msg, this.address);
    return { address: this.address, network: this.network, networkId: this.networkId, signMessage };
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
  deleteShop = (opts, password = null) => this.deleteSellPoint(opts, password, this.sellPoints.shop)
  addTeller = (teller, password) => this.addSellPoint(teller, password, this.sellPoints.teller)
  deleteTeller = (opts, password = null) => this.deleteSellPoint(opts, password, this.sellPoints.teller)
  getShopZonePrice = (zoneId) => this.getZonePrice(zoneId, this.sellPoints.shop);
  getTellerZonePrice = (zoneId) => this.getZonePrice(zoneId, this.sellPoints.teller);

  addSellPoint(sellPointInst, password, sellPoint = 'teller') {
    return new Promise(async (res, rej) => {
      try {
        await validateSellPoint(sellPointInst, sellPoint);
        const licencePrice = await this.getZonePrice(sellPointInst.countryId, sellPoint);
        if (!licencePrice) return rej(new Error('Invalid country ID'));
        const OVERLOAD_NUM_ARGS = 3;
        const overloadedTransferAbi = getDetherTokenMethodAbi('transfer', OVERLOAD_NUM_ARGS);
        const hexSellPoint = sellPointToContract(sellPointInst, sellPoint);
        const transferMethodTransactionData = web3Abi.encodeFunctionCall(
          overloadedTransferAbi,
          [
            DetherCore.networks[this.networkId].address,
            Web3.utils.toWei(licencePrice),
            hexSellPoint,
          ],
        );

        const dataTx = {
            from: this.address,
            to: DthContract.networks[this.networkId].address,
            data: transferMethodTransactionData,
            value: 0,
            gas: 400000,
            gasPrice: sellPointInst.gasPrice ? sellPointInst.gasPrice : '20000000000',
          };
        const txReceiptAdd = await sendTransaction(this.web3js, dataTx);
        const txHashAddEth = await this.addEth({ amount: sellPointInst.amount });
        return res(txReceiptAdd.transactionHash);
      } catch (e) {
        return rej(new TypeError(`Invalid add ${sellPoint} transaction: ${e.message}`));
      }
    });
  }

  /**
   * Delete sell point, this function withdraw automatically balance escrow to owner and delete all info
   * @param {number} opts.gasPrice  gasprice you want to use in the tsx in WEI ex: 20000000000 for 20 GWEI
   * @return {Promise<object>}  Transaction
   */

  async deleteSellPoint(opts, password, sellPoint = 'teller') {
    const isTeller = sellPoint === 'teller';
    return new Promise(async (res, rej) => {
      try {
          const methodArgs = [];
          const deleteSellPointAbi = isTeller ? getDetherCoreMethodAbi('deleteTeller', methodArgs.length) : getDetherCoreMethodAbi('deleteShop', methodArgs.length);
          const deleteSellPointCallEncoded = web3Abi.encodeFunctionCall(deleteSellPointAbi, methodArgs);
          const dataTx = {
              from: this.address,
              to: DetherCore.networks[this.networkId].address,
              data: deleteSellPointCallEncoded,
              value: 0,
              gas: 400000,
              gasPrice: opts.gasPrice ? opts.gasPrice : '20000000000',
            };
          const txReceipt = await sendTransaction(this.web3js, dataTx);
        return res(txReceipt.transactionHash);
      } catch (e) {
        return rej(new TypeError(`Invalid transaction: ${e.message}`));
      }
    });
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
    try {
      const updateTellerAbi = getDetherCoreMethodAbi('updateTeller', 5);
      const weiAmount = Web3.utils.toWei(opts.amount.toString());
      const formatedUpdate = updateToContract(opts);
      const updateArgs = Object.values(formatedUpdate);
      console.log('EAMON confirm that args length is 5?', updateArgs.length);
      const updateTellerAbiCallEncoded = web3Abi.encodeFunctionCall(updateTellerAbi, updateArgs);
      const dataTx = {
        from: this.address,
        to: DetherCore.networks[this.networkId].address,
        data: updateTellerAbiCallEncoded,
        value: weiAmount,
        gas: 400000,
        gasPrice: opts.gasPrice ? opts.gasPrice : '20000000000',
      };
      const txReceipt = await sendTransaction(this.web3js, dataTx);
      return txReceipt.transactionHash;
    } catch (e) {
       throw new TypeError('invalid update teller transaction: ', e);
     }
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

        return res(Web3.utils.fromWei(price));
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
    try {
      const detherCoreContract = this.dether._detherContract;
      const weiAmount = Web3.utils.toWei(amount);
      const transactionAddEth = await detherCoreContract.methods.addFunds().send({
        from: this.address,
          value: weiAmount,
          gasPrice: opts.gasPrice ? opts.gasPrice : '20000000000',
          gas: '210000' });
      return transactionAddEth.hash;
    } catch (e) {
      throw new TypeError('Invalid add eth transaction', e);
    }
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
    try {
      const { amount, receiver } = opts;
      const weiAmount = Web3.utils.toWei(amount.toString());
      const methodArgs = [receiver, weiAmount];
      const sellEthAbi = getDetherCoreMethodAbi('sellEth', methodArgs.length);
      const sellEthCallEncoded = web3Abi.encodeFunctionCall(sellEthAbi, methodArgs);
      const txData = {
        from: this.address,
        to: DetherCore.networks[this.networkId].address,
        data: sellEthCallEncoded,
        value: 0,
        gas: 300000,
        gasPrice: opts.gasPrice ? opts.gasPrice : '12000000000',
      };

      const txReceipt = await sendTransaction(this.web3js, txData, 0);
      return txReceipt.transactionHash;
    } catch (e) {
      throw new TypeError('Invalid send to buyer transaction', e);
    }
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
    try {
      const methodArgs = [opts.toDelete];
      const deleteTellerModsMethodAbi = getDetherCoreMethodAbi('deleteTellerMods', methodArgs.length);
      const deleteTellerModsCallEncoded = web3Abi.encodeFunctionCall(deleteTellerModsMethodAbi, methodArgs);
      const txData = {
        from: this.address,
        to: DetherCore[this.networkId].address,
        data: deleteTellerModsCallEncoded,
        value: 0,
        gas: 200000,
        gasPrice: opts.gasPrice ? opts.gasPrice : '12000000000',
      };
      const txReceipt = await sendTransaction(this.web3js, txData, 0);
      return txReceipt.transactionHash;
    } catch (e) {
      throw new TypeError('Invalid delete sellpoint moderatpr transaction', e);
    }
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
  async turnOfflineSellPoint(opts, password) {
    try {
      const methodArgs = [false];
      const switchStatusMethodAbi = getDetherCoreMethodAbi('switchStatus', methodArgs.length);
      const switchStatusCallEncoded = web3Abi.encodeFunctionCall(switchStatusMethodAbi, methodArgs);
      const txData = {
        from: this.address,
        to: DetherCore[this.networkId].address,
        data: switchStatusCallEncoded,
        value: 0,
        gas: 200000,
        gasPrice: opts.gasPrice ? opts.gasPrice : '12000000000',
      };
      const txReceipt = await sendTransaction(this.web3js, txData, 0);
      return txReceipt.transactionHash;
    } catch (e) {
      throw new TypeError('Invalid turn offline sell point transaction', e);
    }
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
     const weiAmount = Web3.utils.toWei(opts.amount);
     const CONFIRMATIONS = 0;
     let txData;
     // switch(opts.token)
     if (opts.token === 'ETH') {
       txData = {
         from: this.address,
         to: opts.receiverAddress,
         value: weiAmount,
         gasPrice: opts.gasPrice ? opts.gasPrice : '12000000000',
         gas: 120000,
       };
     } else if (TICKER[this.network][opts.token]) {
       const methodArgs = [opts.receiverAddress, weiAmount];
       const erc20TransferAbi = opts.token === 'DTH' ? getDetherTokenMethodAbi('transfer', methodArgs.length) : getErc20MethodAbi('transfer', methodArgs.length);
       const erc20TransferCallEncoded = web3Abi.encodeFunctionCall(erc20TransferAbi, methodArgs);
       txData = {
         from: this.address,
         to: TICKER[this.network][opts.token],
         data: erc20TransferCallEncoded,
         value: 0,
         gas: 120000,
         gasPrice: opts.gasPrice ? opts.gasPrice : '12000000000',
       };
     }
     if (txData) {
       try {
         const txReceipt = await sendTransaction(this.web3js, txData, CONFIRMATIONS);
         return txReceipt.transactionHash;
       } catch (e) {
         throw new TypeError(`sendTransaction failed for token ${opts.token}: ${e}`);
       }
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
    try {
      const methodArgs = [add0x(opts.user)];
      const smsCertifyMethodAbi = getSmsCertifierMethodAbi('certify', methodArgs.length);
      const smsCertifyCallEncoded = web3Abi.encodeFunctionCall(smsCertifyMethodAbi, methodArgs);
      const txData = {
        from: this.address,
        to: SmsCertifier[this.networkId].address,
        data: smsCertifyCallEncoded,
        value: 0,
        gas: 120000,
        gasPrice: opts.gasPrice ? opts.gasPrice : '12000000000',
      };
      const txReceipt = await sendTransaction(this.web3js, txData, 0);
      return txReceipt.transactionHash;
    } catch (e) {
      throw new TypeError('Invalid certify new user transaction', e);
    }
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
    try {
      const methodArgs = [add0x(opts.user)];
      const smsRevokeMethodAbi = getSmsCertifierMethodAbi('revoke', methodArgs.length);
      const smsRevokeCallEncoded = web3Abi.encodeFunctionCall(smsRevokeMethodAbi, methodArgs);
      const txData = {
        from: this.address,
        to: SmsCertifier[this.networkId].address,
        data: smsRevokeCallEncoded,
        value: 0,
        gas: 1000000,
        gasPrice: opts.gasPrice ? opts.gasPrice : '12000000000',
      };
      const txReceipt = await sendTransaction(this.web3js, txData, 0);
      return txReceipt.transactionHash;
    } catch (e) {
      throw new TypeError('Invalid revoke user transaction', e);
    }
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
      const txReceipt = await exchangeTokens({
        sellToken,
        buyToken,
        sellAmount,
        buyAmount,
        gasPrice,
        wallet: await this._getWallet(password),
      });
      if (txReceipt && txReceipt.transactionHash) {
        return txReceipt.transactionHash;
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
  async addAirswapAllowance(opts, password) {
    const tokenContractAddress = TICKER[this.network][opts.ticker];
    const tokenContract = getErc20Contract(this.dether._web3js, tokenContractAddress);
    const txReceipt = await tokenContract.methods.approve(
      EXCHANGE_CONTRACTS[this.network].airswapExchange,
       getMaxUint256Value(),
       ).send({ from: this.address, gas: '100000', gasPrice: opts.gasPrice ? opts.gasPrice : '20000000000' });
    return txReceipt.transactionHash;
    }
  }

export default DetherWeb3User;
