<template>
  <div class="box">
    <header>
      <div class="center">
        <img src="../assets/img/ju.png" alt />
        <div @click="goPersonalData">
          <img
            class="head"
            :src="'http://liveh5.canpoint.net'+userData.head_portrait"
            alt
            v-if="userData.head_portrait != null"
          />
          <img v-else class="head" src="../assets/img/er.png" alt />
          <span v-if="userData.student_name!=null">{{userData.student_name}}</span>
          <span v-else>学员001</span>
          <img class="bank" src="../assets/img/fan2.png" alt />
        </div>
      </div>
    </header>
    <section>
      <div class="center">
        <ul>
          <li @click="getTabar(1)">
            <img src="../assets/img/dan2.png" alt />
            <span>我的订单</span>
          </li>
          <li @click="getTabar(2)">
            <img src="../assets/img/mine2.png" alt />
            <span>我的课表</span>
          </li>
        </ul>
        <div class="tabar" v-if="tabar == 1">
          <ul>
            <li @click="setTabs(1)" :class="{active: num == 1 }">
              <span>全部</span>
              <p></p>
            </li>
            <li @click="setTabs(2)" :class="{active: num == 2 }">
              <span>未支付</span>
              <p></p>
            </li>
            <li @click="setTabs(3)" :class="{active: num == 3}">
              <span>已支付</span>
              <p></p>
            </li>
          </ul>
          <div class="tab-content">
            <div v-if="num == 1">
              <ul>
                <li v-for="(item,i) in orderList" :key="i">
                  <div>
                    <p>
                      <span>{{item.subject == 1? "数学":"英语"}}</span>
                      &nbsp;&nbsp;&nbsp;{{item.course_name}}
                    </p>
                    <span>{{item.product_time}}</span>
                    <div>
                      <!-- 1未支付 2已支付 3已取消 -->
                      <template v-if="item.status == 1">
                        <p>
                          未支付：
                          <span>￥{{item.pay_amount}}</span>
                        </p>
                        <span>
                          <span @click="goOrder">立即支付</span>
                        </span>
                      </template>
                      <template v-if="item.status == 2">
                        <p>
                          已支付：
                          <span>￥{{item.pay_amount}}</span>
                        </p>
                      </template>
                      <template v-if="item.status == 3">
                        <p>已取消</p>
                      </template>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="empty" v-if="orderList.length !=0">
                <p>
                  <img src="../assets/img/pie4 (2).png" alt />
                  <span>没有更多了</span>
                  <img src="../assets/img/pie4 (1).png" alt />
                </p>
              </div>
              <div class="empty orderAll" v-if="orderList.length == 0">
                <img src="../assets/img/ding2.png" alt />
                <span>暂无订单</span>
              </div>
            </div>
            <div v-if="num == 2">
              <ul>
                <li v-for="(item,i) in orderList" :key="i">
                  <div>
                    <p>
                      <span>{{item.subject == 1? "数学":"英语"}}</span>
                      &nbsp;&nbsp;&nbsp;{{item.course_name}}
                    </p>
                    <span>{{item.product_time}}</span>
                    <div>
                      <p>
                        应付款：
                        <span>￥{{item.pay_amount}}</span>
                      </p>
                      <span>
                        <span @click="goOrder">立即支付</span>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="empty" v-if="orderList.length !=0">
                <p>
                  <img src="../assets/img/pie4 (2).png" alt />
                  <span>没有更多了</span>
                  <img src="../assets/img/pie4 (1).png" alt />
                </p>
              </div>
              <div class="empty orderAll" v-if="orderList.length == 0">
                <img src="../assets/img/ding2.png" alt />
                <span>暂无订单</span>
              </div>
            </div>
            <div v-if="num == 3">
              <ul>
                <li v-for="(item,i) in orderList" :key="i">
                  <div>
                    <p>
                      <span>{{item.subject == 1? "数学":"英语"}}</span>
                      &nbsp;&nbsp;&nbsp;{{item.course_name}}
                    </p>
                    <span>{{item.product_time}}</span>
                    <div>
                      <p v-if="!orderList.length>=1">
                        应付款：
                        <span>￥{{item.pay_amount}}</span>
                      </p>
                      <p>
                        已付款：
                        <span>￥{{item.pay_amount}}</span>
                      </p>
                      <span v-if="!orderList.length>=1">
                        <span @click="goOrder">立即支付</span>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="empty" v-if="orderList.length !=0">
                <p>
                  <img src="../assets/img/pie4 (2).png" alt />
                  <span>没有更多了</span>
                  <img src="../assets/img/pie4 (1).png" alt />
                </p>
              </div>
              <div class="empty orderAll" v-if="orderList.length == 0">
                <img src="../assets/img/ding2.png" alt />
                <span>暂无订单</span>
              </div>
            </div>
          </div>
        </div>
        <div class="class-list" v-if="tabar == 2">
          <ul v-if="orderList.length !=0">
            <li v-for="(item,i) in orderList">
              <p>{{item.course_name}}</p>
               <span>{{item.product_time}}</span>
              <div>
                <i>{{item.subject == 1? "数学":"英语"}}</i>
                <div>
                  <span>进入教室</span>
                  <img src="../assets/img/fan.png" alt />
                </div>
              </div>
            </li>
          </ul>
          <div class="empty" v-if="orderList.length !=0">
            <p>
              <img src="../assets/img/pie4 (2).png" alt />
              <span>没有更多了</span>
              <img src="../assets/img/pie4 (1).png" alt />
            </p>
          </div>
          <div class="empty orderAll" v-if="orderList.length == 0">
            <img src="../assets/img/ding2.png" alt />
            <span>暂无订单</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import storage from "../uilt/storage";
