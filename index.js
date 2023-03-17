const { Command }   = require('commander');
const { execSync } = require('child_process');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

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
        console.log(`daily`, message)
        dailyActivities.push(await generateCommitSummary(message));
    }

    for (const message of gitLogWeekly) {
        console.log(`weekly`, message)
        weeklySummaries.push(await generateCommitSummary(message));
    }

    return {
        dailyActivities,
        weeklySummaries,
    };
}
  
async function updateChangelog(log) {
    console.log('Updating changelog...');
    console.log(log)
    return log
}

async function generateCommitSummary(log) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "With the following text, generate a breakdown of the commit message, separate into feature, bug, refactor, chore, etc... (use best practice): " + log
    });
    return completion.data.choices[0].text
    // ...
}

async function classifyCommit(log) {
    console.log('Updating classifyCommit...');
    console.log(log)
    return log
    // ...
}

(async () => {
    const { dailyActivities, weeklySummaries, tags } = await processGitLogs();
    console.log('Daily Activities:', dailyActivities);
    console.log('Weekly Summaries:', weeklySummaries);
    console.log('Tags:', tags);
    await updateChangelog(tags);
})();