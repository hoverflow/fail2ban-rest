/* fail2ban REST API server
 *  written for simply add/remove IPs from ban list from any application indipendent from the technogy used.
 *
 *  (c)2018 hoverflow
 */

var express = require('express');
var app = express();
var config = require('./config.json');
const {
    exec
} = require('child_process');

var banstring = ' set fail2ban-rest banip ';
var unbanstring = ' set fail2ban-rest unbanip ';

function sendBadRequest(res) {
    res.status(400).end('Bad request');
}

function banUnbanIP(ban, ip, res) {
    if (ban) {
        exec(config.fail2ban_cli + banstring + ip, function (err, stdout, stderr) {
            if (err) {
                console.error(err);
                res.status(500).end('Internal server error.');
            } else {
                console.log('ban ip response', stdout);
                res.status(200).end('Ok');
            }
        });
    } else {
        exec(config.fail2ban_cli + unbanstring + ip, function (err, stdout, stderr) {
            if (err) {
                console.error(err);
                res.status(500).end('Internal server error.');
            } else {
                console.log('unban ip response', stdout);
                res.status(200).end('Ok');
            }
        });
    }
}


app.get('/ban/:ip', function (req, res) {
    if (req.params.ip) {
        console.log('ban request for ', req.params.ip);
        if (/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(req.params.ip)) {
            console.log('valid IP');
            banUnbanIP(true, req.params.ip, res);
        } else {
            console.log('invalid IP');
            sendBadRequest(res);
        }

    } else {
        sendBadRequest(res);
    }
});

app.get('/unban/:ip', function (req, res) {
    if (req.params.ip) {
        console.log('unban request for ', req.params.ip);
        if (/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(req.params.ip)) {
            console.log('valid IP');
            banUnbanIP(false, req.params.ip, res);
        } else {
            console.log('invalid IP');
            sendBadRequest(res);
        }

    } else {
        sendBadRequest(res);
    }
});

app.all('*', function (req, res) {
    sendBadRequest(res);
});

app.listen(config.listenport);