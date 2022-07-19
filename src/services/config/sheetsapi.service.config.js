
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const clientSecret = require('./auth/clientsecret');

const logger = require('npmlog');

const TOKEN_PATH = './src/services/config/auth/client-secret.json';
const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file'
];

/**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.function
     * @param {Object} data Conjunto de informações a serem inseridas ou utilizadas para filtro
     */
async function authorize(credentials, callback, data) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    try {
        oAuth2Client.setCredentials(clientSecret);
        const retorno = await callback(oAuth2Client, data);

        if (retorno.error) throw new error;

        return retorno;
    } catch (err) {
        return await getNewToken(oAuth2Client, callback);
    }
}

/**
    * Get and store new token after prompting for user authorization, and then
    * execute the given callback with the authorized OAuth2 client.
    * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
    * @param {getEventsCallback} callback The callback for the authorized client.
    */
async function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    logger.http('SHEETS', 'Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, async (err, token) => {
            if (err) {
                await inserirLog(auth, { status: "ERRO", data: JSON.stringify(err) })
                return { message: 'Error while trying to retrieve access token', error: err };
            }
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return { message: 'Write file error', error: err };
                logger.http('SHEETS', 'Token stored to', TOKEN_PATH);
            });
            return await callback(oAuth2Client);
        });
    });
}

module.exports = {
    authorize
};
