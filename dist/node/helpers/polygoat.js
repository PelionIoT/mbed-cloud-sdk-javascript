"use strict";
function polygoat(fn, cb) {
    if (cb) {
        fn(function (err, res) {
            cb(err, res);
        });
    }
    else {
        return new Promise(function (resolve, reject) {
            fn(function (err, res) {
                if (err !== null && err !== undefined) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
}
exports.polygoat = polygoat;
