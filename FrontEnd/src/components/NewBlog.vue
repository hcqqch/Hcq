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
        </div>
        <el-button class='uploadImage' icon='el-icon-upload' :plain='true' type='info'>
            图片
            <input type='file' ref='files' @change='inputChange' id='uploadImg'>
        </el-button>
        <el-card class="writeBlog">
            <el-input type='textarea' autosize resize='none' placeholder='博客内容' v-model='blogContent'>
                </el-input>
                <div class='blogBtns'>
                    <el-button type='text' @click='dialogVisible=true'>预览</el-button>
                    <el-button type='primary' @click='submitBlog' v-if='submitBtnVisible'>发布</el-button>
                    <el-button type='success' @click='updateBlog' v-if='updateBtnVisible'>更新</el-button>
                </div>
        </el-card>
    </el-card>
</div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            inputVisible: false,
            inputValue: '',
            blogTags: ['标签一', '标签二', '标签三'],
            blogContent:'',
            submitBtnVisible:'false',
            updateBtnVisible:'false'
        }
    },
    methods: {
        backOne() {
            
        },
        handleClose(tag) {
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
        inputChange(){
            
        },
        submitBlog(){

        },
        updateBlog(){

        }
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
    width: 80%;
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

.blogTags .el-tag {
    margin-right: 0.5rem;
}

.blogTags input {
    width: 5rem;
    display: inline-block;
}

.uploadImage {
    width: 4rem;
    height: 24px;
    position: relative;
    border-radius: 3px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-bottom: 1rem;
}

#uploadImg {
    opacity: 0;
    width: 4rem;
    height: 24px;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
