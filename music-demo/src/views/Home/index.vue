<template>
  <div>
    <!-- 标签 -->
    <p class="title">推荐歌单</p>
    <div>
      <van-row gutter="10">
        <van-col
          span="8"
          v-for="obj in recommendList"
          :key="obj.id"
          @click="toRecommendList(obj.id)"
        >
          <van-image width="100%" height="3rem" :src="obj.picUrl" />
          <p class="song_name">
            {{ obj.name }}
          </p>
        </van-col>
      </van-row>
    </div>
    <p class="title">最新音乐</p>
    <SongItem
      v-for="obj in hotList"
      :key="obj.id"
      :name="obj.name"
      :author="obj.song.artists[0].name"
      :id="obj.id"
    ></SongItem>
  </div>
</template>

<script>
import { recommendMusicAPI, hotMusicAPI } from '@/api'
import SongItem from '@/components/SongItem'
export default {
  name: 'Home',
  components: { SongItem },
  data() {
    return {
      recommendList: [], //推荐歌单
      hotList: [],
    }
  },
  methods: {
    toRecommendList(songId) {
      this.$router.push({
        path: '/recommend',
        query: {
          id: songId,
        },
      })
    },
  },

  async mounted() {
    const res = await recommendMusicAPI({ limit: 6 })
    this.recommendList = res.data.result
    const songRes = await hotMusicAPI({ limit: 20 })
    this.hotList = songRes.data.result
  },
  created() {},
}
</script>
<style scoped>
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.26667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /* 对象作为伸缩盒子模型 */
  /* 设置或检索伸缩盒子对象的子元素的排列方式 */
  -webkit-box-orient: vertical;
  /* 显示的行数 */
  -webkit-line-clamp: 2;
  overflow: hidden; /*隐藏超出的内容 */
}
.search-icon {
  font-size: 24px;
  line-height: inherit;
}
</style>
