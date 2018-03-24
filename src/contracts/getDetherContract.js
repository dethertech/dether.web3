import DetherCore from 'dethercontract/contracts/DetherCore.json';

function getDetherContract(web3js, id) {
  return new Promise(async (res, rej) => {
    try {
      const detherContract =
        new web3js.eth
          .Contract(DetherCore.abi, DetherCore
            .networks[id]
            .address);

      res(detherContract);
    } catch (e) {
      rej(e);
    }
  });
}

export default getDetherContract;
