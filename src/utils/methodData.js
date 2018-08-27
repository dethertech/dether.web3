import DetherToken from 'dethercontract/contracts/DetherToken.json';

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

module.exports = { getMethodAbi, getOverLoadTransferAbi };
