const { Command }   = require('commander');
const { execSync } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

function getNodeVersion() {
    const packageJson = fs.readFileSync('./package.json');
    const { version } = JSON.parse(packageJson);
    return version;
}

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG_ID,
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

/** TODO: Get changelog between two branches since last merge */
function getSinceLastMerge(from = 'dev', to = 'main') {
    const lastMerge = execSync(`git log --first-parent ${to}..${from} --pretty=format:"%s"`)
        .toString()
        .trim()
        .split('\n');
    return lastMerge;
}

async function processWeeklyLog() {
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

async function generateCommitSummary(log) {
    
    let fullPrompt = `System: 

    Give me a set of lists broken into feature, fix, chore, refactor, etc... Use emojis like stars emoji for feature, the caterpillar for fix, and the package for chore. Format each item into a new line to make it more readable result. Append after each Section title the % of items in that section. If there's nothing in a section don't put it in the result.
    
    The format I would like is...
    
    emoji Feature (20%):
    - Feature 1 description
    - Feature 2 description
    - etc...` + '\n\n-----\n\n' + log;

    const completion = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{role: "user", "content": fullPrompt}],
        temperature: 0,
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        }
    });
    return completion
}


program
.name('get')
.description('Generate a changelog from git logs')
.version(getNodeVersion());

program.command('week')
.description('Generate a changelog for the week')
.action(async (str, options) => {
    try {
        const { commitSummary } = await processWeeklyLog();
        const summary = commitSummary.data.choices[0].message.content;
        console.log(summary);
    } catch (error) {
        const errorText = error.message
            .match(/.{1,50}/g)
            .join('\n│ '.padEnd(49));

        const stackTrace = error.stack;
        
        const errorMessage = `
╭──────────────────────────────────────────────────────╮
│                                                      │
│                 An error occurred!                   │
│                                                      │
│──────────────────────────────────────────────────────│
│                                                      │
│ ${errorText.padEnd(50)}   │
│                                                      │        
╰──────────────────────────────────────────────────────╯

${stackTrace}`;
        console.error(errorMessage);
    }    
});

program.parse();