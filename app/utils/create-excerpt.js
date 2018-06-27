import sanitizeHtml from 'npm:sanitize-html'

export default function createExcerpt(string, maxLength = 300) {
  let excerpt = sanitizeHtml(string, {
    // Don't allow any tags
    allowedTags: [],
    // Remove text inside these tags
    nonTextTags: ['style', 'script', 'textarea', 'noscript', 'table']
  }).replace(/\n/g, '')
  if (excerpt.length > maxLength) {
    excerpt = excerpt.slice(0, maxLength) + '…'
  }
  return excerpt
}
