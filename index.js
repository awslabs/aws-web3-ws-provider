/////////////////////////////////////////////////////
// Authored by Carl Youngblood
// Senior Blockchain Solutions Architect, AWS
// Adapted from web3 npm package v1.3.0
// licensed under GNU Lesser General Public License
// https://github.com/ethereum/web3.js
/////////////////////////////////////////////////////

const AWS = require('aws-sdk');
const WebsocketProvider = require('web3-providers-ws');
const { w3cwebsocket } = require('websocket');

const Ws = w3cwebsocket;


module.exports = class AWSWebsocketProvider extends WebsocketProvider {
  
  constructor(url, options) {
    super(url, options)
  } 

  connect() {
    const region = process.env.AWS_DEFAULT_REGION || 'us-east-1';
    const creds =
      'clientConfig' in this &&
      this.clientConfig !== undefined &&
      'credentials' in this.clientConfig &&
      'accessKeyId' in this.clientConfig.credentials &&
      'secretAccessKey' in this.clientConfig.credentials &&
      this.clientConfig.credentials;
    const credentials = (creds && new AWS.Credentials(creds)) || new AWS.EnvironmentCredentials('AWS');
    const host = new URL(this.url).hostname;
    const endpoint = new AWS.Endpoint(`https://${host}/`);
    const req = new AWS.HttpRequest(endpoint, region);
    req.method = 'GET';
    req.body = '';
    req.headers['host'] = host;
    const signer = new AWS.Signers.V4(req, 'managedblockchain');
    signer.addAuthorization(credentials, new Date());
    let headers = {
      'Authorization': req.headers['Authorization'],
      'X-Amz-Date': req.headers['X-Amz-Date'],
      ...this.headers
    }
    if (process.env.AWS_SESSION_TOKEN) {
      headers = { ...headers, 'X-Amz-Security-Token': process.env.AWS_SESSION_TOKEN };
    }
    this.connection = new Ws(this.url, this.protocol, undefined, headers, this.requestOptions, this.clientConfig);
    this._addSocketListeners();
  }
}