<template>
  <div class="box">
    <header>
      <img class="back" src="../assets/img/ju.png" alt />
      <img class="logo" src="../assets/img/logo.png" alt />
    </header>
    <section>
      <div class="center">
        <van-swipe
          :show-indicators="true"
          :stop-propagation="true"
          :touchable="true"
          :autoplay="3000"
          indicator-color="white"
        >
          <van-swipe-item v-for="(item,i) in banner" :key="i">
            <van-image
              width="100%"
              height="100%"
              :src="'http://liveapi.canpoint.net/'+ item.banner_pic"
            />
          </van-swipe-item>
        </van-swipe>
        <!-- grid -->
        <div class="grid">
          <ul>
            <li @click="goCourse">
              <img src="../assets/img/shu.png" alt />
              <span>选课中心</span>
            </li>
            <li @click="goSmall">
              <img src="../assets/img/wei.png" alt />
              <span>免费课程</span>
            </li>
            <li @click="goData">
              <img src="../assets/img/liao.png" alt />
              <span>考试题库</span>
            </li>
            <li @click="goPar">
              <img src="../assets/img/ge.png" alt />
              <span>个人中心</span>
            </li>
          </ul>
        </div>
        <!-- 体验课 -->
        <div class="free" @click="goLogin">
          <img src="../assets/img/ti.png" alt />
        </div>
        <!-- 课程列表 -->
        <ul class="class">
          <li @click="goXiangqing(item.id)" v-for="(item,i) in product_subject">
            <div class="title">
              <div class="title-top">
                <span class="tag">{{item.subject}}</span>
                <span class="classify">{{item.course_name}}</span>
              </div>
              <div class="titledown">
                <p class="date">{{item.start_date}} - {{item.end_date}} 周{{item.week_day}}</p>
                <p class="time">{{item.start_time}} - {{item.end_time}}</p>
              </div>
            </div>
            <span class="money">
              <span>￥</span>
              {{item.activity_price}}
            </span>
          </li>
        </ul>
        <!-- 为什么选全品学堂 -->
        <div class="selected">
          <div class="selected-header">
            <span>为什么选全品学堂</span>
            <p></p>
          </div>
          <div class="selected-footer">
            <video
            ref="video"
            class="video"
            preload="auto"
            controls
          >
            <source src="../assets/Mp4.mp4" />
          </video>
          </div>
        </div>
        <!-- 教学实力 -->
        <div class="teaching">
          <div class="selected-header">
            <span>为什么选择全品学堂</span>
            <p></p>
          </div>
          <img src="../assets/img/shizi.png" alt="">
          <!-- <div class="teaching-user">
            <p>四大优势 成就高分</p>
            <p style="font-size:12px;">让学校课上的每1分钟，都得到100%的融会贯通。</p>
          </div>
          <ul>
            <li>
              <img src="../assets/img/san.png" alt />
              <span>
                <span>师资•</span>1%讲师筛选比例！
              </span>
            </li>
            <li>
              <span>全品师资普遍出身自名校，并具备多年一线教学经验，确保切实满足学生的真正需求。</span>
            </li>
            <li>
              <img src="../assets/img/san.png" alt />
              <span>
                <span>教学•</span>强化巩固课程内容！
              </span>
            </li>
            <li>
              <span>在学校课堂内容的基础上，系统梳理知识体系，深化知识掌握情况，高效提升成绩！</span>
            </li>
            <li>
              <img src="../assets/img/san.png" alt />
              <span>
                <span>辅导•</span>随时随地教练式陪伴！
              </span>
            </li>
            <li>
              <span>辅导老师会根据学员的学习表现，了解每个人对当节课的掌握情况，及时解决学习困扰。</span>
            </li>
            <li>
              <img src="../assets/img/san.png" alt />
              <span>
                <span>个性化•</span>针对教学，循序渐进！
              </span>
            </li>
            <li>
              <span>综合评价学员的学习进度表现，从巩固基础到突破高分，提供针对性的学习方案。</span>
            </li>
          </ul> -->
        </div>
        <!-- 微课 -->
        <ul class="class weiclass">
          <li @click="goXiangqing(item.id)" v-for="(item,i) in product_video">
            <div class="title">
              <div class="title-top">
                <span class="tag">{{item.subject}}</span>
                <span class="classify">{{item.course_name}}</span>
              </div>
              <div class="titledown">
                <p class="date">{{item.start_date}} - {{item.end_date}} 周{{item.week_day}}</p>
                <p class="time">{{item.start_time}} - {{item.end_time}}</p>
              </div>
            </div>
            <span class="money">
              <span>￥</span>
              {{item.activity_price}}
            </span>
          </li>
        </ul>
        <!-- 资料 -->
        <div class="datum">
          <div class="selected-header">
            <span>资料</span>
            <p></p>
          </div>
          <ul>
            <li v-for="(item,i) in material" :key="i">
              <a
                @click="isLogin(item.file_url)"
                ref="link_a"
                :href="link"
                rel="nofollow"
              >
                <span class="datum-class">
                  <span>{{item.subject}}</span>
                  {{item.materials_name}}
                </span>
                <span class="empty"></span>
                <span class="datum-date">{{item.create_time}}</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- 我们承诺 -->
        <div class="promise">
          <div class="selected-header">
            <span>我们承诺</span>
            <p></p>
          </div>
          <div class="promise-content">
            <ul>
              <li>
                <img src="../assets/img/er.png" alt />
                <p>先体验后报名</p>
                <div>效果不放心？尽情体验再报名</div>
              </li>
              <li>
                <img src="../assets/img/shua.png" alt />
                <p>4V1 服务体系</p>
                <div>课前-课中-课后，全程保障体验</div>
              </li>
              <li>
                <img src="../assets/img/qian.png" alt />
                <p>一年无限回放</p>
                <div>课程购买后，一年内可无限回放</div>
              </li>
            </ul>
          </div>
          <div class="promise-footer">
            <p>
              <span>Copyright © 2010-2019北京全品文教科技股份有限公司 All rights reserved.</span>
            </p>
            <div>
              <p>京ICP备15050178号-2 京ICP证161058 京网文[2017] 2347-233号</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <img src="../assets/img/fei2.png" alt />
      <div>
        <p>+86 &nbsp;</p>
        <input type="number" pattern="\d*" v-model="mobile" />
        <span @click="goLogins"></span>
      </div>
    </footer>
  </div>
