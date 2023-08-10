<template>
  <div class="main">
    <div class="logo">
      <van-image :src="picUrl" width="30%" height="2.5rem" />
    </div>

    <van-cell-group v-if="isEmail">
      <van-field
        v-model="email"
        required
        label="邮箱"
        placeholder="请输入163邮箱"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <van-cell-group v-else>
      <van-field
        v-model="phone"
        required
        label="手机号码"
        placeholder="请输入手机号码"
      />
      <van-field
        v-model="sms"
        center
        label="短信验证码"
        placeholder="请输入验证码"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="sendCode"
          :disabled="disabled"
          >{{ label }}</van-button
        >
      </van-field>
    </van-cell-group>
    <van-button size="large" @click="login" :loading="isLoading" class="btn"
      >登录</van-button
    >
    <p class="title" @click="change">{{ title }}</p>
  </div>
</template>
<script>
import { loginAPI, sendCodeAPI, textCodeAPI } from '@/api'
import { Dialog } from 'vant'
export default {
  data() {
    return {
      picUrl: require('@/images/logo.png'),
      clear: true,
      isEmail: true,
      isLoading: false,
      title: '验证码登录',
      phone: '',
      sms: '',
      email: '',
      password: '',
      label: '发送验证码',
      disabled: false,
    }
  },
  methods: {
    change() {
      this.isEmail = !this.isEmail
      if (this.isEmail) {
        this.title = '验证码登录'
      } else {
        this.title = '邮箱登录'
      }
    },
    async sendCode() {
      if (this.phone === '') {
        Dialog.alert({
          title: '验证码获取失败',
          message: '手机号码不能为空',
        }).then(() => {})
        return
      }
      const res = await sendCodeAPI({
        phone: this.phone,
      })
      var count = 60 //60秒
      this.disabled = !this.disabled
      const timer = setInterval(async () => {
        this.label = count + '秒'
        count--
        if (count === -1) {
          clearInterval(timer)
          this.disabled = !this.disabled
          this.label = '发送验证码'
        }
      }, 1000)
    },
    async login() {
      this.isLoading = !this.isLoading
      if (this.isEmail) {
        await loginAPI({
          email: this.email,
          password: this.password,
        })
          .then((res) => {
            if (res.data.code === 200) {
              sessionStorage.setItem('userInfo', JSON.stringify('user'))
              this.$router.push({ path: '/layout' })
            } else {
              Dialog.alert({
                title: '登录失败',
                message: '邮箱或密码错误',
              }).then(() => {
                this.isLoading = !this.isLoading
              })
            }
          })
          .catch((err) => {
            Dialog.alert({
              title: '登录失败',
              message: '邮箱或密码错误',
            }).then(() => {
              this.isLoading = !this.isLoading
            })
          })
      } else {
        await textCodeAPI({
          phone: this.phone,
          captcha: this.sms,
        })
          .then((res) => {
            if (res.data.code === 200) {
              sessionStorage.setItem('userInfo', JSON.stringify('user'))
              this.$router.push({ path: '/layout' })
            }
          })
          .catch((err) => {
            Dialog.alert({
              title: '登录失败',
              message: '手机号码或验证码错误',
            }).then(() => {
              this.isLoading = !this.isLoading
            })
          })
      }
    },
  },
}
</script>
<style scoped>
.main {
  padding-top: 3.7rem;
  margin: 0 auto;
  width: 90%;
}
.logo {
  padding-bottom: 30px;
  text-align: center;
}
.btn {
  margin-top: 10px;
}
.title {
  text-align: center;
  margin-top: 20px;
  color: #333;
  font-size: 10px;
}
</style>
