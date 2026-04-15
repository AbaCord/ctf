// app.js — React components and application logic
// Depends on: CHALLENGES and CAT_META defined in challenges.js

const { useState, useEffect, useRef } = React;

// ================================================================
// COLOR PALETTE
// ================================================================

const COLORS = {
  violet:  { bg: 'bg-violet-500/20', text: 'text-violet-300', border: 'border-violet-500/30', bar: 'bg-violet-400'  },
  orange:  { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-500/30', bar: 'bg-orange-400'  },
  cyan:    { bg: 'bg-cyan-500/20',   text: 'text-cyan-300',   border: 'border-cyan-500/30',   bar: 'bg-cyan-400'    },
  pink:    { bg: 'bg-pink-500/20',   text: 'text-pink-300',   border: 'border-pink-500/30',   bar: 'bg-pink-400'    },
  amber:   { bg: 'bg-amber-500/20',  text: 'text-amber-300',  border: 'border-amber-500/30',  bar: 'bg-amber-400'   },
  green:   { bg: 'bg-green-500/20',  text: 'text-green-300',  border: 'border-green-500/30',  bar: 'bg-green-400'   },
  emerald: { bg: 'bg-emerald-500/20',text: 'text-emerald-300',border: 'border-emerald-500/30',bar: 'bg-emerald-400' },
  red:     { bg: 'bg-red-500/20',    text: 'text-red-300',    border: 'border-red-500/30',    bar: 'bg-red-400'     },
  slate:   { bg: 'bg-slate-800',     text: 'text-slate-300',  border: 'border-slate-700',     bar: 'bg-slate-500'   },
};

const DIFF_COLOR = { Easy: 'emerald', Medium: 'amber', Hard: 'red' };

function catColors(category) {
  const meta = CAT_META[category] || { color: 'cyan' };
  return COLORS[meta.color] || COLORS.cyan;
}

function diffColors(difficulty) {
  return COLORS[DIFF_COLOR[difficulty]] || COLORS.emerald;
}

// ================================================================
// PROGRESS — stored in localStorage
// ================================================================

function emptyProgress() {
  return { solved: {}, hints: {}, videos: [] };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem('byteflag-v1');
    return raw ? JSON.parse(raw) : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

function saveProgress(prog) {
  try { localStorage.setItem('byteflag-v1', JSON.stringify(prog)); } catch {}
}

function calcTotalScore(prog) {
  const earned = Object.values(prog.solved).reduce((sum, v) => sum + v.pts, 0);
  return Math.max(0, earned - calcHintSpend(prog));
}

function calcHintSpend(prog) {
  let total = 0;
  Object.entries(prog.hints).forEach(([id, indices]) => {
    const ch = CHALLENGES.find(c => c.id === id);
    if (ch) indices.forEach(i => { if (ch.hints[i]) total += ch.hints[i].cost; });
  });
  prog.videos.forEach(id => {
    const ch = CHALLENGES.find(c => c.id === id);
    if (ch && ch.videoHint) total += ch.videoHint.cost;
  });
  return total;
}

function calcCatStats(prog) {
  const stats = {};
  CHALLENGES.forEach(ch => {
    if (!stats[ch.category]) stats[ch.category] = { total: 0, solved: 0 };
    stats[ch.category].total++;
    if (prog.solved[ch.id]) stats[ch.category].solved++;
  });
  return stats;
}

function checkFlag(challenge, input) {
  const expected = challenge.flag.trim();
  const attempt  = input.trim();
  if (!expected) return false;
  return challenge.flagCaseSensitive === false
    ? expected.toLowerCase() === attempt.toLowerCase()
    : expected === attempt;
}

// ================================================================
// MARKDOWN RENDERER
// ================================================================

function Markdown({ text }) {
  if (!text) return null;
  const lines = text.split('\n');
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim().startsWith('```')) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={i} className="bg-slate-900 border border-slate-700 rounded-lg p-4 my-3 overflow-x-auto font-mono text-sm text-emerald-300 leading-relaxed">
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-lg font-semibold text-white mt-4 mb-2">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-base font-semibold text-slate-200 mt-3 mb-1">{line.slice(4)}</h3>);
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(<p key={i} className="text-slate-300 leading-relaxed mb-1">{inlineFormat(line)}</p>);
    }
    i++;
  }
  return <>{elements}</>;
}

