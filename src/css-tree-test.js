const csstree = require('css-tree');
const cssfile = `
.mediaViewInfo {
  --web-view-name: base.css;
  --web-view-id: basecss;
  --web-scale-on-resize: true;
  --web-enable-deep-linking: true;
}
:root {
  --web-view-ids: basecss;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: none;
}
#primary-50 {
  fill: rgba(228, 243, 253, 1);
}
#primary-100 {
  fill: rgba(190, 224, 250, 1);
}
#primary-200 {
  fill: rgba(150, 205, 248, 1);
}
#primary-300 {
  fill: rgba(110, 185, 244, 1);
}
#primary-400 {
  fill: rgba(81, 170, 242, 1);
}
#primary-500 {
  fill: rgba(58, 156, 240, 1);
}
#primary-600 {
  fill: rgba(52, 142, 226, 1);
}
#primary-700 {
  fill: rgba(45, 124, 207, 1);
}
#primary-800 {
  fill: rgba(39, 107, 189, 1);
}
#primary-900 {
  fill: rgba(29, 77, 158, 1);
}
#primary {
  fill: rgba(52, 143, 226, 1);
}
#secondary-50 {
  fill: rgba(235, 250, 235, 1);
}
#secondary-100 {
  fill: rgba(210, 244, 211, 1);
}
#secondary-200 {
  fill: rgba(185, 238, 188, 1);
}
#secondary-300 {
  fill: rgba(147, 230, 156, 1);
}
#secondary-400 {
  fill: rgba(104, 222, 122, 1);
}
#secondary-500 {
  fill: rgba(25, 195, 125, 1);
}
#secondary-600 {
  fill: rgba(16, 163, 127, 1);
}
#secondary-700 {
  fill: rgba(26, 127, 100, 1);
}
#secondary-800 {
  fill: rgba(27, 93, 74, 1);
}
#secondary-900 {
  fill: rgba(24, 61, 49, 1);
}
#secondary {
  fill: rgba(16, 163, 127, 1);
}
#gray-50 {
  fill: rgba(247, 247, 248, 1);
}
#gray-100 {
  fill: rgba(236, 236, 241, 1);
}
#gray-200 {
  fill: rgba(217, 217, 227, 1);
}
#gray-300 {
  fill: rgba(197, 197, 210, 1);
}
#gray-400 {
  fill: rgba(172, 172, 190, 1);
}
#gray-500 {
  fill: rgba(142, 142, 160, 1);
}
#gray-600 {
  fill: rgba(110, 110, 128, 1);
}
#gray-700 {
  fill: rgba(86, 88, 105, 1);
}
#gray-800 {
  fill: rgba(53, 55, 64, 1);
}
#gray-900 {
  fill: rgba(32, 33, 35, 1);
}
#text-primary {
  fill: rgba(32, 33, 35, 1);
}
#text-default {
  fill: rgba(53, 55, 64, 1);
}
#text-secondary {
  fill: rgba(110, 110, 128, 1);
}
#text-disabled {
  fill: rgba(172, 172, 190, 1);
}
#text-error {
  fill: rgba(239, 65, 70, 1);
}
#danger {
  fill: rgba(239, 65, 70, 1);
}
#warning {
  fill: rgba(252, 187, 82, 1);
}
#success {
  fill: rgba(76, 175, 80, 1);
}
#info {
  fill: rgba(0, 145, 234, 1);
}
#gray-50_ca {
  fill: rgba(255, 255, 255, 1);
}
`;

// parse CSS to AST
const ast = csstree.parse(cssfile);
console.log('ast', ast);
let flag = false;
// traverse AST and modify it
csstree.walk(ast, (node, item, list) => {
  if (node.type === 'ClassSelector' && node.name === 'mediaViewInfo' && list) {
    flag = true;
  } else if (node.type === 'PseudoClassSelector' && node.name === 'root' && list) {
    flag = true;
  } else if (node.type === 'TypeSelector' && node.name === '*' && list) {
    flag = true;
  }

  if (node.type === 'Declaration' && flag) {
    list.remove(item);
  }

  if (node.type === 'Selector') {
    flag = false;
  }

  if (node.type === 'Rule' && flag) {
    list.remove(item);
  }
});

const newCssCode = csstree.generate(ast);

console.log(newCssCode);
// .hello{world:"!"}
