import Web3 from 'web3';
import AWSWebsocketProvider from 'aws-web3-ws-provider';
const endpoint = process.env.AMB_WS_ENDPOINT
const web3 = new Web3(new AWSWebsocketProvider(endpoint));
web3.eth.getNodeInfo().then(console.log).then(() => {
  web3.currentProvider.connection.close();
});
