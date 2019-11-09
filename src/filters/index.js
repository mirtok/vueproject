import moment from 'moment';

/**
 * [时间过滤器]
 * @param value
 * @param forMat
 * @returns {string}
 */
export const timeForMat = (value, forMat = 'YYYY-MM-DD hh:mm:ss') => {
    return moment(value).format(forMat)
}
/**
 * [价格过滤器]
 * @type {function(*=): string}
 */
export const moneyForMat = ((value) => {
    return '￥' + Number(value).toFixed(2)
})
