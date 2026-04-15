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
//   points: 100,                // Easy≈100  Medium≈200  Hard≈300
//   description: `markdown`,    // supports **bold**, `code`, ```blocks```, ## headings
//   flag: 'flag{answer}',
//   flagCaseSensitive: true,    // optional, default true; false = case-insensitive match
//   hints: [
//     { text: 'First hint',  cost: 10 },
//     { text: 'Second hint', cost: 25 },
//   ],
//   videoHint: { url: 'https://www.youtube.com/embed/VIDEO_ID', cost: 50 },
// }
// ================================================================

const CHALLENGES = [

  // ── PLACEHOLDER 1 ── replace with real content ──────────────
  {
    id: 'terminal-01',
    title: 'Hello, Terminal! [placeholder]',
    category: 'Terminal',
    difficulty: 'Easy',
    points: 100,
    description: `## Your First Command

**This is a placeholder challenge.** Edit the CHALLENGES array in challenges.js to replace it.

The terminal is your most powerful tool as a developer. Let's start simple.

Run this command and submit exactly what it prints:

\`\`\`
echo "flag{hello_terminal}"
\`\`\`

Copy the output (without quotes) into the flag field below.`,
    flag: 'flag{hello_terminal}',
    flagCaseSensitive: true,
    hints: [
      { text: 'Open a terminal: on Linux/macOS search for "Terminal"; on Windows use cmd or PowerShell.', cost: 10 },
      { text: 'Type the command exactly as shown and press Enter. The printed line is your flag.', cost: 15 },
    ],
    videoHint: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', cost: 40 },
  },

  // ── PLACEHOLDER 2 ── replace with real content ──────────────
  {
    id: 'git-01',
    title: 'First Commit [placeholder]',
    category: 'Git',
    difficulty: 'Easy',
    points: 100,
    description: `## Initialize a Repository

**This is a placeholder challenge.** Edit the CHALLENGES array in challenges.js to replace it.

Version control is essential. Let's create your first Git repository.

1. Create a directory and enter it: \`mkdir my-project && cd my-project\`
2. Initialize Git: \`git init\`
3. Create a file: \`echo "Hello" > README.md\`
4. Stage it: \`git add README.md\`
5. Commit: \`git commit -m "Initial commit"\`

The commit output shows a short hash in brackets, like \`[main (root-commit) a1b2c3d]\`.
Submit it as \`flag{a1b2c3d}\` (with your actual hash).`,
    flag: '',
    flagCaseSensitive: false,
    hints: [
      { text: 'After `git commit`, look at the first output line — the short hash is in brackets after "root-commit".', cost: 15 },
      { text: 'Your hash differs from everyone else\'s — ask your instructor how this challenge is graded in your cohort.', cost: 20 },
    ],
    videoHint: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', cost: 50 },
  },

  // ── PLACEHOLDER 3 ── replace with real content ──────────────
  {
    id: 'net-01',
    title: 'Ping Pong [placeholder]',
    category: 'Networking',
    difficulty: 'Medium',
    points: 200,
    description: `## The Ping Command

**This is a placeholder challenge.** Edit the CHALLENGES array in challenges.js to replace it.

\`ping\` sends ICMP echo requests and measures round-trip time.

Run one ping to Google's DNS server and find the **TTL value** in the response:

\`\`\`
ping -c 1 8.8.8.8
\`\`\`

*(Windows: \`ping -n 1 8.8.8.8\`)*

Submit as \`flag{TTL=<value>}\`. Example: if TTL is 64, submit \`flag{TTL=64}\``,
    flag: 'flag{TTL=64}',
    flagCaseSensitive: false,
    hints: [
      { text: 'Look at the response line — it contains something like `ttl=64` or `TTL=128`.', cost: 20 },
      { text: 'Common TTL starting values: Linux=64, Windows=128, routers=255. The value depends on the path to the server.', cost: 30 },
    ],
    videoHint: { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', cost: 75 },
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
