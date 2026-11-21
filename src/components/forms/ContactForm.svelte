<script lang="ts">
	import { getIcon } from '../lib/icons';

	interface Props {
		action?: string;
	}
	let { action = '/api/contact' }: Props = $props();

	const Check = getIcon('circle-check');
	const Arrow = getIcon('arrow-right');
	const Alert = getIcon('circle-alert');

	let name = $state('');
	let phone = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');
	let website = $state('');

	let errors = $state<Record<string, string>>({});
	let formError = $state('');
	let pending = $state(false);
	let reference = $state('');

	const validPhone = (v: string) => {
		const digits = v.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
		return /^[6-9]\d{9}$/.test(digits);
	};

	function validate(): boolean {
		const e: Record<string, string> = {};
		if (name.trim().length < 2) e.name = 'Please enter your name';
		if (phone && !validPhone(phone)) e.phone = 'Enter a valid 10-digit mobile number';
		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address';
		if (!phone && !email) e.phone = 'Leave a phone number or email so we can reply';
		if (message.trim().length < 5) e.message = 'Tell us a little more (min. 5 characters)';
		errors = e;
		return Object.keys(e).length === 0;
	}

	async function onSubmit(ev: SubmitEvent) {
		ev.preventDefault();
		formError = '';
		if (!validate()) return;

		pending = true;
		try {
			const res = await fetch(action, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, phone, email, subject, message, website })
			});
			const data = (await res.json().catch(() => ({}))) as {
				ok?: boolean;
				reference?: string;
				errors?: Record<string, string>;
				form?: string;
			};
			if (res.ok && data.ok && data.reference) {
				reference = data.reference;
				return;
			}
			if (data.errors) errors = data.errors;
			formError = data.form ?? 'We could not send your message.';
		} catch {
			formError = 'Network error — please call +91 76025 27559 instead.';
		} finally {
			pending = false;
		}
	}
</script>

{#if reference}
	<div class="soft-card !transform-none flex flex-col items-start gap-5 px-7 py-10 sm:px-10">
		<span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/15 text-teal">
			<Check size={28} strokeWidth={2.2} />
		</span>
		<h3 class="text-2xl font-extrabold">Message sent</h3>
		<p class="text-sm leading-relaxed text-ink-soft">
			Thank you, {name.split(' ')[0]}. We have received your enquiry
			<span class="font-mono font-semibold text-medical">({reference})</span> and will get back to you shortly.
		</p>
		<div class="flex flex-wrap gap-3">
			<a href="tel:+917602527559" class="btn btn-primary text-sm">Call the chamber</a>
		</div>
	</div>
{:else}
	<form method="POST" action={action} class="flex flex-col gap-5" onsubmit={onSubmit} novalidate>
		{#if formError}
			<p class="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
				<Alert size={17} class="mt-0.5 shrink-0" />
				{formError}
			</p>
		{/if}

		<div class="grid gap-5 sm:grid-cols-2">
			<div>
				<label class="field-label" for="c-name">Your name *</label>
				<input
					id="c-name"
					name="name"
					type="text"
					class="field-input"
					placeholder="Full name"
					autocomplete="name"
					bind:value={name}
					aria-invalid={errors.name ? 'true' : undefined}
				/>
				{#if errors.name}<p class="field-error">{errors.name}</p>{/if}
			</div>
			<div>
				<label class="field-label" for="c-phone">Phone</label>
				<input
					id="c-phone"
					name="phone"
					type="tel"
					inputmode="tel"
					class="field-input"
					placeholder="Mobile number"
					autocomplete="tel"
					bind:value={phone}
					aria-invalid={errors.phone ? 'true' : undefined}
				/>
				{#if errors.phone}<p class="field-error">{errors.phone}</p>{/if}
			</div>
		</div>

		<div class="grid gap-5 sm:grid-cols-2">
			<div>
				<label class="field-label" for="c-email">Email</label>
				<input
					id="c-email"
					name="email"
					type="email"
					class="field-input"
					placeholder="you@example.com"
					autocomplete="email"
					bind:value={email}
					aria-invalid={errors.email ? 'true' : undefined}
				/>
				{#if errors.email}<p class="field-error">{errors.email}</p>{/if}
			</div>
			<div>
				<label class="field-label" for="c-subject">Subject</label>
				<input
					id="c-subject"
					name="subject"
					type="text"
					class="field-input"
					placeholder="Appointment, reports, feedback…"
					bind:value={subject}
				/>
			</div>
		</div>

		<div>
			<label class="field-label" for="c-message">Message *</label>
			<textarea
				id="c-message"
				name="message"
				rows="5"
				class="field-input resize-none"
				placeholder="How can we help?"
				bind:value={message}
				aria-invalid={errors.message ? 'true' : undefined}
			></textarea>
			{#if errors.message}<p class="field-error">{errors.message}</p>{/if}
		</div>

		<div class="hidden" aria-hidden="true">
			<label for="c-website">Website</label>
			<input id="c-website" name="website" type="text" tabindex="-1" autocomplete="off" bind:value={website} />
		</div>

		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<p class="text-xs text-ink-soft">We usually reply within working hours.</p>
			<button type="submit" class="btn btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-60" disabled={pending}>
				{pending ? 'Sending…' : 'Send message'}
				{#if !pending}<Arrow size={16} class="arrow" strokeWidth={2.2} />{/if}
			</button>
		</div>
	</form>
{/if}
