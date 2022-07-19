const fs = require('fs');

var clientSecret = undefined;

try {
    clientSecret = JSON.parse(fs.readFileSync('./src/services/config/auth/client-secret.json'));
} catch (error) {
    console.log("clientSecret", error.message)
}

module.exports = clientSecret