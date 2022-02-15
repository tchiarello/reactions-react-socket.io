import { useEffect, useState } from 'react';
import './App.css';
import Reactions from './components/Reactions';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/')
      .then((response) => response.json())
      .then((reactions) => {
        setIsLoading(false);
        setReactions(reactions);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">O que você achou desse vídeo?</h1>

      <iframe width="560" height="315" src="https://www.youtube.com/embed/kX3GDj2xp-I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

      {isLoading 
        ? <p>Carregando...</p> 
        : (
          <div>
            {reactions.map(({_id, name, votes}, index) => 
              <Reactions key={index} id={_id} name={name} votes={votes} />
            )}
        </div>)}
    </div>
  );
}

export default App;
