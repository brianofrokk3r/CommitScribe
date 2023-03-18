# CommitScribe
An npm package for generating a changelog from git logs. The script retrieves git logs for the past week, processes the logs, and generates a changelog using GPT-3.

# Installation
To install the script, run the following command:

```sh
npm install -g commitscribe
```

# Usage
To use the script, first set your OpenAI API key by running the following command:

```sh
cs config -k <key>
```

Then, to generate a changelog for the week, run:
```sh
cl weekly
```

# Output
The script will output a changelog in the following format:
```md
✨ Feature (38%):
- add new feature requests and chore tasks to development section in README.md
- add build, start, and dev dependencies to package.json
- add OPENAI_API_KEY environment variable and config file to config.ts
- add functions to get git logs and last merge to git.ts
- add instructions for installation and usage to README.md
- add getNodeVersion function to get version from package.json
- add dotenv package to load environment variables to index.js
- add generateCommitSummary function to generate commit summary using OpenAI API to index.js
- add classifyCommit function to classify commit messages to index.js
- add processGitLogs function to process git logs and generate daily and weekly summaries to index.js
- add updateChangelog function to update changelog with daily and weekly summaries to index.js
- add script to generate changelog from git logs to index.js

🐛 Fix (5%):
- fix typo in package-lock.json file name in .gitignore
- fix indentation in getGitLogs function in index.js

📦 Chore (21%):
- add description to package.json in docs
- remove build directory from git tracking in .gitignore
- add build directory to gitignore in .gitignore
- add .env file to ignore list in .gitignore
- update OpenAI API key and organization ID in index.js
- add axios and fs dependencies in index.js
- add dependencies for changelog script (axios, commander, openai) in package.json

🔄 Refactor (5%):
- change program name from 'get' to 'cl' in index.js

📝 Docs (31%):
- add release 1.0.0 with features, chores, fixes, and docs to CHANGELOG.md
- add development tasks for cl command to README.md
- add MIT License to project in LICENSE
- create new file CHANGELOG.md in docs
```

# Development
- [ ] Test: Add tests
- [ ] Test: Validate date logic in `getGitLogs`
- [ ] Chore: Limit number of commits to specific token size
- [ ] Feature: Pipe output to CHANGELOG.md
- [ ] Feature: Options for "User-Friendly" or "Technical" outputs
- [ ] Feature: Summary since last merge from base branch to head branch (`cs between <base branch> <head branch>`)

# License
This project is licensed under the MIT License.