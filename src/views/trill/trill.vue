<template>
    <div class="container_box" id="video_box">
        <div class="van_swipe">
            <!--vant van-swipe 滑动组件 -->
            <van-swipe :show-indicators="false" @change="onChange" vertical :loop="false">
                <van-swipe-item v-for="(item, index) in videoList" :key="index" class="product_swiper">
                    <div class="video_container">
                        <!--video属性
                        webkit-playsinline ios 小窗播放，使视频不脱离文本流，安卓则无效
                        微信内置x5内核，
                        x5-video-player-type="h5" 启用H5播放器,是wechat安卓版特性，添加此属性，微信浏览器会自动将视频置为全屏
                        x5-video-player-fullscreen="true" 全屏设置，设置为 true 是防止横屏
                        x5-video-orientation 控制横竖屏 landscape 横屏，portrain竖屏； 默认portrain
                        x5-playsinline="" 使安卓实现h5同层播放，实现与ios同样效果，但兼容部分机型
                        poster：封面
                        src：播放地址
                        -->
                        <video class="video_box" width="100%" height="100%" webkit-playsinline="true" x5-playsinline=""
                               x5-video-player-type="h5" x5-video-player-fullscreen="true" playsinline preload="auto"
                               :poster="item.cover" :src="item.url" :playOrPause="playOrPause" x-webkit-airplay="allow"
                               x5-video-orientation="portrait" @click="pauseVideo" @ended="onPlayerEnded($event)"
                               loop="loop">
                        </video>
                        <!-- 封面 -->
                        <img v-show="isVideoShow" class="play" @click="playvideo" :src="item.cover"/>
                        <!-- 播放暂停按钮 -->
