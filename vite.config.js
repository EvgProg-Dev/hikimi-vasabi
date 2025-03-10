import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/',
    server: {
        host: "0.0.0.0", // это позволит серверу слушать все IP-адреса
        port: 5173, // порт, если необходимо, можно изменить
    },
});
