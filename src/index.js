const { Configuration, OpenAIApi } = require('openai');
const { Rectangle, Color } = require('scenegraph');
const fs = require('uxp').storage.localFileSystem;

let panel;
let fileName = 'XD_PlUGIN_WEBSQUARE.xml';
let defaultPrompt = `
당신은 프론트엔드 프로그래머입니다.
웹스퀘어 xml은 xforms 표준을 확장하여 만들어진 xml입니다.
규칙은 다음과 같습니다.
당신은 html 페이지를 웹스퀘어 xml로 전환하는 작업 수행하여야 합니다.

* <ul>는 <xf:group>으로 변환하고, tagname 속성에  ul을 추가
* <li>는 <xf:group>으로 변환하고, tagname 속성에  li을 추가
* <div>는 <xf:group>로 변환
* <span>은 <w2:span>로 변환
* <svg>은  <xf:image>로 변환
* <svg> 속성 중  viewBox속성은 삭제 
* viewBox의 4자리 숫자중에 뒤에 2 숫자를 써서, inline style 즁  width,height 값으로 정의하며 단위는 px로 지정.
* <svg>  하위의  <path> 가 있을 경우에는 삭제 
*  id와 class 속성에 'n_"로 시작하는 경우, 모두 빈 값으로 설정
*  srcset 속성명은 src로 변경 

소스는 다음과 같습니다.
`;
let applyPrompt = '';

const systemPrompt = '';

// 네모 생성 테스트
function rectangleHandlerFunction(selection) {
  //testOpenAi();
  //insertTextFromFileHandler(null);
  console.log('create rectangle !!!');
  const newElement = new Rectangle();
  newElement.width = 100;
  newElement.height = 50;
  newElement.fill = new Color('Purple');

  selection.insertionParent.addChild(newElement);
  newElement.moveInParentCoordinates(100, 100);
}

// openAi test
async function testOpenAi(prompt) {
  const configuration = new Configuration({
    //apiKey: process.env.OPENAI_API_KEY,
    apiKey: '내 api키', // 해당 방법으로 사용하는 이유는 환경변수에 설정된 OPENAI_API_KEY를 adobe xd플러그인이 못들고오는 듯 함
  });
  const openai = new OpenAIApi(configuration);

  //const response = await openai
  //  .createCompletion({
  //    // model: 'gpt-3.5-turbo',
  //    model: 'text-davinci-003',
  //    prompt: prompt || applyPrompt,
  //    max_tokens: 3000,
  //    temperature: 0.6,
  //  })
  //  .catch(function (e) {
  //    console.log('error', e);
  //    return 'error : ' + e;
  //  });

  const message = [
    { role: 'user', content: prompt || applyPrompt },
    { role: 'system', content: systemPrompt },
  ];

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: message,
  });

  console.log('- completion:\n' + response.data.choices[0].message.content);
  console.log('\n- total tokens: ' + response.data.usage.total_tokens);
  console.log('*- completion ended...');

  return response.data.choices[0].message.content;
}

// 파일 읽기 테스트
async function insertTextFromFileHandler(selection) {
  const aFile = await fs.getFileForOpening({ types: ['html'] });
  if (!aFile) return;

  const htmlString = await aFile.read();
  console.log('read file', htmlString);

  const bodyRegex = /<body[^>]*>([\s\S]*)<\/body>/i;
  const bodyMatch = htmlString.match(bodyRegex);
  const bodyHtmlString = bodyMatch ? bodyMatch[0] : 'no body!!!';
  //const bodyHtmlString = bodyMatch ? bodyMatch[1] : 'no body!!!';
  return bodyHtmlString;
}

async function exportRendition(xmlText) {
  // Get a folder by showing the user the system folder picker
  const folder = await fs.getFolder();
  // Exit if user doesn't select a folder
  if (!folder) return console.log('User canceled folder picker.');

  const anotherFile = await fs.getFileForSaving(fileName);

  // Create a file that will store the rendition
  // const file = await folder.createFile(fileName, { overwrite: true });
  anotherFile.write(xmlText);

  // Create options for rendering a PNG.
  // Other file formats have different required options.
  // See `application#createRenditions` docs for details.
  // const renditionOptions = [
  //   {
  //     node: selection.items[0],
  //     outputFile: file,
  //     type: 'xml',
  //     scale: 2,
  //   },
  // ];

  // try {
  //   // Create the rendition(s)
  //   const results = await application.createRenditions(renditionOptions);

  //   // Create and show a modal dialog displaying info about the results
  //   const dialog = createDialog(results[0].outputFile.nativePath);
  //   return dialog.showModal();
  // } catch (err) {
  //   // Exit if there's an error rendering.
  //   return console.log('Something went wrong. Let the user know.');
  // }
}

function create() {
  const HTML = `
<style>
  textarea {
    resize: none; /* resize 기능 비활성화 */
    width: 100%; /* 가로 크기 */
    height: 200px; /* 세로 크기 */
    padding: 0px;
    margin: 0px;
  }
  .prompt {
    padding-top: 10px;
  }
  .export {
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
<form method="dialog" id="main">
  <button id="btnOpenFileDialog" uxp-variant="cta">파일 열기</button>
  <div class="prompt">
    <label>프롬프트</label>
    <textarea id="taPrompt"></textarea>
  </div>
  <button id="btnConvert" uxp-variant="cta">ConvertToWebSquare</button>
  <div class="export">
    <label>결과</label>
    <textarea id="taExport"></textarea>
  </div>
  <button id="btnCopyXMLText" uxp-variant="cta">파일 저장</button>
</form>
`;

  panel = document.createElement('div');
  panel.innerHTML = HTML;

  panel.querySelector('#btnOpenFileDialog').addEventListener('click', async (e) => {
    const contents = await insertTextFromFileHandler(e);
    applyPrompt = defaultPrompt + '```\n' + contents + '\n```';
    panel.querySelector('#taPrompt').value = applyPrompt;
  });

  panel.querySelector('#btnCopyXMLText').addEventListener('click', async () => {
    const textarea = panel.querySelector('#taExport');
    await exportRendition(textarea.value);
  });

  panel.querySelector('#btnConvert').addEventListener('click', async (e) => {
    //panel.querySelector('#btnConvert').disabled();
    const taPrompt = panel.querySelector('#taPrompt');
    const contents = await testOpenAi(taPrompt.value);
    panel.querySelector('#taExport').value = contents;
    //panel.querySelector('#btnConvert').enabled();
  });

  return panel;
}

function show(event) {
  if (!panel) event.node.appendChild(create());
}

function hide(event) {
  // in this example, we don't need to do anything when XD hides our panel
  console.log('hide node!!!!', event);
}

function update() {
  // 노드 바뀔때마다
  console.log('update node!!!!');
}

module.exports = {
  //commands: {
  //  createRectangle: rectangleHandlerFunction,
  //},
  panels: {
    WebSquareToXD: {
      show,
      hide,
      update,
    },
  },
};
