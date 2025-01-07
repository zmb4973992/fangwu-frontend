<script setup lang="ts">
import { reactive, ref } from "vue"
import { NModal, NForm, NFormItem, NInput, NButton, NCard } from "naive-ui"
import userApi from "@/api/user"
import { useMessage } from "naive-ui"
import { NFlex } from "naive-ui"
import useUserStore from "@/store/user.ts"

const show = ref(false)
const formRef = ref()
const formData = reactive({
  username: <string>"",
  password: <string>"",
  confirmPassword: <string>"",
})

const formRules = {
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: ["input"],
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: ["input"],
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: "请再次输入密码",
      trigger: ["input"],
    },
    {
      validator: (_: any, value: any) => value === formData.password,
      message: "两次输入的密码不一致",
      trigger: ["input"],
    },
  ],
}

const message = useMessage()

const userStore = useUserStore()
//验证表单数据的有效性
function validateForm() {
  formRef.value.validate((error: any) => {
    //如果没有发生错误
    if (!error) {
      //验证账号和密码
      userApi.register(formData).then((res) => {
        //如果验证通过
        if (res.code === 0) {
          console.log(res.data)
          //保存token
          userStore.setAccessToken(res.data.access_token)
          //
          message.success("注册成功")
          //关闭模态框
          show.value = false
          //刷新页面
          window.location.reload()
        } else {
          //弹出错误信息
          message.error(res.message)
          //控制台打印详细的错误信息
          console.log(res.err_detail)
        }
      })
    }
  })
}

const openModal = () => {
  show.value = true
}

defineExpose({ openModal })
</script>

<template>
  <n-modal v-model:show="show">
    <n-card size="medium" style="width: 450px">
      <n-form
        ref="formRef"
        :model="formData"
        label-width="auto"
        :rules="formRules"
      >
        <n-form-item label="用户名" path="username">
          <n-input
            v-model:value="formData.username"
            placeholder="请输入用户名"
          />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="formData.password"
            type="password"
            placeholder="请输入密码"
          />
        </n-form-item>
        <n-form-item label="确认密码" path="confirmPassword">
          <n-input
            v-model:value="formData.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
          />
        </n-form-item>
        <n-flex justify="space-between">
          <n-button type="primary" @click="validateForm" style="width: 100%">
            注册
          </n-button>
        </n-flex>
      </n-form>
    </n-card>
  </n-modal>
</template>

<style scoped lang="scss"></style>
