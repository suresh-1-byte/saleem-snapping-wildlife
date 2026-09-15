// Simple placeholder image generator
const fs = require('fs');
const path = require('path');

// Create a simple SVG placeholder
function createSVGPlaceholder(width, height, text) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <rect width="100%" height="100%" fill="#2B2B2B"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>`;
}

const images = [
    { name: 'hero.jpg', width: 2560, height: 1440, text: 'HERO IMAGE' },
    { name: 'featured-1.jpg', width: 1920, height: 1080, text: 'Featured 1' },
    { name: 'featured-2.jpg', width: 1200, height: 1600, text: 'Featured 2' },
    { name: 'featured-3.jpg', width: 1600, height: 1200, text: 'Featured 3' },
    { name: 'featured-4.jpg', width: 1200, height: 1600, text: 'Featured 4' },
    { name: 'featured-5.jpg', width: 1920, height: 1080, text: 'Featured 5' },
    { name: 'featured-6.jpg', width: 1920, height: 1080, text: 'Featured 6' },
    { name: 'portfolio-1.jpg', width: 1920, height: 1440, text: 'Portfolio 1' },
    { name: 'portfolio-2.jpg', width: 1920, height: 1440, text: 'Portfolio 2' },
    { name: 'portfolio-3.jpg', width: 1920, height: 1440, text: 'Portfolio 3' },
    { name: 'portfolio-4.jpg', width: 1920, height: 1440, text: 'Portfolio 4' },
    { name: 'portfolio-5.jpg', width: 1920, height: 1440, text: 'Portfolio 5' },
    { name: 'portfolio-6.jpg', width: 1920, height: 1440, text: 'Portfolio 6' },
    { name: 'about-portrait.jpg', width: 1200, height: 1600, text: 'About Portrait' },
    { name: 'contact-bg.jpg', width: 2560, height: 1440, text: 'Contact Background' },
    { name: 'story-hero.jpg', width: 2560, height: 1280, text: 'Story Hero' },
    { name: 'story-support-1.jpg', width: 1200, height: 1500, text: 'Support 1' },
    { name: 'story-support-2.jpg', width: 1200, height: 1500, text: 'Support 2' },
    { name: 'closing-cta.jpg', width: 2560, height: 1440, text: 'Closing CTA' },
    { name: 'species-birds.jpg', width: 800, height: 800, text: 'Birds' },
    { name: 'species-mammals.jpg', width: 800, height: 800, text: 'Mammals' },
    { name: 'species-macro.jpg', width: 800, height: 800, text: 'Macro' },
    { name: 'species-landscapes.jpg', width: 800, height: 800, text: 'Landscapes' },
    { name: 'species-moments.jpg', width: 800, height: 800, text: 'Moments' },
    { name: 'story-vedanthangal.jpg', width: 1920, height: 1200, text: 'Vedanthangal' },
    { name: 'story-pulicat.jpg', width: 1920, height: 1200, text: 'Pulicat' },
    { name: 'story-bandipur.jpg', width: 1920, height: 1200, text: 'Bandipur' },
    { name: 'story-mudumalai.jpg', width: 1920, height: 1200, text: 'Mudumalai' },
    { name: 'story-nilgiris.jpg', width: 1920, height: 1200, text: 'Nilgiris' },
    { name: 'species-painted-stork-1.jpg', width: 1200, height: 1500, text: 'Painted Stork' },
    { name: 'species-painted-stork-2.jpg', width: 1200, height: 1500, text: 'Stork 2' },
    { name: 'species-elephant-1.jpg', width: 1200, height: 1500, text: 'Elephant' },
    { name: 'species-elephant-2.jpg', width: 1200, height: 1500, text: 'Elephant 2' },
    { name: 'species-kingfisher-1.jpg', width: 1200, height: 1500, text: 'Kingfisher' },
    { name: 'species-kingfisher-2.jpg', width: 1200, height: 1500, text: 'Kingfisher 2' }
];

const imagesDir = path.join(__dirname, 'public', 'images');

// Ensure directory exists
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate SVG placeholders
images.forEach(img => {
    const svg = createSVGPlaceholder(img.width, img.height, img.text);
    const filePath = path.join(imagesDir, img.name);
    fs.writeFileSync(filePath, svg);
    console.log(`Created: ${img.name}`);
});

console.log('\n✓ All placeholder images created successfully!');
console.log('Note: These are SVG files with .jpg extension. Next.js will serve them correctly.');
console.log('Replace them with your actual wildlife photographs when ready.');
