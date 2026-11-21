import type { APIRoute } from 'astro';
import { contactSchema, fieldErrors } from '../../server/validation';
import { saveEnquiry } from '../../server/store';

export const prerender = false;

const json = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
	});

export const POST: APIRoute = async ({ request }) => {
	let raw: unknown;

	if (request.headers.get('content-type')?.includes('application/json')) {
		try {
			raw = await request.json();
		} catch {
			return json({ ok: false, form: 'Invalid request payload' }, 400);
		}
	} else {
		const fd = await request.formData();
		raw = Object.fromEntries(fd.entries());
	}

	const parsed = contactSchema.safeParse(raw);

	if (!parsed.success) {
		const errors = fieldErrors(parsed.error);
		const wantsHtml = !request.headers.get('content-type')?.includes('application/json');
		if (wantsHtml) {
			const qs = new URLSearchParams({ error: '1' });
			for (const [k, v] of Object.entries(errors)) qs.set(k, v);
			return new Response(null, { status: 303, headers: { Location: `/contact?${qs.toString()}` } });
		}
		return json({ ok: false, errors }, 422);
	}

	const reference = await saveEnquiry(parsed.data as Record<string, unknown>);

	const wantsHtml = !request.headers.get('content-type')?.includes('application/json');
	if (wantsHtml) {
		return new Response(null, {
			status: 303,
			headers: { Location: `/contact?sent=${encodeURIComponent(reference)}` }
		});
	}

	return json({ ok: true, reference });
};
