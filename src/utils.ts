import fs from 'fs';

export function getNodeVersion() {
  const packageJson = fs.readFileSync('./package.json', 'utf-8');
  const { version } = JSON.parse(packageJson);
  return version;
}