import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "./",
  publicDir: "public",
  build: {
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
