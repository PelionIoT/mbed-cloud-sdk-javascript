/*
* Pelion Device Management JavaScript SDK
* Copyright Arm Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var path = require("path");
var http = require("http");
var https = require("https");
var exec = require("child_process").exec;
try {
    var express = require("express");
} catch(e) {}

if (!express) {
    console.log("The proxy requires the 'express' server. Please install it by running 'npm install express'");
    process.exit();
}

var port = 8080;
var pelionHost = "api.us-east-1.mbedcloud.com";
var cookieKey = "cloudKey";
var cookieHost = "cloudHost";
var apiPath = "/api";
var loginPath = "/login";
var formKey = "key";
var ignoredHeaders = ["host", "cookie", "authorization"];
var app = express();

// Cookies!
function getApiKey(req) {
    if (!req.headers.cookie) return null;

    var cookieArray = req.headers.cookie.split("; ");
    for (var i = 0; i < cookieArray.length; i++) {
        var parts = cookieArray[i].split("=");
        if (parts[0] === cookieKey) return parts[1];
    }
    return null;
}
function setApiKey(res, value) {
    res.cookie(cookieHost, apiPath, {
        encode: function(value) { return value; }
    });
    res.cookie(cookieKey, value, {
        encode: function(value) { return value; }
    });
}

// Login
app.get(loginPath, (req, res, next) => {
    setApiKey(res, "");
    res.sendFile("login.html", { root: __dirname });
});
app.post(loginPath, (req, res, next) => {
    var data = "";
    req.on("data", chunk => data += chunk);
    req.on("end", () => {
        var formData = {};
        data.split("/n").forEach(line => {
            var parts = line.split("=");
            formData[parts[0]] = parts[1];
        });
        var key = formData[formKey];
        setApiKey(res, key);
        res.redirect("/");
    });
});

// Cookie "auth" protection
app.use((req, res, next) => {
    var key = getApiKey(req);
    if (key === null || key === "") res.redirect(loginPath);
    else next();
});

// Static file support
app.use(express.static(process.cwd(), { index: "/examples/proxy/index.html" }));

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Proxy
app.use(apiPath, (req, res, next) => {
    var key = getApiKey(req);
    ignoredHeaders.forEach(header => {
        delete req.headers[header];
    });

    var options = {
        host: pelionHost,
        path: req.url,
        method: req.method,
        headers: req.headers
    };
    options.headers["Authorization"] = `Bearer ${key}`;

    var proxy = https.request(options, response => {
        Object.keys(response.headers).forEach(header => {
            res.set(header, response.headers[header]);
        });

        res.statusCode = response.statusCode;
        res.statusMessage = response.statusMessage;

        response.pipe(res, {
            end: true
        });
    });

    req.pipe(proxy, {
        end: true
    });
});

// Start server
http.createServer(app)
.listen(port, () => {
    var url = `http://localhost:${port}`;
    console.log(`Proxy server listening at ${url}`);

    var cmd = path.join(__dirname, "xdg-open");
    if (process.platform === "darwin") cmd = "open";
    else if (process.platform === "win32") cmd = `start ""`;

    exec(`${cmd} ${url}`);
});
