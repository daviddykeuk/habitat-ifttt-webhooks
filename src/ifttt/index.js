const assert = require('assert');
const request = require('request');

var Ifttt = function(args) {
    assert(args.webhookKey);
    this.webhookKey = args.webhookKey;
}

Ifttt.prototype.fireEvent = function(args) {
    var self = this;
    assert(args.eventName);

    var url = "https://maker.ifttt.com/trigger/" +
        args.eventName +
        "/with/key/" +
        self.webhookKey;

    var body = {
        value1: args.message
    }

    var post = {
        url: url,
        method: "POST",
        json: body
    }

    request(post, (err, resp) => {
        if (err) {
            console.log("Webhook didn't fire");
        } else {
            console.log("Webhook fired");
        }
    });

    // testing zapier
    var zap = {
        url: "https://hooks.zapier.com/hooks/catch/1296506/rl71ws/",
        method: "POST",
        json: {
            message: args.message
        }
    }

    request(zap, (err, resp) => {
        if (err) {
            console.log("Zap didn't fire");
        } else {
            console.log("Zap fired");
        }
    });
}

module.exports = Ifttt;