<template>
  <div class="box">
    <section>
      <div class="contanner">
        <ul class="order-form">
          <li>
            <div>
              <div>
                <span>{{list.subject}}</span>
                <p>{{list.course_name}}</p>
              </div>
              <p>{{list.start_date}} - {{list.end_date}}</p>
            </div>
          </li>
        </ul>
        <div class="money">
          <div>
            <div class="trade-money">
              <i>商品金额</i>
              <span>￥{{list.sale_price}}</span>
            </div>
            <div class="privilege-money">
              <i>优惠金额</i>
              <span>￥{{list.activity_price}}</span>
            </div>
            <div class="true-money">
              <p>
                <span>共1件,总价:</span>
                ￥{{list.activity_price}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <p>
        <span>共1件,订单总价:</span>
        ￥{{list.activity_price}}
      </p>
      <span @click="goOrder">立即支付</span>
    </footer>
    <van-overlay :show="isOrder">
      <div class="block">
        <div>
          <img :src="html" alt="">
          <i>*请长按识别二维码支付</i>
          <p @click="close">×</p>
        </div>
      </div>
    </van-overlay>
    <Loading v-show="showLoading" />
  </div>
</template>

<script>
import Loading from '../uilt/loading/Loading' 
import { DATALISTS, ORDER } from "../uilt/url";
import storage from "../uilt/storage";
import axios from "axios";
export default {
  components:{
    Loading
  },
  data() {
    return {
      showLoading:false,
      isOrder: false,
      list: [],
      orders: [],
      item: this.$route.params.id,
      html: ""
    };
  },
  mounted() {
    this.showLoading = true
    this.getOrderList().then(()=>{
      this.showLoading = false
    });
  },
  methods: {
    close() {
      this.isOrder = false;
    },
    //支付
    goOrder() {
      if (JSON.stringify(storage.getToken()) == "{}") {
        this.$router.push("/login");
        storage.clear();
        return;
      }
      this.showLoading = true
      if (this.$route.params.order_sn) {
        return new Promise((resolve, reject) => {
          axios({
            method: "get",
            url:
              ORDER +
              "?product_id=" +
              this.list.id +
              "&order_sn=" +
              this.$route.params.order_sn,
            headers: {
              Authorization: "bearer" + storage.getToken()
            }
          })
            .then(res => {
              this.showLoading = false
              this.html = res.data.data.qrcode;
              this.isOrder = true;
              resolve();
            })
            .catch(e => {
              this.showLoading = false
              reject(e);
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          axios({
            method: "get",
            url: ORDER + "?product_id=" + this.list.id,
            headers: {
              Authorization: "bearer" + storage.getToken()
            }
          })
            .then(res => {
              this.showLoading = false
              this.html = res.data.data.qrcode;
              this.isOrder = true;
              resolve();
            })
            .catch(e => {
              this.showLoading = false
              reject(e);
            });
        });
      }
    },
    getOrderList() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: DATALISTS + "?product_id=" + this.item,
          headers: {
            Authorization: "bearer" + storage.getToken()
          }
        })
          .then(res => {
            this.list = res.data.data;
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      });
    }
  }
};
</script>

<style scoped>
.block > div > p {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 50px;
  width: 50px;
}
.block > div > i {
  color: #333;
  font-size: 28px;
}
.block > div {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 480px;
  height: 480px;
  background: #fff;
}
.block {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.privilege-money span {
  font-size: 26px;
}
.trade-money span {
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