<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <RouterTab v-show="$route.meta.showFooter"></RouterTab>
  </div>
</template>
<script>
  import RouterTab from 'components/RouterTab/RouterTab'
  export default {
    components:{
      RouterTab
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
