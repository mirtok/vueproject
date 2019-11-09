import request from '@/util/request';

/**
 * 音乐歌单
 * @param params
 * @author Mr.Li
 */
export const  getSigerSpec  = params=> {
    return request({
        url: '/getSigerSpec',
        method: 'get',
        params: {
            id: params.id,
            pageNum: params.pageNum,
            rotNum: params.rotNum
        }
    })
}

/**
 * 获取音乐歌单
 * @param params
 * @author Mr.Li
 */
export const getSongList = params => {
    return request({
        url: 'getsongList',
        method: 'get',
        params: {
            category: params.category,
            pageNum: params.pageNum,
            rotNum: params.rotNum,
            reqId: params.reqId
        }
    })
};
/**
 * 歌单详细
 * @param params
 * @author Mr.Li
 */
export  const  getSongListDetails = params =>{
    return request({
        url: 'getSongListDetails',
        method: 'get',
        params: {
            pid: params.id || 0,
            pageNum: params.pageNum || 1,
            rotNum: params.rotNum || 30,
        }
    })
}
/**
 * 获取歌手详情
 * @param params
 * @author Mr.Li
 */
export  const  getSongInfo = params =>{
    return request({
        url: 'getsongInfo',
        method: 'get',
        params: {
            id: params.id || 0
        }
    })
}

/**
 * 获取歌曲信息
 * @param params
 * @author Mr.Li
 */
export const getMusicInfo = params =>{
    return request({
        url: 'getMusicInfo',
        method: 'get',
        params: {
            mid: params.mid
        }
    })
}

/**
 * 获取排行榜对应列的歌
 * @param params
 * @author Mr.Li
 */
export const  getLeaderList = params =>{
    return request({
        url: 'getLeaderList',
        method: 'get',
        params: {
            bangId: params.sourceid ,
            pageNum: params.pageNum,
            rotNum: params.rotNum
        }
    })
}

/**
 * 获取歌手的歌曲
 * @param params
 * @author Mr.Li
 */
export  const  getSongMusic = params =>{
    return request({
        url: 'getsongMusic',
        method: 'get',
        params: {
            id: params.id || 0,
            pageNum: params.pageNum || 1,
            rotNum: params.rotNum || 30
        }
    })
}

/**
 * 获取歌曲mp3文件
 * @param params
 * @author Mr.Li
 */
export  const  palyMusic = params =>{
    return request({
        url: 'palyMusic',
        method: 'get',
        params: {
            rid: params.rid || 0,
        }
    })
}
/**
 * 获取歌词信息
 * @param params
 * @author Mr.Li
 */
export  const  songinfoandlrc = params =>{
    return request({
        url: 'songinfoandlrc',
        method: 'get',
        params: {
            musicId: params.musicId || 0,
        }
    })
}

/**
 * 音乐搜索
 * @param params
 * @author Mr.Li
 */
export  const  serachKey = params =>{
    return request({
        url: '/serachKey',
        method: 'get',
        params:{
            key: params.keyWords || '',
            pageNum: params.pageNum || 1,
            rotNum: params.rotNum ||30
        }
    })
}

/**
 * 模糊/搜索/歌曲/mp3/文件
 * @param params
 * @author Mr.Li
 */
export const getfuzzySerach = params =>{
    return request({
        url: '/fuzzySerach',
        method: 'get',
        params: {
            name : params.name || ''
        }
    })
}

/**
 * 格式化歌词
 * @param params
 * @author Mr.Li
 */
export const  formatMusicPir = params =>{
    let str = "";
    params.forEach((ele,index)=>{
        let s = Number(ele.time) < 10 ? '0'+ parseFloat(ele.time).toFixed(2) : parseFloat(ele.time).toFixed(2);
        let m = "";
        if(Number(ele.time) >= 60){
            m = Number(ele.time)/60;
            m = Number(m) >10 ? parseInt(m) : "0"+ parseInt(m);
            s = s - (m*60);
            s = Number(s) < 10 ? '0'+ parseFloat(s).toFixed(2) : parseFloat(s).toFixed(2);
        }else{
            m = "00"
        }
        str +=  `[${m}:${s}]${ele.lineLyric}\n`
    })
    return str;
}

