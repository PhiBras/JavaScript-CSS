import { useState } from 'react';
import './App.css';

export default function App() {
  const [largura, setLargura] = useState('');
  const [comprimento, setComprimento] = useState('');
  const [area, setArea] = useState(null);
  const [erro, setErro] = useState('');

  const handleCalcular = (e) => {
    e.preventDefault();

    const numLargura = parseFloat(largura);
    const numComprimento = parseFloat(comprimento);

    if (isNaN(numLargura) || isNaN(numComprimento) || numLargura <= 0 || numComprimento <= 0) {
      setErro('Informe valores válidos e maiores que zero.');
      setArea(null);
      return;
    }

    const resultadoArea = numLargura * numComprimento;
    setArea(resultadoArea.toFixed(2));
    setErro('');
  };

  const handleLimpar = () => {
    setLargura('');
    setComprimento('');
    setArea(null);
    setErro('');
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>Cálculo de Área</h1>
        <p className="subtitulo">Calculadora de metros quadrados para orçamentos</p>

        <form onSubmit={handleCalcular}>
          <div className="campo campo-linha">
            <label>Largura (metros)</label>
            <input
              type="number"
              step="0.01"
              placeholder="Ex: 4.5"
              value={largura}
              onChange={(e) => {
                setLargura(e.target.value);
                if (erro) setErro('');
              }}
            />
          </div>

          <div className="campo campo-linha">
            <label>Comprimento (metros)</label>
            <input
              type="number"
              step="0.01"
              placeholder="Ex: 6.0"
              value={comprimento}
              onChange={(e) => {
                setComprimento(e.target.value);
                if (erro) setErro('');
              }}
            />
          </div>

          {erro && <p className="erro">{erro}</p>}

          <div className="acoes">
            <button type="submit" className="btn-calcular">Calcular Área</button>
            <button type="button" onClick={handleLimpar} className="btn-limpar">Limpar</button>
          </div>
        </form>

        {area && (
          <div className="resultado">
            <span className="res-rotulo">Área Total do Ambiente</span>
            <span className="res-valor">{area} <strong>m²</strong></span>
          </div>
        )}
      </div>
    </div>
  );
}