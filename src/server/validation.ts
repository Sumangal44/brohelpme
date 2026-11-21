import { z } from 'zod';

/** Indian mobile numbers — accepts 7602527559, 07602527559, +91 76025 27559 … */
const phone = z
	.string()
	.trim()
	.transform((v) => v.replace(/[^\d+]/g, ''))
	.refine((v) => {
		const digits = v.replace(/\D/g, '');
		const local = digits.replace(/^91(?=\d{10}$)/, '').replace(/^0(?=\d{10}$)/, '');
		return /^[6-9]\d{9}$/.test(local);
	}, 'Enter a valid 10-digit mobile number');

const futureDate = z
	.string()
	.trim()
	.refine((v) => v === '' || /^\d{4}-\d{2}-\d{2}$/.test(v), 'Use a valid date')
	.refine((v) => {
		if (v === '') return true;
		const d = new Date(`${v}T00:00:00`);
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return !Number.isNaN(d.getTime()) && d >= today;
	}, 'Date cannot be in the past');

export const appointmentSchema = z
	.object({
		name: z.string().trim().min(2, 'Please enter your name').max(80, 'Name is too long'),
		phone,
		doctor: z.string().trim().max(120).optional().default(''),
		date: futureDate.optional().default(''),
		time: z
			.string()
			.trim()
			.refine((v) => v === '' || /^([01]\d|2[0-3]):[0-5]\d$/.test(v), 'Enter a valid time')
			.optional()
			.default(''),
		message: z.string().trim().max(500, 'Message is too long').optional().default(''),
		/** honeypot — real users never fill this */
		website: z.string().max(0, 'Invalid submission').optional().default('')
	})
	.transform(({ website, ...rest }) => rest);

export type AppointmentInput = z.infer<typeof appointmentSchema>;

export const contactSchema = z
	.object({
		name: z.string().trim().min(2, 'Please enter your name').max(80),
		phone: phone.optional().or(z.literal('')).default(''),
		email: z
			.string()
			.trim()
			.email('Enter a valid email address')
			.optional()
			.or(z.literal(''))
			.default(''),
		subject: z.string().trim().max(120).optional().default(''),
		message: z.string().trim().min(5, 'Tell us a little more (min. 5 characters)').max(1000),
		website: z.string().max(0, 'Invalid submission').optional().default('')
	})
	.transform(({ website, ...rest }) => rest)
	.refine((v) => v.phone !== '' || v.email !== '', {
		message: 'Please leave a phone number or email so we can reach you',
		path: ['phone']
	});

export type ContactInput = z.infer<typeof contactSchema>;

/** Flatten ZodError into `{ field: message }` for form UIs. */
export const fieldErrors = (err: z.ZodError): Record<string, string> => {
	const out: Record<string, string> = {};
	for (const issue of err.issues) {
		const key = String(issue.path[0] ?? 'form');
		if (!out[key]) out[key] = issue.message;
	}
	return out;
};
