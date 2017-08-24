/*
* Mbed Cloud JavaScript SDK
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

// https://github.com/umdjs/umd
(function (root, factory) {
    if (typeof define === "function" && define.amd) define(factory);
    else if (typeof exports === "object") module.exports = factory();
    else root.config = factory(root);
}(this, function(root) {

	var cookieKey = "cloudKey";
	var cookieHost = "cloudHost";
	var queryKey = "apiKey";
	var queryHost = "host";

	// Parse cookies
	function parseCookies() {
		var cookies = {};
		var cookie = root.cookie || (root.document ? root.document.cookie || "" : "");
		var cookieArray = cookie.split("; ");

		for (var i = 0; i < cookieArray.length; i++ ) {
			var parts = cookieArray[i].split("=");
			cookies[parts[0]] = parts[1];
		}

		return cookies;
	}

	// Parse query string
	function parseQueryString() {
		if (!root.location) return {};

		var args = {};
		var vars = root.location.search.substring(1).split("&");

		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair.length === 2) args[pair[0]] = pair[1];
			else if (i === 0) args[queryKey] = pair[0];
			else if (i === 1) args[queryHost] = pair[0];
		}

		return args;
	}

	// Default configuration
	var config = {
		apiKey: "<Mbed Cloud API Key>",
		host: "https://api.us-east-1.mbedcloud.com"
	};

	// Overwrite with any cookie variables
	var cookies = parseCookies();
	if (cookies[cookieKey]) config.apiKey = cookies[cookieKey];
	if (cookies[cookieHost]) config.host = cookies[cookieHost];

	// Overwrite with any query variables
	var args = parseQueryString();
	if (args[queryKey]) config.apiKey = args[queryKey];
	if (args[queryHost]) config.host = args[queryHost];

	return config;
}));
