import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { join, relative, dirname, extname } from 'node:path';

// Keep the original documentation in docs/ as the single editable source.
// Starlight reads src/content/docs/, so mirror the Markdown before dev/build.
const source = new URL('../docs/', import.meta.url).pathname;
const destination = new URL('../src/content/docs/docs/', import.meta.url).pathname;

async function* markdownFiles(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) yield* markdownFiles(path);
    else if (item.isFile() && ['.md', '.mdx'].includes(extname(path))) yield path;
  }
}

function titleFromMarkdown(markdown, filename) {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1];
  return (heading ?? filename.replace(/[-_]/g, ' '))
    .replace(/[`*_]/g, '').trim();
}

function forStarlight(markdown, filename) {
  // Docusaurus-only metadata is not needed by Starlight.
  let content = markdown.replace(/^sidebar_position:\s*\d+\s*\n/gm, '');
  if (content.startsWith('---\n')) {
    const end = content.indexOf('\n---\n', 4);
    if (end !== -1) {
      const front = content.slice(4, end);
      if (!/^title:/m.test(front)) {
        const title = JSON.stringify(titleFromMarkdown(content.slice(end + 5), filename));
        content = '---\ntitle: ' + title + '\n' + front + '\n---\n' + content.slice(end + 5);
      }
      return content;
    }
  }
  return '---\ntitle: ' + JSON.stringify(titleFromMarkdown(content, filename)) + '\n---\n\n' + content;
}

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
let count = 0;
for await (const file of markdownFiles(source)) {
  const sourcePath = relative(source, file);
  // Keep the older overview accessible, but let docs/index.md be the landing page.
  const targetPath = sourcePath === 'README.md' ? 'original-introduction.md' : sourcePath;
  const target = join(destination, targetPath);
  await mkdir(dirname(target), { recursive: true });
  const content = forStarlight(await readFile(file, 'utf8'), file.split('/').at(-1).replace(/\.mdx?$/, ''));
  await writeFile(target, content);
  count++;
}
console.log('Prepared ' + count + ' Australis documentation pages for Starlight.');
