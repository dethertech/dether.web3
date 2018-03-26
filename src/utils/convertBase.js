/**
 * Convert Base
 */
class ConvertBase {
    convert = (baseFrom, baseTo) => num => parseInt(num, baseFrom).toString(baseTo);
    // binary to decimal
    bin2dec = this.convert(2, 10);
    // binary to hexadecimal
    bin2hex = this.convert(2, 16);
    // decimal to binary
    dec2bin = this.convert(10, 2);
    // decimal to hexadecimal
    dec2hex = this.convert(10, 16);
    // hexadecimal to binary
    hex2bin = this.convert(16, 2);
    // hexadecimal to decimal
    hex2dec = this.convert(16, 10);
}

export default ConvertBase;
