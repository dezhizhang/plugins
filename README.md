# plugins

```js
class DonePlugin{
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
      compiler.hooks.done.tap('DonePlugin',(stats) => {
        console.log('done1',this.options.name);

      });

      compiler.hooks.done.tapAsync('DonePlugin',(stats,callback) => {
        console.log('done2',this.options.name);
        callback();

      })
    }
}

module.exports = DonePlugin;

```
### compilation 插件
```js

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

```


