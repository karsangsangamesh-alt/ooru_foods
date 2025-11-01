# Image Migration to Supabase Storage

## Task Overview
Migrate all product images from local `/public/assets/` to dynamic Supabase Storage URLs

## Steps Completed
- [x] Fixed ImageWithFallback.tsx Unsplash URL typo

## Files to Update
- [ ] ProductRecommendations.tsx - Remove local asset references
- [ ] ProductCard.tsx - Update to use dynamic URLs
- [ ] app/cart/page.tsx - Update cart images
- [ ] app/product/[id]/page.tsx - Update product detail images
- [ ] app/components/ProductShowcase.tsx - Update showcase images
- [ ] app/components/HeroSection.tsx - Update hero images
- [ ] Any other components using asset images

## Assets to Remove
- [ ] /public/assets/coconut-chutney.png
- [ ] /public/assets/coriander-chutney.png
- [ ] /public/assets/garlic-chutney.png
- [ ] /public/assets/mint-chutney.png
- [ ] /public/assets/onion-chutney.png
- [ ] /public/assets/pudina-chutney.png
- [ ] /public/assets/red-chili-chutney.png
- [ ] /public/assets/sesame-chutney.png
- [ ] /public/assets/tomato-chutney.png

## Testing Checklist
- [ ] All products load with Supabase images
- [ ] Cart shows correct product images
- [ ] Product detail pages display correctly
- [ ] Hero section images work
- [ ] No console errors for missing images
- [ ] Images load in production build
