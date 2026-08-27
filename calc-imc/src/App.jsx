import { useState } from 'react';

export default function App() {
  const [nome, setNome] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const classificarIMC = (imc) => {
    if (imc < 18.5) return { texto: 'Abaixo do peso', cor: '#e67e22', percentual: 20 };
    if (imc < 25.0) return { texto: 'Peso Normal', cor: '#2ec4b6', percentual: 50 };
    if (imc < 30.0) return { texto: 'Sobrepeso', cor: '#ff9f1c', percentual: 75 };
    if (imc < 35.0) return { texto: 'Obesidade Grau I', cor: '#e71d36', percentual: 88 };
    if (imc < 40.0) return { texto: 'Obesidade Grau II', cor: '#e71d36', percentual: 95 };
    return { texto: 'Obesidade Grau III', cor: '#e71d36', percentual: 100 };
  };

  const calcularIMC = (e) => {
    e.preventDefault();
    setErro('');

    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    if (!nome.trim()) {
      setErro('Informe o nome do paciente.');
      return;
    }
    if (isNaN(pesoNum) || pesoNum <= 0) {
      setErro('Informe um peso válido.');
      return;
    }
    if (isNaN(alturaNum) || alturaNum <= 0 || alturaNum > 3) {
      setErro('Informe uma altura válida em metros.');
      return;
    }

    const imcVal = pesoNum / (alturaNum * alturaNum);
    const info = classificarIMC(imcVal);

    setResultado({
      nome,
      imc: imcVal.toFixed(2),
      classificacao: info.texto,
      cor: info.cor,
      percentual: info.percentual,
    });
  };

  const limpar = () => {
    setNome('');
    setPeso('');
    setAltura('');
    setResultado(null);
    setErro('');
  };

  return (
    <div style={styles.page}>
      <main style={styles.card}>
        <header style={styles.header}>
          <h1 style={styles.title}>Calculo de Índice de Massa Corporal</h1>
          <p style={styles.subtitle}>Sistema de Cálculo do IMC</p>
        </header>

        <div style={styles.grid}>
          {/* Formulário */}
          <form onSubmit={calcularIMC} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Nome</label>
              <input
                type="text"
                placeholder="Ex: João Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Peso (kg)</label>
              <input
                type="text"
                placeholder="Ex: 80"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Altura (m)</label>
              <input
                type="text"
                placeholder="Ex: 1.80"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                style={styles.input}
              />
            </div>

            {erro && <p style={styles.errorText}>{erro}</p>}

            <div style={styles.btnGroup}>
              <button type="submit" style={styles.btnPrimary}>
                Calcular
              </button>
              <button type="button" onClick={limpar} style={styles.btnSecondary}>
                Limpar
              </button>
            </div>
          </form>

          {/* Painel Lateral / Resultado */}
          <div style={styles.resultPanel}>
            {resultado ? (
              <div style={styles.resultContainer}>
                {/* Gauge Ring */}
                <div style={styles.gaugeWrapper}>
                  <svg viewBox="0 0 100 50" style={styles.svg}>
                    <path
                      d="M 10 50 A 40 40 0 0 1 90 50"
                      fill="none"
                      stroke="#e9ecef"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 10 50 A 40 40 0 0 1 90 50"
                      fill="none"
                      stroke={resultado.cor}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="125.6"
                      strokeDashoffset={125.6 - (125.6 * resultado.percentual) / 100}
                      style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                    />
                  </svg>
                  <div style={styles.gaugeText}>
                    <span style={styles.imcValue}>{resultado.imc}</span>
                    <span style={{ ...styles.imcClass, color: resultado.cor }}>
                      {resultado.classificacao}
                    </span>
                  </div>
                </div>

                {/* Tabela Resumo */}
                <div style={styles.summaryTable}>
                  <div style={styles.tableCol}>
                    <span style={styles.tableHead}>Nome</span>
                    <span style={styles.tableVal}>{resultado.nome}</span>
                  </div>
                  <div style={styles.tableCol}>
                    <span style={styles.tableHead}>IMC</span>
                    <span style={styles.tableVal}>{resultado.imc}</span>
                  </div>
                  <div style={styles.tableCol}>
                    <span style={styles.tableHead}>Classificação</span>
                    <span style={{ ...styles.tableVal, color: resultado.cor, fontWeight: '600' }}>
                      {resultado.classificacao}
                    </span>
                  </div>
                </div>

                {/* Aviso Educativo */}
                <div style={styles.notice}>
                  <span style={{ marginRight: 6 }}>ⓘ</span>
                  <span>
                    Este resultado é apenas para fins educativos e não substitui uma avaliação profissional por um especialista de saúde.
                  </span>
                </div>
              </div>
            ) : (
              <div style={styles.emptyState}>
                <p>Preencha os dados ao lado para visualizar a análise do IMC.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f6f8',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    width: '100%',
    maxWidth: '780px',
    overflow: 'hidden',
    border: '1px solid #eaeaea',
  },
  header: {
    padding: '32px 32px 24px 32px',
    borderBottom: '1px solid #f0f0f0',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    fontWeight: '700',
    color: '#2d3748',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    margin: '6px 0 0 0',
    fontSize: '14px',
    color: '#718096',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    padding: '32px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    textAlign: 'left',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#4a5568',
  },
  input: {
    padding: '12px 14px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    outline: 'none',
    backgroundColor: '#f8fafc',
    color: '#2d3748',
    transition: 'border-color 0.2s',
  },
  errorText: {
    margin: 0,
    fontSize: '13px',
    color: '#e71d36',
  },
  btnGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  btnPrimary: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#437874',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
  },
  btnSecondary: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#edf2f7',
    color: '#4a5568',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
  },
  resultPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafbfc',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #edf2f7',
  },
  emptyState: {
    color: '#a0aec0',
    fontSize: '14px',
    textAlign: 'center',
    padding: '20px',
  },
  resultContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  gaugeWrapper: {
    position: 'relative',
    width: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  svg: {
    width: '100%',
    height: 'auto',
  },
  gaugeText: {
    position: 'absolute',
    bottom: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imcValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a202c',
    lineHeight: '1',
  },
  imcClass: {
    fontSize: '13px',
    fontWeight: '600',
    marginTop: '4px',
  },
  summaryTable: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    boxSizing: 'border-box',
  },
  tableCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  },
  tableHead: {
    fontSize: '11px',
    color: '#a0aec0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tableVal: {
    fontSize: '13px',
    color: '#2d3748',
  },
  notice: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: '#edf2f7',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#4a5568',
    lineHeight: '1.4',
    textAlign: 'left',
  },
};