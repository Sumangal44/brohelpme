/**
 * GALLERY
 * -------
 * Real clinic photographs only. Drop files into /public/images/gallery/
 * and register them here with `published: true`.
 * Never use stock photos presented as photographs of this chamber.
 */

export type GalleryCategory = 'exterior' | 'reception' | 'waiting' | 'consultation' | 'other';

export type GalleryItem = {
	src: string;
	alt: string;
	category: GalleryCategory;
	span?: 'wide' | 'tall' | 'normal';
	published: boolean;
};

export const gallery: GalleryItem[] = [];

export const publishedGallery = gallery.filter((g) => g.published);

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
	exterior: 'Exterior',
	reception: 'Reception',
	waiting: 'Waiting Area',
	consultation: 'Consultation Rooms',
	other: 'Chamber'
};
