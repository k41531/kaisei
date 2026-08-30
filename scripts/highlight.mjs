import { codeToHtml } from 'shiki';

/**
 * Highlight a code block as HTML using shiki's dual-theme theming so it
 * adapts to the site's light/dark CSS-variable design.
 *
 * @param {string} code
 * @param {string} lang
 * @returns {Promise<string>} Highlighted HTML, or '' on any error.
 */
export async function highlightCode(code, lang) {
  try {
    return await codeToHtml(code, {
      lang: lang || 'text',
      themes: { light: 'github-light', dark: 'github-dark' },
      cssVariablePrefix: '--shiki-',
    });
  } catch {
    return '';
  }
}