<template>
    <div class="songInfo">
        <div class="userInfo">
            <div class="imgUrl">
                <a>
                    <img v-lazy="singerInfo.pic" alt="" width="100%">
                </a>
            </div>
            <div class="intourld">
                <p :style="{fontSize:'1.5rem',fontWeight:'bold'}">{{singerInfo.name == undefined ? '' : singerInfo.name }}</p>
                <p class="isGray">单曲：{{singerInfo.musicNum == undefined ? '' : singerInfo.musicNum}}</p>
                <p class="isGray">MV：{{singerInfo.mvNum == undefined ? '' : singerInfo.mvNum}}</p>
                <p class="isGray">{{singerInfo.artistFans == undefined ? '' : singerInfo.artistFans | filterFS}}</p>
                <p class="isGray">专辑：{{singerInfo.albumNum == undefined ? '' : singerInfo.albumNum}}</p>
                <p class="isGray">英文名：{{ singerInfo.aartist == undefined ? '' : singerInfo.aartist}}</p>
            </div>
        </div>
        <div class="singMusicList">
            <p class="musciTitle">单曲</p>
            <div class="itemLIst">
                <div class="musicItem" v-for="(item,index) in singerMusic" :key="index" @click="play(item,item.rid)">
                    <div class="number">
                        <p :style="{fontSize:'1.5rem'}">{{index+1}}</p>
                    </div>
                    <div class="musicInfo">
                        <p class="name" :style="{fontSize: '1.5rem'}">{{item.name}}</p>
                        <p class="tone">
                            <span v-if="item.hasLossless == true">无损</span>
                            <span v-else>标准</span>
                            {{item.artist}}-{{item.name}}
                        </p>
                    </div>
                    <div class="more">
                        <p>...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from  'vant';
    import {getSongInfo, getSongMusic,palyMusic,songinfoandlrc ,formatMusicPir} from  '@/api/music';
    export default {
        name: 'songInfo',
        data(){
            return{
                singerInfo: [],
                singerMusic: [],
                lrc: [],
                songName: '',
                artist: '',
                rid: ''
            }
        },
        filters:{
            filterFS(val){
                if(val){
                    return `粉丝：${(Number(val)/10000).toFixed(1)}W`
                }
            }
        },
        methods:{
            /*获取一歌手信息*/
            getSongerInfo(id){
                let params = { id }
                getSongInfo(params).then(res=>{
                    if(res.data.code == 200){
                        this.singerInfo = res.data.data;
                    }else{
                        console.log('歌手信息数据获取失败')
                    }
                })
            },
            /*获取歌手的歌曲*/
            getSongMusicList(id){
                let params = {
                    id: id,
                    pageNum: 1,
                    rotNum: 30,
                }
                getSongMusic(params).then(res=>{
                    if(res.data.code == 200){
                        console.log(res.data.data.list);
                        this.singerMusic = res.data.data.list;
                    }else{
                        console.log('歌手信息数据获取失败')
                    }
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
                    //找到名和作者
                    this.songName = res.data.data.songinfo.songName;
                    this.artist = res.data.data.songinfo.artist;
                    this.rid = res.data.data.songinfo.id;
                    this.lrc =  formatMusicPir(res.data.data.lrclist);//格式化歌词
                })
            },
            //播放歌曲
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
        mounted () {
            let id = this.$route.query.id;
            this.getSongerInfo(id);
            this.getSongMusicList(id);
        }
    }
</script>

<style scoped>
    .songInfo{
        width: 100%;
        height: 100%;
    }
    .userInfo{
        width: 100%;
        height: 16rem;
        display: flex;
        flex-direction: row;
        padding: 1.5rem;
    }
    .userInfo .imgUrl{
        flex: 2;
        width: 100%;
        height: 100%;
    }
    .userInfo .imgUrl a{
        display: block;
        width: 100%;
        height: 100%;
    }
    .userInfo .imgUrl img{
        border-radius: 50%;
    }
    .userInfo .intourld{
        flex: 3;
        width: 100%;
        height: 100%;
    }
    .userInfo .intourld p{
        width: 100%;
        padding-left: 1.5rem;
        line-height: 2.2rem;
        font-size: 1.2rem;
    }
    .userInfo .intourld p.isGray{
        color: #999;
    }
    .singMusicList{
        width: 100% ;
        height: 100%;
        margin-bottom: 6rem;
    }
    .singMusicList p.musciTitle{
        width: 100%;
        padding-left: 1rem;
        padding-bottom: 1rem;
        font-weight: bold;
        font-size: 2rem;
        border-bottom: 1px solid orange;
    }
    .itemLIst{
        width: 100% ;
        height: 100%;
        margin-top: 1rem;
    }
    .musicItem{
        width: 100%;
        height: 5rem;
        display: flex;
        margin-top: 1rem;
    }
    .musicItem .number,
    .musicItem .more{
        width: 100%;
        height: 100%;
        flex: 1;
    }
    .musicItem .number p,
    .musicItem .more p
    {
        width: 3rem;
        height: 5rem;
        line-height: 5rem;
        text-align: center;
    }
    .musicItem .musicInfo{
        flex: 6;
        width: 100%;
        overflow: hidden;
    }
    .musicItem .musicInfo p{
        width: 100%;
        height: 1.5rem;
        font-size: 1rem;
        padding: 0.4rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .musicItem .musicInfo .tone span{
        display: inline-block;
        width: 2.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 1rem;
        background-color: orange;
        text-align: center;
        border-radius: 0.4rem;
    }
    .musicItem .more{
        flex: 1;
        letter-spacing: 0.6rem;
        font-weight: bold;
    }
    .player{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-x: hidden;
        z-index: 999;
    }
    .aplayer{
        height: 8rem !important;
    }
    .aplayer >>> .aplayer-author{
        display: block;
    }
    .aplayer >>> .aplayer-info{
        height: 8rem !important;
        margin-left: 0 !important;
        padding: 0 !important;
        min-height: 8rem !important;
    }
</style>
