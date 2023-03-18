# Changelogger
An npm package for generating a changelog from git logs. The script retrieves git logs for the past week, processes the logs, and generates a changelog using GPT-3.

# Installation
To install the script, run the following command:

```sh
npm install -g changelogger
```

# Usage
To use the script, first set your OpenAI API key by running the following command:

```sh
cl config -k <key>
```

Then, to generate a changelog for the week, run:
```sh
cl weekly
```

# Development
- [ ] Test: Add tests
- [ ] Test: Validate date logic in `getGitLogs`
- [ ] Chore: Limit number of commits to specific token size
- [ ] Feature: Pipe output to CHANGELOG.md
- [ ] Feature: Options for "User-Friendly" or "Technical" outputs
- [ ] Feature: Summary since last merge from base branch to head branch (`cl between <base branch> <head branch>`)

# License
This project is licensed under the MIT License.