import type { OnEndResult, OnLoadArgs, Plugin } from 'esbuild';
import { ESLint } from 'eslint';

export interface PluginOptions extends ESLint.Options {
  /**
   * tells esbuild what files to look at; only matches will be processed
   */
  filter?: RegExp;

  /**
   * controls whether or not to forward an error to esbuild when eslint reports any warnings
   */
  throwOnWarning?: boolean;

  /**
   * controls whether or not to forward an error to esbuild when eslint reports any errors
   */
  throwOnError?: boolean;
}

const PLUGIN_NAME = 'eslint';

export default ({
  filter = /\.(?:jsx?|tsx?|vue|svelte)$/,
  throwOnWarning = false,
  throwOnError = false,
  ...eslintOptions
}: PluginOptions = {}): Plugin => ({
  name: PLUGIN_NAME,
  setup: ({ onLoad, onEnd }) => {
    const eslint = new ESLint(eslintOptions);
    const filesToLint: OnLoadArgs['path'][] = [];

    onLoad({ filter }, ({ path }) => {
      if (!path.includes('node_modules')) {
        filesToLint.push(path);
      }

      return null;
    });

    onEnd(async () => {
      const results = await eslint.lintFiles(filesToLint);
      const formatter = await eslint.loadFormatter('stylish');
      const output = await formatter.format(results);

      const warnings = results.reduce(
        (count, result) => count + result.warningCount,
        0
      );
      const errors = results.reduce(
        (count, result) => count + result.errorCount,
        0
      );

      if (eslintOptions.fix) {
        await ESLint.outputFixes(results);
      }

      if (output.length > 0) {
        console.log(output);
      }

      const result: OnEndResult = {
        warnings: [],
        errors: [],
      };

      if (warnings > 0 && throwOnWarning) {
        result.warnings?.push({
          id: PLUGIN_NAME,
          text: `${warnings} warnings were found by eslint!`,
        });
      }
      if (errors > 0 && throwOnError) {
        result.errors?.push({
          id: PLUGIN_NAME,
          text: `${errors} errors were found by eslint!`,
        });
      }
      return result;
    });
  },
});
