import { z } from 'zod';
import bannersData from '../data/community-banners.json';

export const BannerSchema = z.object({
	id: z
		.string()
		.min(2)
		.max(40)
		.regex(/^[a-z0-9-]+$/, 'ID must be lowercase alphanumeric with hyphens'),
	title: z.string().min(2).max(40),
	tagline: z.string().min(10).max(120),
	url: z.string().startsWith('https://', { message: 'URL must use HTTPS' }),
	badge: z.string().min(2).max(20),
	ctaText: z.string().min(2).max(25),
	active: z.boolean().default(true)
});

export type CommunityBannerItem = z.infer<typeof BannerSchema>;

export function getCommunityBanners(): CommunityBannerItem[] {
	const result = z.array(BannerSchema).safeParse(bannersData);
	if (!result.success) {
		console.warn('Invalid community banners data:', result.error);
		return [];
	}
	return result.data.filter((b) => b.active);
}

export function validateBannersData(data: unknown) {
	return z.array(BannerSchema).safeParse(data);
}
