import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
    host: "localhost",
    port: 3000,
    hmr: {
      overlay: false, // Desabilita overlay de erros que pode causar problemas com CSP
    },
    // Headers para desenvolvimento - permite eval necessário para HMR
    // Em produção, nenhum header CSP é adicionado (deve ser configurado no servidor)
    headers: {
      "Content-Security-Policy": mode === "development" 
        ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
        : undefined,
    },
  },
  build: {
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
    mode === "development" && componentTagger(),
    mode === "development" && disableCSPPlugin(),
  ].filter(Boolean),
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
