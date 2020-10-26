import "../css/autorun.css";
import hljs from 'highlight.js/lib/core';
import pyretSyntax from './pyret-mode';
hljs.registerLanguage('pyret', pyretSyntax);

let container = document.getElementsByClassName("programmingAssignmentViewer")[0];

let reanalyzeButton = document.createElement("button");
reanalyzeButton.innerHTML = "Recolor syntax";
reanalyzeButton.className = "gsp-toggle-btn";
container.insertBefore(reanalyzeButton, container.firstChild);
reanalyzeButton.onclick = enableSyntax;

function enableSyntax() {

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
