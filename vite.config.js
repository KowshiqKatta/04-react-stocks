import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [{
    name: 'vite-plugin-tailwind',
    enforce: 'post', // Use 'post' to apply Tailwind after other plugins
    apply: 'build', // Apply Tailwind only during the build process
    transform: async ({ code, id }) => {
      if (!code.startsWith('import') && id.endsWith('.jsx')) {
        return {
          code: code.replace(/<style>(.*?)<\/style>/, ''),
        };
      }
    },
  }, react()], 
})
