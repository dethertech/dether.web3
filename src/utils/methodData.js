import DetherToken from 'dethercontract/contracts/DetherToken.json';
import DetherCore from 'dethercontract/contracts/DetherCore.json';
import erc20 from 'dethercontract/contracts/ERC20.json';

const getMethodAbi = (contract, name, nInputs) => {
  const contractAbi = contract['abi']

  const methodAbi = contractAbi.filter(abi =>
    abi.type === 'function' &&
    abi.name === name &&
    abi.inputs.length === nInputs);
  if (methodAbi.length !== 1) {
    return new Error(`No method abi for method: ${name} with ${nInputs} inputs`);
  }
  return methodAbi[0];
};

const getOverLoadTransferAbi = () => getMethodAbi(DetherToken, 'transfer', 3);
const getDthTransferAbi = () => getMethodAbi(DetherToken, 'transfer', 2);
const getDeleteTellerAbi = () => getMethodAbi(DetherCore, 'deleteTeller', 0);
const getDeleteShopAbi = () => getMethodAbi(DetherCore, 'deleteShop', 0);
const getErc20TransferAbi = () => getMethodAbi(erc20, 'transfer', 2);
module.exports = { getMethodAbi, getOverLoadTransferAbi, getDeleteTellerAbi, getDeleteShopAbi, getErc20TransferAbi, getDthTransferAbi };
