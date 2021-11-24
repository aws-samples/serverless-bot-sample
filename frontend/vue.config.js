const path = require('path')

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, '/src')
            }
        }
    },
    outputDir: 'dist',
    publicPath: '',
    pages: {
        index: {
            entry: 'src/main.ts',
            template: 'public/index.html',
        }
    }
}
