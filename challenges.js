// ================================================================
// CHALLENGE DATA
//
// To add a challenge, copy the template below and add it to the
// CHALLENGES array. Everything else updates automatically.
//
// TEMPLATE:
// {
//   id: 'unique-kebab-id',
//   title: 'Challenge Title',
//   category: 'Terminal',       // Terminal | Git | Networking | Web | Files | Python
//   difficulty: 'Easy',         // Easy | Medium | Hard
//   points: 100,                // Easy≈50-100  Medium≈125-175  Hard≈200-275
//   description: `markdown`,    // supports **bold**, `code`, ```blocks```, ## headings, [links](url)
//   flag: 'flag{answer}',       // exact flag — OR leave '' when using flagPattern or githubVerify
//   flagPattern: '^flag\\{...$',// optional regex — use instead of flag for variable answers
//   flagCaseSensitive: true,    // optional, default true; false = case-insensitive
//   githubVerify: {             // optional — verified via GitHub public API
//     type: 'repo-exists' | 'has-commits' | 'has-file' | 'commit-message',
//     repo: 'repo-name',        // GitHub repo name (must be public)
//     minCommits: 1,            // for has-commits
//     path: 'README.md',        // for has-file
//     pattern: '^feat:',        // for commit-message (regex string)
//   },
//   hints: [
//     { text: 'First hint',  cost: 10 },
//     { text: 'Second hint', cost: 25 },
//   ],
//   videoHint: { url: 'https://www.youtube.com/embed/VIDEO_ID', cost: 50 },
// }
// ================================================================

