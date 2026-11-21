<script lang="ts">
	import { getIcon } from '../lib/icons';

	interface Props {
		action?: string;
		doctors?: { name: string; speciality?: string }[];
		initialDoctor?: string;
	}
	let {
		action = '/api/appointment',
		doctors = [],
		initialDoctor = ''
	}: Props = $props();

	const Check = getIcon('circle-check');
	const Chevron = getIcon('chevron-down');
	const Arrow = getIcon('arrow-right');
	const Alert = getIcon('circle-alert');

	let name = $state('');
	let phone = $state('');
	let doctor = $state(initialDoctor);
	let date = $state('');
	let time = $state('');
	let message = $state('');
	let website = $state(''); // honeypot

	let errors = $state<Record<string, string>>({});
	let formError = $state('');
	let pending = $state(false);
	let reference = $state('');

	const today = new Date().toISOString().slice(0, 10);

	const validPhone = (v: string) => {
		const digits = v.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
		return /^[6-9]\d{9}$/.test(digits);
	};

	function validate(): boolean {
		const e: Record<string, string> = {};
		if (name.trim().length < 2) e.name = 'Please enter your name';
		if (!validPhone(phone)) e.phone = 'Enter a valid 10-digit mobile number';
		if (date && date < today) e.date = 'Date cannot be in the past';
		if (message.length > 500) e.message = 'Please keep it under 500 characters';
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
				body: JSON.stringify({ name, phone, doctor, date, time, message, website })
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
			formError =
				data.form ??
				(Object.keys(data.errors ?? {}).length
					? 'Please correct the highlighted fields.'
					: 'We could not send your request.');
		} catch {
			formError =
				'Network error — please call +91 76025 27559 or WhatsApp us to book directly.';
		} finally {
			pending = false;
		}
	}
</script>

{#if reference}
	<!-- Success: request received — NOT a confirmed appointment -->
	<div class="soft-card !transform-none flex flex-col items-start gap-5 px-7 py-10 sm:px-10">
		<span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/15 text-teal">
			<Check size={28} strokeWidth={2.2} />
		</span>
		<div>
			<h3 class="text-2xl font-extrabold sm:text-3xl">Request received</h3>
			<p class="mt-2 font-mono text-sm font-semibold tracking-wide text-medical">
				Reference {reference}
			</p>
		</div>
		<p class="rounded-2xl border border-teal/30 bg-teal/8 px-5 py-4 text-sm leading-relaxed text-ink">
			<strong>This is an appointment request, not a confirmed appointment.</strong>
			Our team will call you on <strong>{phone}</strong> to confirm the doctor, date and time.
		</p>
		<div class="flex flex-wrap gap-3">
			<a
				href="https://wa.me/917602527559?text={encodeURIComponent(
					`Hello Kathamala Doctors Chamber, I have just sent an appointment request (Ref ${reference}).`
				)}"
				target="_blank"
				rel="noopener"
				class="btn btn-teal text-sm"
			>
				Confirm on WhatsApp
			</a>
			<a href="tel:+917602527559" class="btn btn-ghost text-sm">Call the chamber</a>
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
				<label class="field-label" for="appt-name">Patient name *</label>
				<input
					id="appt-name"
					name="name"
					type="text"
					class="field-input"
					placeholder="Full name"
					autocomplete="name"
					bind:value={name}
					aria-invalid={errors.name ? 'true' : undefined}
					aria-describedby={errors.name ? 'appt-name-err' : undefined}
				/>
				{#if errors.name}<p class="field-error" id="appt-name-err">{errors.name}</p>{/if}
			</div>

			<div>
				<label class="field-label" for="appt-phone">Phone number *</label>
				<input
					id="appt-phone"
					name="phone"
					type="tel"
					inputmode="tel"
					class="field-input"
					placeholder="e.g. 76025 27559"
					autocomplete="tel"
					bind:value={phone}
					aria-invalid={errors.phone ? 'true' : undefined}
					aria-describedby={errors.phone ? 'appt-phone-err' : undefined}
				/>
				{#if errors.phone}
					<p class="field-error" id="appt-phone-err">{errors.phone}</p>
				{:else}
					<p class="field-hint">We will only use this to confirm your visit.</p>
				{/if}
			</div>

			<div>
				<label class="field-label" for="appt-doctor">Preferred doctor</label>
				<div class="select-wrap">
					<select id="appt-doctor" name="doctor" class="field-input" bind:value={doctor}>
						<option value="">Any available doctor</option>
						{#each doctors as d (d.name)}
							<option value={d.name}>{d.name}{d.speciality ? ` — ${d.speciality}` : ''}</option>
						{/each}
					</select>
					<Chevron size={17} />
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label class="field-label" for="appt-date">Preferred date</label>
					<input
						id="appt-date"
						name="date"
						type="date"
						min={today}
						class="field-input"
						bind:value={date}
						aria-invalid={errors.date ? 'true' : undefined}
					/>
					{#if errors.date}<p class="field-error">{errors.date}</p>{/if}
				</div>
				<div>
					<label class="field-label" for="appt-time">Preferred time</label>
					<input id="appt-time" name="time" type="time" class="field-input" bind:value={time} />
				</div>
			</div>
		</div>

		<div>
			<label class="field-label" for="appt-message">Anything we should know? <span class="font-normal normal-case tracking-normal text-ink-soft">(optional)</span></label>
			<textarea
				id="appt-message"
				name="message"
				rows="3"
				class="field-input resize-none"
				placeholder="Symptoms, preferred consultation time, first visit…"
				bind:value={message}
				aria-invalid={errors.message ? 'true' : undefined}
			></textarea>
			{#if errors.message}<p class="field-error">{errors.message}</p>{/if}
		</div>

		<!-- honeypot -->
		<div class="hidden" aria-hidden="true">
			<label for="appt-website">Website</label>
			<input id="appt-website" name="website" type="text" tabindex="-1" autocomplete="off" bind:value={website} />
		</div>

		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<p class="max-w-xs text-xs leading-relaxed text-ink-soft">
				Sending a request does not confirm an appointment — our team will call you back to confirm.
			</p>
			<button type="submit" class="btn btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-60" disabled={pending}>
				{pending ? 'Sending…' : 'Submit request'}
				{#if !pending}
					<Arrow size={16} class="arrow" strokeWidth={2.2} />
				{/if}
			</button>
		</div>

		<p class="text-xs text-ink-soft">
			Prefer talking?
			<a href="tel:+917602527559" class="font-semibold text-medical underline-offset-2 hover:underline">Call +91 76025 27559</a>
			or
			<a
				href="https://wa.me/917602527559?text={encodeURIComponent(
					'Hello Kathamala Doctors Chamber, I would like to book an appointment.'
				)}"
				target="_blank"
				rel="noopener"
				class="font-semibold text-teal underline-offset-2 hover:underline">WhatsApp us</a
			>.
		</p>
	</form>
{/if}
