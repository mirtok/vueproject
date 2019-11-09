<!--歌手-->
<template>
    <div class="singerRank">
        <div class="list-content" id="list-content">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        loading-text="加载中"
                        finished-text="没有更多了"
                        @load="onLoad"
                        :offset="100">
                    <!-- 加载的内容-->
                    <ul class="singLIst">
                        <li v-for="(item,index) in filsinge(filsingerList)" class="item" @click="toSingerInfo(item)">
                            <!-- info -->
                            <div class="singerInfo">
                                <div class="leftImg">
                                    <a ><img v-lazy="item.pic" alt=""></a>
                                </div>
                                <div class="rightInfo">
                                    <p :style="{fontSize:'1.5rem'}">姓名：{{item.name == undefined ? '':item.name }}</p>
                                    <p :style="{fontSize:'1.2rem'}">歌曲：{{item.musicNum == undefined ? '':item.musicNum }}</p>
                                    <p :style="{fontSize:'1.2rem'}">MV：{{item.mvNum == undefined ? '':item.mvNum }}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
    import {getSongList} from '@/api/music';
    import  {Toast, PullRefresh, List} from 'vant';
    import {mapGetters} from 'vuex'
    export default {
        name: 'singerRank',
        data(){
            return{
                category: 0,
                pageNum: 1,
                rotNum: 100,
                singerList: [],
                SaveSinger:[],
                num: 5,
                loading: false,//控制上拉加载的加载动画
                finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
                isLoading: false,//控制下拉刷新的加载动画
            }
        },
        computed:{
            ...mapGetters(['getMsgKey']),
            filsingerList(){
                return this.singerList.filter((ele,index)=>{
                    return index < this.num;
                })
            }
        },
        watch:{
            getMsgKey(val){
                if (val) {
                    this.singerList = this.singerList.filter(function(product) {
                        return Object.keys(product).some(function(key) {
                            return (String(product[key]).toLowerCase().indexOf(val) > -1);
                        });
                    });
                }else{
                    this.singerList = this.SaveSinger;
                }
            }
        },
        methods:{
            //初始化5条
            filsinge(singerList){
                return singerList.filter((ele,index)=>{
                    return index < this.num;
                })
            },
            //下拉刷新
            onRefresh() {
                setTimeout( async () => {
                    await this.getSongListArr();
                    Toast.loading('刷新成功');
                }, 500);
            },
            //上拉加载
            onLoad() {
                setTimeout(()=>{
                    this.num = this.num + 5;
                    this.loading = false;
                    if(this.num > 100){
                        this.finished = true;
                    }
                },500);
            },
            //初始化数据
            getSongListArr(){
                let params = {
                    category: this.category,
                    pageNum: this.pageNum,
                    rotNum: this.rotNum
                }
                getSongList(params).then(res=>{
                    if(res.data.code != 200){
                        Toast('数据处理超时!');
                        return false;
                    }
                    this.singerList = res.data.data.artistList;
                    this.SaveSinger = res.data.data.artistList;
                    this.finished = false;
                    this.isLoading = false;
                    Toast.clear();
                })
            },
            //点击歌手跳转
            toSingerInfo(item){
                this.$router.push({
                    path: '/singerinfo',
                    query:{
                        id: item.id
                    }
                })
            }
        },
        mounted () {
            this.getSongListArr();
            let winHeight = document.documentElement.clientHeight;                         //视口大小
            document.getElementById('list-content').style.height = (winHeight - 45) +'px';  //调整上拉加载框高度
        }
    }
</script>

<style scoped>
    .singLIst{
        width: 100%;
        height: 100%;
        margin-bottom: 6rem;
    }
    .list-content{
        width: 100%;
        overflow:scroll;
    }
    .item:nth-child(1){
        margin: 0;
    }
    .item{
        width: 100%;
        height: 6rem;
        margin-top: 1rem;
    }
    .item:last-child{
        margin-bottom: 6rem;
    }
    .singLIst .singerInfo{
        width: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: row;
    }
    .singLIst .singerInfo .leftImg{
        flex: 1;
        width: 100%;
        height: 100%;
    }
    .leftImg a{
        display: block;
        margin: 1.2rem auto;
        width: 5rem;
        height: 5rem;
    }
    .leftImg a img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .singLIst .singerInfo .rightInfo{
        flex: 3;
        width: 100%;
        height: 100%;
        padding: 1rem;
    }

</style>
