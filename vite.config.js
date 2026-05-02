import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  // Set to your GitHub repo name so all asset paths work on GitHub Pages
  // URL will be: https://ved-mangukiya.github.io/Goal/
  base: "/Goal/",
  publicDir: "public",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
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
