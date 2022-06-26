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
      }
    );
  }
}

module.exports = AutoExternalPlugin;
