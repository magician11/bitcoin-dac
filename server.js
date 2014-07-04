var express = require('express');
var nodemailer = require('nodemailer');

var bitcoindacApp = express();

// set root of frontend
bitcoindacApp.configure(function() {
    bitcoindacApp.use(express.static(__dirname + '/public'));
});

// api start ---------------------------------------------------------------------
// send an email
bitcoindacApp.get('/email', function(req, res) {

    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASSWORD
        }
    });

    var mailOptions = {
        from: "DAC <system@bitcoindac.com>",
        to: process.env.EMAIL_RECIPIENT,
        subject: "System notification",
        html: "<h1>Hey you!</h1><br><p>Someone accessed the email API at " + new Date() + "</p>"
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error.message);
            res.json({error: error});
        }else{
            console.log("Message sent: " + response.message);
            res.json({success: response});
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