import "../css/autorun.css";
import hljs from 'highlight.js/lib/core';
import pyretSyntax from './pyret-mode';
import javascript from 'highlight.js/lib/languages/javascript';
import scheme from 'highlight.js/lib/languages/scheme';
hljs.registerLanguage('pyret', pyretSyntax);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('scheme', scheme);

let languageOptions = ["pyret", "javascript", "scheme"];
let currentLanguage = "pyret";

function init() {
    let container = document.getElementsByClassName("programmingAssignmentViewer")[0];

    // Mount the language selector
    let languageSelect = document.createElement("select");
    languageSelect.className = "languageSelect";
    for (const language of languageOptions) {
        let option = document.createElement("option");
        option.value = language;
        option.textContent = language;
        languageSelect.appendChild(option);
    }
    languageSelect.addEventListener("change", () => {
        currentLanguage = languageSelect.value;
    });
    container.insertBefore(languageSelect, container.firstChild);

    // Mount the "analyze" button
    let reanalyzeButton = document.createElement("button");
    reanalyzeButton.innerHTML = "Recolor syntax";
    reanalyzeButton.className = "gsp-toggle-btn";
    container.insertBefore(reanalyzeButton, container.firstChild);
    reanalyzeButton.onclick = enableSyntax;
}

function enableSyntax() {
    const codeContainers = document.getElementsByTagName("code");
    if (codeContainers.length === 0) {
        console.error("Tried to perform syntax highlighting, but couldn't find any code blocks")
    }

    // Highlight each line in each code block
    for (const codeContainer of codeContainers) {
        let codeLines = codeContainer.getElementsByClassName("textFileRow--code");
        for (const codeLine of codeLines) {
            // For this line of code, delete all the spans by replacing the line's HTML content with it's plaintext content
            codeLine.replaceChildren(document.createTextNode(codeLine.innerText));
    
            // Highlight the (not plaintext) line
            hljs.highlightBlock(codeLine, {language: currentLanguage});
        }
    }
}


init();