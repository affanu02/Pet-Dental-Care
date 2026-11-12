import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/Pet-Dental-Care/",
  plugins: [
    tsconfigPaths(),
    tanstackStart({
      server: { entry: "server" },
      prerender: { enabled: true },
    }),
    react(),
    tailwindcss(),
  ],
});
