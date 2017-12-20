<template>
<div class="app-container chart-container">
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { mapGetters } from "vuex";

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "80vw"
    },
    height: {
      type: String,
      default: "800px"
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {},
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));
      const _this = this;
      /* this.chart.on("click", function(param) {
        _this.$store
          .dispatch("getSomebodyDetail", { u_username: param.name })
          .then(result => {
            _this.$router.push("/statistics/somebodyDetail");
          });
      }); */
      this.chart.setOption({
        backgroundColor: "#344b58",
        title: {
          text: "订单统计",
          x: "4%",
          textStyle: {
            color: "#fff",
            fontSize: "22"
          },
          subtextStyle: {
            color: "#90979c",
            fontSize: "16"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            textStyle: {
              color: "#fff"
            }
          }
        },
        grid: {
          borderWidth: 0,
          top: 110,
          bottom: 95,
          textStyle: {
            color: "#fff"
          }
        },
        legend: {
          x: "15%",
          top: "10%",
          textStyle: {
            color: "#90979c"
          },
          data: ["审批中", "已完成", "待接收", "待转移", "跟进中", "退单", "暂缓", "已放款"]
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#90979c"
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            data: this.orderDataX
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#90979c"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 30,
            start: 10,
            end: 80,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#d3dee5"
            },
            textStyle: {
              color: "#fff"
            },
            borderColor: "#90979c"
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ],
        series: [
          {
            name: "审批中",
            type: "bar",
            stack: "总量",
            barMaxWidth: 35,
            barGap: "10%",
            itemStyle: {
              normal: {
                color: "rgba(255,144,128,1)",
                label: {
                  show: true,
                  textStyle: {
                    color: "#fff"
                  },
                  position: "insideTop",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: this.orderDataY1
          },
          {
            name: "已完成",
            type: "bar",
            stack: "总量",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "rgba(0,191,183,1)",
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: "insideTop",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: this.orderDataY2
          },
          {
            name: "待接收",
            type: "bar",
            stack: "总量",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "rgba(55,105,86,1)",
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: "insideTop",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: this.orderDataY3
          },
          {
            name: "待转移",
            type: "bar",
            stack: "总量",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "rgba(189,183,106,1)",
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: "insideTop",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: this.orderDataY4
          },
          {
            name: "跟进中",
            type: "bar",
            stack: "总量",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "rgba(124,252,0,1)",
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: "insideTop",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: this.orderDataY5
          },
          {
            name: "退单",
            type: "bar",
            stack: "总量",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "rgba(255,51,153,1)",
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: "insideTop",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: this.orderDataY6
          },
          {
            name: "已放款",
            type: "bar",
            stack: "总量",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "rgba(255,0,0,1)",
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: "top",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: this.orderDataY7
          },
          {
            name: "暂缓",
            type: "bar",
            stack: "总量",
            symbolSize: 10,
            symbol: "circle",
            itemStyle: {
              normal: {
                color: "rgba(252,230,48,1)",
                barBorderRadius: 0,
                label: {
                  show: true,
                  position: "top",
                  formatter(p) {
                    return p.value > 0 ? p.value : "";
                  }
                }
              }
            },
            data: this.orderDataY8
          }
        ]
      });
    }
  },
  computed: {
    ...mapGetters([
      "orderDataX",
      "orderDataY",
      "orderDataY1",
      "orderDataY2",
      "orderDataY3",
      "orderDataY4",
      "orderDataY5",
      "orderDataY6",
      "orderDataY7",
      "orderDataY8"
    ])
  },
  beforeCreate() {
    if (!this.orderDataX) {
      this.$store.dispatch("getOrderData").then(result => {
        console.log(this.orderDataX);
        console.log(this.orderDataY);
        this.initChart();
        this.chart = null;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.chart-container {
  height: 100vh;
}
</style>
