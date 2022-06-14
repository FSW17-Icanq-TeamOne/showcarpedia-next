const http = require("http");
const app = require("./index");
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

// server.listen(PORT, () => console.log(`listening on ${PORT}`));
server.listen(PORT, () => { console.log(`Listening on port http://localhost:${PORT}`)}) 
