var express = require('express');
var bitcoindacapp = express();

bitcoindacapp.configure(function() {
    bitcoindacapp.use(express.static(__dirname + '/public'));
});

bitcoindacapp.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
bitcoindacapp.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});