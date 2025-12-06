import { DEFAULT_IMAGES, IMAGE_SIZES } from '../constants/default-images.constant';

export class ImageService {
    /**
     * Generate avatar URL based on user information
     */
    static generateAvatarUrl(
        name?: string,
        gender?: 'male' | 'female',
        size: keyof typeof IMAGE_SIZES.AVATAR = 'MEDIUM',
    ): string {
        const avatarSize = IMAGE_SIZES.AVATAR[size];

        if (name) {
            return DEFAULT_IMAGES.AVATARS.PLACEHOLDER(name).replace('size=200', `size=${avatarSize}`);
        }

        if (gender === 'male') {
            return DEFAULT_IMAGES.AVATARS.MALE.replace('size=200', `size=${avatarSize}`);
        }

        if (gender === 'female') {
            return DEFAULT_IMAGES.AVATARS.FEMALE.replace('size=200', `size=${avatarSize}`);
        }

        return DEFAULT_IMAGES.AVATARS.ANONYMOUS.replace('size=200', `size=${avatarSize}`);
    }

    /**
     * Generate product placeholder image
     */
    static generateProductPlaceholder(
        category?: string,
        size: keyof typeof IMAGE_SIZES.PRODUCT = 'MEDIUM',
        seed?: number,
    ): string {
        const productSize = IMAGE_SIZES.PRODUCT[size];

        // If category matches predefined ones, use specific image
        const categoryKey = category?.toUpperCase() as keyof typeof DEFAULT_IMAGES.PRODUCTS;
        if (categoryKey && DEFAULT_IMAGES.PRODUCTS[categoryKey] && categoryKey !== 'PLACEHOLDER') {
            return DEFAULT_IMAGES.PRODUCTS[categoryKey];
        }

        // Otherwise use random placeholder
        return DEFAULT_IMAGES.PRODUCTS.PLACEHOLDER(productSize, productSize, seed);
    }

    /**
     * Generate brand logo placeholder
     */
    static generateBrandLogo(brandName: string): string {
        return DEFAULT_IMAGES.BRANDS.PLACEHOLDER(brandName);
    }

    /**
     * Generate banner image
     */
    static generateBannerImage(
        type: 'sale' | 'new_arrival' | 'custom' = 'custom',
        device: keyof typeof IMAGE_SIZES.BANNER = 'DESKTOP',
        seed?: number,
    ): string {
        if (type === 'sale') {
            return DEFAULT_IMAGES.BANNERS.SALE;
        }

        if (type === 'new_arrival') {
            return DEFAULT_IMAGES.BANNERS.NEW_ARRIVAL;
        }

        const { width, height } = IMAGE_SIZES.BANNER[device];
        return DEFAULT_IMAGES.BANNERS.PLACEHOLDER(width, height, seed);
    }

    /**
     * Download and save image to local storage (for caching)
     */
    static async downloadImageToLocal(url: string, localPath: string): Promise<void> {
        // Implementation for downloading images to local assets folder
        // This can be used during seeding to cache frequently used images
        try {
            const response = await fetch(url);
            const buffer = await response.arrayBuffer();
            const fs = await import('fs/promises');
            await fs.writeFile(localPath, Buffer.from(buffer));
        } catch (error) {
            console.error('Failed to download image:', error);
            throw error;
        }
    }
}
