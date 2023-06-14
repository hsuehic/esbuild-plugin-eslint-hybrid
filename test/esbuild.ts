import * as esbuild from 'esbuild';

import eslint from '../src/index';

const absolute = (relative: string) =>
  new URL(relative, import.meta.url).pathname;

await esbuild.build({
  entryPoints: [absolute('cases')],
  plugins: [
    eslint({
      throwOnError: false,
      throwOnWarning: false,
    }),
  ],
  bundle: true,
  write: false,
});
