
const path = require('path');
const DonePlugin = require('./plugins/done-plugin');
const AssetsPlugin = require('./plugins/assets-plugin');

module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'build.js'
    },
    plugins:[
        new DonePlugin({
            name:'DonePlugin'
        }),
        new AssetsPlugin()
    ]
}