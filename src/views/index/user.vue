<template>
    <div class="user">
        <div class="empty">
            <a><img src="../../image/waiting.jpg" alt="" width="100%" height="100%"></a>
        </div>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
    import Tabbar from "@/components/tabbar.vue";  //引用组件的地址
    export default {
        name: 'user',
        components:{
            Tabbar
        },
    }
</script>

<style scoped>
    .empty{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
