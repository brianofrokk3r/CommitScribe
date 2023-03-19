import { execSync } from 'child_process';

export function getGitLogs(since: string) {
  const gitLogs = execSync(`git log --after="${since}" --pretty=format:"%s"`)
    .toString()
    .trim()
    .split('\n');
  return gitLogs;
}

export function getSinceLastMerge(from: string = 'dev', to: string = 'main') {
  const lastMerge = execSync(`git log --first-parent ${to}..${from} --pretty=format:"%s"`)
    .toString()
    .trim()
    .split('\n');
  return lastMerge;
}
