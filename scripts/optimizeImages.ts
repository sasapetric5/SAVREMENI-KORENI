import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

async function optimizeImages() {
  const uploadDir = path.join(process.cwd(), 'public/custom_products');
  const backupDir = path.join(uploadDir, 'backup');
  
  try {
    await fs.mkdir(backupDir, { recursive: true });
    
    const files = await fs.readdir(uploadDir);
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        const filePath = path.join(uploadDir, file);
        const webpPath = filePath.replace(/\.[^/.]+$/, ".webp");
        
        console.log(`Optimizing: ${file} -> ${path.basename(webpPath)}`);
        
        await sharp(filePath)
          .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(webpPath);
        
        await fs.rename(filePath, path.join(backupDir, file));
        console.log(`Moved original to backup: ${file}`);
      }
    }
    console.log("Optimization complete!");
  } catch (err) {
    console.error("Error optimizing images:", err);
  }
}

optimizeImages();
