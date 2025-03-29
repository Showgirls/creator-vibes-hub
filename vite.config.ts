
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        // Polyfill for browser compatibility
        buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
        process: 'process/browser',
        stream: 'rollup-plugin-node-polyfills/polyfills/stream',
        util: 'rollup-plugin-node-polyfills/polyfills/util',
      },
    },
    define: {
      // For resolving process in browser
      'process.env': {},
      // For global Buffer
      'global': 'globalThis',
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis'
        }
        // Removed the problematic plugins configuration
      }
    },
    build: {
      rollupOptions: {
        plugins: [
          // Enable rollup polyfills plugin
          // using any to avoid type errors
          rollupNodePolyFill() as any
        ]
      }
    }
  };
});

// Import at the bottom to avoid hoisting issues with the type system
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
