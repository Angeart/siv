export default {
  install: function(path: string, extension: string = "ts"): void {
    let exp = new RegExp(".*." + extension);
    let modules = require.context(path, true, exp);
    modules.keys().forEach(v => {
      modules(v);
    });
  }
};
