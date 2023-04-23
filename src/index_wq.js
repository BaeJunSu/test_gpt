import { Configuration, OpenAIApi } from 'openai';
import * as csstree from 'css-tree';

let defaultPrompt = `
당신은 웹퍼블리셔입니다.
제가 제공하는 소스를 아래 규칙을 적용하여 변환해주세요.

수행규칙은 아래와 같습니다.

* 클래스선택자는 출력하지 않는다.
* rgba를 16진수 색상 코드로 변경
* id 선택자를 클래스로 변경
* id 선택자의 속성을  :root에 ws-를 prefix 붙여 사용자 정의속성으로 추가하고, 해당 속성(fill)명은 삭제하고 value값만 출력한다.
* 아이디선택자와 속성은 삭제한다.
* :root 값만 출력한다.

제공하는 소스는 다음과 같습니다.
`;
let systemPrompt = ``;
const wq_gpt = {};

wq_gpt.aplayOpenAi = async (prompt, myApiKey, customPrompt) => {
  let errorMsg = '';
  const configuration = new Configuration({
    apiKey: myApiKey, // 해당 방법으로 사용하는 이유는 환경변수에 설정된 OPENAI_API_KEY를 adobe xd플러그인이 못들고오는 듯 함
  });
  const openai = new OpenAIApi(configuration);
  const message = [
    { role: 'user', content: prompt },
    { role: 'system', content: systemPrompt },
  ];

  const response = await openai
    .createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: message,
    })
    .catch((error) => {
      errorMsg = error.message;
    });

  if (errorMsg !== '') {
    return errorMsg;
  }

  console.log('- completion:\n' + response.data.choices[0].message.content);
  console.log('\n- total tokens: ' + response.data.usage.total_tokens);
  console.log('*- completion ended...');

  return response.data.choices[0].message.content;
};

wq_gpt.convertCss = (cssfile) => {
  // parse CSS to AST
  let flag = false;
  const ast = csstree.parse(cssfile);
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

  let newCssCode = csstree.generate(ast);

  newCssCode = `${defaultPrompt}\n` + '```\n' + `${newCssCode}` + '\n```';
  console.log(newCssCode);
  return newCssCode;
};

wq_gpt.openai = {
  Configuration: Configuration,
  OpenAIApi: OpenAIApi,
};
wq_gpt.csstree = csstree;

window.wq_gpt = wq_gpt;
