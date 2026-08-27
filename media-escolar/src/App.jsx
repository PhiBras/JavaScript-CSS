import { useState } from 'react';
import './App.css';

export default function App() {
  const [nome, setNome] = useState('');
  const [notas, setNotas] = useState({ n1: '', n2: '', n3: '', n4: '' });
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const handleChangeNota = (campo, valor) => {
    setNotas({ ...notas, [campo]: valor });
    if (erro) setErro('');
  };

  const handleCalcular = (e) => {
    e.preventDefault();

    const { n1, n2, n3, n4 } = notas;
    const listaNotas = [parseFloat(n1), parseFloat(n2), parseFloat(n3), parseFloat(n4)];

    if (!nome.trim()) {
      setErro('Informe o nome do estudante.');
      return;
    }

    if (listaNotas.some((n) => isNaN(n) || n < 0 || n > 10)) {
      setErro('Preencha as 4 notas com valores entre 0 e 10.');
      return;
    }

    const soma = listaNotas.reduce((acc, curr) => acc + curr, 0);
    const media = soma / 4;

    let status = '';
    let classeCss = '';

    if (media >= 7) {
      status = 'Aprovado(a)';
      classeCss = 'aprovado';
    } else if (media >= 5) {
      status = 'Em Recuperação';
      classeCss = 'recuperacao';
    } else {
      status = 'Reprovado(a)';
      classeCss = 'reprovado';
    }

    setResultado({
      nome: nome.trim(),
      media: media.toFixed(1),
      status,
      classeCss,
    });
    setErro('');
  };

  const handleLimpar = () => {
    setNome('');
    setNotas({ n1: '', n2: '', n3: '', n4: '' });
    setResultado(null);
    setErro('');
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>Média Escolar</h1>
        <form onSubmit={handleCalcular}>
          <div className="campo campo-linha">
            <label>Estudante</label>
            <input
              type="text"
              placeholder="Digite o nome completo"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                if (erro) setErro('');
              }}
            />
          </div>

          <div className="grid-notas">
            {['n1', 'n2', 'n3', 'n4'].map((nota, index) => (
              <div key={nota} className="campo campo-linha nota-input">
                <label>Nota {index + 1}</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  placeholder="0.0"
                  value={notas[nota]}
                  onChange={(e) => handleChangeNota(nota, e.target.value)}
                />
              </div>
            ))}
          </div>

          {erro && <p className="erro">{erro}</p>}

          <div className="acoes">
            <button type="submit" className="btn-calcular">Calcular Média</button>
            <button type="button" onClick={handleLimpar} className="btn-limpar">Limpar</button>
          </div>
        </form>

        {resultado && (
          <div className={`resultado ${resultado.classeCss}`}>
            <p className="res-nome">{resultado.nome}</p>
            <div className="res-info">
              <span className="res-media">
                Média: <strong>{resultado.media}</strong>
              </span>
              <span className="res-status">
                Situação: <strong>{resultado.status}</strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}