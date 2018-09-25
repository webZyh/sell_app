<template>
  <div id="app">
    <keep-alive>
      <router-view address="address"></router-view>
    </keep-alive>
    <RouterTab v-show="$route.meta.showFooter"></RouterTab>
  </div>
</template>
<script>
  import RouterTab from 'components/RouterTab/RouterTab'
  // import {resAddress,resFoodCategorys} from './api'
  import {mapActions} from 'vuex'
  export default {
    mounted(){
      //this.$store.dispatch('getAddress'),
      this.getAddress();  //通知actions的第二种方法
      //this.$store.dispatch('getCategorys'),   //通知actions的第一种方法
      //this.$store.dispatch('getShops')
    },
    /*async mounted(){
      const geohash = 40.10038 + ',' + 116.36867;
      const result = resAddress(geohash);
      const result2 = await resFoodCategorys();
      console.log(result2)
    },*/
    methods:{
      ...mapActions(['getAddress'])    //通知actions的第二种方法
    },
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
