<template>
  <div>
    <van-nav-bar title="歌单" fixed left-arrow @click-left="$router.back()" />
    <div class="main">
      <van-card :title="name" :thumb="imageURL" class="song" />
      <SongItem
        v-for="(obj, index) in recommendList"
        :key="obj.id"
        :name="obj.name"
        :author="obj.ar[0].name"
        :id="obj.id"
      ></SongItem>
    </div>
    <van-tabbar route>
      <van-tabbar-item
        icon="home-o"
        @click="$router.push({ path: '/layout/home' }, () => {})"
        >首页</van-tabbar-item
      >
      <van-tabbar-item
        icon="search"
        @click="$router.push({ path: '/layout/search' }, () => {})"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script>
import { getRecommendListDetailAPI } from '@/api'
import SongItem from '@/components/SongItem'
export default {
  components: {
    SongItem,
  },
  data() {
    return {
      id: this.$route.query.id,
      recommendList: [],
      imageURL: '',
      name: '',
    }
  },
  async created() {
    const res = await getRecommendListDetailAPI({ id: this.id })
    this.imageURL = res.data.playlist.coverImgUrl
    this.name = res.data.playlist.name
    this.recommendList = res.data.playlist.tracks
  },
}
</script>
<style scoped>
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
.song {
  font-size: 0.346667rem;
}
</style>
