---
layout: '@/templates/BasePost.astro'
title: Introducing git-greener
description: A CLI tool to bring your GitHub contribution graph with you when you move on.
pubDate: 2026-03-07T12:00:00.000Z
imgSrc: '/assets/images/git-greener-cover.png'
imgAlt: 'git-greener CLI tool'
---

I built [git-greener](https://github.com/dmhalejr/greener) to solve a problem most developers have faced at least once: you leave a job, switch GitHub accounts, or consolidate profiles, and suddenly years of contribution history just... disappears.

Your GitHub contribution graph tells a story. It reflects consistency, dedication, and the work you've put in over time. Losing that when you move on never sat right with me, so I decided to build something about it.

## What is git-greener?

git-greener is a Node.js CLI tool that lets you replay commit history from one repository into another while preserving the original dates. The key distinction here is that **only commit metadata transfers** -- dates and subject lines. No source code is ever moved. This keeps things clean, respects intellectual property, and focuses purely on preserving your contribution footprint.

## How It Works

The workflow is two commands:

### 1. Extract

Point `extract` at any local git repo and it reads the commit log, outputting a pipe-delimited metadata file.

```bash
npx git-greener extract --source ./my-old-project --output ./commits.txt
```

You can filter by author email, date range, or branch to grab exactly the commits you care about.

### 2. Replay

Take that metadata file and `replay` it into a target repository. git-greener creates empty commits with the original timestamps preserved.

```bash
npx git-greener replay --input ./commits.txt --target ./my-contribution-repo
```

Each replayed commit uses `GIT_AUTHOR_DATE` and `GIT_COMMITTER_DATE` to maintain the original dates on GitHub's contribution graph.

## Safety First

I was deliberate about making this tool safe by default:

- **Dry-run by default** -- nothing changes until you pass `--execute`
- **Automatic backup branches** are created before any replay
- **Dirty repo detection** prevents running against repos with uncommitted changes
- **Interactive confirmation** prompts before execution
- A `--redact` flag strips commit messages entirely if you're working with sensitive codebases

## Use Cases

This tool is for anyone who has experienced that moment of losing their green squares:

- Switching jobs and leaving behind years of private repo contributions
- Consolidating personal and work GitHub accounts
- Freelancers building a portfolio from client work
- Students moving from university accounts
- Moving between GitHub, GitLab, or Bitbucket

## Getting Started

No install required. Just run it with npx (Node.js 20+ needed):

```bash
npx git-greener extract --source ./repo --output ./commits.txt
npx git-greener replay --input ./commits.txt --target ./target-repo --execute
```

Always dry-run first, filter to only your commits, and check your employer's policies around commit metadata before using it.

## Check It Out

The full source and documentation are on GitHub:

- [git-greener on GitHub](https://github.com/dmhalejr/greener)
- [git-greener on npm](https://www.npmjs.com/package/git-greener)

I'd love to hear feedback or see contributions. Give it a try and bring your green with you.
