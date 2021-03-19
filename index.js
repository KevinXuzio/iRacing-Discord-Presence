var irsdk = require('node-irsdk')
var iracing = irsdk.getInstance()

const RPC = require("discord-rpc");
const rpc = new RPC.Client({
    transport: "ipc"
})

rpc.on("ready", () =>{
    iracing.on('SessionInfo', function (evt) {
        console.log(evt.data.WeekendInfo.TrackDisplayName);
        console.log(evt.data.WeekendInfo.EventType);
        rpc.setActivity({
            details: evt.data.WeekendInfo.TrackDisplayName,
            state: evt.data.WeekendInfo.EventType,
            startTimestamp: new Date(),
            largeImageKey: "logo",
            largeImageText: "iRacing Simulator"
        })
    })
    console.log("rpc active");
    iracing.on('Disconnected', function (evt) {
        rpc.clearActivity();
        console.log("disconnected");
    })
});

rpc.login({
    clientId: "822293878048292915"
})