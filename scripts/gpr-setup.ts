import { readJsonSync, writeFileSync } from 'fs-extra';
import { join } from 'path';

// Modify package.json in dist folder
const packagePath = join(__dirname, '..', 'dist', 'package.json');
const pkg = readJsonSync(packagePath) as Record<string, unknown>;

pkg.publishConfig = {
  registry: 'https://npm.pkg.github.com'
};
pkg.name = '@celtian/fifatables-stream';

writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
console.log('File package.json modified:', pkg);
