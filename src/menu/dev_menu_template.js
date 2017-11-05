import { app, BrowserWindow, dialog } from "electron";

export const devMenuTemplate = {
  label: "Development",
  submenu: [
    {
      label: 'Open',
      accelerator: "Cmd+O",
      click: () => {
        // console.log(remote)
        dialog.showOpenDialog((fileNames) => {
          console.log(fileNames)
        })
      }
    },
    {
      label: "Reload",
      accelerator: "CmdOrCtrl+R",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
      }
    },
    {
      label: "Toggle DevTools",
      accelerator: "Alt+CmdOrCtrl+I",
      click: () => {
        BrowserWindow.getFocusedWindow().toggleDevTools();
      }
    },
    {
      label: "Quit",
      accelerator: "CmdOrCtrl+Q",
      click: () => {
        app.quit();
      }
    }
  ]
};
