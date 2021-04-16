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

const validateCredentials = (credentials) => {
  let valid = true;

  //ensure the provided object has property accessKeyId
  if (!credentials.hasOwnProperty('accessKeyId')) valid = false
  //ensure the provided object has property secretAccessKey
  if (!credentials.hasOwnProperty('secretAccessKey')) valid = false
  //ensure accessKeyId is not undefined or empty
  if (credentials.accessKeyId == undefined || credentials.accessKeyId === "") valid = false
  //ensure secretAccessKey is not undefined or empty
  if (credentials.secretAccessKey == undefined || credentials.secretAccessKey === "") valid = false
  

  return valid;
}

module.exports = class AWSWebsocketProvider extends WebsocketProvider {
  
  constructor(url, options) {
    super(url, options)
  } 

  connect() {
    const region = process.env.AWS_DEFAULT_REGION || 'us-east-1';
    let credentials
    if (this.clientConfig && this.clientConfig.credentials) {
      if (!validateCredentials(this.clientConfig.credentials)) throw 'Invalid Credentials: Check that your AWS credentials match the standard format';
      credentials = new AWS.Credentials(this.clientConfig.credentials);
    } else {
      credentials = new AWS.EnvironmentCredentials('AWS');
    }
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

