<template>
  <div class="home-container">
    <b-container style="margin-top: 50px">
      <b-row style="margin-top: 50px">
        <b-col>
          <!--第一个卡片设置-->
          <b-card
            title="当前震源数"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2"
          >
            <p>{{ disasterNum }}个</p>
            <b-button
              href="#"
              variant="primary"
              @click="hrefReptiltSetting"
            >基本设置</b-button>
          </b-card>
        </b-col>
        <b-col>
          <!--第二个卡片设置-->
          <b-card
            title="已获取数据"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2"
          >
            <p>{{ dataNumAlreadyGot }}条</p>
            <b-button
              href="#"
              variant="primary"
              @click="herfDataView"
            >数据详情</b-button>
          </b-card>
        </b-col>
        <b-col>
          <!--第三个卡片设置-->
          <b-card
            title="距离上次更新"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2"
          >
            <p>{{ updateIntervalHour }}小时</p>
            <b-button
              href="#"
              variant="primary"
              @click="herfDataView"
            >数据导出</b-button>
          </b-card>
        </b-col>
        <b-col>
          <!--第四个卡片设置-->
          <b-card
            title="未读取消息数目"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2"
          >
            <p>{{ unreadMessageNum }}条</p>
            <b-button
              href="#"
              variant="primary"
              @click="herfLogView"
            >日志信息</b-button>
          </b-card></b-col>
      </b-row>
    </b-container>

    <b-container style="margin-top: 30px; height: 200px">
      <b-row>
        <!--左侧地图界面-->
        <b-col style="margin-right: 30px; height: 350px; background: aliceblue">
          <div
            id="mapChart"
            style="height: 330px; background: aliceblue; margin-top: 20px"
          />
        </b-col>
        <!--右侧折线图界面-->
        <b-col style="height: 350px; background: aliceblue">
          <div
            id="lineChart"
            style="height: 330px; background: aliceblue; margin-top: 20px"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as echarts from 'echarts'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      disasterNum: '2',
      dataNumAlreadyGot: '45',
      updateIntervalHour: '4',
      unreadMessageNum: '0',
      lineChartInstance: null,
      mapChartInstance: null,
      allData: [],
      geoData: [],
      casualties: []
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    this.initData()
    this.initLineCharts()
    this.initMapChart()
  },
  methods: {
    async initData() {
      const response = await axios.get(
        'http://localhost:8000/inquire/getAllEarthquakeStatistics'
      )
      this.allData = response.data.data
      for (const eq of this.allData) {
        this.geoData.push([eq.longitude, eq.latitude])
      }
      this.disasterNum = this.allData.length
    },
    initLineCharts() {
      // 基于准备好的dom，初始化echarts实例
      this.lineChartInstance = echarts.init(
        document.getElementById('lineChart')
      )
      const option = {
        title: {
          text: '伤亡人数图'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.lineChartInstance.setOption(option)
    },
    async initMapChart() {
      const ret = await axios.get(
        'http://localhost:9528/static/json/china.json'
      )
      const mapData = ret.data
      this.mapChartInstance = this.$echarts.init(
        document.getElementById('mapChart')
      )
      this.$echarts.registerMap('chinaMap', mapData)
      const option = {
        geo: {
          type: 'map',
          map: 'chinaMap', // chinaMap需要和registerMap中的第一个参数保持一致
          roam: true, // 设置允许缩放以及拖动的效果
          zoom: 1.2, // 当前视角的缩放比例
          label: {
            show: false // 展示标签（省份名）
          },
          itemStyle: {
            areaColor: '#ddd' // 省份颜色
          }
        },
        series: [
          {
            data: this.geoData, // 配置散点的坐标数据
            type: 'effectScatter',
            coordinateSystem: 'geo', // 指明散点使用的坐标系统  geo的坐标系统
            rippleEffect: {
              color: '#DE5114', // 涟漪颜色
              period: 8, // 动画的周期
              scale: 6, // 动画中波纹的最大缩放比例
              brushType: 'fill'
            }
          }
        ]
      }
      this.mapChartInstance.setOption(option)

      let _this = this // 必须保存当前vue实例的上下文，因为在handler中上下文会改变
      this.mapChartInstance.on('click', async function (params) {
        if (params.componentSubType == 'effectScatter') {
          // 点击地震散点时触发
          const index = params.dataIndex;
          const location = _this.allData[Number(index)].location;

          const url =
            'http://localhost:8000/inquire/getPeopleStatistics/location=' +
            location;
          const response = await axios.get(url);
          this.casualties = response.data.data; // 伤亡人数日期数组
        }
      });
    },
  },
};
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
