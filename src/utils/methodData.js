import DetherToken from 'dethercontract/contracts/DetherToken.json';
import DetherCore from 'dethercontract/contracts/DetherCore.json';

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
const getDeleteTellerAbi = () => getMethodAbi(DetherCore, 'deleteTeller', 0);
const getDeleteShopAbi = () => getMethodAbi(DetherCore, 'deleteShop', 0);

module.exports = { getMethodAbi, getOverLoadTransferAbi, getDeleteTellerAbi, getDeleteShopAbi };
