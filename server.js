var express = require('express');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
server.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});