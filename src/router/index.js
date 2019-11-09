import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    //顶部tab路由
    {
        path: '/',
        name: 'movie',
        meta:{
            title:'首页'
        },
        component: ()=> import('@/views/index/movie')
    },
    {
        path: '/video',
        name: 'video',
        meta:{
            title:'电影院'
        },
        component: ()=> import('@/views/index/video')
    },
    {
        path: '/music',
        name: 'music',
        meta:{
            title:'音乐'
        },
        component: ()=> import('@/views/index/music')
    },
    {
        path: '/user',
        name: 'user',
        meta:{
            title:'个人中心'
        },
        component: ()=> import('@/views/index/user')
    },
    //结束底部tab路由

    //开始电影路由
    {
        path: '/movieDetail',
        name: 'movieDetail',
        meta:{
            title:'影票详情'
        },
        component: ()=> import('@/views/movies/movieDetail')
    },
    {
        path: '/serachMovList',
        name: 'serachMovList',
        meta:{
            title:'搜索列表'
        },
        component: ()=> import('@/views/movies/serachMovList')
    },
    {
        path: '/selectSeat',
        name: 'selectSeat',
        meta:{
            title:'选座购票'
        },
        component: ()=> import('@/views/movies/selectSeat')
    },
    {
        path: '/movieOrder',
        name: 'movieOrder',
        meta:{
            title:'订单详情'
        },
        component: ()=> import('@/views/movies/movieOrder')
    },
    //结束电影路由

    //开始音乐路由
    {
        path: '/singerinfo',
        name: 'singerinfo',
        meta:{
            title:'歌手详情'
        },
        component: ()=> import('@/views/music/songInfo')
    },
    //播放页面
    {
        path:'/MusicInterface',
        name: 'musicInterface',
        meta:{
            title:'播放器'
        },
        component: ()=> import('@/views/music/musicInterface')
    },
    //歌单详情页面
    {
        path: '/songList',
        name: 'songlist',
        meta:{
            title:'歌单详情'
        },
        component: ()=>import('@/views/music/songList')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
