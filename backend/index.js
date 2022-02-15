const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const ReactionsModels = require('./models/reactionsModels');

app.use(bodyParser.json());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'], 
  }});

app.use(cors());

app.get('/', async (_req, res) => {
  const reactions = await ReactionsModels.getAll();

  return res.status(200).json(reactions);
});

require('./sockets/reactions')(io);

const PORT = 3001;
http.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));