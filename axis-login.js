const axios = require('axios');
const fs = require('fs');
const https = require('https'); 
const { parse } = require('path');

const forge = require('node-forge');

// Function to extract private key and certificate from .p12 file
function extractPrivateKeyAndCert(p12File, password) {
  const p12Asn1 = forge.asn1.fromDer(p12File);
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);
  const privateKey = p12.getBags({bagType: forge.pki.oids.pkcs8ShroudedKeyBag})[forge.pki.oids.pkcs8ShroudedKeyBag][0].key;
  const cert = p12.getBags({bagType: forge.pki.oids.certBag})[forge.pki.oids.certBag][0].cert;
  return { privateKey, cert };
}



// Read the .p12 file
const p12FilePath = 'dab-axis1.pem';
const p12Password = '';

// Read the .p12 file
const p12File = fs.readFileSync(p12FilePath);

// Extracting private key and certificate from the .p12 file
const { privateKey, cert } = extractPrivateKeyAndCert(p12File, p12Password);

const agent = new https.Agent({
  pfx: privateKey,
  cert: cert,
  passphrase: p12Password
});

const requestBody = {
  "body": {
    "loginRequest": {
      "encryptedRequest": "eyJhbGciOiJSUzI1NiIsImtpZCI6IldqY0tveEZlZVhqN05nMlUyOTJPMUluS3AzRDExdjgtR0FKWjc1V2NtWFUifQ.ZXlKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMklpd2lZV3huSWpvaVVsTkJMVTlCUlZBaUxDSnJhV1FpT2lKeVozY3VhbmRsYW5kekxuVmhkQzVoZUdsellpNWpiMjBpZlEualJJVm9wd0VPYURaVjFfT0MzUy1PdzA2ckNnSUtXMEdlMkxnWlV1TWtyVXd0enRUaTlrbzhJeWdJWHlFU1FkMEEtNktBLVg3czBQWW92VHBIZ21XaGhCaEY5YnZnSFRmWHpuZWt5dzI1TGdKZmhVUURkbjhnREd6THNkRDhmOXhTQzJFWUxUMnNMT1hQQUJKZ2NpeTNFTUViSktodk5tYWswbzZTWTVoNk9tZjc4LWptaHY5aWJsQmprajFNZjNwbmJUN1RXVjUzMGtpS09DTnJ4ZTVwdkRFUkpSNEN4cElvcmNEa213MC1HREI4V05WN1YzejFWZjE3a1V6WU8xMTJuZE9ieVcwdGo0aTlscW5hUlppMnIwdnRrN2poSWZWRWNFSVFpLWV0YVVaNHI3bXVBblpMUDFsMW1NcGU0TGNCM3lyb2t5R1pZbDBZMmRmWFVTUTNnLnFWVlljWGJSbTVrbktFMWNjc3RyaEEuZGExYjVzN3ZHdk9kQzIxN3VXdWt6N1dJR0dOYXZmX21KSFo2RVY3SEFOZ0Z2bnNKaldLWndhNW8zNk1KUUswbTU4d195REcydXU1Z0hoUEpGSHFaMkdNRmhtMDFQMjJwb21BNVc4ZzBXZUkuejlCOHhUd1IxMlVnemp1RnVlY01qUQ.lAai249npfxzqD900THDe89rsWpNJC6oTXUWsXSZv1Pav2Lg6qJ7vVwIB01sAYwHZ5X6TL__23Lv3dDYnXaIgMlaLnzrkS75umQycETFIe8-9-m70hLv2nv9jsSeJFdPpADWxzgVaDilSJlE41367tM0A959GIlNVMybCCBXHDRLWOkDbByGNfqewpSq93QAed0yms4wYU6rScHa2Xr3bWE5eB1QQdvtnRA0T4_AiXufr_Qi2JXZoNkJ9zc-kIu0hpjo2FldRtj3KwRSrXfX87AqOwMcbAbZNtFznDzKtZkExV2_ceWcz9RqcqcOIiA6WZhLnpf3J5byQKFPjGbRAw"
    }
  }
};

const headers = {
  'x-fapi-channel-id': 'BB_DialABank',
  'x-fapi-epoch-millis': '98129812',
  'x-fapi-uuid': '431222',
  'x-fapi-serviceId': 'openapi',
  'x-fapi-serviceVersion': '1.0',
  'Content-Type': 'application/json',
  'X-IBM-Client-Id': 'cd7702c6c60795c68f2bd594a5600e1a',
  'X-IBM-Client-Secret': 'ab638c18b5e9d598fd709deee92a2a54'
};

axios.post('https://sakshamuat.axisbank.co.in/gateway/api/v2/CRMNext/login', requestBody, {
  headers: headers,
  httpsAgent: agent
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

