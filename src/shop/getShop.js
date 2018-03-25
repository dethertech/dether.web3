function getShop() {
  return new Promise(async (res, rej) => {
    try {
      const rawShop = await this.detherContract
        .methods
        .getShop(this.address)
        .call();

      let id = this.web3js.utils.hexToUtf8(rawShop[2]).replace(/\0/g, '');
      console.log('id -> ', id);
      id = id.replace(/\0/g, '');
      console.log('new id -> ', id)

      if (!id) return res(null);

      return res(Object.assign(
        {},
        shopFromContract(rawShop),
        {
          ethAddress: this.address,
        },
      ));
    } catch (e) {
      return rej(new TypeError(`Invalid shop profile: ${e.message}`));
    }
  });
}

export default getShop;
