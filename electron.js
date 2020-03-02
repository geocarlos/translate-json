const { app, BrowserWindow, ipcMain } = require('electron');
const language = require('./src/functions/language');
const entry = require('./src/functions/entry');
const translation = require('./src/functions/translation');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 760,
        width: 1024,
        webPreferences: {
            nodeIntegration: true,
            backgroundThrottling: false
        }
    });



    mainWindow.loadURL('http://localhost:3000');
    // mainWindow.loadURL(`file://${__dirname}/build/index.html`);
});

ipcMain.on('languages:add', async (event, data) => {
    try {
        const result = await language.addLanguage(data.code, data.name);
        mainWindow.webContents.send('language:added', result.dataValues);
    } catch (eror) {
        mainWindow.webContents.send('language:addFailed', error);
    }
});

ipcMain.on('languages:fetch', async (event, data) => {
    try {
        const result = await language.getLanguages();
        const languages = Object.values(result).map(language => language.dataValues);
        mainWindow.webContents.send('languages:receive', languages);
    } catch (eror) {
        mainWindow.webContents.send('languages:fetchFailed', error);
    }
});

ipcMain.on('entries:add', async (event, data) => {
    try {
        const result = await entry.addEntry(data.key, data.language, data.content, data.description);
        mainWindow.webContents.send('entry:added', result.dataValues);
    } catch (eror) {
        mainWindow.webContents.send('entry:addFailed', error);
    }
});

ipcMain.on('entriesFromFile:add', async (event, entries) => {
    console.log(entries);
    try {
        for(const data of entries) {
            const result = await entry.addEntry(data.key, data.language, data.content, data.description);
            mainWindow.webContents.send('entry:added', result.dataValues);
        }
    } catch (error) {
        mainWindow.webContents.send('entry:addFailed', error);
    }
});

ipcMain.on('entries:fetch', async (event, data) => {
    try {
        const result = await entry.getEntries();
        const entries = Object.values(result).map(entry => entry.dataValues);
        mainWindow.webContents.send('entries:receive', entries);
    } catch (error) {
        mainWindow.webContents.send('entries:fetchFailed', error);
    }
});

ipcMain.on('translations:add', async (event, data) => {
    try {
        const result = await translation.addTranslation(data.source, data.target);
        mainWindow.webContents.send('translation:added', result.dataValues);
    } catch (error) {
        mainWindow.webContents.send('translation:addFailed', error);
    }
});

ipcMain.on('translations:fetch', async (event, data) => {
    try {
        const result = await translation.getTranslations();
        const translations = Object.values(result).map(translation => translation.dataValues);
        mainWindow.webContents.send('translations:receive', translations);
    } catch (error) {
        mainWindow.webContents.send('translations:fetchFailed', error);
    }
});