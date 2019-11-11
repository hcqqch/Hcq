<template>
<div class="container">
    <el-card class="box-card">
        <el-input class="titleInput" v-model="title" placeholder="标题君"></el-input>
        <i class='el-icon-close' @click='backOne'></i>
        <div class="blogTags">
            <el-tag :key="tag" v-for="tag in blogTags" closable :disable-transitions="false" @close="handleClose(tag)">
                {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            <el-button class='uploadImage' icon='el-icon-upload' :plain='true' type='info'>
                图片
                <input type='file' ref='files' @change='inputChange' id='uploadImg'>
            </el-button>
        </div>
        <el-card class="writeBlog">
            <el-input type='textarea' autosize resize='none' placeholder='内容' v-model='blogContent' style="min-height:20rem">
            </el-input>
            <div class='blogBtns'>
                <el-button type='info' @click='dialogVisible=true'>预览</el-button>
                <el-button type='primary' @click='submitBlog' v-if='submitBtnVisible'>发布</el-button>
                <el-button type='success' @click='updateBlog' v-if='updateBtnVisible'>更新</el-button>
            </div>
            <el-dialog :title='title' :visible.sync='dialogVisible' size='small' top='5%' class='previewDialog'>
                <div>
                    <vue-markdown :source='blogContent'></vue-markdown>
                </div>
            </el-dialog>
        </el-card>
    </el-card>
</div>
</template>

<script>
import axios from 'axios'
import config from '../config.json'
import VueMarkdown from 'vue-markdown';
export default {
    data() {
        return {
            title: '',
            inputVisible: false,
            inputValue: '',
            blogTags: ['标签一', '标签二', '标签三'],
            blogContent: '',
            submitUrl: `${config.root}:3000/api/submitblog`,
            getUrl: `${config.root}:3000/api/getblog`,
            updateUrl: `${config.root}:3000/api/updateblog`,
            uploadUrl: `${config.root}:3000/api/uploadimage`,
            dialogVisible: false,
            submitBtnVisible: true,
            updateBtnVisible: false,
            fileList: [],
            uploadHeaders: {
                'Content-Type': '',
            },
            loading: true,
            theCookie: document.cookie.match(/key=(.{32})/)
            // theCookie: document.cookie.match(/key=(.{32})/)[1],    
        }
    },
    methods: {
        backOne() {
            this.$router.push({
                name: 'Home',
            });
        },
        handleClose(tag) {
            // window.console.log(tag)
            this.blogTags.splice(this.blogTags.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.blogTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        inputChange() {
            const files = document.getElementById("uploadImg").files[0];
            const reader = new FileReader();

            reader.addEventListener('load', (ee) => {
                window.console.log(ee)
                const data = {
                    base64: ee.target.result,
                    key: this.theCookie
                };

                axios.post(this.uploadUrl, {
                    ...data
                }).then(res => {
                    window.console.log(res)
                    const md = `![图片](${config.root}:3000${res.data.path})`;
                    this.blogContent += md;
                    window.console.log(this.blogContent);
                    window.console.log(this.blogContent)
                })
            });
            reader.readAsDataURL(files);
        },
        submitBlog() {
            axios.post(this.submitUrl, {
                blogTitle: this.title,
                blogTags: this.blogTags,
                blogContent: this.blogContent,
                key: this.theCookie
            }).then((res) => {
                if (res.data.status === 200) {
                    this.open('博客提交成功');
                }
            }).catch(err => {
                window.console.error('Failed: submit blog infomation failed.NewBlog.vue.', err);
            })
        },
        updateBlog() {
            axios.post(this.updateUrl, {
                id: this.$route.params.id,
                blogTitle: this.title,
                blogTags: this.blogTags,
                blogContent: this.blogContent,
                key: this.theCookie
            }).then((res) => {
                window.console.log(res)
                if (res.status === 200) {
                    this.open('博客更新成功');
                }
            }).catch(err => {
                window.console.error('Failed: submit blog infomation failed.NewBlog.vue.', err);
            })
        },
        open(info) {
            this.$message({
                message: info,
                type: 'success',
            });
            this.$router.push({
                name: 'Home',
            });
        },

    },
    created() {
        // 0表示写博客，其他情况表示编辑博客
        const id = this.$route.params.id;
        if (id !== '0') {
            this.submitBtnVisible = true;
            this.updateBtnVisible = true;
            axios.post(this.getUrl, {
                id,
                req: 'preview'
            }).then((res) => {
                const data = res.data;
                window.console.log(res)
                this.loading = false;
                this.title = data.title;
                this.blogContent = data.content;
                this.blogTags = data.tags;

            }).catch(err => {
                window.console.error('Error: Get the blog error:', err);
            })
        } else {
            this.loading = false;
            
        }
    },
    components: {
        VueMarkdown
    }
}
</script>

<style>
.container {
    display: flex;
    justify-content: center;
    margin-top: 2.5%;
    margin-bottom: 2rem;
    color: black;
    font-size: 1.5rem;
}

.box-card {
    width: 100%;
    position: relative;
    text-align: center;
}

.titleInput {
    width: 65%;
}

.el-icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
}

.blogTags {
    text-align: center;
    margin-top: 20px;
}

.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}

.blogTags .uploadImage {
    width: 4rem;
    height: 24px;
    margin: 1rem auto;
    border-radius: 3px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    position: relative;
}

#uploadImg {
    opacity: 0;
    width: 4rem;
    height: 24px;
    position: absolute;
    top: 0;
    left: 0;
}

.writeBlog {
    margin-top: 40px;
}

.writeBlog textarea {
    width: 100%;
    min-height: 20rem;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 0;
    box-sizing: border-box;
    font-size: 20px;
}
</style>
