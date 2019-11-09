<template>
    <div class="movieOrder">
        <!--订单信息-->
        <div class="movieInfo">
            <div class="picurl">
                <a><img :src="movieInfo.picUrl" alt="" width="100%" height="100%"></a>
            </div>
            <div class="movInfo">
                <p class="name">{{movieInfo.ticketname}}</p>
                <p class="ticketSeat">{{movieInfo.ticketSeat}}</p>
                <p class="times">{{movieInfo.times | timeForMat}}</p>
            </div>
            <div class="price">
                <p class="times">{{movieInfo.money | moneyForMat}}</p>
            </div>
        </div>
        <!--二维码-->
        <div class="qrcodeNo">
            <div class="qrCode">
                <div id="qrCode"></div>
            </div>
            <p class="qrcodeNob">{{movieInfo.orderNo}}</p>
        </div>
        <!--使用规则-->
        <div class="userRule">
            <h1>使用规则</h1>
            <p>1.本二维码仅可在店铺使用</p>
            <p>2.本二维码仅使用无效</p>
            <p>3.不可叠加</p>
        </div>
        <!--确认按钮-->
        <div class="buyticket">
            <div class="btn">
                <van-button type="default" @click="affirm">确认订单</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {selectIdTictkit} from  '@/api/movies';
    import {Toast} from  'vant';
    import {makeQrCode} from '@/util/qrcode'
    export default {
        name: 'movieOrder',
        data(){
            return{
                insertId: '' ,
                movieInfo: {}
            }
        },
        computed:{

        },
        methods:{
            getUserMovieOrderInfo(){
                let params = {
                    insertId: this.insertId
                }
                selectIdTictkit(params).then(res=>{
                    if(res.data.code != 1){
                          Toast('数据处理超时');
                          return;
                    }
                    this.movieInfo = res.data.data[0];
                    this.makeQrCodeFn();
                })
            },
             makeQrCodeFn(){
                document.getElementById('qrCode').innerHTML = "";
                let qrCode = document.getElementById('qrCode');
                let params = {
                    dom: qrCode,
                    width: '100',
                    height: '100',
                    text:  this.movieInfo.orderNo,
                }
                makeQrCode(params);
             },
            affirm(){
                this.$router.push('/');
            }
        },
        mounted () {
            this.insertId = this.$route.query.insertId;
            this.getUserMovieOrderInfo();
        }
    }
</script>

<style scoped>
    .movieOrder{
        width: 100%;
        height: 100%;
    }
    .movieInfo{
        width: 100%;
        height: 8rem;
        padding: 1rem;
        display: flex;
    }
    .movieInfo .picurl,
    .movieInfo .price{
        flex: 1;
        width: 100%;
        height: 100%;
    }
    .movieInfo .picurl a{
        display: block;
        width: 5rem;
        height: 6rem;
        overflow: hidden;
    }
    .movieInfo .movInfo{
        flex: 3;
        padding: 1rem;
        display: flex;
        flex-direction: column;
    }
    .movieInfo  .movInfo p{
        font-size: 1.2rem;
        color: #aaa;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
     .movieInfo .movInfo p.name{
         color: #000;
         font-size: 1.4rem;
     }
    .movieInfo .price{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .movieInfo .price p{
        font-size: 1.4rem;
        color: #000000;
        font-weight: bold;
    }
    .qrcodeNo{
        width: 100%;
        height: 15rem;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .qrcodeNo .qrCode{
        width: 10rem;
        height: 10rem;
    }
    .qrcodeNo .qrcodeNob{
        width: 100%;
        text-align: center;
        margin-top: 1rem;
        font-weight: bold;
        font-size: 1.4rem;
    }
    .userRule{
        width: 100%;
        margin-top: 1rem;
        padding: 1rem;
    }
    .userRule h1{
        font-size: 1.5rem;
    }
    .userRule p{
        color: #aaaaaa;
        line-height: 2rem;
        height: 2rem;
    }
    #qrCode{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
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
