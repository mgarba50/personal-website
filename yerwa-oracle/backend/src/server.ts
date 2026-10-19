import http from 'http';
import { Server } from 'socket.io';
import { bootstrap } from './app.js';
import { env } from './config/env.js';
import { fetchNodeTelemetry } from './services/telemetry.service.js';

bootstrap().then((app) => {
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', async (socket) => {
    socket.emit('telemetry', await fetchNodeTelemetry());
  });

  setInterval(async () => {
    io.emit('telemetry', await fetchNodeTelemetry());
  }, 10000);

  server.listen(env.port, () => {
    console.log(`Yerwa Oracle backend+ws running on :${env.port}`);
  });
});
