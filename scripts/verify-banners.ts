import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { BannerSchema } from '../src/lib/banners';

const bannersPath = resolve(process.cwd(), 'src/data/community-banners.json');

try {
	const raw = readFileSync(bannersPath, 'utf-8');
	const data = JSON.parse(raw);

	if (!Array.isArray(data)) {
		console.error('❌ Error: community-banners.json must be a JSON array of banner objects.');
		process.exit(1);
	}

	console.log(`Auditing ${data.length} community banners...\n`);
	let errors = 0;
	const seenIds = new Set<string>();

	data.forEach((item, index) => {
		const result = BannerSchema.safeParse(item);
		if (!result.success) {
			console.error(`❌ Banner #${index + 1} (${item?.title || 'Unknown'}) failed validation:`);
			result.error.issues.forEach((issue) => {
				console.error(`   - [${issue.path.join('.')}] ${issue.message}`);
			});
			errors++;
			return;
		}

		if (seenIds.has(result.data.id)) {
			console.error(`❌ Duplicate banner ID found: "${result.data.id}" at index ${index + 1}`);
			errors++;
		}
		seenIds.add(result.data.id);

		console.log(`✓ [${result.data.badge}] ${result.data.title} -> ${result.data.url}`);
	});

	if (errors > 0) {
		console.error(`\n❌ Failed with ${errors} banner error(s).`);
		process.exit(1);
	}

	console.log(`\n✅ All ${data.length} community banners verified successfully!`);
} catch (e: any) {
	console.error('❌ Failed to read or parse community-banners.json:', e.message);
	process.exit(1);
}
