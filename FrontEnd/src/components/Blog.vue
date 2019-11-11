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
export default {
    data() {
        return {
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
        VueMarkdown
    },
    mounted() {
        
    },
}
</script>

<style>

</style>
