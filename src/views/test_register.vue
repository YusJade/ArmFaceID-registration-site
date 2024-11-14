<template>
  <el-container class="host">
    <el-header>
      <div class="header">
        <div class="left-container">
          <el-text class="mx-1" size="large">注册用户</el-text>
        </div>
        <div class="right-container">
          <el-button text>关于</el-button>
        </div>
      </div>
    </el-header>

    <el-main>
      <div class="main">
        <el-form ref="ruleFormRef" style="max-width: 300px" :model="ruleForm" status-icon
          :rules="rules" label-width="auto" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" required size="large"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" required size="large"></el-input>
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
        <!-- 图片显示框 -->
        <div class="image-preview" v-if="!imageBase64">
          <div class="image-placeholder">
            <span>请上传图片</span>
          </div>
        </div>
        <div v-if="imageBase64" class="image-preview">
          <el-image
            style="width: 100%; height: auto;"
            :src="imageBase64"
            alt="上传的图片"
            fit="contain">
          </el-image>
        </div>
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

    // 调用后端进行注册
    return FaceRpc.Register(userInfo)
  })
    .then((resp) => {
      console.log(resp)
      ElMessage.success('注册成功')
    })
    .catch((err: RpcError) => {
      console.error(err)
      ElMessage.error(`注册失败: ${err.message}`)
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
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255,0.85);
  border-radius: 20px;
}

.right-container {
  display: flex;
  justify-content: flex-end;
}

.mx-1{
  font-weight: bold;
  border-radius: 20px;
  padding: 10px 20px;
  margin: 10px;
}

.el-button {
  border-radius: 20px;
  padding: 10px 20px;
  margin: 10px;
}

.main{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; /* 给表单和图片框之间添加间距 */
  flex-wrap: wrap; /* 保证在小屏幕下能自适应换行 */
  padding: 20px;
  border-radius: 20px;
  background-color:rgba(255, 255, 255,0.85);
  flex-direction: row;
}

/* 图片预览框样式 */
.image-preview {
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc5c5;
  max-width: 100%;
  width: 400px; /* 固定宽度 */
  height: 400px; /* 固定高度 */
  margin-left: 100px; /* 保证与表单右侧有一定间距 */
  background-color: transparent !important; /* 强制设置为透明 */
}

/* 图片占位框 */
.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc5c5;
  border-radius: 20px;
  background-color: transparent !important; /* 强制设置为透明 */
}
</style>

