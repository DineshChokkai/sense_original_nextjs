import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateOGImage() {
  try {
    const width = 1200;
    const height = 630;
    
    // Gray background color: #6B7280
    const svgImage = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <!-- Gray background -->
        <rect width="${width}" height="${height}" fill="#6B7280"/>
        
        <!-- Logo placeholder circle with white border -->
        <circle cx="${width/2}" cy="140" r="80" fill="white" stroke="#E5E7EB" stroke-width="3"/>
        
        <!-- Main title -->
        <text x="${width/2}" y="270" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">
          SenseOriginal
        </text>
        
        <!-- Subtitle -->
        <text x="${width/2}" y="360" font-family="Arial, sans-serif" font-size="36" fill="#E5E7EB" text-anchor="middle">
          Counterfeit Protection &amp;
        </text>
        <text x="${width/2}" y="410" font-family="Arial, sans-serif" font-size="36" fill="#E5E7EB" text-anchor="middle">
          Product Authentication
        </text>
        
        <!-- Description -->
        <text x="${width/2}" y="520" font-family="Arial, sans-serif" font-size="26" fill="#D1D5DB" text-anchor="middle">
          Advanced NFC-based authentication technology
        </text>
      </svg>
    `;
    
    const outputPath = path.join(__dirname, '..', 'public', 'opengraph-image.png');
    
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // First create the SVG as PNG
    let image = await sharp(Buffer.from(svgImage))
      .png();
    
    // Try to overlay the brandlogo if it exists
    const logoPath = path.join(__dirname, '..', 'public', 'images', 'brandlogo.png');
    
    try {
      if (fs.existsSync(logoPath)) {
        // Get logo dimensions and resize it for the OG image
        const logoBuffer = await sharp(logoPath)
          .resize(140, 140, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          })
          .toBuffer();
        
        // Composite the logo on top of the background
        image = await image.composite([
          {
            input: logoBuffer,
            top: 70,
            left: (width - 140) / 2
          }
        ]);
      }
    } catch (logoErr) {
      console.warn('⚠ Logo not found or could not be overlaid, continuing with text logo');
    }
    
    await image.toFile(outputPath);
    
    console.log(`✓ OG Image created successfully at: ${outputPath}`);
  } catch (err) {
    console.error('⚠ Warning: Could not generate OG image:', err.message);
    console.error('This is optional and the build will continue.');
    // Don't exit with error - allow build to continue
    process.exit(0);
  }
}

generateOGImage().catch(err => {
  console.error('⚠ Error generating OG image:', err);
  // Exit gracefully without failing the build
  process.exit(0);
});
