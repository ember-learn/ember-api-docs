import HtmlSanitizer from '@jitbit/htmlsanitizer';

export default function createExcerpt(string, maxLength = 300) {
  // Stop at first code example
  string = string.split('<table')[0];

  let excerpt = HtmlSanitizer.SanitizeHtml(string, { allowedTags: [] })
    // Remove tabs and line breaks
    .replace(/\t/g, '')
    .replace(/\n/g, ' ')
    .trim();

  // Truncate
  if (excerpt.length > maxLength) {
    excerpt = excerpt.slice(0, maxLength - 1) + '…';
  }

  return excerpt;
}
