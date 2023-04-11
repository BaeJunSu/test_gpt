/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */

const { Rectangle, Color } = require('scenegraph');
const fs = require('uxp').storage.localFileSystem;

// 네모 생성
function rectangleHandlerFunction(selection) {
  insertTextFromFileHandler(null);
  console.log('start plugin!!!!');
  const newElement = new Rectangle();
  newElement.width = 100;
  newElement.height = 50;
  newElement.fill = new Color('Purple');

  selection.insertionParent.addChild(newElement);
  newElement.moveInParentCoordinates(100, 100);
}

// 파일 읽기
async function insertTextFromFileHandler(selection) {
  const aFile = await fs.getFileForOpening({ types: ['txt'] }); // [2]
  if (!aFile) return;

  const contents = await aFile.read();
  console.log('read file', contents);
}

module.exports = {
  commands: {
    createRectangle: rectangleHandlerFunction,
  },
};
