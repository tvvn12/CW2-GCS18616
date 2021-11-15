

$(window).on('batterystatus', onBatteryStatus);
$(window).on('batterylow', onBatteryLow);
$(window).on('batterycritical', onBatteryCritical);

function onBatteryStatus(status) {
    alert(`Level: ${status.level}%. isPlugged: ${status.isPlugged}.`);
}

function onBatteryLow(status) {
    alert(`Battery Level Low ${status.level}%.`);
}

function onBatteryCritical(status) {
    alert(`Battery Level Critical ${status.level}%. Recharge Soon!`);
}


$(document).on('vclick', '#btn-cordova-beep', cordovaBeep);

function cordovaBeep() {
    navigator.notification.beep(4);
}


$(document).on('vclick', '#btn-cordova-vibration', cordovaVibration);

function cordovaVibration() {
    navigator.vibrate(1000, 1000, 1000, 3000, 3000, 3000, 1000, 1000, 1000);
}
