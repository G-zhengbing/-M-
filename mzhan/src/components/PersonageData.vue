<template>
  <div class="box">
    <!-- <header>
      <a href="javascript:;" @click="goPersonage">
        <img src="../assets/img/fan.png" alt @click />
      </a>
      <span>我的资料</span>
    </header>-->
    <section>
      <div class="contanner">
        <ul>
          <li @click="updataHead">
            <span>头像</span>
            <div>
              <img
                class="head"
                :src="'http://liveh5.canpoint.net'+userData.head_portrait"
                alt
                v-if="userData.head_portrait != null"
              />
              <img v-else class="head" src="../assets/img/er.png" alt />
              <img class="go" src="../assets/img/fan.png" alt />
            </div>
          </li>
          <li @click="updataName">
            <span>用户名称</span>
            <div>
              <span v-if="isStudent == false">
                <span v-if="userData.student_name!=null">{{userData.student_name}}</span>
                <span v-else>学员001</span>
              </span>
              <input
                placeholder="请输入要修改的名称"
                class="student"
                type="text"
                v-show="isStudent"
                v-model="student"
                @blur="updataStudent"
                ref="input"
              />
              <img class="go" src="../assets/img/fan.png" alt />
            </div>
          </li>
          <li @click="updataGender">
            <span>性别</span>
            <div>
              <span v-if="userData.sex">{{userData.sex}}</span>
              <span v-else>请选择</span>
              <img class="go" src="../assets/img/fan.png" alt />
            </div>
          </li>
          <li @click="updataGrade">
            <span>年级</span>
            <div>
              <span v-if="userData.grade">{{userData.grade}}</span>
              <span v-else>请选择</span>
              <img class="go" src="../assets/img/fan.png" alt />
            </div>
          </li>
          <li @click="showShare">
            <span>分享海报</span>
            <div>
              <img
                class="head"
                :src="'http://liveapi.canpoint.net/'+share"
                alt
                v-if="share != null"
              />
              <img v-else class="head" src="../assets/img/er.png" alt />
              <img class="go" src="../assets/img/fan.png" alt />
            </div>
          </li>
        </ul>
      </div>
    </section>
    <!-- 头像 -->
    <van-overlay :show="isHeadModel">
      <div class="images">
        <p class="close" @click="fileClose">×</p>
        <div class="files">
          <img v-if="images.length >=1" :src="images[0].url" alt />
          <div class="file" v-if="images.length != 1">
            <i>＋</i>
            <input type="file" ref="file" @change="upload($event)" />
          </div>
        </div>
        <span @click="saveFile">确定上传</span>
      </div>
    </van-overlay>
    <!-- 海报 -->
    <van-overlay :show="isModel">
      <div class="block">
        <p class="close" @click="close">×</p>
        <img :src="'http://liveapi.canpoint.net/'+share" alt />
      </div>
    </van-overlay>
    <!--  -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      :close-on-click-action="true"
    />
    <!--  -->
    <van-action-sheet
      v-model="sex"
      :actions="gender"
      @select="onSelectGender"
      :close-on-click-action="true"
    />
  </div>
</template>