</template>

<script>
import storage from "../uilt/storage";
import { HOME } from "../uilt/url";
import axios from "axios";
export default {
  mounted() {
    this.getHomeData();
  },
  data() {
    return {
      link:"javascript:;",
      mobile: "",
      file: "",
      banner: [], //广告
      material: [], //资料
      product_subject: [], //课列表
      product_video: [] //微课
    };
  },
  methods: {
    isLogin(url) {
      if (JSON.stringify(storage.getToken()) == "{}") {
        this.$router.push("/login");
        storage.clear();
        return;
      }else{
        this.link ='http://liveapi.canpoint.net/'+url
      }
    },
    //资料
    goWord(file) {
      storage.fileSave(file);
      this.$router.push("/word");
    },
    getHomeData() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: HOME,
          params: {}
        })
          .then(res => {
            this.banner = res.data.data.banner;
            this.material = res.data.data.material;
            this.product_subject = res.data.data.product_subject;
            this.product_video = res.data.data.product_video;

            resolve();
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    //专题
    goSpecial() {
      // this.$router.push('/special')
    },
    //个人中心
    goPar() {
      if (JSON.stringify(storage.getToken()) == "{}") {
        this.$router.push("/login");
        storage.clear();
        return;
      }
      this.$router.push("/personage");
    },
    //资料
    goData() {
      if (JSON.stringify(storage.getToken()) == "{}") {
        this.$router.push("/login");
        storage.clear();
        return;
      }
      this.$router.push("/data");
    },
    //微课
    goSmall() {
      // this.$router.push('/smallclass')
    },
    //课程
    goCourse() {
      // this.$router.push('/course')
    },
    goXiangqing(item) {
      storage.save(item);
      this.$router.push({path:`/databank/${item}`});
    },
    //登陆
    goLogin() {
      if (JSON.stringify(storage.getToken()) == "{}") {
        this.$router.push("/login");
        storage.clear();
      }
    },
    goLogins() {
      if (JSON.stringify(storage.getToken()) == "{}") {
        if (!this.mobile) {
          this.$notify({ type: "warning", message: "请输入手机号" });
          return;
        }
        this.$router.push({ name: "Login", params: { mobile: this.mobile } });
      }
    }
  }
};
</script>

