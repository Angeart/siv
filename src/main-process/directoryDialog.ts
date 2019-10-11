import { ipcMain, dialog, IpcMessageEvent } from "electron";
import { directoryDialogEvents } from "../common/Events";

ipcMain.on(
  directoryDialogEvents.openDirectoryDialog,
  (event: IpcMessageEvent, args: any[]) => {
    dialog.showOpenDialog(
      {
        properties: ["openDirectory"]
      },
      (filePaths?: string[], bookmarks?: string[]): void => {
        if (filePaths) {
          event.sender.send(directoryDialogEvents.selectedDirectory, filePaths);
        }
      }
    );
  }
);