<script>
import axios from "axios";
import { UESR_DATA, UPDATE_USER, FENXIANG } from "../uilt/url";
import storage from "../uilt/storage";
export default {
  data() {
    return {
      images: [],
      isHeadModel: false,
      hallImg: [],
      fileList: [],
      share: "",
      isModel: false,
      student: "",
      isStudent: false,
      sex: false,
      userData: {},
      show: false,
      actions: [{ name: "男", value: 1 }, { name: "女", value: 2 }],
      gender: [
        { name: "一年级", value: 1 },
        { name: "二年级", value: 2 },
        { name: "三年级", value: 3 },
        { name: "四年级", value: 4 },
        { name: "五年级", value: 5 },
        { name: "六年级", value: 6 },
        { name: "七年级", value: 7 },
        { name: "八年级", value: 8 },
        { name: "九年级", value: 9 }
      ]
    };
  },
  mounted() {
    this.getUserList();
    this.sharePoster();
  },
  methods: {
    saveFile() {
      if (this.images.length == 0) {
        this.$notify({ type: "warning", message: "请选择要上传的头像" });
        return;
      }
      let data = new FormData();
      data.append("head_portrait", this.images[0]);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "bearer " + storage.getToken()
        }
      };
      axios
        .post("http://liveh5.canpoint.net/update_data", data, config)
        .then(res => {
          if (res.data.error) {
            this.$notify({ type: "warning", message: res.data.error });
            return;
          }
          if (res.data.code == 200 && res.data.ret === true) {
            this.$notify({ type: "success", message: "修改成功" });
            this.fileClose();
          }
          this.getUserList();
        });
    },

    fileClose() {
      this.isHeadModel = false;
      this.images.length = 0;
    },
    //
    upload(e) {
      this.images.length = 0;
      var that = this;
      let file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function(e) {
        file.url = reader.result;
        that.images.push(file);
      };
    },
    //上传图片
    onRead2(file) {
      let content = file.file;
      this.fileList.push(file.file.url);
      let data = new FormData();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "bearer " + storage.getToken()
        }
      };
      data.append("head_portrait", content);
      axios
        .post("http://liveh5.canpoint.net/update_data", data, config)
        .then(res => {
          if (res.data.error) {
            this.$notify({ type: "warning", message: res.data.error });
            return;
          }
          if (res.data.code == 200 && res.data.ret === true) {
            this.$notify({ type: "success", message: "修改成功" });
            this.$router.push("/personagedata");
          }
        });
    },
    close() {
      this.isModel = false;
    },
    showShare() {
      this.isModel = true;
    },
    //分享海报
    sharePoster() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: FENXIANG,
          headers: {
            Authorization: "bearer" + storage.getToken()
          }
        })
          .then(res => {
            this.share = res.data.data;
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    //修改头像
    updataHead() {
      // this.$router.push("/upload");
      this.isHeadModel = true;
    },
    outFocus() {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    //用户名
    updataStudent() {
      this.outFocus();
      if (!this.student) return (this.isStudent = false);
      axios({
        method: "post",
        url: UPDATE_USER,
        headers: {
          Authorization: "bearer" + storage.getToken()
        },
        data: {
          student_name: this.student
        }
      })
        .then(res => {
          if (res.data.error) {
            this.$notify({ type: "warning", message: res.data.error });
            return;
          }
          if (res.data.code == 200 && res.data.ret === true) {
            this.$notify({ type: "success", message: "修改成功" });
          }
          this.getUserList();
          this.student = "";
        })
        .catch(e => {
          console.error(e);
        });
      this.isStudent = false;
    },
    //修改年级
    updataGrade() {
      this.sex = true;
    },
    //修改用户名称
    updataName() {
      this.isStudent = true;
    },
    //修改性别
    updataGender() {
      this.show = true;
    },
    onSelect(item) {
      axios({
        method: "post",
        url: UPDATE_USER,
        headers: {
          Authorization: "bearer" + storage.getToken()
        },
        data: {
          sex: item.value
        }
      })
        .then(res => {
          if (res.data.error) {
            this.$notify({ type: "warning", message: res.data.error });
            return;
          }
          if (res.data.code == 200 && res.data.ret === true) {
            this.$notify({ type: "success", message: "修改成功" });
          }
          this.getUserList();
        })
        .catch(e => {
          console.error(e);
        });
    },
    onSelectGender(item) {
      axios({
        method: "post",
        url: UPDATE_USER,
        headers: {
          Authorization: "bearer" + storage.getToken()
        },
        data: {
          grade: item.value
        }
      })
        .then(res => {
          if (res.data.error) {
            this.$notify({ type: "warning", message: res.data.error });
            return;
          }
          if (res.data.code == 200 && res.data.ret === true) {
            this.$notify({ type: "success", message: "修改成功" });
          }
          this.getUserList();
        })
        .catch(e => {
          console.error(e);
        });
    },
    goPersonage() {
      this.$router.push("/personage");
    },
    getUserList() {
      axios({
        method: "get",
        url: UESR_DATA + "?" + "type=2",
        headers: {
          Authorization: "bearer" + storage.getToken()
        }
      })
        .then(res => {
          this.userData = res.data.data;
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>

<style scoped>
.images > span {
  width: 140px;
  border: 2px solid;
  margin: 0 auto;
  border-radius: 10px;
  display: inline-block;
  height: 60px;
  margin-bottom: 40px;
  line-height: 60px;
  text-align: center;
}
.van-uploader__input {
  width: 200px;
  height: 200px;
  background: red;
}
.files > img {
  margin: 40px;
  width: 200px;
  height: 200px;
}
.files {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.file > i {
  color: #969799;
  font-style: normal;
  font-size: 48px;
}
.file > input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
}
.file {
  width: 200px;
  height: 200px;
  margin: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ebedf0;
}
.images .close {
  margin: 0 10px 0 0;
  font-size: 40px;
  text-align: right;
  width: 100%;
}
.images {
  width: 600px;
  height: 600px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.block > p.close {
  position: absolute;
  bottom: -80px;
  right: 50%;
  font-size: 50px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-right: -30px;
}
.block > img {
  width: 100%;
}
.block {
  margin: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 560px;
}
.van-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.student {
  border: none;
  outline: none;
}
section .contanner ul li > div {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 28px;
}
section .contanner ul li > span {
  flex: 1;
  color: #999999;
  font-size: 28px;
}
section .contanner ul li > div > .go {
  width: 14px;
  height: 24px;
  margin-left: 30px;
}
section .contanner ul li > div > .head {
  width: 48px;
  height: 48px;
}
section .contanner ul li {
  display: flex;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid #eeeeee;
}
section .contanner ul {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.contanner {
  margin: 0 30px;
  height: 100%;
}
section {
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
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