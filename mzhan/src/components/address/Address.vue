<template>
  <div class="box">
    <scroller>
      <ul>
        <li>
          <div>
            <p>
              111
              <span>16601521897</span>
            </p>
            <span>湖南省长沙市岳麓区麓山街道云栖谷1号楼1单元101室</span>
          </div>
          <p>编辑</p>
        </li>
        <li>
          <div>
            <p>
              111
              <span>16601521897</span>
            </p>
            <span>湖南省长沙市岳麓区麓山街道云栖谷1号楼1单元101室</span>
          </div>
          <p>编辑</p>
        </li>
        <li>
          <div>
            <p>
              111
              <span>16601521897</span>
            </p>
            <span>湖南省长沙市岳麓区麓山街道云栖谷1号楼1单元101室</span>
          </div>
          <p>编辑</p>
        </li>
      </ul>
    </scroller>
    <div class="bottom">
      <p>
        <span class="footer" @click="goAddsite">新增收货地址</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    goAddsite(){
      this.$router.push('/addsite')
    }
  }
};
</script>

<style scoped>
ul li > p {
  color: #999;
  font-size: 28px;
  height: 60px;
  line-height: 60px;
  border-left: 2px solid #d2d2d2;
  padding-left: 20px;
}
ul li > div > span {
  color: #333;
  font-size: 26px;
}
ul li > div > p > span {
  color: #999;
  margin-left: 20px;
  font-size: 26px;
}
ul li > div > p {
  color: #333;
  font-size: 32px;
  margin-bottom: 15px;
}
ul li > div {
  flex: 1;
  padding-right: 20px;
}
ul li {
  display: flex;
  width: 100%;
  margin: 40px 0;
  align-items: center;
}
ul {
  display: flex;
  flex-direction: column;
  margin: 0 40px;
}
.box {
  position: relative;
}
.bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100px;
	background: #fff;
}
.bottom > p {
  margin: 0 20px;
}
.footer {
  width: 100%;
  display: inline-block;
  height: 80px;
  background: #ee7428;
  border-radius: 40px;
  color: #fff;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
}
</style>