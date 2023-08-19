<template>
  <div class="main">
    <div class="logo">
      <van-image :src="picUrl" width="30%" height="2.5rem" />
    </div>

    <van-cell-group>
      <van-field
        v-model="nickname"
        required
        label="用户名"
        placeholder="请输入用户名"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
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
    <van-button size="large" @click="register" :loading="isLoading" class="btn"
      >注册</van-button
    >
    <div class="title">
      <p class="code" @click="goBack">返回</p>
      <p class="goPC" @click="goPC">网页版访问</p>
    </div>
  </div>
</template>
<script>
import { sendCodeAPI, textCodeAPI } from "@/api";
import { registerAPI, registerPhoneAPI } from "@/api";
import { Dialog } from "vant";

export default {
  data() {
    return {
      picUrl: require("@/images/logo.png"),
      clear: true,
      isLoading: false,
      title: "验证码登录",
      phone: "",
      sms: "",
      password: "",
      nickname: "",
      label: "发送验证码",
      disabled: false,
    };
  },
  methods: {
    async sendCode() {
      if (this.phone === "") {
        Dialog.alert({
          title: "验证码获取失败",
          message: "手机号码不能为空",
        }).then(() => {});
        return;
      }
      const res = await sendCodeAPI({
        phone: this.phone,
      });
      var count = 60; //60秒
      this.disabled = !this.disabled;
      const timer = setInterval(async () => {
        this.label = count + "秒";
        count--;
        if (count === -1) {
          clearInterval(timer);
          this.disabled = !this.disabled;
          this.label = "发送验证码";
        }
      }, 1000);
    },
    async register() {
      this.isLoading = !this.isLoading;
      await registerPhoneAPI({
        phone: this.phone,
      })
        .then(async (res) => {
          if (res.data.exist === 1) {
            Dialog.alert({
              title: "注册失败",
              message: "手机号码已经被注册过",
            }).then(() => {
              this.isLoading = !this.isLoading;
            });
          } else {
            await registerAPI({
              captcha: this.sms,
              phone: this.phone,
              password: this.password,
              nickname: this.nickname,
            }).then(async (res) => {
              await textCodeAPI({
                phone: this.phone,
                captcha: this.sms,
              })
                .then((res) => {
                  if (res.data.code === 200) {
                    Dialog.alert({
                    title: "注册成功",
                    message: "账号注册成功",
                  }).then(() => {
                    this.isLoading = !this.isLoading;
                  });
                  }
                })
                .catch((err) => {
                  Dialog.alert({
                    title: "注册失败",
                    message: "手机号码或验证码错误",
                  }).then(() => {
                    this.isLoading = !this.isLoading;
                  });
                });
            });
          }
        })
        .catch((err) => {
          Dialog.alert({
            title: "注册失败",
            message: "手机号码或验证码错误",
          }).then(() => {
            this.isLoading = !this.isLoading;
          });
        });
    },
    goPC() {
      window.location.href = "http://pc.tafleo.top";
    },
    goBack() {
      this.$router.push({ path: "/" });
    },
  },
};
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
  margin-top: 50px;
}
.code {
  margin-right: 20px;
  color: #ccc;
  font-size: 13px;
  display: inline-block;
}
.goPC {
  margin-left: 20px;
  color: #ccc;
  font-size: 13px;
  display: inline-block;
}
</style>
