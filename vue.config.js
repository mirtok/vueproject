module.exports = {
    devServer: {
        proxy: {
            '/api': {    // search为转发路径
                target: 'http://www.kugou.com/yy/index.php?r=play/getdata',  // 目标地址
                changeOrigin: true,     // 跨域
                secure: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
    lintOnSave:false
};
