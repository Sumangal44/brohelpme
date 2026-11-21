import { appendFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Local, dependency-free submission store (JSON Lines).
 * Swap this for Supabase later — only this file needs to change.
 */
const DATA_DIR = join(process.cwd(), '.data');

const ref = (prefix: string) =>
	`${prefix}-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

async function append(collection: string, record: Record<string, unknown>): Promise<void> {
	try {
		await mkdir(DATA_DIR, { recursive: true });
		await appendFile(join(DATA_DIR, `${collection}.jsonl`), `${JSON.stringify(record)}\n`, 'utf8');
	} catch (err) {
		// Never fail a user request because disk logging failed (e.g. read-only host).
		console.error(`[kdc] could not persist to ${collection}:`, err);
	}
}

export async function saveAppointment(input: Record<string, unknown>) {
	const reference = ref('APPT');
	await append('appointments', {
		reference,
		receivedAt: new Date().toISOString(),
		status: 'requested', // request ≠ confirmed appointment
		...input
	});
	console.info(`[kdc] appointment request ${reference}`, input);
	return reference;
}

export async function saveEnquiry(input: Record<string, unknown>) {
	const reference = ref('ENQ');
	await append('enquiries', {
		reference,
		receivedAt: new Date().toISOString(),
		...input
	});
	console.info(`[kdc] contact enquiry ${reference}`, input);
	return reference;
}
