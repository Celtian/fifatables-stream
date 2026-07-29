import { copyFileSync, readJsonSync, writeFileSync } from 'fs-extra';
import { join } from 'path';

// Modify package.json in dist folder
const rootPath = join(__dirname, '..');
const distPath = join(rootPath, 'dist');

for (const fileName of ['package.json', 'README.md', 'LICENSE']) {
  copyFileSync(join(rootPath, fileName), join(distPath, fileName));
}

const packagePath = join(distPath, 'package.json');
const pkg = readJsonSync(packagePath) as Record<string, unknown>;

pkg.scripts = {};
pkg.devDependencies = {};
pkg.main = 'es5/index.js';
pkg.module = 'es6/index.js';
pkg.sideEffects = false;

writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
console.log('File package.json modified:', pkg);
