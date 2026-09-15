import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

export async function readJSON(filename: string) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export async function writeJSON(filename: string, data: any) {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function saveImage(file: File, folder: string = 'images') {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const publicPath = path.join(process.cwd(), 'public', folder, filename);
  
  await fs.writeFile(publicPath, buffer);
  return `/${folder}/${filename}`;
}

export async function deleteImage(imagePath: string) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    await fs.unlink(fullPath);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}

export async function replaceImage(oldPath: string, file: File) {
  // Delete old image
  await deleteImage(oldPath);
  
  // Save new image
  const folder = path.dirname(oldPath).replace(/^\//, '');
  return saveImage(file, folder);
}
