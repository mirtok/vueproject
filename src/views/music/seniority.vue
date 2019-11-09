<!--排行-->
<template>
    <div class="seniority">
        <div class="secList">
            <van-tree-select
                height="100vh"
                :items="items"
                :main-active-index.sync="activeIndex"
                @click-nav="clickNav"
            >
                <template slot="content">
                    <div class="Item" v-for="(it,i) in items" :key="i">
                        <ul class="list" v-if="activeIndex == i">
                            <li v-for="(item,index) in hotList" :key="index" @click="play(item,item.rid)">
                                <a>
                                    <img v-lazy="item.pic" alt="">
                                </a>
                                <div class="insorec">
                                    <p :style="{fontSize:'1.4rem'}">{{item.name}}</p>
                                    <p :style="{fontSize:'1.2rem'}">{{item.artist}}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </template>
            </van-tree-select>
        </div>
    </div>
</template>

<script>
    import { Toast, TreeSelect } from 'vant';
    import {getLeaderList, palyMusic, formatMusicPir,songinfoandlrc} from '@/api/music'
    export default {
        name: 'seniority',
        data(){
            return {
                activeIndex: 0,
                songName: '',
                artist: '',
                rid: '',
                lrc: '',
                items: [
                    { text: '酷酷飙升榜', sourceid: '93'},
                    { text: '酷酷新歌榜', sourceid: '17'},
                    { text: '酷酷热歌榜', sourceid: '16'},
                    { text: '抖音热歌榜', sourceid: '158'},
                    { text: '会员畅听榜', sourceid: '145'}
                ],
                pageNum: 1,
                rotNum: 30,
                hotList: []//热歌榜数组
            }
        },
        methods:{
            getLeaderListAr(sourceid){
                let params = {
                    sourceid: sourceid,
                    pageNum: this.pageNum,
                    rotNum: this.rotNum
                };
                getLeaderList(params).then(res=>{
                    if(res.data.code != 200){
                        Toast('数据处理超时!');
                        return false;
                    }
                    this.hotList = res.data.data.musicList;
                })
            },
            clickNav(e){
                this.getLeaderListAr(this.items[e].sourceid);
            },
            //点击播放
            getSonginfoandlrc(item){
                let params = {
                    musicId: item.musicrid.split('_')[1] || '',
                }
                return songinfoandlrc(params).then(res=>{
                    if(res.status != 200){
                        Toast('歌手信息数据获取失败')
                        return false;
                    }
                    //找到名和作者
                    this.songName = res.data.data.songinfo.songName;
                    this.artist = res.data.data.songinfo.artist;
                    this.rid = res.data.data.songinfo.id;
                    this.lrc =  formatMusicPir(res.data.data.lrclist);//格式化歌词
                })
            },
            async play(item,rid){
                let params = { rid };
                await palyMusic(params).then(res=>{
                    if(res.data.code != 200){
                        Toast('数据处理超时!');
                        return false;
                    }
                    this.getSonginfoandlrc(item);
                    setTimeout(()=>{
                        this.$add.audio = {
                            name: item.name,
                            artist: item.artist,
                            url: res.data.url,
                            cover: item.pic,
                            lrc: this.lrc
                        }
                        this.$router.push({
                            path: '/MusicInterface',
                            query: {
                                songName: this.songName,
                                artist: this.artist,
                                rid: this.rid
                            }
                        })
                    },1000)
                });
            }
        },
        mounted(){
            this.getLeaderListAr(this.items[0].sourceid);
        }
    }
</script>

<style scoped>
    .seniority{
        width: 100%;
        height: 100%;
        margin-bottom: 20rem;
    }
    .list>li{
        width: 100%;
        display: flex;
        padding: 1rem;
    }
    .list>li>a{
        flex: 1;
        display: block;
        width: 3rem;
        height: 5rem;
    }
    .list>li>a>img{
        width: 100%;
        height: 100%;

    }
    .list>li:last-child{
        margin-bottom: 5rem;
    }
    .list .insorec{
        text-align: center;
        font-size: 1rem;
        flex: 4;
        width: 100%;
    }
</style>
