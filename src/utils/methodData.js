import DetherToken from 'dethercontract/contracts/DetherToken.json';
import DetherCore from 'dethercontract/contracts/DetherCore.json';
import erc20 from 'dethercontract/contracts/ERC20.json';
import SmsCertifier from 'dethercontract/contracts/SmsCertifier.json';

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

const getDetherCoreMethodAbi = (methodName, nInputs) =>
  getMethodAbi(DetherCore, methodName, nInputs);
const getDetherTokenMethodAbi = (methodName, nInputs) =>
  getMethodAbi(DetherToken, methodName, nInputs);
const getSmsCertifierMethodAbi = (methodName, nInputs) =>
  getMethodAbi(SmsCertifier, methodName, nInputs);
const getErc20MethodAbi = (methodName, nInputs) =>
  getMethodAbi(erc20, methodName, nInputs);

module.exports = {
  getMethodAbi,
  getDetherCoreMethodAbi,
  getDetherTokenMethodAbi,
  getSmsCertifierMethodAbi,
  getErc20MethodAbi,
};
