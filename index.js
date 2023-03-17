const { Command }   = require('commander');
const { execSync } = require('child_process');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai    = new OpenAIApi(configuration);
const program   = new Command();

function getGitLogs(since) {
    const gitLogs = execSync(`git log --since="${since}" --pretty=format:"%s"`)
      .toString()
      .trim()
      .split('\n');
    return gitLogs;
  }
  
async function processGitLogs() {
    const gitLogDaily = getGitLogs('1 day ago');
    const gitLogWeekly = getGitLogs('1 week ago');

    const dailyActivities = [];
    const weeklySummaries = [];
    const tags = {};

    for (const message of gitLogDaily) {
        dailyActivities.push(await generateCommitSummary(message));
    }

    for (const message of gitLogWeekly) {
        weeklySummaries.push(await generateCommitSummary(message));

        const tag = await classifyCommit(message);
        if (!tags[tag]) {
        tags[tag] = [];
        }
        tags[tag].push(message);
    }
}
  
async function updateChangelog(tags) {
    console.log('Updating changelog...');
    console.log(log)
}

(async () => {
    const { dailyActivities, weeklySummaries, tags } = await processGitLogs();
    console.log('Daily Activities:', dailyActivities);
    console.log('Weekly Summaries:', weeklySummaries);
    console.log('Tags:', tags);
    await updateChangelog(tags);
})();