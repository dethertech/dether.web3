/* eslint-disable object-curly-newline, max-len */
// import Ethers from 'ethers';

// import erc20Json from 'dethercontract/contracts/ERC20.json';
import erc20Json from '../abi/ERC20';
import dthTokenAbi from '../abi/dthToken';
import wethTokenAbi from '../abi/wethToken';

// import { getNetworkName } from './eth';
// import { getChainId } from './providers';

// import makerOtcAbi from '../abi/makerOtc.json';
// import makerProxyRegistryAbi from '../abi/makerProxyRegistry.json';
// // import dsProxyFactoryAbi from '../abi/dsProxyFactory.json';
// import dsProxyAbi from '../abi/dsProxy.json';
// var dsProxyAbi = require('../abi/dsProxy.json')
// // import oasisDirectProxyAbi from '../abi/oasisDirectProxy.json';
// import oasisProxyCreateExecuteAbi from '../abi/oasisProxyCreateExecute.json';

// import airswapExchangeAbi from '../abi/airswapExchange.json';
import { EXCHANGE_CONTRACTS, TICKER } from '../constants/appConstants';
// import dsProxy from '../../../web-portal/node_modules/web3';

const erc20Abi = erc20Json.abi;

// const getChainId = async (web3) => web3.eth.net.getId();

const getNetworkName = (chainId) => parseInt(chainId) === 42 ? 'kovan' : 'mainnet'
/**
 * return the address of the given contractName on the given chain
 *
 * @param {Number} chainId - chainId
 * @param {String} contractName - name of the contract who's address we want
 * @return {String} address of the contract on the chosen chain
 */
const getNetworkContractAddress = (chainId, contractName) => (
  EXCHANGE_CONTRACTS[getNetworkName(chainId)][contractName]
);

/**
 * return the address of the given erc20 tokenName on the given chain
 *
 * @param {Number} chainId - chainId
 * @param {String} tokenName - name of the erc20 token who's address we want
 * @return {String} address of the contract on the chosen chain
 */
const getNetworkTokenAddress = (chainId, tokenName) => {
  const networkName = getNetworkName(chainId);
  const tickerKovanDth = TICKER[networkName][tokenName];
  return tickerKovanDth;

} // TODO - test fix
// TICKER[getNetworkName(chainId)][tokenName]

//
// ERC20 contract addresses
//

export const getTokenContractAddr = (web3, tokenName, chainId = 42) => 
  getNetworkTokenAddress(chainId, tokenName); // TODO fix - testing

export const getTokenContract = (web3, tokenName) => (

  new web3.eth.Contract(
  // new Ethers.Contract(
    /* eslint-disable */
    tokenName === 'ETH'
    ? wethTokenAbi
    : tokenName === 'DTH'
    ? dthTokenAbi
    : erc20Abi, // should be the same for all ERC20 tokens

    getTokenContractAddr(web3, tokenName),
    /* eslint-enable */
  )
);

//
// Maker OTC contract
//

// export const getMakerOtcContractAddr = provider => (
//   getNetworkContractAddress(getChainId(provider), 'makerOtc')
// );
// export const getMakerOtcContract = provider => (
//   new Ethers.Contract(
//     getMakerOtcContractAddr(provider),
//     makerOtcAbi,
//     provider,
//   )
// );

// //
// // Maker ProxyRegistry contract
// //

// export const getMakerProxyRegistryContractAddr = provider => (
//   getNetworkContractAddress(getChainId(provider), 'makerProxyRegistry')
// );
// export const getMakerProxyRegistryContract = provider => (
//   new Ethers.Contract(
//     getMakerProxyRegistryContractAddr(provider),
//     makerProxyRegistryAbi,
//     provider,
//   )
// );

// //
// // DsProxyFactory contract
// //

// export const getDsProxyFactoryContractAddr = provider => (
//   getNetworkContractAddress(getChainId(provider), 'dsProxyFactory')
// );

// //
// // DsProxy contract
// //

// export const getDsProxyContract = ({ contractAddr, wallet, value, gasPrice }) => (
//   new Ethers.Contract(
//     contractAddr,
//     dsProxyAbi,
//     { // custom provider with pre-set gas/value
//       getAddress: wallet.getAddress.bind(wallet),
//       provider: wallet.provider,
//       sendTransaction: transaction => (
//         wallet.sendTransaction(Object.assign(transaction, { gasPrice, value }))
//       ),
//     },
//   )
// );

// //
// // Oasis DirectProxy contract
// //

// export const getOasisDirectProxyContractAddr = provider => (
//   getNetworkContractAddress(getChainId(provider), 'oasisDirectProxy')
// );

// //
// // Oasis ProxyCreateExecute contract
// //

// export const getOasisProxyCreateExecuteContractAddr = provider => (
//   getNetworkContractAddress(getChainId(provider), 'oasisProxyCreateExecute')
// );
// export const getOasisProxyCreateExecuteContract = ({ wallet, value, gasPrice }) => (
//   new Ethers.Contract(
//     getOasisProxyCreateExecuteContractAddr(wallet.provider),
//     oasisProxyCreateExecuteAbi,
//     { // custom provider with pre-set gas/value
//       getAddress: wallet.getAddress.bind(wallet),
//       provider: wallet.provider,
//       sendTransaction: transaction => (
//         wallet.sendTransaction(Object.assign(transaction, { gasPrice, value }))
//       ),
//     },
//   )
// );

// //
// // AirSwap Exchange
// //

// export const getAirsSwapExchangeContractAddr = provider => (
//   getNetworkContractAddress(getChainId(provider), 'airswapExchange')
// );

// export const getAirsSwapExchangeContract = ({ wallet, value, gasPrice, nonce }) => ( // eslint-disable-line object-curly-newline, max-len
//   new Ethers.Contract(
//     getAirsSwapExchangeContractAddr(wallet.provider),
//     airswapExchangeAbi,
//     { // custom provider with pre-set gas/value
//       getAddress: wallet.getAddress.bind(wallet),
//       provider: wallet.provider,
//       sendTransaction: transaction => {
//         if (nonce) transaction.nonce = nonce;
//         return wallet.sendTransaction(Object.assign(transaction, { gasPrice, value, gasLimit: 170000 })); // eslint-disable-line max-len
//       },
//     },
//   )
// );
