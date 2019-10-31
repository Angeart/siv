import { IpcMainReceive } from "vue-ipc-decorator";

class SystemInfo {
  @IpcMainReceive()
  async mainProcessCpuUsage() {
    return process.getCPUUsage().percentCPUUsage;
  }
}

const systemInfo = new SystemInfo();
