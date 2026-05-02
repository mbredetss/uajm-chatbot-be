import server from './server/index.js';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});