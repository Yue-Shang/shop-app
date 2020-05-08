<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

    <main-tab-bar/>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>

</template>

<script>
    import MainTabBar from './components/content/mainTabbar/MainTabBar'
    import Icon from "./components/content/Icon/Icon";
    import SvgIcon from "./components/content/Icon/svg";
    export default {
        name: 'App',
        components: {
            MainTabBar,
            Icon,
            SvgIcon
        }
    }
</script>

<style>
</style>
