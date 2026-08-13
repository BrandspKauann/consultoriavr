import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSite } from './build.mjs';

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(projectDir, 'content');
const scheduledPath = path.join(contentDir, 'scheduled-posts.json');
const publishedPath = path.join(contentDir, 'published-scheduled-posts.json');
const scheduledAssetsDir = path.join(contentDir, 'scheduled-assets', 'blog');
const publishedAssetsDir = path.join(contentDir, 'published-assets', 'blog');

function parseNow() {
  const arg = process.argv.find((item) => item.startsWith('--now='));
  const raw = process.env.PUBLISH_NOW || (arg ? arg.slice('--now='.length) : '');
  const now = raw ? new Date(raw) : new Date();
  if (Number.isNaN(now.getTime())) throw new Error('PUBLISH_NOW or --now must be a valid ISO date.');
  return now;
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return fallback;
    throw error;
  }
}

const now = parseNow();
const scheduled = await readJson(scheduledPath, []);
const published = await readJson(publishedPath, []);
const nextPost = scheduled
  .filter((post) => post.status === 'scheduled' && new Date(post.publishAt) <= now)
  .sort((a, b) => new Date(a.publishAt) - new Date(b.publishAt))[0];

if (!nextPost) {
  console.log('No scheduled posts are due.');
  process.exit(0);
}

const sourceImage = path.join(scheduledAssetsDir, nextPost.image);
const publishedImage = path.join(publishedAssetsDir, nextPost.image);
await fs.access(sourceImage);
await fs.mkdir(publishedAssetsDir, { recursive: true });
await fs.copyFile(sourceImage, publishedImage);

nextPost.status = 'published';
nextPost.publishedAt = now.toISOString();
published.unshift(nextPost);

await fs.writeFile(scheduledPath, `${JSON.stringify(scheduled, null, 2)}\n`, 'utf8');
await fs.writeFile(publishedPath, `${JSON.stringify(published, null, 2)}\n`, 'utf8');
await buildSite();

console.log(`Published scheduled post: ${nextPost.slug}`);
