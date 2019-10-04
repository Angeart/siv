import { ipcMain, dialog, IpcMessageEvent } from "electron";

ipcMain.on("open-directory-dialog", (event: IpcMessageEvent, args: any[]) => {
  dialog.showOpenDialog(
    {
      properties: ["openDirectory"]
    },
    (filePaths?: string[], bookmarks?: string[]): void => {
      if (filePaths) {
        event.sender.send("slected-directory", filePaths);
      }
    }
  );
});
