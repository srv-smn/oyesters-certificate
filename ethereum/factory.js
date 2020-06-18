import web3 from './web3';
import Certificate from './build/Certificate.json';

const instance = new web3.eth.Contract(
  JSON.parse(Certificate.interface),
  '0xD347F331E62235ebc405C30378CbEa5494AaD5B2'
);

export default instance ;
