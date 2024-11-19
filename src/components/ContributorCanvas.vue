<template>
  <div>
    <div style="
            text-align: center;
            font-size: 20px;
            background-clip: text;
            background-image: -webkit-linear-gradient(0deg, #5EABEBFF, #D8E0E6FF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;">ArmFaceID</div>
    <div style="
            text-align: center;
            font-size: 30px;
            background-clip: text;
            background-image: -webkit-linear-gradient(0deg, #CFD3DFFF, #488CDAFF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;">Registration-Site</div>
    <h4 style="margin-bottom: 0px; color: gray;">🐈‍⬛关于本项目：</h4>
    <p>本项目属于ArmFaceID项目的前端部分，在网页端提供人脸身份信息的注册服务。</p>
    <h2 style="margin-bottom: 0px; color: black;">🧐关于ArmFaceID项目...</h2>
    <p>源自嵌入式Linux课程设计任务，目标是在嵌入式设备上实现人脸身份识别，为了实现人脸身份注册和人脸身份识别的完整流程，衍生出系列子项目...</p>
    <div class="item-proj">
      <img style="width: 5%; margin-right: 2%;" src="../assets/github-mark.svg" />
      <a style="color: #8B94EBFF;"
         href="https://github.com/YusJade/ArmFaceID">ArmFaceID-server：运行于Linux的C++服务端应用，提供人脸身份注册与人脸身份识别服务的接口。</a>
    </div>
    <div class="item-proj">
      <img style="width: 5%; margin-right: 2%;" src="../assets/github-mark.svg" />
      <a style="color: #8B94EBFF;"
         href="https://github.com/YusJade/ArmFaceID-client">ArmFaceID-client：运行于嵌入式设备上的C++客户端应用，提供人脸身份识别服务。</a>

    </div>
    <div class="item-proj">
      <img style="width: 5%; margin-right: 2%;" src="../assets/github-mark.svg" />
      <a style="color: #8B94EBFF;"
         href="https://github.com/YusJade/ArmFaceID-registration-site">ArmFaceID-registration-site：提供人脸身份注册服务的网页端应用。</a>
    </div>
    <h2>🌟本项目贡献者：</h2>
    <div style="display: flex; text-align: center;">
      <a href="https://github.com/YusJade">
        <img src="../assets/head/yusjade.png" width="50" height="50"
             style="border-radius: 50%; border: 2px solid #b1b4d8; vertical-align:middle; margin-right: 0.4rem;" /></a>
      <p>YusJade：负责各个子项目框架的搭建、调整和联调，以及开发任务的分配。</p>
    </div>
    <div style="display: flex; text-align: center;">
      <a href="https://github.com/Serendipity-hjn">
        <img src="../assets/head/seren.png" width="50" height="50"
             style="border-radius: 50%; border: 2px solid #b1b4d8; vertical-align:middle; margin-right: 0.4rem;" /></a>
      <p>Serendipity-hjn：负责ArmFaceID-server的gRPC接口，和ArmFaceID-client的人脸质量评估模块。</p>
    </div>
    <div style="display: flex; text-align: center;">
      <a href="https://github.com/idealoong">
        <img src="../assets/head/megumin.png" width="50" height="50"
             style="border-radius: 50%; border: 2px solid #b1b4d8; vertical-align:middle; margin-right: 0.4rem;" /></a>
      <p>idealoong：负责ArmFaceID-client的活体检测模块，以及ArmFaceID-registration-site的页面和逻辑。</p>
    </div>
    <div style="display: flex; text-align: center;">
      <a href="https://github.com/BorderArea01">
        <img src="../assets/head/border.png" width="50" height="50"
             style="border-radius: 50%; border: 2px solid #b1b4d8; vertical-align:middle; margin-right: 0.4rem;" /></a>
      <p>BorderArea01：负责ArmFaceID-client的Qt图形界面搭建。</p>
    </div>
    <div style="display: flex; text-align: center;">
      <a href="https://github.com/AXuanCreator">
        <img src="../assets/head/xuan.png" width="50" height="50"
             style="border-radius: 50%; border: 2px solid #b1b4d8; vertical-align:middle; margin-right: 0.4rem;" /></a>
      <p>AXuanCreator：负责ArmFaceID-client的功能Debug，以及编写工具脚本。</p>
    </div>

    <p>感谢参与贡献~ 👍 ❤</p>
    <div>
      <a href="https://github.com/YusJade"><img src="../assets/head/yusjade.png"
             width="50" height="50"
             style="border-radius: 50%; border: 2px solid #b1b4d8;" /></a>
      <a href="https://github.com/BorderArea01"><img src="../assets/head/border.png"
             width="50" height="50"
             style="border-radius: 50%; border: 2px solid #b1b4d8;" /></a>
      <a href="https://github.com/idealoong"><img src="../assets/head/megumin.png"
             width="50" height="50"
             style="border-radius: 50%; border: 2px solid #b1b4d8;" /></a>
      <a href="https://github.com/Serendipity-hjn"><img src="../assets/head/seren.png"
             width="50" height="50"
             style="border-radius: 50%; border: 2px solid #b1b4d8;" /></a>
      <a href="https://github.com/AXuanCreator"><img src="../assets/head/xuan.png"
             width="50" height="50"
             style="border-radius: 50%; border: 2px solid #b1b4d8;" /></a>
    </div>
  </div>
  <!-- <el-footer class="footer">
    <p>项目仓库🫱</p>
    <img style="width: 5%;" src="../assets/github-mark.svg" />
    <a style="color: #8B94EBFF;"
       href="https://github.com/YusJade/ArmFaceID">YusJade/ArmFaceID</a><br />
    <img style="width: 5%;" src="../assets/github-mark.svg" />
    <a style="color: #8B94EBFF;"
       href="https://github.com/YusJade/ArmFaceID-registration-site">YusJade/ArmFaceID-registration-site</a>
  </el-footer> -->
</template>

<script setup lang="ts">

</script>

<style>
.item-proj {
  margin-top: 1.2rem;
}
</style>