const CHALLENGES = [

  // ════════════════════════════════════════════════════════════
  // TERMINAL
  // ════════════════════════════════════════════════════════════

  {
    id: 'terminal-01',
    title: 'Hello, Terminal!',
    category: 'Terminal',
    difficulty: 'Easy',
    points: 50,
    description: `## What Is a Terminal?

Your computer has two ways to talk to it:

**Graphical interface (GUI)** — the windows, icons, and buttons you normally use. Easy to learn, but limited.

**Terminal (command line)** — you type a command, the computer runs it, and types back the result. Faster, more powerful, and used by every developer in the world.

The terminal runs a program called a **shell**. The shell reads what you type, carries out the instruction, and shows you the result. Common shells: **bash** and **zsh** (macOS/Linux), **PowerShell** or **Command Prompt** (Windows).

### How to Open a Terminal

- **Windows:** Open the Start menu and search for **Git Bash** or **PowerShell**
- **macOS:** Press **Cmd + Space**, type **Terminal**, press Enter
- **Linux:** Press **Ctrl + Alt + T**

### Your First Command: echo

\`echo\` prints text to the screen. It is one of the simplest commands — perfect for getting started.

Type this into your terminal and press **Enter**:
\`\`\`
echo "flag{hello_terminal}"
\`\`\`

The terminal prints back exactly what you put between the quotes. That printed line is your flag. Copy it and submit it below.

This is the **only** challenge where you echo the flag directly. From here on you will discover flags by doing real tasks.`,
    flag: 'flag{hello_terminal}',
    flagCaseSensitive: true,
    hints: [
      { text: 'Type the command exactly as shown, including the quotation marks, then press Enter. The line the terminal prints back is your flag.', cost: 10 },
      { text: 'Make sure you are in an actual terminal, not a text editor. On Windows, search for "Git Bash" or "PowerShell" in the Start menu.', cost: 10 },
    ],
  },

  {
    id: 'terminal-02',
    title: 'Where Are You? (pwd and cd)',
    category: 'Terminal',
    difficulty: 'Easy',
    points: 75,
    description: `## The File System: A Tree of Folders

Your computer organises every file in a **tree structure** of directories (folders). Each folder can contain files and other folders:

\`\`\`
/ (the root — the very top of everything)
├── home/
│   └── yourname/          ← your home directory
│       ├── Documents/
│       ├── Downloads/
│       └── Desktop/
├── usr/
└── etc/
\`\`\`

When you open a terminal you are always standing somewhere in this tree. That location is called your **working directory**.

### New Commands

**\`pwd\`** — **P**rint **W**orking **D**irectory. Shows where you are right now.
**\`cd\`** — **C**hange **D**irectory. Move to a different location.
**\`~\`** — The tilde symbol is a shortcut for your home directory. \`cd ~\` always brings you home, no matter where you are.
**\`cat file\`** — Con**cat**enate. Reads a file and prints its contents to the terminal.
**\`mkdir name\`** — **M**a**k**e **Dir**ectory. Creates a new folder.
**\`echo "text" > file\`** — Writes text into a file. The \`>\` is called **redirect**.

### Do This

Run \`pwd\` to see where you start:
\`\`\`
pwd
\`\`\`

Go to your home directory and confirm you arrived:
\`\`\`
cd ~
pwd
\`\`\`

Now create a folder, write a flag into a file there, and read it back:
\`\`\`
mkdir -p ~/ctf-lab
echo "flag{i_know_where_i_am}" > ~/ctf-lab/location.txt
cat ~/ctf-lab/location.txt
\`\`\`

\`cat\` reads the file and prints its content. Submit what it prints.`,
    flag: 'flag{i_know_where_i_am}',
    hints: [
      { text: '`cat` reads a file and prints its contents. After running the echo command, run `cat ~/ctf-lab/location.txt` to read it and get the flag.', cost: 10 },
      { text: 'If you get "No such file or directory", make sure you ran `mkdir -p ~/ctf-lab` first and that the echo command completed without errors.', cost: 15 },
    ],
  },

  {
    id: 'terminal-03',
    title: 'Create Folders and Files',
    category: 'Terminal',
    difficulty: 'Easy',
    points: 75,
    description: `## Making Things From Scratch

Everything on your computer is either a **file** (holds data) or a **directory** (holds files and other directories). The terminal lets you create both without any clicking.

### Commands This Challenge Teaches

**\`mkdir name\`** — Creates a new folder.
**\`mkdir -p a/b/c\`** — Creates nested folders all at once. The \`-p\` flag means "parents" — make any missing parent folders automatically.
**\`echo "text" > file.txt\`** — Writes text into a file. \`>\` is the **redirect** operator. It sends output to a file instead of the screen. Warning: it overwrites any existing content.
**\`echo "text" >> file.txt\`** — **Appends** text to a file. \`>>\` adds a new line without overwriting.
**\`ls\`** — Lists the files and folders in your current directory.
**\`cat file\`** — Reads and prints a file.

### Do This

Create a folder structure with a flag hidden inside it:
\`\`\`
cd ~/ctf-lab
mkdir missions
mkdir -p missions/alpha/data
\`\`\`

Write some files — the flag lives deep in the structure:
\`\`\`
echo "This is a notes file" > missions/notes.txt
echo "flag{mkdir_and_files}" > missions/alpha/data/flag.txt
echo "Some other content" > missions/alpha/data/info.txt
\`\`\`

List what you created at each level:
\`\`\`
ls missions/
ls missions/alpha/
ls missions/alpha/data/
\`\`\`

Navigate in and read the flag:
\`\`\`
cd missions/alpha/data
cat flag.txt
\`\`\`

Submit what \`cat\` prints.`,
    flag: 'flag{mkdir_and_files}',
    hints: [
      { text: '`>` writes to a file. `cat` reads it. Navigate to `missions/alpha/data/` with `cd` and then run `cat flag.txt`.', cost: 10 },
      { text: 'On Windows cmd, use `type` instead of `cat`. In PowerShell or Git Bash, `cat` works exactly as shown.', cost: 15 },
    ],
  },

  {
    id: 'terminal-04',
    title: 'Hidden Files (Dotfiles)',
    category: 'Terminal',
    difficulty: 'Easy',
    points: 100,
    description: `## Files That Hide in Plain Sight

On macOS, Linux, and Git Bash on Windows, any file or folder whose name **starts with a dot ( \`.\` )** is called a **dotfile** and is **hidden by default**.

This is intentional design — configuration files like \`.gitignore\`, \`.bashrc\`, and the \`.ssh/\` folder are hidden so they do not clutter your everyday view. But they are always there if you know how to look.

### Command Flags (Options)

The letters you add after a \`-\` sign to a command are called **flags** or **options**. They change how the command behaves.

**\`ls\`** — shows only visible files
**\`ls -a\`** — shows **a**ll files, including hidden ones (dotfiles)
**\`ls -l\`** — **l**ong format: shows one file per line with permissions, size, date, and owner
**\`ls -la\`** — both flags combined (this is what professionals type all the time)

You can combine multiple flags: \`-la\` is the same as writing \`-l -a\`.

### Do This

Go to your lab folder and create two files — one visible, one hidden:
\`\`\`
cd ~/ctf-lab
echo "I am easy to see" > visible.txt
echo "flag{dot_files_are_hidden}" > .secret
\`\`\`

List files the normal way — notice \`.secret\` does NOT appear:
\`\`\`
ls
\`\`\`

Now reveal all files including hidden ones:
\`\`\`
ls -la
\`\`\`

You will see \`.secret\` appear in the list! Read it:
\`\`\`
cat .secret
\`\`\`

Submit what \`cat\` prints.`,
    flag: 'flag{dot_files_are_hidden}',
    hints: [
      { text: 'After creating `.secret`, run `ls` — it won\'t show. Then run `ls -la` — now it appears. Then `cat .secret` to read the flag.', cost: 10 },
      { text: 'Hidden files just start with a dot — there is no special "hide" action. Try `ls -la` in your home directory (`cd ~`) to see all the dotfiles already living there.', cost: 15 },
    ],
  },

  {
    id: 'terminal-05',
    title: 'Navigate Deep Folders',
    category: 'Terminal',
    difficulty: 'Easy',
    points: 100,
    description: `## Moving Through a Directory Tree

Real projects have many levels of nested folders. You need to move through them confidently with just a few commands.

### Navigation Cheatsheet

**\`cd foldername\`** — Move into that folder (go deeper)
**\`cd ..\`** — Go up ONE level to the parent folder. The \`..\` means "the folder that contains me"
**\`cd ../..\`** — Go up two levels at once
**\`cd -\`** — Go back to wherever you just were (like a browser back button)
**\`cd ~\`** — Jump straight home, no matter how deep you are
**\`pwd\`** — Print where you are right now

Every folder always has a \`..\` (parent) — all the way up to the very top of the file system, which is called the **root** ( \`/\` on Mac/Linux, or \`C:\\\` on Windows).

### Do This

Build a deep structure and hide the flag at the very bottom:
\`\`\`
cd ~/ctf-lab
mkdir -p dungeon/level1/level2/level3
echo "flag{deep_navigator}" > dungeon/level1/level2/level3/treasure.txt
echo "wrong floor" > dungeon/level1/decoy.txt
echo "wrong floor" > dungeon/level1/level2/decoy.txt
\`\`\`

Navigate in step by step, running \`pwd\` each time to watch your location change:
\`\`\`
cd dungeon
pwd
cd level1
pwd
cd level2
pwd
cd level3
pwd
cat treasure.txt
\`\`\`

Submit the flag from \`treasure.txt\`.

Then try climbing back out using only \`cd ..\`:
\`\`\`
cd ..
cd ..
cd ..
cd ..
pwd
\`\`\``,
    flag: 'flag{deep_navigator}',
    hints: [
      { text: 'Navigate all the way into `dungeon/level1/level2/level3/` using `cd` one level at a time, then `cat treasure.txt`.', cost: 10 },
      { text: '`cd ..` moves you up one level. Run it once per level to climb back to the top. Watch what `pwd` prints after each one.', cost: 15 },
    ],
  },

  {
    id: 'terminal-06',
    title: 'Unzip an Archive',
    category: 'Terminal',
    difficulty: 'Medium',
    points: 150,
    description: `## Archives: Many Files Packed into One

A **ZIP archive** bundles many files and folders into a single \`.zip\` file. This is how software is distributed, how backups are stored, and how groups of files are shared between people.

### New Commands

**\`unzip archive.zip\`** — Extracts all files from the archive into the current directory
**\`unzip -l archive.zip\`** — **L**ists what is inside WITHOUT extracting anything (good for previewing)
**\`ls -R folder/\`** — Lists ALL files recursively — shows every file inside nested folders
**\`cat file.txt\`** — Reads and prints a file

### Your Task

**Step 1 — Download the challenge archive**

Click this link to download it: [terminal-challenge.zip](terminal-challenge.zip)

Your browser will save it — usually to your \`Downloads\` folder. Open your terminal and go there:
\`\`\`
cd ~/Downloads
ls
\`\`\`

You should see \`terminal-challenge.zip\` in the list.

**Step 2 — Preview the archive without extracting it**
\`\`\`
unzip -l terminal-challenge.zip
\`\`\`

This shows the folder structure inside. Notice there are multiple folders and files.

**Step 3 — Extract the archive**
\`\`\`
unzip terminal-challenge.zip
\`\`\`

**Step 4 — See everything that was extracted**
\`\`\`
ls -R ctf-terminal-challenge/
\`\`\`

**Step 5 — Follow the clues**

Start with the README file:
\`\`\`
cat ctf-terminal-challenge/README.txt
\`\`\`

Then read the files in the \`clues/\` folder, navigate to the right place, and find the flag. Submit it below when you find it.

> **Windows note:** If \`unzip\` is not available, use Git Bash. Or in PowerShell: \`Expand-Archive terminal-challenge.zip .\``,
    flag: 'flag{unzip_champion}',
    hints: [
      { text: '`unzip -l` is just a preview — it extracts nothing. `unzip` (without -l) actually extracts. After extracting, run `ls -R ctf-terminal-challenge/` to see the whole structure at once.', cost: 15 },
      { text: 'Read `README.txt` first, then the two files in `clues/`, then look inside `vault/`. One file there says it\'s a decoy. The other is the flag.', cost: 25 },
    ],
  },

  {
    id: 'terminal-07',
    title: 'Search Inside Files (grep)',
    category: 'Terminal',
    difficulty: 'Medium',
    points: 150,
    description: `## grep: Finding a Needle in a Haystack

**\`grep\`** searches for a word or pattern inside files. Instead of opening every file manually, you describe what you are looking for and grep finds it in milliseconds.

### Syntax
\`\`\`
grep "what to find" filename.txt
\`\`\`

### Useful Flags

**\`grep -r "text" folder/\`** — **r**ecursive: search ALL files inside a folder and its sub-folders
**\`grep -i "text" file\`** — case-**i**nsensitive: finds "Flag", "FLAG", and "flag" equally
**\`grep -l "text" folder/\`** — only show **filenames** that match, not the content inside

### The Pipe: |

The pipe symbol \`|\` connects two commands together. It takes the **output** of one command and feeds it as **input** to the next. Think of it like plumbing — water (data) flows from one pipe to the next.

\`\`\`
ls -la | grep ".txt"
\`\`\`

This lists files and then filters to show only lines that contain ".txt".

### Your Task

Create a folder with several files. Only one of them holds the flag:
\`\`\`
cd ~/ctf-lab
mkdir search-demo
echo "a totally ordinary shopping list" > search-demo/list.txt
echo "meeting notes from tuesday" > search-demo/notes.txt
echo "flag{grep_detective}" > search-demo/secret.txt
echo "the weather was nice today" > search-demo/diary.txt
\`\`\`

Now find the flag WITHOUT opening each file individually. Let grep do it:
\`\`\`
grep -r "flag{" ~/ctf-lab/search-demo/
\`\`\`

grep prints the **file name** and the **matching line** for every hit. The matching line is your flag.

Submit what grep found.`,
    flag: 'flag{grep_detective}',
    hints: [
      { text: '`grep -r "flag{" ~/ctf-lab/search-demo/` searches all four files at once. The output line shows `filename:content` — the part after the colon is your flag.', cost: 20 },
      { text: 'grep output looks like: `search-demo/secret.txt:flag{grep_detective}`. Submit just the flag part: `flag{grep_detective}`.', cost: 25 },
    ],
  },

  {
    id: 'terminal-08',
    title: 'Find Files (find)',
    category: 'Terminal',
    difficulty: 'Medium',
    points: 175,
    description: `## find: Search the File System Itself

\`grep\` searches **inside** files. \`find\` searches for the **files themselves** by name, type, size, or other attributes.

### Syntax
\`\`\`
find [where to start] [what to look for]
\`\`\`

The first argument is the **starting directory**. A dot \`.\` means "start from here (current directory)". A \`~\` means "start from home".

### Common Uses

\`\`\`
find . -name "*.txt"        find all .txt files starting from current directory
find ~ -name "secret*"      find files whose name starts with "secret"
find . -type d              find only directories  (d = directory)
find . -type f              find only regular files (f = file)
find . -name "flag.txt"     find a file called exactly flag.txt
\`\`\`

### Combining find with cat

You can pipe \`find\` results into another command. \`xargs\` takes a list of results and passes them as arguments:
\`\`\`
find . -name "*.txt" | xargs cat
\`\`\`

This finds every \`.txt\` file and \`cat\`s them all in one command.

### Your Task

Build a structure where the flag is buried deep, surrounded by decoy files:
\`\`\`
cd ~/ctf-lab
mkdir -p vault/level1/level2/level3
echo "not here" > vault/level1/decoy.txt
echo "not here either" > vault/level1/level2/decoy.txt
echo "still not here" > vault/level1/level2/level3/decoy.txt
echo "flag{find_master}" > vault/level1/level2/level3/treasure.txt
\`\`\`

Use \`find\` to locate the treasure file without navigating there manually:
\`\`\`
find ~/ctf-lab/vault -name "treasure.txt"
\`\`\`

find prints the full path to the file. Now read it:
\`\`\`
cat ~/ctf-lab/vault/level1/level2/level3/treasure.txt
\`\`\`

Or do both in one command using a pipe:
\`\`\`
find ~/ctf-lab/vault -name "treasure.txt" | xargs cat
\`\`\`

Submit the flag.`,
    flag: 'flag{find_master}',
    hints: [
      { text: '`find ~/ctf-lab/vault -name "treasure.txt"` prints the full path to the file. Then run `cat` with that path, or pipe straight to `xargs cat`.', cost: 20 },
      { text: 'The `.` in `find . -name` means "start from the current directory". You can replace it with any path. Here we use the full path `~/ctf-lab/vault`.', cost: 25 },
    ],
  },


  // ════════════════════════════════════════════════════════════
  // GIT
  // ════════════════════════════════════════════════════════════

  {
    id: 'git-01',
    title: 'Init and First Commit',
    category: 'Git',
    difficulty: 'Easy',
    points: 100,
    description: `## Version Control From Zero

Git tracks changes to your files so you can travel back in time, collaborate with others, and understand the full history of a project.

**Create your first repository:**
\`\`\`
mkdir git-practice && cd git-practice
git init
\`\`\`

**Create something to commit:**
\`\`\`
echo "# My first repo" > README.md
\`\`\`

**Stage and commit:**
\`\`\`
git add README.md
git commit -m "Initial commit"
\`\`\`

The commit output looks like:
\`\`\`
[main (root-commit) a3f9d2e] Initial commit
\`\`\`

That \`a3f9d2e\` is your **commit hash** — a unique fingerprint for this snapshot. It will be different from everyone else's.

Submit it as \`flag{a3f9d2e}\` (with **your** actual 7-character hash).`,
    flag: '',
    flagPattern: '^flag\\{[0-9a-f]{7,40}\\}$',
    flagCaseSensitive: false,
    hints: [
      { text: 'After `git commit`, look at the first line of output. The short hash is inside the square brackets after "root-commit".', cost: 15 },
      { text: 'You can also see the hash anytime with: `git log --oneline` — the 7-character hex string at the start of each line.', cost: 20 },
    ],
  },

  {
    id: 'git-02',
    title: 'Git Status',
    category: 'Git',
    difficulty: 'Easy',
    points: 100,
    description: `## What Is Git Tracking Right Now?

\`git status\` is the command you will run constantly. It shows:
- **Untracked** files — git does not know about them yet
- **Modified** files — tracked files that have changed since the last commit
- **Staged** files — changes ready to go into the next commit

**Try it:**
\`\`\`
cd git-practice
echo "some new content" >> README.md
git status
\`\`\`

You will see README.md listed as **modified** (red = not staged).

Now add an untracked file:
\`\`\`
echo "new file" > notes.txt
git status
\`\`\`

Now you will see both: README.md as modified and notes.txt as untracked.

Get the flag:
\`\`\`
echo "flag{modified_is_tracked}"
\`\`\``,
    flag: 'flag{modified_is_tracked}',
    hints: [
      { text: 'The output is color-coded: red = not staged, green = staged. Run `git status` after every change to see what git sees.', cost: 10 },
      { text: 'Untracked means git has never seen the file before. Modified means git knows the file but it has changed since the last commit.', cost: 15 },
    ],
  },

  {
    id: 'git-03',
    title: 'The Staging Area',
    category: 'Git',
    difficulty: 'Easy',
    points: 125,
    description: `## Git's Two-Step Save

Git does not commit everything at once. You **stage** only the changes you want, then **commit** them. This lets you make one clean, logical commit even if you touched many files.

**Stage a specific file:**
\`\`\`
cd git-practice
echo "feature A" > feature_a.txt
echo "feature B" > feature_b.txt
git add feature_a.txt
git status
\`\`\`

Only \`feature_a.txt\` is staged (green). \`feature_b.txt\` is still untracked.

**Stage everything in the current directory:**
\`\`\`
git add .
\`\`\`

**Unstage a file** (keep the change, but remove it from staging):
\`\`\`
git restore --staged feature_b.txt
git status
\`\`\`

**Commit just what is staged:**
\`\`\`
git commit -m "feat: add feature A only"
echo "flag{staged_and_ready}"
\`\`\``,
    flag: 'flag{staged_and_ready}',
    hints: [
      { text: '`git add .` stages all changes in the current folder. `git add filename` stages just that file.', cost: 10 },
      { text: 'The staging area is like a draft tray — you assemble your commit there before making it permanent. `git restore --staged` moves files back out of the tray.', cost: 15 },
    ],
  },

  {
    id: 'git-04',
    title: 'Reading Commit History',
    category: 'Git',
    difficulty: 'Easy',
    points: 125,
    description: `## git log — Your Project's Timeline

\`git log\` shows the full history of your repository. Every commit is recorded forever.

**Basic log** (press \`q\` to quit):
\`\`\`
git log
\`\`\`

**Compact — one line per commit:**
\`\`\`
git log --oneline
\`\`\`

Output looks like:
\`\`\`
b2c3d4e feat: add feature A only
a3f9d2e Initial commit
\`\`\`

**Other useful variations:**
\`\`\`
git log --oneline --graph          show branch graph alongside commits
git log --oneline -5               show only the last 5 commits
git log --author="Your Name"       filter by who made the commit
\`\`\`

**Your task:**

In your \`git-practice\` repo, run \`git log --oneline\` and find the hash of the **most recent commit** (the top line).

Submit it as \`flag{<hash>}\`.`,
    flag: '',
    flagPattern: '^flag\\{[0-9a-f]{7,40}\\}$',
    flagCaseSensitive: false,
    hints: [
      { text: '`git log --oneline` shows the newest commit at the top. The 7-character hex string at the start is the short hash. Wrap it in `flag{...}` to submit.', cost: 15 },
      { text: 'You can get just the latest hash with: `git rev-parse --short HEAD`', cost: 20 },
    ],
  },

  {
    id: 'git-05',
    title: 'Commit Messages That Last',
    category: 'Git',
    difficulty: 'Easy',
    points: 100,
    description: `## Writing Messages Your Future Self Will Thank You For

A commit message is a note to collaborators and your future self. Bad: \`"fix"\`. Good: \`"Fix login timeout when session token is empty"\`.

**Conventional Commits** is a widely-used standard:
\`\`\`
<type>: <short description>
\`\`\`

Common types: \`feat\`, \`fix\`, \`docs\`, \`refactor\`, \`test\`, \`chore\`

**Examples:**
\`\`\`
feat: add user authentication endpoint
fix: prevent null pointer crash on empty profile
docs: update README with local setup steps
refactor: extract email validation into helper function
\`\`\`

**Practice — make a properly-messaged commit:**
\`\`\`
cd git-practice
echo "# Changelog" > CHANGELOG.md
git add CHANGELOG.md
git commit -m "docs: add changelog file"
git log --oneline
echo "flag{commit_messages_matter}"
\`\`\``,
    flag: 'flag{commit_messages_matter}',
    hints: [
      { text: 'The type prefix (`feat:`, `fix:`, etc.) lets you scan history instantly and can auto-generate release notes. It is a habit worth building from day one.', cost: 10 },
    ],
  },

  {
    id: 'git-06',
    title: 'Branch Out',
    category: 'Git',
    difficulty: 'Medium',
    points: 175,
    description: `## Branches — Parallel Universes for Code

A **branch** is an independent line of development. The default is called \`main\` (or \`master\` in older repos). You make a branch to work on a feature without touching main.

**See all branches (current one has \`*\`):**
\`\`\`
git branch
\`\`\`

**Create and switch in one command:**
\`\`\`
git switch -c feature-experiment
\`\`\`

*(Older syntax: \`git checkout -b feature-experiment\`)*

**Practice:**
\`\`\`
cd git-practice
git switch -c feature-experiment
echo "experimenting on a branch" > experiment.txt
git add experiment.txt
git commit -m "feat: add experiment file"
git log --oneline
\`\`\`

Now switch back to main and check the directory:
\`\`\`
git switch main
ls
\`\`\`

\`experiment.txt\` is gone — not deleted, just on the other branch. Each branch has its own state.

Run:
\`\`\`
echo "flag{branching_out}"
\`\`\``,
    flag: 'flag{branching_out}',
    hints: [
      { text: '`git branch` lists all branches. `git switch <name>` switches to an existing one. `git switch -c <name>` creates and switches in one step.', cost: 15 },
      { text: 'After switching back to main with `git switch main`, run `ls` — the file committed on the other branch won\'t appear. That\'s branches working correctly.', cost: 20 },
    ],
  },

  {
    id: 'git-07',
    title: 'Merge Branches',
    category: 'Git',
    difficulty: 'Medium',
    points: 200,
    description: `## Bringing Work Back Together

Once you finish work on a branch, you **merge** it back into \`main\`.

**Basic merge:**
\`\`\`
git switch main
git merge feature-experiment
\`\`\`

Git will either fast-forward (linear history) or create a merge commit.

**What a conflict looks like** — if two branches changed the same line:
\`\`\`
<<<<<<< HEAD
this line is from main
=======
this line is from the branch
>>>>>>> feature-experiment
\`\`\`

Edit the file to keep what you want, delete the markers, then:
\`\`\`
git add conflicted-file.txt
git commit -m "merge: resolve conflict"
\`\`\`

**Practice (no conflict):**
\`\`\`
cd git-practice
git switch main
git merge feature-experiment
ls               experiment.txt is now on main
git log --oneline
echo "flag{merged_successfully}"
\`\`\``,
    flag: 'flag{merged_successfully}',
    hints: [
      { text: 'If you see "Already up to date", the branch was already merged. Create a new branch, add a commit, then try the merge again.', cost: 20 },
      { text: 'After merging, `git log --oneline` shows the commits from both branches in the history. That\'s the whole point — the work is now unified.', cost: 25 },
    ],
  },

  {
    id: 'git-08',
    title: 'Git Diff — What Changed?',
    category: 'Git',
    difficulty: 'Medium',
    points: 175,
    description: `## Seeing Exactly What Is Different

\`git diff\` shows line-by-line what changed. Lines starting with \`+\` were added, lines starting with \`-\` were removed.

**Unstaged changes** (edited but not yet staged):
\`\`\`
git diff
\`\`\`

**Staged changes** (what will go into the next commit):
\`\`\`
git diff --staged
\`\`\`

**Compare two commits:**
\`\`\`
git diff HEAD~1 HEAD     previous commit vs current
git diff abc123 def456   any two commit hashes
\`\`\`

**Practice:**
\`\`\`
cd git-practice
echo "original content" > diff-test.txt
git add diff-test.txt
git commit -m "test: add diff-test file"

echo "modified content" > diff-test.txt
git diff                  see the unstaged change

git add diff-test.txt
git diff --staged          see the staged change

git commit -m "test: update diff-test content"
echo "flag{diff_master}"
\`\`\``,
    flag: 'flag{diff_master}',
    hints: [
      { text: '`git diff` shows changes NOT yet staged. `git diff --staged` shows staged changes. After committing, both show nothing — the working tree is clean.', cost: 20 },
      { text: 'The `@@` line in diff output shows the line numbers where the change happens.', cost: 25 },
    ],
  },

  {
    id: 'git-github-01',
    title: 'Connect to GitHub',
    category: 'Git',
    difficulty: 'Medium',
    points: 200,
    description: `## Setting Up Your GitHub Account

**GitHub** is the most popular platform for hosting Git repositories. It lets you back up code, collaborate with others, and show your work to the world.

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and sign up (free). Choose a professional username — it will appear on your profile.

### Step 2 — Link your account in this app
Go to the **Profile** page of this app and enter your GitHub username in the "GitHub Account" section. Save it.

### Step 3 — Create a repository on GitHub
On GitHub, click the **+** button (top right) then **New repository**:
- Name it exactly: \`byteflag-lab\`
- Set visibility to **Public**
- Check **"Add a README file"**
- Click **Create repository**

### Step 4 — Verify
Click **"Verify on GitHub"** below. The site calls the GitHub API to confirm your repository exists.

> The repository must be **Public** — private repos are not visible to the API without authentication.`,
    githubVerify: {
      type: 'repo-exists',
      repo: 'byteflag-lab',
    },
    flag: '',
    hints: [
      { text: 'Make sure your GitHub username in Profile is spelled exactly right. The repo must be named exactly `byteflag-lab` and be set to Public.', cost: 20 },
      { text: 'If verification fails: 1) Check the username in Profile. 2) Is the repo named `byteflag-lab` exactly? 3) Is it Public (not Private)?', cost: 25 },
    ],
  },

  {
    id: 'git-github-02',
    title: 'Push Your First Commit',
    category: 'Git',
    difficulty: 'Medium',
    points: 225,
    description: `## Getting Local Code onto GitHub

You have a local \`git-practice\` repo and a remote \`byteflag-lab\` repo on GitHub. Let\'s connect and push.

### Option A — Clone the GitHub repo (cleanest start)
\`\`\`
git clone https://github.com/YOUR_USERNAME/byteflag-lab.git
cd byteflag-lab
echo "My first real push!" >> README.md
git add README.md
git commit -m "feat: update README with first message"
git push
\`\`\`

### Option B — Connect your existing local repo
\`\`\`
cd git-practice
git remote add origin https://github.com/YOUR_USERNAME/byteflag-lab.git
git branch -M main
git push -u origin main
\`\`\`

**Useful remote commands:**
\`\`\`
git remote -v        see configured remotes
git push             push current branch to remote
git pull             fetch + merge latest from remote
git fetch            fetch without merging
\`\`\`

After pushing, click **"Verify on GitHub"** below.`,
    githubVerify: {
      type: 'has-commits',
      repo: 'byteflag-lab',
      minCommits: 1,
    },
    flag: '',
    hints: [
      { text: 'Replace `YOUR_USERNAME` with your actual GitHub username. If you initialized the repo with a README on GitHub, it already has one commit — you just need to push at least one more.', cost: 20 },
      { text: 'If `git push` asks for a password, GitHub no longer accepts account passwords for git. Create a Personal Access Token at: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic). Use that token as the password.', cost: 30 },
    ],
  },

  {
    id: 'git-github-03',
    title: 'Conventional Commit on GitHub',
    category: 'Git',
    difficulty: 'Hard',
    points: 275,
    description: `## Committing Like a Professional

**Conventional Commits** is an industry standard. Many tools (changelog generators, release automations) rely on it. The format:
\`\`\`
<type>: <description>
\`\`\`

Valid types: \`feat\`, \`fix\`, \`docs\`, \`style\`, \`refactor\`, \`test\`, \`chore\`

**Examples:**
\`\`\`
feat: add user login page
fix: correct typo in error message
docs: add API reference to README
refactor: simplify authentication middleware
\`\`\`

### Your task

Push a commit to \`byteflag-lab\` where the **commit message starts with a conventional type**:
\`\`\`
cd byteflag-lab
echo "# Changelog" > CHANGELOG.md
git add CHANGELOG.md
git commit -m "docs: add changelog file"
git push
\`\`\`

Verify your commit message with:
\`\`\`
git log --oneline
\`\`\`

Then click **"Verify on GitHub"** below.

### Also set your git identity (so GitHub shows your name on commits)
\`\`\`
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
\`\`\``,
    githubVerify: {
      type: 'commit-message',
      repo: 'byteflag-lab',
      pattern: '^(feat|fix|docs|style|refactor|test|chore)[:(]',
    },
    flag: '',
    hints: [
      { text: 'The commit message must start with `feat:`, `fix:`, `docs:`, etc. — colon immediately after the type, then a space, then the description.', cost: 25 },
      { text: 'Run `git log --oneline` after committing to confirm the message looks right, then `git push` and verify here.', cost: 30 },
    ],
  },


  // ════════════════════════════════════════════════════════════
  // NETWORKING
  // ════════════════════════════════════════════════════════════

  {
    id: 'net-01',
    title: 'Ping Pong',
    category: 'Networking',
    difficulty: 'Easy',
    points: 100,
    description: `## How Computers Talk to Each Other

Your computer is connected (by cable or WiFi) to a **router** in your home. That router connects to your internet provider, which connects to the wider internet — billions of computers linked together in a giant web.

Every device on this network has a unique **IP address** — a number that works like a postal address. When you visit a website, your computer sends tiny packets of data out, they hop through many routers, reach the destination, and the replies come back. This all happens in milliseconds.

## The ping Command

**\`ping\`** is the simplest networking tool. It sends a tiny message to another computer and waits for a reply — like knocking on a door to check if anyone is home. It tells you:

- Is the target reachable?
- How long does the round trip take? (called **latency**, measured in milliseconds)

## How to Run It

**Windows** (open Command Prompt or PowerShell from the Start menu):
\`\`\`
ping -n 4 8.8.8.8
\`\`\`

**macOS / Linux** (open Terminal):
\`\`\`
ping -c 4 8.8.8.8
\`\`\`

The \`-n 4\` / \`-c 4\` flag means "send exactly 4 packets then stop". Without it, ping runs forever — press **Ctrl + C** to stop it.

\`8.8.8.8\` is Google's public DNS server. It is always online and responds to pings.

## Reading the Output

You will see lines like:
\`\`\`
64 bytes from 8.8.8.8: icmp_seq=1 ttl=113 time=12.4 ms
\`\`\`

The important parts:
- **time=** — how many milliseconds the round trip took (lower = faster connection)
- **ttl=** — **Time To Live**: a counter that starts at 64 (Linux/macOS) or 128 (Windows) and drops by 1 at each router the packet passes through. It prevents packets from looping forever.

## Your Task

Run ping, find the **ttl** value in the output, and submit it as \`flag{TTL=<number>}\`.

For example, if the output shows \`ttl=113\`, submit \`flag{TTL=113}\`.

> Your TTL number will depend on your operating system and how many routers are between you and Google. Any real number you observe is correct.`,
    flag: '',
    flagPattern: '^flag\\{TTL=\\d+\\}$',
    flagCaseSensitive: false,
    hints: [
      { text: 'Look at the reply lines for something like `ttl=64` or `TTL=128`. The number after the `=` sign is your answer. Wrap it in `flag{TTL=...}` before submitting.', cost: 10 },
      { text: 'Common values: Linux/macOS start at 64 (you might see 54–64), Windows starts at 128 (you might see 110–128). The number decreases by 1 for each router the packet crosses.', cost: 15 },
    ],
  },

  {
    id: 'net-02',
    title: 'Your IP Address (ipconfig)',
    category: 'Networking',
    difficulty: 'Easy',
    points: 125,
    description: `## What Is an IP Address?

Every device connected to a network needs an **IP address** — a unique number that acts like a mailing address. Without one, data would have no way to find your computer.

An IPv4 address looks like four numbers separated by dots:
\`\`\`
192.168.1.42
\`\`\`

Each number is between 0 and 255. There are about 4 billion possible combinations.

## Private vs Public IP Addresses

You actually have two IP addresses at the same time:

**Private IP** — the address your router assigns to your device inside your home network. Other devices in your house can reach you at this address, but the outside internet cannot. Typical private IP addresses start with \`192.168.\` or \`10.\`

**Public IP** — the address your router uses on the internet. Every device in your house shares this one address with the outside world. Websites see this address when you visit them.

When you run \`ipconfig\`, you see your **private** IP address.

## Finding Your IP Address

### Windows

Open the Start menu and search for **Command Prompt** or **PowerShell**. Click to open it, then type:
\`\`\`
ipconfig
\`\`\`

You will see a lot of output. Look for either:
- **"Ethernet adapter Ethernet"** — if you use a network cable
- **"Wireless LAN adapter Wi-Fi"** — if you use WiFi

Find the line that says **IPv4 Address**:
\`\`\`
   IPv4 Address. . . . . . . . . . . : 192.168.1.42
\`\`\`

That number is your private IP address.

### macOS

Open Terminal (press Cmd + Space, type Terminal, press Enter) and run:
\`\`\`
ipconfig getifaddr en0
\`\`\`

This prints just your WiFi IP address. If you use a cable instead of WiFi, try \`en1\`.

### Linux

Open a terminal and run:
\`\`\`
ip addr
\`\`\`

Look for a line starting with \`inet\` (not \`inet6\`). Your IP will look like \`192.168.x.x/24\` — ignore the \`/24\` part for now.

## What You Will Also See

\`ipconfig\` shows two more values alongside your IP. You will learn what they mean in the next two challenges:
- **Subnet Mask** — defines the size of your local network
- **Default Gateway** — the address of your router

## Your Task

Run the command for your operating system, find your **IPv4 address**, and look at it. Notice what the first numbers are — most home networks use addresses starting with \`192.168.\` or \`10.\`

Then run:
\`\`\`
echo "flag{ip_address_found}"
\`\`\`

Submit what it prints.`,
    flag: 'flag{ip_address_found}',
    hints: [
      { text: 'On Windows: open Command Prompt from the Start menu, type `ipconfig`, then look for "IPv4 Address" under your Wi-Fi or Ethernet adapter section.', cost: 10 },
      { text: 'On Mac: run `ipconfig getifaddr en0` in Terminal. On Linux: run `ip addr` and look for a line starting with `inet` (not `inet6`).', cost: 10 },
    ],
  },

  {
    id: 'net-03',
    title: 'Subnet Mask and Default Gateway',
    category: 'Networking',
    difficulty: 'Easy',
    points: 150,
    description: `## Two More Numbers From ipconfig

When you ran \`ipconfig\` in the last challenge, you saw three values. You learned what the first one (IPv4 Address) means. Now let's understand the other two.

## Subnet Mask — The Size of Your Local Network

A **subnet mask** looks like an IP address but works differently. It tells your computer which other devices are "local" (inside your home network) vs "remote" (out on the internet).

The most common subnet mask is:
\`\`\`
255.255.255.0
\`\`\`

Here is what it means: the parts of your IP address where the mask says **255** identify your **network**. The part where the mask says **0** identifies your **specific device** on that network.

**Example:**
- Your IP: \`192.168.1.42\`
- Subnet Mask: \`255.255.255.0\`
- Your network is \`192.168.1.\` — any device with an address starting with those three numbers is on the same local network as you
- Your device's number within that network is \`42\`

So if another device has address \`192.168.1.55\`, your computer knows it's local and can talk to it directly. If the address is \`74.125.200.1\`, it knows that's remote and sends data to the gateway first.

## Default Gateway — The Door to the Internet

The **default gateway** is your router's IP address on your local network. Whenever your computer wants to reach something on the internet (outside your home), it sends the data to the gateway first, and the router forwards it onward.

Think of the gateway as the post office for your neighborhood. All mail going outside the neighborhood goes through it.

The gateway address is usually the same as your IP but with \`1\` at the end. For example, if your IP is \`192.168.1.42\`, your gateway is probably \`192.168.1.1\`.

## Your Task

**Step 1 — Find your gateway**

Run \`ipconfig\` (Windows) or \`ip route show default\` (Mac/Linux) and write down your **Default Gateway** address.

**Step 2 — Ping your gateway**

Test that your computer can reach your router:

Windows:
\`\`\`
ping -n 4 192.168.1.1
\`\`\`

macOS / Linux:
\`\`\`
ping -c 4 192.168.1.1
\`\`\`

Replace \`192.168.1.1\` with **your actual gateway address** from Step 1.

If you get replies, your computer is properly connected to your local network. If you get "Request timed out" or similar, your network connection may have an issue.

**Step 3** — Run:
\`\`\`
echo "flag{gateway_pinged}"
\`\`\`

Submit what it prints.`,
    flag: 'flag{gateway_pinged}',
    hints: [
      { text: 'On Windows, run `ipconfig` and look for "Default Gateway" under your adapter section. On Mac/Linux, run `ip route show default` and look for the address after the word "via".', cost: 15 },
      { text: 'Your gateway is almost always the same as your IP address but with the last number changed to 1. For example, if your IP is `192.168.0.54`, try pinging `192.168.0.1`.', cost: 20 },
    ],
  },

  {
    id: 'net-04',
    title: 'DNS — The Internet\'s Phone Book',
    category: 'Networking',
    difficulty: 'Medium',
    points: 175,
    description: `## You Type Names. Computers Need Numbers.

When you type \`google.com\` into your browser, your computer has no idea where to find it. Computers communicate using IP addresses like \`142.250.80.78\`, not names.

**DNS (Domain Name System)** is the system that translates human-readable names like \`google.com\` into IP addresses. It is like a phone book where you look up a name and get back a number to dial.

## How DNS Works, Step by Step

Every time you visit a website, your computer silently does this:

1. You type \`google.com\` and press Enter
2. Your computer asks a **DNS server**: "What is the IP address for google.com?"
3. The DNS server looks it up in its database
4. The DNS server replies: "142.250.80.78"
5. Your computer connects to \`142.250.80.78\`
6. The webpage loads

This entire process usually takes less than 50 milliseconds. You never notice it happening.

Your computer is configured to use a specific DNS server — usually your router, which then asks your internet provider's DNS server. You can also use public DNS servers: \`8.8.8.8\` (Google) or \`1.1.1.1\` (Cloudflare).

## The nslookup Command

**\`nslookup\`** lets you manually ask a DNS server to look up a name — so you can see exactly what your computer does automatically.

Basic usage:
\`\`\`
nslookup google.com
\`\`\`

Example output:
\`\`\`
Server:  192.168.1.1
Address: 192.168.1.1#53

Non-authoritative answer:
Name:    google.com
Address: 142.250.80.78
\`\`\`

- **Server** — the DNS server that answered your query (your router in this case)
- **Address** — the IP address(es) that correspond to the name

## Reverse DNS — Going the Other Way

You can also look up a name from an IP address. This is called a **reverse DNS lookup**:
\`\`\`
nslookup 1.1.1.1
\`\`\`

This asks: "What name belongs to the IP address \`1.1.1.1\`?"

\`1.1.1.1\` is Cloudflare's public DNS server. It has a well-known reverse DNS name.

## Your Task

**Step 1 — Look up a few websites**

Try looking up these domain names and notice that each gives a different IP address:
\`\`\`
nslookup cloudflare.com
nslookup github.com
nslookup bbc.co.uk
\`\`\`

**Step 2 — Do a reverse lookup**

Now look up what name belongs to Cloudflare's famous IP address:
\`\`\`
nslookup 1.1.1.1
\`\`\`

In the output, find the **Name** field. It will tell you the human-readable name for that IP address.

**Step 3 — Submit the flag**

The name that comes back is your flag. Wrap it in \`flag{...}\` and submit. For example, if the Name is \`example.hostname.com\`, submit \`flag{example.hostname.com}\`.`,
    flag: 'flag{one.one.one.one}',
    flagCaseSensitive: false,
    hints: [
      { text: 'Run `nslookup 1.1.1.1` and look at the "Name:" line in the output. Cloudflare named their DNS server after its own IP address in words. Wrap that name in `flag{...}` to submit.', cost: 20 },
      { text: 'The name for 1.1.1.1 is very literal — it spells out "one dot one dot one dot one" using the word "one" and actual dots. Submit it as `flag{one.one.one.one}`.', cost: 30 },
    ],
  },

  {
    id: 'net-05',
    title: 'Traceroute — Following the Path',
    category: 'Networking',
    difficulty: 'Medium',
    points: 200,
    description: `## Data Doesn't Travel in a Straight Line

When you send data across the internet, it doesn't go directly from your computer to the destination. It hops through many **routers** — specialized computers whose only job is to receive data packets and forward them one step closer to their destination.

A typical path from your computer to a website might look like:

\`\`\`
Your computer
  → Your router (at home)
    → Your ISP's router
      → A backbone router in your city
        → A backbone router in another country
          → The website's server
\`\`\`

Each step in that journey is called a **hop**.

## The traceroute Command

**\`traceroute\`** (or \`tracert\` on Windows) reveals the full path your data takes. It sends special packets designed to "expire" at each router along the way. Each router that receives an expired packet sends back an error message — which reveals its IP address and location.

### How to Run It

**Windows** (Command Prompt or PowerShell):
\`\`\`
tracert 8.8.8.8
\`\`\`

**macOS / Linux** (Terminal):
\`\`\`
traceroute 8.8.8.8
\`\`\`

> If \`traceroute\` is not installed on Linux, run: \`sudo apt install traceroute\`

### Reading the Output

\`\`\`
 1    1 ms    1 ms    1 ms   192.168.1.1
 2    8 ms    7 ms    8 ms   10.0.0.1
 3   12 ms   12 ms   11 ms   72.14.201.1
 4   13 ms   13 ms   12 ms   8.8.8.8
\`\`\`

Each numbered line is one router (one hop). Reading left to right:
- **Number** — which hop this is (1 = first router, your gateway)
- **Three time values** — three separate measurements in milliseconds. Traceroute sends 3 probes to each hop so you can see if the timing is consistent
- **IP address** — the router's address

An asterisk \`*\` means that router did not respond. This is normal — some routers are configured to ignore traceroute probes for security reasons. It does not mean the connection is broken.

## Your Task

**Step 1 — Run traceroute to Google's DNS**

Windows:
\`\`\`
tracert 8.8.8.8
\`\`\`

macOS / Linux:
\`\`\`
traceroute 8.8.8.8
\`\`\`

Wait for it to finish (it may take 20–30 seconds).

**Step 2 — Understand what you see**

Look at the first hop (line 1). That IP address should match your **Default Gateway** from the previous challenge — it is your home router.

Count how many hops it takes in total before reaching \`8.8.8.8\`. Most home connections take between 8 and 20 hops.

**Step 3 — Try a more distant destination**

Compare the path to something geographically far from you:
\`\`\`
tracert 1.1.1.1
\`\`\`

Notice whether it takes more or fewer hops, and whether the times are higher or lower.

**Step 4** — Run:
\`\`\`
echo "flag{traced_the_route}"
\`\`\`

Submit what it prints.`,
    flag: 'flag{traced_the_route}',
    hints: [
      { text: 'The command is `tracert` on Windows and `traceroute` on Mac/Linux. If it hangs forever, press Ctrl+C to stop it. Some destinations block traceroute — try `8.8.8.8` which always works.', cost: 15 },
      { text: 'Hop 1 is always your home router (gateway). You can see its IP there. If many hops show `* * *`, that\'s fine — those routers are just hiding themselves. The connection is still working.', cost: 20 },
    ],
  },

];


// ================================================================
// CATEGORY METADATA — add an entry here when adding a new category
// ================================================================

const CAT_META = {
  Terminal:   { color: 'violet', icon: '$>' },
  Git:        { color: 'orange', icon: '⎇'  },
  Networking: { color: 'cyan',   icon: '⬡'  },
  Web:        { color: 'pink',   icon: '{}'  },
  Files:      { color: 'amber',  icon: '⊞'  },
  Python:     { color: 'green',  icon: 'Py' },
};
