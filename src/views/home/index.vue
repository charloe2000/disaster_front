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
            <p>{{ DisasterNum }}个</p>
            <b-button href="#" variant="primary" @click="hrefReptiltSetting">基本设置</b-button>
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
            <p>{{ DataNumAlreadyGot }}条</p>
            <b-button href="#" variant="primary" @click="herfDataView">数据详情</b-button>
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
            <p>{{ UpdateIntervalHour }}小时</p>
            <b-button href="#" variant="primary" @click="herfDataView">数据导出</b-button>
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
            <p>{{ UnreadMessageNum }}条</p>
            <b-button href="#" variant="primary" @click="herfLogView">日志信息</b-button>
          </b-card></b-col>
      </b-row>
    </b-container>

    <b-container style="margin-top: 30px;height: 200px;">
      <b-row>
        <!--左侧地图界面-->
        <b-col style="margin-right: 30px;height: 350px;background: aliceblue" />
        <!--右侧折线图界面-->
        <b-col style="height: 350px;background: aliceblue">
          <div id="main" style="height: 330px;background: aliceblue;margin-top: 20px" />
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
  name: 'Home',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      DisasterNum: '2',
      DataNumAlreadyGot: '45',
      UpdateIntervalHour: '4',
      UnreadMessageNum: '0'
    }
  },
  mounted() {
    this.myEcharts()
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('main'))
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
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }]
      };

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
