const { ipcRenderer } = require("electron");
ipcRenderer.on("inject", (ev, args) => {
  console.log("on inject");
  console.dir(args);
  eval(args);
});
