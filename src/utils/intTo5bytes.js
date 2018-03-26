import ConvertBase from './convertBase';

/**
 * Int to 5 bytes
 * @param  {number} intvalue value to convert
 * @return {string}          hexadecimal string
 */
const intTo5bytes = (intvalue) => {
  const convertBase = new ConvertBase();

  const hexvalue = convertBase.dec2hex(intvalue > 0 ? intvalue : -intvalue);
  let result = hexvalue;

  for (let i = 0; i + hexvalue.length < 8; i += 1) {
    result = `0${result}`;
  }

  return `${intvalue > 0 ? '00' : '01'}${result}`;
};

export default intTo5bytes;
