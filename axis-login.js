const axios = require('axios');
const fs = require('fs');
const https = require('https');

const pemFilePath = 'dab-axis1.pem'; // Path to your combined PEM file

// Read the combined PEM file
const pemData = fs.readFileSync(pemFilePath);

const agent = new https.Agent({
  key: pemData,
  cert: pemData
});

const requestBody = {
  "body": {
    "loginRequest": {
      "encryptedRequest": "eyJhbGciOiJSUzI1NiIsImtpZCI6IldqY0tveEZlZVhqN05nMlUyOTJPMUluS3AzRDExdjgtR0FKWjc1V2NtWFUifQ.ZXlKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMklpd2lZV3huSWpvaVVsTkJMVTlCUlZBaUxDSnJhV1FpT2lKRWFXRnNZV0poYm1zaWZRLmFCcmR2ZzFpbVBSS1VzTS13RENtYWZzRGhuV3VOYnJZWS1CUXM0T1Frbk9Sc0d0aGtzTVFSNUtZTWxDRWpTVDFNQ0Y5OHNxTm1ydVdULVYxbXdZTlFKbExmVWpwVE9QaG9PVVR0V0NHb0hSVXhuRHFYajVMaW1JalNxQjk0b19ZbnpQeDRkX2EyWHBVdERrblY1d2RqM3c3RmpUUXJRU0lxMnd2bUZnM2pkR1RzN2tsVTZBSW5EZUdhcjkxWXpsbGZYNlpaTlc0MHhQNTdudHBmdTk0RlB0ZVE0QWNfY2o3M3RfNDQwUGpLRjhTOWtGNmpIZGVHS20ycjVYWUNjbHM5cjJLWGRMSTZYNnJuc01kOURfOVRlVVgxVU5GZzZSZzU1LTFlb09xek1NaGx2SVBERWR0UDZIU1N6OE94WlAySzFoN1dvb2VEZkZheGZiM0NxSDZQUS5vSXFxSXR4dHRzTEd1cmkyM1laTXJnLjdxWklNYWpjd1hPUUFuNF9zbXZabXlvSTdfS1VQci1mdXFUSy1MZmE2VXg2OUhMY1MwajdEYjBkQVJzaEhHS3BSVVJwM0NtZHdYQno4X0lVd0Z2ZVJJcVlGZXlCTVBrdFgtUTR5WDVOc1c0LmRzVllLdm9leHphbkhBV2FqYmcwQ3c.M0iIzECpeQBld5DzKdkWRR4i9WxzsIeMWKLHCKCQwvLGu9k_8qiaq-Qw7JumDB2ur1AkuivqtWms1jbv4Q0CfWjuYn_fUJKr3dNbmLfOA900IQDOgvxgxGba9aVcIs1j3GyyyZ3lJ6Raa2PsD6xM7Z1uVeNJZMv_MMhSbjSbEXu7dE1wRaRXsMiE0Tf9MZwucjyG7MxRxv97eOEzFm6qmkNGAwHNKIzH6MbBLtWiCTJ7wTLtKairu_Lsy0jlIIsCHoS7rQzDBUww9PimvbW_Nm3r3S71YP8kDv8626dH-FtMHX0SvPXMgGjthIdEx0m1iRGerrV7Ef26WGu0jgXOAg"
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
