<template>
  <div class="app">
    <!--confirm   点击右上方完成按钮   一个数组参数，具体格式看下方数据格式章节
      cancel    点击取消按钮时 
    change    选项改变时触发 参考Picker 实例，所有列选中值，当前列对应的索引-->
    <van-cell-group>
      <!--cell+popup+area省市区的坑-->
      <van-cell v-model="carmodel" title="省/市/区" value @click="show = true"></van-cell>
      <van-popup v-model="show" position="bottom">
        <van-area
          ref="area"
          value="110000"
          :area-list="areaList"
          @change="onChange"
          @confirm="show = false"
          @cancel="show = false"
        />
      </van-popup>
    </van-cell-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      carmodel: "",
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市"
        },
        city_list: {
          110100: "北京市",
          110200: "县",
          120100: "天津市",
          120200: "县"
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          120101: "和平区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区"
        }
      }
    };
  },
  methods: {
    onChange(picker, value, index) {
      // console.log("当前值：" + value + "当前索引：" + index);
      let areaName = "";
      for (var i = 0; i < value.length; i++) {
        areaName = areaName + value[i].name + " ";
      }
      this.carmodel = areaName;
    }
  }
};
</script>
