import "../css/autorun.css";
import hljs from 'highlight.js';

// Register languages
import pyretSyntax from './pyret-mode';
hljs.registerLanguage('pyret', pyretSyntax);

// Register aliases
hljs.registerAliases("racket", { languageName: "scheme" })
hljs.registerAliases("LaTeX", { languageName: "tex" })

function init() {
    let container = document.getElementsByClassName("programmingAssignmentViewer")[0];

    // Insert plugin html into document
    let pluginHtml = `
    <details class="gsh-details-container">
        <summary class="gsh-details-summary">Syntax Highlighting</summary>
        <datalist id="gsh-language-list">
            ${hljs.listLanguages().map(language => `<option value="${language}"></option>`).join("")}
        </datalist>
        <p>
            Select a language and press "Recolor syntax" to recolor all currently visible code blocks. Closing and reopening Gradescope dropdowns will reset syntax highlighting.
        </p>
        <div className="gsh-interactions-area">
            <label for="gsh-language-select">Choose a language:</label>
            <input list="gsh-language-list" id="gsh-language-select"/>
            <button class="gsh-highlight-button"/>Recolor syntax<button>
            <div class="gsh-error-area"></div>
        </div>
    </details>
    `
    container.insertAdjacentHTML("afterbegin", pluginHtml);

    // Attach listeners to plugin document
    document.getElementsByClassName("gsh-highlight-button")[0].onclick = enableSyntax;
}

/**
 * Display an error in a pre-defined location
 */
function displayError(message) {
    document.getElementsByClassName("gsh-error-area")[0].innerText = message;
}
/**
 * Clear the error area
 */
function clearError() {
    document.getElementsByClassName("gsh-error-area")[0].innerText = "";
}

function enableSyntax() {
    let currentLanguage = document.getElementById("gsh-language-select").value;
    if (hljs.getLanguage(currentLanguage) === undefined) {
        displayError("Invalid language");
        return;
    } else {
        clearError();
    }

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
            hljs.highlightBlock(codeLine, { language: currentLanguage });
        }
    }
}


init();