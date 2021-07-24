const disableLineHighlightStyles = `
.textFileRow:hover {
    background-color: unset;
}
`

// Initialize a tag at the top of the document when this file is imported
const styleTag = document.createElement("style");
document.head.appendChild(styleTag);

/**
 * Disable line highlighting on hover in code blocks
 */
export function disableHoverHighlight() {
    styleTag.innerText = disableLineHighlightStyles;
}
/**
 * Enables line highlighting on hover in code blocks
 */
export function enableHoverHighlight() {
    styleTag.innerText = "";
}

