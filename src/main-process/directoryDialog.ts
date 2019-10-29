import { ipcMain, dialog, IpcMessageEvent } from "electron";
import { directoryDialogEvents } from "../common/Events";
import { IpcMainReceive } from "vue-ipc-decorator";

class OpenDirectory {
  @IpcMainReceive()
  async openDirectory() {
    return new Promise<string[]>(resolve => {
      dialog.showOpenDialog(
        {
          properties: ["openDirectory"]
        },
        (filePaths?: string[], _bookmarks?: string[]): void => {
          if (filePaths) {
            resolve(filePaths);
          }
        }
      );
    });
  }
}

const openDirectory = new OpenDirectory();
