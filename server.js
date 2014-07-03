var express = require('express');
var nodemailer = require('nodemailer');
var fs = require('fs');

var bitcoindacApp = express();

// set root of frontend
bitcoindacApp.configure(function() {
    bitcoindacApp.use(express.static(__dirname + '/public'));
});

// load config file
var bitcoindacConfig = JSON.parse(fs.readFileSync('bitcoindac_config.json'));

// api start ---------------------------------------------------------------------
// send an email
bitcoindacApp.get('/email', function(req, res) {

    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: bitcoindacConfig.emailAuth.user,
            pass: bitcoindacConfig.emailAuth.password
        }
    });

    var mailOptions = {
        from: "Michelle Yummy <foo@blurdybloop.com>",
        to: "andrewgolightly11@gmail.com",
        subject: "Hello xx",
        html: "<b>Hey!</b><br><h1>love you</h1>"
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.send("Error: " + error.message);
        }else{
            console.log("Message sent: " + response.message);
            res.send("Message sent: " + response.message);
        }

        smtpTransport.close();
    });
});

bitcoindacApp.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

// end of api ---------------------------------------------------------------------

// start the server
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
bitcoindacApp.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});