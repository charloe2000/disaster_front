<template>
  <div class="app-container">
    <el-container>
      <el-col style="width:100%">
        <!-- <img :src="map" width="100%" alt="map"> -->
        <div id="map-container">
          <div ref="map_ref" style="width: 600px;height:400px;border: 1px solid #f00"></div>
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
      airData: [
        { name: '北京', value: 39.92 },
        { name: '天津', value: 39.13 },
        { name: '上海', value: 31.22 },
        { name: '重庆', value: 66 },
        { name: '河北', value: 147 },
        { name: '河南', value: 113 },
        { name: '云南', value: 25.04 },
        { name: '辽宁', value: 50 },
        { name: '黑龙江', value: 114 },
        { name: '湖南', value: 175 },
        { name: '安徽', value: 117 },
        { name: '山东', value: 92 },
        { name: '新疆', value: 84 },
        { name: '江苏', value: 67 },
        { name: '浙江', value: 84 },
        { name: '江西', value: 96 },
        { name: '湖北', value: 273 },
        { name: '广西', value: 59 },
        { name: '甘肃', value: 99 },
        { name: '山西', value: 39 },
        { name: '内蒙古', value: 58 },
        { name: '陕西', value: 61 },
        { name: '吉林', value: 51 },
        { name: '福建', value: 29 },
        { name: '贵州', value: 71 },
        { name: '广东', value: 38 },
        { name: '青海', value: 57 },
        { name: '西藏', value: 24 },
        { name: '四川', value: 58 },
        { name: '宁夏', value: 52 },
        { name: '海南', value: 54 },
        { name: '台湾', value: 88 },
        { name: '香港', value: 66 },
        { name: '澳门', value: 77 },
        { name: '南海诸岛', value: 55 }
      ],
      scatterData: [
        { value: [117.283042, 31.86119] },
        { value: [110.283042, 24.86119] }
      ]
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    async initChart() {
      const ret = await axios.get('http://localhost:9528/static/json/china.json')
      const mapData = ret.data
      this.chartInstance = this.$echarts.init(this.$refs.map_ref)
      console.log(mapData)
      this.$echarts.registerMap('chinaMap', mapData)
      const option = {
        geo: {
          type: 'map',
          map: 'chinaMap', // chinaMap需要和registerMap中的第一个参数保持一致
          roam: true, // 设置允许缩放以及拖动的效果
          label: {
            show: true // 展示标签
          }
        },
        series: [
          {
            data: this.airData,
            geoIndex: 0, // 将空气质量的数据和第0个geo配置关联在一起
            type: 'map'
          },
          {
            data: this.scatterData, // 配置散点的坐标数据
            type: 'effectScatter',
            coordinateSystem: 'geo', // 指明散点使用的坐标系统  geo的坐标系统
            rippleEffect: {
              scale: 10 // 设置涟漪动画的缩放比例
            }
          }
        ],
        visualMap: {
          min: 0,
          max: 300,
          inRange: {
            color: ['white', 'red'] // 控制颜色渐变的范围
          },
          calculable: true // 出现滑块
        }
      }
      this.chartInstance.setOption(option)
    }
  }
}
</script>
