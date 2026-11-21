import { existsSync } from 'node:fs';
import { join } from 'node:path';

/** True when a real photograph has been dropped into /public. */
export const hasImage = (path: string): boolean => {
	if (!path || !path.startsWith('/')) return false;
	try {
		return existsSync(join(process.cwd(), 'public', path));
	} catch {
		return false;
	}
};
