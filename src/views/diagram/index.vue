<template>
  <div class="home-container">
    <h3 style="margin-top: 50px">灾情图表信息</h3>
    <b-container style="margin-top: 60px;height: 200px;">
      <b-row>
        <!--左侧界面-->
        <b-col style="margin-right: 30px;height: 350px;background: aliceblue" >
          <div id="main1" style="height: 330px;background: aliceblue;margin-top: 20px" />
        </b-col>
        <!--右侧界面-->
        <b-col style="height: 350px;background: aliceblue">
          <div id="main2" style="height: 330px;background: aliceblue;margin-top: 20px" />
        </b-col>
      </b-row>
      <b-row style="margin-top: 20px">
        <!--左侧地图界面-->
        <b-col >
          <h4 style="text-align: center">影响时间占比</h4>
        </b-col>
        <!--右侧折线图界面-->
        <b-col>
          <h4 style="text-align: center">各类影响时间分布</h4>
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
              { value: 0, name: '1天内' },
              { value: 1, name: '1-2天' },
              { value: 16, name: '2-4天' },
              { value: 89, name: '其他' }
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
          data: ['次生灾害', '房屋破坏', '生命线灾情','人员伤亡及失踪']
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
            data: ['1天内', '2-3天', '3-4天', '其他']
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
            data: [0,1,7,26]
          },
          {
            name: '房屋破坏',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [0,0,4,20]
          },
          {
            name: '生命线灾情',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [0, 0, 2, 32]
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
            data: [0,0,3,11]
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
