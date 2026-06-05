import { Course } from '../models/course.model';

/**
 * The Git course — from zero to advanced.
 * Focus: build the correct mental model (snapshots, pointers, three trees)
 * so every command becomes obvious instead of memorized.
 */
export const GIT_COURSE: Course = {
  outcome:
    'By the end you will hold the real mental model of Git — snapshots, branches as pointers, the three trees — read any repository history confidently, branch/merge/rebase without fear, collaborate through GitHub pull requests, recover from any mistake, and run professional workflows.',
  levels: [
    // ===================================================================
    // LEVEL 1 — THE MENTAL MODEL
    // ===================================================================
    {
      id: 'l1-mental-model',
      order: 1,
      title: 'Level 1 — The mental model',
      goal: 'Understand what Git really stores, the three areas every change passes through, and how to read history and undo safely.',
      lessons: [
        {
          id: 'what-is-git',
          title: 'What Git actually is',
          minutes: 10,
          blurb: 'Snapshots, not diffs — and why distributed matters.',
          concept: [
            {
              heading: 'A database of snapshots',
              body: 'Git is a **version control system**: it records the state of your project over time so you can revisit, compare, and undo. The key insight most tutorials miss: Git stores **snapshots**, not differences. Every commit is a full picture of your entire project at that moment (stored efficiently — unchanged files are shared between snapshots).\n\nThink of commits as **save points in a game**: you can always return, and nothing committed is ever truly lost.',
            },
            {
              heading: 'Distributed, not central',
              body: 'When you `git clone`, you get the **entire history** — every commit ever made — on your machine. Commits, branches, diffs, and history work offline and instantly. GitHub is just another copy of the repository that the team agrees to treat as the meeting point; it is not "where the code lives" any more than your laptop is.',
            },
            {
              heading: 'The three areas',
              body: 'Every change passes through three places: the **working directory** (your actual files, where you edit), the **staging area / index** (a draft of the next commit — you choose what goes in), and the **repository** (the permanent history of commits in the hidden `.git` folder). Understanding this triangle makes every Git command predictable: most commands just move changes between these three areas.',
            },
          ],
          codeSamples: [
            {
              title: 'The three areas, visualized',
              filename: 'mental model',
              language: 'text',
              code: "Working Directory        Staging Area           Repository (.git)\n(your files)             (the next commit)      (permanent history)\n     |                        |                       |\n     |---- git add ---------->|                       |\n     |                        |---- git commit ------>|\n     |                        |                       |\n     |<------------- git restore / checkout ----------|\n\nedit files  ->  choose what to record  ->  record it forever",
              annotations: [
                { line: 4, note: 'add: copy changes from working directory into the draft.' },
                { line: 5, note: 'commit: seal the draft as a permanent snapshot.' },
                { line: 7, note: 'restore: bring committed content back into your files.' },
              ],
              explanation:
                'Print this triangle in your head. Every confusing Git moment becomes clear when you ask: which of the three areas am I changing?',
            },
          ],
          keyPoints: [
            'Git stores **snapshots** of the whole project, not diffs — commits are save points.',
            'Distributed: a clone contains the full history; GitHub is a copy, not the source of truth.',
            'Three areas: working directory → staging area → repository.',
            'Most commands are just movements between the three areas.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does a Git commit fundamentally store?',
              options: [
                { id: 'a', text: 'The lines that changed since last time', correct: false },
                { id: 'b', text: 'A snapshot of the entire project at that moment', correct: true },
                { id: 'c', text: 'Only the files you edited', correct: false },
                { id: 'd', text: 'A backup zip', correct: false },
              ],
              explanation:
                'Commits are full snapshots (deduplicated internally) — diffs are computed on demand, not stored.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is the staging area for?',
              options: [
                { id: 'a', text: 'A backup of the repo', correct: false },
                { id: 'b', text: 'Composing the next commit — choosing exactly what gets recorded', correct: true },
                { id: 'c', text: 'Storing deleted files', correct: false },
                { id: 'd', text: 'Caching downloads', correct: false },
              ],
              explanation:
                'The staging area is the draft of your next commit — you add changes to it deliberately.',
            },
            {
              id: 'q3',
              type: 'truefalse',
              prompt: 'You need an internet connection to make commits and view history.',
              options: [
                { id: 'a', text: 'True', correct: false },
                { id: 'b', text: 'False', correct: true },
              ],
              explanation:
                'Git is distributed: the full history is local. Only push/pull/fetch talk to the network.',
            },
          ],
        },
        {
          id: 'first-commits',
          title: 'The commit cycle',
          minutes: 10,
          blurb: 'status → add → commit — the loop you will run forever.',
          concept: [
            {
              heading: 'The daily loop',
              body: 'The core cycle is three commands: `git status` (what changed? always your compass), `git add <files>` (stage what belongs in the next commit), `git commit -m "message"` (seal the snapshot). You ran this exact loop publishing SkillForge.\n\n`git add .` stages everything — convenient, but staging **selectively** is what separates clean histories from messy ones.',
            },
            {
              heading: 'Reading git status',
              body: 'Status groups files into: **Untracked** (new files Git has never seen), **Modified** (tracked files you changed, not yet staged), and **Staged / to be committed** (in the draft). One file can appear twice — staged changes AND newer unstaged edits — because staging copies the file **as it was** when you added it.',
            },
            {
              heading: 'What makes a good commit',
              body: 'A commit should be **one logical change**: "Add login validation", not "stuff". Small, focused commits make history readable, reviews easy, and reverts surgical. The message convention: a short imperative summary line ("Add", "Fix", "Remove"...), under ~50 chars; details in the body if needed. Level 5 goes deeper.',
            },
          ],
          codeSamples: [
            {
              title: 'One full cycle',
              filename: 'terminal',
              language: 'bash',
              code: "git status                      # 1. what changed?\n# modified: src/app.ts\n# untracked: src/auth.ts\n\ngit add src/auth.ts src/app.ts  # 2. stage exactly what belongs\n\ngit status                      # 3. verify the draft\n# Changes to be committed: app.ts, auth.ts\n\ngit commit -m \"Add login validation\"   # 4. seal the snapshot\n\ngit log --oneline -3            # 5. see it in history\n# a1b2c3d Add login validation",
              annotations: [
                { line: 1, note: 'status before AND after staging — the habit that prevents surprises.' },
                { line: 5, note: 'Naming files explicitly beats add . — you commit intentionally.' },
                { line: 10, note: 'Imperative, specific, short — reads like "this commit will: ..."' },
              ],
              explanation:
                'status → add → status → commit. The double status feels redundant for a week, then saves you forever.',
            },
          ],
          keyPoints: [
            'The loop: `status` → `add` → `commit -m` — status is your compass, run it constantly.',
            'Untracked vs modified vs staged — one file can be both staged and modified again.',
            'Stage selectively; `add .` is for when EVERYTHING truly belongs together.',
            'One commit = one logical change, imperative summary under ~50 chars.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'You edited a file AFTER staging it. What does git commit record?',
              options: [
                { id: 'a', text: 'The newest version automatically', correct: false },
                { id: 'b', text: 'The version as it was when you ran git add', correct: true },
                { id: 'c', text: 'Both versions', correct: false },
                { id: 'd', text: 'It refuses to commit', correct: false },
              ],
              explanation:
                'Staging snapshots the file at add-time. New edits need another add — which is why the file shows in both sections of status.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is an "untracked" file?',
              options: [
                { id: 'a', text: 'A deleted file', correct: false },
                { id: 'b', text: 'A new file Git has never been told about', correct: true },
                { id: 'c', text: 'A file with conflicts', correct: false },
                { id: 'd', text: 'A file on another branch', correct: false },
              ],
              explanation:
                'Until the first git add, Git sees the file exists but does not version it.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which is the best commit message?',
              options: [
                { id: 'a', text: '"changes"', correct: false },
                { id: 'b', text: '"Fix price rounding in cart totals"', correct: true },
                { id: 'c', text: '"asdfgh"', correct: false },
                { id: 'd', text: '"updated many files today including cart and also..."', correct: false },
              ],
              explanation:
                'Imperative, specific, concise — a reader knows exactly what this commit does without opening it.',
            },
          ],
        },
        {
          id: 'reading-history',
          title: 'Reading history: log, diff & HEAD',
          minutes: 11,
          blurb: 'Navigate the commit graph and compare anything to anything.',
          concept: [
            {
              heading: 'The anatomy of a commit',
              body: 'Every commit has: a **hash** (its unique ID, like `a1b2c3d` — content-derived, so identical content = identical hash), a **parent** (the commit before it — this chain IS the history), an author + date, and the message. **HEAD** is the pointer to "where you are now" — normally the tip of your current branch.',
            },
            {
              heading: 'git log — the time machine window',
              body: 'Raw `git log` is verbose. The forms that matter: `git log --oneline` (one line per commit), `--graph` (draw the branch structure), `-5` (limit), `--author`, `-S "text"` (find commits that added/removed a string — incredible for archaeology). `git show <hash>` displays one commit in full: metadata + its diff.',
            },
            {
              heading: 'diff — compare any two points',
              body: '`git diff` = working directory vs staging (what is NOT yet staged). `git diff --staged` = staging vs last commit (what WILL be committed — review this before every commit). `git diff main..feature` = between branches. `git diff HEAD~3` = vs three commits ago. The `~` syntax counts parents backward: `HEAD~1` is the previous commit.',
            },
          ],
          codeSamples: [
            {
              title: 'History navigation toolkit',
              filename: 'terminal',
              language: 'bash',
              code: "git log --oneline --graph -8     # compact picture of recent history\n# * f3e2d1c (HEAD -> main) Add RxJS course\n# * 9c8b7a6 Add TypeScript course\n# * 5d4e3f2 Add Arabic summaries\n\ngit show 9c8b7a6                 # one commit: message + full diff\n\ngit diff                          # unstaged changes (working vs staging)\ngit diff --staged                 # the draft (staging vs last commit)\ngit diff HEAD~2 -- src/app.ts     # this file vs 2 commits ago\n\ngit log -S \"shareReplay\" --oneline   # when was this string introduced?",
              annotations: [
                { line: 2, note: 'HEAD -> main: you are on main, at this commit.' },
                { line: 8, note: 'Review --staged before committing — your last safety check.' },
                { line: 9, note: '-- separates options from file paths.' },
                { line: 11, note: 'The pickaxe: finds commits whose diff contains the string.' },
              ],
              explanation:
                'These six commands answer 95% of "what happened?" questions in any repository.',
            },
          ],
          keyPoints: [
            'A commit = hash + parent + author + message; the parent chain IS history.',
            '`HEAD` = where you are now (tip of the current branch, normally).',
            '`log --oneline --graph` for the picture; `show <hash>` for one commit.',
            '`diff` (unstaged), `diff --staged` (the draft), `diff a..b` (any two points).',
            '`HEAD~n` counts commits backward; `log -S` finds when text appeared.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does HEAD point to (normally)?',
              options: [
                { id: 'a', text: 'The first commit ever', correct: false },
                { id: 'b', text: 'The tip of the branch you are currently on', correct: true },
                { id: 'c', text: 'The remote server', correct: false },
                { id: 'd', text: 'The staging area', correct: false },
              ],
              explanation:
                'HEAD is "you are here" — usually attached to your current branch tip.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Which command shows what will be included in your next commit?',
              options: [
                { id: 'a', text: 'git diff', correct: false },
                { id: 'b', text: 'git diff --staged', correct: true },
                { id: 'c', text: 'git log', correct: false },
                { id: 'd', text: 'git show', correct: false },
              ],
              explanation:
                'diff --staged compares the staging area against the last commit — exactly the upcoming commit content.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does HEAD~3 mean?',
              options: [
                { id: 'a', text: 'Three branches ago', correct: false },
                { id: 'b', text: 'The commit three steps before HEAD', correct: true },
                { id: 'c', text: 'The third file', correct: false },
                { id: 'd', text: 'Three commits in the future', correct: false },
              ],
              explanation:
                'The tilde walks parent links backward: HEAD~1 is the previous commit, ~3 three back.',
            },
          ],
        },
        {
          id: 'undoing-basics',
          title: 'Undoing things safely',
          minutes: 12,
          blurb: 'restore, amend, revert, reset — the right undo for each situation.',
          concept: [
            {
              heading: 'Undo by situation, not by command',
              body: 'Memorize situations: **"discard my edits to this file"** → `git restore <file>` (careful: edits are gone for real). **"unstage this, keep my edits"** → `git restore --staged <file>`. **"fix my LAST commit"** (message or forgotten file) → `git commit --amend`. **"undo a commit that is already shared"** → `git revert <hash>` — creates a NEW commit that does the opposite; history stays intact.',
            },
            {
              heading: 'reset — moving the branch pointer',
              body: '`git reset` moves your branch pointer to another commit, with three intensities: `--soft` (keep changes staged), `--mixed` (default — keep changes in working dir, unstaged), `--hard` (discard everything — destructive). `reset --soft HEAD~1` = "un-commit but keep all my work" — one of the most useful commands in Git.',
            },
            {
              heading: 'The safety rule',
              body: 'The line that decides everything: **has this commit been pushed/shared?** Local-only → reset and amend freely; you are editing a draft. Shared → use `revert`; rewriting shared history breaks teammates. And remember: committed work is almost never lost — `reflog` (Level 4) can resurrect nearly anything.',
            },
          ],
          codeSamples: [
            {
              title: 'The undo decision table, as commands',
              filename: 'terminal',
              language: 'bash',
              code: "# Discard edits in a file (working dir) — GONE for real\ngit restore src/app.ts\n\n# Unstage, but keep the edits\ngit restore --staged src/app.ts\n\n# Fix the last commit: message or add a forgotten file\ngit add forgotten.ts\ngit commit --amend -m \"Add login validation (complete)\"\n\n# Un-commit the last commit, keep all work staged\ngit reset --soft HEAD~1\n\n# Undo a SHARED commit the safe way: an inverse commit\ngit revert a1b2c3d",
              annotations: [
                { line: 2, note: 'The only command here that destroys uncommitted work — pause before it.' },
                { line: 9, note: 'amend REWRITES the last commit — local-only commits exclusively.' },
                { line: 12, note: 'soft reset: history rewinds, your work stays staged. The gentle undo.' },
                { line: 15, note: 'revert adds a new opposite commit — history is preserved, teammates unaffected.' },
              ],
              explanation:
                'Four situations, four tools. The question "was it pushed?" picks between amend/reset (no) and revert (yes).',
            },
          ],
          keyPoints: [
            '`restore <file>` discards edits; `restore --staged` only unstages.',
            '`commit --amend` rewrites the last commit — local commits only.',
            '`reset --soft HEAD~1` un-commits but keeps work; `--hard` destroys (careful).',
            'Shared history → `revert` (inverse commit); never rewrite what teammates have.',
            'Committed work is recoverable via reflog — uncommitted work is not.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'You committed and PUSHED a bug. The safe undo is:',
              options: [
                { id: 'a', text: 'git reset --hard HEAD~1 and force push', correct: false },
                { id: 'b', text: 'git revert <hash> — a new commit that reverses it', correct: true },
                { id: 'c', text: 'Delete the repository', correct: false },
                { id: 'd', text: 'git commit --amend', correct: false },
              ],
              explanation:
                'revert preserves shared history; resetting pushed commits rewrites history under teammates’ feet.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does git reset --soft HEAD~1 do?',
              options: [
                { id: 'a', text: 'Deletes your last commit and its changes', correct: false },
                { id: 'b', text: 'Un-commits the last commit but keeps all changes staged', correct: true },
                { id: 'c', text: 'Reverts a pushed commit', correct: false },
                { id: 'd', text: 'Resets the remote', correct: false },
              ],
              explanation:
                'soft moves the branch pointer back one commit; your files and staging are untouched.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which command permanently discards uncommitted edits to a file?',
              options: [
                { id: 'a', text: 'git restore --staged file', correct: false },
                { id: 'b', text: 'git restore file', correct: true },
                { id: 'c', text: 'git revert file', correct: false },
                { id: 'd', text: 'git log file', correct: false },
              ],
              explanation:
                'restore <file> overwrites your working copy from the last commit — uncommitted edits cannot be recovered.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 2 — BRANCHES
    // ===================================================================
    {
      id: 'l2-branches',
      order: 2,
      title: 'Level 2 — Branches',
      goal: 'See branches as cheap pointers, merge with understanding, resolve conflicts calmly, and know when to rebase.',
      lessons: [
        {
          id: 'branch-mental-model',
          title: 'Branches are just pointers',
          minutes: 10,
          blurb: 'The 40-byte secret that makes Git branching fearless.',
          concept: [
            {
              heading: 'What a branch really is',
              body: 'A branch is a **movable label pointing at one commit** — a 41-byte file containing a hash. Nothing is copied. Creating a branch costs nothing; committing on it just moves the label forward. This is why Git workflows branch for **everything**: a branch per feature, per fix, per experiment.\n\n`HEAD` attaches to the branch you are on — commit, and that branch label moves with you.',
            },
            {
              heading: 'Working with branches',
              body: '`git branch` lists; `git switch -c feature/login` creates and switches (modern syntax — older tutorials use `checkout -b`); `git switch main` moves back. Switching **rewrites your working directory** to that branch’s snapshot — your files literally change on disk. Uncommitted changes block a switch if they would be overwritten (stash, Level 4, is the escape).',
            },
            {
              heading: 'The graph in your head',
              body: 'History is a **graph of commits**; branches are stickers on some of them. When main has commits A-B-C and feature adds D-E from B, the graph forks. Visualize with `git log --oneline --graph --all`. Reading this graph fluently is THE branch skill — commands are trivial afterward.',
            },
          ],
          codeSamples: [
            {
              title: 'A fork in the graph',
              filename: 'terminal',
              language: 'bash',
              code: "git switch -c feature/search    # create + switch in one step\n# ... edit, add, commit twice ...\n\ngit log --oneline --graph --all\n# * e5f6a7b (HEAD -> feature/search) Add search results\n# * c3d4e5f Add search box\n# | * b2c3d4e (main) Fix footer\n# |/\n# * a1b2c3d Add navbar\n\ngit switch main                 # files on disk now match main\ngit branch -d feature/search    # delete label (after merging)",
              annotations: [
                { line: 1, note: 'switch -c: the modern create-and-go (replaces checkout -b).' },
                { line: 7, note: 'The fork: both branches grew from a1b2c3d independently.' },
                { line: 10, note: 'Switching swaps your actual files to that snapshot.' },
                { line: 11, note: '-d deletes the LABEL only — commits stay in the graph.' },
              ],
              explanation:
                'Deleting a merged branch deletes a sticker, not commits. Branches are disposable by design.',
            },
          ],
          keyPoints: [
            'A branch = a movable pointer to a commit (41 bytes) — nothing is copied.',
            '`switch -c name` creates + switches; switching rewrites your working files.',
            'HEAD rides the current branch; committing moves that branch forward.',
            'History is a graph; `log --oneline --graph --all` is your map.',
            'Branch for everything — they are free and disposable.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What happens on disk when you create a new branch?',
              options: [
                { id: 'a', text: 'The whole project is copied', correct: false },
                { id: 'b', text: 'A tiny pointer file is written — nothing is copied', correct: true },
                { id: 'c', text: 'A zip archive is made', correct: false },
                { id: 'd', text: 'Nothing until you push', correct: false },
              ],
              explanation:
                'A branch is a 41-byte file containing a commit hash — that is the entire cost.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'You commit while on feature/login. What moves?',
              options: [
                { id: 'a', text: 'main', correct: false },
                { id: 'b', text: 'The feature/login pointer (and HEAD with it)', correct: true },
                { id: 'c', text: 'All branches', correct: false },
                { id: 'd', text: 'The remote', correct: false },
              ],
              explanation:
                'The current branch label advances to the new commit; other branches are untouched.',
            },
            {
              id: 'q3',
              type: 'truefalse',
              prompt: 'Deleting a merged branch with -d deletes its commits.',
              options: [
                { id: 'a', text: 'True', correct: false },
                { id: 'b', text: 'False', correct: true },
              ],
              explanation:
                'Only the label is removed; the commits remain in history, reachable from the branch they merged into.',
            },
          ],
        },
        {
          id: 'merging',
          title: 'Merging',
          minutes: 11,
          blurb: 'Fast-forward vs merge commits — what really happens.',
          concept: [
            {
              heading: 'Two kinds of merge',
              body: 'On `git merge feature` (run FROM main), Git checks the graph. If main has not moved since the branch forked, Git just slides the main pointer forward onto the feature commits — a **fast-forward**: no new commit, linear history. If BOTH moved, Git creates a **merge commit**: a new commit with **two parents** combining both lines.',
            },
            {
              heading: 'The three-way merge',
              body: 'To combine diverged branches, Git compares three snapshots: the common ancestor (**merge base**), main’s tip, and feature’s tip. Changes from both sides relative to the base are combined automatically — different files, or even different parts of the same file, merge cleanly without your help. Only when both sides changed the **same lines** does Git stop and ask (next lesson).',
            },
            {
              heading: 'Reading merge history',
              body: 'Merge commits appear in `log --graph` as junctions where two lines join. Some teams force merge commits even when fast-forward is possible (`--no-ff`) so each feature stays visible as a bubble; others prefer linear history via rebase (lesson after next). Both are valid conventions — read your team’s graph to know which.',
            },
          ],
          codeSamples: [
            {
              title: 'Both merge types',
              filename: 'terminal',
              language: 'bash',
              code: "# Fast-forward: main never moved since the fork\ngit switch main\ngit merge feature/quick-fix\n# Updating a1b2c3d..e5f6a7b  Fast-forward\n\n# Merge commit: both branches advanced\ngit merge feature/search\n# Merge made by the 'ort' strategy.\n\ngit log --oneline --graph -5\n# *   9f8e7d6 (HEAD -> main) Merge branch 'feature/search'\n# |\\\n# | * e5f6a7b Add search results\n# * | b2c3d4e Fix footer\n# |/\n# * a1b2c3d Add navbar",
              annotations: [
                { line: 4, note: 'Fast-forward: the pointer slid forward; no new commit created.' },
                { line: 8, note: 'Diverged branches -> a real merge commit with two parents.' },
                { line: 11, note: 'The junction: this commit joins both lines of work.' },
              ],
              explanation:
                'Always merge FROM the receiving branch: switch to main, then merge the feature into it.',
            },
          ],
          keyPoints: [
            'Fast-forward: pointer slides forward — no new commit, linear history.',
            'Diverged branches → merge commit with **two parents**.',
            'Three-way merge: base + both tips; only same-line edits need a human.',
            'Merge from the receiving branch: `switch main` then `merge feature`.',
            '`--no-ff` forces a merge bubble — a team-convention choice.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'When does a fast-forward merge happen?',
              options: [
                { id: 'a', text: 'Always', correct: false },
                { id: 'b', text: 'When the receiving branch has not moved since the fork', correct: true },
                { id: 'c', text: 'Only with --force', correct: false },
                { id: 'd', text: 'When there are conflicts', correct: false },
              ],
              explanation:
                'If main gained no commits meanwhile, its pointer can simply slide onto the feature tip.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is special about a merge commit?',
              options: [
                { id: 'a', text: 'It has no message', correct: false },
                { id: 'b', text: 'It has two parents — joining two lines of history', correct: true },
                { id: 'c', text: 'It cannot be reverted', correct: false },
                { id: 'd', text: 'It is invisible in log', correct: false },
              ],
              explanation:
                'Two parents are what make it a junction in the graph — both histories flow into it.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Two branches edited DIFFERENT files. What does merging require from you?',
              options: [
                { id: 'a', text: 'Manual conflict resolution', correct: false },
                { id: 'b', text: 'Nothing — the three-way merge combines them automatically', correct: true },
                { id: 'c', text: 'Copying files by hand', correct: false },
                { id: 'd', text: 'A force push', correct: false },
              ],
              explanation:
                'Conflicts only arise when the same lines changed on both sides; everything else merges itself.',
            },
          ],
        },
        {
          id: 'conflicts',
          title: 'Resolving conflicts calmly',
          minutes: 12,
          blurb: 'Conflict markers demystified — a checklist, not a crisis.',
          concept: [
            {
              heading: 'Why conflicts happen',
              body: 'A conflict means one thing: **both branches changed the same lines** (or one deleted a file the other edited), and Git refuses to guess which version is right. It is not an error — it is Git asking a question only a human can answer. The merge pauses; conflicted files are marked; you resolve, stage, and conclude.',
            },
            {
              heading: 'Reading the markers',
              body: 'Inside each conflicted file: `<<<<<<< HEAD` starts **your side** (the branch you are on), `=======` separates, `>>>>>>> feature` ends **their side** (the branch being merged). Your job: edit the block into the correct final text — yours, theirs, both, or something new — and **delete all three marker lines**.',
            },
            {
              heading: 'The calm checklist',
              body: '1) `git status` — lists every conflicted file ("both modified"). 2) Open each, search `<<<<<<<`, decide, fix, remove markers. 3) `git add <file>` to mark it resolved. 4) All resolved → `git commit` concludes the merge. Wrong turn? `git merge --abort` returns to before the merge — a free escape hatch. Editors like VS Code render buttons (Accept Current / Incoming / Both) over each block — same operation, nicer clothes.',
            },
          ],
          codeSamples: [
            {
              title: 'A conflict, from collision to resolution',
              filename: 'src/title.ts (conflicted)',
              language: 'text',
              code: "<<<<<<< HEAD\nconst title = 'SkillForge — Learn by understanding';\n=======\nconst title = 'SkillForge: your learning companion';\n>>>>>>> feature/branding\n\n--- after your edit, the file simply contains: ---\n\nconst title = 'SkillForge — your learning companion';\n\n--- then: ---\ngit add src/title.ts\ngit commit                # seals the merge",
              annotations: [
                { line: 1, note: 'HEAD side: the branch you are standing on (e.g. main).' },
                { line: 4, note: 'Incoming side: the branch being merged in.' },
                { line: 9, note: 'The resolution can combine both — you decide the truth.' },
                { line: 13, note: 'add marks resolved; commit finishes the paused merge.' },
              ],
              explanation:
                'A conflict touches ONLY the collided lines — the rest of the merge already succeeded automatically.',
            },
          ],
          keyPoints: [
            'Conflict = same lines changed on both sides; Git asks instead of guessing.',
            'Markers: `<<<<<<< HEAD` yours, `=======` divider, `>>>>>>>` theirs.',
            'Checklist: status → edit each file, remove markers → add → commit.',
            '`git merge --abort` is the free escape back to pre-merge state.',
            'Small frequent merges = small rare conflicts.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'In conflict markers, what is between <<<<<<< HEAD and =======?',
              options: [
                { id: 'a', text: 'The incoming branch version', correct: false },
                { id: 'b', text: 'Your current branch’s version of the lines', correct: true },
                { id: 'c', text: 'The common ancestor', correct: false },
                { id: 'd', text: 'A backup', correct: false },
              ],
              explanation:
                'HEAD side first (where you stand), then ======= divider, then the incoming branch’s version.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'How do you tell Git a conflicted file is resolved?',
              options: [
                { id: 'a', text: 'git resolve file', correct: false },
                { id: 'b', text: 'git add file', correct: true },
                { id: 'c', text: 'Deleting the file', correct: false },
                { id: 'd', text: 'git push', correct: false },
              ],
              explanation:
                'Staging the fixed file marks it resolved; when all are staged, git commit completes the merge.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'A merge is going badly and you want out. What restores the pre-merge state?',
              options: [
                { id: 'a', text: 'git merge --abort', correct: true },
                { id: 'b', text: 'Closing the terminal', correct: false },
                { id: 'c', text: 'git delete merge', correct: false },
                { id: 'd', text: 'There is no way back', correct: false },
              ],
              explanation:
                'merge --abort rewinds everything to the moment before you started — conflicts are never a trap.',
            },
          ],
        },
        {
          id: 'rebase',
          title: 'Rebase — and its golden rule',
          minutes: 12,
          blurb: 'Replaying commits for linear history, without burning yourself.',
          concept: [
            {
              heading: 'What rebase does',
              body: '`git rebase main` (run on your feature branch) takes your commits and **replays them one by one on top of main’s tip** — as if you had started your branch today. The result is a straight line: no fork, no merge commit. Important: the replayed commits are **new commits** (new hashes); the originals are abandoned.',
            },
            {
              heading: 'Merge vs rebase',
              body: '**Merge** preserves what truly happened (forks and joins — honest but tangled). **Rebase** rewrites for clarity (linear and readable — but fabricated history). The common professional blend: rebase your **local, unpushed** work to stay current with main, then merge the finished branch via a pull request.',
            },
            {
              heading: 'THE golden rule',
              body: '**Never rebase commits that others may have.** Rebasing replaces commits; teammates holding the old ones now have a history that no longer exists upstream — chaos follows. Local-only branch? Rebase freely. Pushed and shared? Merge. This one rule removes all rebase danger; everything else is preference.',
            },
          ],
          codeSamples: [
            {
              title: 'Rebase then fast-forward — the clean flow',
              filename: 'terminal',
              language: 'bash',
              code: "# main moved while you worked. Update your branch UNDER your work:\ngit switch feature/search\ngit rebase main\n# Successfully rebased and updated refs/heads/feature/search.\n\ngit log --oneline --graph --all\n# * 7a8b9c0 (HEAD -> feature/search) Add search results\n# * 6f7e8d9 Add search box\n# * b2c3d4e (main) Fix footer        <- your commits now sit ON TOP\n# * a1b2c3d Add navbar\n\n# conflicts during rebase? fix file, then:\ngit add fixed-file.ts\ngit rebase --continue        # or: git rebase --abort",
              annotations: [
                { line: 3, note: 'Replays YOUR commits onto main’s tip — new hashes, linear line.' },
                { line: 9, note: 'No fork remains: history reads as one straight story.' },
                { line: 14, note: 'Rebase pauses per conflicted commit; continue moves to the next.' },
              ],
              explanation:
                'After this, merging into main is a fast-forward — the source of those clean linear histories you see.',
            },
          ],
          keyPoints: [
            'Rebase replays your commits on a new base — linear history, **new hashes**.',
            'Merge records truth (joins); rebase rewrites for readability.',
            'Pro blend: rebase local work to stay current; merge via PR to finish.',
            '**Golden rule: never rebase shared/pushed commits.**',
            'Conflicts pause per commit: fix → add → `rebase --continue` (or `--abort`).',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What happens to your original commits after a rebase?',
              options: [
                { id: 'a', text: 'They are modified in place', correct: false },
                { id: 'b', text: 'They are replaced by NEW commits with new hashes', correct: true },
                { id: 'c', text: 'They move to another branch', correct: false },
                { id: 'd', text: 'Nothing changes', correct: false },
              ],
              explanation:
                'Rebase creates fresh copies on the new base — which is exactly why shared commits must never be rebased.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'When is rebasing perfectly safe?',
              options: [
                { id: 'a', text: 'On any branch, any time', correct: false },
                { id: 'b', text: 'On local commits that nobody else has', correct: true },
                { id: 'c', text: 'Only on main', correct: false },
                { id: 'd', text: 'Never', correct: false },
              ],
              explanation:
                'The golden rule: private commits are yours to rewrite; shared ones are frozen.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'The practical difference in the graph: merge vs rebase?',
              options: [
                { id: 'a', text: 'No visible difference', correct: false },
                { id: 'b', text: 'Merge shows forks and join commits; rebase produces one straight line', correct: true },
                { id: 'c', text: 'Rebase shows more branches', correct: false },
                { id: 'd', text: 'Merge deletes branches', correct: false },
              ],
              explanation:
                'Merge preserves the topology of what happened; rebase rewrites it into linear order.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 3 — REMOTES & COLLABORATION
    // ===================================================================
    {
      id: 'l3-remotes',
      order: 3,
      title: 'Level 3 — Remotes & collaboration',
      goal: 'Understand remotes deeply, master the GitHub pull-request flow, sync diverged work, and control what gets tracked.',
      lessons: [
        {
          id: 'remotes',
          title: 'Remotes: fetch, pull & push',
          minutes: 12,
          blurb: 'origin demystified — and why fetch is not pull.',
          concept: [
            {
              heading: 'What origin really is',
              body: '`origin` is just the default **nickname** for the URL you cloned from. Your repo also keeps **remote-tracking branches** like `origin/main`: read-only bookmarks of "where main was on the server **last time we talked**". They update only when you fetch/pull/push — origin/main is your last photo of the server, not a live feed.',
            },
            {
              heading: 'fetch vs pull',
              body: '`git fetch` downloads new commits and updates the origin/* bookmarks — **touching none of your work**. You can then inspect (`log main..origin/main` — what is new?) and decide. `git pull` = fetch + merge into your branch in one step. Fetch is the careful look; pull is look-and-take. Knowing they differ is what makes "weird pull results" debuggable.',
            },
            {
              heading: 'push and tracking',
              body: '`git push` uploads your commits and moves the server’s branch. The first push of a new branch needs `-u origin <name>` (as you did): `-u` links your branch to the remote one, so future push/pull need no arguments and status reports "ahead 2, behind 1". Push is **refused** if the server has commits you lack — fetch/pull first; never answer that refusal with blind force (next lessons).',
            },
          ],
          codeSamples: [
            {
              title: 'The remote conversation',
              filename: 'terminal',
              language: 'bash',
              code: "git remote -v                  # what servers do I know?\n# origin  https://github.com/kusaisssd/skill-forge.git\n\ngit fetch origin               # download news, touch nothing of mine\ngit log --oneline main..origin/main   # what did the team add?\ngit log --oneline origin/main..main   # what have I not pushed?\n\ngit pull                       # fetch + merge into my branch\ngit push                       # upload my commits\n\ngit push -u origin feature/search     # first push of a new branch\n# -u: remember the link; next time plain 'git push' suffices",
              annotations: [
                { line: 4, note: 'fetch is always safe — it only updates your origin/* bookmarks.' },
                { line: 5, note: 'The two-dot range: commits they have that I lack.' },
                { line: 11, note: '-u sets upstream tracking — done once per new branch.' },
              ],
              explanation:
                'The two log ranges (main..origin/main and the reverse) answer "what changed?" in both directions before you act.',
            },
          ],
          keyPoints: [
            '`origin` = nickname for the cloned URL; `origin/main` = last-known server state.',
            '`fetch` downloads + updates bookmarks, touching nothing of yours.',
            '`pull` = fetch + merge; understand the parts to debug the whole.',
            'First push: `-u origin branch` links tracking; then plain push/pull works.',
            'Push refused = server has news you lack → fetch first, never blind force.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What is origin/main in your local repository?',
              options: [
                { id: 'a', text: 'A live view of the server', correct: false },
                { id: 'b', text: 'A bookmark of where main was on the server at last contact', correct: true },
                { id: 'c', text: 'Your main branch', correct: false },
                { id: 'd', text: 'A backup branch', correct: false },
              ],
              explanation:
                'Remote-tracking branches update only on fetch/pull/push — snapshots of the last conversation.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Which command gets the team’s new commits WITHOUT touching your work?',
              options: [
                { id: 'a', text: 'git pull', correct: false },
                { id: 'b', text: 'git fetch', correct: true },
                { id: 'c', text: 'git push', correct: false },
                { id: 'd', text: 'git merge', correct: false },
              ],
              explanation:
                'fetch only downloads and updates origin/* bookmarks; pull would also merge into your branch.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why did your first push need -u origin main?',
              options: [
                { id: 'a', text: 'To encrypt the upload', correct: false },
                { id: 'b', text: 'To create the remote branch AND link yours to it for future plain pushes', correct: true },
                { id: 'c', text: 'It is always required', correct: false },
                { id: 'd', text: 'To force push', correct: false },
              ],
              explanation:
                '-u sets the upstream tracking relationship — after it, git push/pull know where to go.',
            },
          ],
        },
        {
          id: 'github-flow',
          title: 'The pull-request workflow',
          minutes: 11,
          blurb: 'Feature branches + PRs — how teams actually ship.',
          concept: [
            {
              heading: 'GitHub Flow',
              body: 'The simple workflow most teams run: 1) branch from main (`feature/...`), 2) commit your work, 3) push the branch, 4) open a **Pull Request** — a proposal to merge, with diff view and discussion, 5) review + CI checks run (your Vercel previews are exactly this), 6) merge into main, delete the branch. Main stays always-deployable; every change gets eyes before landing.',
            },
            {
              heading: 'What a PR really is',
              body: 'A PR is **not a Git object** — it is the platform’s conversation wrapped around a branch comparison: line comments, requested changes, approvals, and status checks (tests, builds, previews) that can **block merging** until green. Push more commits to the same branch and the open PR updates automatically — that is how you respond to review feedback.',
            },
            {
              heading: 'The three merge buttons',
              body: 'GitHub offers: **Merge commit** (true history, a join bubble), **Squash and merge** (all branch commits collapse into ONE on main — tidy, very popular: messy WIP commits vanish), and **Rebase and merge** (replay each commit linearly). Squash is the common default for feature branches; know all three to read any repo’s history.',
            },
          ],
          codeSamples: [
            {
              title: 'A full feature cycle',
              filename: 'terminal',
              language: 'bash',
              code: "git switch -c feature/dark-mode     # 1. branch\n# ... work, commit, repeat ...\ngit push -u origin feature/dark-mode  # 2. publish the branch\n\n# 3. open PR (website button, or GitHub CLI):\ngh pr create --title \"Add dark mode\" --fill\n\n# 4. review feedback? just keep pushing — the PR follows\ngit commit -m \"Apply review notes\"\ngit push\n\n# 5. merged on GitHub -> clean up locally\ngit switch main\ngit pull\ngit branch -d feature/dark-mode",
              annotations: [
                { line: 6, note: 'gh — GitHub’s official CLI — drives PRs from the terminal.' },
                { line: 9, note: 'New pushes to the branch update the open PR automatically.' },
                { line: 13, note: 'After merge: update local main and delete the done branch.' },
              ],
              explanation:
                'Branch → push → PR → iterate → merge → clean up: the loop professional teams run dozens of times daily.',
            },
          ],
          keyPoints: [
            'GitHub Flow: branch → commits → push → PR → review/CI → merge → delete.',
            'A PR = conversation + checks around a branch diff; pushes update it live.',
            'Status checks (tests/builds/previews) can block merging until green.',
            'Merge buttons: merge commit (truth), **squash** (one tidy commit — popular), rebase (linear).',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'You got review feedback on an open PR. How do you update it?',
              options: [
                { id: 'a', text: 'Close it and open a new one', correct: false },
                { id: 'b', text: 'Commit and push to the same branch — the PR updates itself', correct: true },
                { id: 'c', text: 'Email the diff', correct: false },
                { id: 'd', text: 'Edit files on the website only', correct: false },
              ],
              explanation:
                'A PR tracks its branch — every new push appears in the PR immediately.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does "Squash and merge" do?',
              options: [
                { id: 'a', text: 'Deletes the branch without merging', correct: false },
                { id: 'b', text: 'Collapses all branch commits into a single commit on main', correct: true },
                { id: 'c', text: 'Creates one commit per file', correct: false },
                { id: 'd', text: 'Merges without review', correct: false },
              ],
              explanation:
                'Squash trades detailed branch history for one clean commit — WIP noise never reaches main.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'In GitHub Flow, what is the role of main?',
              options: [
                { id: 'a', text: 'Experimental playground', correct: false },
                { id: 'b', text: 'Always-deployable truth — changes land only via reviewed PRs', correct: true },
                { id: 'c', text: 'Backup branch', correct: false },
                { id: 'd', text: 'One branch per developer', correct: false },
              ],
              explanation:
                'Keeping main green and deployable is the entire point of routing work through branches and PRs.',
            },
          ],
        },
        {
          id: 'sync-scenarios',
          title: 'When histories diverge',
          minutes: 12,
          blurb: 'pull --rebase, force-with-lease — the sync situations decoded.',
          concept: [
            {
              heading: 'The diverged state',
              body: 'You committed locally; meanwhile teammates pushed. Now `status` says "ahead 1, behind 2" — both sides have commits the other lacks. Plain `git pull` resolves this with a **merge commit** in your branch. Clean alternative: `git pull --rebase` — fetch, then replay your local commits **on top of** the news: linear, no merge bubble. Since your local commits were unpushed, the golden rule is respected.',
            },
            {
              heading: 'Force pushing — the sharp knife',
              body: 'After rewriting local history (amend/rebase) of a branch you already pushed, plain push is refused. `git push --force` overwrites the server **blindly** — destroying anything teammates pushed meanwhile. `git push --force-with-lease` overwrites **only if the server is exactly where you last saw it** — aborting if someone added work. On personal feature branches with-lease is routine (e.g., after responding to review with a rebase); on shared main it is forbidden, often by server rule.',
            },
            {
              heading: 'A sane default setup',
              body: 'Many teams set `git config pull.rebase true` (pull always rebases local commits — linear by default) plus `rebase.autoStash true` (uncommitted changes are stashed/restored around it automatically). With these two settings, the everyday sync friction mostly disappears.',
            },
          ],
          codeSamples: [
            {
              title: 'Diverged — both resolutions',
              filename: 'terminal',
              language: 'bash',
              code: "git status\n# Your branch and 'origin/main' have diverged,\n# and have 1 and 2 different commits each.\n\n# Option A: merge (default pull) — truthful, adds a bubble\ngit pull\n\n# Option B: rebase pull — your commit replays on top, linear\ngit pull --rebase\n\n# After rebasing an already-pushed PERSONAL branch:\ngit push --force-with-lease\n# refuses if a teammate pushed meanwhile — the safe force\n\n# Make linear the default once:\ngit config --global pull.rebase true\ngit config --global rebase.autoStash true",
              annotations: [
                { line: 9, note: 'Your unpushed commits move on top of the team’s — no merge commit.' },
                { line: 12, note: 'with-lease = force, but only if the server matches your last fetch.' },
                { line: 16, note: 'Set once; everyday pulls become clean by default.' },
              ],
              explanation:
                'Plain --force should essentially never leave your fingers; --force-with-lease asks the server "still as I saw you?" first.',
            },
          ],
          keyPoints: [
            'Diverged = both sides committed; pull merges, `pull --rebase` keeps it linear.',
            'Rebasing unpushed local commits respects the golden rule.',
            '`--force-with-lease` = force only if the server is as you last saw it.',
            'Plain `--force` on shared branches destroys teammates’ work — never.',
            'Config once: `pull.rebase true` + `rebase.autoStash true`.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does git pull --rebase do with your local unpushed commits?',
              options: [
                { id: 'a', text: 'Deletes them', correct: false },
                { id: 'b', text: 'Replays them on top of the newly fetched commits — linear history', correct: true },
                { id: 'c', text: 'Pushes them first', correct: false },
                { id: 'd', text: 'Creates a merge commit', correct: false },
              ],
              explanation:
                'Fetch the news, then your commits move on top — no merge bubble, golden rule intact (they were unpushed).',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why prefer --force-with-lease over --force?',
              options: [
                { id: 'a', text: 'It is faster', correct: false },
                { id: 'b', text: 'It refuses to overwrite if someone pushed since your last fetch', correct: true },
                { id: 'c', text: 'It does not rewrite history', correct: false },
                { id: 'd', text: 'It works without internet', correct: false },
              ],
              explanation:
                'with-lease checks the server still matches your bookmark — blind force checks nothing and can erase teammates’ commits.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: '"ahead 1, behind 2" means:',
              options: [
                { id: 'a', text: 'You have 1 commit they lack; they have 2 you lack', correct: true },
                { id: 'b', text: 'You are 1 file ahead', correct: false },
                { id: 'c', text: 'Two conflicts exist', correct: false },
                { id: 'd', text: 'You must force push', correct: false },
              ],
              explanation:
                'Ahead/behind counts commits in each direction between your branch and its upstream bookmark.',
            },
          ],
        },
        {
          id: 'gitignore-files',
          title: 'gitignore & controlling what is tracked',
          minutes: 10,
          blurb: 'Keep secrets, builds, and bulk out of history — correctly.',
          concept: [
            {
              heading: 'What never belongs in a repo',
              body: 'Three categories stay out: **generated** things (node_modules, dist, caches — rebuildable from source), **secrets** (.env files, keys, tokens — git history is forever and public-ish), and **machine junk** (.DS_Store, editor folders). Your SkillForge .gitignore already covers the Angular set.',
            },
            {
              heading: 'gitignore syntax',
              body: 'One pattern per line: `node_modules/` (a directory anywhere), `*.log` (by extension), `/dist` (root-relative only), `!keep.me` (exception — do NOT ignore this), `**/temp` (any depth). Comments with `#`. Patterns apply to **untracked** files only — which leads to the classic gotcha.',
            },
            {
              heading: 'The classic gotcha: already-tracked files',
              body: 'Adding a file to .gitignore does **nothing** if it was already committed — Git keeps tracking it. The fix: `git rm --cached <file>` (remove from tracking, keep on disk), commit, and now the ignore rule applies. And if a **secret** was ever committed: removing it now is not enough — it lives in history; rotate the secret (change the key) and, when serious, scrub history with dedicated tools.',
            },
          ],
          codeSamples: [
            {
              title: 'Ignore patterns + the untracking fix',
              filename: '.gitignore + terminal',
              language: 'bash',
              code: "# .gitignore\nnode_modules/\ndist/\n*.log\n.env\n.env.*\n!.env.example        # the template MAY be committed\n.DS_Store\n\n# --- oops, .env was committed before the rule existed: ---\ngit rm --cached .env       # untrack it (file stays on disk)\ngit commit -m \"Stop tracking .env\"\n# AND rotate any secret that was inside — history remembers!",
              annotations: [
                { line: 7, note: '! negates: commit the example template, ignore real env files.' },
                { line: 11, note: 'rm --cached: removes from Git’s tracking, not from your disk.' },
                { line: 13, note: 'A leaked secret is compromised forever — rotation, not deletion.' },
              ],
              explanation:
                'gitignore prevents; rm --cached repairs; rotation is the only honest answer to leaked secrets.',
            },
          ],
          keyPoints: [
            'Ignore: generated files, secrets, machine junk — they are rebuildable, dangerous, or noise.',
            'Patterns: `dir/`, `*.ext`, `/root-only`, `!exception`, `**/any-depth`.',
            '.gitignore affects only **untracked** files — already-committed files keep being tracked.',
            'Fix: `git rm --cached <file>` then commit; leaked secrets must be **rotated**.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'You add dist/ to .gitignore, but dist files were committed last week. What happens?',
              options: [
                { id: 'a', text: 'They are removed automatically', correct: false },
                { id: 'b', text: 'Git keeps tracking them — ignore rules only affect untracked files', correct: true },
                { id: 'c', text: 'They are deleted from disk', correct: false },
                { id: 'd', text: 'History is rewritten', correct: false },
              ],
              explanation:
                'The rule prevents future adds; untracking the existing ones needs git rm --cached.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does git rm --cached .env do?',
              options: [
                { id: 'a', text: 'Deletes .env from disk', correct: false },
                { id: 'b', text: 'Stops tracking .env but leaves the file on disk', correct: true },
                { id: 'c', text: 'Encrypts it', correct: false },
                { id: 'd', text: 'Clears Git caches', correct: false },
              ],
              explanation:
                '--cached removes only from the index/tracking — the working file survives untouched.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'An API key was committed and pushed last month. The sufficient fix is:',
              options: [
                { id: 'a', text: 'Delete it in a new commit', correct: false },
                { id: 'b', text: 'Rotate (replace) the key — history preserves the old one forever', correct: true },
                { id: 'c', text: 'Add it to .gitignore', correct: false },
                { id: 'd', text: 'Rename the file', correct: false },
              ],
              explanation:
                'Anyone with repo access can read old commits — a leaked credential is burned and must be replaced.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 4 — RESCUE & ARCHAEOLOGY
    // ===================================================================
    {
      id: 'l4-rescue',
      order: 4,
      title: 'Level 4 — Rescue & archaeology',
      goal: 'Recover anything with reflog, shelve work with stash, move single commits, and investigate history like a detective.',
      lessons: [
        {
          id: 'reflog-recovery',
          title: 'reflog — the safety net',
          minutes: 11,
          blurb: 'Why almost nothing committed is ever truly lost.',
          concept: [
            {
              heading: 'The journal of HEAD',
              body: '`git reflog` shows everywhere HEAD has pointed for the last ~90 days: every commit, switch, reset, rebase, merge — including states that no branch points to anymore. A "deleted" commit after `reset --hard`? Its hash is right there in the reflog, recoverable. The reflog is **local only** (never pushed) — your private undo journal.',
            },
            {
              heading: 'The recovery recipe',
              body: 'Disaster recipe: 1) breathe — committed work is almost certainly alive, 2) `git reflog` and find the entry just **before** the mistake, 3) recover: `git reset --hard HEAD@{2}` (move back to that state) or `git branch rescue <hash>` (plant a new branch on the lost commit — the gentlest option). The notation `HEAD@{n}` means "where HEAD was n moves ago".',
            },
            {
              heading: 'What reflog cannot save',
              body: 'The honest limits: work that was **never committed** (discarded by `restore` or `reset --hard` before any commit) and **untracked** files deleted before being added. Hence the deepest Git habit: **commit early, commit often** — even ugly WIP commits. You can always squash ugliness later (Level 5); you cannot resurrect what was never recorded.',
            },
          ],
          codeSamples: [
            {
              title: 'Resurrecting after a bad reset',
              filename: 'terminal',
              language: 'bash',
              code: "git reset --hard HEAD~3      # OOPS — three commits \"gone\"\n\ngit reflog\n# 1a2b3c4 HEAD@{0}: reset: moving to HEAD~3\n# 9f8e7d6 HEAD@{1}: commit: Add payment validation   <- alive!\n# 8e7d6c5 HEAD@{2}: commit: Add cart totals\n# 7d6c5b4 HEAD@{3}: commit: Add product page\n\n# Option 1: move the branch right back\ngit reset --hard 9f8e7d6\n\n# Option 2 (gentler): plant a rescue branch on the lost tip\ngit branch rescue 9f8e7d6",
              annotations: [
                { line: 3, note: 'The journal: every move of HEAD, newest first.' },
                { line: 5, note: 'The \"lost\" commits still exist — nothing pointed at them, that is all.' },
                { line: 13, note: 'A new branch label makes the lost chain reachable again — zero risk.' },
              ],
              explanation:
                'Commits without a branch are unreachable, not erased — reflog is the index of the unreachable.',
            },
          ],
          keyPoints: [
            '`reflog` = local journal of every HEAD move (~90 days) — including "lost" states.',
            'Recover: find the pre-mistake entry → `reset --hard <hash>` or `branch rescue <hash>`.',
            '`HEAD@{n}` = where HEAD was n moves ago.',
            'reflog cannot save never-committed work → commit early, commit often.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'After reset --hard HEAD~3, where did the three commits go?',
              options: [
                { id: 'a', text: 'Permanently deleted', correct: false },
                { id: 'b', text: 'Still in the repository, just unreachable — findable via reflog', correct: true },
                { id: 'c', text: 'Moved to the remote', correct: false },
                { id: 'd', text: 'Into the staging area', correct: false },
              ],
              explanation:
                'reset moves a pointer; the commits stay in the object database, listed in the reflog.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is the gentlest way to recover a lost commit found in reflog?',
              options: [
                { id: 'a', text: 'git push --force', correct: false },
                { id: 'b', text: 'git branch rescue <hash> — make it reachable with a new branch', correct: true },
                { id: 'c', text: 'Reinstall Git', correct: false },
                { id: 'd', text: 'Copy files manually', correct: false },
              ],
              explanation:
                'Planting a branch on the hash changes nothing else — you can inspect and merge at leisure.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which loss can reflog NOT undo?',
              options: [
                { id: 'a', text: 'A reset branch', correct: false },
                { id: 'b', text: 'Edits discarded before ever being committed', correct: true },
                { id: 'c', text: 'A deleted branch label', correct: false },
                { id: 'd', text: 'An abandoned rebase', correct: false },
              ],
              explanation:
                'The journal tracks commits. Never-committed work has no commit to return to — hence: commit often.',
            },
          ],
        },
        {
          id: 'stash',
          title: 'stash — the work shelf',
          minutes: 10,
          blurb: 'Park uncommitted changes, switch context, come back clean.',
          concept: [
            {
              heading: 'The interruption problem',
              body: 'Mid-feature, an urgent bug arrives. Your changes are half-done — not commit-worthy, but switching branches would carry or block them. `git stash` sweeps all uncommitted changes (staged + unstaged) onto a shelf, leaving the working directory **clean**. Fix the bug on another branch, return, `git stash pop` — your work is back exactly as it was.',
            },
            {
              heading: 'The toolkit',
              body: '`stash` (shelve), `stash list` (the shelf — multiple stashes stack up), `stash pop` (restore newest + remove from shelf), `stash apply` (restore but **keep** on shelf — safer when unsure), `stash -u` (include untracked files — new files are NOT stashed by default!), `stash -m "msg"` (label it), `stash drop` / `clear` (discard). Conflicts on pop are resolved like merge conflicts.',
            },
            {
              heading: 'Stash vs WIP commit',
              body: 'Stashes are local, unlabeled by default, and easy to forget — a graveyard of mystery stashes is a known smell. For anything beyond hours, prefer a **WIP commit on your feature branch** (`git commit -m "WIP"`), pushable and visible; soften it later with `reset --soft` or squash it in the PR. Stash is for **short** interruptions; commits are for real save points.',
            },
          ],
          codeSamples: [
            {
              title: 'The interruption dance',
              filename: 'terminal',
              language: 'bash',
              code: "# half-done work on feature/reports...\ngit stash -u -m \"reports table half done\"\n# working directory is now clean\n\ngit switch main\ngit switch -c fix/crash-on-login\n# ... fix, commit, push, PR ...\n\ngit switch feature/reports\ngit stash list\n# stash@{0}: On feature/reports: reports table half done\ngit stash pop            # work restored, shelf entry removed",
              annotations: [
                { line: 2, note: '-u includes new (untracked) files; -m labels the stash for future-you.' },
                { line: 10, note: 'The shelf survives branch switches — stashes are repo-wide.' },
                { line: 12, note: 'pop = apply + drop. Use apply instead when you want to keep a copy.' },
              ],
              explanation:
                'Stash for the 20-minute interruption; a WIP commit for anything that might last longer.',
            },
          ],
          keyPoints: [
            '`stash` shelves all uncommitted changes; `pop` restores and removes.',
            '`-u` includes untracked files (excluded by default!); `-m` labels.',
            '`apply` restores but keeps the stash — the cautious variant.',
            'Long interruptions deserve a WIP commit on a branch, not a forgotten stash.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'You created a brand-new file, then ran plain git stash. Where is the file?',
              options: [
                { id: 'a', text: 'In the stash', correct: false },
                { id: 'b', text: 'Still sitting in your working directory — untracked files need stash -u', correct: true },
                { id: 'c', text: 'Deleted', correct: false },
                { id: 'd', text: 'Committed', correct: false },
              ],
              explanation:
                'Plain stash takes tracked changes only; -u (or --include-untracked) brings new files along.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'pop vs apply?',
              options: [
                { id: 'a', text: 'Identical', correct: false },
                { id: 'b', text: 'pop restores and deletes the stash; apply restores and keeps it', correct: true },
                { id: 'c', text: 'apply is for branches only', correct: false },
                { id: 'd', text: 'pop pushes to remote', correct: false },
              ],
              explanation:
                'apply leaves the shelf entry as a backup — useful when restoring onto a different branch.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Half-done work that will wait several days. Best vehicle?',
              options: [
                { id: 'a', text: 'A stash', correct: false },
                { id: 'b', text: 'A WIP commit on the feature branch (squash or soften later)', correct: true },
                { id: 'c', text: 'A copy on the desktop', correct: false },
                { id: 'd', text: 'reset --hard', correct: false },
              ],
              explanation:
                'Commits are visible, pushable, and backed up; old stashes are forgettable and local-only.',
            },
          ],
        },
        {
          id: 'cherry-pick-tags',
          title: 'cherry-pick & tags',
          minutes: 10,
          blurb: 'Copy one commit anywhere; name the moments that matter.',
          concept: [
            {
              heading: 'cherry-pick — one commit, transplanted',
              body: '`git cherry-pick <hash>` takes the **change** introduced by any commit and applies it as a **new commit** on your current branch. The classic use: a bug fixed on main must also land on a release branch — cherry-pick the fix commit onto it. Like rebase, the copy has a new hash; the original stays where it was.',
            },
            {
              heading: 'Tags — permanent bookmarks',
              body: 'A **tag** names a commit forever: `v1.0.0`, `v2.3.1`. Unlike branches, tags do not move. **Annotated** tags (`-a -m`) carry author/date/message and are the standard for releases. Tags need explicit pushing: `git push origin v1.0.0` (or `--tags`). On GitHub, a pushed tag is what a **Release** (with notes and artifacts) hangs on.',
            },
            {
              heading: 'Versioning conventions',
              body: 'Tags usually follow **semantic versioning**: `MAJOR.MINOR.PATCH` — breaking change / new feature / bug fix. Checking out a tag puts you in "detached HEAD" (you are AT a commit, not ON a branch) — fine for looking around; start a branch (`switch -c`) if you need to commit from there.',
            },
          ],
          codeSamples: [
            {
              title: 'A hotfix flows to a release branch',
              filename: 'terminal',
              language: 'bash',
              code: "# the fix landed on main as commit 4d5e6f7\ngit switch release/2.x\ngit cherry-pick 4d5e6f7\n# [release/2.x 8a9b0c1] Fix checkout crash   <- NEW hash, same change\n\n# tag the patched release\ngit tag -a v2.3.1 -m \"Patch: checkout crash\"\ngit push origin v2.3.1\n\ngit tag -l \"v2.*\"        # list matching tags\ngit show v2.3.1           # what exactly does this version contain?",
              annotations: [
                { line: 3, note: 'The change transplants as a new commit on this branch.' },
                { line: 7, note: 'Annotated tag: the standard, self-documenting release marker.' },
                { line: 8, note: 'Tags do not travel with normal pushes — push them explicitly.' },
              ],
              explanation:
                'cherry-pick moves changes across branches surgically; tags freeze the moments worth naming.',
            },
          ],
          keyPoints: [
            '`cherry-pick <hash>` copies one commit’s change as a new commit here.',
            'Classic use: hotfixes flowing from main to release branches.',
            'Tags are immovable bookmarks; annotated (`-a -m`) is the release standard.',
            'Push tags explicitly; GitHub Releases attach to pushed tags.',
            'SemVer: MAJOR.MINOR.PATCH = breaking / feature / fix.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does cherry-pick produce on the target branch?',
              options: [
                { id: 'a', text: 'A pointer to the original commit', correct: false },
                { id: 'b', text: 'A NEW commit applying the same change (new hash)', correct: true },
                { id: 'c', text: 'A merge of both branches', correct: false },
                { id: 'd', text: 'A tag', correct: false },
              ],
              explanation:
                'The change is replayed as a fresh commit — content travels, identity does not.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'How do branches and tags differ?',
              options: [
                { id: 'a', text: 'They are the same', correct: false },
                { id: 'b', text: 'Branches move as you commit; tags stay on their commit forever', correct: true },
                { id: 'c', text: 'Tags are remote-only', correct: false },
                { id: 'd', text: 'Branches store messages', correct: false },
              ],
              explanation:
                'A branch label rides the tip; a tag is a permanent name for one snapshot — versions, milestones.',
            },
            {
              id: 'q3',
              type: 'truefalse',
              prompt: 'git push automatically uploads your new tags.',
              options: [
                { id: 'a', text: 'True', correct: false },
                { id: 'b', text: 'False', correct: true },
              ],
              explanation:
                'Tags need explicit pushing: git push origin <tag> or git push --tags.',
            },
          ],
        },
        {
          id: 'blame-bisect',
          title: 'blame & bisect — Git as detective',
          minutes: 11,
          blurb: 'Who wrote this line? Which commit broke it? Git answers.',
          concept: [
            {
              heading: 'blame — line-by-line provenance',
              body: '`git blame file.ts` annotates **every line** with the commit, author, and date that last touched it. The real purpose is not blaming people — it is **finding the commit (and its message/PR context) that explains a strange line**. Editor integration (e.g. GitLens) shows this inline. Follow up with `git show <hash>` to see the full change and intent.',
            },
            {
              heading: 'bisect — binary search for bugs',
              body: 'Something broke "recently" but you have 200 suspect commits. `git bisect` runs a **binary search**: mark a bad commit and a known-good one; Git checks out the midpoint; you test and say `good`/`bad`; repeat. 200 commits → ~8 tests. With a test script, `git bisect run ./test.sh` finds the culprit **fully automatically**.',
            },
            {
              heading: 'Searching history at large',
              body: 'The archaeology kit: `git log -S "needle"` (commits that added/removed a string — the pickaxe), `git log -p file` (a file’s full evolution with diffs), `git log --follow file` (history across renames), `git grep "text" <hash>` (search inside an old snapshot). Together: there is almost no "why is the code like this?" that history cannot answer.',
            },
          ],
          codeSamples: [
            {
              title: 'A bisect session',
              filename: 'terminal',
              language: 'bash',
              code: "git bisect start\ngit bisect bad                 # current state is broken\ngit bisect good v1.4.0         # this release was fine\n# Bisecting: 94 revisions left to test (~7 steps)\n\n# Git checks out the midpoint; you test the app, then:\ngit bisect good                # works here -> bug is later\n# ... a few rounds of good/bad ...\n# 7d6c5b4 is the first bad commit\n# Author: ...   Add caching layer to product service\n\ngit bisect reset               # back to where you started\n\n# or fully automatic, if a command can detect the bug:\ngit bisect run npm test",
              annotations: [
                { line: 3, note: 'One bad + one good bound the search; Git halves the range each round.' },
                { line: 9, note: 'The verdict: the exact commit that introduced the bug, plus its context.' },
                { line: 15, note: 'A failing-on-bug command turns the whole hunt into one line.' },
              ],
              explanation:
                'Binary search is why bisect scales: 1000 suspect commits cost only ~10 tests.',
            },
          ],
          keyPoints: [
            '`blame` answers "which commit explains this line?" — then `show` for the story.',
            '`bisect` binary-searches the first bad commit: 200 suspects ≈ 8 tests.',
            '`bisect run <cmd>` automates the entire hunt with a test command.',
            'Archaeology kit: `log -S`, `log -p file`, `log --follow`, `git grep <hash>`.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What question does git blame answer?',
              options: [
                { id: 'a', text: 'Who is the worst developer', correct: false },
                { id: 'b', text: 'Which commit (and author/date) last touched each line', correct: true },
                { id: 'c', text: 'Which branch is current', correct: false },
                { id: 'd', text: 'What will break next', correct: false },
              ],
              explanation:
                'Line-level provenance — the entry point to understanding WHY code looks the way it does.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why does bisect need ~8 tests for ~200 commits?',
              options: [
                { id: 'a', text: 'It tests randomly', correct: false },
                { id: 'b', text: 'Binary search halves the suspect range each round (2^8 = 256)', correct: true },
                { id: 'c', text: 'It skips most commits arbitrarily', correct: false },
                { id: 'd', text: 'It tests every commit', correct: false },
              ],
              explanation:
                'Each good/bad verdict eliminates half the remaining range — logarithmic, not linear.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which command finds commits that introduced or removed the string "apiKey"?',
              options: [
                { id: 'a', text: 'git blame apiKey', correct: false },
                { id: 'b', text: 'git log -S "apiKey"', correct: true },
                { id: 'c', text: 'git grep history', correct: false },
                { id: 'd', text: 'git bisect apiKey', correct: false },
              ],
              explanation:
                'The pickaxe (-S) searches DIFFS across all history — when did this text enter or leave the code?',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 5 — PROFESSIONAL PRACTICE
    // ===================================================================
    {
      id: 'l5-pro',
      order: 5,
      title: 'Level 5 — Professional practice',
      goal: 'Craft commit history deliberately, master interactive rebase, choose team workflows, and peek inside .git.',
      lessons: [
        {
          id: 'good-commits',
          title: 'Crafting commits & messages',
          minutes: 10,
          blurb: 'Atomic commits, conventional messages, partial staging.',
          concept: [
            {
              heading: 'Atomic commits',
              body: 'One commit = **one logical change** that builds and passes tests: a renamed function and its 40 call sites (one change!), not "rename + new feature + drive-by fix" (three). Atomic commits make `revert` surgical, `bisect` precise, and reviews readable. The enabling tool: `git add -p` — stage **hunks** interactively, splitting a messy working directory into clean separate commits.',
            },
            {
              heading: 'Message craft',
              body: 'The format the ecosystem agrees on: an **imperative summary ≤ 50 chars** ("Add cart total rounding"), a blank line, then a body explaining **why** (the diff already shows the what). The reader of your message is a debugger at 2 AM, two years from now — probably you.',
            },
            {
              heading: 'Conventional Commits',
              body: 'Many teams prefix a type: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, with optional scope — `feat(quiz): add timer`. Machines parse these to **auto-generate changelogs and version bumps** (feat → minor, fix → patch, `feat!:` breaking → major). You have been writing reasonable messages all along with publish.ps1 — this just adds grammar.',
            },
          ],
          codeSamples: [
            {
              title: 'Partial staging + a conventional message',
              filename: 'terminal',
              language: 'bash',
              code: "git add -p src/cart.service.ts\n# Stage this hunk [y,n,q,a,d,s,e,?]?  y     <- the rounding fix\n# Stage this hunk [y,n,q,a,d,s,e,?]?  n     <- unrelated refactor, next commit\n\ngit commit -m \"fix(cart): round totals to 2 decimals\" -m \"Floating point sums produced totals like 19.999999. Round at the boundary instead of per item to avoid accumulating error.\"\n\ngit add src/cart.service.ts\ngit commit -m \"refactor(cart): extract price helpers\"",
              annotations: [
                { line: 1, note: 'add -p: approve changes hunk by hunk — the atomic-commit enabler.' },
                { line: 5, note: 'Second -m = the body: the WHY that the diff cannot show.' },
                { line: 8, note: 'The unrelated change becomes its own clean commit.' },
              ],
              explanation:
                'One working directory, two clean commits — history that reads like a changelog because it is one.',
            },
          ],
          keyPoints: [
            'Atomic: one logical change per commit, building and passing.',
            '`git add -p` stages hunk-by-hunk — split messy work into clean commits.',
            'Message: imperative ≤50-char summary, blank line, body explains **why**.',
            'Conventional Commits (`feat:`, `fix:`...) enable auto-changelogs and versioning.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does git add -p let you do?',
              options: [
                { id: 'a', text: 'Push partially', correct: false },
                { id: 'b', text: 'Stage individual hunks of a file, not all of it', correct: true },
                { id: 'c', text: 'Add files in parallel', correct: false },
                { id: 'd', text: 'Preview the log', correct: false },
              ],
              explanation:
                'Interactive staging approves change-by-change — the tool that makes atomic commits practical.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What belongs in the commit message BODY?',
              options: [
                { id: 'a', text: 'The list of changed files', correct: false },
                { id: 'b', text: 'The WHY — context and reasoning the diff cannot express', correct: true },
                { id: 'c', text: 'The full diff', correct: false },
                { id: 'd', text: 'Nothing, bodies are forbidden', correct: false },
              ],
              explanation:
                'The diff shows what changed; only the message can preserve why it had to.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'In Conventional Commits, what does a "feat:" prefix signal to tooling?',
              options: [
                { id: 'a', text: 'A bug fix → patch version', correct: false },
                { id: 'b', text: 'A new feature → minor version bump and a changelog entry', correct: true },
                { id: 'c', text: 'Documentation only', correct: false },
                { id: 'd', text: 'A breaking change always', correct: false },
              ],
              explanation:
                'feat→minor, fix→patch, feat!/BREAKING→major — machines turn your prefixes into releases.',
            },
          ],
        },
        {
          id: 'interactive-rebase',
          title: 'Interactive rebase — history surgery',
          minutes: 12,
          blurb: 'squash, reword, reorder — polish before publishing.',
          concept: [
            {
              heading: 'The todo list',
              body: '`git rebase -i HEAD~4` opens your last 4 commits as an editable **script**: each line = one commit + an action. Change `pick` to `reword` (edit message), `squash` (melt into previous, merge messages), `fixup` (melt, discard message), `drop` (delete), `edit` (pause to amend) — or reorder the lines. Save and close; Git replays accordingly.',
            },
            {
              heading: 'The classic cleanup',
              body: 'Your honest WIP trail — "WIP", "fix typo", "actually works now" — becomes one professional commit: mark the noise as `fixup` under the real commit, `reword` its message, done. This is how the elegant histories you admire are actually made: written messy, **edited before publishing**. Same golden rule as ever: only unpushed commits.',
            },
            {
              heading: 'autosquash — the power shortcut',
              body: 'Fixing an older commit while reviewing? `git commit --fixup <hash>` creates a specially-titled commit, and `git rebase -i --autosquash` later **slots it automatically** under its target with fixup pre-selected. Teams responding to PR feedback use this loop constantly: fixup commits during review, one autosquash before merge.',
            },
          ],
          codeSamples: [
            {
              title: 'From WIP trail to clean history',
              filename: 'terminal',
              language: 'bash',
              code: "git rebase -i HEAD~4\n# editor opens with the todo script:\npick a1b2c3d Add quiz timer component\npick b2c3d4e WIP\npick c3d4e5f fix typo\npick d4e5f6a actually works now\n\n# you edit it to:\npick   a1b2c3d Add quiz timer component\nfixup  b2c3d4e WIP\nfixup  c3d4e5f fix typo\nfixup  d4e5f6a actually works now\n\n# save & close -> four commits become ONE:\n# a9f8e7d Add quiz timer component",
              annotations: [
                { line: 1, note: 'Open the last 4 commits as an editable plan.' },
                { line: 10, note: 'fixup: melt into the commit above, discard the noise message.' },
                { line: 15, note: 'New hash — it IS a rebase. Unpushed commits only.' },
              ],
              explanation:
                'Write history honestly, edit it deliberately, publish it clean — the professional rhythm.',
            },
          ],
          keyPoints: [
            '`rebase -i HEAD~n` opens commits as an editable script.',
            'Actions: `reword`, `squash` (merge + keep messages), `fixup` (merge, drop message), `drop`, reorder.',
            'The cleanup pattern: WIP commits → fixup → one professional commit.',
            '`commit --fixup <hash>` + `rebase -i --autosquash` automate review-feedback cleanup.',
            'It rewrites hashes — unpushed history only.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'squash vs fixup in the rebase todo?',
              options: [
                { id: 'a', text: 'Identical', correct: false },
                { id: 'b', text: 'Both melt into the previous commit; squash keeps both messages, fixup discards the melted one', correct: true },
                { id: 'c', text: 'fixup deletes the commit entirely', correct: false },
                { id: 'd', text: 'squash pushes automatically', correct: false },
              ],
              explanation:
                'fixup is squash-without-the-message — perfect for "fix typo" noise.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'You only want to fix a commit MESSAGE three commits back. Which action?',
              options: [
                { id: 'a', text: 'drop', correct: false },
                { id: 'b', text: 'reword', correct: true },
                { id: 'c', text: 'squash', correct: false },
                { id: 'd', text: 'edit', correct: false },
              ],
              explanation:
                'reword replays the commit unchanged but pauses to let you rewrite its message.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why must interactive rebase stay off pushed branches (without coordination)?',
              options: [
                { id: 'a', text: 'It is slower on remotes', correct: false },
                { id: 'b', text: 'It rewrites commits into new hashes — the golden rule applies fully', correct: true },
                { id: 'c', text: 'GitHub forbids it everywhere', correct: false },
                { id: 'd', text: 'No reason', correct: false },
              ],
              explanation:
                'Interactive rebase IS rebase — replayed commits are new objects, and shared history must not vanish.',
            },
          ],
        },
        {
          id: 'team-workflows',
          title: 'Team workflows & automation',
          minutes: 11,
          blurb: 'GitHub Flow vs Git Flow vs trunk-based — plus hooks and CI.',
          concept: [
            {
              heading: 'The three families',
              body: '**GitHub Flow** (you know it): branch → PR → merge to always-deployable main. Simple, fits continuous deployment — web apps like yours. **Git Flow**: long-lived develop + release/hotfix branches — heavyweight, suits versioned/installed software with parallel maintained versions. **Trunk-based**: everyone integrates to main within a day or less, incomplete features hidden behind **feature flags** — what elite-velocity teams run, demanding strong automated tests.',
            },
            {
              heading: 'Hooks — scripts on Git events',
              body: 'Git runs scripts at lifecycle points: **pre-commit** (lint/format staged code — block bad commits before they exist), **commit-msg** (enforce Conventional Commits), **pre-push** (run tests). In JS projects, **husky** + **lint-staged** manage these from package.json so every teammate gets them on npm install. Hooks are advisory (a flag skips them) — the server-side CI remains the real gate.',
            },
            {
              heading: 'Where Git meets CI/CD',
              body: 'Git events drive automation: a push triggers builds/tests (GitHub Actions), a PR triggers preview deployments (your Vercel previews), a merge to main triggers production deploys, a tag triggers releases. **Branch protection rules** encode the workflow on the server: no direct pushes to main, required reviews, required green checks. Your SkillForge pipeline is a real CD setup already.',
            },
          ],
          codeSamples: [
            {
              title: 'Quality gates: hooks + branch protection',
              filename: 'package.json + GitHub settings',
              language: 'text',
              code: "// package.json (husky + lint-staged)\n{\n  \"lint-staged\": {\n    \"*.ts\": [\"eslint --fix\", \"prettier --write\"]\n  }\n}\n// .husky/pre-commit ->  npx lint-staged\n// .husky/commit-msg ->  npx commitlint --edit\n\nGitHub -> Settings -> Branches -> Protect 'main':\n  [x] Require a pull request before merging\n  [x] Require approvals (1+)\n  [x] Require status checks to pass (build, tests)\n  [x] Block force pushes",
              annotations: [
                { line: 4, note: 'Only STAGED files are linted/formatted — fast, focused.' },
                { line: 7, note: 'The hook runs at every commit, for every teammate, automatically.' },
                { line: 11, note: 'The server-enforced workflow: nothing lands on main unreviewed or red.' },
              ],
              explanation:
                'Local hooks catch problems in seconds; branch protection guarantees them at the door — layers, not alternatives.',
            },
          ],
          keyPoints: [
            'GitHub Flow: PRs to deployable main — the web-app default (yours).',
            'Git Flow: develop/release/hotfix branches — versioned software.',
            'Trunk-based: tiny fast merges + feature flags — elite velocity, strong tests required.',
            'Hooks (husky/lint-staged): lint, message checks, tests at commit/push time.',
            'Branch protection encodes the rules server-side: reviews + green checks required.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Which workflow fits a continuously deployed web app like SkillForge?',
              options: [
                { id: 'a', text: 'Git Flow with release branches', correct: false },
                { id: 'b', text: 'GitHub Flow — feature branches into an always-deployable main', correct: true },
                { id: 'c', text: 'Emailing patches', correct: false },
                { id: 'd', text: 'One commit per month', correct: false },
              ],
              explanation:
                'Continuous deployment wants a simple always-green main — exactly GitHub Flow’s design.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does a pre-commit hook typically do?',
              options: [
                { id: 'a', text: 'Deploys to production', correct: false },
                { id: 'b', text: 'Lints/formats staged code and can block the commit if broken', correct: true },
                { id: 'c', text: 'Creates branches', correct: false },
                { id: 'd', text: 'Backs up the repo', correct: false },
              ],
              explanation:
                'Hooks run scripts on Git events — pre-commit is the classic lint/format gate.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'How does trunk-based development handle unfinished features on main?',
              options: [
                { id: 'a', text: 'It never has them', correct: false },
                { id: 'b', text: 'Behind feature flags — merged but switched off', correct: true },
                { id: 'c', text: 'In month-long branches', correct: false },
                { id: 'd', text: 'By reverting daily', correct: false },
              ],
              explanation:
                'Flags decouple deployment from release: code integrates continuously, users see it when toggled.',
            },
          ],
        },
        {
          id: 'git-internals',
          title: 'Inside .git — and your toolkit',
          minutes: 10,
          blurb: 'Objects and content-addressing — why Git is trustworthy.',
          concept: [
            {
              heading: 'Four object types',
              body: 'Everything in `.git` reduces to four object kinds: **blob** (file content), **tree** (a directory: names → blobs/trees), **commit** (a tree + parent(s) + author + message), and **tag** (a named pointer). A branch is literally a 41-byte file with a commit hash. The magic dissolves: Git is a tiny object database plus pointer bookkeeping.',
            },
            {
              heading: 'Content addressing',
              body: 'Every object’s ID is the **SHA-1/SHA-256 hash of its content**. Same content → same hash; any tampering → different hash, breaking every reference to it. This gives Git deduplication for free (a thousand snapshots of an unchanged file = one blob) and **cryptographic integrity**: a history cannot be silently altered.',
            },
            {
              heading: 'Your toolkit, assembled',
              body: 'Daily drivers worth knowing: **VS Code Git + GitLens** (inline blame, history), **gh CLI** (PRs from the terminal), graphical clients (Fork, GitKraken) for complex graph surgery, and `git log --oneline --graph --all` as the universal X-ray. With the mental model from Level 1 and the rescue kit from Level 4, no Git situation should scare you again — that was the goal of this course.',
            },
          ],
          codeSamples: [
            {
              title: 'Peeking under the hood',
              filename: 'terminal',
              language: 'bash',
              code: "cat .git/HEAD\n# ref: refs/heads/main          <- HEAD points at a branch\n\ncat .git/refs/heads/main\n# f3e2d1c0a9b8...                <- a branch IS just a hash\n\ngit cat-file -t f3e2d1c          # what kind of object?\n# commit\ngit cat-file -p f3e2d1c          # print it\n# tree 8a7b6c5d...               <- the snapshot\n# parent 9c8b7a6e...             <- the chain of history\n# author Kosay <...>\n# Add RxJS course\n\ngit cat-file -p 8a7b6c5          # the tree: filenames -> blobs/trees",
              annotations: [
                { line: 4, note: 'The entire mystery of branches: one file, one hash.' },
                { line: 9, note: 'A commit object: tree + parent + author + message. That is all.' },
                { line: 11, note: 'Parent links form history; tree links form the snapshot.' },
              ],
              explanation:
                'Ten minutes of cat-file turns Git from magic into a beautifully simple design you can reason about.',
            },
          ],
          keyPoints: [
            'Four objects: blob (content), tree (directory), commit (snapshot+parent+meta), tag.',
            'IDs are content hashes → deduplication + tamper-evident history.',
            'A branch is one file containing one hash — everything else follows.',
            'Toolkit: GitLens, gh CLI, a graph GUI, and `log --oneline --graph --all`.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What is a Git commit object made of?',
              options: [
                { id: 'a', text: 'A zip of changed files', correct: false },
                { id: 'b', text: 'A tree reference + parent reference(s) + author + message', correct: true },
                { id: 'c', text: 'A list of diffs', correct: false },
                { id: 'd', text: 'Branch names', correct: false },
              ],
              explanation:
                'The tree is the snapshot; parents chain history; the rest is metadata. Four fields, the whole design.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why does identical file content across 100 commits cost almost nothing?',
              options: [
                { id: 'a', text: 'Compression only', correct: false },
                { id: 'b', text: 'Content addressing: same content = same hash = stored once', correct: true },
                { id: 'c', text: 'Git skips storing it', correct: false },
                { id: 'd', text: 'It actually costs 100x', correct: false },
              ],
              explanation:
                'Objects are keyed by their content hash — unchanged files are shared by every snapshot referencing them.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why is tampering with an old commit detectable?',
              options: [
                { id: 'a', text: 'GitHub watches for it', correct: false },
                { id: 'b', text: 'Changing content changes its hash, breaking every reference built on it', correct: true },
                { id: 'c', text: 'Commits are encrypted', correct: false },
                { id: 'd', text: 'It is not detectable', correct: false },
              ],
              explanation:
                'Hashes chain: commit → tree → blobs, and child commits embed parent hashes — one change cascades everywhere.',
            },
          ],
        },
      ],
    },
  ],
};
