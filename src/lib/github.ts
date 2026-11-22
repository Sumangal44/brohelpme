const REPO = 'Sumangal44/brohelpme';

let starPromise: Promise<number | null> | undefined;

/**
 * GitHub star count for the repo, fetched **once per build** (module-level cache) and
 * handed to the navbar as a prop — so no request is made from the browser and the
 * unauthenticated API rate limit is never hit by visitors.
 *
 * Returns `null` when the API is unreachable, rate-limited or times out; the UI then
 * simply hides the counter instead of showing a wrong number.
 */
export function getStarCount(): Promise<number | null> {
	if (!starPromise) {
		starPromise = fetch(`https://api.github.com/repos/${REPO}`, {
			headers: { Accept: 'application/vnd.github+json' },
			signal: AbortSignal.timeout(6000)
		})
			.then((res) => (res.ok ? res.json() : null))
			.then((data: unknown) => {
				const count = (data as { stargazers_count?: unknown } | null)?.stargazers_count;
				return typeof count === 'number' ? count : null;
			})
			.catch(() => null);
	}
	return starPromise;
}

/** 999 → "999", 1234 → "1.2k", 12500 → "13k", 1_200_000 → "1.2m" */
export function formatStarCount(count: number): string {
	if (count >= 1_000_000) return `${trimZero(count / 1_000_000)}m`;
	if (count >= 1000) return `${trimZero(count / 1000)}k`;
	return String(count);
}

function trimZero(value: number): string {
	return value.toFixed(1).replace(/\.0$/, '');
}
