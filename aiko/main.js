const {app, BrowserWindow, dialog, ipcMain} = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        title: 'aiko',
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.loadFile('./aiko/index.html');
}

const exception = (e) => {
    dialog.showMessageBox({message: 'AikoScript exception', detail: e})
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
})

ipcMain.on('asynchronous-message', (event, arg) => {
    switch(arg[0]) {
        case 'confignotfound':
            dialog.showMessageBox({message: 'config directory not found', detail: 'Aiko couldn\'t find a config directory. This is normally ~/.aiko.\nThis is normal if this is your first time starting up Aiko.\nAiko will create a new config directory for you.'})
            break;
        case 'invalidcmd':
            exception(`FATAL ERROR: invalid command "${arg[1]}"`)
            break;
        case 'directorynotfound':
            exception(`FATAL ERROR: chdir: directory "${arg[1]}" not found`)
            break;
        case 'rmfilenotfound':
            exception(`FATAL ERROR: rm: file "${arg[1]}" not found`)
            break;
        case 'folderexists':
            exception(`FATAL ERROR: mkdir: folder "${arg[1]}" already exists`);
            break;
        case 'filenotfound':
            exception(`FATAL ERROR: open: file "${arg[1]}" not found`);
            break;
        default:
            // pass
    }
})

ipcMain.handle('echo', (e, message) => {
    dialog.showMessageBox({ message });
})

ipcMain.handle('directorynotfound', (e, msg) => {
    exception(`FATAL ERROR: chdir: directory "${msg}" not found`);
})