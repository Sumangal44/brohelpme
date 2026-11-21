/**
 * DOCTOR DIRECTORY
 * ----------------
 * Only entries with `published: true` appear on public pages.
 * NEVER invent names, qualifications, experience or schedules.
 * Add verified profiles here when the chamber supplies them.
 *
 * Example entry (uncomment and complete with verified data only):
 *
 * {
 *   slug: 'doctor-slug',
 *   name: 'Dr. …',
 *   qualifications: 'MBBS, MD (…)',
 *   speciality: '…',
 *   experienceYears: 0,
 *   schedule: [{ days: 'Mon, Wed, Fri', time: '5:00 PM – 8:00 PM' }],
 *   photo: '/images/doctors/…webp',
 *   bio: '…',
 *   published: false
 * }
 *
 * LEAD TO VERIFY: a public Google listing exists for "Dr. Jyoti Mondal"
 * at Kathamala Doctor's chamber (near CPI jela office). Confirm
 * qualifications, speciality and schedule with the chamber before publishing.
 */

export type DoctorSchedule = { days: string; time: string };

export type Doctor = {
	slug: string;
	name: string;
	qualifications: string;
	speciality: string;
	experienceYears?: number;
	schedule: DoctorSchedule[];
	photo?: string;
	bio?: string;
	published: boolean;
};

export const doctors: Doctor[] = [];

export const publishedDoctors = doctors.filter((d) => d.published);

export const getDoctorBySlug = (slug: string) =>
	publishedDoctors.find((d) => d.slug === slug);

/** Distinct specialities from published doctors (for filters). */
export const doctorSpecialities = [...new Set(publishedDoctors.map((d) => d.speciality))];
