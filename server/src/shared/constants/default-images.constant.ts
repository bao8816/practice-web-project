export const DEFAULT_IMAGES = {
    AVATARS: {
        // UI Avatars - generates avatar from initials
        PLACEHOLDER: (name: string, background = 'C6A7FF', color = 'fff') =>
            `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${background}&color=${color}&size=200`,

        // Default avatar for users without names
        ANONYMOUS: 'https://ui-avatars.com/api/?name=User&background=C6A7FF&color=fff&size=200',

        // Gender-specific defaults
        MALE: 'https://ui-avatars.com/api/?name=M&background=7DC8FF&color=fff&size=200',
        FEMALE: 'https://ui-avatars.com/api/?name=F&background=F7A3D4&color=fff&size=200',
    },

    PRODUCTS: {
        // Lorem Picsum for product placeholders
        PLACEHOLDER: (width = 300, height = 300, seed?: number) =>
            `https://picsum.photos/${width}/${height}${seed ? `?random=${seed}` : ''}`,

        // Category-specific placeholders (using specific Unsplash collections)
        ELECTRONICS: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop',
        CLOTHING: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop',
        BOOKS: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
        SPORTS: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
        FOOD: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop',
    },

    BRANDS: {
        // Generic brand placeholder
        PLACEHOLDER: (name: string) =>
            `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1F2937&color=fff&size=100&bold=true`,
    },

    BANNERS: {
        // Wide banners for promotions
        PLACEHOLDER: (width = 1200, height = 400, seed?: number) =>
            `https://picsum.photos/${width}/${height}${seed ? `?random=${seed}` : ''}`,

        SALE: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop',
        NEW_ARRIVAL: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
    },
};

export const IMAGE_SIZES = {
    AVATAR: {
        SMALL: 50,
        MEDIUM: 100,
        LARGE: 200,
    },
    PRODUCT: {
        THUMBNAIL: 150,
        MEDIUM: 300,
        LARGE: 600,
    },
    BANNER: {
        MOBILE: { width: 400, height: 200 },
        TABLET: { width: 800, height: 300 },
        DESKTOP: { width: 1200, height: 400 },
    },
};
