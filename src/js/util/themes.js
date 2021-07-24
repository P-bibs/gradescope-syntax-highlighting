
// Initialize a tag at the top of the document when this file is imported
const darkModeStyleTag = document.createElement("link");
darkModeStyleTag.rel = "stylesheet";
darkModeStyleTag.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.1.0/styles/a11y-dark.min.css"
darkModeStyleTag.disabled = "disabled"
document.head.appendChild(darkModeStyleTag);

/**
 * Disable dark mode
 */
export function enableDarkMode() {
    darkModeStyleTag.removeAttribute("disabled")
}
/**
 * Enable dark mode
 */
export function disableDarkMode() {
    darkModeStyleTag.setAttribute("disabled", "disabled")
}

