<template>
<div class="container" @click="btHome">
    <el-card class="mainContent">
        <div class="nav">
            <el-button type='primary' v-on:click='select("all")'>全部</el-button>
            <template v-for="(tag,index) in tags">
                <el-button :key="index" :type='computedColor(index)' @click='select(tag)'>{{tag}}</el-button>
            </template>
        </div>

        <router-link :to='{name:"NewBlog",params:{id:"0"}}'>
            <el-button type='primary' icon='plus' class='writeBtn'>写博客</el-button>
        </router-link>
        <div class='blogInfo'>
            <template v-for='(blog,index) in blogs'>
                <el-card :key="index" class='blogCard'>
                    <div class='blogLeft'>
                        <router-link :to='{name: "Blog",params:{id:blog._id}}'>{{blog.title}}</router-link>
                        <div class='blogDown'>
                            <div>
                                <template v-for='(tag,index) in blog.tags'>
                                    <el-tag :key="index">{{tag}}</el-tag>
                                </template>
                            </div>
                            <span class='blogTime'>{{blog.created_at}}</span>
                        </div>
                    </div>
                    <div class='blogRight'>
                        <i class='el-icon-edit' @click='editBlog(blog._id)'></i>
                        <i class='el-icon-delete' @click='deleteBlog(blog._id)'></i>
                    </div>
                </el-card>
            </template>
        </div>
    </el-card>
</div>
</template>

<script>
import config from '../config.json'
import axios from 'axios'
export default {
    data() {
        return {
            tags: [],
            blogs: [],
            constBlogs: [],
            selectStatus: 0,
            colors: ['danger', 'warning', 'success', 'info', '', 'primary'],
            getUrl: `${config.root}:3000/api/getblogs`,
            deleteUrl: `${config.root}:3000/api/deleteblog`,
            authUrl: `${config.root}:3000/api/authkey`,
        }
    },
    methods: {
        computedColor() {
            // return this.colors[index % this.colors.length];
        },
        editBlog(blogId) {
            this.$router.push({
                name: 'NewBlog',
                params: {
                    id: blogId
                }
            })
        },
        deleteBlog(blogId) {
            this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                axios.post(this.deleteUrl, {
                    id: blogId,
                    key: this.theCookie,
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    });
                    const blogss = [];
                    this.blogs.forEach((ele) => {
                        if (ele._id !== blogId) {
                            blogss.push(ele);
                        }
                    });
                    this.blogs = blogss;
                    if (this.selectStatus === 0) {
                        this.constBlogs = blogss;
                    } else {
                        const blogs = [];
                        this.constBlogs.forEach((ele) => {
                            if (ele._id !== blogId) {
                                blogs.push(ele);
                            }
                            this.constBlogs = blogs;
                        });
                    }
                    this.reComputeTags();
                }).catch((err) => {
                    window.console.error('Failed: Delete The Blog Failed ', err);
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                });
            });
        },
        reComputeTags() {
            const tags = [];
            this.constBlogs.forEach((ele) => {
                ele.tags.forEach((tag) => {
                    tags.push(tag);
                });
            });
            this.tags = [...new Set(tags)];
        },
        select(arr) {
            // 干啥被选标签更新`this.blogs`数据
            if (arr === 'all') {
                this.blogs = this.constBlogs;
                this.selectStatus = 0;
            } else {
                this.selectStatus = 1;
                const blogs = [];
                this.constBlogs.forEach((ele) => {
                    if (ele.tags.indexOf(arr) >= 0) {
                        blogs.push(ele);
                    }
                });
                this.blogs = blogs;
            }
        },
        btHome() {
            this.$router.push({
                name: 'Home'
            })
        }
    },
    mounted() {
        axios.get(this.getUrl).then((res) => {
            window.console.log(res.data);
            this.blogs = res.data.reverse();
            this.constBlogs = this.blogs;
            this.reComputeTags();
        })
    },
    created() {

    },
}
</script>

<style>
.container {
    width: 80%;
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2.5%;
    margin-bottom: 2rem;
    color: black;
    font-size: 1.5rem;
}

.mainContent {
    min-height: 40rem;
    min-width: 100%;
}

.nav {
    background: #EFF2F7;
    margin: 1rem 0 3rem 0;
    font-size: 25px;
    padding: 0.5rem;
    min-width: 100%;
    min-height: 5rem;
    box-sizing: border-box;
}

.nav .el-button {
    margin: 0.4rem 0.5rem;
}

.mainContent .writeBtn {
    margin: 1rem;
}

.blogInfo {
    min-height: 5rem;
    display: flex;
    flex-direction: column;
}

.blogInfo .blogCard {
    margin-bottom: 0.5rem;
}

.blogInfo .blogCard>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #E5E9F2;
    padding: 0.7rem;
    box-sizing: border-box;
    min-width: 100%;
    min-height: 4rem;
}

.blogInfo .blogLeft {
    width: 70%;
}

.blogInfo a {
    color: #324057;
    text-decoration: none;
}

.blogInfo .blogDown {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.blogInfo .blogDown .el-tag {
    margin: 0.6rem 0.2rem 0 0.2rem;
}

.blogInfo .blogDown .blogTime {
    font-size: 1rem;
    margin-left: 3rem;
    color: #99A9BF;
}

.blogInfo .blogRight i:first-child {
    color: #1D8CE0;
    font-size: 1.3rem;
}

.blogInfo .blogRight i:last-child {
    color: #FF4949;
}
</style>
