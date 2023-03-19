# Changelog

# Release 1.0.0 (2023-03-18)

**✨ Feature (50%):**
- Add build, start, and dev dependencies to package.json
- Add OPENAI_API_KEY environment variable and config file to config.ts
- Add functions to get git logs and last merge to git.ts
- Add instructions for installation and usage to README.md
- Add MIT License to project in LICENSE
- Add getNodeVersion function to get version from package.json in index.js
- Add dotenv package to load environment variables in index.js
- Add generateCommitSummary function to generate commit summary using OpenAI API in index.js
- Add classifyCommit function to classify commit messages in index.js
- Add processGitLogs function to process git logs and generate daily and weekly summaries in index.js
- Add updateChangelog function to update changelog with daily and weekly summaries in index.js
- Add script to generate changelog from git logs in index.js

**📦 Chore (20%):**
- Change program name from 'get' to 'cl' in index.js
- Add .getconfig and .package-lock.json to ignore list in .gitignore
- Add .env file to ignore list in .gitignore
- Add dependencies for changelog script (axios, commander, openai) to package.json

**🐛 Fix (10%):**
- Fix indentation in getGitLogs function in index.js

📝 Docs (10%):
- Create new file CHANGELOG.md in docs folder