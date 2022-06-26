const { ExternalModule } = require("webpack");

class AutoExternalPlugin {
  constructor(options) {
    this.options = options;
    this.externalModules = Object.keys(this.options);
    this.importedModules = new Set();
  }
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(
      "AutoExternalPlugin",
      (normalModuleFactory) => {
        normalModuleFactory.hooks.parser
          .for("javascript/auto")
          .tap("AutoExternalPlugin", (parser) => {
            parser.hooks.import.tap(
              "AutoExternalPlugin",
              (statement, source) => {
                if (this.externalModules.includes(source)) {
                  this.importedModules.add(source);
                }
              }
            );
            parser.hooks.call
              .for("require")
              .tap("AutoExternalPlugin", (expression) => {
                let value = expression.arguments[0].value;
                if (this.externalModules.includes(value)) {
                  this.importedModules.add(value);
                }
              });
          });
          normalModuleFactory.hooks.factorize.tapAsync('AutoExternalPlugin',(resolveData,callback) => {
            const { request } =  resolveData;
            if(this.externalModules.includes(request)) {
                let { variable } = this.options[request];
                callback(null,new ExternalModule(variable,'window',request))
            }
          })
      }
    );
  }
}

module.exports = AutoExternalPlugin;
