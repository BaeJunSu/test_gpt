const csstree = require('css-tree');

// CSS 코드 문자열
const cssCode = `
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
`;

// CSS 코드를 파싱하여 AST(Abstract Syntax Tree)로 변환
const ast = csstree.parse(cssCode);

// `Rule` 노드를 순회하면서 마지막 선택자(`*`)를 제거
csstree.walk(ast, function (node) {
  if (node.type === 'Rule' && node.prelude && node.prelude.last) {
    const lastSelector = node.prelude.last;
    if (lastSelector.type === 'UniversalSelector') {
      // 마지막 선택자가 `*`인 경우 제거
      node.prelude.remove(node.prelude.last);
    }
  }
});

// AST를 다시 CSS 코드 문자열로 변환
const newCssCode = csstree.generate(ast);

console.log(newCssCode);
