<template>
  <div class="box" ref="box">
    <scroller>
      <template v-if="obj.pic.length != 0|| obj.video_url">
        <header>
          <template v-if="obj.type == 2">
            <video
              ref="video"
              class="video"
              preload="auto"
              v-if="obj.video_url"
              controls="controls"
            >
              <source :src="'http://liveapi.canpoint.net'+obj.video_url" type="video/mp4" />
            </video>
          </template>
          <template v-if="obj.pic.length != 0 && obj.type == 1">
            <van-swipe
              :show-indicators="true"
              :stop-propagation="true"
              :touchable="true"
              :autoplay="3000"
              indicator-color="white"
            >
              <van-swipe-item>
                <van-image
                  v-for="(item,i) in obj.pic"
                  :key="i"
                  width="100%"
                  height="100%"
                  :src="'http://liveapi.canpoint.net/'+item"
                />
              </van-swipe-item>
            </van-swipe>
          </template>
        </header>
      </template>
      <section>
        <div class="contanner">
          <div class="center">
            <p>
              <span>{{obj.subject == 1? "数学" : "英语"}}</span>
              &nbsp;&nbsp;&nbsp;{{obj.course_name}}
            </p>
            <span>{{obj.start_date}} - {{obj.end_date}}</span>
            <i>￥{{obj.activity_price}}</i>
            <div>服务:正品保证</div>
          </div>
        </div>
      </section>
      <footer>
        <div class="contanner">
          <div class="datalis">
            <div class="daralis-content" v-if="obj.product_content">
              <p>课程详情</p>

              <div class="content" v-html="obj.product_content"></div>
            </div>
          </div>
        </div>
      </footer>
    </scroller>
    <div class="btn">
      <img @click="showKefu" src="../assets/img/ke.png" alt />
      <p>
        <span class="bao" @click="isLogin" v-if="obj.type == 2">免费领取</span>
        <span class="ling" @click="goOrder">立即报名</span>
      </p>
    </div>
    <!-- 客服 -->
    <van-overlay :show="isKefu">
      <div class="block">
        <p class="alert">温馨提示</p>
        <div>
          <p class="title">
            客服电话 :
            <input id="span" @click="clone" value="010-57121656" readonly />
          </p>
          <span>*有任何问题可联系我们的客服</span>
        </div>
        <p class="confirm" @click="close">确定</p>
      </div>
    </van-overlay>
    <Loading v-if="showLoading" />
  </div>
</template>

<script>
import Loading from "../uilt/loading/Loading";
import axios from "axios";
import storage from "../uilt/storage";
import { DRAW, GETDRAW, ISGETDRAW, DATALISTS } from "../uilt/url";
export default {
  components: {
    Loading
  },
  data() {
    return {
      showLoading: false,
      isKefu: false,
      item: this.$route.params.id ? this.$route.params.id : storage.get(),
      obj: {
        pic: []
      }
    };
  },
  created() {
    this.showLoading = true;
    this.getList().then(() => {
      this.showLoading = false;
    });
  },
  mounted() {
    document.documentElement.scrollTop = 0;
    var herf = window.location.href.split("#")[1].split("/");
    if (herf[1] != "databank" && !herf[2]) {
      window.location.href += "databank/" + storage.get();
    }
  },
  methods: {
    clone() {
      let link = document.getElementById("span");
      link.select();
      document.execCommand("Copy");
    },
    close() {
      this.isKefu = false;
    },
    showKefu() {
      this.isKefu = true;
    },
    //获取当前商品信息
    getList() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: DATALISTS + "?product_id=" + this.item,
          headers: {
            Authorization: "bearer" + storage.getToken()
          }
        })
          .then(res => {
            if (res.data.data.week_day == 1) {
              res.data.data.week_day = "一";
            } else if (res.data.data.week_day == 2) {
              res.data.data.week_day = "二";
            } else if (res.data.data.week_day == 3) {
              res.data.data.week_day = "三";
            } else if (res.data.data.week_day == 4) {
              res.data.data.week_day = "四";
            } else if (res.data.data.week_day == 5) {
              res.data.data.week_day = "五";
            } else if (res.data.data.week_day == 6) {
              res.data.data.week_day = "六";
            } else if (res.data.data.week_day == 7) {
              res.data.data.week_day = "日";
            }
            this.obj = res.data.data;
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    isLogin() {
      this.getDraw();
    },
    //是否免费领取
    getDraw() {
      if (JSON.stringify(storage.getToken()) == "{}") {
        this.$router.push("/login");
        storage.clear();
        return;
      }
      this.showLoading = true;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: DRAW,
          headers: {
            Authorization: "bearer" + storage.getToken()
          }
        })
          .then(res => {
            if (res.data.code == 403) {
              this.$router.push("/login");
              storage.clear();
            } else {
              if (res.data.code == 1000) {
                return new Promise((resolve, reject) => {
                  axios({
                    method: "post",
                    url: GETDRAW + "/" + this.item,
                    headers: {
                      Authorization: "bearer" + storage.getToken()
                    }
                  })
                    .then(res => {
                      if (res.data.ret) {
                        this.$notify({ type: "warning", message: "领取成功" });
                      } else {
                        this.$notify({ type: "warning", message: "领取失败" });
                      }
                      resolve();
                      this.showLoading = false;
                    })
                    .catch(e => {
                      this.showLoading = false;
                      reject(e);
                    });
                });
              } else if (res.data.ret) {
                this.$notify({ type: "warning", message: "已领取过其他微课" });
                this.showLoading = false;
                return;
              }
            }
            this.showLoading = false;
            resolve();
          })
          .catch(e => {
            this.showLoading = false;
            reject(e);
          });
      });
    },
    goOrder() {
      if (JSON.stringify(storage.getToken()) == "{}") {
        this.$router.push("/login");
        storage.clear();
        return;
      }
      this.$router.push({ path: `/order/${this.item}` });
    }
  }
};
</script>

