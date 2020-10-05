import "../css/autorun.css";
import hljs from 'highlight.js';

let stylesheetIncluded = false;
      
let container = document.getElementsByClassName("programmingAssignmentViewer")[0];

let reanalyzeButton = document.createElement("button");
reanalyzeButton.innerHTML = "Re-analyze syntax (slow)";
reanalyzeButton.className = "gsp-toggle-btn";
container.insertBefore(reanalyzeButton, container.firstChild);
reanalyzeButton.onclick = enableSyntax;

let recolorButton = document.createElement("button");
recolorButton.innerHTML = "Re-color syntax (fast)";
recolorButton.className = "gsp-toggle-btn";
container.insertBefore(recolorButton, container.firstChild);
recolorButton.onclick = includeStylesheet;

function includeStylesheet () {
    if (stylesheetIncluded) return;
    else {stylesheetIncluded = true;}

    let styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/default.min.css';
    document.body.appendChild(styles);
}

function enableSyntax () {
    includeStylesheet();

    let styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/default.min.css';
    document.body.appendChild(styles);

    console.log("enabling syntax")
    let codeContainer
    try {
        codeContainer = document.getElementsByTagName("code")[0]
    } catch (error) {
        console.log("Couldn't find any code elements")
    }
   
    let codeLines = codeContainer.getElementsByClassName("textFileRow--code");

    for (let codeLine of codeLines) {
        codeLine.innerHTML = codeLine.innerText;
        hljs.highlightBlock(codeLine);
    }
}

// let syntax = [
//     {
//       "comment": "Delimiters",
//       "match": "(!|->|(?<!<)=>|\\[|\\]|{|}|:\\s|;|,)",
//       "name": "keyword.other.delimiters.arr"
//     },
//     {
//       "comment": "()",
//       "match": "(\\(|\\)|\\.|::|:=| \\^ | \\+ | - | \\/ | \\*| >= | <= | <> | == | <=> | =~ |=|>|<)",
//       "name": "variable.arr"
//     },
//     {
//       "comment": false,
//       "match": "(\\|)",
//       "name": "storage.type.delimiters.arr"
//     },
//     {
//       "comment": "Types",
//       "match": "(?<!-)(\\b|^)[A-Z][A-Za-z]*(?!-)(\\b|$)",
//       "name": "entity.name.type.arr"
//     },
//     {
//       "comment": "Basic keywords",
//       "match": "(?x)(?<!-)(\\b|^) (end|type|type-let|newtype|include|import|provide|provide-types|as| fun|lam|check|examples|is|is-not|satisfies|violates| raises|does-not-raise|raises-violates|raises-satisfies|raises-other-than| data|deriving| for|from|and|or|not| if|else|when|cases|ask| spy) (?!-)(\\b|$)",
//       "name": "keyword.operators.arr"
//     },
//     {
//       "comment": "Basic keywords ending non alpha numeric",
//       "match": "(?x)(?<!-)(\\b|^) (block:|doc:|where:|with:|sharing:|then:|otherwise:| is==|is=~|is<=>|is-not==|is-not=~|is-not<=>)",
//       "name": "keyword.operators.arr"
//     },
//     {
//       "comment": "Basic keywords",
//       "match": "(?x)(?<!-)(\\b|^) (var|ref|shadow|let|letrec|rec|method) (?!-)(\\b|$)",
//       "name": "storage.modifier.arr"
//     },
//     {
//       "match": "(?<!-)(\\b|^)(true|false|nothing)(?!-)(\\b|$)",
//       "name": "constant.language"
//     },
//     {
//       "comment": "single quoted strings",
//       "match": "'[^']*'",
//       "name": "string.quoted.single.arr"
//     },
//     {
//       "comment": "double quoted strings",
//       "match": "\"[^\"]*\"",
//       "name": "string.quoted.double.arr"
//     },
//     {
//       "comment": "triple quoted strings",
//       "begin": "```",
//       "end": "```",
//       "name": "string.quoted.triple.arr"
//     },
//     {
//       "comment": "unterminated single quoted string",
//       "match": "'[^']*$",
//       "name": "invalid.illegal"
//     },
//     {
//       "comment": "unterminated double quoted string",
//       "match": "\"[^\"]*$",
//       "name": "invalid.illegal"
//     },
//     {
//       "comment": "numbers",
//       "match": "(?<![a-zA-Z0-9_-])-?[0-9]+([/.][0-9]+)?",
//       "name": "constant.numeric.arr"
//     },
//     {
//       "comment": "rough numbers",
//       "match": "(?<![a-zA-Z0-9_-])~-?[0-9]+(\\.[0-9]+)?",
//       "name": "constant.other.arr"
//     },
//     {
//       "include": "#comments"
//     },
//     {
//       "comment": "inline comments",
//       "match": "#.*$",
//       "name": "comment.line.number-sign.arr"
//     }
//   ]