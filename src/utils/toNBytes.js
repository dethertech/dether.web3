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

export default toNBytes;
