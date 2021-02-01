"use strict";

import { app, protocol, BrowserWindow, ipcMain, Menu } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import * as os from "os";
import macosRelease from "macos-release";

const isDevelopment = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    minHeight: 500,
    minWidth: 780,
    show: false,
    transparent: true,
    vibrancy: "ultra-dark",
    titleBarStyle:
      isMac && macosRelease(os.release()).name == "Big Sur"
        ? "hidden"
        : "hiddenInset",
    trafficLightPosition: { x: 19, y: 35 },
    frame: true,
    webPreferences: {
      zoomFactor: 0.9,
      enableRemoteModule: true,
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env
        .ELECTRON_NODE_INTEGRATION as unknown) as boolean
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST)
      win.webContents.openDevTools({ mode: "undocked" });
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  //win.webContents.setZoomFactor(0.9);


  // Setup menu bar webContents
  if (isMac) {
    Menu.getApplicationMenu()!.getMenuItemById('preferences').click = () => {
      win.webContents.send('preferences')
    }
  }


  win.maximize();
  setTimeout(function () {
    win.show();
  }, 200);
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  const template = [
    // { role: 'appMenu' }
    ...(isMac
      ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            {
              id: "preferences",
              label: "Preferences",
              accelerator: "Cmd+,",
              enabled: false
            },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideothers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" }
          ]
        }
      ]
      : []),
    // { role: 'fileMenu' }
    {
      label: "File",
      submenu: [
        {
          id: "export",
          label: "Export",
          accelerator: "CmdOrCtrl+e",
          click() {
            console.log("Clicked");
          }
        },
        isMac ? { role: "close" } : { role: "quit" }
      ]
    },
    // { role: 'editMenu' }
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...(isMac
          ? [
            { role: "delete" },
            { role: "selectAll" },
            { type: "separator" },
            {
              label: "Speech",
              submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }]
            }
          ]
          : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }])
      ]
    },
    /*
    {
      label: "Patient",
      submenu: [
        {
          id: 'patient-visit',
          label: "Record a New Visit",
          accelerator: 'CmdOrCtrl+d',
          click() {
            console.log("Clicked")
          }
        },
        {
          id: 'patient-diagnosis',
          label: "Record a New Diagnosis",
          accelerator: 'CmdOrCtrl+shift+d',
          click() {
            console.log("Clicked")
          }
        },
        { type: 'separator' },
        {
          id: 'patient-referal',
          label: "Create a New Referal",
          accelerator: 'CmdOrCtrl+k',
          click() {
            console.log("Clicked")
          }
        }
      ]
    },
    */
    // { role: 'viewMenu' }
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...(isMac
          ? [
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" }
          ]
          : [{ role: "close" }])
      ]
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://electronjs.org");
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template as any);
  Menu.setApplicationMenu(menu);

  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }

  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
