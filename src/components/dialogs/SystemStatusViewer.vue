<template>
  <v-dialog max-width="80vw" width="auto" v-model="dialog">
    <v-card>
      <v-card-title>{{ $tc($i18nHint.systemStatusViewer.title) }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <line-chart
              title="Renderer Process"
              :callback="cpuUsageCallback"
              :displayRange="30000"
              :interval="500"
              :valueFormatter="percentFormatter"
              :height="200"
            ></line-chart>
          </v-col>
          <v-col>
            <line-chart
              title="Main Process"
              :callback="mainProcessCpuUsage"
              :displayRange="30000"
              :interval="500"
              :valueFormatter="percentFormatter"
              :height="200"
            ></line-chart>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue } from "vue-property-decorator";
import LineChart from "@/components/parts/LineChart.vue";
import { IpcRendererSend } from "vue-ipc-decorator";
@Component({
  components: {
    LineChart
  }
})
export default class SystemStatusViewer extends Vue {
  @Model("input", { type: Boolean, default: false })
  private readonly active!: boolean;
  get dialog() {
    return this.active;
  }
  set dialog(v: boolean) {
    this.$emit("input", v);
  }
  cpuUsageCallback() {
    return process.getCPUUsage().percentCPUUsage;
  }
  @IpcRendererSend()
  mainProcessCpuUsage() {}
  percentFormatter(v: string) {
    return (
      Number(v)
        .toFixed(1)
        .toString() + "%"
    );
  }
}
</script>
