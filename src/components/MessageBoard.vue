<template>
  <div class="page">
    <div class="flex-view">
      <div class="label" v-if="props.title">{{ props?.title }}</div>
      <div class="scroll-view" ref="scrollViewRef" @mouseenter="onMouseenter"
           @mouseleave="onMouseleave">
        <div ref="listRef" class="list"
             v-for="(item, index) in range(0, messageBoardContent.length * doubleList - 1)"
             :key="index">
          <slot :item="messageBoardContent[index % messageBoardContent.length]"
                :index="index % messageBoardContent.length"></slot>
          <!-- <div class="item" v-for="(item, index) in data" :key="index">
            <div class="content">预警消息 {{ index }}</div>
            <div class="time">2024-11-06</div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <div style="margin-bottom: 0%;">
    <el-form>
      <div style="display: flex;">
        <el-form-item style="width: 60%; margin-left: 10%; ">
          <el-input type="text" placeholder="在这里输入您的留言" size="large" v-model="msgInput"
                    style="width: 100%; height: 40px;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" @click="onSendButtonClicked"
                     style="height: 40px; border-radius: 8%;"
                     :disabled="!enableSendMsgBtn" plain color="#40E2A6">发送</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { getMessageBoard, writeMessageBoard } from "@/https";
import type { MessageItem } from "@/type";
import { ElMessage } from "element-plus";
import { factory } from "typescript";
import { ref, onBeforeMount, onMounted, onBeforeUnmount, nextTick, computed, onUnmounted } from "vue";
const listRef = ref(); //列表dom
const scrollViewRef = ref(); //滚动区域dom
const count = ref(1); //列表个数
const enableSendMsgBtn = ref(true)

let intervalId: number = 0
let isAutoScrolling = false //是否自动滚动标识
let intervalIdCheckScroll: number = 1
let doubleList = 1

function range(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

// 添加 props
export interface CircleScrollBoard {
  title?: string,

}

const toalHeight = () => {
  let hei = 0
  const length = listRef.value.length / 2
  for (let i = 0; i < length; ++i)
    hei += listRef.value[i].clientHeight
  // console.log("计算列表长度", hei)
  return hei
}

const props = withDefaults(defineProps<CircleScrollBoard>(), {

})

onMounted(() => {
  const interval = setInterval(() => {
    attainMsg();
  }, 3000); // 每 10 秒调用一次

  onUnmounted(() => {
    clearInterval(interval);
  });
});
const messageBoardContent = ref<Array<MessageItem>>([])
// 组件卸载时清除定时器


const msgInput = ref<string>('')

const attainMsg = () => {
  getMessageBoard()
    .then(resp => {
      if (resp.data) {
        const res = resp.data
        if (!res.length)
          return
        while (messageBoardContent.value.length > 0) {
          messageBoardContent.value?.pop()
        }

        res.forEach(e => {
          messageBoardContent.value.push(e)
        })
      }
    })
    .catch(err => {
      ElMessage.error('留言板服务不可用')
      console.log(err)
    })
}

const onSendButtonClicked = () => {
  if (msgInput.value?.trim() == '') {
    ElMessage.warning('文本不能为空')
    return
  }
  enableSendMsgBtn.value = false
  writeMessageBoard(msgInput.value.trim())
    .then(resp => {
      if (resp.status == 200)
        ElMessage.success('感谢留言')
      enableSendMsgBtn.value = true
      msgInput.value = ''
      attainMsg()
    })
    .catch(err => {
      ElMessage.error('服务器错误')
      console.log(err)
      enableSendMsgBtn.value = true
    })

}


onMounted(async () => {
  // data.value = await getData();
  nextTick(() => {
    autoScrolling();
    //判断列表是否生成滚动条
    intervalIdCheckScroll = setInterval(() => {
      count.value = hasScrollBar() ? 2 : 1;
      //有滚动条开始自动滚动
      if (count.value == 2) {
        isAutoScrolling = true
        doubleList = 2
      } else {
        isAutoScrolling = false
        doubleList = 1
      }
    }, 100)
  });
});
//判断列表是否有滚动条
const hasScrollBar = () => {
  // console.log(scrollViewRef.value.scrollHeight, " >  ", scrollViewRef.value.clientHeight)
  return scrollViewRef.value.scrollHeight > scrollViewRef.value.clientHeight;
};

//设置自动滚动
const autoScrolling = () => {

  intervalId = setInterval(() => {
    // 每个元素的长度都不一样喔
    // console.log("scrollViewRef.value.scrollTop", scrollViewRef.value.scrollTop)
    if (scrollViewRef.value.scrollTop < toalHeight()) {
      scrollViewRef.value.scrollTop += isAutoScrolling ? 1 : 0
    } else {
      scrollViewRef.value.scrollTop = 0
    }
  }, 20);
};

onBeforeUnmount(() => {
  //离开页面清理定时器
  intervalId && clearInterval(intervalId);
  intervalIdCheckScroll && clearInterval(intervalIdCheckScroll);
});

//鼠标进入，停止滚动
const onMouseenter = () => {
  isAutoScrolling = false;
};
//鼠标移出，继续滚动
const onMouseleave = () => {
  isAutoScrolling = true;
};
</script>

<style scoped>
.page {
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: top;
  background-color: #ffffff;
  color: #000000;
}

.flex-view {
  width: 100%;
  height: 100%;
  border: 1px solid #fff;
  display: flex;
  flex-direction: column;
}

.label {
  color: #000000;
  padding: 20px;
  font-size: 22px;
}

.scroll-view {
  flex: 1;
  height: 0;
  width: 100%;
  overflow-y: auto;
}

.list {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.item {
  margin-bottom: 0;
  width: 100%;
  height: 50px;
  min-height: 50px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #eee;
}

/* .page {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  color: #000000;
}

.flex-view {
  width: 400px;
  height: 100%;
  border: 1px solid #fff;
  display: flex;
  flex-direction: column;
}

.label {
  color: #000000;
  padding: 20px;
  font-size: 22px;
}

.scroll-view {
  flex: 1;
  height: 0;
  width: 100%;
  overflow-y: auto;
}

.list {
  width: 100%;
  padding: 0 auto;
  box-sizing: border-box;
}

.item {
  width: 100%;
  height: 50px;
  min-height: 50px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #eee;
} */

::-webkit-scrollbar {
  display: none;
}

::-webkit-scrollbar:hover {}
</style>
