<template>
  <div>
    <van-nav-bar title="评论" fixed left-arrow @click-left="$router.back()" />
    <div class="main">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="(obj, index) in commentList" :key="index">
            <template>
              <div class="wrap">
                <div class="img_wrap">
                  <img :src="obj.user.avatarUrl" alt="" />
                </div>
                <div class="content_wrap">
                  <div class="header_wrap">
                    <div class="info_wrap">
                      <p>{{ obj.user.nickname }}</p>
                      <p>{{ getDate(obj.time) }}</p>
                    </div>
                    <div>{{ obj.likedCount }}点赞</div>
                  </div>
                  <div class="footer_wrap">
                    {{ obj.content }}
                  </div>
                </div>
              </div>
            </template>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { getCommentListAPI } from '@/api'
import getDateAPI from '@/utils/date.js'
export default {
  name: 'Comment',
  data() {
    return {
      commentList: [],
      isLoading: false,
      loading: false,
      finished: false,
      page: 1, //当前请求第几页数据
    }
  },
  methods: {
    onRefresh() {
      //下拉刷新
      //当下拉刷新时，isLoading会变成true
      setTimeout(() => {
        this.commentList = [] //先清空再去获取新的数据
        this.page = 1 //页面也得回来
        this.getCommentList()
      }, 3000)
    },
    async getCommentList() {
      const res = await getCommentListAPI({
        id: this.$route.query.id,
        limit: 20,
        // offset 分页
        offset: (this.page - 1) * 20, //这里20跟limit保持一致
      })
      res.data.comments.forEach((obj) => this.commentList.push(obj))
      //this.commentList = res.data.comments
      for (var i = 0; i < this.commentList.length; i++) {
        var time = this.commentList[i].time
        this.commentList[i].time = this.getDate(time)
      }
      this.isLoading = false
      this.loading = false
    },
    getDate(time) {
      return getDateAPI(time)
    },
    async onLoad() {
      this.getCommentList()
      this.page++
    },
  },
  mounted() {
    this.$store.commit('updateData', '')
  },
}
</script>
<style scoped>
.main {
  padding-top: 46px;
}
/* 容器样式 */
.wrap {
  display: flex;
}
.img_wrap {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.266667rem;
}
.img_wrap img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.content_wrap {
  flex: 1;
}

/* 右侧头部 */
.header_wrap {
  display: flex;
}
.info_wrap {
  flex: 1;
}
.info_wrap p:first-child {
  font-size: 0.373333rem;
  color: #666;
}
.info_wrap p:last-of-type {
  font-size: 0.24rem;
  color: #999;
}
.header_wrap div:last-of-type {
  color: #999;
  font-size: 0.293333rem;
}
/* 评论内容 */
.footer_wrap {
  font-size: 0.4rem;
  color: #333;
}
</style>
