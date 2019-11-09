<template>
    <div class="cinima">
        <Trill></Trill>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
    import Tabbar from '@/components/tabbar.vue';  //引用组件的地址
    import Trill from '@/views/trill/trill'
    export default { components:{
            Tabbar,
            Trill
        },
        name: 'cinema',

        data(){
            return {

            }
        }
    }
</script>

<style scoped>

</style>
