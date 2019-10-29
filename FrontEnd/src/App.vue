<template>
<div id="app">
	<router-view></router-view>
</div>
</template>

<script>
// import Home from './components/Home.vue'

export default {
	name: 'app',
	data() {
		return {
            
		}
	}
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #fff;
    font-size: 12px;
}

body,
div,
span,
a,
p,
ul,
li {
    margin: 0;
    padding: 0;
}
</style>
