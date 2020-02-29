const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 760,
        width: 1024
    });

    mainWindow.loadURL('http://localhost:3000');
    // mainWindow.loadURL(`file://${__dirname}/build/index.html`);
})