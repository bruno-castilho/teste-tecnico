import type { NextConfig } from "next";

/**
 * Backend Django. O browser fala sempre same-origin com o servidor Next e as
 * chamadas a `/api/*` são reescritas para o backend, evitando CORS sem precisar
 * alterar o Django. Configurável via `BACKEND_URL`.
 */
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