function inlineFormat(text) {
  const parts = [];
  let key = 0;
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let match;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[1];
    if (token.startsWith('**')) {
      parts.push(<strong key={key++} className="text-white font-semibold">{token.slice(2, -2)}</strong>);
    } else {
      parts.push(<code key={key++} className="bg-slate-800 text-emerald-300 font-mono text-[0.8em] px-1.5 py-0.5 rounded">{token.slice(1, -1)}</code>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// ================================================================
// SHARED COMPONENTS
// ================================================================

function Badge({ label, colors, small }) {
  const size = small ? 'text-[10px] px-1.5 py-0' : 'text-xs px-2 py-0.5';
  return (
    <span className={`inline-flex items-center rounded-full font-mono font-medium border ${size} ${colors.bg} ${colors.text} ${colors.border}`}>
      {label}
    </span>
  );
}

function ProgressBar({ pct, barClass }) {
  return (
    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-500 ${barClass}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

// ================================================================
// NAVIGATION
// ================================================================

function Nav({ page, go, score, solved }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [['dashboard', 'Dashboard'], ['challenges', 'Challenges'], ['profile', 'Profile']];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        <button onClick={() => go('dashboard')}
          className="font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2 text-lg shrink-0">
          <span>⚑</span><span className="tracking-tight">ByteFlag</span>
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {links.map(([id, label]) => (
            <button key={id} onClick={() => go(id)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                page === id
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}>
              {label}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-3 py-1 font-mono text-sm shrink-0">
          <span className="text-emerald-400 font-bold">{score}</span>
          <span className="text-slate-600">pts</span>
          <span className="w-px h-3 bg-slate-700" />
          <span className="text-slate-300">{solved}</span>
          <span className="text-slate-600">solved</span>
        </div>

        <button className="sm:hidden text-slate-400 p-1" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-900 px-4 py-2 space-y-1">
          {links.map(([id, label]) => (
            <button key={id} onClick={() => { go(id); setMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                page === id ? 'bg-emerald-500/15 text-emerald-300' : 'text-slate-400'
              }`}>
              {label}
            </button>
          ))}
          <div className="px-3 py-2 font-mono text-sm text-slate-400">{score} pts · {solved} solved</div>
        </div>
      )}
    </nav>
  );
}

// ================================================================
// DASHBOARD
// ================================================================

function Dashboard({ prog, go, pick }) {
  const score   = calcTotalScore(prog);
  const solved  = Object.keys(prog.solved).length;
  const total   = CHALLENGES.length;
  const pct     = total ? Math.round(solved / total * 100) : 0;
  const cats    = calcCatStats(prog);

  const recent = Object.entries(prog.solved)
    .map(([id, d]) => ({ id, ...d }))
    .sort((a, b) => new Date(b.solvedAt) - new Date(a.solvedAt))
    .slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Score',    value: score,              color: 'text-emerald-400' },
          { label: 'Solved',   value: `${solved}/${total}`,color: 'text-blue-400'   },
          { label: 'Done',     value: `${pct}%`,          color: 'text-violet-400'  },
          { label: 'Pts Spent',value: calcHintSpend(prog), color: 'text-amber-400'  },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className={`text-2xl font-mono font-bold ${s.color}`}>{s.value}</div>
            <div className="text-slate-500 text-xs mt-1 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Overall progress bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex justify-between mb-2">
          <span className="text-slate-500 uppercase tracking-wider text-xs font-medium">Overall Progress</span>
          <span className="font-mono text-emerald-400 text-sm">{pct}%</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-700"
               style={{ width: `${pct}%` }} />
        </div>
        {pct === 0 && (
          <p className="text-slate-700 text-xs mt-2 font-mono">
            # no challenges solved yet —{' '}
            <button className="text-emerald-700 hover:text-emerald-500" onClick={() => go('challenges')}>start here</button>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Per-category bars */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">Categories</h2>
          <div className="space-y-3">
            {Object.keys(cats).length === 0
              ? <p className="text-slate-700 text-sm">No challenges loaded.</p>
              : Object.entries(cats).map(([cat, st]) => {
                  const c = catColors(cat);
                  const p = st.total ? Math.round(st.solved / st.total * 100) : 0;
                  return (
                    <div key={cat}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-[10px] font-bold w-6 h-6 rounded flex items-center justify-center ${c.bg} ${c.text}`}>
                            {(CAT_META[cat] || { icon: '?' }).icon}
                          </span>
                          <span className="text-sm text-slate-300">{cat}</span>
                        </div>
                        <span className="text-xs font-mono text-slate-500">{st.solved}/{st.total}</span>
                      </div>
                      <ProgressBar pct={p} barClass={c.bar} />
                    </div>
                  );
                })
            }
          </div>
        </div>

        {/* Recent solves */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">Recent Solves</h2>
          {recent.length > 0 ? (
            <div className="space-y-2">
              {recent.map(item => {
                const ch = CHALLENGES.find(c => c.id === item.id);
                if (!ch) return null;
                return (
                  <button key={item.id} onClick={() => { pick(ch.id); go('challenge'); }}
                    className="w-full text-left flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 hover:bg-slate-800 transition-colors">
                    <span className="text-emerald-400 shrink-0">✓</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-200 truncate">{ch.title}</div>
                      <div className="text-xs text-slate-600">{ch.category} · {new Date(item.solvedAt).toLocaleDateString()}</div>
                    </div>
                    <span className="font-mono text-sm text-emerald-400 shrink-0">+{item.pts}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-3xl mb-3 opacity-20">⚑</div>
              <p className="text-slate-600 text-sm">Nothing yet.</p>
              <button onClick={() => go('challenges')}
                className="mt-3 text-emerald-700 hover:text-emerald-500 text-sm transition-colors">
                Browse challenges →
              </button>
            </div>
          )}
        </div>

      </div>

      <div className="flex gap-3 justify-center flex-wrap pt-2">
        <button onClick={() => go('challenges')}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm">
          Browse Challenges
        </button>
        <button onClick={() => go('profile')}
          className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm">
          View Profile
        </button>
      </div>
    </div>
  );
}

// ================================================================
// CHALLENGE LIST
// ================================================================

function ChallengeList({ prog, pick, go }) {
  const [catFilter,  setCatFilter]  = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');
  const [search,     setSearch]     = useState('');

  const categories   = ['all', ...new Set(CHALLENGES.map(c => c.category))];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const filtered = CHALLENGES.filter(ch => {
    if (catFilter  !== 'all' && ch.category  !== catFilter)  return false;
    if (diffFilter !== 'all' && ch.difficulty !== diffFilter) return false;
    if (search && !ch.title.toLowerCase().includes(search.toLowerCase())
               && !ch.category.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Challenges</h1>
        <p className="text-slate-500 text-sm mt-1 font-mono">
          {CHALLENGES.length} total · {Object.keys(prog.solved).length} solved
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-44">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-600 transition-colors" />
        </div>
        <FilterRow options={categories}   active={catFilter}  set={setCatFilter}  />
        <FilterRow options={difficulties} active={diffFilter} set={setDiffFilter} />
      </div>

      {filtered.length === 0
        ? <div className="text-center py-16 text-slate-600"><div className="text-3xl mb-3">⊘</div><p>No matches.</p></div>
        : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(ch => <ChallengeCard key={ch.id} ch={ch} prog={prog} pick={pick} go={go} />)}
          </div>
      }
    </div>
  );
}

function FilterRow({ options, active, set }) {
  return (
    <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 flex-wrap">
      {options.map(o => (
        <button key={o} onClick={() => set(o)}
          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
            active === o ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'
          }`}>
          {o === 'all' ? 'All' : o}
        </button>
      ))}
    </div>
  );
}

function ChallengeCard({ ch, prog, pick, go }) {
  const solved = !!prog.solved[ch.id];
  const c = catColors(ch.category);
  const d = diffColors(ch.difficulty);
  const hintCount = (ch.hints?.length || 0) + (ch.videoHint ? 1 : 0);

  return (
    <button onClick={() => { pick(ch.id); go('challenge'); }}
      className={`text-left bg-slate-900 border rounded-xl p-4 transition-all card-hover ${
        solved ? 'border-emerald-600/40 bg-emerald-950/20' : 'border-slate-800 hover:border-slate-700'
      }`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex gap-1.5 flex-wrap">
          <Badge label={ch.category}   colors={c} />
          <Badge label={ch.difficulty} colors={d} />
        </div>
        {solved && <span className="text-emerald-400 text-base shrink-0">✓</span>}
      </div>
      <h3 className="font-semibold text-slate-100 mb-1 leading-snug text-sm">{ch.title}</h3>
      <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
        {ch.description.replace(/[#`*_]/g, '').trim().slice(0, 90)}…
      </p>
      <div className="flex items-center justify-between">
        <span className={`font-mono text-sm font-bold ${solved ? 'text-emerald-400' : 'text-slate-400'}`}>
          {solved ? `+${prog.solved[ch.id].pts} earned` : `${ch.points} pts`}
        </span>
        {hintCount > 0 && <span className="text-xs text-slate-700">{hintCount} hints</span>}
      </div>
    </button>
  );
}

// ================================================================
// CHALLENGE DETAIL
// ================================================================

function ChallengeDetail({ id, prog, onSolve, onHint, onVideo, go }) {
  const ch = CHALLENGES.find(c => c.id === id);
  const [input,   setInput]   = useState('');
  const [status,  setStatus]  = useState(null); // null | 'ok' | 'bad'
  const [shakeKey, setShakeKey] = useState(0);
  const [confirm, setConfirm] = useState(null); // null | hint-index | 'video'

  if (!ch) return <div className="text-center py-20 text-slate-600">Challenge not found.</div>;

  const solved       = !!prog.solved[id];
  const unlockedHints = prog.hints[id] || [];
  const videoUnlocked = prog.videos.includes(id);
  const score        = calcTotalScore(prog);

  function handleSubmit(e) {
    e.preventDefault();
    if (solved) return;
    if (checkFlag(ch, input)) {
      setStatus('ok');
      onSolve(id);
    } else {
      setStatus('bad');
      setShakeKey(k => k + 1);
      setTimeout(() => setStatus(null), 2000);
    }
  }

  function handleHintReveal(idx) {
    const cost = ch.hints[idx].cost;
    if (score < cost) { alert(`Need ${cost} pts — you have ${score}.`); setConfirm(null); return; }
    onHint(id, idx);
    setConfirm(null);
  }

  function handleVideoReveal() {
    const cost = ch.videoHint.cost;
    if (score < cost) { alert(`Need ${cost} pts — you have ${score}.`); setConfirm(null); return; }
    onVideo(id);
    setConfirm(null);
  }

  const c = catColors(ch.category);
  const d = diffColors(ch.difficulty);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Back link */}
      <button onClick={() => go('challenges')}
        className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-sm mb-6 transition-colors group">
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to challenges
      </button>

      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-5">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge label={ch.category}   colors={c} />
          <Badge label={ch.difficulty} colors={d} />
          <Badge label={`${ch.points} pts`} colors={COLORS.slate} />
          {solved && <Badge label="SOLVED ✓" colors={{ bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/30' }} />}
        </div>
        <h1 className="text-xl font-bold text-white leading-snug">{ch.title}</h1>
      </div>

      {/* Description */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-5">
        <div className="text-xs text-slate-600 uppercase tracking-wider font-medium mb-4">Problem Statement</div>
        <Markdown text={ch.description} />
      </div>

      {/* Flag submission */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-5">
        <div className="text-xs text-slate-600 uppercase tracking-wider font-medium mb-4">Submit Flag</div>
        {solved ? (
          <div className="flex items-center gap-3 p-4 bg-emerald-950/60 border border-emerald-700/40 rounded-lg">
            <span className="text-emerald-400 text-2xl">✓</span>
            <div>
              <div className="text-emerald-300 font-semibold">Solved!</div>
              <div className="text-emerald-600 text-sm font-mono">+{prog.solved[id].pts} points earned</div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div key={shakeKey} className={status === 'bad' ? 'shake' : ''}>
              <input
                value={input} onChange={e => setInput(e.target.value)}
                placeholder="flag{...}" autoComplete="off" spellCheck="false"
                className={`w-full font-mono bg-slate-950 border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors ${
                  status === 'bad' ? 'border-red-600 text-red-300'     :
                  status === 'ok'  ? 'border-emerald-500 text-emerald-300' :
                  'border-slate-700 text-slate-100 focus:border-emerald-600'
                }`}
              />
            </div>
            {status === 'bad' && <p className="text-red-400 text-sm">✗ Incorrect — try again or use a hint.</p>}
            <button type="submit" disabled={!input.trim()}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-slate-950 font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
              Submit
            </button>
          </form>
        )}
      </div>

      {/* Hints */}
      {((ch.hints?.length || 0) > 0 || ch.videoHint) && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="text-xs text-slate-600 uppercase tracking-wider font-medium mb-1">Hints</div>
          <p className="text-slate-700 text-xs mb-4">Unlocking hints deducts from your total score.</p>
          <div className="space-y-2">

            {(ch.hints || []).map((hint, idx) => {
              const isUnlocked = unlockedHints.includes(idx);
              const isAvailable = !isUnlocked && (idx === 0 || unlockedHints.includes(idx - 1));
              const isLocked    = !isUnlocked && !isAvailable;

              if (isUnlocked) return (
                <div key={idx} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-amber-400 text-xs font-mono font-bold">HINT {idx + 1}</span>
                    <span className="text-slate-600 text-xs">−{hint.cost} pts</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{hint.text}</p>
                </div>
              );

              if (isLocked) return (
                <div key={idx} className="p-4 rounded-lg border border-slate-800 opacity-40">
                  <span className="text-slate-600 text-sm">🔒 Hint {idx + 1} — unlock previous hint first</span>
                </div>
              );

              if (confirm === idx) return (
                <div key={idx} className="p-4 rounded-lg bg-slate-800/50 border border-amber-800/40">
                  <p className="text-slate-300 text-sm mb-3">
                    Unlock Hint {idx + 1} for{' '}
                    <span className="font-mono text-amber-400 font-bold">−{hint.cost} pts</span>?
                  </p>
                  <div className="flex gap-2">
                    <button onClick={() => handleHintReveal(idx)}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-1.5 rounded-md text-sm">
                      Unlock
                    </button>
                    <button onClick={() => setConfirm(null)}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-1.5 rounded-md text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              );

              return (
                <button key={idx} onClick={() => setConfirm(idx)}
                  className="w-full text-left p-4 rounded-lg border border-slate-700 hover:border-slate-600 hover:bg-slate-800/40 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-600 text-base">💡</span>
                    <span className="text-slate-400 group-hover:text-slate-300 text-sm transition-colors">Hint {idx + 1}</span>
                  </div>
                  <span className="font-mono text-xs text-amber-600 border border-amber-900/50 rounded px-2 py-0.5">
                    −{hint.cost} pts
                  </span>
                </button>
              );
            })}

            {/* Video hint */}
            {ch.videoHint && (
              videoUnlocked ? (
                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-red-400 text-xs font-mono font-bold">VIDEO WALKTHROUGH</span>
                    <span className="text-slate-600 text-xs">−{ch.videoHint.cost} pts</span>
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden bg-black">
                    <iframe src={ch.videoHint.url} className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen title="Walkthrough" />
                  </div>
                </div>
              ) : confirm === 'video' ? (
                <div className="p-4 rounded-lg bg-slate-800/50 border border-red-900/40">
                  <p className="text-slate-200 text-sm font-medium mb-1">⚠ Full solution video</p>
                  <p className="text-slate-400 text-sm mb-3">
                    Costs <span className="font-mono text-red-400 font-bold">−{ch.videoHint.cost} pts</span>.
                    Consider trying the text hints first.
                  </p>
                  <div className="flex gap-2">
                    <button onClick={handleVideoReveal}
                      className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-1.5 rounded-md text-sm">
                      Unlock Video
                    </button>
                    <button onClick={() => setConfirm(null)}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-1.5 rounded-md text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setConfirm('video')}
                  className="w-full text-left p-4 rounded-lg border border-slate-700 hover:border-slate-600 hover:bg-slate-800/40 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span className="text-red-600 text-base">▶</span>
                    <div>
                      <span className="text-slate-400 group-hover:text-slate-300 text-sm transition-colors block">
                        Video Walkthrough
                      </span>
                      <span className="text-slate-700 text-xs">Full solution — last resort</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-red-700 border border-red-900/50 rounded px-2 py-0.5">
                    −{ch.videoHint.cost} pts
                  </span>
                </button>
              )
            )}

          </div>
        </div>
      )}
    </div>
  );
}

// ================================================================
// PROFILE
// ================================================================

function Profile({ prog, onReset }) {
  const [confirmReset, setConfirmReset] = useState(false);

  const score    = calcTotalScore(prog);
  const spent    = calcHintSpend(prog);
  const cats     = calcCatStats(prog);
  const hintCount = Object.values(prog.hints).reduce((s, a) => s + a.length, 0) + prog.videos.length;

  const solvedList = Object.entries(prog.solved)
    .map(([id, d]) => {
      const ch = CHALLENGES.find(c => c.id === id);
      return ch ? { ...ch, ...d } : null;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.solvedAt) - new Date(a.solvedAt));

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Your progress and statistics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Net Score',  value: score,      color: 'text-emerald-400' },
          { label: 'Solved',     value: solvedList.length, color: 'text-blue-400' },
          { label: 'Pts Spent',  value: spent,      color: 'text-amber-400'  },
          { label: 'Hints Used', value: hintCount,  color: 'text-violet-400' },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className={`text-2xl font-mono font-bold ${s.color}`}>{s.value}</div>
            <div className="text-slate-500 text-xs mt-1 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Category progress */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">Category Progress</h2>
        <div className="space-y-4">
          {Object.entries(cats).map(([cat, st]) => {
            const c = catColors(cat);
            const p = st.total ? Math.round(st.solved / st.total * 100) : 0;
            return (
              <div key={cat}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-[10px] font-bold w-7 h-7 rounded-md flex items-center justify-center ${c.bg} ${c.text}`}>
                      {(CAT_META[cat] || { icon: '?' }).icon}
                    </span>
                    <span className="text-sm font-medium text-slate-200">{cat}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {st.solved}/{st.total} <span className="text-slate-700">({p}%)</span>
                  </span>
                </div>
                <ProgressBar pct={p} barClass={c.bar} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Solved list */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4">
          Solved ({solvedList.length})
        </h2>
        {solvedList.length > 0 ? (
          <div className="space-y-2">
            {solvedList.map(ch => (
              <div key={ch.id} className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-lg">
                <span className="text-emerald-400 shrink-0">✓</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-200 truncate">{ch.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge label={ch.category}   colors={catColors(ch.category)}  small />
                    <Badge label={ch.difficulty} colors={diffColors(ch.difficulty)} small />
                    <span className="text-slate-700 text-xs">{new Date(ch.solvedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <span className="font-mono text-sm text-emerald-400 shrink-0">+{ch.pts}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-700 text-sm text-center py-6">Nothing solved yet.</p>
        )}
      </div>

      {/* Reset */}
      <div className="bg-slate-900 border border-red-950/60 rounded-xl p-5">
        <h2 className="text-xs font-medium text-red-800 uppercase tracking-wider mb-3">Danger Zone</h2>
        {confirmReset ? (
          <div>
            <p className="text-slate-400 text-sm mb-3">This erases all progress permanently.</p>
            <div className="flex gap-2">
              <button onClick={() => { onReset(); setConfirmReset(false); }}
                className="bg-red-700 hover:bg-red-600 text-white font-semibold px-4 py-1.5 rounded-md text-sm">
                Yes, reset
              </button>
              <button onClick={() => setConfirmReset(false)}
                className="bg-slate-700 text-slate-300 px-4 py-1.5 rounded-md text-sm">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setConfirmReset(true)}
            className="text-red-800 hover:text-red-600 text-sm border border-red-950 hover:border-red-900 px-4 py-1.5 rounded-md transition-colors">
            Reset all progress
          </button>
        )}
      </div>
    </div>
  );
}

// ================================================================
// APP ROOT
// ================================================================

function App() {
  const [page,  setPage]  = useState('dashboard');
  const [selId, setSelId] = useState(null);
  const [prog,  setProg]  = useState(loadProgress);

  useEffect(() => { saveProgress(prog); }, [prog]);

  function go(p) {
    setPage(p);
    if (p !== 'challenge') setSelId(null);
  }

  function updateProg(fn) {
    setProg(prev => fn(prev));
  }

  function handleSolve(id) {
    updateProg(prev => {
      if (prev.solved[id]) return prev;
      const ch = CHALLENGES.find(c => c.id === id);
      return { ...prev, solved: { ...prev.solved, [id]: { solvedAt: new Date().toISOString(), pts: ch.points } } };
    });
  }

  function handleHint(id, idx) {
    updateProg(prev => {
      const existing = prev.hints[id] || [];
      if (existing.includes(idx)) return prev;
      return { ...prev, hints: { ...prev.hints, [id]: [...existing, idx] } };
    });
  }

  function handleVideo(id) {
    updateProg(prev => {
      if (prev.videos.includes(id)) return prev;
      return { ...prev, videos: [...prev.videos, id] };
    });
  }

  function handleReset() {
    const fresh = emptyProgress();
    setProg(fresh);
    try { localStorage.removeItem('byteflag-v1'); } catch {}
  }

  const score  = calcTotalScore(prog);
  const solved = Object.keys(prog.solved).length;

  return (
    <div className="min-h-screen bg-slate-950">
      <Nav page={page} go={go} score={score} solved={solved} />
      <main className="pb-16">
        {page === 'dashboard' && <Dashboard prog={prog} go={go} pick={setSelId} />}
        {page === 'challenges' && <ChallengeList prog={prog} pick={setSelId} go={go} />}
        {page === 'challenge' && selId && (
          <ChallengeDetail
            id={selId} prog={prog}
            onSolve={handleSolve} onHint={handleHint} onVideo={handleVideo}
            go={go}
          />
        )}
        {page === 'profile' && <Profile prog={prog} onReset={handleReset} />}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
