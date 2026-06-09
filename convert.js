import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const DIRS = ['faculty', 'practical-apps', 'testimonials', 'assets', 'public/faculty', 'public/practical-apps', 'public/testimonials', 'public/assets', '.'];

async function processImages() {
  for (const dir of DIRS) {
    try {
      const fullPath = path.resolve(dir);
      const files = await fs.readdir(fullPath);
      
      for (const file of files) {
        if (!file.match(/\.(png|jpg|jpeg)$/i)) continue;
        if (dir === '.' && file === 'mundogeo-2024.jpg') continue; // keep hero background maybe? Actually we should convert it too
        
        const filePath = path.join(fullPath, file);
        const stats = await fs.stat(filePath);
        if (!stats.isFile()) continue;

        const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        
        console.log(`Converting ${filePath}...`);
        await sharp(filePath)
          .webp({ quality: 80, effort: 6 })
          .toFile(webpPath);
          
        console.log(`Deleted original ${filePath}`);
        await fs.unlink(filePath);
      }
    } catch (e) {
      if (e.code !== 'ENOENT') {
        console.error(`Error in ${dir}:`, e);
      }
    }
  }
}

processImages().then(() => console.log('Done!'));
