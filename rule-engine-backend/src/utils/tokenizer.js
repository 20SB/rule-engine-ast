// src/utils/tokenizer.js
function tokenize(ruleString) {
    // This regex will capture words, operators, parentheses, and strings in quotes
    return ruleString.match(/\(|\)|'[^']+'|\w+|\S/g);
}

module.exports = { tokenize };
