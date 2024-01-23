<?php

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
            "userName": "alwebuser",
            "password": "acid_qa"
        },

        "Risks": {}

}',
		CURLOPT_HTTPHEADER => array(
				'userName: alwebuser',
				'password: acid_qa',
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
