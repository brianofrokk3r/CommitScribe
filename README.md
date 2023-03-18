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
cl week
```

The output will be printed to the console. To save the output to a file, run:
```sh
cl week -o <output file>
```

To generate a changelog between branches, run:
```sh
cl between <base branch> <head branch>
```

# Development
- [ ] Pipe output to CHANGELOG.md
- [ ] Limit number of commits to specific token size
- [ ] Options for "User-Friendly" or "Technical" outputs
- [ ] Summary since last merge from base branch to head branch

# License
This project is licensed under the MIT License.