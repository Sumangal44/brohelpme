/**
 * SPECIALITIES / DEPARTMENTS
 * --------------------------
 * Configurable list — ONLY `published: true` entries render publicly.
 * No departments are verified yet, so none ship published. Add real
 * departments here when confirmed by the chamber.
 *
 * `icon` accepts any Lucide icon key used by components/icons.ts.
 */

export type Speciality = {
	slug: string;
	name: string;
	nameBn?: string;
	description: string;
	icon: string;
	published: boolean;
};

export const specialities: Speciality[] = [];

export const publishedSpecialities = specialities.filter((s) => s.published);
