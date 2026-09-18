import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  // GitHub Pages serves this project from /Deploy/ instead of the domain root.
  base: "/Deploy/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "study-timer-mascot.png",
        "ระหว่างเวลาเดิน.mp3",
        "เวลาหมด.mp3",
      ],
      manifest: {
        name: "IG342 Route Hub - Study Timer",
        short_name: "Route Hub",
        description: "รวม My Task และ Study Timer สำหรับวิชา IG342",
        theme_color: "#ef4444",
        background_color: "#08090c",
        display: "standalone",
        start_url: ".",
        scope: ".",
        lang: "th",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,mp3}"],
      },
    }),
  ],
});
