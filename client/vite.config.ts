import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        host: true, // Listen trên tất cả network interfaces
        watch: {
            usePolling: true, // Sử dụng polling để detect file changes tốt hơn trên Windows
        },
    },
    build: {
        sourcemap: true, // Tạo sourcemap cho debug
    },
});
