module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
            }
        },
    },

    chainWebpack: config => {
        config
            .plugin('html').tap(args => {
                args[0].minify = false
                return args
            });
    }
}
