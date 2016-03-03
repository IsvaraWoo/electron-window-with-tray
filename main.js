const electron = require('electron'); // Load electron.
const app = electron.app;             // App that controls application life.
const Menu = electron.Menu;           // Function that used to create menu.
const Tray = electron.Tray;           // Function that used to create tray.
const BrowserWindow = electron.BrowserWindow;  // function that used to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
// Indicate app is running or exiting;
var running = 1;
var appTray = null;

// This method will be called when Electron has finished
// initialization and is ready to create a tray.
app.on('ready', function(){
  // Create a tray with given icon.
  appTray = new Tray('./app.ico');
  // Create contextMenu with menu items.
  var contextMenu = Menu.buildFromTemplate([{
      label: 'Exit',
      type: 'normal',
      // Handler for click event.
      click: function() {
        // Reset running flag.
        running = 0;

        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform != 'darwin') {
          app.quit();
        }
      }
    }
  ]);
  // Tooltip of tray when cursor over the tray icon.
  appTray.setToolTip('This is my application.');
  // Bind contextMenu to tray.
  appTray.setContextMenu(contextMenu);

  // Show mainWindow when tray is clicked.
  appTray.on('click', function() {
    // Create browser window when mainWindow is never initialized.
    if(!mainWindow) {
      mainWindow = new BrowserWindow({
        width: 800, 
        height: 600,
        frame: false
      });
      // Hide the menu.
      mainWindow.setMenu(null);
      // Load the index.html of the app.
      mainWindow.loadURL('file://' + __dirname + '/index.html');

      // Emitted when the window will be closed.
      mainWindow.on('close', function(e) {
        // Only hide mainWindow when app running.
        if (running) {
          mainWindow.hide();
          e.preventDefault();
        }
      });
    }
    // Show mainWindow.
    mainWindow.show();
  });

});
