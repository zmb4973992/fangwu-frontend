<script setup lang="ts">
import { ref } from "vue"
import { NModal, NForm, NFormItem, NInput, NButton, NCard } from "naive-ui"
import userApi from "@/api/user"

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
      trigger: ["input" ],
    },
  ],
}

//验证表单数据的有效性
function validateForm() {
  formRef.value.validate((error: any) => {
    if (!error) {
      console.log("验证通过")
      userApi.login(formData.value).then((res:any) => {
        console.log(res)
      })
    } else {
      console.log("验证失败")
    }
  })

  console.log(formData.value)
}

const openModal = () => {
  show.value = true
}

const closeModal = () => {
  show.value = false
}

defineExpose({ openModal, closeModal })
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
