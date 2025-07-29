export default function getCompactVersion(fullVersion) {
  if (fullVersion.includes('-')) {
    return fullVersion;
  }
  return fullVersion.split('.').slice(0, 2).join('.');
}