<!--                        <img v-show="iconPlayShow" class="icon_play" @click="playvideo" src="@/image/icon_play.png"/>-->
                    </div>
                    <!-- 右侧点赞、分享功能 -->
                    <div class="tools_right">
                        <div class="tools_r_li" @click="changeFollow(item,index)">
                            <i class="iconfont icon-shoucang icon_right" :class="item.follow?'follow_active':''"></i>
                            <div class="tools_r_num">28.1w</div>
                        </div>
                        <div class="tools_r_li" @click="changeShare">
                            <i class="iconfont icon-iconfontforward icon_right"></i>
                            <div class="tools_r_num">5.5w</div>
                        </div>
                    </div>
                    <!-- 底部作品描述 -->
                    <div class="production_box">
                        <div class="production_name">
                            @抖音
                        </div>
                        <div class="production_des">
                            年轻的时候要注意‘养生’，
                            少玩手机多睡觉！少玩手机多睡觉！
                            少玩手机多睡觉！切记少玩手机多睡觉！
                            少玩手机多睡觉！少玩手机多睡觉！@ 抖音小助手
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
            <!--底部操作栏-->
            <div class="container_bottom">
                <div class="bottom_tab" :class="tabIndex==0?'tab_active':''" @click="changeTab(0)">
                    <span class="bottom_tab_span ">首页</span>
                </div>
                <div class="bottom_tab" :class="tabIndex==1?'tab_active':''" @click="changeTab(1)">
                    <span class="bottom_tab_span">我的</span>
                </div>
            </div>
            <!--分享弹框-->
            <!-- <div class="share_hover" v-show="showShareBox"></div> -->
            <div class="share_box" :class="showShareBox?'share_active':''">
                <div class="share_tips">分享到</div>
                <ul class="share_ul">
                    <li class="share_li pengyouquan_li">
                        <i class="iconfont icon-pengyouquan pengyouquan"></i>
                    </li>
                    <li class="share_li">
                        <i class="iconfont icon-weixin weixin"></i>
                    </li>
                    <li class="share_li" @click="copyUrl">
                        <i class="iconfont icon-lianjie lianjie"></i>
                    </li>
                    <div class="clear"></div>
                </ul>
                <div class="share_cancel" @click="cancelShare">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Swipe ,SwipeItem} from  'vant'
    export default {
        name: 'trill',
        data(){
            let u = navigator.userAgent;
            return{
                current: 0,
                videoList: [{
                    url: 'http://video.jishiyoo.com/eb978106f01f4eed95db9f537d7d9be8/6dbdc80e5c754784abe2e5be96c5feed-514a8b14506d55be68a9d9e3c2810057-ld.mp4',
                    cover: 'http://bendipin.oss-cn-beijing.aliyuncs.com/images/product-1552213211141.png',
                    follow:false,
                }, {
                    url: 'http://video.jishiyoo.com/4bd2b77bad9b45639564becc2bed8e29/30d4e2b677074d079e8c03698edee232-32ca5c6feec9c6445decdd413320bcea-ld.mp4',
                    cover: 'http://bendipin.oss-cn-beijing.aliyuncs.com/images/product-1552140113110.png',
                    follow:true,
                }, {
                    url: 'http://video.jishiyoo.com/f843c93d4f3f4bee844690fe1fdfc750/28e2548c47ce4d0cb310697f0ca4c7a3-14818dd00765a9a86871da6734b1be28-ld.mp4',
                    cover: 'http://bendipin.oss-cn-beijing.aliyuncs.com/images/product-1552117102331.png',
                    follow:false,
                }, {
                    url: 'http://video.jishiyoo.com/c082827a58584a2c864fa403f1aafabf/d5333562c5c74bcdb5bd3fe92073cd9c-6375039a2dd07d44dfaf66c1a32287ff-ld.mp4',
                    cover: 'http://bendipin.oss-cn-beijing.aliyuncs.com/images/file-1552022662595.png',
                    follow:false,
                }],
                isVideoShow: true,
                playOrPause: true,
                video: null,
                iconPlayShow: true,
                isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
                isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                tabIndex:0,
                showShareBox:false
            }
        },
        methods: {
            //改变菜单
            changeTab(index){
                this.tabIndex =index
            },
            //改变收藏状态
            changeFollow(item,index){
                this.videoList[index].follow = !this.videoList[index].follow
            },
            //展示分享弹窗
            changeShare(){
                this.showShareBox=true
            },
            //取消分享
            cancelShare(){
                this.showShareBox=false
            },
            //滑动改变播放的视频
            onChange(index) {
                //改变的时候 暂停当前播放的视频
                let video = document.querySelectorAll('video')[this.current];
                video.pause();
                this.playOrPause = false;
                this.current = index;
                if (this.isiOS) {
                    //ios切换直接自动播放下一个
                    this.isVideoShow = false;
                    this.pauseVideo()
                }else{
                    //安卓播放时重置显示封面。图标等
                    this.isVideoShow = true;
                    this.iconPlayShow = true
                }
            },
            playvideo(event) {
                let video = document.querySelectorAll('video')[this.current];
                console.log("playvideo：" + this.current);
                this.isVideoShow = false;
                this.iconPlayShow = false
                video.play();
                window.onresize = function () {
                    video.style.width = window.innerWidth + "px";
                    video.style.height = window.innerHeight + "px";
                }

            },
            pauseVideo() { //暂停\播放
                let video = document.querySelectorAll('video')[this.current]
                if (this.playOrPause) {
                    video.pause()
                    this.iconPlayShow = true
                } else {
                    video.play()
                    this.iconPlayShow = false
                }
                this.playOrPause = !this.playOrPause
            },
            onPlayerEnded(player) { //视频结束
                this.isVideoShow = true
                this.current += this.current
            },
            //复制当前链接
            copyUrl(){
                let httpUrl = window.location.href;
                var oInput = document.createElement('input');
                oInput.value = httpUrl;
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                oInput.className = 'oInput';
                oInput.style.display='none';
                alert("链接复制成功")
            }
        },
        mounted () {
            this.playvideo();
        }
    }
</script>

<style scoped>
    @import "../../css/trill.css";
    @import "../../css/iconfont.css";
</style>
