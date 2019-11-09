<!--音乐推荐-->
<template>
    <div class="reconmend">
        <div class="swiper">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img v-lazy="image" width="100%" height="100%" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="musicPlayList">
            <div class="recplayList">
                <h3>推荐歌单</h3>
                <div class="resItem">
                    <van-row gutter="30">
                        <van-col span="8" v-for="(item,index) in fiteDayRec" :key="index" @click="toSongList(item)">
                            <div class="pic_out">
                                <a>
                                    <img v-lazy="item['img700']" :alt="item.img" width="100%">
                                </a>
                            </div>
                            <div>
                                <p class="name"><span>{{item.name}}</span></p>
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div class="resongList">
                <h3>歌手推荐</h3>
                <div class="sonItem">
                    <van-row gutter="30">
                        <van-col span="8" v-for="(item,index) in recsongList" :key="index" @click="toMusic(item.id)">
                            <div class="song_pic">
                                <a>
                                    <img v-lazy="item['pic300']" :alt="item.artist" width="100%">
                                </a>
                            </div>
                            <div class="songInfo">
                                <p class="name" :style="{fontSize:'1.2rem'}"><span>{{item.name}}</span></p>
                                <p class="musicNum"><span>{{item.musicNum + "首歌曲"}}</span></p>
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Swipe, SwipeItem , Row, Col,Toast} from 'vant';
    import {getSigerSpec, getSongList} from '@/api/music'
    export default {
        name: 'recommend',
        data(){
            return{
                images:[
                    'http://img1.kwcdn.kuwo.cn/star/upload/2/2/1571537006930_.jpg',
                    'https://imgessl.kugou.com/commendpic/20190109/20190109104155147376.jpg',
                    'http://img1.kwcdn.kuwo.cn/star/upload/2/2/1571537006930_.jpg',
                    'https://imgessl.kugou.com/commendpic/20191020/20191020184326148778.jpg'
                ],
                dayRecList:[],
                recsongList:[]
            }
        },
        computed:{
            fiteDayRec(){
                return this.dayRecList.filter((ele,index)=>{
                    return index < 6;
                })
            }
        },
        methods:{
            toMusic(index){
                this.$router.push({
                    path:'/singerinfo',
                    query:{
                        id:index
                    }
                })
            },
            //获取推荐歌单
            getSigerSpecAr() {
                let params ={
                    id: 'rcm',
                    pageNum: 1,
                    rotNum: 5
                }
                getSigerSpec(params).then(res => {
                    if (res.data.code != 200) {
                        Toast ('数据处理超时');
                        return false;
                    }
                    this.dayRecList = res.data.data.list;
                })
            },
            //获取推荐歌手
            getSongListAr(){
                let params = {
                    category: 11,
                    pageNum: 1,
                    rotNum: 6,
                    reqId: 'e02a2380-fbd3-11e9-9fd2-9fbcaaef64e4'
                }
                getSongList(params).then(res=>{
                    if(res.data.code != 200){
                        Toast ('数据处理超时');
                        return false;
                    }
                    this.recsongList = res.data.data.artistList;
                })
            },
            //跳到歌单详情
            toSongList(item){
                this.$router.push({
                    path: '/songList',
                    query: {
                        id: item.id
                    }
                })
            }
        },
        async mounted () {
            await this.getSigerSpecAr();
            this.getSongListAr();
        }
    }
</script>

<style scoped>
    .reconmend{
        width: 100%;
        height: 100%;
    }
    .swiper{
        width: 100%;
        height: 9rem;
        margin: 0;
    }
    .swiper >>> .van-swipe,
    .swiper >>> .van-swipe img,
    .musicPlayList{
        width: 100%;
        height: 100%;
    }
    .swiper >>> .van-swipe-item{
        width: 100%;
    }
    .musicPlayList{
        margin-bottom: 12rem;
    }
    .musicPlayList h3{
        width: 100%;
        padding: 1rem 1rem 0 1rem;
        font-size: 1.5rem;
    }
    .resItem,
    .sonItem{
        padding: 0 0.6rem;
    }
    .resItem >>> .van-col,
    .sonItem >>> .van-col{
        margin-top: 0.5rem;
        height: 12rem;
    }
    .sonItem >>> .van-col{
        height: 14rem;
    }
    .songInfo p{
        width: 100%;
        text-align: center;
        padding: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
    }
    .van-col p.name{
        width: 100%;
        padding: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
    }
    .pic_out a,
    .sonItem a{
        width: 100%;
        height: 10rem;
        display: block;
    }
    .pic_out img,
    .sonItem img{
        border-radius: 0.2rem;
        width: 100%;
        height: 100%;
    }
</style>
