# aws-web3-ws-provider

This is an npm package that takes care of Signature Version 4 authentication
for websocket connections to Ethereum nodes on
[Amazon Managed Blockchain](https://aws.amazon.com/managed-blockchain/).

## Installing

Install and save as a dependency using NPM:
`npm install aws-web3-ws-provider --save`

## Example

This example assumes that your AWS IAM-related environment variables have been set
previously. For example:
```
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...

# if your IAM credentials are temporary:
export AWS_SESSION_TOKEN=...
```

```
const Web3 = require('web3');
const AWSWebsocketProvider = require('aws-web3-ws-provider');
const endpoint = <your Amazon Managed Blockchain WS URL>
const web3 = new Web3(new AWSWebsocketProvider(endpoint));
web3.eth.getNodeInfo().then(console.log).then(() => {
  web3.currentProvider.connection.close();
});
```

You may also provide your credentials directly to the constructor arguments of a new instance of AWSWebsocketProvider() using the clientConfig options object:
```
const Web3 = require('web3');
const AWSWebsocketProvider = require('aws-web3-ws-provider');

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};
const endpoint = <your Amazon Managed Blockchain WS URL>
const web3 = new Web3(new AWSWebsocketProvider(endpoint, { clientConfig: { credentials: credentials }}));
web3.eth.getNodeInfo().then(console.log).then(() => {
  web3.currentProvider.connection.close();
});
```

This reusable WS provider can be used to create a valid WS provider in the popular Ethers.js library:

In your project's root directory, install ethers:
`npm install ethers --save`

```
const ethers = require('ethers');
const AWSWebsocketProvider = require('aws-web3-ws-provider');

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};
const endpoint = <your Amazon Managed Blockchain WS URL>
const baseProvider = new AWSWebsocketProvider(endpoint, { clientConfig: { credentials: credentials }}));
let provider = new ethers.providers.WebSocketProvider(baseProvider);
```


## Testing

To test this package, follow the instructions in `test/README`.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more
information.

## License

This library is licensed under the [LGPL-3.0 License](LICENSE).
