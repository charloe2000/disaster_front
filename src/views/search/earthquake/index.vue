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
        <el-form-item label="震 级">
          <el-col :span="11">
            <el-input v-model="form.start_magnitude" style="width: 100%;" />
          </el-col>
          <el-col :span="2" class="line">-</el-col>
          <el-col :span="11">
            <el-input v-model="form.end_magnitude" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="纬 度">
          <el-col :span="11">
            <el-input v-model="form.start_latitude" style="width: 100%;" />
          </el-col>
          <el-col :span="2" class="line">-</el-col>
          <el-col :span="11">
            <el-input v-model="form.end_latitude" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="经 度">
          <el-col :span="11">
            <el-input v-model="form.start_longitude" style="width: 100%;" />
          </el-col>
          <el-col :span="2" class="line">-</el-col>
          <el-col :span="11">
            <el-input v-model="form.end_longitude" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="深 度">
          <el-col :span="11">
            <el-input v-model="form.start_longitude" style="width: 100%;" />
          </el-col>
          <el-col :span="2" class="line">-</el-col>
          <el-col :span="11">
            <el-input v-model="form.end_longitude" style="width: 100%;" />
          </el-col>
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
        <el-table-column align="center" prop="created_at" label="发生日期" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="纬度" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.latitude }}
          </template>
        </el-table-column>
        <el-table-column label="经度" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.longitude }}
          </template>
        </el-table-column>
        <el-table-column label="深度" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.depth }}
          </template>
        </el-table-column>
        <el-table-column label="震级" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.magnitude }}
          </template>
        </el-table-column>
        <el-table-column label="参考位置" align="center">
          <template slot-scope="scope">
            {{ scope.row.magnitude }}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        start_date: '',
        end_date: '',
        start_magnitude: '',
        end_magnitude: '',
        start_latitude: '',
        end_latitude: '',
        start_longitude: '',
        end_longitude: '',
        start_depth: '',
        end_depth: ''
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
