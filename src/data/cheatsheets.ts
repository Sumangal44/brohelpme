export interface CheatItem {
	label?: string;
	code?: string;
	explanation: string;
	lang?: string;
}

export interface CheatTable {
	headers: string[];
	rows: string[][];
}

export interface CheatCodeBlock {
	lang: string;
	code: string;
	caption?: string;
}

export interface CheatSection {
	id: string;
	title: string;
	badge?: string;
	description?: string;
	colSpan?: 1 | 2;
	items?: CheatItem[];
	table?: CheatTable;
	codeBlock?: CheatCodeBlock;
}

export interface CheatSheet {
	slug: string;
	title: string;
	shortTitle: string;
	category: 'Languages' | 'Frontend' | 'Backend' | 'DevOps & Tools' | 'Databases' | 'Config & Workflow';
	icon: string;
	accentColor: string; // Tailwind color class or hex
	badgeClass: string;
	intro: string;
	officialUrl?: string;
	tags: string[];
	sections: CheatSection[];
}

export const CATEGORIES = [
	'All',
	'Languages',
	'Frontend',
	'Backend',
	'DevOps & Tools',
	'Databases',
	'Config & Workflow'
] as const;

export const CHEATSHEETS: CheatSheet[] = [
	{
		slug: 'git',
		title: 'Git Cheatsheet',
		shortTitle: 'Git',
		category: 'DevOps & Tools',
		icon: 'git',
		accentColor: '#f05032',
		badgeClass: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
		intro: 'Quick reference guide to common Git version control commands, workflow patterns, and branching strategies.',
		officialUrl: 'https://git-scm.com/docs',
		tags: ['git', 'vcs', 'github', 'commit', 'branch', 'merge', 'rebase'],
		sections: [
			{
				id: 'setup-config',
				title: 'Setup & Configuration',
				badge: 'Config',
				items: [
					{ code: 'git config --global user.name "Your Name"', explanation: 'Set default commit author name' },
					{ code: 'git config --global user.email "you@example.com"', explanation: 'Set default commit email' },
					{ code: 'git config --global core.editor "vim"', explanation: 'Set default text editor' },
					{ code: 'git config --global init.defaultBranch main', explanation: 'Set default branch to main' },
					{ code: 'git config --list --show-origin', explanation: 'Display all configuration values and source files' }
				]
			},
			{
				id: 'basic-snapshotting',
				title: 'Basic Snapshotting',
				badge: 'Core',
				items: [
					{ code: 'git init', explanation: 'Initialize a new local repository' },
					{ code: 'git clone <url>', explanation: 'Clone remote repository from URL' },
					{ code: 'git status -s', explanation: 'Show working tree status in short format' },
					{ code: 'git add <file>', explanation: 'Stage specific file modifications' },
					{ code: 'git add .', explanation: 'Stage all modified and untracked files' },
					{ code: 'git commit -m "commit message"', explanation: 'Record staged changes with commit message' },
					{ code: 'git commit -am "quick commit"', explanation: 'Stage tracked files and commit in one step' },
					{ code: 'git commit --amend --no-edit', explanation: 'Add changes to last commit without changing message' }
				]
			},
			{
				id: 'branching-merging',
				title: 'Branching & Merging',
				badge: 'Branches',
				items: [
					{ code: 'git branch', explanation: 'List local branches (* marks active branch)' },
					{ code: 'git branch -a', explanation: 'List all local and remote tracking branches' },
					{ code: 'git switch -c <name>', explanation: 'Create and switch to new branch (modern)' },
					{ code: 'git checkout -b <name>', explanation: 'Create and switch to new branch (legacy)' },
					{ code: 'git switch <branch>', explanation: 'Switch active working branch' },
					{ code: 'git merge <branch>', explanation: 'Merge specified branch into current branch' },
					{ code: 'git branch -d <branch>', explanation: 'Delete merged branch safely' },
					{ code: 'git branch -D <branch>', explanation: 'Force delete branch regardless of merge status' }
				]
			},
			{
				id: 'remote-repos',
				title: 'Remote Repositories',
				badge: 'Remote',
				items: [
					{ code: 'git remote -v', explanation: 'List remote connections with fetch/push URLs' },
					{ code: 'git remote add origin <url>', explanation: 'Attach remote repository as origin' },
					{ code: 'git fetch origin', explanation: 'Download objects and refs from remote' },
					{ code: 'git pull origin main --rebase', explanation: 'Fetch and rebase local commits on remote main' },
					{ code: 'git push -u origin <branch>', explanation: 'Push branch and set upstream tracking' },
					{ code: 'git push origin --delete <branch>', explanation: 'Delete branch on remote repository' }
				]
			},
			{
				id: 'stashing',
				title: 'Stash & Workspace Management',
				badge: 'Stash',
				items: [
					{ code: 'git stash', explanation: 'Stash working modifications to dirty directory' },
					{ code: 'git stash push -m "WIP message"', explanation: 'Save stash with custom descriptive message' },
					{ code: 'git stash list', explanation: 'List all stashed states' },
					{ code: 'git stash pop', explanation: 'Apply top stash and drop from stash list' },
					{ code: 'git stash apply stash@{1}', explanation: 'Apply specific stash entry without dropping' },
					{ code: 'git stash drop stash@{0}', explanation: 'Discard specific stash entry' },
					{ code: 'git stash clear', explanation: 'Remove all stashed states' }
				]
			},
			{
				id: 'undoing-history',
				title: 'Undoing Changes & Reset',
				badge: 'Recovery',
				items: [
					{ code: 'git restore <file>', explanation: 'Discard unstaged changes in working tree' },
					{ code: 'git restore --staged <file>', explanation: 'Unstage file while preserving local changes' },
					{ code: 'git reset --soft HEAD~1', explanation: 'Undo last commit, keeping changes staged' },
					{ code: 'git reset --mixed HEAD~1', explanation: 'Undo last commit, keeping changes in working dir' },
					{ code: 'git reset --hard HEAD~1', explanation: 'Discard last commit and all working tree changes' },
					{ code: 'git revert <commit-hash>', explanation: 'Create new commit that reverts changes of target commit' },
					{ code: 'git clean -fd', explanation: 'Remove untracked files and directories' }
				]
			},
			{
				id: 'inspection-diff',
				title: 'Inspect, Log & History',
				badge: 'Inspect',
				colSpan: 2,
				table: {
					headers: ['Command', 'Description'],
					rows: [
						['git log --oneline --graph --decorate -15', 'Compact visualization of recent commit graph'],
						['git log -p -2 <file>', 'View patch diff of last 2 commits for specific file'],
						['git diff', 'Show unstaged changes between working dir and index'],
						['git diff --staged', 'Show changes staged for next commit vs HEAD'],
						['git diff branchA..branchB', 'View changes between tips of two branches'],
						['git blame -L 10,25 <file>', 'Annotate file lines 10-25 with commit author & hash'],
						['git reflog', 'Log of all HEAD references (vital for recovering lost commits)']
					]
				}
			}
		]
	},
	{
		slug: 'python',
		title: 'Python Cheatsheet',
		shortTitle: 'Python',
		category: 'Languages',
		icon: 'python',
		accentColor: '#3776ab',
		badgeClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
		intro: 'Comprehensive syntax reference for modern Python 3.x covering types, control flow, functions, OOP, and standard libraries.',
		officialUrl: 'https://docs.python.org/3/',
		tags: ['python', 'scripting', 'backend', 'data-science', 'oop'],
		sections: [
			{
				id: 'py-types',
				title: 'Primitive & Collection Types',
				badge: 'Types',
				items: [
					{ code: 'int(42), float(3.14), str("text"), bool(True)', explanation: 'Basic primitive scalar constructors' },
					{ code: 'items = [1, 2, "three", 4.0]', explanation: 'Mutable ordered sequence (List)' },
					{ code: 'coords = (10, 20)', explanation: 'Immutable ordered sequence (Tuple)' },
					{ code: 'user = {"id": 1, "role": "admin"}', explanation: 'Key-value mapping (Dictionary)' },
					{ code: 'unique = {1, 2, 3, 3}  # {1, 2, 3}', explanation: 'Unordered set of distinct hashable elements' },
					{ code: 'frozen = frozenset([1, 2, 3])', explanation: 'Immutable hashable set' }
				]
			},
			{
				id: 'py-comprehensions',
				title: 'Comprehensions',
				badge: 'Idioms',
				items: [
					{ code: '[x**2 for x in range(10) if x % 2 == 0]', explanation: 'List comprehension with filter predicate' },
					{ code: '{k: v for k, v in [("a", 1), ("b", 2)]}', explanation: 'Dictionary comprehension from pairs' },
					{ code: '{ch.lower() for ch in "Hello World"}', explanation: 'Set comprehension with deduplication' },
					{ code: '(x*2 for x in range(1000))', explanation: 'Generator expression (lazy memory efficient)' }
				]
			},
			{
				id: 'py-functions',
				title: 'Functions & Lambdas',
				badge: 'Functions',
				items: [
					{ code: 'def add(a: int, b: int = 0) -> int:\n    return a + b', explanation: 'Typed function with default parameter' },
					{ code: 'def varargs(*args, **kwargs):\n    pass', explanation: 'Accept variable positional and keyword arguments' },
					{ code: 'square = lambda x: x * x', explanation: 'Anonymous lambda expression' },
					{ code: 'res = sorted(items, key=lambda x: x["age"])', explanation: 'Sorting by key with lambda extractor' }
				]
			},
			{
				id: 'py-control-flow',
				title: 'Pattern Matching & Control Flow',
				badge: 'Control',
				items: [
					{ code: 'match status:\n    case 200: handle_ok()\n    case 404: handle_missing()\n    case _: handle_error()', explanation: 'Structural pattern matching (Python 3.10+)' },
					{ code: 'val = "yes" if active else "no"', explanation: 'Ternary conditional expression' },
					{ code: 'for idx, item in enumerate(items, start=1):', explanation: 'Iterate over index and value simultaneously' },
					{ code: 'for a, b in zip(list_a, list_b):', explanation: 'Pair elements from multiple iterables' }
				]
			},
			{
				id: 'py-classes',
				title: 'Dataclasses & OOP',
				badge: 'OOP',
				colSpan: 2,
				codeBlock: {
					lang: 'python',
					caption: 'Modern Python Dataclass & Context Manager',
					code: `from dataclasses import dataclass
from contextlib import contextmanager

@dataclass
class User:
    id: int
    name: str
    email: str
    is_active: bool = True

    def greet(self) -> str:
        return f"Hello, {self.name}!"

@contextmanager
def open_managed_resource(filename: str):
    f = open(filename, "w")
    try:
        yield f
    finally:
        f.close()`
				}
			},
			{
				id: 'py-file-io',
				title: 'File I/O & JSON',
				badge: 'Files',
				items: [
					{ code: 'with open("file.txt", "r", encoding="utf-8") as f:\n    content = f.read()', explanation: 'Safe resource management file reader' },
					{ code: 'import json\ndata = json.loads(\'{"a": 1}\')\ntext = json.dumps(data, indent=2)', explanation: 'Parse and serialize JSON strings' },
					{ code: 'from pathlib import Path\npath = Path.cwd() / "data" / "file.csv"\npath.write_text("a,b,c")', explanation: 'Modern object-oriented filesystem operations' }
				]
			}
		]
	},
	{
		slug: 'docker',
		title: 'Docker Cheatsheet',
		shortTitle: 'Docker',
		category: 'DevOps & Tools',
		icon: 'docker',
		accentColor: '#2496ed',
		badgeClass: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
		intro: 'Complete commands and Dockerfile instructions for building, running, debugging, and managing containerized apps.',
		officialUrl: 'https://docs.docker.com/engine/reference/commandline/cli/',
		tags: ['docker', 'containers', 'devops', 'microservices', 'compose'],
		sections: [
			{
				id: 'docker-containers',
				title: 'Container Lifecycle',
				badge: 'Containers',
				items: [
					{ code: 'docker run -d --name web -p 8080:80 nginx:alpine', explanation: 'Run detached container mapping host 8080 to container 80' },
					{ code: 'docker run -it --rm ubuntu:latest bash', explanation: 'Interactive container that removes itself on exit' },
					{ code: 'docker ps', explanation: 'List currently running containers' },
					{ code: 'docker ps -a', explanation: 'List all containers including stopped ones' },
					{ code: 'docker stop <container>', explanation: 'Gracefully stop running container (SIGTERM)' },
					{ code: 'docker kill <container>', explanation: 'Force kill running container immediately (SIGKILL)' },
					{ code: 'docker restart <container>', explanation: 'Restart container' },
					{ code: 'docker rm -f <container>', explanation: 'Force remove container' }
				]
			},
			{
				id: 'docker-images',
				title: 'Images & Registry',
				badge: 'Images',
				items: [
					{ code: 'docker build -t myapp:1.0 .', explanation: 'Build image from Dockerfile in current directory' },
					{ code: 'docker build --no-cache -t myapp:latest .', explanation: 'Build image without utilizing layer cache' },
					{ code: 'docker images', explanation: 'List local stored images' },
					{ code: 'docker rmi <image_id>', explanation: 'Remove local image' },
					{ code: 'docker pull <image>:<tag>', explanation: 'Fetch image from Docker Hub / registry' },
					{ code: 'docker push <username>/<image>:<tag>', explanation: 'Upload image to remote registry' },
					{ code: 'docker tag <source> <target>', explanation: 'Create tag that refers to source image' }
				]
			},
			{
				id: 'docker-exec-debug',
				title: 'Inspection & Debugging',
				badge: 'Debug',
				items: [
					{ code: 'docker logs -f --tail 100 <container>', explanation: 'Stream last 100 lines of live container logs' },
					{ code: 'docker exec -it <container> sh', explanation: 'Open interactive shell inside running container' },
					{ code: 'docker inspect <container_or_image>', explanation: 'Output low-level JSON configuration details' },
					{ code: 'docker stats', explanation: 'Display live stream of container CPU, RAM, I/O usage' },
					{ code: 'docker top <container>', explanation: 'Display running processes inside container' }
				]
			},
			{
				id: 'docker-cleanup',
				title: 'Prune & Cleanup',
				badge: 'Maintenance',
				items: [
					{ code: 'docker container prune -f', explanation: 'Remove all stopped containers' },
					{ code: 'docker image prune -a', explanation: 'Remove all unused images without containers' },
					{ code: 'docker volume prune -f', explanation: 'Remove all unused anonymous and named volumes' },
					{ code: 'docker system prune -a --volumes', explanation: 'Nuclear cleanup: wipe all unused containers, networks, images & volumes' },
					{ code: 'docker system df', explanation: 'Show disk space used by Docker daemon' }
				]
			},
			{
				id: 'docker-compose',
				title: 'Docker Compose Commands',
				badge: 'Compose',
				colSpan: 2,
				table: {
					headers: ['Command', 'Description'],
					rows: [
						['docker compose up -d', 'Build, (re)create, and start containers in detached mode'],
						['docker compose down --volumes', 'Stop and remove containers, networks, and persistent volumes'],
						['docker compose ps', 'List containers running for current compose stack'],
						['docker compose logs -f <service>', 'Follow output logs for a specific service'],
						['docker compose exec <service> sh', 'Execute interactive shell inside service container'],
						['docker compose restart <service>', 'Restart specific running service without full teardown'],
						['docker compose build --pull', 'Rebuild services pulling updated base image layers']
					]
				}
			}
		]
	},
	{
		slug: 'bash',
		title: 'Bash & Shell Scripting',
		shortTitle: 'Bash',
		category: 'DevOps & Tools',
		icon: 'terminal',
		accentColor: '#4eaa25',
		badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
		intro: 'Essential Bash commands, syntax patterns, parameter expansions, flow controls, and shell script templates.',
		officialUrl: 'https://www.gnu.org/software/bash/manual/',
		tags: ['bash', 'shell', 'linux', 'scripting', 'cli', 'posix'],
		sections: [
			{
				id: 'bash-variables',
				title: 'Variables & Special Parameters',
				badge: 'Variables',
				items: [
					{ code: 'VAR="value"  # No spaces around =', explanation: 'Assign string to variable' },
					{ code: 'echo "$VAR" or "${VAR}"', explanation: 'Dereference variable safely with double quotes' },
					{ code: '$0', explanation: 'Name of the current script' },
					{ code: '$1, $2, ... $9', explanation: 'Positional arguments passed to script' },
					{ code: '$#', explanation: 'Total count of arguments supplied' },
					{ code: '$@', explanation: 'All arguments as separate quoted words ("$@")' },
					{ code: '$?', explanation: 'Exit status of the most recently executed command' },
					{ code: '$$', explanation: 'Process ID (PID) of current running shell' }
				]
			},
			{
				id: 'bash-expansions',
				title: 'Parameter Expansion Tricks',
				badge: 'Expansions',
				items: [
					{ code: '${VAR:-"default"}', explanation: 'If VAR unset/null, use "default" without assigning' },
					{ code: '${VAR:="default"}', explanation: 'If VAR unset/null, assign "default" to VAR' },
					{ code: '${VAR:?"error message"}', explanation: 'Exit script with message if VAR is unset' },
					{ code: '${#VAR}', explanation: 'Length of string stored in VAR' },
					{ code: '${VAR%pattern}', explanation: 'Remove shortest trailing match of pattern' },
					{ code: '${VAR#pattern}', explanation: 'Remove shortest leading match of pattern' },
					{ code: '${VAR//search/replace}', explanation: 'Replace all occurrences of search pattern' }
				]
			},
			{
				id: 'bash-loops',
				title: 'Conditionals & Loops',
				badge: 'Control Flow',
				items: [
					{ code: 'if [[ -f "$FILE" ]]; then\n  echo "exists"\nfi', explanation: 'Test if file exists and is regular file' },
					{ code: 'if [[ -z "$VAR" ]]; then echo "empty"; fi', explanation: 'Test if string length is zero' },
					{ code: 'for item in a b c; do echo "$item"; done', explanation: 'Iterate over explicit list items' },
					{ code: 'for file in *.log; do echo "$file"; done', explanation: 'Glob pattern matching over files' },
					{ code: 'while IFS= read -r line; do ...; done < file.txt', explanation: 'Read file line-by-line safely' }
				]
			},
			{
				id: 'bash-pipes',
				title: 'Pipes, Redirection & I/O',
				badge: 'I/O',
				items: [
					{ code: 'cmd > file.txt', explanation: 'Redirect stdout to file (overwrite)' },
					{ code: 'cmd >> file.txt', explanation: 'Append stdout to end of file' },
					{ code: 'cmd 2> error.log', explanation: 'Redirect stderr to file' },
					{ code: 'cmd &> all_output.log', explanation: 'Redirect both stdout and stderr to file' },
					{ code: 'cmd1 | cmd2', explanation: 'Pipe stdout of cmd1 into stdin of cmd2' },
					{ code: 'cmd > /dev/null 2>&1', explanation: 'Silence all stdout and stderr completely' }
				]
			},
			{
				id: 'bash-script-skeleton',
				title: 'Production Bash Script Skeleton',
				badge: 'Best Practice',
				colSpan: 2,
				codeBlock: {
					lang: 'bash',
					caption: 'Strict mode bash script header',
					code: `#!/usr/bin/env bash
set -Eeuo pipefail
trap 'echo "Error on line $LINENO" >&2' ERR

readonly SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
readonly APP_ENV="\${APP_ENV:-development}"

main() {
    echo "Running in \$APP_ENV mode from \$SCRIPT_DIR"
}

main "$@"`
				}
			}
		]
	},
	{
		slug: 'javascript',
		title: 'JavaScript (ES6+) Cheatsheet',
		shortTitle: 'JavaScript',
		category: 'Frontend',
		icon: 'javascript',
		accentColor: '#f7df1e',
		badgeClass: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
		intro: 'Modern JavaScript features: array methods, destructuring, promises, async/await, modules, and DOM APIs.',
		officialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
		tags: ['javascript', 'es6', 'frontend', 'node', 'web'],
		sections: [
			{
				id: 'js-arrays',
				title: 'Array Transformations',
				badge: 'Arrays',
				items: [
					{ code: 'arr.map(x => x * 2)', explanation: 'Transform each element into new array' },
					{ code: 'arr.filter(x => x > 10)', explanation: 'Select elements that satisfy boolean test' },
					{ code: 'arr.reduce((acc, curr) => acc + curr, 0)', explanation: 'Accumulate values into a single result' },
					{ code: 'arr.find(x => x.id === targetId)', explanation: 'Return first matching element or undefined' },
					{ code: 'arr.some(x => x < 0), arr.every(x => x > 0)', explanation: 'Test if at least one or all elements pass condition' },
					{ code: 'arr.flatMap(x => [x, x * 2])', explanation: 'Map and flatten result by 1 level' }
				]
			},
			{
				id: 'js-destructuring',
				title: 'Destructuring & Spread',
				badge: 'Syntax',
				items: [
					{ code: 'const { name, age, role = "guest" } = user;', explanation: 'Object property destructuring with fallback' },
					{ code: 'const [first, second, ...rest] = items;', explanation: 'Array position destructuring with rest operator' },
					{ code: 'const merged = { ...objA, ...objB, updated: true };', explanation: 'Shallow clone and merge objects' },
					{ code: 'const clonedArr = [...arr, newItem];', explanation: 'Non-mutating array element addition' },
					{ code: 'const copy = structuredClone(complexObject);', explanation: 'Native deep copy of nested objects/arrays' }
				]
			},
			{
				id: 'js-async',
				title: 'Promises & Async/Await',
				badge: 'Async',
				items: [
					{ code: 'async function fetchUser(id) {\n  const res = await fetch(`/api/users/${id}`);\n  if (!res.ok) throw new Error(res.statusText);\n  return res.json();\n}', explanation: 'Standard modern async/await HTTP fetching pattern' },
					{ code: 'const results = await Promise.all([p1, p2, p3]);', explanation: 'Await all promises concurrently (rejects on first error)' },
					{ code: 'const settled = await Promise.allSettled([p1, p2]);', explanation: 'Wait for all promises to resolve or reject without throwing' }
				]
			},
			{
				id: 'js-modern-operators',
				title: 'Optional Chaining & Nullish Coalescing',
				badge: 'Operators',
				items: [
					{ code: 'const street = user?.address?.street;', explanation: 'Optional chaining prevents TypeError on null/undefined' },
					{ code: 'const method = obj?.onComplete?.();', explanation: 'Safely invoke optional function only if defined' },
					{ code: 'const port = process.env.PORT ?? 3000;', explanation: 'Nullish coalescing (checks strictly null or undefined)' },
					{ code: 'user.score ??= 100;', explanation: 'Logical nullish assignment' }
				]
			}
		]
	},
	{
		slug: 'typescript',
		title: 'TypeScript Cheatsheet',
		shortTitle: 'TypeScript',
		category: 'Languages',
		icon: 'typescript',
		accentColor: '#3178c6',
		badgeClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
		intro: 'TypeScript syntax guide: interfaces, types, generics, utility types, narrowing, and configuration options.',
		officialUrl: 'https://www.typescriptlang.org/docs/',
		tags: ['typescript', 'types', 'javascript', 'frontend', 'backend'],
		sections: [
			{
				id: 'ts-primitives',
				title: 'Core Types & Annotations',
				badge: 'Basics',
				items: [
					{ code: 'let id: string | number = "abc";', explanation: 'Union type allowing string or number' },
					{ code: 'let state: "idle" | "loading" | "success" = "idle";', explanation: 'Literal string union type' },
					{ code: 'let point: [number, number] = [10, 20];', explanation: 'Fixed-length tuple type' },
					{ code: 'let data: unknown = JSON.parse(str);', explanation: 'Safe any: requires type narrowing before use' },
					{ code: 'let fn: (a: number) => boolean = (n) => n > 0;', explanation: 'Function signature type' }
				]
			},
			{
				id: 'ts-interfaces-types',
				title: 'Interface vs Type Alias',
				badge: 'Contracts',
				items: [
					{ code: 'interface User {\n  readonly id: string;\n  name: string;\n  age?: number;\n}', explanation: 'Interface declaration (extensible and open to merging)' },
					{ code: 'interface Admin extends User {\n  permissions: string[];\n}', explanation: 'Interface inheritance via extends' },
					{ code: 'type Coordinate = { x: number; y: number };', explanation: 'Type alias declaration for primitives, unions, tuples' },
					{ code: 'type Result<T> = { ok: true; data: T } | { ok: false; err: Error };', explanation: 'Discriminated union type' }
				]
			},
			{
				id: 'ts-generics',
				title: 'Generics',
				badge: 'Generics',
				items: [
					{ code: 'function identity<T>(arg: T): T { return arg; }', explanation: 'Generic function capturing argument type' },
					{ code: 'interface ApiResponse<TData> {\n  status: number;\n  data: TData;\n}', explanation: 'Generic interface structure' },
					{ code: 'function getLength<T extends { length: number }>(val: T): number', explanation: 'Generic constraint ensuring property exists' }
				]
			},
			{
				id: 'ts-utilities',
				title: 'Built-in Utility Types',
				badge: 'Utilities',
				colSpan: 2,
				table: {
					headers: ['Utility', 'Meaning', 'Example'],
					rows: [
						['Partial<T>', 'Makes all properties optional', 'type PartialUser = Partial<User>'],
						['Required<T>', 'Makes all properties required', 'type StrictUser = Required<User>'],
						['Readonly<T>', 'Makes all properties immutable', 'type FrozenUser = Readonly<User>'],
						['Pick<T, K>', 'Constructs type picking subset of keys', 'type UserSummary = Pick<User, "id" | "name">'],
						['Omit<T, K>', 'Constructs type dropping keys', 'type PublicUser = Omit<User, "passwordHash">'],
						['Record<K, T>', 'Constructs object with keys K and value T', 'type PageCache = Record<string, string>'],
						['Awaited<T>', 'Unwraps Promise resolved value', 'type Resolved = Awaited<Promise<string>>']
					]
				}
			}
		]
	},
	{
		slug: 'linux',
		title: 'Linux Commands Cheatsheet',
		shortTitle: 'Linux',
		category: 'DevOps & Tools',
		icon: 'linux',
		accentColor: '#fcc624',
		badgeClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
		intro: 'Essential Linux CLI commands for system administration, file manipulation, networking, permissions, and process management.',
		officialUrl: 'https://www.kernel.org/',
		tags: ['linux', 'sysadmin', 'bash', 'terminal', 'server'],
		sections: [
			{
				id: 'linux-files',
				title: 'File & Directory Navigation',
				badge: 'Files',
				items: [
					{ code: 'ls -la --sort=time', explanation: 'List all files with permissions, sizes, sorted by mod time' },
					{ code: 'mkdir -p /path/to/nested/dir', explanation: 'Create nested directories without failing if they exist' },
					{ code: 'cp -rv source/ dest/', explanation: 'Recursively copy directory with verbose output' },
					{ code: 'rm -rf /path/to/target', explanation: 'Recursively force remove files and directories' },
					{ code: 'find . -name "*.log" -mtime +7 -delete', explanation: 'Find and delete log files older than 7 days' },
					{ code: 'tar -czvf archive.tar.gz /folder', explanation: 'Compress directory into tar.gz gzip archive' },
					{ code: 'tar -xzvf archive.tar.gz -C /target', explanation: 'Extract tar.gz into specific destination folder' }
				]
			},
			{
				id: 'linux-permissions',
				title: 'Permissions & Ownership',
				badge: 'Security',
				items: [
					{ code: 'chmod 755 script.sh', explanation: 'rwxr-xr-x (Owner: read/write/exec, Others: read/exec)' },
					{ code: 'chmod 600 id_rsa', explanation: 'rw------- (Strict private key permissions)' },
					{ code: 'chmod +x script.sh', explanation: 'Add execute permission for everyone' },
					{ code: 'chown -R www-data:www-data /var/www', explanation: 'Recursively change user and group ownership' },
					{ code: 'umask 022', explanation: 'Set default file creation mask' }
				]
			},
			{
				id: 'linux-sysinfo',
				title: 'System, Memory & Hardware',
				badge: 'System',
				items: [
					{ code: 'df -h', explanation: 'Display human-readable disk space usage by filesystem' },
					{ code: 'du -sh /var/log/*', explanation: 'Show total disk space consumed by each item in directory' },
					{ code: 'free -h', explanation: 'Display total, used, and free RAM and swap memory' },
					{ code: 'uname -a', explanation: 'Print kernel name, version, host architecture' },
					{ code: 'uptime', explanation: 'Show how long system has been running & load averages' },
					{ code: 'journalctl -u nginx.service -f', explanation: 'Follow systemd logs for specific service in real time' }
				]
			},
			{
				id: 'linux-processes',
				title: 'Process Management',
				badge: 'Processes',
				items: [
					{ code: 'ps aux | grep node', explanation: 'List all active processes filtered by pattern' },
					{ code: 'top or htop', explanation: 'Interactive real-time process viewer and monitor' },
					{ code: 'kill -9 <pid>', explanation: 'Force kill process by Process ID immediately' },
					{ code: 'killall -9 nginx', explanation: 'Kill all processes matching name' },
					{ code: 'lsof -i :3000', explanation: 'Find process listening or bound to TCP port 3000' },
					{ code: 'systemctl restart <service>', explanation: 'Restart systemd daemon service' }
				]
			}
		]
	},
	{
		slug: 'sql',
		title: 'SQL & Database Queries',
		shortTitle: 'SQL',
		category: 'Databases',
		icon: 'database',
		accentColor: '#336791',
		badgeClass: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
		intro: 'ANSI SQL syntax reference covering SELECT queries, aggregations, JOIN variants, constraints, and transactions.',
		officialUrl: 'https://en.wikipedia.org/wiki/SQL',
		tags: ['sql', 'database', 'postgres', 'mysql', 'queries', 'rdbms'],
		sections: [
			{
				id: 'sql-select',
				title: 'Querying Data (SELECT)',
				badge: 'Queries',
				items: [
					{ code: 'SELECT DISTINCT column1, column2 FROM users;', explanation: 'Retrieve unique rows without duplicates' },
					{ code: 'SELECT * FROM products WHERE price >= 50 AND stock > 0;', explanation: 'Filter rows using multiple conditions' },
					{ code: 'SELECT * FROM users WHERE email LIKE \'%@gmail.com\';', explanation: 'Pattern match string (% matches any chars, _ single)' },
					{ code: 'SELECT * FROM orders ORDER BY created_at DESC LIMIT 20 OFFSET 40;', explanation: 'Sort descending with pagination window' }
				]
			},
			{
				id: 'sql-joins',
				title: 'JOINs Cheat Sheet',
				badge: 'JOINs',
				items: [
					{ code: 'SELECT u.name, o.id\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id;', explanation: 'Only records that have matching keys in both tables' },
					{ code: 'SELECT u.name, o.id\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id;', explanation: 'All records from left table and matched from right table' },
					{ code: 'SELECT * FROM table_a FULL OUTER JOIN table_b ON a.id = b.id;', explanation: 'All records when there is a match in left OR right table' }
				]
			},
			{
				id: 'sql-aggregates',
				title: 'Aggregation & GROUP BY',
				badge: 'Aggregates',
				items: [
					{ code: 'SELECT department, COUNT(*), AVG(salary)\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 5;', explanation: 'Group rows and filter aggregated groups with HAVING' },
					{ code: 'SELECT COALESCE(phone, \'N/A\') FROM users;', explanation: 'Return first non-null argument' },
					{ code: 'SELECT id, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) FROM items;', explanation: 'Window ranking function per category' }
				]
			},
			{
				id: 'sql-crud',
				title: 'Data Modification (DML)',
				badge: 'DML',
				items: [
					{ code: 'INSERT INTO users (name, email) VALUES (\'Alice\', \'alice@example.com\');', explanation: 'Insert single record' },
					{ code: 'UPDATE users SET status = \'active\', updated_at = NOW() WHERE id = 42;', explanation: 'Update existing row matching condition' },
					{ code: 'DELETE FROM sessions WHERE expires_at < NOW();', explanation: 'Delete rows matching condition' }
				]
			}
		]
	},
	{
		slug: 'react',
		title: 'React & Hooks Cheatsheet',
		shortTitle: 'React',
		category: 'Frontend',
		icon: 'react',
		accentColor: '#61dafb',
		badgeClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
		intro: 'Quick reference for React 18+ hooks, components, props, contexts, rendering optimizations, and modern patterns.',
		officialUrl: 'https://react.dev/',
		tags: ['react', 'hooks', 'frontend', 'ui', 'jsx'],
		sections: [
			{
				id: 'react-state-hooks',
				title: 'State & Effect Hooks',
				badge: 'Core Hooks',
				items: [
					{ code: 'const [count, setCount] = useState<number>(0);', explanation: 'Declare state variable with setter' },
					{ code: 'setCount(prev => prev + 1);', explanation: 'Updater function for state depending on previous value' },
					{ code: 'useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id); // Cleanup\n}, []);', explanation: 'Run side effect on mount and run cleanup on unmount' },
					{ code: 'const inputRef = useRef<HTMLInputElement>(null);\n// inputRef.current.focus();', explanation: 'Hold mutable DOM reference or value that does not trigger re-render' }
				]
			},
			{
				id: 'react-perf-hooks',
				title: 'Performance & Memoization',
				badge: 'Performance',
				items: [
					{ code: 'const memoizedValue = useMemo(() => computeHeavy(data), [data]);', explanation: 'Cache computationally expensive calculation' },
					{ code: 'const handleClick = useCallback(() => {\n  doAction(id);\n}, [id]);', explanation: 'Memoize callback function definition between renders' },
					{ code: 'const MemoComponent = React.memo(MyComponent);', explanation: 'Skip component re-rendering if props are unchanged' }
				]
			},
			{
				id: 'react-context',
				title: 'Context & Reducer',
				badge: 'Context',
				items: [
					{ code: 'const ThemeContext = createContext<Theme>("dark");', explanation: 'Create new context with default value' },
					{ code: 'const theme = useContext(ThemeContext);', explanation: 'Consume closest matching context provider' },
					{ code: 'const [state, dispatch] = useReducer(reducer, initialState);', explanation: 'Complex state machine management with actions' }
				]
			}
		]
	},
	{
		slug: 'markdown',
		title: 'Markdown Syntax Reference',
		shortTitle: 'Markdown',
		category: 'Config & Workflow',
		icon: 'markdown',
		accentColor: '#ffffff',
		badgeClass: 'text-zinc-300 bg-zinc-500/10 border-zinc-500/20',
		intro: 'GitHub Flavored Markdown (GFM) syntax reference for formatting documentation, tables, task lists, and code blocks.',
		officialUrl: 'https://www.markdownguide.org/cheat-sheet/',
		tags: ['markdown', 'docs', 'writing', 'gfm', 'readme'],
		sections: [
			{
				id: 'md-typography',
				title: 'Headings & Emphasis',
				badge: 'Text',
				items: [
					{ code: '# H1 Heading\n## H2 Heading\n### H3 Heading', explanation: 'Hierarchical section headings' },
					{ code: '**Bold Text** or __Bold Text__', explanation: 'Strong emphasis' },
					{ code: '*Italic Text* or _Italic Text_', explanation: 'Emphasis / italics' },
					{ code: '~~Strikethrough text~~', explanation: 'Strikethrough formatting' },
					{ code: '`inline code snippet`', explanation: 'Inline monospaced code span' }
				]
			},
			{
				id: 'md-links-images',
				title: 'Links, Images & Lists',
				badge: 'Elements',
				items: [
					{ code: '[Display Text](https://example.com)', explanation: 'Hyperlink to external URL' },
					{ code: '![Alt Text](https://path.to/image.png)', explanation: 'Inline image embedding' },
					{ code: '- [x] Completed task\n- [ ] Pending task', explanation: 'Interactive GitHub checklist items' },
					{ code: '> Quoted blockquote citation text', explanation: 'Blockquote callout block' }
				]
			},
			{
				id: 'md-tables',
				title: 'Tables & Code Fences',
				badge: 'Tables',
				colSpan: 2,
				codeBlock: {
					lang: 'markdown',
					caption: 'GFM Table and Syntax Highlighted Code',
					code: `| Feature | Supported | Description |
| :--- | :---: | ---: |
| Tables | Yes | Clean column alignments |
| Code | Yes | Syntax highlighted blocks |

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\``
				}
			}
		]
	},
	{
		slug: 'css',
		title: 'CSS Flexbox & Grid Cheatsheet',
		shortTitle: 'CSS Layout',
		category: 'Frontend',
		icon: 'css',
		accentColor: '#264de4',
		badgeClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
		intro: 'Quick lookup for CSS Flexbox, Grid properties, box-sizing, positioning, and responsive centering patterns.',
		officialUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
		tags: ['css', 'flexbox', 'grid', 'styling', 'frontend'],
		sections: [
			{
				id: 'css-flexbox',
				title: 'Flexbox Properties',
				badge: 'Flexbox',
				items: [
					{ code: 'display: flex;\nflex-direction: row | column | row-reverse;', explanation: 'Define flex container and main axis direction' },
					{ code: 'justify-content: flex-start | center | space-between | space-around | space-evenly;', explanation: 'Align items along main axis' },
					{ code: 'align-items: stretch | center | flex-start | flex-end | baseline;', explanation: 'Align items along cross axis' },
					{ code: 'gap: 16px 24px;  /* row-gap column-gap */', explanation: 'Space between flex children without margin hacks' },
					{ code: 'flex: 1 1 auto;  /* grow shrink basis */', explanation: 'Shorthand for flex item sizing' }
				]
			},
			{
				id: 'css-grid',
				title: 'CSS Grid Layout',
				badge: 'Grid',
				items: [
					{ code: 'display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(280px, 1fr));', explanation: 'Responsive auto-wrapping grid columns' },
					{ code: 'grid-template-rows: auto 1fr auto;', explanation: 'Set header, body (fill space), and footer rows' },
					{ code: 'grid-column: span 2 / -1;', explanation: 'Make item span across 2 columns or until last line' },
					{ code: 'place-items: center;', explanation: 'Shorthand to center grid items vertically & horizontally' }
				]
			},
			{
				id: 'css-centering',
				title: 'Perfect Centering in CSS',
				badge: 'Snippets',
				items: [
					{ code: '.center-flex {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}', explanation: 'Flexbox absolute center' },
					{ code: '.center-grid {\n  display: grid;\n  place-content: center;\n}', explanation: 'Grid one-line center' }
				]
			}
		]
	},
	{
		slug: 'vim',
		title: 'Vim & Neovim Cheatsheet',
		shortTitle: 'Vim',
		category: 'Config & Workflow',
		icon: 'vim',
		accentColor: '#019733',
		badgeClass: 'text-green-400 bg-green-500/10 border-green-500/20',
		intro: 'Modal text editor commands: normal, insert, visual, navigation movements, yank, put, search and replace.',
		officialUrl: 'https://www.vim.org/',
		tags: ['vim', 'neovim', 'editor', 'shortcuts', 'modal'],
		sections: [
			{
				id: 'vim-modes',
				title: 'Modes & Switching',
				badge: 'Modes',
				items: [
					{ code: '<Esc>', explanation: 'Return to Normal mode' },
					{ code: 'i', explanation: 'Enter Insert mode before cursor' },
					{ code: 'a', explanation: 'Enter Insert mode after cursor' },
					{ code: 'o', explanation: 'Open new line below and enter Insert mode' },
					{ code: 'v', explanation: 'Enter Visual character mode' },
					{ code: 'V', explanation: 'Enter Visual line selection mode' },
					{ code: 'Ctrl + v', explanation: 'Enter Visual block mode' }
				]
			},
			{
				id: 'vim-movement',
				title: 'Navigation & Cursor Movement',
				badge: 'Movement',
				items: [
					{ code: 'h, j, k, l', explanation: 'Move cursor left, down, up, right' },
					{ code: 'w / b', explanation: 'Jump forward / backward to start of next word' },
					{ code: '0 / $', explanation: 'Jump to beginning / end of current line' },
					{ code: 'gg / G', explanation: 'Jump to first line / last line of file' },
					{ code: ':42<CR>', explanation: 'Jump directly to line number 42' },
					{ code: 'Ctrl + d / Ctrl + u', explanation: 'Scroll half-screen down / half-screen up' }
				]
			},
			{
				id: 'vim-editing',
				title: 'Editing, Yank & Paste',
				badge: 'Editing',
				items: [
					{ code: 'dd', explanation: 'Delete (cut) entire line' },
					{ code: 'dw', explanation: 'Delete word from cursor to next space' },
					{ code: 'yy', explanation: 'Yank (copy) current line' },
					{ code: 'p / P', explanation: 'Put (paste) clipboard after / before cursor' },
					{ code: 'u / Ctrl + r', explanation: 'Undo last change / Redo change' },
					{ code: 'ci"', explanation: 'Change inside quotes ("hello" -> "")' }
				]
			},
			{
				id: 'vim-save-quit',
				title: 'Saving & Exiting',
				badge: 'Command',
				items: [
					{ code: ':w', explanation: 'Write (save) buffer changes to disk' },
					{ code: ':wq or ZZ', explanation: 'Write changes and exit Vim' },
					{ code: ':q!', explanation: 'Quit immediately discarding all unsaved edits' },
					{ code: ':%s/foo/bar/g', explanation: 'Find and replace all "foo" with "bar" globally' }
				]
			}
		]
	},
	{
		slug: 'regex',
		title: 'Regex (Regular Expressions)',
		shortTitle: 'Regex',
		category: 'Config & Workflow',
		icon: 'code',
		accentColor: '#ec4899',
		badgeClass: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
		intro: 'Quick lookup for regular expression syntax: character classes, anchors, quantifiers, lookarounds, and flags.',
		officialUrl: 'https://regex101.com/',
		tags: ['regex', 'strings', 'pattern', 'parsing'],
		sections: [
			{
				id: 'regex-classes',
				title: 'Character Classes',
				badge: 'Classes',
				items: [
					{ code: '.', explanation: 'Matches any single character except newline' },
					{ code: '\\d / \\D', explanation: 'Matches any digit [0-9] / non-digit' },
					{ code: '\\w / \\W', explanation: 'Matches word character [a-zA-Z0-9_] / non-word' },
					{ code: '\\s / \\S', explanation: 'Matches whitespace character (space, tab, newline) / non-space' },
					{ code: '[a-z0-9]', explanation: 'Character set matching any lowercase letter or digit' },
					{ code: '[^abc]', explanation: 'Negated set matching any character EXCEPT a, b, or c' }
				]
			},
			{
				id: 'regex-quantifiers',
				title: 'Quantifiers & Anchors',
				badge: 'Quantifiers',
				items: [
					{ code: '^ / $', explanation: 'Matches start of string / end of string' },
					{ code: '\\b', explanation: 'Word boundary anchor' },
					{ code: '*', explanation: '0 or more occurrences (greedy)' },
					{ code: '+', explanation: '1 or more occurrences (greedy)' },
					{ code: '?', explanation: '0 or 1 occurrence, or lazy modifier when after quantifier (*?, +?)' },
					{ code: '{min,max}', explanation: 'Between min and max repetitions' }
				]
			},
			{
				id: 'regex-groups',
				title: 'Groups & Lookaround',
				badge: 'Advanced',
				items: [
					{ code: '(abc)', explanation: 'Capturing group' },
					{ code: '(?:abc)', explanation: 'Non-capturing group (does not store capture)' },
					{ code: '(?<id>\\d+)', explanation: 'Named capturing group accessible as groups.id' },
					{ code: '(?=abc)', explanation: 'Positive lookahead (asserts what follows)' },
					{ code: '(?!abc)', explanation: 'Negative lookahead (asserts what does not follow)' }
				]
			}
		]
	},
	{
		slug: 'kubernetes',
		title: 'Kubernetes (kubectl) Cheatsheet',
		shortTitle: 'Kubernetes',
		category: 'DevOps & Tools',
		icon: 'cloud',
		accentColor: '#326ce5',
		badgeClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
		intro: 'Common kubectl commands for interacting with Kubernetes clusters, pods, deployments, services, and namespaces.',
		officialUrl: 'https://kubernetes.io/docs/reference/kubectl/cheatsheet/',
		tags: ['kubernetes', 'k8s', 'kubectl', 'devops', 'cloud'],
		sections: [
			{
				id: 'k8s-viewing',
				title: 'Viewing & Querying Resources',
				badge: 'Query',
				items: [
					{ code: 'kubectl get pods -A', explanation: 'List all pods across all namespaces' },
					{ code: 'kubectl get pods -n <ns> -o wide', explanation: 'List pods with assigned node and IP addresses' },
					{ code: 'kubectl get deployments -n <ns>', explanation: 'List all deployments in target namespace' },
					{ code: 'kubectl get svc', explanation: 'List all services and exposed cluster/node ports' },
					{ code: 'kubectl describe pod <pod-name>', explanation: 'Inspect pod status, conditions, events, and lifecycle' }
				]
			},
			{
				id: 'k8s-troubleshoot',
				title: 'Debugging & Execution',
				badge: 'Debug',
				items: [
					{ code: 'kubectl logs -f <pod-name> -c <container>', explanation: 'Stream live container logs' },
					{ code: 'kubectl logs --previous <pod-name>', explanation: 'View logs from previous container instance before crash' },
					{ code: 'kubectl exec -it <pod-name> -- sh', explanation: 'Run interactive shell inside running container' },
					{ code: 'kubectl port-forward pod/<pod-name> 8080:80', explanation: 'Forward local port 8080 to container port 80' }
				]
			},
			{
				id: 'k8s-management',
				title: 'Deployments & Scaling',
				badge: 'Scale',
				items: [
					{ code: 'kubectl apply -f manifest.yaml', explanation: 'Declaratively apply config manifest file' },
					{ code: 'kubectl scale deployment <name> --replicas=5', explanation: 'Scale pod replica count' },
					{ code: 'kubectl rollout restart deployment <name>', explanation: 'Trigger rolling update reload of deployment pods' },
					{ code: 'kubectl rollout status deployment <name>', explanation: 'Watch rolling update rollout progress' }
				]
			}
		]
	},
	{
		slug: 'rust',
		title: 'Rust Syntax & Idioms Cheatsheet',
		shortTitle: 'Rust',
		category: 'Languages',
		icon: 'cpu',
		accentColor: '#dea584',
		badgeClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
		intro: 'Quick reference for Rust language concepts: ownership, borrowing, structs, enums, pattern matching, Result, and Option.',
		officialUrl: 'https://doc.rust-lang.org/book/',
		tags: ['rust', 'systems', 'memory-safety', 'cargo'],
		sections: [
			{
				id: 'rust-ownership',
				title: 'Ownership & Borrowing',
				badge: 'Core',
				items: [
					{ code: 'let mut x = 5;  // Mutable variable binding', explanation: 'Variables are immutable by default in Rust' },
					{ code: 'let s2 = s1;  // Ownership MOVED from s1 to s2', explanation: 'Non-Copy heap values transfer ownership' },
					{ code: 'let len = calculate_length(&s);  // Immutable borrow', explanation: 'Pass read-only reference without moving ownership' },
					{ code: 'let r = &mut s;  // Mutable borrow', explanation: 'Only one mutable reference allowed at a time' }
				]
			},
			{
				id: 'rust-enums',
				title: 'Enums & Pattern Matching',
				badge: 'Enums',
				items: [
					{ code: 'match result {\n    Ok(val) => println!("Success: {}", val),\n    Err(e) => eprintln!("Error: {}", e),\n}', explanation: 'Exhaustive pattern matching on Result<T, E>' },
					{ code: 'if let Some(user) = maybe_user {\n    println!("Found {}", user.name);\n}', explanation: 'Concise conditional handling for Option<T>' },
					{ code: 'let value = val.unwrap_or_default();', explanation: 'Unwrap or fallback safely' }
				]
			},
			{
				id: 'rust-cargo',
				title: 'Cargo CLI Commands',
				badge: 'Cargo',
				items: [
					{ code: 'cargo new <project_name> --bin', explanation: 'Create new binary Rust project' },
					{ code: 'cargo check', explanation: 'Fast compilation check without generating binary' },
					{ code: 'cargo build --release', explanation: 'Compile with maximum compiler optimizations' },
					{ code: 'cargo test', explanation: 'Run unit and integration tests' },
					{ code: 'cargo clippy', explanation: 'Run Rust linter for idiomatic warnings' }
				]
			}
		]
	},
	{
		slug: 'go',
		title: 'Go (Golang) Cheatsheet',
		shortTitle: 'Go',
		category: 'Languages',
		icon: 'zap',
		accentColor: '#00add8',
		badgeClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
		intro: 'Concise reference for Go: types, structs, interfaces, goroutines, channels, error handling, and slices.',
		officialUrl: 'https://go.dev/doc/',
		tags: ['go', 'golang', 'backend', 'concurrency'],
		sections: [
			{
				id: 'go-basics',
				title: 'Types & Declarations',
				badge: 'Basics',
				items: [
					{ code: 'name := "Gopher"  // Short variable declaration', explanation: 'Declare and initialize with inferred type inside function' },
					{ code: 'var count int = 10', explanation: 'Explicit typed declaration' },
					{ code: 'const MaxLimit = 100', explanation: 'Constant declaration' },
					{ code: 'items := []string{"a", "b", "c"}', explanation: 'Slice declaration' },
					{ code: 'm := make(map[string]int)', explanation: 'Initialize hash map with make' }
				]
			},
			{
				id: 'go-concurrency',
				title: 'Goroutines & Channels',
				badge: 'Concurrency',
				items: [
					{ code: 'go doBackgroundWork()', explanation: 'Launch lightweight concurrent thread (goroutine)' },
					{ code: 'ch := make(chan int, 10)  // Buffered channel', explanation: 'Create thread-safe channel with capacity' },
					{ code: 'ch <- 42  // Send value to channel', explanation: 'Push data onto channel' },
					{ code: 'val := <-ch  // Receive value from channel', explanation: 'Pull data from channel (blocks until available)' },
					{ code: 'select {\ncase msg := <-ch1: handle(msg)\ncase <-time.After(time.Second): timeout()\n}', explanation: 'Non-blocking multi-channel selector with timeout' }
				]
			},
			{
				id: 'go-errors',
				title: 'Error Handling Idiom',
				badge: 'Errors',
				items: [
					{ code: 'if err != nil {\n    return fmt.Errorf("failed action: %w", err)\n}', explanation: 'Idiomatic Go error check with wrapped error' },
					{ code: 'defer f.Close()', explanation: 'Defer function execution until surrounding function returns' }
				]
			}
		]
	},
	{
		slug: 'nginx',
		title: 'Nginx Configuration Reference',
		shortTitle: 'Nginx',
		category: 'Backend',
		icon: 'server',
		accentColor: '#009639',
		badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
		intro: 'Common Nginx configuration directives: reverse proxy, SSL/TLS, static file delivery, gzip, and rate limiting.',
		officialUrl: 'https://nginx.org/en/docs/',
		tags: ['nginx', 'webserver', 'proxy', 'ssl', 'devops'],
		sections: [
			{
				id: 'nginx-reverse-proxy',
				title: 'Reverse Proxy Block',
				badge: 'Proxy',
				colSpan: 2,
				codeBlock: {
					lang: 'nginx',
					caption: 'Modern upstream reverse proxy with SSL',
					code: `server {
    listen 443 ssl http2;
    server_name api.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`
				}
			},
			{
				id: 'nginx-commands',
				title: 'CLI Management',
				badge: 'CLI',
				items: [
					{ code: 'nginx -t', explanation: 'Test syntax of configuration files without reloading' },
					{ code: 'nginx -s reload', explanation: 'Gracefully reload configuration without dropping connections' },
					{ code: 'nginx -s stop', explanation: 'Fast shutdown of Nginx master and workers' }
				]
			}
		]
	},
	{
		slug: 'postgresql',
		title: 'PostgreSQL Reference & psql CLI',
		shortTitle: 'PostgreSQL',
		category: 'Databases',
		icon: 'database',
		accentColor: '#336791',
		badgeClass: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
		intro: 'PSQL command-line shortcuts, JSONB querying, indexes, EXPLAIN ANALYZE, and admin commands for Postgres.',
		officialUrl: 'https://www.postgresql.org/docs/',
		tags: ['postgres', 'psql', 'sql', 'database', 'jsonb'],
		sections: [
			{
				id: 'psql-meta',
				title: 'psql Meta Commands',
				badge: 'CLI',
				items: [
					{ code: '\\l', explanation: 'List all databases on PostgreSQL server' },
					{ code: '\\c <dbname>', explanation: 'Connect to database' },
					{ code: '\\dt+', explanation: 'List all tables with size and description' },
					{ code: '\\d <table_name>', explanation: 'Describe schema, columns, constraints of table' },
					{ code: '\\di', explanation: 'List all indexes' },
					{ code: '\\x', explanation: 'Toggle expanded tabular display (ideal for wide rows)' },
					{ code: '\\q', explanation: 'Quit psql interactive prompt' }
				]
			},
			{
				id: 'pg-jsonb',
				title: 'JSONB Operations',
				badge: 'JSONB',
				items: [
					{ code: 'SELECT data->\'user\'->>\'name\' FROM events;', explanation: 'Extract nested string attribute with ->>' },
					{ code: 'SELECT * FROM logs WHERE data @> \'{"level": "error"}\';', explanation: 'Check if JSONB column contains target JSON document' },
					{ code: 'CREATE INDEX idx_logs_data ON logs USING gin(data);', explanation: 'Create fast GIN index on JSONB field' }
				]
			},
			{
				id: 'pg-performance',
				title: 'Performance & Tuning',
				badge: 'Performance',
				items: [
					{ code: 'EXPLAIN (ANALYZE, BUFFERS) SELECT ...;', explanation: 'Execute query and show actual execution plan & memory buffer hits' },
					{ code: 'VACUUM (VERBOSE, ANALYZE);', explanation: 'Reclaim dead tuple storage and update optimizer statistics' }
				]
			}
		]
	},
	{
		slug: 'redis',
		title: 'Redis Commands Cheatsheet',
		shortTitle: 'Redis',
		category: 'Databases',
		icon: 'layers',
		accentColor: '#dc382d',
		badgeClass: 'text-red-400 bg-red-500/10 border-red-500/20',
		intro: 'In-memory data store commands: Strings, Hashes, Lists, Sets, Sorted Sets, Pub/Sub, and TTL expiration.',
		officialUrl: 'https://redis.io/commands/',
		tags: ['redis', 'cache', 'key-value', 'nosql', 'pubsub'],
		sections: [
			{
				id: 'redis-strings',
				title: 'Strings & Expiration',
				badge: 'Strings',
				items: [
					{ code: 'SET key "value" EX 3600', explanation: 'Set string value with 3600s TTL (expires in 1hr)' },
					{ code: 'GET key', explanation: 'Retrieve value of key' },
					{ code: 'INCR counter / DECR counter', explanation: 'Atomic integer increment / decrement' },
					{ code: 'EXPIRE key 60', explanation: 'Set timeout on key in seconds' },
					{ code: 'TTL key', explanation: 'Get remaining time to live in seconds (-1 infinite, -2 nonexistent)' }
				]
			},
			{
				id: 'redis-hashes',
				title: 'Hashes (Objects)',
				badge: 'Hashes',
				items: [
					{ code: 'HSET user:100 name "Alice" email "alice@example.com"', explanation: 'Set multiple field values in hash' },
					{ code: 'HGET user:100 name', explanation: 'Get single field from hash' },
					{ code: 'HGETALL user:100', explanation: 'Get all fields and values in hash' }
				]
			},
			{
				id: 'redis-lists-sets',
				title: 'Lists & Sets',
				badge: 'Collections',
				items: [
					{ code: 'LPUSH queue "job1" / RPOP queue', explanation: 'FIFO queue with left push and right pop' },
					{ code: 'SADD tags "web" "tech"', explanation: 'Add unique members to set' },
					{ code: 'SISMEMBER tags "web"', explanation: 'Test if element is member of set' }
				]
			}
		]
	},
	{
		slug: 'github-actions',
		title: 'GitHub Actions Workflow Reference',
		shortTitle: 'GitHub Actions',
		category: 'Config & Workflow',
		icon: 'workflow',
		accentColor: '#2088ff',
		badgeClass: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
		intro: 'Syntax and structure for GitHub Actions CI/CD workflows, job matrices, triggers, secrets, and cache steps.',
		officialUrl: 'https://docs.github.com/en/actions',
		tags: ['ci-cd', 'github', 'devops', 'automation', 'yaml'],
		sections: [
			{
				id: 'gha-workflow',
				title: 'Standard Node/CI Workflow',
				badge: 'YAML',
				colSpan: 2,
				codeBlock: {
					lang: 'yaml',
					caption: '.github/workflows/ci.yml',
					code: `name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20.x, 22.x]

    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - run: npm ci
      - run: npm run build
      - run: npm test`
				}
			}
		]
	},
	{
		slug: 'http-status',
		title: 'HTTP Status Codes Quick Reference',
		shortTitle: 'HTTP Status',
		category: 'Backend',
		icon: 'globe',
		accentColor: '#10b981',
		badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
		intro: 'Complete reference for HTTP response status codes: 2xx success, 3xx redirects, 4xx client errors, and 5xx server errors.',
		officialUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
		tags: ['http', 'api', 'rest', 'web', 'networking'],
		sections: [
			{
				id: 'http-success',
				title: '2xx Success & 3xx Redirection',
				badge: '2xx / 3xx',
				items: [
					{ code: '200 OK', explanation: 'Request succeeded and resource is returned' },
					{ code: '201 Created', explanation: 'Request succeeded and new resource was created' },
					{ code: '204 No Content', explanation: 'Request succeeded with no body returned (e.g. DELETE)' },
					{ code: '301 Moved Permanently', explanation: 'Target resource has been assigned new permanent URI' },
					{ code: '304 Not Modified', explanation: 'Client can use cached copy (conditional GET matching ETag)' }
				]
			},
			{
				id: 'http-client-errors',
				title: '4xx Client Errors',
				badge: '4xx',
				items: [
					{ code: '400 Bad Request', explanation: 'Server cannot process request due to malformed syntax' },
					{ code: '401 Unauthorized', explanation: 'Authentication credentials missing or invalid' },
					{ code: '403 Forbidden', explanation: 'Authenticated user lacks permission for action' },
					{ code: '404 Not Found', explanation: 'Requested resource could not be found on server' },
					{ code: '409 Conflict', explanation: 'Request conflicts with current server state (e.g. duplicate key)' },
					{ code: '422 Unprocessable Content', explanation: 'Validation failure: semantic payload errors' },
					{ code: '429 Too Many Requests', explanation: 'Rate limit exceeded' }
				]
			},
			{
				id: 'http-server-errors',
				title: '5xx Server Errors',
				badge: '5xx',
				items: [
					{ code: '500 Internal Server Error', explanation: 'Unexpected error encountered by server' },
					{ code: '502 Bad Gateway', explanation: 'Invalid response from upstream backend service' },
					{ code: '503 Service Unavailable', explanation: 'Server temporarily overloaded or down for maintenance' },
					{ code: '504 Gateway Timeout', explanation: 'Upstream server failed to respond in configured timeout' }
				]
			}
		]
	}
];
