<template>
  <div class="app-container">
    <el-container>
      <el-col style="width:100%">
        <img :src="map" width="100%" alt="map">
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
      }
    }
  }
}
</script>
