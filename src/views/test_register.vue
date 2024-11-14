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
            <el-input v-model="name" required></el-input>
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
            <el-button style="margin: 0 auto;" type="primary"
                 native-type="submit">注册</el-button>
          </el-form-item>
          <el-button style="margin: 0 auto;" type="success" @click="testRPC">点我发送一个 rpc
            请求</el-button>
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

const name = ref('');
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


const testRPC = () => {
  //FaceRpc.Recognize('')
  const userInfo = new UserInfo();
  userInfo.setEmail('test@email.com')
  userInfo.setUserName('testPerson')
  userInfo.setFaceImage(imageBase64.value as string)
  // TODO: MsgBox
  console.log(`准备上传图片 ${fileList.value[0]}`)
  getUint8Array(fileList.value[0].raw as File).then((arr) => {
    // 记得 return
    return FaceRpc.Recognize(arr)
  })
    .then((resp: RecognitionResponse | null) => {
      Message(`${resp?.getRes.name}，欢迎你`)
    }, (err: RpcError) => {
      console.log(err)
      Message(`${err?.message}`)
    })
}

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  name: '',
  email: ''
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
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

