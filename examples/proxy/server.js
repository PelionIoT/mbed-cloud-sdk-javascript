var path = require('path');
var http = require('http');
var https = require('https');
var express = require('express');

var port = 8080;
var mbedHost = "api.us-east-1.mbedcloud.com";
var cookieKey = "mbedCloudKey";
var cookieHost = "mbedCloudHost";
var apiPath = "/api";
var loginPath = "/login";
var formKey = "key";
var ignoredHeaders = ["host", "cookie", "authorization"];
var app = express();

// Cookies!
function getApiKey(req) {
    var cookieArray = req.headers.cookie.split("; ");
    for (var i = 0; i < cookieArray.length; i++) {
        var parts = cookieArray[i].split("=");
        if (parts[0] === cookieKey) return parts[1];
    }
    return null;
}
function setApiKey(res, value) {
    var cookie = `${cookieKey}=${value}; ${cookieHost}=${apiPath}`;
    res.setHeader('Set-Cookie', cookie);
}

// Login
app.get(loginPath, (req, res, next) => {
    setApiKey(res, "");
    res.sendFile("login.html", { root: __dirname });
});
app.post(loginPath, (req, res, next) => {
    var data = "";
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
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
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
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
        host: mbedHost,
        path: req.url,
        method: req.method,
        headers: req.headers
    };
    options.headers["Authorization"] = `Bearer ${key}`;

    var proxy = https.request(options, response => {
        Object.keys(response.headers).forEach(header => {
            res.set(header, response.headers[header]);
        });
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
.listen(port, () => console.log(`Proxy server listening on port ${port}`));
