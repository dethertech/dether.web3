// /* global describe it */
// import { expect } from 'chai';
// // import sinon from 'sinon';
// import Chaithereum from 'chaithereum';
//
// import DetherWeb3 from '../../src';
//
// const chaithereum = new Chaithereum();
//
// describe('dether web3', () => {
//   describe('instanciation', () => {
//     let detherWeb3;
//
//     it('should throw a web3 error', () => {
//       try {
//         detherWeb3 = new DetherWeb3();
//       } catch (e) {
//         expect(e).to.not.equal(null);
//       }
//     });
//
//     global.window = {
//       web3: 'web3',
//     };
//
//     it('should throw a provider error', () => {
//       try {
//         detherWeb3 = new DetherWeb3();
//       } catch (e) {
//         expect(e).to.not.equal(null);
//       }
//     });
//
//     global.window = {
//       web3: new chaithereum.Web3(chaithereum.provider),
//     };
//
//     it('should instancite web3js', () => {
//       try {
//         detherWeb3 = new DetherWeb3();
//         expect(detherWeb3).to.not.equal(null);
//       } catch (e) {
//         expect(e).to.equal(null);
//       }
//     });
//   });
// });