import { ORDER_LIST, UESR_DATA } from "../uilt/url";
import axios from "axios";
export default {
  mounted() {
    this.getOrderList();
    this.getUserList();
  },
  data() {
    return {
      num: 1,
      tabar: 1,
      orderList: [],
      userData: {}
    };
  },
  methods: {
    //得到用户信息
    getUserList() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: UESR_DATA + "?" + "type=2",
          headers: {
            Authorization: "bearer" + storage.getToken()
          }
        })
          .then(res => {
            this.userData = res.data.data;
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    //支付
    goOrder() {
      this.$router.push("/order");
    },
    //订单课程列表(全部)
    getOrderList(num) {
      if (num == 1) {
        num = 0;
      } else if (num == 2) {
        num = 1;
      } else if (num == 3) {
        num = 2;
      }
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: ORDER_LIST,
          headers: {
            Authorization: "bearer" + storage.getToken()
          },
          params: {
            status: num ? num : 0
          }
        })
          .then(res => {
            this.orderList = res.data.data.data;
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    //个人资料
    goPersonalData() {
      if (JSON.stringify(storage.getToken()) == "{}" || !storage.getToken()) {
        this.$dialog
          .confirm({
            title: "温馨提示",
            message: "您还未登录请先登陆"
          })
          .then(() => {
            this.$router.push("/login");
            storage.clear();
          })
          .catch(() => {});
        return;
      }
      this.$router.push("/personagedata");
    },
    getTabar(num) {
      this.tabar = num;
      this.getOrderList(3);
    },
    setTabs(num) {
      this.num = num;
      this.getOrderList(num);
    }
  }
};
</script>

<style scoped>
.head {
  border-radius: 50%;
}
.empty.orderAll {
  height: 100%;
}
.class-list > ul li > div > span {
  flex: 1;
  text-align: center;
}
.class-list > ul li > div > i {
  flex: 1;
  text-align: center;
}
.class-list > ul li > div > div {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.class-list > ul li > div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.class-list > ul li > p {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.class-list > ul li > div > div > img {
  width: 14px;
  height: 24px;
  margin-left: 30px;
}
.class-list > ul li > div > i {
  font-style: normal;
}
.class-list > ul li {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #333;
  font-size: 26px;
  height: 2.5rem;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}
.class-list > ul {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}
.class-list {
  height: 100%;
  background: #fff;
  margin-top: 0.266667rem;
  border-top-left-radius: 0.133333rem;
  border-top-right-radius: 0.133333rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.empty > span {
  color: #333;
  font-size: 25px;
}
.empty > p {
  color: #333;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.empty > p > span {
  display: inline-block;
  margin: 0 8px;
  color: #b0b0b0;
}
.empty > p > img {
  height: 2px;
  width: 52px;
}
.empty > img {
  width: 168px;
  height: 182px;
  margin: 50px 0 20px 0;
}
.empty {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.tab-content > div {
  overflow: hidden;
  overflow-y: auto;
}
.tab-content ul li > div > div > span > span {
  padding: 4px 28px;
  color: #fff;
  background: #ee7428;
  border-radius: 20px;
  font-size: 24px;
}
.tab-content ul li > div > div > span {
  display: inline-block;
  text-align: right;
  width: 100%;
  margin-top: 10px;
}
.tab-content ul li > div > div > p > span {
  color: #ee7428;
  font-size: 26px;
}
.tab-content ul li > div > div > p {
  text-align: right;
  color: #333;
  font-size: 26px;
}
.tab-content ul li > div {
  margin: 0 10px;
  height: 100%;
  position: relative;
  margin: 0 30px;
}
.tab-content ul li > div > div {
  border-top: 1px solid rgba(241, 241, 241, 1);
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 120px;
}
.tab-content ul li > div > span {
  color: #999;
  font-size: 24px;
  display: inline-block;
  margin: 20px 0 0 0;
}
.tab-content ul li {
  height: 276px;
  box-shadow: 0px 2px 4px 0px rgba(29, 29, 29, 0.15);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}
.tab-content ul li > div > p {
  color: #333;
  display: flex;
  align-items: center;
  font-size: 28px;
  margin: 20px 0 0 0;
}
.tab-content ul li > div > p > span {
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
.tab-content ul {
  display: flex;
  flex-direction: column;
  /* display: none; */
}
.tab-content {
  flex: 1;
  background: #fff;
}
.tabar {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  overflow: hidden;
}
section .center > div.tabar > ul li.active p {
  background: #ee7428;
}
section .center > div.tabar > ul li.active {
  color: #ee7428;
}
section .center > div.tabar > ul li p {
  height: 4px;
  width: 30px;
}
section .center > div.tabar > ul li {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;
  font-size: 24px;
  height: 1rem;
}
section .center > div.tabar > ul {
  display: flex;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 1rem;
  border-bottom: 1px solid #dcdcdc;
}
section .center > ul li:first-child {
  border-right: 1px solid #dcdcdc;
}
section .center > ul li span {
  font-size: 26px;
  color: #333;
  margin-left: 20px;
}
section .center > ul li {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
section .center > ul {
  display: flex;
  background: #fff;
  border-radius: 10px;
  height: 120px;
  justify-content: center;
  align-items: center;
  margin-top: -60px;
  position: relative;
  min-height: 120px;
}
section .center {
  margin: 0 24px;
  display: flex;
  flex-direction: column;
}
section .center > ul li img {
  width: 48px;
  height: 48px;
}
section {
  flex: 1;
}
header > div.center div > img.bank {
  width: 16px;
  height: 28px;
  margin-right: 24px;
}
header > div.center div > span {
  font-size: 28px;
  color: #fff;
  flex: 1;
  display: inline-block;
  margin-left: 20px;
}
.center {
  height: 100%;
}
header > div.center div > img {
  width: 96px;
  height: 96px;
  margin-left: 24px;
}
header > div.center div {
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  top: 50%;
  margin-top: -80px;
}
header > div.center > img {
  height: 250px;
  width: 100%;
}
header > div.center {
  width: 100%;
}
header {
  position: relative;
  height: 250px;
  width: 100%;
  display: flex;
  align-items: center;
}
.box {
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
}
</style>