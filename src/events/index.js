exports.registerEvents = function(eventListener, iftttEmitter) {
    eventListener.on("train-monitor.trains.late", function(payload) {
        var validTrains = 0;

        var message = "";

        payload.forEach((train) => {
            if (train.aimed_departure_time > "07:20" && train.aimed_departure_time < "08:00" && train.destination_name === "London Cannon Street") {
                validTrains++;
                message += train.aimed_departure_time;
                message += " (";
                message += train.expected_departure_time;
                message += "), ";
            }
        });

        message = message.substring(0, message.length - 2);
        if (validTrains > 0) {
            var startOfMessage = "The following train" + (validTrains > 1 ? "s are" : " is") + " late: ";
            message = startOfMessage + message;
            iftttEmitter.fireEvent({ eventName: "trains.late", message: message })
        } else {
            console.log("It's just not the right time, it's not you, it's me.")
        }
    });

    eventListener.on("train-monitor.trains.cancelled", function(payload) {
        var validTrains = 0;

        var message = "";

        payload.forEach((train) => {
            if (train.aimed_departure_time > "07:20" && train.aimed_departure_time < "08:00" && train.destination_name === "London Cannon Street") {
                validTrains++;
                message += train.aimed_departure_time;
                message += ", ";
            }
        });

        message = message.substring(0, message.length - 2);

        if (validTrains > 0) {
            var startOfMessage = "The following train" + (validTrains > 1 ? "s have" : " has") + " been cancelled: ";
            message = startOfMessage + message;
            iftttEmitter.fireEvent({ eventName: "trains.late", message: message })
        } else {
            console.log("It's just not the right time, it's not you, it's me.")
        }
    });

    eventListener.on("train-monitor.trains.ontime", function(payload) {
        var validTrains = 0;

        var message = "";

        payload.forEach((train) => {
            if (train.aimed_departure_time > "07:20" && train.aimed_departure_time < "08:00" && train.destination_name === "London Cannon Street") {
                validTrains++;
                message += train.aimed_departure_time;
                message += ", ";
            }
        });

        message = message.substring(0, message.length - 2);

        if (validTrains > 0) {
            var startOfMessage = "The following train" + (validTrains > 1 ? "s are" : " is") + " on time again: ";
            message = startOfMessage + message;
            iftttEmitter.fireEvent({ eventName: "trains.late", message: message })
        } else {
            console.log("It's just not the right time, it's not you, it's me.")
        }
    });
}