import SmsCertifier from 'dethercontract/contracts/SmsCertifier.json';

function getSmsContract(web3js, id) {
  return new Promise(async (res, rej) => {
    try {
      const smsContract =
        new web3js.eth
          .Contract(SmsCertifier.abi, SmsCertifier
            .networks[id]
            .address);

      res(smsContract);
    } catch (e) {
      rej(e);
    }
  });
}

export default getSmsContract;
