
class AssetsPlugin{
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('AssetsPlugin',(compilation) => {
            compilation.hooks.chunkAsset.tap('AssetsPlugin',(chunk,filename) => {
                console.log('-----',chunk.name || chunk.id,filename);

            })
        });

    }
}

module.exports = AssetsPlugin;
