const { app, BrowserView, BrowserWindow } = require('electron');
const path = require('node:path')

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 900,
        height: 700,
        frame: true,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: 'blue',
            height: 30,
            width:500,
        },
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    const view = new BrowserView();
    win.setBrowserView(view);
    view.setBounds({ x: 0, y: 0, width: win.getSize()[0], height: win.getSize()[1] });
    view.webContents.loadURL('https://redowan.mercegrower.com');

    // Listen for the window resize event
    win.on('resize', () => {
        const [width, height] = win.getSize();
        view.setBounds({ x: 0, y: 0, width, height });
    });

    // Listen for the enter-full-screen event
    win.on('enter-full-screen', () => {
        const [width, height] = win.getSize();
        view.setBounds({ x: 0, y: 0, width, height });
    });
}

app.whenReady().then(createWindow);

app.on('closed', () => {
    app.quit();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
