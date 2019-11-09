<template>
    <div class="tabbar">
        <van-tabbar route v-model="active"  inactive-color="#777777" active-color="#ff0000">
            <van-tabbar-item v-for="(item,index) in icon" :key="index" :to="(item.name)">
                <span>{{item.title}}</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? item.active : item.normal"
                    replace
                    :to="item.name"
                />
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    import { Tabbar, TabbarItem } from 'vant';
    export default {
        name: 'tabbar',
        data () {
            return {
                active: 0,
                icon: [
                    {
                        name: "/",
                        title: "热映",
                        normal: require('@/icons/movies.svg'),
                        active: require('@/icons/movies-active.svg')
                    },{
                        name: "/video",
                        title: "视频",
                        normal: require('@/icons/video.svg'),
                        active: require('@/icons/video-active.svg')
                    },
                    {
                        name: "/music",
                        title: "音乐",
                        normal: require('@/icons/music.svg'),
                        active: require('@/icons/music-active.svg')
                    },{
                        name: "/user",
                        title: "我的",
                        normal: require('@/icons/me.svg'),
                        active: require('@/icons/me-active.svg')
                    }
                ]
            }
        },
        mounted() {
            if (this.$route.name == "movie") {
                this.active = 0;
            } else if (this.$route.name == "cinema") {
                this.active = 1;
            } else if (this.$route.name == "music") {
                this.active = 2;
            }else{
                this.active = 3;
            }
        }
    }
</script>

<style scoped>
    .tabbar{
        width: 100%;
    }
</style>
