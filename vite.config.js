import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Use VITE_BASE env var if set (for GitHub Pages CI), otherwise "./" for local
const base = process.env.VITE_BASE ?? "./";

export default defineConfig({
  base,
  publicDir: "public",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        launcher: resolve(__dirname, "open-app.html"),
        main: resolve(__dirname, "index.html"),
        schedule: resolve(__dirname, "schedule.html"),
        timers: resolve(__dirname, "timers.html"),
        tasks: resolve(__dirname, "tasks.html"),
        history: resolve(__dirname, "history.html"),
        settings: resolve(__dirname, "settings.html"),
        plan: resolve(__dirname, "plan.html"),
        father: resolve(__dirname, "father.html")
      }
    }
  }
});
