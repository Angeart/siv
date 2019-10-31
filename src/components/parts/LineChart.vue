<template>
  <div style="will-change: contents">
    <span class="subtitle-1">{{ title }}</span>
    <span class="ma-2">{{ valueFormatter(this.value) }}</span>
    <apexchart
      ref="realtimeChart"
      type="area"
      :options="chartOptions"
      :series="series"
      :height="height"
    ></apexchart>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Model, Mixins, Vue } from "vue-property-decorator";
import colors from "vuetify/lib/util/colors";
import Color from "color";
import * as moment from "moment";
@Component
export default class LineChart extends Vue {
  @Prop({ type: Number, default: 300 }) private readonly height!: number;
  @Prop({ type: String, default: "chart" }) private readonly title!: string;
  @Prop({
    type: String,
    default: colors.lightBlue.lighten3
  })
  private readonly lineColor!: string;
  @Prop({ type: Number, default: 0 }) private readonly minY!: number;
  @Prop({ type: Number, default: 100 }) private readonly maxY!: number;
  @Prop({
    type: Number,
    default: moment.duration(1, "minute").asMilliseconds()
  })
  private readonly displayRange!: number;
  @Prop({
    type: Function,
    default: () => {
      return null;
    }
  })
  private callback!: () => any | null;
  @Prop({
    type: Function,
    default: (v: string) => v
  })
  private readonly valueFormatter!: (v: string) => string;
  @Prop({ type: Number, default: 1000 }) private readonly interval!: number;
  private readonly baseTick = moment.duration(1, "second").asMilliseconds();
  private data: any[] = [];
  private series: any[] = [];
  private value: number = 0;

  private lastDate: number = 0;
  private chartOptions = {
    chart: {
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: this.interval
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight",
      width: 1
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },
    tooltip: {
      enabled: false
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: "datetime",
      range: this.displayRange,
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        show: false
      }
    },
    yaxis: {
      max: 100,
      min: 0,
      tickAmount: 4,
      axisBorder: {
        show: true,
        color: this.lineColor
      },
      axisTicks: {
        show: true,
        color: this.lineColor
      },
      labels: {
        formatter: (v: string) =>
          Number(v)
            .toFixed()
            .toString()
      }
    },
    // legend: {
    //   show: false
    // }
    theme: {
      palette: "blue",
      monochrome: {
        enabled: true,
        color: this.lineColor,
        shadeTo: "light",
        shadeIntensity: 0.65
      }
    }
  };

  created() {
    this.lastDate = new Date("11 Feb 2017 GMT").getTime();
    this.series = [{ text: "test", data: this.data.slice() }];
  }
  mounted() {
    this.update();
  }

  public async getNewSeries(baseval: number) {
    var newDate = baseval + this.baseTick;
    this.lastDate = newDate;
    this.value = (await this.callback()) || 0;
    // Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    this.data.push({
      x: newDate,
      y: this.value
    });
  }
  private resetData() {
    const requireNum = this.displayRange / this.interval;
    this.data = this.data || [];
    this.data.splice(0, this.data.length - requireNum);
  }
  public update() {
    setInterval(async () => {
      if (!this.$refs.realtimeChart) {
        return;
      }
      await this.getNewSeries(this.lastDate);
      (this.$refs.realtimeChart as any).updateSeries([
        {
          data: this.data.slice()
        }
      ]);
    }, this.interval);
    setInterval(() => {
      this.resetData();
      if (!this.$refs.realtimeChart) {
        return;
      }
      (this.$refs.realtimeChart as any).updateSeries(
        [
          {
            data: this.data.slice()
          }
        ],
        false,
        true
      );
    }, this.displayRange);
  }
}
</script>
