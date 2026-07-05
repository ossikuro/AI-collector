import react from '@vitejs/plugin-react';
import { createServer } from 'vite';

export async function createViteTestServer() {
  const server = await createServer({
    configFile: false,
    plugins: [react()],
    server: {
      host: '127.0.0.1',
      port: 0,
    },
  });

  await server.listen(0);

  const address = server.httpServer.address();
  const port = typeof address === 'object' && address ? address.port : 5173;

  return {
    server,
    baseUrl: `http://127.0.0.1:${port}`,
  };
}
