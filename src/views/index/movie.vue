<template>
    <div class="movie">
        <div class="fixedTop">
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                show-action
                shape="round"
                @search="onSearch"
                background="#fff"
            >
            <div slot="action" @click="onSearch">搜索</div>
            </van-search>
        </div>
        <div class="movieList">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list v-model="loading"
                    :finished="finished"
                    @load="onLoad"
                    loading-text="加载中"
                    finished-text="没有更多了"
                    :offset="100">
                    <div class="movieItem"v-for="(item,index) in movieArr" :key="index">
                        <div class="poster-img">
                            <a class="aImg"><img v-lazy="item.jdPicUrl" alt="" height="100%" width="100%"></a>
                            <i class="i-play"></i>
                        </div>
                        <div class="poster-info">
                        <p>
                            <span>{{item.movieName}}</span>
                            <i class="tpp-lbl-g" :style="{color:'#afafaf'}"><i class="lbl-hdr" :style="{color:'#afafaf'}"> {{item.movieType}}</i></i>
                        </p>
                        <p>年份 <span :style="{color:'#ff9c1c'}">{{item.releaseDate}}</span></p>
                        <p>导演：{{item.director}}</p>
                        <p :style="{width:'100%',overflow:'hidden'}" class="actoer">主演：{{item.actors}}</p>
                    </div>
                        <div class="btn-wrap">
                            <van-button type="default" size="small"  @click="toDetail(item.movieId)">购票</van-button>
                            <div class="acttag">特惠</div>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
    import { Search, Button, PullRefresh, List, Toast } from 'vant'
    import Tabbar from '@/components/tabbar.vue'
    import {getMovie} from  '@/api/movies'
    export default {
        name: 'movie',
        components: {
            Tabbar
        },
        data () {
            return {
                value: '',
                movieArr: [],
                cityId: 4201, //武汉
                playType: 2,
                orderType: 1,
                pageNum: 1,
                pageSize: 20,
                loading: false,//控制上拉加载的加载动画
                finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
                isLoading: false,//控制下拉刷新的加载动画
            }
        },
        computed:{
            serMovArr(){
                let search = this.value;
                if (search) {
                    return this.movieArr.filter(function(product) {
                        return Object.keys(product).some(function(key) {
                            return (String(product[key]).toLowerCase().indexOf(search) > -1);
                        });
                    });
                }
                else{
                    return  this.movieArr
                }
            }
        },
        methods: {
            //下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.getMove(); //加载数据
                    this.isLoading = false;
                }, 500);
            },
            //上拉加载
            onLoad(){
                setTimeout(()=>{
                    this.pageNum += 1;
                    this.getMove(); //加载数据
                },500)
                this.loading = false;
                Toast.clear();
            },
            getMove () {
                let params = {
                    cityId: this.cityId || 4201,
                    playType: this.playType || 2,
                    orderType: this.orderType || 1,
                    pageNum: this.pageNum || 1,
                    pageSize: this.pageSize || 20
                };
                let result = getMovie(params);
                result.then(res => {
                    if(this.movieArr.length >= res.data.data.totalCount){
                        this.finished = true;
                    }else{
                        this.finished = false;
                        let data = res.data.data.list;
                        data.forEach((ele,index)=>{
                            this.movieArr.push(ele);
                        });
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            },
            toDetail(item){
                this.$router.push(({
                    path: '/movieDetail',
                    query:{
                        movieId:  item,
                        cityId: this.cityId
                    }
                }))
            },
            onSearch () {
                let val = this.value || '';
                this.$router.push({
                    path: '/serachMovList',
                    query: {
                        keyWords: val
                    }
                });
            },
        },
        mounted () {
            this.getMove();
        }
    }
</script>

<style scoped>
    .fixedTop >>> .van-search{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4.5rem;
        background: #fff;
        z-index: 555;
    }
    .fixedTop >>>  .van-search >>>input {
        -webkit-appearance: none;
        background-color: #fff!important;
    }
    .movieList {
        width: 100%;
        margin-top: 4.5rem;
        padding: 0.5rem;
        height: 100%;
        margin-bottom: 4rem;
    }
    .movieList .movieItem{
        width: 100%;
        display: flex;
        height: 10rem;
    }
    /*左边图片开始*/
    .poster-img{
        flex: 2;
        width: 100%;
        height: 100%;
        position: relative;
    }
    .poster-img .aImg{
        display: block;
        width: 8rem;
        height: 100%;
        padding: 1rem;
    }
    .i-play, .i-play:after {
        display: block;
        top: 50%;
        left: 50%;
        position: absolute;
    }
    .i-play {
        background: hsla(0,0%,100%,.9);
        border-radius: 100%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
    }
    .i-play:after {
        content: "";
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-left: 5px solid #000;
        border-bottom: 5px solid transparent;
        margin: -5px 0 0 -2px;
    }
    .i-play, .i-play:after {
        display: block;
        top: 50%;
        left: 50%;
        position: absolute;
    }
    *, :after, :before {
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        box-sizing: border-box;
    }
    /**左边图片结束*/

    /*信息内容开始*/
    .movieList .movieItem .poster-info{
        flex: 5;
        width: 100%;
        height: 100%;
        padding: 1rem 0.2rem;
        overflow: hidden;
    }
    .movieList .movieItem .poster-info p{
        line-height: 2rem;
        height: 2rem;
        font-size: 1.2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .movieList .movieItem .actoer{
        width: 100%;
    }
    /*信息内容结束*/
    /*右边按钮开始*/
    .movieList .movieItem .btn-wrap{
        flex: 2;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .movieList .movieItem .btn-wrap .van-button{
        width: 60%;
        margin: 0 auto;
        color: #fff;
        border-radius: 3rem;
        background-color: #f00;
        /*background-image: linear-gradient(45deg,#ff47a8,#ff2e62);*/
        /*-webkit-background-image: linear-gradient(45deg,#ff47a8,#ff2e62);*/
    }
    .acttag{
        color: #999;
        max-width: 3.125rem;
        max-width: 13.33333333vw;
        margin-top: 1.33333333vw;
        font-size: 1rem;
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    /*右边按钮结束*/
</style>
