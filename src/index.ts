#!/usr/bin/env node

import { Command } from 'commander';
import { getGitLogs } from './git';
import { generateCommitSummary } from './openai';
import { getNodeVersion } from './utils';
import { homedir } from 'os';
import fs from 'fs';


async function processWeeklyLog(): Promise<{ commitSummary: any }> {
  const gitLogWeekly = getGitLogs('1 week ago');

  const weeklySummaries = [];

  for (const message of gitLogWeekly) {
    weeklySummaries.push(message);
  }

  const commitSummary = await generateCommitSummary(weeklySummaries.join('\n'));

  return {
    commitSummary,
  };
}

const program = new Command();

program
  .name('cs')
  .description('Generate user-friendly updates from commits')
  .version(getNodeVersion());

program.command('config')
  .option('-k, --key <key>', 'API Key')
  .action((str, options) => {
    console.log('Writing config file...', str);
    const config = {
      OPENAI_API_KEY: str.key,
    };

    const data = Object.entries(config).map(([key, value]) => `${key}=${value}`).join('\n');

    fs.writeFile(homedir() + '/.getconfig', data, err => {
      if (err) {
        console.error('Error writing config file:', err);
        return;
      }
      console.log('Config file written successfully.');
    });
  });

program.command('weekly')
  .description('Generate a changelog for the week')
  .action(async (str) => {
    try {
      const { commitSummary } = await processWeeklyLog();
      const summary = commitSummary.data.choices[0].message.content;
      console.log(summary);
    } catch (error: any) {
      const stackTrace = error.stack;
      const errorMessage = error.message;
      console.error(errorMessage, stackTrace);
    }
  });

program.parse();