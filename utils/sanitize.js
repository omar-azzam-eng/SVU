/**
 * Escape dynamic text before it is placed inside an HTML template.
 * Event data is local today, but this keeps the renderer safe if the source changes later.
 */
export const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');
