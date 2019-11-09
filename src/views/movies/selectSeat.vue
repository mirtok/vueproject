<template>
    <div class="selectSeat">
        <h1 class="title">酷酷影院</h1>
        <!--屏幕-->
        <div class="sereen">
            <div class="box">
                屏幕
            </div>
        </div>
        <!--座位-->
        <div class="seat">
            <ul class="seatRow" v-for="(item,index) in rowArr" :key="index">
                <a>{{index+1}}</a>
                <li  v-for="(its,i) in colArr" :key="i"  v-bind:data-num="item * its" @click="queryIndex($event,item,its)">{{its}} </li>
            </ul>
        </div>
        <!--选择的座位-->
        <div class="seatList">
            <p><span>选择的座位</span><span> 每个用户只能选座4个座位</span></p>
            <ul>
                <li v-for="(items,index) in getselectArr":key="index">{{items}}</li>
            </ul>
        </div>
        <!--确认选座-->
        <div class="calbtn">
            <van-button type="default" @click="affirm">确认选座{{allmoeny}}</van-button>
        </div>
    </div>
</template>

<script>
    import  {mapMutations,mapGetters} from  'vuex';
    import  {Toast,Button} from 'vant';
    import  {saveBuyticketInfo} from '@/api/movies';
    import moment from 'moment'
    export default {
        name: 'selectSeat',
        data () {
            return {
                isdas: true,//判断按钮是否锁定
                rowArr: [1,2,3,4,5,6,7,8,9],//排数据
                colArr: [1,2,3,4,5,6,7,8,9],//列数据
                ticketname: this.$route.query.ticketname || '',
                username: 'now',
                allmoenyT: '',
                insertId: ''//插入的id
            }
        },
        computed:{
            ...mapGetters(['getselectArr','getPicUrl']),
            allmoeny(){
                if(this.getselectArr.length > 0){
                    this.allmoenyT = (this.getselectArr.length * 35).toFixed(2);
                    return `/${(this.getselectArr.length * 35).toFixed(2)}元`;
                }
                return  '';
            }
        },
        methods:{
            ...mapMutations(['setselectArr','restrtselecarr','delectselecarr']),
            queryIndex(e,index,item){
                let result = document.defaultView.getComputedStyle(e.target,false)['backgroundColor'];
                let str = `${index}排${item}座`;
                if(this.getselectArr.length >= 4 ){
                    Toast('每个用户最多选选择4个座位');
                    return;
                }
                if(result == "rgb(68, 45, 53)"){
                    e.target.style.backgroundColor = '#B8DA9D';
                    e.target.style.color = '#000';
                    this.getselectArr.forEach((ele,index)=>{
                        if(ele == str ){
                            this.delectselecarr(ele);
                        }
                    })
                    return ;
                }
                let num = e.target.dataset.num;//获取动态绑定元素
                e.target.style.backgroundColor = '#442D35';
                e.target.style.color = '#ffffff';
                this.setselectArr(str);
            },
            //删除座位选中
            deleteArrItem(val){
                this.delectselecarr(val);
            },
            //确认座位
            affirm(){
                if(this.getselectArr.length == 0){
                    Toast('请选择您的座位');
                    return false;
                }
                let data = {
                    username: this.username || 'now',
                    ticketname: this.ticketname || '',
                    ticketSeat: this.getselectArr.toString() || '',
                    money: this.allmoenyT || 0,
                    time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') || '',
                    isBuy: this.isBuy || '1',
                    isticket: this.isticket || '1',
                    picUrl: this.getPicUrl
                }
                saveBuyticketInfo(data).then(res=>{
                    if(res.data.code != 1){
                        Toast(res.data.data);
                        return;
                    }
                    this.insertId = res.data.insertId;
                    Toast(res.data.data);
                    this.$router.push({
                        path: '/movieOrder',
                        query:{
                            insertId: this.insertId || ''
                        }
                    })
                })
            }
        },
        mounted () {
        },
        destroyed () {
            this.restrtselecarr();
        }
    }
</script>

<style scoped>
    .selectSeat{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .selectSeat h1.title{
        width: 100% ;
        text-align: center;
        padding: 1rem 0;
        background-color: #ff0000;
        color: #ffffff;
        letter-spacing: 0.5rem;
    }
    .sereen{
        width: 100%;
        height: 5rem;
        text-align: center;
        background-color: #ddd;
        line-height: 5rem;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 1.5rem;
    }
    .seat{
        margin-top: 1.5rem;
        width: 100%;
        height: 27rem;
        box-sizing: border-box;
    }
    .seatRow{
        width: 100%;
        height: 3rem;
        box-sizing: border-box;
        display: flex;
    }
    .seatRow a{
        display: block;
        width: 1rem;
        height: 3rem;
    }
    .seatRow li{
        margin: 0 0.5rem;
        background-color: #B8DA9D;
    }
    .selectSeat li,
    .selectSeat a{
        flex: 1;
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        border-radius: 0.5rem;
    }
    .seatList{
        width: 100%;
        height: 100%;
        margin-bottom: 4rem;
    }
    .seatList p{
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        display: flex;
        padding: 0 1rem;
        margin-top: 2rem;
    }
    .seatList p span{
        flex: 1;
        text-align: left;
    }
    .seatList p span:nth-child(1){
        font-size: 1.8rem;
        color: #000;
        font-weight: bold;
    }
    .seatList p span:nth-child(2){
        color: #999;
        font-size: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .seatList ul{
        display: flex;
        width: 100%;
        margin-top: 0.4rem;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .seatList ul li{
        flex: 1;
        max-width: 40%;
        min-width: 40%;
        height: 2.8rem;
        border: 1px solid #000;
        margin: 1rem auto;
    }
    .calbtn{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 4rem;
        overflow: hidden;
    }
    .calbtn .van-button{
        height: 4rem;
        width: 100%;
        background-color: #f00;
        color: #ffffff;
    }
</style>
