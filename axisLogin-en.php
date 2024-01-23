<?php

$p12File = 'Dab-csrs/dab-axis.p12';
$p12Password = '1234';

$p12 = file_get_contents($p12File);

if (openssl_pkcs12_read($p12, $certs, $p12Password)) {
    $privateKey = $certs['pkey'];
} else {
    die('Failed to load P12 file or incorrect password.');
}


$user = 'alwebuser';
$pw = 'acid_qa';

if (openssl_private_encrypt($user, $encryptedData, $privateKey)) {
    $en_user =  base64_encode($encryptedData);
} else {
    die('Encryption failed.');
}

if (openssl_private_encrypt($pw, $encryptedData, $privateKey)) {
    $en_pw =  base64_encode($encryptedData);
} else {
    die('Encryption failed.');
}

$curl = curl_init();

curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://sakshamuat.axisbank.co.in/gateway/api/v2/CRMNext/login',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => 'POST',
		CURLOPT_POSTFIELDS =>'{
    "Data": {
            "userName": "'.$en_user.'",
            "password": "'.$en_pw.'"
        },

        "Risks": {}

}',
		CURLOPT_HTTPHEADER => array(
				'userName: '.$en_user,
				'password: '$en_pw,
				'x-fapi-channel-id: BB_DialABank',
				'x-fapi-epoch-millis: 98129812',
				'x-fapi-uuid: 431222',
				'x-fapi-serviceId: openapi',
				'x-fapi-serviceVersion: 1.0',
				'Content-Type: application/json',
				'X-IBM-Client-Id: cd7702c6c60795c68f2bd594a5600e1a',
				'X-IBM-Client-Secret: ab638c18b5e9d598fd709deee92a2a54'
		),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
