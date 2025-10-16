# Default Images Guidelines

## Recommended Sources for Default Images

### 1. **UI Avatars** - For User Avatars
- **URL**: https://ui-avatars.com/
- **Usage**: Automatically generates avatar from user's name/initials
- **License**: Free to use
- **Example**: `https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff&size=200`

### 2. **Unsplash** - For High-Quality Product Images
- **URL**: https://unsplash.com/
- **License**: Free for commercial use (Unsplash License)
- **Categories Available**:
  - Electronics: Photo by Luca Bravo
  - Clothing: Photo by Becca McHaffie  
  - Books: Photo by Alfons Morales
  - Sports: Photo by Wesley Tingey
  - Food: Photo by Brooke Lark

### 3. **Lorem Picsum** - For Random Placeholders
- **URL**: https://picsum.photos/
- **Usage**: Random beautiful images in any size
- **License**: Free to use
- **Example**: `https://picsum.photos/300/300?random=1`

### 4. **Heroicons/Lucide** - For UI Icons
- **Heroicons**: https://heroicons.com/
- **Lucide**: https://lucide.dev/
- **License**: MIT License
- **Format**: SVG

## Usage in Project

### Server Side
```typescript
import { ImageService } from '../shared/services/image.service';

// Generate avatar
const avatarUrl = ImageService.generateAvatarUrl('John Doe', 'male', 'MEDIUM');

// Generate product placeholder
const productImage = ImageService.generateProductPlaceholder('electronics', 'LARGE');
```

### Frontend Usage
```tsx
// Fallback for broken images
const defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=6B7280&color=fff&size=200';

// Use in img tag with fallback
function UserAvatar({ user }) {
  return (
    <img 
      src={user.avatarUrl} 
      onError={(e) => {
        e.currentTarget.src = defaultAvatar;
      }}
      alt="User Avatar"
    />
  );
}
```

## Best Practices

1. **Always provide fallbacks** for user-uploaded images
2. **Use consistent sizes** across the application
3. **Cache frequently used images** locally during production
4. **Respect attribution** when using Unsplash images (optional but recommended)
5. **Use appropriate categories** for product placeholders

## Local Caching Strategy

For production, consider downloading frequently used default images to:
- `server/src/assets/images/defaults/avatars/`
- `server/src/assets/images/defaults/products/`

This reduces external dependencies and improves load times.
