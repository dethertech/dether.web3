import ConvertBase from './convertBase';

const convertBase = new ConvertBase();

/**
 * Int to 5 bytes
 * @param  {number} intvalue value to convert
 * @return {string}          hexadecimal string
 */
const intTo5bytes = (intvalue) => {

  const hexvalue = convertBase.dec2hex(intvalue > 0 ? intvalue : -intvalue);
  let result = hexvalue;

  for (let i = 0; i + hexvalue.length < 8; i += 1) {
    result = `0${result}`;
  }

  return `${intvalue > 0 ? '00' : '01'}${result}`;
};

const intTo2bytes = (intvalue) => {
  const hexvalue = convertBase.dec2hex(intvalue);
  let result = hexvalue;
  for (let i = 0; i + hexvalue.length< 4; i++) {
    result = '0' + result;
  }
  return result;
};

const intTobytes = intvalue => {
  const hexvalue = convertBase.dec2hex(intvalue);
  let result = hexvalue;
  for (let i = 0; i + hexvalue.length< 2; i++) {
    result = '0' + result;
  }
  return result;
};

/**
 * toNBytes
 * @param  {string} str
 * @param  {number} n
 * @return {string}
 */
const toNBytes = (str, n) => {
  if (!str || !n) return 0;

  let buffer = '';

  for (let i = 0; i < n; i += 1) {
    buffer += str[i] ? str[i].charCodeAt(0).toString(16) : '00';
  }

  return buffer;
};

module.exports = { intTo5bytes, intTo2bytes, intTobytes, toNBytes }
