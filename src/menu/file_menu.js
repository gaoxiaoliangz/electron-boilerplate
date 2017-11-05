import { dialog, ipcMain } from "electron";

const fileMenu = {
  label: "File",
  submenu: [
    {
      label: 'Open',
      accelerator: "Cmd+O",
      click: () => {
        dialog.showOpenDialog((fileNames) => {
          ipcMain.emit('open-file-request', fileNames)
        })
      }
    }
  ]
};

export default fileMenu
