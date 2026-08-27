import { useState } from 'react';
import './App.css';

export default function App() {
  const [participantes, setParticipantes] = useState([]);
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');

  const handleAdicionar = (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      setErro('Por favor, informe o nome do participante.');
      return;
    }

    const novoParticipante = {
      id: Date.now(),
      nome: nome.trim(),
    };

    setParticipantes([...participantes, novoParticipante]);
    setNome('');
    setErro('');
  };

  const handleRemover = (id) => {
    setParticipantes(participantes.filter((p) => p.id !== id));
  };

  return (
    <div className="card">
      <h2>Mostra de Tecnologia</h2>
      <h3>Registro de Participantes</h3>

      <form onSubmit={handleAdicionar} className="form-grupo">
        <input
          type="text"
          placeholder="Digite o nome completo"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            if (erro) setErro('');
          }}
        />
        <button type="submit">Cadastrar</button>
      </form>

      {erro && <span className="erro">{erro}</span>}

      <div className="contador">
        Total de presentes: <strong>{participantes.length}</strong>
      </div>

      <ul className="lista">
        {participantes.length === 0 ? (
          <li className="vazio">Nenhum participante registrado.</li>
        ) : (
          participantes.map((item) => (
            <li key={item.id} className="item">
              <span>{item.nome}</span>
              <button 
                onClick={() => handleRemover(item.id)} 
                className="btn-excluir"
              >
                Excluir
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}