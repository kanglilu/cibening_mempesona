import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "src", "assets", "images");
const outputDir = path.join(rootDir, "public", "assets", "content", "images");

const QUALITY = 82;
const MAX_WIDTH = 1600;

await mkdir(outputDir, { recursive: true });

const files = await readdir(sourceDir);
const imageFiles = files.filter((file) => /\.(jpe?g|png)$/i.test(file));

for (const file of imageFiles) {
  const sourcePath = path.join(sourceDir, file);
  const parsed = path.parse(file);
  const outputPath = path.join(outputDir, `${parsed.name}.webp`);

  await sharp(sourcePath)
    .rotate()
    .resize({
      width: MAX_WIDTH,
      withoutEnlargement: true
    })
    .webp({ quality: QUALITY })
    .toFile(outputPath);

  const sourceSize = (await stat(sourcePath)).size;
  const outputSize = (await stat(outputPath)).size;
  const saved = Math.max(0, 1 - outputSize / sourceSize);

  console.log(
    `${file} -> public/assets/content/images/${parsed.name}.webp ` +
      `(${Math.round(sourceSize / 1024)} KB -> ${Math.round(outputSize / 1024)} KB, ` +
      `${Math.round(saved * 100)}% smaller)`
  );
}
