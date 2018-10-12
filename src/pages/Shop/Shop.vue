<template>
  <div class="">
    <ShopHeader></ShopHeader>
    <div class="">
      <router-link to="/shop/goods">商品</router-link>
      <router-link to="/shop/ratings">评价</router-link>
      <router-link to="/shop/info">信息</router-link>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import ShopHeader from "../../components/ShopHeader/ShopHeader.vue"
  export default {
    components:{
      ShopHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
