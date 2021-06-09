<template>
  <div id="app">
    <el-row class="el-row-define">
      <el-col class="el-1col-define">
        <el-card class="el-card-define">
          <div class="markdown-body">
            <markdown-test>
              <template v-slot:footer>
                <div>test</div>
                <button>footer</button>
              </template>
            </markdown-test>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import markdownTest from '@/assets/encode.md'
export default {
  components: {
    markdownTest
  }
}
</script>

<style scoped>
.el-card-define {
  width: 100%;
  padding: 20px;
}
.el-row-define {
  left: 5%;
  width: 90%;
  padding: 10px;
}
.el-1col-define {
  width: 100%;
  padding: 10px;
}
.el-2col-define {
  left: 0%;
  width: 50%;
  padding: 10px;
}
</style>
