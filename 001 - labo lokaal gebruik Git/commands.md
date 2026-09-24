# Git commands – labo Git basis

In presentation order.

## Help

| Command | Explanation |
|---|---|
| `git --help` | Shows an overview of the most common Git subcommands. |
| `git <SUBCOMMANDO> --help` | Opens the man page for a specific subcommand (`h` for help, `/` to search, `q` to quit). |

## Setting up a repository

| Command | Explanation |
|---|---|
| `git init` | Places the current directory under version control by creating the hidden `.git` folder. |
| `ls -la` | Lists all files including hidden ones, so the new `.git` folder becomes visible. |

## Status and staging

| Command | Explanation |
|---|---|
| `git status -u` | Shows the state of every file in the project, including each individual untracked file. |
| `git add <FILENAAM>` | Stages a change ("in pencil") so it will be included in the next commit. |
| `git stage <FILENAAM>` | Newer alias for `git add`. |

## Committing

| Command | Explanation |
|---|---|
| `git config user.name "Voornaam Familienaam"` | Sets the author name recorded in commits for this repository. |
| `git config user.email "ik@mijndomein.com"` | Sets the author email recorded in commits for this repository. |
| `git config --global user.name "..."` | Same as above, but for all repositories of this user. |
| `git commit` | Records all staged changes ("in pen") as a new commit with a unique commit hash, opening an editor for the message. |
| `git commit -m "eerste versie nieuwe file"` | Commits with the message given inline instead of in an editor. |

## History

| Command | Explanation |
|---|---|
| `git log` | Shows the commit history, most recent first. |
| `git log --oneline` | Shows each commit on a single line with its abbreviated hash. |
| `git log --graph` | Draws the commit history as a graph (useful later with branches). |
| `git log --abbrev-commit` | Shows abbreviated commit hashes instead of full ones. |
| `git log --graph --color --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit` | Compact, coloured log showing hash, tags/branches, message, relative date and author. |

## Ignoring files

| Command | Explanation |
|---|---|
| `echo "nieuwbestand.txt" >> .gitignore` | Adds a file name to `.gitignore` so `git status` no longer reports it. |
| `git add .gitignore` + `git commit -m "negeer nieuwbestand.txt"` | Commits the ignore rule so the file stays out of version control in the future. |

## Tags

| Command | Explanation |
|---|---|
| `git tag v1` | Gives the current (most recent) commit the readable name `v1`. |
| `git tag` | Lists all existing tags. |

## Undoing work (use the beginner strategy: copy the project folder first!)

| Command | Explanation |
|---|---|
| `git reset --soft HEAD~1` | Moves back to the previous commit but keeps the undone changes staged. |
| `git reset --hard HEAD~1` | Moves back to the previous commit and throws away the undone changes from the working directory. |
| `git reset --soft <COMMIT_HASH>` / `--hard <COMMIT_HASH>` | Same, but targeting a specific commit from `git log`. |

## Comparing

| Command | Explanation |
|---|---|
| `git diff` | Shows unstaged changes in the working directory (green = added, red = removed). |
| `git diff <EERSTE_COMMIT_HASH> v1` | Shows what changed between the first commit and the commit tagged `v1`. |

## Jumping through history

| Command | Explanation |
|---|---|
| `git checkout v1` | Jumps to the commit tagged `v1` ("detached HEAD") without undoing any history. |
| `git restore <FILENAAM>` | Discards uncommitted changes to a file (as suggested by `git status`). |
| `git checkout main` | Returns to the most recent commit on the main branch (`master` on older setups). |
