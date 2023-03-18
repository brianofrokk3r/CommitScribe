const { Command }   = require('commander');
const { execSync } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");

// Load config file
const dotenv = require('dotenv');
dotenv.config({ path: '.getconfig' });

// Check for API key
if(!process.env.OPENAI_API_KEY) {
    console.error('No OpenAI API Key found. Please run `get config -k <key>` to set your API key.');
    process.exit(1);
}

function getNodeVersion() {
    const packageJson = fs.readFileSync('./package.json');
    const { version } = JSON.parse(packageJson);
    return version;
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai    = new OpenAIApi(configuration);
const program   = new Command();

function getGitLogs(since) {
    const gitLogs = execSync(`git log --after="${since}" --pretty=format:"%s"`)
        .toString()
        .trim()
        .split('\n');
    return gitLogs;
}

/** TODO: Get changelog between two branches since last merge */
function getSinceLastMerge(from = 'dev', to = 'main') {
    const lastMerge = execSync(`git log --first-parent ${to}..${from} --pretty=format:"%s"`) //--pretty=format:"%s"
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

    console.log(log);
    
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
        temperature: 0.1,
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        }
    });
    return completion
}

program
.name('cl')
.description('Generate a changelog from git logs')
.version(getNodeVersion());

program.command('config')
    .option('-k, --key <key>', 'API Key')
    .action((str, options) => {
        console.log('Writing config file...', str);
        const config = {
            OPENAI_API_KEY: str.key,
        };
        
        const data = Object.entries(config).map(([key, value]) => `${key}=${value}`).join('\n');
        
        fs.writeFile('.getconfig', data, err => {
        if (err) {
            console.error('Error writing config file:', err);
            return;
        }
        console.log('Config file written successfully.');
        });
    });

program.command('week')
.description('Generate a changelog for the week')
.action(async (str, options) => {
    try {
        const { commitSummary } = await processWeeklyLog();
        const summary = commitSummary.data.choices[0].message.content;
        console.log(summary);
    } catch (error) {
        const stackTrace = error.stack;
        const errorMessage = error.message;
        console.error(errorMessage, stackTrace);
    }    
});

program.parse();