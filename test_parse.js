const Parser = require('tree-sitter');
const Bread = require('./');

const parser = new Parser();
parser.setLanguage(Bread);

const sourceCode = `fn test() {
    let x = 42
    return x
}`;

const tree = parser.parse(sourceCode);
console.log(tree.rootNode.toString());
