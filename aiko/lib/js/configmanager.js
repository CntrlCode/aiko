const {ipcRenderer} = require('electron');
const {existsSync, mkdir, appendFile, unlink, readFile, writeFile, write} = require('fs');
const {homedir} = require('os');
const {join} = require('path');

document.addEventListener('DOMContentLoaded', () => {
    if(!existsSync(join(homedir(), '.aiko'))) {
        ipcRenderer.send('asynchronous-message', ['confignotfound', 'placeholder']);
        mkdir(join(homedir(), '.aiko'), (err) => {
            if(err) {
                console.error(err);
            }
        });
    }
})