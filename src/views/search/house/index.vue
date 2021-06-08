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
            <span>{{ scope.row.start_date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地点" align="center">
          <template slot-scope="scope">
            {{ scope.row.latitude }}
          </template>
        </el-table-column>
        <el-table-column label="受灾情况" align="center">
          <template slot-scope="scope">
            {{ scope.row.latitude }}
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
    }
  },
  methods: {
    async onSearch (event) {
      let url = 'http://localhost:8000/inquire/getStructureStatistics/'
      
      // 获取地区名字
      if (!!this.selectedOptions && this.selectedOptions.length > 0) {
        for (const prov of this.options) {
          if (prov.value == this.selectedOptions[0]) {
            for (const city of prov.children) {
              if (city.value == this.selectedOptions[1]) {
                for (const town of city.children) {
                  if (town.value == this.selectedOptions[2]) {
                    url += 'location=' + prov.label + city.label + town.label + '&'
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
        }
      }

      if (url[url.length - 1] != '/') {
        if (url[url.length - 1] == '&') {
          url = url.substr(0, url.length - 1)
        }
        const response = await axios.get(url)
        this.list = response.data.data
      }
    },
    handleChange(value) {
      // 必须通过@change来设置selectedOptions，不能通过v-model设置（否则数据不实时）
      this.selectedOptions = value
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
