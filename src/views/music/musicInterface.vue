<template>
    <div class="musicInterface">
        <p class="querySingd">{{querySinger}}</p>
        <div class="singerImg">
            <img  v-lazy="this.$add.audio.cover" alt="" class="image" ref="img" />
        </div>
        <div class="musicInroudInfo">
            <p>{{musicIntould}}</p>
        </div>
        <div id="player">
            <aplayer
                @canplay="palymusic"
                @onPlay="onPlay"
                @onPause="onPause"
                :fixed="true"
                :audio="this.$add.audio"
                :lrcType="1"
                :mini="false"
                ref="aplayer"
            />
        </div>
    </div>
</template>

<script>
    import {songinfoandlrc,getMusicInfo} from  '@/api/music';
    export default {
        name: 'musicInterface',
        data(){
            return {
                InterVal: "",
                songName: '',
                artist: '',
                mid: '',
                musicIntould: ''
            }
        },
        computed: {
            querySinger(){
                if(this.songName && this.artist ){
                    return `${this.songName}---${this.artist}`
                }
                return '暂无';
            }
        },
        methods:{
            getMusicInfoRc(par){
                let params = { mid: par}
                getMusicInfo(params).then(res=>{
                    if(res.data.code != 200){
                        Toast('数据处理超时!');
                        return false;
                    }
                   this.musicIntould = res.data.data.albuminfo != undefined ? res.data.data.albuminfo : "";
                })
            },
            palymusic() {
                this.$refs.aplayer.play();
            },
            onPlay(){
                let img = this.$refs.img;
                let rotateVal = 0;
                this.InterVal = setInterval(()=>{
                    rotateVal += 1;
                    // 设置旋转属性(顺时针)
                    img.style.transform = "rotate(" + rotateVal + "deg)";
                    // 设置旋转属性(逆时针)
                    //img.style.transform = 'rotate(-' + rotateVal + 'deg)'
                    // 设置旋转时的动画  匀速0.1s
                    img.style.transition = "0.1s linear";
                },100)
            },
            onPause(){
                clearInterval(this.InterVal)
            },
            async getInfo(){
                await this.onPlay();
            }
        },
        beforeRouteLeave(to, from, next) {
            clearInterval(this.InterVal);
            next();
        },
        mounted () {
            this.songName = this.$route.query.songName || '';
            this.artist = this.$route.query.artist || '';
            this.mid = this.$route.query.rid || '';
            if(this.mid){
                this.getMusicInfoRc(this.mid );
            }
            this.getInfo();
        },
    }
</script>

<style scoped>
    .musicInterface{
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background: rgba(135,206,250,0.5);
    }
    .querySingd{
        text-align: center;
        width: 100%;
        padding: 2rem auto;
        font-size: 2.5rem;
        color: #ffffff;
    }
    .musicInroudInfo{
        width: 100%;
        height: 20vh;
        padding-top: 1.5rem;
    }
    .musicInroudInfo p{
        line-height: 2rem;
        height: 10rem;
        color: #f00;
        font-size: 1.4rem;
        padding: 0 1.5rem;
        text-indent: 2rem;
        overflow: hidden;
        white-space: initial;
        text-overflow: ellipsis;
    }
    .singerImg{
        width: 100%;
    }
    .image {
        display: block;
        margin: 1rem auto;
        border-radius: 50%;
        cursor: pointer;
    }
    #player{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: auto;
        box-sizing: border-box;
    }
</style>
