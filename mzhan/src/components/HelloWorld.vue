<template>
  <div class="box">
    <div class="tab">
      <ul>
        <li class="signin" @click="tab(1)" :class="{active: num ==1}">
          <span>注册</span>
          <p></p>
        </li>
        <li class="password" @click="tab(2)" :class="{active: num ==2}">
          <span>找回密码</span>
          <p></p>
        </li>
      </ul>
    </div>
    <div class="content">
      <div v-if="num == 1">
        <input type="text" placeholder="手机号" v-model="form.mobile" />
        <input type="password" placeholder="密码" v-model="form.passwordOne" />
        <input type="password" placeholder="再次确认密码" v-model="form.passwordTow" />
        <p class="code">
          <input type="text" placeholder="短信验证码" />
          <span @click="sion" v-if="isSion">{{text}}</span>
          <span v-else>获取验证码({{code}})</span>
        </p>
        <div class="btn">
          <!-- <span class="login">已有账号去登陆</span> -->
          <span class="save" @click="saveSignin">确认注册</span>
        </div>
        <p class="message">*温馨提示每个手机号只能注册一个账号</p>
      </div>
      <div v-else>22222</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { SIGNIN,SEND } from "../uilt/url";
export default {
  data() {
    return {
      form: {
        mobile: "16601521897"
      },
      code: 120,
      num: 1,
      isSion: true,
      text: "发送验证码",
      myreg: /^[1][3,4,5,7,8,6,9][0-9]{9}$/
    };
  },
  methods: {
		saveSignin(){

		},
    tab(num) {
      this.num = num;
    },
    sion() {
      if (!this.form.mobile || !this.myreg.test(this.form.mobile)) {
        this.$notify({ type: "warning", message: "请填写正确的手机号码" });
        return;
      } else if (!this.form.passwordOne || !this.form.passwordTow) {
        this.$notify({ type: "warning", message: "密码不能为空" });
        return;
      } else if (this.form.passwordOne != this.form.passwordTow) {
        this.$notify({ type: "warning", message: "两次密码不同" });
        return;
      } else if (this.checkPwd(this.form.passwordOne) == "no") {
        return;
      }
      axios({
        method: "post",
        url: SIGNIN,
        data: {
          mobile: this.form.mobile
        }
      })
        .then(res => {
          if (res.data.ret) {
            this.$notify({
              type: "warning",
              message: "您已注册，请请直接登陆"
            });
            return;
          } else {
            this.sendCode();
            this.isSion = false;
            if (!this.isSion) {
              --this.code;
              let set = window.setInterval(() => {
                if (this.code-- <= 1) {
                  this.code = 120;
                  window.clearInterval(set);
                  this.isSion = true;
                }
              }, 1000);
            }
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    //发送验证码
    sendCode() {
      // this.form.password = "";
      axios({
        method: "post",
        url: SEND,
        data: {
          mobile: this.form.mobile
        }
      })
        .then(res => {
          if (res.data.error) {
            this.$notify({ type: "warning", message: res.data.error });
          }
          if (res.data.code == 200 && res.data.ret == true) {
            this.$notify({ type: "success", message: "验证码已发送" });
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    //校验密码
    checkPwd(str) {
      var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im;
      var pattern4 = /\s+/g;
      if (pattern4.exec(str)) {
        this.$notify({
          type: "warning",
          message: "不能有空格、换行、tab缩进等所有的空白"
        });
        return "no";
      }
      if (patrn.test(str)) {
        this.$notify({ type: "warning", message: "不可用特殊字符" });
        return "no";
      } else {
        if (str.length < 6) {
          this.$notify({ type: "warning", message: "密码不能小于6位" });
          return "no";
        }
        if (!str) {
          this.$notify({ type: "warning", message: "密码不能为空" });
          return "no";
        }
      }
      return "ok";
    }
  }
};
</script>

<style scoped>
.message {
  text-align: center;
  margin: 10px 0;
	font-size: 24px;
	color: #666;
}
.btn span.save {
  /* margin-left: 20px; */
  background: #ee7428;
  text-align: center;
  color: #fff;
}
.btn span.login {
  margin-right: 20px;
  border: 3px solid #ee7428;
  text-align: center;
  color: #ee7428;
}
.btn span {
  display: inline-block;
  flex: 1;
  height: 70px;
  line-height: 70px;
  font-size: 28px;
  box-sizing: border-box;
  border-radius: 4px;
}
.btn {
  display: flex;
}
.content > div p.code > span {
  width: 258px;
  margin: 10px 0;
  text-align: center;
  height: 64px;
  line-height: 64px;
  border-radius: 6px;
  box-sizing: border-box;
  color: #ee7428;
  border: 2px solid #ee7428;
}
.content > div p.code > input {
  width: 362px;
  border: 2px solid #aaa;
  font-size: 20px;
  text-align: left;
  height: 60px;
  line-height: 60px;
  margin: 10px 20px 10px 0;
  padding: 0 20px;
  border-radius: 4px;
  background: 0 0;
}
.content > div p.code {
  display: flex;
}
input::-webkit-input-placeholder {
  color: #666;
}
.content > div > input {
  border: 2px #aaa solid;
  border-radius: 4px;
  background: 0 0;
  text-align: left;
  font-size: 20px;
  /* width: 438px; */
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  margin: 10px 0;
}
.content > div {
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  margin: 0 32px;
}
.tab ul li.active p {
  background: #ee7428;
}
.tab ul li p {
  height: 4px;
}
.tab ul li.password p {
  width: 104px;
}
.tab ul li.signin p {
  width: 52px;
}
.tab ul li span {
  height: 80px;
  font-size: 28px;
  color: #333;
}
.tab ul li {
  width: 120px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tab ul {
  display: flex;
}
.tab {
  height: 100px;
  line-height: 100px;
}
.box {
  display: flex;
  flex-direction: column;
}
</style>