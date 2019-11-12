<template>
<div class="blogPage">
    <div id='bgImage2' :style='clientHeight' @click='backToHome'></div>
    <el-card class='bpCardTitle'>{{blog.title}}</el-card>
    <div class="bpTags">
        <template v-for="(tag,index) in blog.tags">
            <el-tag :key="index" type='gray'>
                {{tag}}
            </el-tag>
        </template>
    </div>
    
    <p class='bpTime'>{{blog.created_at}}</p>
    <el-card class='bpCardContent'>
        <vue-markdown :source='blog.content'>
        </vue-markdown>
    </el-card>
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
const config = require('../config.json');
import axios from 'axios'
export default {
    data() {
        return {
            clientHeight: {
                height: '600px',
            },
            blog: {},
            getUrl: `${config.root}:3000/api/getblog`,
            loading: true
        }
    },
    methods: {
        backToHome() {
            
        }
    },
    components: {
        VueMarkdown
    },
    created() {
        axios.post(this.getUrl, {
            id: this.$route.params.id,
            req: '', // 返回博客所有数据,
        }).then((res) => {
            window.console.log(res);
            this.blog = res.data;
            this.loading = false;
            window.console.log(this.blog);
        }).catch((err) => {
            window.console.error('Error: Get the blog infomation failed! ', err);
        });
    },
    mounted() {
        this.clientHeight.height = `${document.documentElement.clientHeight}px`;
        const that = this;
        window.onresize = function temp(){
            that.clientHeight.height = `${document.documentElement.clientHeight}px`
        }
    },
}
</script>

<style>
@import url('../assets/markdown-github.css');
.blogPage {
    word-break: break-all;
}

#bgImage2 {
    background-image: url('../assets/girl-min.jpg');
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.99;
}

.bpCardTitle {
    font-size: 30px;
    color: #1F2D3D;
    width: 40%;
    margin: auto;
    text-align: center;
    opacity: 0.75;
}

.bpTags {
    margin: 1rem auto;
    width: 30%;
    text-align: center;
    opacity: 0.8;
}

.el-tag {
    margin: auto 0.3rem;
}

.bpTime {
    color: #EFF2F7;
    font-size: 17px;
    text-align: center;
    opacity: 0.7;
}

.bpCardContent {
    box-sizing: border-box;
    padding: 1rem;
    margin: 2rem auto;
    width: 75%;
    min-height: 20rem;
    color: #1F2D3D;
    font-size: 25px;
    line-height: 1.6;
    opacity: 0.75;
}

.bpCardContent pre {
    background: #8492A6;
    overflow: auto;
    padding: 1rem;
    word-break: break-all;
}

.bpCardContent p code {
    background: #D3DCE6;
    padding: 0 0.2rem;
    margin: 0 0.2rem;
}

.bpCardContent ol,
.bpCardContent ul {
    padding-left: 1rem;
}

.bpCardContent img {
    width: 100%;
    height: 100%;
    margin: 0.5rem 0;
}
</style>
