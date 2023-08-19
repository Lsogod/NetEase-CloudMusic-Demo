<template>
  <div>
    <van-nav-bar
      :title="activeTitle"
      fixed
      :left-arrow="activeTitle !== '首页' ? true : false"
      right-text="退出"
      @click-left="back"
      @click-right="logout"
    />
    <div class="main">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
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
export default {
  name: 'Layout',
  data() {
    return {
      activeTitle: this.$route.meta.title, //拿到当前路由所在信息对象里的title,但切换路由会有延迟赋值，可能导致路由已经切换，值还是之前路由的值
    }
  },
  methods: {
    logout() {
      sessionStorage.clear()
      this.$store.commit('clearUser')
      this.$router.push({ path: '/login' })
    },
    back() {
      if (this.$store.state.eventComment === '') {
        this.$router.back()
      } else {
        this.$store.state.eventComment = ''
        this.$router.replace({
          path: '/supplier/supplierAll/supplierAllBack',
        })
      }
    },
  },
  //监听路由改变
  watch: {
    $route() {
      this.activeTitle = this.$route.meta.title
    },
  },
}
</script>

<style scoped>
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>
