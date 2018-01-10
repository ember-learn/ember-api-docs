export default function getCompactVersion(fullVersion) {
  return fullVersion.split('.').slice(0, 2).join('.');
}
