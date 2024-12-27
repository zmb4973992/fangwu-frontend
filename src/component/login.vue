<script setup lang="ts">
import { ref } from "vue"
import { NModal, NForm, NFormItem, NInput, NButton, NCard } from "naive-ui"
import userApi from "@/api/user"
import useUserStore from "@/store/user"
import { useMessage } from "naive-ui"

const show = ref(false)
const formRef = ref()
const formData = ref({
  username: "",
  password: "",
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
}

const userStore = useUserStore()
const message = useMessage()

//验证表单数据的有效性
function validateForm() {
  formRef.value.validate((error: any) => {
    //如果没有发生错误
    if (!error) {
      //验证账号和密码
      userApi.login(formData.value).then((res) => {
        //如果验证通过
        if (res.code === 0) {
          //保存token
          userStore.setAccessToken(res.data.access_token)
          //
          message.success("登录成功")
          //关闭模态框
          show.value = false
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
    <n-card size="medium" style="width: 400px">
      <n-form
        ref="formRef"
        :model="formData"
        label-width="auto"
        :rules="formRules"
      >
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="formData.username" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input v-model:value="formData.password" type="password" />
        </n-form-item>
        <n-button type="primary" @click="validateForm" style="width: 100%">
          登录
        </n-button>
      </n-form>
    </n-card>
  </n-modal>



</template>

<style scoped lang="scss"></style>
