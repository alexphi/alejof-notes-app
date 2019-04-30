const path = require('path')

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                Helpers: path.resolve(__dirname, './src/helpers/'),
                Common: path.resolve(__dirname, './src/components/common/'),
            }
        },
    }
}
