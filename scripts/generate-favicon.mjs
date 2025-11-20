import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFavicon() {
  const size = 256;
  
  // Create an SVG favicon with gray background and white "S" for SenseOriginal
  const svgImage = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="${size}" height="${size}" fill="#6B7280" rx="20"/>
      
      <!-- White letter S -->
      <text x="${size/2}" y="${size/1.5}" font-family="Arial, sans-serif" font-size="140" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
        S
      </text>
    </svg>
  `;
  
  const outputDir = path.join(__dirname, '..', 'public');
  
  // Generate favicon.ico (32x32)
  await sharp(Buffer.from(svgImage))
    .resize(32, 32)
    .png()
    .toFile(path.join(outputDir, 'favicon.png'));
  
  // Generate apple-touch-icon
  await sharp(Buffer.from(svgImage))
    .resize(180, 180)
    .png()
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));
  
  // Generate larger favicon for browser tab
  await sharp(Buffer.from(svgImage))
    .resize(192, 192)
    .png()
    .toFile(path.join(outputDir, 'favicon-192x192.png'));
  
  console.log('✓ Favicon generated successfully!');
  console.log('  - favicon.png (32x32)');
  console.log('  - apple-touch-icon.png (180x180)');
  console.log('  - favicon-192x192.png (192x192)');
}

generateFavicon().catch(err => {
  console.error('Error generating favicon:', err);
  process.exit(1);
});
