<template>
  <div>
    <section>
      <ul>
        <li v-for="(item,i) in dataList">
          <template v-if="item.file_url.split('.')[1] == 'pdf'">
            <!-- <object :data="link_pdf" type="application/pdf"> -->
            <a ref="pdf" :href="link_pdf" @click="openFile(item)">
              <div>
                <p>
                  <span class="title">{{item.subject}}</span>
                  &nbsp;&nbsp;&nbsp;
                  <span
                    class="title-text"
                  >{{item.materials_name}}</span>
                </p>
                <span>{{item.create_time}}</span>
              </div>
            </a>
            <!-- </object> -->
          </template>
          <template
            v-if="item.file_url.split('.')[1] == 'doc' || item.file_url.split('.')[1] == 'docx'"
          >
            <a ref="word" :href="link_word" rel="nofollow" @click="openFile(item)">
              <div>
                <p>
                  <span class="title">{{item.subject}}</span>
                  &nbsp;&nbsp;&nbsp;
                  <span
                    class="title-text"
                  >{{item.materials_name}}</span>
                </p>
                <span>{{item.create_time}}</span>
              </div>
            </a>
          </template>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { DATALIST } from "../uilt/url";
import storage from "../uilt/storage";
export default {
  mounted() {
    this.getDataList();
  },
  data() {
    return {
      link_word: "javascript:;",
      link_pdf: "javascript:;",
      fileType: "",
      dataList: []
    };
  },
  methods: {
    openFile(item) {
      if (
        item.file_url.split(".")[1] == "doc" ||
        item.file_url.split(".")[1] == "docx"
      ) {
        this.link_word = "http://liveapi.canpoint.net/" + item.file_url;
      } else {
        this.link_pdf = "http://liveapi.canpoint.net/" + item.file_url;
      }
    },
    getDataList() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: DATALIST,
          headers: {
            Authorization: "bearer" + storage.getToken()
          }
        })
          .then(res => {
            this.dataList = res.data.data.list;
            resolve();
          })
          .then(e => {
            reject(e);
          });
      });
    }
  }
};
</script>

<style scoped>
.title-text {
  width: 568px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
section ul li > a > div > div span {
  color: #ee7428;
  font-size: 18px;
  margin-right: 50px;
}
section ul li > a > div > div {
  border-top: 1px solid rgba(241, 241, 241, 1);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: right;
}
section ul li > a > div > span {
  color: #999;
  margin-top: 18px;
  font-size: 0.24rem;
  margin-left: 0.133333rem;
  display: inline-block;
}
section ul li > a > div p {
  color: #333;
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-left: 10px;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
section ul li > a > div p span.title {
  display: inline-block;
  background: #ee7428;
  color: #fff;
  border-radius: 0.09rem;
  font-size: 20px;
  width: 0.93rem;
  height: 0.43rem;
  line-height: 0.43rem;
  text-align: center;
}
section ul li > a > div {
  margin: 10px 18px;
}
section ul li > a {
  width: 100%;
  height: 100%;
  position: absolute;
}
section ul li:last-child {
  margin-bottom: 40px;
}
section ul li {
  height: 120px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(29, 29, 29, 0.15);
  border-radius: 6px;
  margin-top: 24px;
  position: relative;
}
section ul {
  display: flex;
  flex-direction: column;
}
section {
  background: #fff;
  margin: 0 20px;
}
</style>