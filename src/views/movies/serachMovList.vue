<template>
    <div class="serachmvlist">
        <!--头部搜索功能-->
        <div class="fixedTop">
            <van-search
                    v-model="keyWords"
                    placeholder="请输入搜索关键词"
                    show-action
                    shape="round"
                    @search="search"
                    background="#fff"
            >
                <div slot="action" @click="search">搜索</div>
            </van-search>
        </div>
        <!--中部 list部分-->
        <div class="hotshow">
            <h3>电影/电视剧/综艺节目</h3>
            <div class="movie_wrapper" v-for="(item,index) in movies" :key="index">
                <div class="movie_img">
                    <a><img v-lazy="item.img.replace('/w.h/','/64.90/')" alt="" width="100%" height="100%"></a>
                </div>
                <div class="movie_detail">
                    <p class="title">{{item.nm == undefined ? '' : item.nm}}</p>
                    <p class="showpeople"><span>{{item.wish  == undefined ? '0' : item.wish }}</span>人想看</p>
                    <p class="people">主演：{{item.star == undefined ? '' : item.star}}</p>
                    <p class="show">{{item.pubDesc == undefined ? '' : item.pubDesc}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'vant';
    import {getSerachMvdata} from '@/api/movies'
    export default {
        name: 'serachMvList',
        data(){
            return{
                cityId: '',
                stype: '',
                keyWords: '',
                movies: []
            }
        },
        methods:{
            getSerachResult(){
                let params = {
                    keyWords: this.keyWords || '',
                    cityId: this.cityId || 20,
                    stype: this.stype || -1,
                }
                getSerachMvdata(params).then(res=>{
                    if(res.status != 200){
                        Toast('数据处理超时');
                        return false;
                    }
                    this.movies = res.data.movies.list;
                    console.log(this.movies)
                })
            },
            search(){
                this.getSerachResult();
            }
        },
        mounted () {
            this.keyWords = this.$route.query.keyWords || this.keyWords;
            this.getSerachResult();
        }
    }
</script>

<style scoped>
    .serachmvlist{
        width: 100%;
        height: 100%;
    }
    .serachmvlist >>> .van-search{
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        height: 4.5rem;
        background: #fff;
        z-index: 555;
    }
    .hotshow{
        width: 100%;
        margin-top: 4.5rem;
        padding: 1rem;
    }
    .hotshow h3{
        width: 100%;
        font-size: 1.5rem;
        color: #999;
    }
    .movie_wrapper{
        width: 100%;
        display: flex;
        height: 10rem;
    }
    .movie_wrapper .movie_img,
    .movie_wrapper .movie_detail{
        width: 100%;
        height: 100%;
        padding: 1rem 0;
    }
    .movie_wrapper .movie_img{
        flex: 1;
    }
    .movie_wrapper .movie_detail{
        flex: 3;
        padding-left: 0.5rem;
        overflow: hidden;
    }
    .movie_detail p{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .movie_detail p.title{
        font-size: 1.4rem;
        font-weight: bold;
    }
    .movie_detail p.showpeople{}
    .movie_detail p.showpeople span{
        font-weight: 700;
        color: #faaf00;
        font-size: 1.5rem;
    }
    .movie_detail p.people,
    .movie_detail p.show{
        font-size: 1.2rem;
        color: #666;
        margin-top: 0.5rem;
        line-height: 1.5rem;
    }
</style>
