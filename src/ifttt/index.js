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
}

module.exports = Ifttt;