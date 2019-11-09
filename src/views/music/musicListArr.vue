<!--搜索列表-->
<template>
    <div class="musicList">
        <!--搜索记录-->
        <van-row v-if="searhistory.length > 0" :style="{padding:'0 1rem'}" gutter="1" type="flex" justify="start" align="center">
            <van-col span="8" v-for="(item,index) in searhistory" :key="index">
                <van-tag plain type="warning" @click.stop="getSerachResult(item)">{{item}}</van-tag>
            </van-col>
        </van-row>
        <div class="list">
            <ul>
                <li class="liIttem" v-for="(item,index) in list" :key="index" @click="play(item)">
                    <div class="songImg">
                        <a>
                            <img v-lazy="item.pic" :alt="item.title" width="100%" height="100%">
                        </a>
                    </div>
                    <div class="songInfo">
                        <p>歌曲：{{item.title}}</p>
                        <p>歌手：{{item.author}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {Toast, Row, Col, Tag } from  'vant';
    import {getfuzzySerach} from  '@/api/music';
    import  {mapGetters} from  'vuex';
    export default {
        name: 'musicListArr',
        props:{
            keyValue:String
        },
        data(){
            return{
                list: []
            }
        },
        computed:{
            ...mapGetters(['getSerachKey']),
            searhistory(){
                let arr = [];
                if(this.getSerachKey){
                    arr = Array.from(this.getSerachKey);
                    return arr.filter((item,index)=>{
                        return index < 6;
                    })
                }else{
                    return  arr;
                }
            }
        },
        watch:{
            keyValue(val){
                this.getSerachResult(val);
            },
            getSerachKey(arr){
            }
        },
        methods:{
            getSerachResult(val){
                let params = {
                    name: val.split('/')[0]
                }
                this.$emit('getChidC',false);
                getfuzzySerach(params).then(res=>{
                    if(res.data.code != 200){
                        Toast('数据处理超时');
                        return false;
                    }
                    this.list = res.data.result;
                })
            },
            play(item){
               if(!item){
                   Toast('当前歌手信息不完整哦!')
                   return false;
               }
                setTimeout(()=>{
                    this.$add.audio = {
                        name: item.title,
                        artist: item.author || "",
                        url: item.url,
                        cover: item.pic,
                        lrc: this.lrc || ""
                    }
                    this.$router.push({
                        path: '/MusicInterface',
                        query: {
                            songName: item.title,
                            artist: item.author,
                            rid: ''
                        }
                    })
                },1000)
            }
        },
        mounted () {

        }
    }
</script>

<style scoped>
    .musicList{
        width: 100%;
        height: 100%;
        margin-top: 4.5rem;
    }
    .musicList ul{
        width: 100% ;
        height: 100%;
        overflow: hidden;
        margin-bottom: 6rem;
    }
    .liIttem{
        width: 100% ;
        display: flex;
        height: 5rem;
        margin-top: 1rem;
        overflow: hidden;
    }
    .songImg{
        flex: 1;
        width: 5rem;
        height: 5rem;
    }
    .songImg a{
        display: block;
        width: 5rem;
        height: 5rem;
        margin: 0 auto;
    }
    .songInfo{
        flex: 3;
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        font-size: 1.2rem;
    }
    .songInfo p{
        height: 2rem;
        /*white-space: nowrap;*/
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
