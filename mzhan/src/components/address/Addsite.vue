<template>
  <div class="box">
    <ul>
      <li>
        <div>
           <input type="text" placeholder="收货人"/>
        </div>
      </li>
      <li>
        <div>
          <input type="text" placeholder="手机号码"/>
        </div>
      </li>
      <li>
        <div class="site">
          <input type="text" placeholder="所在地区"/>
          <img src="../../assets/img/fan.png" alt="">
        </div>
      </li>
      <li>
        <div>
          <input type="text" placeholder="详细地址：如道路、门牌号、小区、单元室等"/>
        </div>
      </li>
    </ul>
    <div class="bottom">
      <p>
        <span class="footer">保存</span>
      </p>
    </div>
    <Area />
  </div>
</template>

<script>
import Area from '../../uilt/area/Area'
export default {
  components:{
    Area
  }
};
</script>

<style scoped>
ul li div{
  margin: 0 40px;
}
.site{
  display: flex;
  align-items: center;
}
ul li div img{
  width: 14px;
  height: 24px;
}
ul{

}
ul li{
  margin: 30px 0;
  border-bottom: 2px solid #D2D2D2;
  height: 1rem;
  line-height: 1rem;
}
ul li input{
  border: none;
  outline: none;
}
input::-webkit-input-placeholder {
  color: #666;
}
input{
  font-size: 28px;
  width: 100%;
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