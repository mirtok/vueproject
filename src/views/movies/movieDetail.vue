<template>
    <div class="movieDetail">
        <!--头部信息-->
        <div class="moviesinfo">
            <div class="moviebigImg">
                <a><img v-lazy="movieInfoVO.jdPicUrl" alt="" width="100%" height="100%"></a>
            </div>
            <div class="movieIntord">
                <p :style="{fontSize: '2rem'}">
                    {{movieInfoVO.movieName == undefined ? '' : movieInfoVO.movieName}}
                </p>
                <p :style="{color: '#aaa'}">
                    {{movieInfoVO.movieType  == undefined ? '' : movieInfoVO.movieType}}/
                    {{movieInfoVO.area  == undefined ? '' : movieInfoVO.area}}/
                    {{movieInfoVO.movieLength == undefined ? '' : `${movieInfoVO.movieLength}分钟` }}
                </p>
                <p :style="{color: '#aaa'}">
                    {{movieInfoVO.releaseDate  == undefined ? '' : movieInfoVO.releaseDate}}
                    {{movieInfoVO.area == undefined ? '': `在${movieInfoVO.area}上映`}}
                </p>
                <p :style="{fontSize: '2rem',color: 'orange'}">
                    {{movieInfoVO.grade == null ? '暂无评分' : movieInfoVO.grade +  '分'}}
                </p>
            </div>
        </div>
        <!--剧情介绍-->
        <div class="movieInfo">
            <h1>简介</h1>
            <div class="info">
                <p>{{movieInfoVO.movieInfo}}</p>
            </div>
        </div>
        <!--演员介绍-->
        <div class="actorInfo">
            <van-row :gutter="10">
                <van-col span="6" v-for="(item,index) in filteractors" :key="index">
                    <article>
                        <a><img v-lazy="item.jdPhoto" :alt="item.name" width="100%" height="100%"></a>
                        <p>{{item.name}}</p>
                    </article>
                </van-col>
            </van-row>
            <p class="actorAll" @click="setInIndex">{{actors.length < 0 ? '' : `全部${actors.length}演职人员`}}</p>
        </div>
        <!--剧照-->
        <div class="stagePicInfo">
            <h1>剧照</h1>
            <div class="itemPic">
                <van-row :gutter="10">
                    <van-col span="12" v-for="(item,index) in filterstagePicInfo" :key="index" :style="{marginTop:'1rem'}">
                        <a><img v-lazy="item.minUrl" alt="" width="100%" height="100%"></a>
                    </van-col>
                </van-row>
            </div>
            <p class="actorAll" @click="setInPicIndex">{{stagePicInfo.length < 0 ? '' : `全部${stagePicInfo.length}张剧照`}}</p>
        </div>
        <!--购票按钮-->
        <div class="buyticket">
            <div class="btn">
                <van-button type="default" @click="buytitck">立即购票</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {getMovieDetail} from '@/api/movies';
    import {Toast, Row, Col, Button } from  'vant';
    import {mapMutations} from  'vuex'
    export default {
        name: 'movieDetail',
        data(){
            return{
                movieId: null,
                cityId: null,
                inIndex: 4,
                inPicIndex: 4,
                actors: [],//演员
                movieInfoVO: {},//电影介绍
                stagePicInfo: [],//剧照
            }
        },
        computed:{
            filteractors(){
                return this.actors.filter((item,index)=>{
                    return index < this.inIndex;
                })
            },
            filterstagePicInfo(){
                return this.stagePicInfo.filter((item,index)=>{
                    return index < this.inPicIndex;
                })
            }
        },
        methods:{
            ...mapMutations(['setPicUrl']),
            getDetaildata(){
                let params = {
                    movieId: this.movieId,
                    cityId: this.cityId
                }
                getMovieDetail(params).then(res=>{
                    if(res.data.code != 200){
                        Toast ('数据处理超时');
                        return false;
                    }
                    this.movieInfoVO = res.data.data.movieInfoVO;
                    this.actors = res.data.data.actors;
                    this.stagePicInfo = res.data.data.stagePicInfo;
                })
            },
            setInIndex(){
                if(this.inIndex < this.actors.length ){
                    this.inIndex = this.actors.length;
                    return;
                }
                this.inIndex = 8;
            },
            setInPicIndex(){
                if(this.inPicIndex < this.stagePicInfo.length ){
                    this.inPicIndex = this.stagePicInfo.length;
                    return;
                }
                this.inPicIndex = 4;
            },
            //购票
            buytitck(){
                let jdPicUrl = this.movieInfoVO.jdPicUrl || '';
                this.setPicUrl(jdPicUrl);
                this.$router.push({
                    path: '/selectSeat',
                    query:{
                        ticketname: this.movieInfoVO.movieName
                    }
                });
            }
        },
        mounted () {
            this.movieId = this.$route.query.movieId || '';
            this.cityId = this.$route.query.cityId || '';
            this.getDetaildata();
        }
    }
</script>

<style scoped>
    .movieDetail{
        width: 100%;
        height: 100%;
    }
    .moviesinfo{
        width: 100%;
        height: 16rem;
        display: flex;
    }
    .moviebigImg{
        flex: 1;
        padding: 1rem;
    }
    .moviebigImg a{
        display: block;
        width: 100%;
        height: 100%;
    }
    .movieIntord {
        flex: 2;
        padding: 1rem;
        overflow: hidden;
    }
    .movieIntord p{
        width: 100%;
        margin-top: 1rem;
        font-size: 1.2rem;
    }
    .movieInfo{
        width: 100%;
        padding: 0.5rem 1rem;
    }
    .movieInfo h1,
    .stagePicInfo h1{
        font-size: 2rem;
        margin: 1.5rem auto;
    }
    .movieInfo p{
        font-size: 1.4rem;
    }
    .actorInfo{
        width: 100%;
        padding: 0.5rem 1rem;
    }
    .actorInfo article{
        width: 100%;
        height: 14rem;
    }
    .actorInfo article a{
        display: block;
        width: 100%;
        height: 10rem;
    }
    .actorInfo article a,
    .actorInfo article p{
        width: 100%;
    }
    .actorInfo article p{
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .actorInfo .actorAll,
    .stagePicInfo .actorAll{
        width: 100%;
        text-align: center;
        color: dodgerblue;
        font-size: 2rem;
    }
    .stagePicInfo{
        width: 100%;
        padding: 1rem;
        margin-bottom: 4rem;
    }
    .stagePicInfo .itemPic{
        width: 100%;
        height: 8rem;

    }
    .stagePicInfo .itemPic a{
        display: block;
        width: 100%;
        height: 8rem;
    }
    .buyticket{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 5rem;
        background-color: #fff;
    }
    .buyticket .btn{
        width: 100%;
    }
    .buyticket .btn .van-button{
        width: 100%;
        outline: none;
        border: none;
        color: #ffffff;
        background-color: #f00;
    }
</style>
