<template>
  <div class="home-container">
    <h3 style="margin-top: 50px">灾情图表信息</h3>
    <b-container style="margin-top: 60px;height: 200px;">
      <b-row>
        <!--左侧地图界面-->
        <b-col style="margin-right: 30px;height: 350px;background: aliceblue" >
          <div id="main1" style="height: 330px;background: aliceblue;margin-top: 20px" />
        </b-col>
        <!--右侧折线图界面-->
        <b-col style="height: 350px;background: aliceblue">
          <div id="main2" style="height: 330px;background: aliceblue;margin-top: 20px" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as echarts from 'echarts'
import { mapGetters } from 'vuex'

export default {
  name: 'Diagram',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
    }
  },
  mounted() {
    this.myEcharts1()
    this.myEcharts2()
  },
  methods: {
    myEcharts1() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('main1'))
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '灾情信息',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '次生灾害' },
              { value: 735, name: '房屋破坏' },
              { value: 580, name: '基本震情' },
              { value: 484, name: '人员伤亡' }
            ]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    myEcharts2() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('main2'))
      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['次生灾害', '房屋破坏', '基本震情', '人员伤亡']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '次生灾害',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '房屋破坏',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '基本震情',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '人员伤亡',
            type: 'line',
            stack: '总量',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
