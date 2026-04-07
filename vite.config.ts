import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Em builds na Vercel, expõe o SHA no HTML (View Source → meta name="x-vercel-deployment") para conferir se o deploy bate com o Git.
const injectVercelDeploymentMeta = (): Plugin => ({
  name: "inject-vercel-deployment-meta",
  transformIndexHtml(html) {
    const sha = process.env.VERCEL_GIT_COMMIT_SHA;
    if (!sha) return html;
    return html.replace(
      "</head>",
      `<meta name="x-vercel-deployment" content="${sha.slice(0, 7)}" />\n  </head>`
    );
  },
});

// Plugin para desabilitar CSP em desenvolvimento
const disableCSPPlugin = (): Plugin => {
  return {
    name: "disable-csp",
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        // Remove qualquer header CSP em desenvolvimento
        if (typeof res.removeHeader === "function") {
          res.removeHeader("Content-Security-Policy");
          res.removeHeader("X-Content-Security-Policy");
          res.removeHeader("X-WebKit-CSP");
        }
        next();
      });
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 5174,
    strictPort: true,
    open: true,
    hmr: {
      overlay: true,
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    // Garante que sourcemaps não usem eval em produção
    sourcemap: mode === "development" ? "inline" : false,
    // Minificação sem eval
    minify: "esbuild",
    rollupOptions: {
      output: {
        // Evita eval em chunks
        format: "es",
      },
    },
  },
  plugins: [
    react(),
    injectVercelDeploymentMeta(),
    ...(mode === "development"
      ? [
          // lovable-tagger removido para evitar problemas no build do Vercel
          // Se necessário, pode ser adicionado manualmente apenas em desenvolvimento local
          disableCSPPlugin(),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    legalComments: "none",
    // Garante que esbuild não use eval
    format: "esm",
  },
}));
