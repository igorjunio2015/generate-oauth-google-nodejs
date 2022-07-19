const SheetsApi = require("./services/config/sheetsapi.service.config");
const credentials = require('./services/config/auth/credentials');
const { google } = require('googleapis');

getListaTodaPlanilha();

/**
 * @returns lista das linhas da planilha
 */
async function getListaTodaPlanilha() {
    try {
        const listagemTodaPlanilha = await SheetsApi.authorize(credentials, listaTodaPlanilha);
        console.log(listagemTodaPlanilha)
    } catch (err) {
        console.log("Error-get-lista-planilha", err.message)
        return err;
    }
}

/**
 * @see https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function listaTodaPlanilha(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    const range = 'CONFIG!A2:B'; // Colocar o nome da aba que deseja retornar os valores

    return await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range
    }).then(async (res) => {
        const rows = res.data.values;
        if (rows.length) {
            return {
                error: false,
                data: rows
            }
        } else {
            return {
                error: false,
                data: 'No data.'
            }
        }
    }).catch(async (err) => {
        return {
            error: true,
            data: 'The API returned an error: ' + err.message
        }
    });
}