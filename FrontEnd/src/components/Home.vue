<template>
<div class="homePage">
    <div class="bgImg"></div>
    <div class="content">
        <el-card class="cardmt" shadow="hover">
            鼠标悬浮时显示
        </el-card>
        <el-card class="cardmt" shadow="hover">
            鼠标悬浮时显示
        </el-card>
        <el-card class="cardmt" shadow="hover">
            鼠标悬浮时显示
        </el-card>
        <el-card class="cardmt" shadow="hover">
            鼠标悬浮时显示
        </el-card>
    </div>

</div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.homePage {
    width: 100%;
    height: 100%;
}

.bgImg {
    width: 100%;
    height: 100%;
	position: absolute;
	top: 0px;
	left: 0px;
	bottom: 0px;
    background-image: url('../assets/boy.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    opacity: 0.99;
}

.content {
	width: 45%;
    margin: 6.7rem auto 0 10%;
    opacity: 0.7;
}

.content .cardmt{
	margin-top: 0.7rem;
}
</style>
