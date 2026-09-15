import path from 'path';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const imageStubPlugin: esbuild.Plugin = {
  name: 'image-stub',
  setup(build) {
    build.onResolve({ filter: /\.(jpg|jpeg|png|webp|svg)$/ }, (args) => {
      return { path: args.path, namespace: 'image-stub' };
    });
    build.onLoad({ filter: /.*/, namespace: 'image-stub' }, () => {
      return { contents: 'export default "";', loader: 'js' };
    });
  },
};

async function buildServer() {
  console.log('🔄 Building server with esbuild and image stub plugin...');
  await esbuild.build({
    entryPoints: [path.join(rootDir, 'server.ts')],
    outfile: path.join(rootDir, 'dist', 'server.cjs'),
    bundle: true,
    platform: 'node',
    format: 'cjs',
    packages: 'external',
    sourcemap: true,
    plugins: [imageStubPlugin],
  });
  console.log('✅ Server built successfully at dist/server.cjs');
}

buildServer().catch((err) => {
  console.error('❌ Server build failed:', err);
  process.exit(1);
});
