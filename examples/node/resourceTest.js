var MbedCloudSDK = require("../../index");
var config = require("./config");

var connect = new MbedCloudSDK.ConnectApi(config);

return connect.listConnectedDevices()
    .then(devices => {
        const device = devices.data[0];

        connect.setResourceValue(device.id, "/3201/0/5853", "setResourceTestt")
            .then(r => {
                console.log("hello");
                console.log(r);
            })
            .catch(e => {
                console.log(e);
            })

        // connect.getResourceValue(device.id, "/3201/0/5853")
        //     .then(value => {
        //         console.log(value);
        //     })
        //     .catch(e => {
        //         console.log(e);
        //     });
    });
