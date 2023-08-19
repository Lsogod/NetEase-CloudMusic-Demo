module.exports = {
    plugins: {
        'postcss-pxtorem': {
            //能够把所有元素的px单位转成rem
            //rootValue：转换px的基准值
            //例如一个元素宽为75px，则换成rem之后就是2rem
            rootValue: 37.5,
            propList: ['*']
        }
    }
}
// postcss技术，：webpack插件（转化/降级css代码）
//postcss-pxtorem插件：把px转成rem