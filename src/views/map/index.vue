<template>
  <div class="app-container">
    <el-container>
      <el-col style="width:100%">
        <!-- <img :src="map" width="100%" alt="map"> -->
        <div id="map-container">
          <div ref="map_ref" style="width: 800px;height:600px;border: 1px solid #f00" />
        </div>
      </el-col>
      <el-col style="width:70%;">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="地点">
            <el-input v-model="form.location" />
          </el-form-item>
          <el-form-item label="纬度">
            <el-input v-model="form.longitude" />
          </el-form-item>
          <el-form-item label="经度">
            <el-input v-model="form.latitude" />
          </el-form-item>
          <el-form-item label="灾情类型">
            <el-input v-model="form.type" />
          </el-form-item>
          <el-form-item label="发生时间">
            <el-date-picker v-model="form.date" style="width: 100%" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      map: require('@/assets/map.png'),
      form: {
        location: '',
        latitude: '',
        longitude: '',
        type: '',
        date: ''
      },
      chartInstance: null,
      allData: [],
      geoData: [],
    }
  },
  mounted() {
    this.initData()
    this.initChart()
  },
  methods: {
    async initData() {
      const response = await axios.get('http://localhost:8000/inquire/getAllEarthquakeStatistics')
      this.allData = response.data.data
      for (const eq of this.allData) {
        this.geoData.push([eq.longitude, eq.latitude])
      }
    },
    async initChart() {
      const ret = await axios.get('http://localhost:9528/static/json/china.json')
      const mapData = ret.data
      this.chartInstance = this.$echarts.init(this.$refs.map_ref)
      this.$echarts.registerMap('chinaMap', mapData)
      const option = {
        geo: {
          type: 'map',
          map: 'chinaMap', // chinaMap需要和registerMap中的第一个参数保持一致
          roam: true, // 设置允许缩放以及拖动的效果
          zoom: 1.2,    // 当前视角的缩放比例
          label: {
            show: true, // 展示标签（省份名）
          },
          itemStyle: {
            areaColor: '#ddd',  // 省份颜色
          }
        },
        series: [
          {
            data: this.geoData, // 配置散点的坐标数据
            type: 'effectScatter',
            coordinateSystem: 'geo', // 指明散点使用的坐标系统  geo的坐标系统
            rippleEffect: {
              scale: 5, // 设置涟漪动画的缩放比例
              color: '#DE5114', // 涟漪颜色
              period: 8, // 动画的周期
              scale: 6, // 动画中波纹的最大缩放比例
              brushType: 'fill',
            }
          }
        ]
      }
      this.chartInstance.setOption(option)
      let _this = this // 必须保存当前vue实例的上下文，因为在handler中上下文会改变
      this.chartInstance.on('click', function (params) {
        if (params.componentSubType == 'effectScatter') {
          // 点击地震散点时触发
          const index = params.dataIndex
          const eqData = _this.allData[Number(index)]
          _this.form.location = eqData.location
          _this.form.latitude = eqData.latitude
          _this.form.longitude = eqData.longitude
          _this.form.type = "里氏 " + eqData.magnitude + " 级地震"
          _this.form.date = eqData.date
        }
        
      })
    }
  }
}
</script>
