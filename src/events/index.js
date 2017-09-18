exports.registerEvents = function(eventListener, iftttEmitter) {
    eventListener.on("train-monitor.trains.late", function(payload) {
        var validTrains = 0;

        var message = "The following trains are late: ";

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
            iftttEmitter.fireEvent({ eventName: "trains.late", message: message })
        } else {
            console.log("It's just not the right time, it's not you, it's me.")
        }
    });

    eventListener.on("train-monitor.trains.cancelled", function(payload) {
        var validTrains = 0;

        var message = "The following trains have been cancelled: ";

        payload.forEach((train) => {
            if (train.aimed_departure_time > "07:20" && train.aimed_departure_time < "08:00" && train.destination_name === "London Cannon Street") {
                validTrains++;
                message += train.aimed_departure_time;
                message += ", ";
            }
        });

        message = message.substring(0, message.length - 2);

        if (validTrains > 0) {
            iftttEmitter.fireEvent({ eventName: "trains.late", message: message })
        } else {
            console.log("It's just not the right time, it's not you, it's me.")
        }
    });

    eventListener.on("train-monitor.trains.ontime", function(payload) {
        var validTrains = 0;

        var message = "The following trains are on time again: ";

        payload.forEach((train) => {
            if (train.aimed_departure_time > "07:20" && train.aimed_departure_time < "08:00" && train.destination_name === "London Cannon Street") {
                validTrains++;
                message += train.aimed_departure_time;
                message += ", ";
            }
        });

        message = message.substring(0, message.length - 2);

        if (validTrains > 0) {
            iftttEmitter.fireEvent({ eventName: "trains.late", message: message })
        } else {
            console.log("It's just not the right time, it's not you, it's me.")
        }
    });
}