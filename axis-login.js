const axios = require('axios');
const fs = require('fs');
const https = require('https');

const pemFilePath = 'dab.p12'; // Path to your combined PEM file

// Read the combined PEM file
const pemData = fs.readFileSync(pemFilePath);

const agent = new https.Agent({
  key: pemData,
  cert: pemData
});

const requestBody = {
  "body": {
    "loginRequest": {
      "encryptedRequest": "eyJhbGciOiJSUzI1NiIsImtpZCI6IlRGYllvNGxzYzdqS29iZm5GNElNek5VeTJWNjNuYXhwN2paaXpFT25nSm8ifQ.ZXlKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMklpd2lZV3huSWpvaVVsTkJMVTlCUlZBaUxDSnJhV1FpT2lKVVJtSlpielJzYzJNM2FrdHZZbVp1UmpSSlRYcE9WWGt5VmpZemJtRjRjRGRxV21sNlJVOXVaMHB2SW4wLnRrazE5SjBtQ2NlUmNfMmdYY1B3TWxjZjBFSjRXYW1QYTFPQjVSNndVdGVQNzRCRGhRVlg0eS1JNlNWSzFfcUxXeW50Rm5UNF9ueVdZUE5hWm1qZ1BtRHpjOW1raktjak1BcTkzN3BIYlVzRkd6b0VIOTdaZ3Y0MzBhNW5pTG9vdVFOMDk3QzZUZjg2d1BXYXVfSG1pR0NVX2JJWnVlWmdOTTZsdnJjVWFCRHQzWHIwa1dYZzJ3aXpfdFJ0cjdRRHZNZk1IbTVwX1pMN0JkZzFQRWhRR0hSYUw3R3lXNDU3VHM4MWd6bnFPYjYzMnowT2pCeXl4SHo2eUV0bGRoZGxBakNFRzB4ek94OV9lOEhSZ1dORk9RbHhTb3dZNVl6MnVPenVpMmNnTEhYQVlTODFrRlRlTHNiYXA2TXdnaGo2azhGU21IQ0NoNkFWYTNYSk9Ea1pEQS5fcEZBVXF5Z0YyRHZTNFB6R2VCZThBLlFYdkxqVURRU0ZmM3c5Vlk4YW9fRkhTUGNyRXNxaE90czdMeTNHZi1SeEN5SEFJYzE5cDBXYlg2bjlPNGE3d1lETkRCZ3czSGYyQ1Z4V05xYzg5cEpTTTI5ZC1rcHlobnpUX2E0SHZtd2FrLlYxX09tVW1Ya0xMRmhxM3AxWHZNSFE.TkeREZZmczBupDxgiUAYh2_MEwRiUOJFexTFSMbSQs-RHvS4u06GShzRhNnaWTwf0g6T71skrL9CbqOIfHZSP-d_DV6mGXMNq4JkwqSirsComcZU9TUR_kGiKrCpMGigNcZtnk5ypE-OVISQA_flF627GtNtK9gPR73968xdN12uJov2HHccA7Rn60tWHJCENqHq7KvMlqf5YClX_4d9DNgOO0DhWQnbVu7yUoubYj7MyFFvvr-Skl1EKvCtFb-Clt38x9QOiLQjcu8q19NLKKOdTd2o9hK4U61FvRglxAmlrD-H8_aT89-b_tWKMVMk7GgbdhrDNE24EWw4KJq90Q"
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
