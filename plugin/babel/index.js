const { transformSync } = require("@babel/core");
const path = require('path');
const fs = require('fs');
const entryPath = path.resolve(__dirname, './entry.js');
const pluginPath = path.resolve(__dirname, './my-plugin.js');
const originCode = fs.readFileSync(entryPath, 'utf8')
const newCode = transformSync(originCode, {
    plugins: ["@babel/plugin-transform-arrow-functions", pluginPath]
});
console.log(newCode.code, 'ooooo')