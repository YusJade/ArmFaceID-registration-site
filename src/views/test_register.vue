<template>
  <el-container class="host">
      <el-header>
        <div class="header">
          <el-button text>主页</el-button>
          <el-button text>注册</el-button>
          <el-button text>登录</el-button>
        </div>
      </el-header>

      <el-main>
        <div class="main">
          <el-form ref="ruleFormRef" style="max-width: 200px" :model="ruleForm" status-icon
           :rules="rules" label-width="auto" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" required></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" required></el-input>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload v-model:file-list="fileList" class="upload-demo"
                 :on-change="uploadChange" :auto-upload="false" :limit="1">
              <template v-slot:trigger>
                <el-button type="warning" size="middle">选取文件</el-button>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button style="margin: 0 auto;" type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
        </div>
      </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import FaceRpc, { RecognitionResponse } from '@/client/client'
import { UserInfo, RecognitionRequest } from '@/client/client'
import { ElMessage, ElMessageBox } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'
import { Message } from '@/utils/message'
import type { RpcError } from 'grpc-web'

const fileList = ref<UploadUserFile[]>([
])

const imageBase64 = ref<string>();



const uploadChange = (file: UploadUserFile, fileList: UploadUserFile[]) => {
  console.log(file.raw) // file.raw才是文件格式的数据
  getBase64(file.raw as File).then((base64) => {
    console.log(base64)
    imageBase64.value = base64 as string
  })
}

const getUint8Array = (fileRaw: File) => {
  return new Promise(function (resolve: (arr: Uint8Array) => void, reject) {
    const reader = new FileReader()
    const imgResult = new Uint8Array
    reader.readAsArrayBuffer(fileRaw)
    reader.onload = function () {
      const arrayBuffer = reader.result as ArrayBuffer
      const uint8Array = new Uint8Array(arrayBuffer)
      resolve(uint8Array)
    }
    reader.onerror = function (error) {
      reject(error)
    }
    reader.onloadend = function () {
      resolve(imgResult)
    }
  })
}

const getBase64 = (fileRaw: File) => {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader()
    let imgResult = ''
    reader.readAsDataURL(fileRaw)
    reader.onload = function () {
      imgResult = reader.result as string
    }
    reader.onerror = function (error) {
      reject(error)
    }
    reader.onloadend = function () {
      resolve(imgResult)
    }
  })
}

const register = () => {
  // 检查是否上传图片
  if (fileList.value.length === 0) {
    ElMessage.error('请上传一张图片')
    return
  }

  // 获取图片的 base64 编码
  getBase64(fileList.value[0].raw as File).then((base64) => {
    const userInfo = new UserInfo()

    // 清理图片的 Base64 字符串（去掉头部部分）
    base64 = base64.replace('data:image/png;base64,', '')

    // 设置用户信息
    userInfo.setFaceImage(base64 as string)
    userInfo.setEmail(ruleForm.email)
    userInfo.setUserName(ruleForm.name)

    // 调用后端进行注册
    console.log(`准备上传图片，姓名：${ruleForm.name}, 邮箱：${ruleForm.email}`)

    // 通过 FaceRpc 注册用户
    return FaceRpc.Register(userInfo)
  })
    .then((resp) => {
      console.log(resp)
    },
      (err: RpcError) => {
        Message(err.message)
      })
}

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  name: '',
  email: ''
})

// 名字校验函数
const validateName = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入名字'))
  }

  // 名字长度检查
  if (value.length < 3 || value.length > 5) {
    return callback(new Error('名字长度必须在3到5个字符之间'))
  }

  // 名字只能包含字母和空格
  const nameRegex = /^[a-zA-Z\s]+$/
  if (!nameRegex.test(value)) {
    return callback(new Error('名字只能包含字母和空格'))
  }

  callback()
}


// 邮箱校验函数
const validateEmail = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入邮箱'))
  }

  // 邮箱正则表达式（可以根据需要修改）
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

  if (!emailRegex.test(value)) {
    callback(new Error('请检查邮箱格式'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  name: [
    { required: true, validator: validateName, trigger: 'blur' }
  ],
  email: [
    { required: true, validator: validateEmail, trigger: 'blur' }
  ]
})

</script>

<style>
body{
  background-image: url(E:\workspace_test\ArmFaceID-registration-site\src\image\preview.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}

.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(255, 255, 255,0.85);
  border-radius: 20px;
}

.el-button {
  border-radius: 20px;
  padding: 10px 20px;
  margin: 10px;
}

.main{
  border-radius: 20px;
  padding: 20px;
  background-color:rgba(255, 255, 255,0.85);
}
</style>

