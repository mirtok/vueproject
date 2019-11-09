import request from '@/util/request';

/**
 * 获取电影票数据
 * @param params
 * @author Mr.Li
 */
export const getMovie = params => {
    return request({
        url: 'getMovie',
        method: 'get',
        params: {
            cityId: params.cityId || 4201,
            playType: params.playType || 2,
            orderType: params.orderType || 1,
            pageNum: params.pageNum || 1,
            pageSize: params.pageSize || 20
        }
    })
}

/**
 * 获取单个电影票详细数据
 * @param params
 * @author Mr.Li
 */
export const getMovieDetail = params => {
    return request({
        url: 'getMovieDetail',
        method: 'get',
        params: {
            cityId: params.cityId || 4201,
            movieId: params.movieId || '',
        }
    })
}

/**
 * 搜索电影
 * @param params
 * @author Mr.Li
 */
export const getSerachMvdata = params => {
    return request({
        url: 'getSerachMvdata',
        method: 'get',
        params: {
            keyWords: params.keyWords || '',
            cityId: params.cityId || 20,
            stype: params.stype || -1,
        }
    })
}

/**
 * 保存用户购买票信息
 * @param params
 * @author Mr.Li
 */
export const saveBuyticketInfo = params => {
    return request({
        url: 'saveBuyticketInfo',
        method: 'post',
        data: {
            username: params.username || '',
            ticketname: params.ticketname || '',
            ticketSeat: params.ticketSeat || '',
            money: params.money || 0,
            time: params.time || '',
            isBuy: params.isBuy || '0',
            isticket: params.isticket || '0',
            picUrl: params.picUrl || ''
        }
    })
}
/**
 * 查询用户的订单信息根据
 * @param params
 */
export  const  selectIdTictkit = params =>{
    return request({
        url: '/selectIdticket',
        method: 'get',
        params: {
            insertId: params.insertId || ''
        }
    })
}




