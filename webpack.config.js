
const path = require('path');
const DonePlugin = require('./plugins/done-plugin');

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
        })
    ]
}