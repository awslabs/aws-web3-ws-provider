const Web3 = require('web3');
const AWSWebsocketProvider = require('@aws/web3-ws-provider');
const endpoint = process.env.AMB_WS_ENDPOINT;
const web3 = new Web3(new AWSWebsocketProvider(endpoint));
web3.eth.getNodeInfo().then(console.log).then(() => {
  web3.currentProvider.connection.close();
});
