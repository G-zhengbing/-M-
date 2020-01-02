<template>
  <div class="adbox">
    <div class="loading">
      <van-loading type="spinner" vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.van-loading__spinner {
  margin-top: 20px;
}
.van-loading__text {
  color: #fff;
}
.van-loading__spinner {
  width: 80px;
  height: 80px;
}
.adbox > div.loading {
  position: absolute;
  width: 160px;
  height: 160px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 9999999999999;
  top: 50%;
  left: 50%;
  margin: -80px 0 0 -80px;
}
.adbox {
  width: 100%;
  height: 100%;
  opacity: 1;
}
</style>