function isNumber(value) {
    return typeof value === "number" && !isNaN(value);
}

function isString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

exports.validateVehiclePayload = (data) => {
    const errors = [];

    if (!isString(data.vehicleId)) errors.push("vehicleId is required");
    if (!isNumber(data.soc)) errors.push("soc must be a number");
    if (!isNumber(data.kwhDeliveredDc)) errors.push("kwhDeliveredDc must be a number");
    if (!isNumber(data.batteryTemp)) errors.push("batteryTemp must be a number");
    if (!data.timestamp) errors.push("timestamp is required");

    return errors;
};

exports.validateMeterPayload = (data) => {
    const errors = [];

    if (!isString(data.meterId)) errors.push("meterId is required");
    if (!isNumber(data.kwhConsumedAc)) errors.push("kwhConsumedAc must be a number");
    if (!isNumber(data.voltage)) errors.push("voltage must be a number");
    if (!data.timestamp) errors.push("timestamp is required");

    return errors;
};
