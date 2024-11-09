<template>

  <el-form ref="ruleFormRef" style="max-width: 200px" :model="ruleForm" status-icon
           :rules="rules" label-width="auto" class="demo-ruleForm">
    <el-form-item label="姓名">
      <el-input v-model="name" required></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
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
      <el-button style="margin: 0 auto;" type="primary" @click="register">注册</el-button>
    </el-form-item>
  </el-form>
  <el-button style="margin: 0 auto;" type="success" @click="testRPC">点我发送一个 rpc
    请求</el-button>
  <!-- <ImageUploader /> -->
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import FaceRpc, { RecognitionResponse, RegistrationRequest } from '@/client/client'
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
  return new Promise(function (resolve: (base64: string) => void, reject) {
    const reader = new FileReader()
    let imgResult = ''
    reader.onload = function () {
      imgResult = reader.result as string
    }
    reader.onerror = function (error) {
      reject(error)
    }
    reader.onloadend = function () {
      resolve(imgResult)
    }
    reader.readAsDataURL(fileRaw)
  })
}

const register = () => {
  getBase64(fileList.value[0].raw as File).then((base64) => {
    const info = new UserInfo
    // 抹去编码后字符串的头部
    base64 = base64.replace('data:image/png;base64,', '')
    console.log(base64)
    info.setFaceImage(base64 as string)
    return FaceRpc.Register(info)
  })
    .then((resp) => {
      console.log(resp)
    },
      (err: RpcError) => {
        Message(err.message)
      })
}

const testRPC = () => {
  FaceRpc.Recognize('')
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

/** 表单格式检查：见 Element-Plus Form 官方文档 */

const ruleFormRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass')
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style></style>