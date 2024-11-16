<template>
  <div class="page">
    <div class="flex-view">
      <div class="label" v-if="props.title">{{ props?.title }}</div>
      <div class="scroll-view" ref="scrollViewRef" @mouseenter="onMouseenter"
           @mouseleave="onMouseleave">
        <div ref="listRef" class="list" v-for="(item, index) in props.data" :key="index">
          <slot :item="item" :index="index"></slot>
          <!-- <div class="item" v-for="(item, index) in data" :key="index">
            <div class="content">预警消息 {{ index }}</div>
            <div class="time">2024-11-06</div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onBeforeUnmount, nextTick, computed } from "vue";
const data = ref(); //列表数据
const listRef = ref(); //列表dom
const scrollViewRef = ref(); //滚动区域dom
const count = ref(1); //列表个数

let intervalId = null;
let isAutoScrolling = true; //是否自动滚动标识



// 添加 props
export interface CircleScrollBoard {
  data: Array<unknown>,
  title?: string,

}

const toalHeight = () => {
  let hei = 0
  const length = listRef.value.length / 2
  for (let i = 0; i < length; ++i)
    hei += listRef.value[i].clientHeight
  console.log("计算列表长度", hei)
  return hei
}

const props = withDefaults(defineProps<CircleScrollBoard>(), {

})


onMounted(async () => {
  // data.value = await getData();
  nextTick(() => {
    //判断列表是否生成滚动条
    count.value = hasScrollBar() ? 2 : 1;
    //有滚动条开始自动滚动
    if (count.value == 2) {
      autoScrolling();
    }
  });
});
//判断列表是否有滚动条
const hasScrollBar = () => {
  return scrollViewRef.value.scrollHeight > scrollViewRef.value.clientHeight;
};

//设置自动滚动
const autoScrolling = () => {

  intervalId = setInterval(() => {
    // 每个元素的长度都不一样喔
    console.log("scrollViewRef.value.scrollTop", scrollViewRef.value.scrollTop)
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
  height: 80%;
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
