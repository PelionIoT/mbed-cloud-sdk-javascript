import { ConnectApi } from "./src";

const connect = new ConnectApi({
    autostartNotifications: true,
    apiKey: "ak_1MDE2ZjE4YzA4YjU2OTI1YWFiNDc0ODJkMDAwMDAwMDA017154289e8cee18ba36734b00000000XXjxaXBAZTkvipuYMMs5EGilVQaincgj",
});

connect.setResourceValue("123", "1/2/3", 123).then(x => console.log(x));
