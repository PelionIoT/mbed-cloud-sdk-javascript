var Access = require('../dist/node/main').Access;
var config = require('./config');

function log(message) {
    console.log(message);
}

var access = new Access(config);

access.getUsers(null, null, null, null, null, function(err, users) {
    users.forEach(user => {
        log(user.full_name);
    });
});

access.getUsers()
.then(users => {
    users.forEach(user => {
        log(user.full_name);
    });
});
