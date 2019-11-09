import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        msgKey: null, //存储搜索的歌手名称关键字
        protArr: [],
        serachKey: null,
        setArr: new Set(),
        selectArr: [], // 存储用户选择的座位位置
        PicUrl: '' //保存的用户购票的图片图片
    },
    getters:{
        getMsgKey(state){
            return state.msgKey;
        },
        getSerachKey(state){
            return state.serachKey;
        },
        getselectArr(state){
            return Array.from(state.selectArr);
        },
        getPicUrl(state){
            return state.PicUrl;
        }
    },
    mutations: {
        setMsgKey(state,val){
            state.msgKey = val || '';
        },
        setSerachKey(state,val){
            state.protArr.push(val || '');
            state.serachKey = new Set(state.protArr);
        },
        setselectArr(state,val){
            state.setArr.add(val || '')
            state.selectArr = Array.from(state.setArr);
        },
        //清空选的座位
        restrtselecarr(state){
            state.selectArr = [];
            state.setArr.clear();
        },
        //删除对一的座位
        delectselecarr(state,str){
            state.setArr.delete(str);
            state.selectArr = Array.from(state.setArr);
        },
        setPicUrl(state,val){
            state.PicUrl  = val || '';
        }
    },
    actions: {
    },
})
