<template>
  <div>
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      shape="round"
    />

    <!-- 热门搜索 -->
    <div class="search_wrap" v-if="searchValue.length === 0">
      <p class="hot_title">热门搜索</p>
      <!-- 热门搜索关键字 -->
      <ul class="hot_name_wrap">
        <li
          class="hot_item"
          v-for="(obj, index) in hotSearchList"
          :key="index"
          @click="btn(obj.first)"
        >
          {{ obj.first }}
        </li>
      </ul>
    </div>

    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <SongItem
        v-for="obj in resultList"
        :key="obj.id"
        :name="obj.name"
        :author="obj.ar[0].name"
        :id="obj.id"
      ></SongItem>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, searchResultAPI } from '@/api'
import SongItem from '@/components/SongItem'
export default {
  name: 'Search',
  components: {
    SongItem,
  },
  data() {
    return {
      searchValue: '', //搜索文字
      hotSearchList: [], //热搜关键字
      resultList: [], //搜索结果
      timer: null, //保存定时器
    }
  },
  async created() {
    const res = await hotSearchAPI()
    this.hotSearchList = res.data.result.hots
  },
  methods: {
    async btn(value) {
      this.searchValue = value
      const res = await searchResultAPI({
        type: 1,
        keywords: value,
      })
      this.resultList = res.data.result.songs
      //防止搜索框监测到修改后再次走请求
      setTimeout(() => {
        clearTimeout(this.timer)
      })
      this.$store.commit('updateData', this.searchValue)
    },
  },
  mounted() {
    //this.$store.commit('updateData', this.searchValue)
  },
  watch: {
    searchValue(val) {
      clearTimeout(this.timer) //防止输入框空，还显示请求回来的数据，保证最后那次网络请求定时器关闭
      this.$store.commit('updateData', this.searchValue)
      if (val.length === 0) {
        return (this.resultList = [])
      }
      this.timer = setTimeout(async () => {
        const res = await searchResultAPI({
          type: 1,
          keywords: val,
        })
        this.resultList = res.data.result.songs
      }, 500)
      //console.log(this.searchValue)
      //this.$store.commit('updateData', this.searchValue)
    },
  },
  //防抖：n秒内最后执行一次（补充：函数在n秒内，再次执行，重新计时）
  //节流：间隔n秒内，执行一次
}
</script>

<style scoped>
/* 覆盖vant样式 */
/* deep控制scoped加入的随机属性 ，放到选择器前面，确保能够选中组件内的标签*/
/deep/ .van-field__control {
  font-size: 14px !important;
}

/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/* 热门搜索文字的标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}
/* 热门搜索-关键字 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
</style>
