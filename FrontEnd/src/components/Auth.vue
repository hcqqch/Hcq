<template>
<div class="homePage">
    <div class="bgImg"></div>
    <div class="content">
        <input v-model="passwd" @keyup.enter='auth' placeholder="请输入密码2"/>
    </div>
</div> 

</template>

<script>
// const config = require('../../config.json');
import config from '../config.json';
import axios from 'axios'

export default {
    name: 'Auth',
    data() {
        return {
            passwd:'',
            subUrl: `${config.root}:3000/api/auth`,
        }
    },
    methods: {
        auth(){
            axios.post(this.subUrl,{
                passwd:this.passwd
            }).then((res)=>{
                // data,status,statusText,headers,config,request
                // alert(JSON.stringify(res));
                if (res.data.status === 'ok') {
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                        });
                        document.cookie = `key=${res.key};path=/;max-age=${60 * 60 * 24 * 7};`;
                        this.passwd = '';
                        this.$router.push({
                            path: '/',
                        });
                    } else {
                        this.passwd = '';
                        this.$message.error({
                            message: '登录失败',
                        });
                    }
            })
        }
    },
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