<style scoped>
.block > div > p > input {
  color: #1989fa;
  border: none;
  outline: none;
  width: 2.8rem;
}
.block > div > span {
  color: #a5a4a4;
  font-size: 13px;
}
.block .confirm {
  height: 60px;
  border-top: 1px solid #ccc;
  color: #1989fa;
  line-height: 60px;
  font-size: 32px;
}
.block > div {
  flex: 1;
  color: #646566;
}
.block .alert {
  margin: 25px 0;
  font-size: 32px;
}
.block .title {
  font-size: 28px;
  color: #333;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 80px;
  line-height: 80px;
  display: flex;
  justify-content: center;
}
.block {
  width: 6rem;
  height: 4rem;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.van-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.content {
  height: 100%;
}
div.content > p {
  margin-bottom: 200px;
}
.contanner,
.datalis,
.daralis-content {
  height: 100%;
}
.video {
  width: 100%;
  height: 100%;
}
footer {
  background: #fff;
  flex: 1;
  position: relative;
}
.back {
  height: 20px;
}
div.btn > p > span.bao {
  background: #f19a38;
  width: 100%;
  height: 100%;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
}
div.btn > p > span {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
div.btn > p {
  background: #ee7428;
  flex: 1;
  height: 70px;
  border-radius: 40px;
  color: #fff;
  font-size: 28px;
  display: flex;
  margin-right: 0.32rem;
}
.content {
  height: 18px;
  background: #f3f3f3;
}
.contanner {
  margin: 0 24px;
  margin-top: 20px;
}
div.btn img {
  width: 64px;
  height: 76px;
  margin-right: 20px;
  margin-left: 0.32rem;
}
div.btn {
  display: flex;
  height: 100px;
  align-items: center;
  margin-bottom: 60px;
  position: fixed;
  bottom: -60px;
  left: 0;
  width: 100%;
  background: #fff;
}
.datalis img {
  width: 100%;
}
.datalis > div.daralis-content > p {
  font-size: 30px;
  color: #333;
  margin: 20px;
}
.datalis > div.daralis-content > div.content > p {
  width: 100%;
}
.datalis > div.daralis-content > div.content {
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 1.4rem;
}
.datalis {
  display: flex;
  flex-direction: column;
}
.center > div {
  color: #333;
  font-size: 24px;
  border-top: 1px solid #dcdcdc;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 60px;
  line-height: 60px;
  width: 100%;
}
.center > i {
  color: #ee7428;
  font-size: 28px;
  margin-right: 50px;
  font-style: normal;
  display: block;
  margin-top: 20px;
}
.center > span {
  color: #999;
  margin-top: 18px;
  font-size: 0.24rem;
  margin-left: 0.133333rem;
  display: inline-block;
}
.center p {
  color: #333;
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 28px;
  padding-top: 30px;
}
.center p span {
  display: inline-block;
  background: #ee7428;
  color: #fff;
  border-radius: 0.09rem;
  font-size: 24px;
  width: 0.93rem;
  height: 0.43rem;
  line-height: 0.43rem;
  text-align: center;
}
.center {
  position: relative;
  height: 3.3rem;
}
.contarner {
  height: 100%;
}
.box {
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
}
section {
  background: #fff;
  margin-bottom: 20px;
  position: relative;
}
.van-image {
  height: 4rem !important;
}
header {
  width: 100%;
  height: 4rem;
  background: #fff;
  position: relative;
}
</style>