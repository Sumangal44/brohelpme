/**
 * Single source of truth for all business information.
 * Verified facts only — sourced from the client brief and public listings.
 */

export const site = {
	name: 'KATHAMALA DOCTORS CHAMBER',
	nameBn: 'কথামালা ডাক্তার চেম্বার',
	short: 'Kathamala',
	tagline: 'Trusted Healthcare. A Better Tomorrow.',
	taglineBn: 'বিশ্বাসের সঙ্গে সুস্বাস্থ্যের পথে।',
	description:
		'Patient-focused healthcare and experienced medical professionals at Kathamala Doctors Chamber, Rabindra Nagar, Midnapore, West Bengal.',
	url: 'https://kathamaladc.in',
	established: 2012,

	phone: {
		display: '+91 76025 27559',
		tel: 'tel:+917602527559',
		whatsapp: 'https://wa.me/917602527559',
		whatsappText: encodeURIComponent(
			'Hello Kathamala Doctors Chamber, I would like to book an appointment.'
		)
	},

	email: 'kathamaladc@gmail.com',

	facebook: 'https://facebook.com/129661433562539',

	address: {
		street: 'Capsule Healthcare Street, Near CPI Jela Office',
		locality: 'Rabindra Nagar, Midnapore',
		region: 'West Bengal',
		postal: '721101',
		full: 'Capsule Healthcare Street, Near CPI Jela Office, Rabindra Nagar, Midnapore, West Bengal 721101'
	},

	/** Verified coordinates from the Google business listing. */
	geo: { lat: 22.422927, lng: 87.317504, plusCode: 'C8F9+52 Midnapore, West Bengal' },

	links: {
		gMapsSearch:
			'https://www.google.com/maps/search/?api=1&query=Kathamala+Doctors+Chamber+Midnapore',
		gMapsDirections:
			'https://www.google.com/maps/dir/?api=1&destination=22.422927%2C87.317504',
		gMapsEmbed:
			'https://www.google.com/maps?q=22.422927,87.317504&z=16&output=embed',
		gReviews:
			'https://www.google.com/maps/search/?api=1&query=Kathamala+Doctors+Chamber+Midnapore&query_place_id=ChIJ' // replaced below
	},

	/**
	 * Opening hours as listed by the business on public directories
	 * (Always Dial listing). Conflicting directory data exists — please
	 * verify with the chamber before relying on this.
	 */
	hours: [
		{ days: 'Monday – Friday', time: '9:00 AM – 9:00 PM' },
		{ days: 'Saturday', time: '9:00 AM – 9:00 PM' },
		{ days: 'Sunday', time: '9:00 AM – 9:00 PM' }
	],
	hoursNote: 'Public holiday timings may vary — please call to confirm.',

	rating: { value: 4.7, max: 5, reviews: 117, source: 'Google' },

	/** Optional image slots — drop real photographs into /public/images. */
	images: {
		hero: '/images/hero.jpg',
		about: '/images/about.jpg'
	}
};

/** Real review link (search-based, no fabricated place ID). */
site.links.gReviews = site.links.gMapsSearch;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
	{ label: 'Home', href: '/' },
	{ label: 'About', href: '/about' },
	{ label: 'Doctors', href: '/doctors' },
	{ label: 'Specialities', href: '/specialities' },
	{ label: 'Gallery', href: '/gallery' },
	{ label: 'Contact', href: '/contact' }
];

export const footerLinks = {
	site: [
		{ label: 'About', href: '/about' },
		{ label: 'Doctors', href: '/doctors' },
		{ label: 'Specialities', href: '/specialities' },
		{ label: 'Gallery', href: '/gallery' }
	],
	patient: [
		{ label: 'Book Appointment', href: '/appointment' },
		{ label: 'Contact', href: '/contact' },
		{ label: 'Privacy Policy', href: '/privacy-policy' }
	]
};
