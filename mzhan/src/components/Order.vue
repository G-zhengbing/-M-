<template>
  <div class="box">
    <!-- <header>
      <a href="javascript:;">
        <img src="../assets/img/fan.png" alt />
      </a>
      <span>确认订单</span>
    </header> -->
    <section>
      <div class="contanner">
        <ul class="order-form">
          <li>
            <div>
              <div>
                <span>数学</span>
                <p>【秋(下)】初一数学直播勤学班</p>
              </div>
              <p>10月7日-12月28日每周六18：20-20：30</p>
            </div>
          </li>
        </ul>
        <div class="money">
          <div>
            <div class="trade-money">
              <i>商品金额</i>
              <span>￥888.00</span>
            </div>
            <div class="privilege-money">
              <i>优惠金额</i>
              <span>￥0</span>
            </div>
            <div class="true-money">
              <p>
                <span>共1件,总价:</span>￥888.00
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <p>
        <span>共{{2}}件,订单总价:</span>￥888.00
      </p>
      <span>立即支付</span>
    </footer>
  </div>
</template>

<script>
export default {
	mounted(){
	},
  watch: {
    $route(to, from) {
    }
  }
};
</script>

<style scoped>
.privilege-money span{
  font-size: 26px;
}
.trade-money span{
  font-size: 26px;
}
.money > div div.true-money p span {
  color: #333;
}
.money > div div.true-money p {
  text-align: right;
  width: 100%;
  color: #ee7428;
  font-size: 26px;
}
.money > div div.privilege-money {
  margin: 20px 0;
}
.money > div div {
  display: flex;
  color: #333;
  font-size: 25px;
  flex: 1;
}
.money > div div > i {
  font-style: normal;
  flex: 1;
  font-size: 26px;
}
.money > div {
  margin: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.money {
  width: 100%;
  height: 204px;
  background: #fff;
  margin-top: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
section .contanner ul.order-form li > div {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 18px;
}
section .contanner ul.order-form li > p {
  color: #999;
  font-size: 25px;
}
section .contanner ul.order-form li > div > p,
section .contanner ul.order-form li > div > div {
  flex: 1;
  font-size: 24px;
}
section .contanner ul.order-form li > div > div > p {
  display: inline-block;
  color: #333;
  margin-top: 8px;
  margin-left: 10px;
  font-size: 28px;
}
section .contanner ul.order-form li > div > div > span {
  display: inline-block;
  background: #ee7428;
  color: #fff;
  border-radius: 0.09rem;
  font-size: 25px;
  width: 0.93rem;
  height: 0.43rem;
  line-height: 0.43rem;
  text-align: center;
}
section .contanner ul.order-form li {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 194px;
  background: #fff;
  margin-top: 20px;
  border-radius: 10px;
}
section .contanner ul.order-form {
  display: flex;
  flex-direction: column;
}
.contanner {
  margin: 0 24px;
  height: 100%;
}
footer > span {
  background: #ee7428;
  width: 4.454rem;
  height: 72px;
  text-align: center;
  line-height: 72px;
  color: #fff;
  border-radius: 40px;
  margin-left: 40px;
  font-size: 30px;
}
footer > p > span {
  color: #333;
}
footer > p {
  display: inline-block;
  color: #ee7428;
  font-size: 26px;
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 1.5rem;
  background: #fff;
  font-size: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}
section {
  flex: 1;
}
header a img {
  width: 16px;
  height: 26px;
  transform: rotate(180deg);
  margin-left: 24px;
}
header a {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  padding-right: 40px;
}
header {
  height: 160px;
  background: #fff;
  color: #333;
  width: 100%;
  line-height: 160px;
  position: relative;
  text-align: center;
}
.box {
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
}
</style>