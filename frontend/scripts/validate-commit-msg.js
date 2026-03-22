const fs = require('fs');
const path = require('path');
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

function findGitRoot(startPath) {
  let currentPath = startPath;
  while (currentPath) {
    const gitPath = path.join(currentPath, '.git');

    if (fs.existsSync(gitPath)) {
      const stats = fs.statSync(gitPath);

      if (stats.isDirectory()) {
        return currentPath;
      } else {
        const gitFileContent = fs.readFileSync(gitPath, 'utf8').trim();
        const gitDirMatch = gitFileContent.match(/^gitdir: (.+)$/);
        if (gitDirMatch) {
          const gitDir = path.resolve(currentPath, gitDirMatch[1]);
          return path.dirname(gitDir);
        }
      }
    }

    const parent = path.dirname(currentPath);
    if (parent === currentPath) break;
    currentPath = parent;
  }
  return startPath;
}

function getCommitMessagePath(startPath) {
  let currentPath = startPath;
  while (currentPath) {
    const gitPath = path.join(currentPath, '.git');

    if (fs.existsSync(gitPath)) {
      const stats = fs.statSync(gitPath);

      if (stats.isDirectory()) {
        return path.join(gitPath, 'COMMIT_EDITMSG');
      } else {
        const gitFileContent = fs.readFileSync(gitPath, 'utf8').trim();
        const gitDirMatch = gitFileContent.match(/^gitdir: (.+)$/);
        if (gitDirMatch) {
          const gitDir = path.resolve(currentPath, gitDirMatch[1]);
          return path.join(gitDir, 'COMMIT_EDITMSG');
        }
      }
    }

    const parent = path.dirname(currentPath);
    if (parent === currentPath) break;
    currentPath = parent;
  }
  return null;
}

const PROJECT_ROOT = findGitRoot(__dirname);
const messageFile = getCommitMessagePath(__dirname);

if (!messageFile || !fs.existsSync(messageFile)) {
  console.log(`${RED}❌ Commit message file not found${RESET}`);
  process.exit(1);
}

const msg = fs.readFileSync(messageFile, 'utf8').trim();
const regex = /^(feat|fix|docs|style|refactor|test|chore|config)(\([\w-]+\))?!?: .+/;

if (!regex.test(msg.split('\n')[0])) {
  console.log(`${RED}❌ Invalid commit message format${RESET}`);
  console.log(`Expected: ${GREEN}<type>(<scope>): <description${RESET}`);
  console.log(`Types: feat, fix, docs, style, refactor, test, chore, config`);
  process.exit(1);
}

console.log(`${GREEN}✅ Commit message valid${RESET}`);