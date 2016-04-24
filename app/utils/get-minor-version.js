export default function getMinorVersion(version) {
  let minorVersion = version;
  minorVersion = minorVersion.split(".");
  minorVersion.pop();
  minorVersion = minorVersion.join(".");
  return minorVersion;
}
