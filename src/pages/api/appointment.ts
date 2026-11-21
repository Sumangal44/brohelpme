import type { APIRoute } from 'astro';
import { appointmentSchema, fieldErrors } from '../../server/validation';
import { saveAppointment } from '../../server/store';

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
		// Native (no-JS) form post
		const fd = await request.formData();
		raw = Object.fromEntries(fd.entries());
	}

	const parsed = appointmentSchema.safeParse(raw);

	if (!parsed.success) {
		const errors = fieldErrors(parsed.error);
		const wantsHtml = !request.headers.get('content-type')?.includes('application/json');
		if (wantsHtml) {
			// fall back to a friendly HTML error page
			const qs = new URLSearchParams({ error: '1' });
			for (const [k, v] of Object.entries(errors)) qs.set(k, v);
			return new Response(null, {
				status: 303,
				headers: { Location: `/appointment?${qs.toString()}` }
			});
		}
		return json({ ok: false, errors }, 422);
	}

	const reference = await saveAppointment(parsed.data as Record<string, unknown>);

	const wantsHtml = !request.headers.get('content-type')?.includes('application/json');
	if (wantsHtml) {
		return new Response(null, {
			status: 303,
			headers: { Location: `/appointment?sent=${encodeURIComponent(reference)}` }
		});
	}

	return json({ ok: true, reference });
};
