import QRCode from 'qrcodejs2';

export const makeQrCode = params =>{
    return new QRCode(params.dom, {
        width: params.width, //二维码的宽度
        height: params.height,//二维码的高度
        text: params.text, // 二维码地址
        colorDark : "#000",//二维码颜色
        colorLight : "#fff",//二维码背景颜色
        correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
    })
}
