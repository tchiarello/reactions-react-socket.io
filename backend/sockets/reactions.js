const ReactionsModels = require('../models/reactionsModels');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('increaseVotes', async ({ id }) => {
    console.log(`Cliente votou na reação de id ${id}`);
    await ReactionsModels.increaseVotes(id);
    const reaction = await ReactionsModels.getById(id);

    io.emit('refreshCurrentVotes', reaction);
  })
});