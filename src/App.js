import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";
function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    const title = `Repositorio-${Date.now()}`;

    api
      .post("/repositories", {
        title,
        url: `https://github.com/caiodeambrosio/${title}`,
        techs: ["React JS"],
      })
      .then(({ data }) => {
        setRepositories([...repositories, data]);
      });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(({ data }) => {
      const index = repositories.findIndex(
        (repository) => repository.id === id
      );

      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
