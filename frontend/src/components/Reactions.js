import React, { useEffect, useState } from 'react';
import socket from '../utils/socketClient';

function Reactions({ id, name, votes }) {
  const [currentVotes, setCurrentVotes] = useState(votes);

  useEffect(() => {
    socket.on('refreshCurrentVotes', (reaction) => {
      if (reaction._id === id) setCurrentVotes(reaction.votes);
    })
  }, []);

  const handleClick = () => {
    socket.emit('increaseVotes', { id, name } );
  }

  return (
    <div>
      <p>{name}</p>
      <p>Votes: {currentVotes}</p> 
      <button type="button" onClick={handleClick}>Votar</button>
    </div>
  );
}

export default Reactions;