let fs = require("fs");
let uglifycss = require("uglifycss");
let uglifyES6 = require("uglify-js-es6");

let code = fs.readFileSync("../src/lwtah.js", "utf-8", "r+");
let mincode = uglifyES6.minify(["../src/lwtah.js"], {}).code;
let mincss = uglifycss.processFiles(["../src/lwtah.css"], {});
mincode += "lwtahStyle=\"" + mincss + "\""; 
code += "\n\nlwtahStyle=\"" + mincss + "\""; 
fs.writeFile("../build/lwtah.js", code, ()=>{});
fs.writeFile("../build/lwtah.min.js", mincode, ()=>{});