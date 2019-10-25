import { ipcMain, dialog, IpcMessageEvent } from "electron";
import { directoryDialogEvents } from "../common/Events";
import { IpcMainReceive } from "vue-ipc-decorator";

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

class OpenDirectory {
  @IpcMainReceive()
  async openDirectory() {
    return new Promise(resolve => {
      dialog.showOpenDialog(
        {
          properties: ["openDirectory"]
        },
        (filePaths?: string[], bookmarks?: string[]): void => {
          if (filePaths) {
            resolve(filePaths);
          }
        }
      );
    });
  }
}
