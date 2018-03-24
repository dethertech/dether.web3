/**
 * Get user network ID
 * @return {Number} network ID
 */
function getNetwork() {
  return this.web3js.eth.net.getId();
}

export default getNetwork;
