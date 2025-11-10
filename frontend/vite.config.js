import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GH Pages under /multichannel-sprint0/
export default defineConfig({
  base: "/multichannel-sprint0/",
  plugins: [react()],
});
