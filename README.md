# aws-web3-ws-provider

This is an npm package that takes care of Signature Version 4 authentication
when using the web3 library with Ethereum nodes on
[Amazon Managed Blockchain](https://aws.amazon.com/managed-blockchain/).

## Installing

Be sure to include `"type": "module"` in your `package.json` file.

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
import Web3 from 'web3';
import AWSWebsocketProvider from 'aws-web3-ws-provider';
const endpoint = process.env.AMB_WS_ENDPOINT
const web3 = new Web3(new AWSWebsocketProvider(endpoint));
web3.eth.getNodeInfo().then(console.log).then(() => {
  web3.currentProvider.connection.close();
});
```

## Testing

To test this package, follow the instructions in `test/README`.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more
information.

## License

This library is licensed under the [LGPL-3.0 License](LICENSE).