<style scoped>
.video{
  width: 100%;
  height: 100%;
}
.van-image img {
  width: 100%;
  height: 100%;
}
.datum-date {
  font-size: 20px;
  color: #999;
}
footer div span {
  width: 160px;
  margin-left: 36px;
}
footer div input {
  border: none;
  outline: none;
  height: 40px;
  width: 240px;
}
footer div p {
  color: #b8b8b8;
  border-right: 1px solid #b8b8b8;
  padding: 4px 0;
  font-size: 28px;
  margin-top: -6px;
}
footer div {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -180px;
  display: flex;
}
.promise-content ul li div {
  color: #666;
  font-size: 12px;
}
.promise-content ul li p {
  color: #333;
  font-size: 12px;
  margin-left: -4px;
}
.promise-content ul li {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
}
.promise-content ul {
  display: flex;
  margin-top: 48px;
}
.promise-content ul li img {
  width: 106px;
  height: 106px;
}
.promise-content {
  flex: 1;
}
.promise-footer div p {
  color: #999;
  font-size: 12px;
  display: inline-block;
  width: 720px;
}
.promise-footer div,
.promise-footer p {
  text-align: center;
}
.promise-footer p {
  overflow: hidden;
}
.promise-footer p span {
  color: #999;
  font-size: 12px;
  display: inline-block;
  width: 834px;
}
.promise {
  height: 424px;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  margin-bottom: 180px;
}
.promise-footer {
  height: 98px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
}
.datum ul li > a {
  width: 100%;
  display: flex;
}
.datum ul li .datum-class span {
  color: #ee7428;
}
.datum ul li .datum-class {
  font-size: 20px;
  color: #333;
}
.datum .selected-header span {
  margin-top: 40px;
}
.datum ul li {
  display: flex;
  margin-bottom: 34px;
}
.datum ul li span.empty {
  flex: 1;
}
.datum ul {
  display: flex;
  flex-direction: column;
  margin: 0 14px;
  margin-top: 38px;
}
.datum {
  background: #fff;
  border-radius: 0.133333rem;
  margin-bottom: 50px;
}
.teaching-user {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
  font-size: 28px;
  color: #333;
  margin-bottom: 40px;
}
.selected-header span {
  font-size: 35px;
  color: #333;
  font-weight: 400;
}
.selected-header p {
  height: 0.08rem;
  background: #fd6122;
  width: 0.44rem;
}
/* .teaching > ul > li > span > span {
  color: #ff4900;
}
.teaching > ul > li:nth-of-type(even) {
  margin: 10px 0 20px 20px;
}
.teaching > ul > li:nth-of-type(odd) {
  color: #333;
  font-size: 24px;
}
.teaching > ul > li {
  font-size: 24px;
  color: #999;
  font-size: 24px;
}
.teaching > ul {
  margin: 0 20px;
  display: flex;
  flex-direction: column;
}
.teaching > ul > li > img {
  width: 20px;
  height: 20px;
} */
.teaching > img{
  width: 101%;
}
.teaching {
  height: 1062px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  margin-top: 0.233333rem;
}
.selected-footer img {
  width: 690px;
  height: 400px;
  border-radius: 12px;
  margin-bottom: -54px;
}
.selected-footer {
  margin: 20px 10px;
}
.selected-header span {
  font-size: 30px;
  color: #333;
  margin-top: 20px;
}
.selected-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}
.selected div p {
  height: 6px;
  background: #fd6122;
  width: 26px;
}
.selected {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  height: 520px;
}
.money {
  position: absolute;
  right: 0.5rem;
  bottom: 12px;
  color: #ee7428;
  font-size: 20px;
}
.titledown p.time {
  color: #999;
  font-size: 20px;
  margin-left: -14px;
  margin-left: 10px;
}
.titledown p.date {
  color: #999;
  margin-left: -0.45rem;
  margin-top: 8px;
  font-size: 20px;
  margin-left: 10px;
}
.title-top {
  display: flex;
  align-items: center;
}
.title {
  padding: 20px;
}
.classify {
  width: 3.778rem;
  height: 0.32rem;
  color: #333;
  margin-top: 8px;
  font-size: 22px;
  margin-left: 20px;
  line-height: 20px;
}
.tag {
  display: inline-block;
  background: #ee7428;
  color: #fff;
  border-radius: 0.09rem;
  font-size: 22px;
  width: 0.93rem;
  height: 0.43rem;
  line-height: 0.43rem;
  text-align: center;
  margin-top: 8px;
  margin-left: 10px;
}
.class li:nth-of-type(odd) {
  margin-right: 0.15rem;
}
.class.weiclass li:nth-of-type(odd) {
  margin-right: 0;
}
.class.weiclass li {
  width: 100%;
  height: 170px;
  background: #fff;
  border-radius: 0.126667rem;
  position: relative;
  margin-bottom: 0.233333rem;
  flex: 1;
}
.class.weiclass {
  margin-top: 0.233333rem;
}
.class li {
  width: 340px;
  height: 170px;
  background: #fff;
  border-radius: 0.126667rem;
  position: relative;
  margin-bottom: 0.233333rem;
  flex: 1;
}
.class {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
}
.free span {
  position: absolute;
}
.free img {
  width: 100%;
}
.free {
  color: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.17rem 0;
}
.specialcontent {
  height: 100%;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.specialTopic-right {
  margin-right: 74px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.specialTopic-right img {
  width: 146px;
  height: 146px;
}
.specialTopic-left ul li span {
  margin-right: 3px;
  color: #999;
  font-size: 18px;
  /* transform: scale(0.75); */
}
.specialTopic-left ul li {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
}
.specialTopic-left ul {
  display: flex;
  position: absolute;
  left: 12px;
  bottom: 10px;
}
.zhuti {
  margin-bottom: 22px;
}
.specialTopic-left p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 6.08rem;
  height: 0.372rem;
  font-size: 22px;
  color: #333;
  line-height: 22px;
  /* transform: scale(0.79); */
}
.specialTopic-left {
  flex: 1;
}
.specialTopic {
  display: flex;
  background: #fff;
  border-radius: 0.126667rem;
  height: 2.453333rem;
  margin-top: 10px;
  position: relative;
}
.grid ul li span {
  margin-top: 5px;
  font-size: 22px;
  color: #333;
}
.grid ul li img {
  width: 1.0134rem;
  height: 0.989rem;
}
.grid ul li {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.grid ul {
  display: flex;
  background: #fff;
  border-radius: 0.126667rem;
  width: 100%;
  height: 170px;
}
.center {
  margin: 0 20px;
}
.van-image img {
  width: 100%;
  height: 100%;
}
.van-swipe {
  background: #fff;
  height: 4rem;
  margin-top: 120px;
  border-radius: 0.126667rem;
  margin-bottom: 0.233333rem;
}
footer img {
  width: 100%;
  height: 100%;
}
footer {
  height: 167px;
  background: #f3f3f3;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.back {
  width: 100%;
  height: 5.5rem;
  position: relative;
}
.logo {
  position: absolute;
  width: 3rem;
  top: 0;
  margin-top: 50px;
}
header {
  height: 5.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
section {
  background-color: #f3f3f3;
  flex: 1;
  margin-bottom: 167px;
}
.box {
  display: flex;
  flex-direction: column;
}
</style>