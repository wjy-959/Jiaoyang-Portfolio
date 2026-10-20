import {defineConfig} from 'vite';
import releasePlugin from './scripts/release-plugin.mjs';

export default defineConfig({
  base:process.env.SITE_BASE||'/',
  plugins:[releasePlugin()],
  server:{
    host:'127.0.0.1',
    port:5173,
    strictPort:true,
    // Bulk image imports on Windows can briefly lock files. Source changes
    // still hot-reload; static image files are read normally on refresh.
    watch:{ignored:['**/public/images/**','**/public/published/**','**/.history/**','**/archive/**','**/preview-*.png','**/*-contact.jpg','**/preview-server*.log']},
  },
});
