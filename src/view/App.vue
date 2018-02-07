<template>
<el-container>
  <el-aside width="300px" calss='tip'>
    <div class="tip">


    </div>
  </el-aside>
  <el-main>Main</el-main>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      msg: '123'
    }
  }
}
</script>

<style>
html,
body,
.el-container,
.el-aside,
.el-main {
  height: 100%;
}

* {
  padding: 0;
  margin: 0;
}

.tip {
  height: 100%;
  background: #EBEEF5;
  width: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
