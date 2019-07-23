

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sslSchema = new Schema({
    id: {type: String, required: true},
    issuer:{type:String,required:false},
    SerialNumber:{type:String,required:false},
    subjectaltname:{type:String,required:false},
    valid_from:{type:String,required:false},
    fingerprint:{type:String,required:false},
    valid_to:{type:String,required:false},
});

module.exports = mongoose.model('Ssl',sslSchema);
/*
{
    bits: 2048
    exponent: "0x10001"
    ext_key_usage: (2) ["1.3.6.1.5.5.7.3.1", "1.3.6.1.5.5.7.3.2"]
    fingerprint: "71:A9:9B:81:8C:66:36:2B:CE:F9:58:5E:E0:EE:9D:CA:24:F0:8E:32"
    fingerprint256: "91:BD:2D:A8:D6:9F:BC:F3:A2:37:21:10:B1:69:2E:BD:BC:92:CA:7B:85:A9:60:F2:FC:09:60:42:80:70:09:4C"
    infoAccess: {CA Issuers - URI: Array(1), OCSP - URI: Array(1)}
    issuer: {C: "BE", O: "GlobalSign nv-sa", CN: "GlobalSign CloudSSL CA - SHA256 - G3"}
    modulus: "B0B6F538D43005D87799F8CA917690AFD2130A7417C01BC8F7CC7D3934A7954B92603D8A93CFC0EC8365A3DB4334B570854B96BB031F34F1B75CBE5E9ACCA6D670808B568869CF744481C90161ECB887389B10BAF788B4268AB347B0300DEBDDF17262A6FA9E3EB5F53979037C030BB14EB24D6A2DFE43830CFCB7214FE24624A696F9DD30DEBACE25F6A0DFBEB7E48F9A2BB71C736E38AEA9573F4F5C9DF2225467624B6AAD7EB8B8F0551CF07B948EFFBE3E8667F8597AD9E1914F02925B32C785D57A5CEC2AFF87430935025E7D8E7143078B170616F7F29DE0E5B52A69CA5A8A558681D1259AA62F9DFCEAB40D147C0EC20B23BF7B621AF0F955A587CF03"
    pemEncoded: "-----BEGIN CERTIFICATE-----↵MIIIRTCCBy2gAwIBAgIMfA6vBsL/lFeKaFC+MA0GCSqGSIb3DQEBCwUAMFcxCzAJ↵BgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWduIG52LXNhMS0wKwYDVQQDEyRH↵bG9iYWxTaWduIENsb3VkU1NMIENBIC0gU0hBMjU2IC0gRzMwHhcNMTkwNTAxMDAw↵MzIyWhcNMjAwMjA5MTMyNjE3WjBvMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2Fs↵aWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzEUMBIGA1UECgwLV2lraWEs↵IEluYy4xHTAbBgNVBAMMFCoud2lraWEtc2VydmljZXMuY29tMIIBIjANBgkqhkiG↵9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsLb1ONQwBdh3mfjKkXaQr9ITCnQXwBvI98x9↵OTSnlUuSYD2Kk8/A7INlo9tDNLVwhUuWuwMfNPG3XL5emsym1nCAi1aIac90RIHJ↵AWHsuIc4mxC694i0JoqzR7AwDevd8XJipvqePrX1OXkDfAMLsU6yTWot/kODDPy3↵IU/iRiSmlvndMN66ziX2oN++t+SPmiu3HHNuOK6pVz9PXJ3yIlRnYktqrX64uPBV↵HPB7lI7/vj6GZ/hZetnhkU8Cklsyx4XVelzsKv+HQwk1Al59jnFDB4sXBhb38p3g↵5bUqacpailWGgdElmqYvnfzqtA0UfA7CCyO/e2Ia8PlVpYfPAwIDAQABo4IE9zCC↵BPMwDgYDVR0PAQH/BAQDAgWgMIGKBggrBgEFBQcBAQR+MHwwQgYIKwYBBQUHMAKG↵Nmh0dHA6Ly9zZWN1cmUuZ2xvYmFsc2lnbi5jb20vY2FjZXJ0L2Nsb3Vkc3Nsc2hh↵MmczLmNydDA2BggrBgEFBQcwAYYqaHR0cDovL29jc3AyLmdsb2JhbHNpZ24uY29t↵L2Nsb3Vkc3Nsc2hhMmczMFYGA1UdIARPME0wQQYJKwYBBAGgMgEUMDQwMgYIKwYB↵BQUHAgEWJmh0dHBzOi8vd3d3Lmdsb2JhbHNpZ24uY29tL3JlcG9zaXRvcnkvMAgG↵BmeBDAECAjAJBgNVHRMEAjAAMIIChwYDVR0RBIICfjCCAnqCFCoud2lraWEtc2Vy↵dmljZXMuY29tgg4qLmN1cnNlY2RuLmNvbYIPKi5mYW5kb20tZGV2LnBsgg8qLmZh↵bmRvbS1kZXYudXOCDCouZmFuZG9tLmNvbYISKi5mYW5kb20ud2lraWEuY29tgg8q↵LmdhbWVwZWRpYS5jb22CDiouZ2FtZXBlZGlhLmlvghMqLm1pbmVjcmFmdHdpa2ku↵bmV0gg4qLm5vY29va2llLm5ldIIcKi5zYW5kYm94LWFkZW5nMDIuZmFuZG9tLmNv↵bYIPKi53aWtpYS1kZXYuY29tgg4qLndpa2lhLWRldi5wbIIOKi53aWtpYS1kZXYu↵dXOCDyoud2lraWEtaW5jLmNvbYITKi53aWtpYS1zdGFnaW5nLmNvbYILKi53aWtp↵YS5jb22CFCoud2lraWEubm9jb29raWUubmV0ggsqLndpa2lhLm9yZ4IUKi53aWtp↵YWZhbnN0dWRpby5jb22CDGN1cnNlY2RuLmNvbYINZmFuZG9tLWRldi5wbIINZmFu↵ZG9tLWRldi51c4IKZmFuZG9tLmNvbYINZ2FtZXBlZGlhLmNvbYIMZ2FtZXBlZGlh↵LmlvghFtaW5lY3JhZnR3aWtpLm5ldIIac2FuZGJveC1hZGVuZzAyLmZhbmRvbS5j↵b22CDXdpa2lhLWRldi5jb22CDHdpa2lhLWRldi5wbIIMd2lraWEtZGV2LnVzgg13↵aWtpYS1pbmMuY29tghF3aWtpYS1zdGFnaW5nLmNvbYIJd2lraWEuY29tggl3aWtp↵YS5vcmeCEndpa2lhZmFuc3R1ZGlvLmNvbYISd2lraWEtc2VydmljZXMuY29tMB0G↵A1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAdBgNVHQ4EFgQUe/kmkuDDKKuR↵AluI7ZI6SGMjSlAwHwYDVR0jBBgwFoAUqSuH4c4kRzsbv8+FNwJVnQ2UWOYwggEF↵BgorBgEEAdZ5AgQCBIH2BIHzAPEAdgCHdb/nWXz4jEOZX73zbv9WjUdWNv9KtWDB↵tOr/XqCDDwAAAWpws/vGAAAEAwBHMEUCIFhVdRzoujCiB5KphCGP7AoCc6ztjsYU↵oPhi56ErZ+12AiEArO0WKB4khYFA9MZ30jgYfu8aTawZcjH6DpkiarOrHBUAdwDu↵S723dc5guuFCaR+r4Z5mow9+X7By2IMAxHuJeqj9ywAAAWpws/wlAAAEAwBIMEYC↵IQC/0bOTzFvmjeHybdLDMR6HA62ZCckiD1T+LCA7bpnTMwIhAMKkQ5MgEAePWDH8↵+uNrFqJ5+lGYTxMZ5FL+h21WGP/4MA0GCSqGSIb3DQEBCwUAA4IBAQBlRAclRRm8↵gF4u5wmX06BbsephSMRpN/v3jY1jRG95gvGTWqGe1wUpsU3y9vcFNfHUxrNhrpDR↵XrJlgp/f4zv7xZInUWhJTEqp0r7KrruOtVANcLc2KKLauUk4cGPoYQnR5XXSnTnR↵sHuFBwS6Tqmx2hYwNoTsjzJDrbH4BMtHrKVgnr6LedPUfQfZZMVrzBOb49LjocA7↵Jl/cepF0qU40kPsFrjCzRBfdRwqrN9uFMrXHPRhaHB89vR7DPtu3NmkcuiWyMII2↵sitTO4fmOXmNm+AP1pV1QnIddTh3q0ohH5LxqXujevVJ6+9jYPSk33hGIRcUCd84↵Xfusd8yj05QX↵-----END CERTIFICATE-----"
    pubkey: {type: "Buffer", data: Array(294)}
    raw: {type: "Buffer", data: Array(2121)}
    serialNumber: "7C0EAF06C2FF94578A6850BE"
    subject: {C: "US", ST: "California", L: "San Francisco", O: "Wikia, Inc.", CN: "*.wikia-services.com"}
    subjectaltname: "DNS:*.wikia-services.com, DNS:*.cursecdn.com, DNS:*.fandom-dev.pl, DNS:*.fandom-dev.us, DNS:*.fandom.com, DNS:*.fandom.wikia.com, DNS:*.gamepedia.com, DNS:*.gamepedia.io, DNS:*.minecraftwiki.net, DNS:*.nocookie.net, DNS:*.sandbox-adeng02.fandom.com, DNS:*.wikia-dev.com, DNS:*.wikia-dev.pl, DNS:*.wikia-dev.us, DNS:*.wikia-inc.com, DNS:*.wikia-staging.com, DNS:*.wikia.com, DNS:*.wikia.nocookie.net, DNS:*.wikia.org, DNS:*.wikiafanstudio.com, DNS:cursecdn.com, DNS:fandom-dev.pl, DNS:fandom-dev.us, DNS:fandom.com, DNS:gamepedia.com, DNS:gamepedia.io, DNS:minecraftwiki.net, DNS:sandbox-adeng02.fandom.com, DNS:wikia-dev.com, DNS:wikia-dev.pl, DNS:wikia-dev.us, DNS:wikia-inc.com, DNS:wikia-staging.com, DNS:wikia.com, DNS:wikia.org, DNS:wikiafanstudio.com, DNS:wikia-services.com"
    valid_from: "May  1 00:03:22 2019 GMT"
    valid_to: "Feb  9 13:26:17 2020 GMT"
}
*/