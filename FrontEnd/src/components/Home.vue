<template>
<div class="homePage">
    <div class="bgImg" :style="clientHeight"></div>
    <div class="content">
        <template v-for="(blog,index) in blogs">
            <el-card :key="index" class='cardmt' shadow="hover">
                <router-link :to='{name: "NewBlog", params:{id:blog._id}}'>
                    {{blog.title}}
                </router-link>
                <div>
                    <template v-for="(tag,index) in blog.tags">
                        <el-tag :key="index" type='gray'>
                            {{tag}}
                        </el-tag>
                    </template>
                </div>
            </el-card>
        </template>
        <el-pagination background layout="prev, pager, next" current-change="currentChange" :total="total">
        </el-pagination>
    </div>
</div>
</template>

<script>
import config from '../config.json'
import axios from 'axios'
export default {
    name: 'Home',
    data() {
        return {
            // clientHeight:{
            //     height:600
            // },
            // height:document.documentElement.clientHeight,
            blogs: [],
            getUrl: `${config.root}:3000/api/getblogs`,
            loading: true,
            page: 1,
            total: 0
        }
    },
    methods: {
        currentChange(val) {
            this.page = val;
            this.getBlogs;
        },
        getBlogs() {
            axios.get(this.getUrl)
                .then((res) => {
                    window.console.log(res)
                    this.blogs = res.data.reverse();
                    this.total = res.data.total;
                })
        }
    },
    created() {
        this.getBlogs();
    },
    // mounted() {
    //     window.addEventListener('scroll',()=>{
    //         window.console.log(this.height, document.documentElement.scrollTop);
    //         this.clientHeight.height = `${document.documentElement.scrollTop + this.height}px`;
    //         window.console.log(this.clientHeight.height)
    //     })
    // },
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
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    background-image: url('../assets/boy.jpg');
    background-repeat: no-repeat;
    opacity: 0.99;
}

.content {
    width: 45%;
    margin: 6.7rem auto 0 10%;
    opacity: 0.7;
}

.content .cardmt {
    margin-top: 0.7rem;
}

.cardmt a {
    text-decoration: none;
    color: black;
    font-size: 25px;
}

.el-tag {
    margin: 0.5rem 0.2rem 0 0.2rem;
}
</style>
