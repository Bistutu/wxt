import type * as vite from 'vite';

/**
 * Apply the experimental config for disabling the polyfill. It works by aliasing the
 * `webextension-polyfill` module to a virtual module and exporting the `chrome` global from the
 * virtual module.
 */
export function excludeBrowserPolyfill(): vite.Plugin {
  const virtualId = 'virtual:wxt-webextension-polyfill-disabled';

  return {
    name: 'wxt:exclude-browser-polyfill',
    config() {
      return {
        resolve: {
          alias: {
            'webextension-polyfill': virtualId,
          },
        },
      };
    },
    load(id) {
      if (id === virtualId) {
        // Use chrome instead of the polyfill when disabled.
        return 'export default chrome';
      }
    },
  };
}
