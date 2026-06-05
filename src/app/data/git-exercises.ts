import { Exercise } from '../models/course.model';

/** Interactive exercises for the Git course, keyed by lesson id. */
export const GIT_EXERCISES: Record<string, Exercise[]> = {
  // ---------- Level 1 ----------
  'what-is-git': [
    {
      id: 'ex-areas',
      type: 'arrange',
      prompt: 'Arrange the journey of a change, from your editor to permanent history.',
      language: 'text',
      lines: [
        'edit files in the working directory',
        'git add  ->  copy changes into the staging area',
        'git commit  ->  seal the snapshot into the repository',
      ],
      explanation:
        'Working directory → staging area → repository: the triangle every command moves between.',
    },
  ],
  'first-commits': [
    {
      id: 'ex-cycle',
      type: 'fill-blank',
      prompt: 'Complete the daily loop: check, stage, record.',
      language: 'bash',
      codeTemplate: 'git ___\ngit add src/auth.ts\ngit ___ -m "Add login validation"',
      blanks: [
        { accepted: ['status'], hint: 'Your compass — run it constantly.' },
        { accepted: ['commit'], hint: 'Seals the snapshot.' },
      ],
      explanation: 'status → add → commit: the cycle you will run thousands of times.',
    },
  ],
  'reading-history': [
    {
      id: 'ex-staged-diff',
      type: 'fill-blank',
      prompt: 'Show exactly what will be included in your next commit.',
      language: 'bash',
      codeTemplate: 'git diff ___',
      blanks: [{ accepted: ['--staged', '--cached'], hint: 'Compares staging vs last commit.' }],
      explanation:
        'git diff --staged reviews the draft commit — your last check before sealing it.',
    },
  ],
  'undoing-basics': [
    {
      id: 'ex-undo',
      type: 'fill-blank',
      prompt: 'Un-commit the last commit but keep all work staged; then safely undo a PUSHED commit.',
      language: 'bash',
      codeTemplate: 'git reset --___ HEAD~1\n\n# the shared one:\ngit ___ a1b2c3d',
      blanks: [
        { accepted: ['soft'], hint: 'The gentle reset — work stays staged.' },
        { accepted: ['revert'], hint: 'Creates an inverse commit; history intact.' },
      ],
      explanation:
        'reset --soft rewinds a local draft; revert is the only polite undo for shared history.',
    },
  ],

  // ---------- Level 2 ----------
  'branch-mental-model': [
    {
      id: 'ex-switch',
      type: 'fill-blank',
      prompt: 'Create a new branch and switch to it, in one modern command.',
      language: 'bash',
      codeTemplate: 'git switch ___ feature/dark-mode',
      blanks: [{ accepted: ['-c'], hint: 'c for create.' }],
      explanation:
        'switch -c creates and moves in one step — the modern replacement for checkout -b.',
    },
  ],
  merging: [
    {
      id: 'ex-merge-direction',
      type: 'arrange',
      prompt: 'Arrange the correct merge procedure (feature into main).',
      language: 'bash',
      lines: [
        'git switch main',
        'git merge feature/search',
        'git branch -d feature/search',
      ],
      explanation:
        'Stand on the receiving branch, merge the feature in, then delete the finished label.',
    },
  ],
  conflicts: [
    {
      id: 'ex-conflict-steps',
      type: 'arrange',
      prompt: 'Arrange the calm conflict-resolution checklist.',
      language: 'text',
      lines: [
        'git status  ->  list the conflicted files',
        'open each file, fix the <<<<<<< blocks, remove markers',
        'git add  ->  mark each file resolved',
        'git commit  ->  conclude the merge',
      ],
      explanation:
        'status → edit → add → commit. And merge --abort is always a free exit.',
    },
  ],
  rebase: [
    {
      id: 'ex-golden-rule',
      type: 'fill-blank',
      prompt: 'Update your feature branch UNDER your work, then state the golden rule.',
      language: 'bash',
      codeTemplate:
        'git switch feature/search\ngit ___ main\n\n# golden rule: never rebase commits that are already ___',
      blanks: [
        { accepted: ['rebase'], hint: 'Replays your commits on a new base.' },
        { accepted: ['shared', 'pushed', 'public'], hint: 'i.e. that teammates may have.' },
      ],
      explanation:
        'Rebase local work freely; shared commits are frozen — rewriting them breaks teammates.',
    },
  ],

  // ---------- Level 3 ----------
  remotes: [
    {
      id: 'ex-fetch',
      type: 'fill-blank',
      prompt: 'Download the team’s news WITHOUT touching any of your work.',
      language: 'bash',
      codeTemplate: 'git ___ origin',
      blanks: [{ accepted: ['fetch'], hint: 'The careful look (pull would also merge).' }],
      explanation:
        'fetch updates your origin/* bookmarks only — inspect first, integrate when ready.',
    },
  ],
  'github-flow': [
    {
      id: 'ex-flow',
      type: 'arrange',
      prompt: 'Arrange the GitHub Flow cycle.',
      language: 'text',
      lines: [
        'create a feature branch from main',
        'commit your work on it',
        'push the branch and open a pull request',
        'review + CI checks pass',
        'merge into main and delete the branch',
      ],
      explanation:
        'Branch → commits → PR → review/checks → merge: the loop teams run daily.',
    },
  ],
  'sync-scenarios': [
    {
      id: 'ex-force-lease',
      type: 'fill-blank',
      prompt: 'After rebasing your own pushed feature branch, push the SAFE way.',
      language: 'bash',
      codeTemplate: 'git push --force-___',
      blanks: [{ accepted: ['with-lease'], hint: 'Force, but only if the server is as you last saw it.' }],
      explanation:
        '--force-with-lease aborts if anyone pushed meanwhile — blind --force checks nothing.',
    },
  ],
  'gitignore-files': [
    {
      id: 'ex-untrack',
      type: 'fill-blank',
      prompt: '.env was committed by mistake. Untrack it but keep the file on disk.',
      language: 'bash',
      codeTemplate: 'git rm ___ .env\ngit commit -m "Stop tracking .env"',
      blanks: [{ accepted: ['--cached'], hint: 'Remove from tracking, not from disk.' }],
      explanation:
        'rm --cached untracks; the gitignore rule then applies. And rotate any secret that was inside!',
    },
  ],

  // ---------- Level 4 ----------
  'reflog-recovery': [
    {
      id: 'ex-reflog',
      type: 'fill-blank',
      prompt: 'Commits "vanished" after a bad reset. Open the journal, then plant a rescue branch.',
      language: 'bash',
      codeTemplate: 'git ___\ngit branch rescue 9f8e7d6',
      blanks: [{ accepted: ['reflog'], hint: 'The journal of every HEAD move.' }],
      explanation:
        'reflog lists every state HEAD visited — find the hash, make it reachable again.',
    },
  ],
  stash: [
    {
      id: 'ex-stash',
      type: 'fill-blank',
      prompt: 'Shelve everything INCLUDING new untracked files, with a label.',
      language: 'bash',
      codeTemplate: 'git stash ___ -m "reports table half done"',
      blanks: [{ accepted: ['-u', '--include-untracked'], hint: 'Untracked files are excluded by default!' }],
      explanation:
        'Plain stash takes tracked changes only; -u brings new files along too.',
    },
  ],
  'cherry-pick-tags': [
    {
      id: 'ex-cherry',
      type: 'fill-blank',
      prompt: 'Copy the fix commit onto the release branch, then tag the release.',
      language: 'bash',
      codeTemplate:
        'git switch release/2.x\ngit ___ 4d5e6f7\ngit tag -a v2.3.1 -m "Patch release"\ngit push origin ___',
      blanks: [
        { accepted: ['cherry-pick'], hint: 'Transplant one commit’s change.' },
        { accepted: ['v2.3.1', '--tags'], hint: 'Tags do not travel with normal pushes.' },
      ],
      explanation:
        'cherry-pick replays one change as a new commit; tags must be pushed explicitly.',
    },
  ],
  'blame-bisect': [
    {
      id: 'ex-bisect',
      type: 'arrange',
      prompt: 'Arrange a bisect session that hunts the first bad commit.',
      language: 'bash',
      lines: [
        'git bisect start',
        'git bisect bad',
        'git bisect good v1.4.0',
        '# test the checked-out midpoint, answer good/bad, repeat',
        'git bisect reset',
      ],
      explanation:
        'Bound the search with one bad and one good, let binary search halve the range each round.',
    },
  ],

  // ---------- Level 5 ----------
  'good-commits': [
    {
      id: 'ex-add-p',
      type: 'fill-blank',
      prompt: 'Stage only SOME hunks of a file, interactively.',
      language: 'bash',
      codeTemplate: 'git add ___ src/cart.service.ts',
      blanks: [{ accepted: ['-p', '--patch'], hint: 'Approve change by change.' }],
      explanation:
        'add -p splits a messy working directory into clean atomic commits.',
    },
  ],
  'interactive-rebase': [
    {
      id: 'ex-fixup',
      type: 'fill-blank',
      prompt: 'In the rebase todo, melt the noise commits into the real one, discarding their messages.',
      language: 'text',
      codeTemplate:
        'pick   a1b2c3d Add quiz timer component\n___  b2c3d4e WIP\n___  c3d4e5f fix typo',
      blanks: [
        { accepted: ['fixup', 'f'], hint: 'squash without keeping the message.' },
        { accepted: ['fixup', 'f'], hint: 'Same action again.' },
      ],
      explanation:
        'fixup merges into the previous commit and drops the noise message — squash would keep it.',
    },
  ],
  'team-workflows': [
    {
      id: 'ex-hook',
      type: 'fill-blank',
      prompt: 'Which hook runs BEFORE a commit is created — the classic lint gate?',
      language: 'text',
      codeTemplate: '.husky/___-commit  ->  npx lint-staged',
      blanks: [{ accepted: ['pre'], hint: 'Before the commit exists.' }],
      explanation:
        'pre-commit hooks lint/format staged code and can block a bad commit before it is born.',
    },
  ],
  'git-internals': [
    {
      id: 'ex-objects',
      type: 'fill-blank',
      prompt: 'Complete the anatomy: a commit points to a ___ (the snapshot) and its ___ (the history chain).',
      language: 'text',
      codeTemplate:
        'commit\n  ___ 8a7b6c5d...      <- the snapshot of all files\n  ___ 9c8b7a6e...      <- the previous commit\n  author Kosay\n  message "Add RxJS course"',
      blanks: [
        { accepted: ['tree'], hint: 'Directory structure object.' },
        { accepted: ['parent'], hint: 'The link that forms history.' },
      ],
      explanation:
        'tree = what the project looked like; parent = what came before. Four object types explain all of Git.',
    },
  ],
};
