<template>
  <div class="app-container">
    <el-row>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="日 期">
          <el-col :span="11">
            <el-date-picker v-model="form.start_date" type="date" placeholder="Pick a date" style="width: 100%;" value-format="yyyy-MM-dd" />
          </el-col>
          <el-col :span="2" class="line">-</el-col>
          <el-col :span="11">
            <el-date-picker v-model="form.end_date" type="date" placeholder="Pick a time" style="width: 100%;" value-format="yyyy-MM-dd" />
          </el-col>
        </el-form-item>
        <el-form-item label="地 区">
          <el-cascader 
            :span="11"
            style="width: 30%;"
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          >
        </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary" @click="download" v-if="list">下载</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="100">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="发生日期" width="400">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地点" align="center">
          <template slot-scope="scope">
            {{ scope.row.location }}
          </template>
        </el-table-column>
        <el-table-column label="受灾情况" align="center">
          <template slot-scope="scope">
            {{ scope.row.note }}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import axios from 'axios'
export default {
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      form: {
        start_date: '',
        end_date: ''
      },
      list: null,
      listLoading: false,
      filename: '',
    }
  },
  methods: {
    async onSearch (event) {
      this.filename = 'second_'
      let url = 'http://localhost:8000/inquire/getSecondStatistics/'
      
      // 获取地区名字
      if (!!this.selectedOptions && this.selectedOptions.length > 0) {
        for (const prov of this.options) {
          if (prov.value == this.selectedOptions[0]) {
            for (const city of prov.children) {
              if (city.value == this.selectedOptions[1]) {
                for (const town of city.children) {
                  if (town.value == this.selectedOptions[2]) {
                    url += 'location=' + prov.label +  town.label + '&'
                    this.filename += prov.label + city.label + town.label + '&'
                    break
                  }
                }
                break
              }
            }
            break
          }
        }
      }

      for (const key in this.form) {
        if (!!this.form[key] && this.form[key] != '') {
          url += key + '=' + this.form[key] + '&'
          this.filename += key + '=' + this.form[key] + '&'
        }
      }

      if (url[url.length - 1] != '/') {
        if (url[url.length - 1] == '&') {
          url = url.substr(0, url.length - 1)
        }
        if (this.filename[this.filename.length - 1] == '&') {
          this.filename = this.filename.substr(0, this.filename.length - 1)
        }
        this.filename += '.json'
        const response = await axios.get(url)
        this.list = response.data.data
      }

    },
    handleChange(value) {
      // 必须通过@change来设置selectedOptions，不能通过v-model设置（否则数据不实时）
      this.selectedOptions = value
    },
    download () {
      // 创建a标签
      let elementA = document.createElement('a')
      //文件的名称为时间戳加文件名后缀
      elementA.download = this.filename
      elementA.style.display = 'none'
      //生成一个blob二进制数据，内容为json数据
      let blob = new Blob([JSON.stringify(this.list)])
      //生成一个指向blob的URL地址，并赋值给a标签的href属性
      elementA.href = URL.createObjectURL(blob)
      document.body.appendChild(elementA)
      elementA.click()
      document.body.removeChild(elementA)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
