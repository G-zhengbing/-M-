<template>
  <div class="box">
    <header>
      <span class="skip" @click="goHome">跳过</span>
      <span class="empty"></span>
      <span class="save" @click="save">保存</span>
    </header>
    <section>
      <div class="grade">
        <div>
          <h3>年级</h3>
          <p></p>
        </div>
        <ul>
          <li @click="setActive(7)" :class="{'active':gradeNum == 7}">七年级</li>
          <li @click="setActive(8)" :class="{'active':gradeNum == 8}">八年级</li>
          <li @click="setActive(9)" :class="{'active':gradeNum == 9}">九年级</li>
        </ul>
      </div>
      <div class="subject">
        <div>
          <h3>科目</h3>
          <p></p>
        </div>
        <ul>
          <li @click="getActive(1)" :class="{'active':subNum == 1}">数学</li>
          <li @click="getActive(2)" :class="{'active':subNum == 2}">英语</li>
          <li @click="getActive(3)" :class="{'active':subNum == 3}">语文</li>
          <li @click="getActive(4)" :class="{'active':subNum == 4}">物理</li>
          <li @click="getActive(5)" :class="{'active':subNum == 5}">化学</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { CLASSIFY } from "../uilt/url";
import storage from "../uilt/storage";
export default {
  data() {
    return {
      isActive: false,
      gradeNum: 0,
      subNum: 0
    };
  },
  methods: {
    save() {
      if (this.gradeNum == 0 && this.subNum == 0) {
        this.$notify({ type: "warning", message: "请填写信息或跳过" });
        return;
      }
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: CLASSIFY,
          headers: {
            Authorization: "bearer" + storage.getToken()
          },
          data: {
            grade: this.gradeNum ? this.gradeNum : "",
            subjects: this.subNum ? this.subNum : ""
          }
        })
          .then(res => {
            if (res.data.error) {
              this.$notify({ type: "warning", message: res.data.error });
              return;
            }
            if (res.data.ret) {
              this.$router.push("/home");
            }
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    goHome() {
      this.$router.push("/home");
    },
    setActive(num) {
      this.gradeNum = num;
    },
    getActive(num) {
      this.subNum = num;
    }
  }
};
</script>

<style scoped>
.grade > ul li.active,
.subject > ul li.active {
  background: #ee7428;
  color: #fff;
  border-radius: 6px;
}
.grade > ul li,
.subject > ul li {
  width: 174px;
  height: 58px;
  border: 2px solid #dcdcdc;
  text-align: center;
  line-height: 58px;
  color: #333;
  font-size: 28px;
  border-radius: 6px;
  margin: 26px;
}
.grade > ul,
.subject > ul {
  flex-wrap: wrap;
  display: flex;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.grade > div p,
.subject > div > p {
  width: 30px;
  height: 4px;
  background: #ee7428;
  margin-top: 4px;
}
.grade > div,
.subject > div {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  width: 100%;
}
section {
  flex: 1;
  padding: 0 30px;
}
header span.save {
  text-align: right;
}
header span.empty {
  flex: 1;
}
header span {
  padding: 20px;
  color: #333;
  font-size: 14px;
}
header {
  height: 80px;
  display: flex;
  border-bottom: 1px solid #dbdbdb;
  align-items: center;
  padding: 0 30px;
}
.box {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>