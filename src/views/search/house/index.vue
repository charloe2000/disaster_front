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
            <el-date-picker v-model="form.end_date" type="fixed-time" placeholder="Pick a time" style="width: 100%;" value-format="yyyy-MM-dd" />
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

export default {
  data() {
    return {
      options: regionData,
      selectdOptions: [],
      form: {
        start_date: '',
        end_date: ''
      },
      list: null,
      listLoading: false
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
