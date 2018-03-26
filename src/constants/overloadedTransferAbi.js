const overloadedTransferAbi = {
  constant: false,
  inputs: [
    {
      name: '_to',
      type: 'address',
    },
    {
      name: '_value',
      type: 'uint256',
    },
    {
      name: '_data',
      type: 'bytes',
    },
  ],
  name: 'transfer',
  outputs: [
    {
      name: '',
      type: 'bool',
    },
  ],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
};

export default overloadedTransferAbi;
