<template>
  <el-container class="container">
    <el-header>
      <div class="header">
        <div class="left-container">
          <el-text class="mx-1">注册人脸信息</el-text>
        </div>
        <div class="right-container">
          <el-button text style="font-size: medium;"
                     @click="drawerChat = true">留言板</el-button>
          <el-button text style="font-size: medium;"
                     @click="drawerAbout = true">关于</el-button>
        </div>
      </div>
    </el-header>

    <el-main>
      <div class="main">
        <div class="form-card ">
          <div style="
            text-align: center;
            font-size: 20px;
            background-clip: text;
            background-image: -webkit-linear-gradient(0deg, #5EABEBFF, #D8E0E6FF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;">ArmFaceID</div>
          <div style="
            text-align: center;
            font-size: 20px;
            background-clip: text;
            background-image: -webkit-linear-gradient(0deg, #CFD3DFFF, #488CDAFF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;">Registration-Site</div>
          <el-form ref="ruleFormRef"
                   style="max-width: 80%; margin-top: 30px; margin-left: 8%; margin-right: 0%;"
                   :model="ruleForm" status-icon :rules="rules" label-width="auto"
                   class="demo-ruleForm">
            <el-form-item label="昵称" prop="name">
              <el-input v-model="ruleForm.name" required size="large"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" required size="large"></el-input>
            </el-form-item>
            <el-form-item>
              <span style="color: grey;">正脸图片</span>
              <el-upload v-model:file-list="fileList" class="upload-demo"
                         :on-change="uploadChange" :auto-upload="false" :limit="1"
                         :on-remove="onRemove" :on-exceed="handleExceed">
                <template v-slot:trigger>
                  <el-button style="margin-bottom: 0px;" type="primary" text="primary"
                             size="middle">选取图片</el-button>
                </template>
              </el-upload>
            </el-form-item>
            <button type="button" @click="register"
                    :class="{ 'disabled-button': !enableBtn, 'color-shift-btn': enableBtn }">注册</button>
          </el-form>
          <el-checkbox v-model="enableBtn" label="勾选将启用注册按钮，注册时将会采集脸部图像。" size="small" />
        </div>
        <!-- 图片显示框 -->
        <div class="image-preview" v-if="!imageBase64">
          <div class="image-placeholder">
          </div>
        </div>
        <div v-if="imageBase64" class="image-preview">
          <el-image style="width: 100%; height: auto;" :src="imageBase64" alt="上传的图片"
                    fit="contain">
          </el-image>
        </div>
      </div>
    </el-main>
    <el-footer class="footer">
      <p>since 2024.</p>
      <img style="width: 1%;" src="../assets/github-mark.svg" />
      <a style="color: #8B94EBFF;"
         href="https://github.com/YusJade/SpringBoot-MyBatis-Example">YusJade/ArmFaceID</a><br />
      <img style="width: 1%;" src="../assets/github-mark.svg" />
      <a style="color: #8B94EBFF;"
         href="https://github.com/YusJade/SpringBoot-MyBatis-DBDesign">YusJade/ArmFaceID-registration</a>
    </el-footer>
  </el-container>

  <el-drawer v-model="drawerAbout" title="关于" :with-header="false">
    <ContributorCanvas></ContributorCanvas>
  </el-drawer>
  <el-drawer v-model="drawerChat" title="留言板" :with-header="false">
    <!-- <MessageBorad></MessageBorad> -->
    <h2>留言板</h2>
    <p>或许可以在这里写点什么？🧐😶‍🌫️</p>
    <MessageBoard :data="doubleMsgs" title="" v-slot="{ item, index }">
      <div style="display: flex; align-items: center; padding-top: 0%;">
        <img style="width: 3.7rem; height: 3.7rem; border-radius: 50%; margin-top: 0.3rem"
             :src="images[index % 2]" alt="用户头像" />
        <div style="margin-left: 1rem;">
          <p style="font-size: 0.75rem; margin-top: 0.3rem; margin-bottom: 0;">2小时前</p>
          <div style="font-size: 0.75rem; margin-top: 0.1rem;">{{ item.msg }}</div>
        </div>
      </div>
    </MessageBoard>
    <div style="padding: 1rem; background-color: var(--primary);">
      <div style="display: flex;">
        <el-input type="text" placeholder="在这里输入您的留言" size="large"
                  style="flex: 1; padding: 0.5rem; background-color: var(--input); color: var(--foreground); border-radius: 0.5rem;" />
        <el-button type="primary" size="large"
                   style="padding: 1rem 1.6rem; border-radius: 10px;">发送</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import FaceRpc, { RecognitionResponse } from '@/client/client'
import { UserInfo, RecognitionRequest } from '@/client/client'
import { ElMessage, ElMessageBox } from 'element-plus'
import ContributorCanvas from '@/components/ContributorCanvas.vue'
import MessageBoard from '@/components/MessageBoard.vue'
import type { UploadProps, UploadUserFile, UploadFiles, UploadFile } from 'element-plus'
import { Message } from '@/utils/message'
import { StatusCode, type RpcError } from 'grpc-web'
import { type MessageItem } from '@/http'
import { testMsgs } from '@/test'
import { rejects } from 'assert'

const enableBtn = ref(false)

const images = ref([
  "src/assets/chat_1.png",
  "src/assets/chat_2.jpg",
])


const doubleMsgs = computed(() => {
  return testMsgs.value.concat(testMsgs.value)
})


// 发送留言板信息
// TODO: 限制高频率发送
const sendMsg = () => {

}

// 轮询留言板信息
const getMsg = () => {

}


const fileList = ref<UploadUserFile[]>([
])

const imageBase64 = ref<string>()
const drawerAbout = ref<boolean>()
const drawerChat = ref<boolean>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  ElMessage.error('请先移除当前图片')
}

const onRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log("Uploader on-remove", fileList.value)
  if (fileList.value.length != 0) {
    imageBase64.value = undefined
  }
}

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
  return new Promise(function (resolve: (res: string) => void, reject) {
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
  console.info("register btn clicked")
  if (!enableBtn.value) {
    ElMessage.info("请勾选并启用注册按钮")
    return
  }

  // 检查是否上传图片
  if (fileList.value.length == 0) {
    ElMessage.error('请上传一张图片')
    return
  }

  // 获取图片的 base64 编码
  getBase64(fileList.value[0].raw as File).then((base64) => {


    // 清理图片的 Base64 字符串（去掉头部部分）
    const base64HeaderRegex = /^data:image\/[a-zA-Z]+;base64,/
    if (base64HeaderRegex.test(base64)) {
      base64 = base64.replace(base64HeaderRegex, '')
      // console.log('匹配到图片格式的头部并已清理');
    } else {
      ElMessage.warning('请上传正确的图片')
      return
    }

    const userInfo = new UserInfo()
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
      if (resp) {
        ElMessage.success('注册成功')
      }
    })
    .catch((err: RpcError) => {
      console.error(err)
      let errMsg = "内部错误"
      if (err.code == StatusCode.UNKNOWN) {
        errMsg = "服务不可用"
      }
      ElMessage.error(`注册失败，${errMsg}`)
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
  if (value.length < 3 || value.length > 12) {
    return callback(new Error('名字长度必须在3到12个字符之间'))
  }

  // 名字只能包含字母和数字，不包含空格
  const nameRegex = /^[a-zA-Z0-9]+$/;
  if (!nameRegex.test(value)) {
    return callback(new Error('名字只能包含字母和数字，不允许空格'));
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
@import url("../assets/common.css");

body {
  /* background-image: url(..\image\preview.jpg); */
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgb(255, 255, 255);
}

.header {
  box-shadow: 0px 5px 2px rgba(0, 0, 0, 0.116);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 0px;
  width: 100%;
}

.right-container {
  margin-left: 0%;
  display: flex;
  justify-content: flex-end;
  font-size: large;
}

.mx-1 {
  font-weight: bold;
  border-radius: 20px;
  padding: 10px 20px;
  margin: 10px;
  font-size: larger;
}


.el-button {
  border-radius: 20px;
  padding: 10px 20px;
  margin: 10px;
}

.form-card {
  width: 30%;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 40px 20px 20px 20px;
  margin: 20px 20px 20px 20px;
  border-radius: 1rem;
}



.main {
  box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.801);
  background-image: url(..\assets\preview.jpg);
  background-size: cover;
  width: 70%;
  height: 60%;
  margin-top: 2%;
  margin-left: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  /* 给表单和图片框之间添加间距 */
  flex-wrap: wrap;
  /* 保证在小屏幕下能自适应换行 */
  padding: 20px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.85);
  flex-direction: row;
}

/* 图片预览框样式 */
.image-preview {
  box-shadow: 10px 10px 15px rgba(17, 0, 250, 0.2);
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #e0e8ee;
  max-width: 100%;
  width: 400px;
  /* 固定宽度 */
  height: 400px;
  /* 固定高度 */
  margin-left: 100px;
  /* 保证与表单右侧有一定间距 */
  background-color: transparent !important;
  /* 强制设置为透明 */
}

.container {
  height: 100%;
  width: 100%;
}

/* 图片占位框 */
.image-placeholder {

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px dashed #6797fd;
  border-radius: 20px;
  background-color: transparent !important;
  /* 强制设置为透明 */
}

.color-shift-btn {
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: 700;
  border: none;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-image: -webkit-linear-gradient(0deg, #7b9edf, #c4e3fd);
  color: #ffffff;
  position: relative;
  margin-left: 3%;
  cursor: pointer;
  z-index: 0;
  transition: all 0.4s;
  animation: flyColor 0.6s ease-in;
}

.color-shift-btn:before {
  content: '';
  width: 0%;
  height: 52%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;

  padding: 0.75rem;
  border-radius: 0.5rem;
  background-image: -webkit-linear-gradient(0deg, #707ce7, #b7c1ee);
  z-index: -1;
  transition: all 0.4s;
}

.color-shift-btn:hover:before {
  width: 92%;
  opacity: 1;
}

@keyframes flyColor {
  from {
    opacity: 0.4;
  }

  to {
    opacity: 1;
  }
}

@keyframes flyColor {
  from {
    opacity: 0.4;
  }

  to {
    opacity: 1;
  }
}

.footer {
  margin: 8% 0 3rem 0;
  padding: 5px 0 0 0;
  text-align: center;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  /* position: fixed; */
  width: 100%;
  /* bottom: 0; */
}

.footer a {
  margin: 5px 10px;
  color: #4CAF50;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
