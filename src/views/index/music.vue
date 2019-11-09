<template>
    <div class="music">
        <Tabbar></Tabbar>
        <div class="fixedTop">
            <van-search
                v-model="value"
                placeholder="狂狼，花姐"
                show-action
                shape="round"
                background="#fff"
                input-align="center"
                ref="serach"
                @focus="flag = false"
                @blur="flag = true"
            >
                <div slot="action" @click="onSearch(value)">搜索</div>
            </van-search>
        </div>
        <div class="vanTab" v-show="flag">
            <van-tabs v-model="active" animated swipeable lazy-render color="#f00" title-active-color="#f00">
                <van-tab title="推荐">
                    <Recommend></Recommend>
                </van-tab>
                <van-tab title="歌手">
                    <SingerRank></SingerRank>
                </van-tab>
                <van-tab title="排行">
                    <Seniority></Seniority>
                </van-tab>
            </van-tabs>
        </div>
        <div class="servList" v-show="!flag">
            <MusicListArr :keyValue="msgKey" @getChidC="getChid"></MusicListArr>
        </div>
    </div>
</template>

<script>
    import { Tab, Tabs, Search, Button } from 'vant'
    import Tabbar from '@/components/tabbar.vue'  //引用组件的地址
    import Recommend from '@/views/music/recommend.vue'
    import Seniority from '@/views/music/seniority.vue'
    import SingerRank from '@/views/music/singerRank.vue'
    import SerachSong from '@/views/music/serachSong.vue'
    import MusicListArr from '@/views/music/musicListArr.vue'
    import {mapMutations, mapGetters} from 'vuex'
    export default {
        name: 'music',
        components: {
            Tabbar,
            Recommend,
            Seniority,
            SingerRank,
            SerachSong,
            MusicListArr
        },
        data () {
            return {
                active: 0,
                value: '',
                flag: true,
                msgKey: ''
            }
        },
        watch:{
            value(val){
                if(val == ''){
                    this.flag = true;
                }
            }
        },
        methods: {
            ...mapMutations(['setMsgKey','setSerachKey']),
            async onSearch (val) {
                let debug = false;
                if(debug){
                    await this.setMsgKey(val);
                    this.active = 1;
                }else{
                    this.flag = false;
                    this.setSerachKey(val);
                    this.msgKey = val +"/"+ new Date().getTime();//保持每一次搜索的东西都是新的
                }
            },
            getChid(e){
                this.flag = e;
            }
        },
        mounted () {
        }
    }
</script>

<style scoped>
    .music {
        width: 100%;
        height: 100%;
    }

    .fixedTop >>> .van-search {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4.5rem;
        background: #fff;
        z-index: 555;
    }

    .fixedTop >>> .van-search >>> input {
        -webkit-appearance: none;
        background-color: #fff !important;
    }

    .van-tabs {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 4.5rem;
        left: 0;
        overflow-y: scroll;
    }
    .servList{
        width: 100%;
        height: 100%;
        margin-top: 4.5rem;
    }
    .vanTab >>>.van-tabs__nav--line {
        padding: 0 !important;
        border: none !important;
    }
</style>
