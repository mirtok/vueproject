<template>
    <div class="songList">
        <!--头部图片-->
        <div class="bigPic">
            <a>
                <img v-lazy="bigPic" alt="" width="100%" height="100%">
            </a>
        </div>
        <!--头部info-->
        <div class="info">
            <h3 :style="{color:'#000'}">歌单介绍</h3>
            <p>{{info}}</p>
        </div>
        <!--底部list-->
        <div class="list">
            <ul>
                <li class="songListItem" v-for="(item,index) in dateilData" :key="index" @click="play(item,item.rid)">
                    <span>{{index+1}}</span>
                    <span>{{item.name}}
                        <van-tag plain type="warning" v-if="item.hasLossless == true">无损</van-tag>
                        <van-tag plain type="warning" v-else>标准</van-tag>
                    </span>
                    <span>{{item.artist}}</span>
                    <span>{{item.songTimeMinutes}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {Toast, Tag } from 'vant';
    import {getSongListDetails, palyMusic,formatMusicPir,songinfoandlrc } from  '@/api/music'
    export default {
        name: 'songList',
        data(){
            return{
                id: null,
                pageNum: 1,
                rotNum: 30,
                bigPic: '',
                info: '',
                songName: '',
                artist: '',
                rid: '',
                lrc: '',
                dateilData: [],
            }
        },
        methods:{
            //获取初次加载页面数据
            getSonglistDate(){
                let params = {
                    id:  this.id,
                    pageNum: this.pageNum,
                    rotNum: this.rotNum
                }
                getSongListDetails(params).then(res=>{
                    if (res.data.code != 200) {
                        Toast ('数据处理超时');
                        return false;
                    }
                    this.bigPic = res.data.data['img700'];
                    this.info = res.data.data['info']
                    this.dateilData = res.data.data.musicList;

                })
            },
            /*获取歌词*/
            getSonginfoandlrc(item){
                let params = {
                    musicId: item.musicrid.split('_')[1] || '',
                }
                return songinfoandlrc(params).then(res=>{
                    if(res.status != 200){
                        Toast('歌手信息数据获取失败')
                        return false;
                    }
                    console.log(res.data.data)
                    //找到名和作者
                    this.songName = res.data.data.songinfo.songName;
                    this.artist = res.data.data.songinfo.artist;
                    this.rid = res.data.data.songinfo.id;
                    console.log(this.rid)
                    if(res.data.data.lrclist){
                        this.lrc =  formatMusicPir(res.data.data.lrclist);//格式化歌词
                    }else{
                        this.lrc = '';
                    }
                })
            },
            //播放音乐
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
            },
        },
        mounted () {
            this.id = this.$route.query.id;
            this.getSonglistDate();
        }
    }
</script>

<style scoped>
    .songList{
        width: 100%;
        height: 100%;
    }
    .bigPic{
        width: 100%;
        height: 20rem;
    }
    .bigPic a{
        display: block;
        width: 100%;
        height: 100%;
    }
    .info{
        width: 100%;
        padding: 1rem;
        color: #888;
        font-size: 1.5rem;
        letter-spacing: 2px;
        text-indent: 2rem;
    }
    .info p{
        margin-top: 1rem;
    }
    .list{
        width: 100% ;
        height: 100%;
        padding: 1rem;
    }
    .list .songListItem{
        display: flex;
        width: 100%;
        height: 5rem;
        font-size: 1.4rem;
        box-sizing: border-box;
    }
    .list .songListItem>span{
        display: block;
        width: 100%;
        text-align: center;
    }
    .list .songListItem>span:nth-child(1){
        flex: 1;
        text-align: left;
    }
    .list .songListItem>span:nth-child(2){
        flex: 5;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
    }
    .list .songListItem>span:nth-child(3){
        flex: 3;
        overflow: hidden;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
    }
    .list .songListItem>span:nth-child(4){
        flex: 2;
    }
</style>
