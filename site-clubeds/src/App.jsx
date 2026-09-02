import { useEffect, useRef, useState } from 'react';
import './App.css';

const LOGO_URL = 'https://clubeds.vercel.app/img/logo2.png';

const NAV = [
  { id: 'topo', km: '0.0', label: 'Início' },
  { id: 'funciona', km: '0.6', label: 'Como funciona' },
  { id: 'ambiente', km: '1.2', label: 'Ambiente' },
  { id: 't1', km: '1.8', label: 'Fundamentos' },
  { id: 't2', km: '2.4', label: 'Web + Portfólio' },
  { id: 't3', km: '3.0', label: 'Projetos e equipe' },
  { id: 'encontros', km: '3.6', label: 'Encontros' },
  { id: 'coordenacao', km: '4.2', label: 'Coordenação' },
  { id: 'regras', km: '4.8', label: 'Regras' },
  { id: 'faq', km: '5.4', label: 'FAQ' },
  { id: 'chegada', km: '6.4', label: 'Chegada' },
];

const CHECKPOINTS = [
  {
    id: 'funciona', km: '0.6', side: 'left', tag: 'parada 01',
    title: 'Como o clube funciona',
    body: (
      <>
        <p className="desc">Organização simples, rotina consistente, foco no desenvolvimento do aluno.</p>
        <ul className="plain">
          <li>Trilhas por desafios progressivos — fundamentos, web, backend, dados e projetos integradores</li>
          <li>Aprendizagem na prática, com revisão de código e pair programming</li>
          <li>Cada ciclo termina em entrega publicada: página, API, dashboard ou automação</li>
        </ul>
      </>
    ),
  },
  {
    id: 'ambiente', km: '1.2', side: 'right', tag: 'parada 02',
    title: 'Ambiente e entregas',
    body: (
      <>
        <p className="desc">Criado para fortalecer o aprendizado do curso técnico por meio de projetos e cultura de colaboração.</p>
        <ul className="plain">
          <li>Rotina de prática com entregas</li>
          <li>Comunidade e apoio entre alunos</li>
          <li>Visão de mercado e carreira</li>
          <li>Código limpo e organização</li>
        </ul>
        <div className="tags-row">
          <span className="pill">repositório organizado</span>
          <span className="pill">deploy no Vercel</span>
          <span className="pill">README + evidências</span>
          <span className="pill">pitch final</span>
        </div>
      </>
    ),
  },
  {
    id: 't1', km: '1.8', side: 'left', tag: 'trilha 01 de 03',
    title: 'Fundamentos',
    body: (
      <>
        <p className="desc">Lógica, estrutura, organização e rotina de estudo.</p>
        <div className="tags-row">
          <span className="pill">VS Code</span>
          <span className="pill">HTML semântico</span>
          <span className="pill">CSS base</span>
          <span className="pill">JS básico</span>
        </div>
      </>
    ),
  },
  {
    id: 't2', km: '2.4', side: 'right', tag: 'trilha 02 de 03',
    title: 'Web + Portfólio',
    body: (
      <>
        <p className="desc">Páginas reais, responsivas e prontas para publicar.</p>
        <div className="tags-row">
          <span className="pill">Layout responsivo</span>
          <span className="pill">Formulários</span>
          <span className="pill">Acessibilidade</span>
          <span className="pill">Deploy Vercel</span>
        </div>
      </>
    ),
  },
  {
    id: 't3', km: '3.0', side: 'left', tag: 'trilha 03 de 03',
    title: 'Projetos e equipe',
    body: (
      <>
        <p className="desc">Trabalho em grupo com as práticas do mercado.</p>
        <div className="tags-row">
          <span className="pill">Git flow</span>
          <span className="pill">Issues e PRs</span>
          <span className="pill">Revisão de código</span>
          <span className="pill">Apresentação final</span>
        </div>
      </>
    ),
  },
  { id: 'encontros', km: '3.6', side: 'right', tag: 'parada 03', title: 'Próximos encontros', body: null },
  {
    id: 'coordenacao', km: '4.2', side: 'left', tag: 'parada 04',
    title: 'Coordenação',
    body: (
      <>
        <p className="desc">Referências do clube e organização interna.</p>
        <div className="people">
          <div className="person">
            <img src="https://clubeds.vercel.app/img/celso2.jpg" alt="Celso Barreto" loading="lazy" />
            <div>
              <div className="who">Celso Barreto</div>
              <div className="role">Docente · Presidência</div>
            </div>
          </div>
          <div className="person">
            <img src="https://clubeds.vercel.app/img/anildo.jpeg" alt="Anildo Mattos" loading="lazy" />
            <div>
              <div className="who">Anildo Mattos</div>
              <div className="role">Docente · Presidência</div>
            </div>
          </div>
          <div className="person">
            <img src="https://placehold.co/44x44/141210/FF6A1A?text=DS" alt="Diretoria" loading="lazy" />
            <div>
              <div className="who">Diretoria (alunos)</div>
              <div className="role">Eleição a cada 12 meses</div>
            </div>
          </div>
        </div>
        <div className="postcards">
          <div className="postcard">oficina</div>
          <div className="postcard">palestra</div>
          <div className="postcard">projeto</div>
        </div>
      </>
    ),
  },
  {
    id: 'regras', km: '4.8', side: 'right', tag: 'parada 05',
    title: 'Regras de participação',
    body: (
      <>
        <p className="desc">Transparência e organização para o clube rodar bem durante o ano.</p>
        <ul className="plain">
          <li><strong style={{ color: 'var(--ink)' }}>Matrícula ativa</strong> — acesso completo exige matrícula ativa</li>
          <li><strong style={{ color: 'var(--ink)' }}>Diretoria</strong> — eleições a cada 12 meses, só alunos matriculados</li>
          <li><strong style={{ color: 'var(--ink)' }}>Presidência</strong> — ocupada pelos docentes Celso e Anildo</li>
          <li><strong style={{ color: 'var(--ink)' }}>Conduta</strong> — respeito, colaboração e compromisso com entregas</li>
        </ul>
      </>
    ),
  },
  {
    id: 'faq', km: '5.4', side: 'left', tag: 'parada 06',
    title: 'Perguntas frequentes',
    body: (
      <>
        <details className="faq-item" open>
          <summary>Preciso estar matriculado?<span className="icon">＋</span></summary>
          <p className="a">Para acesso completo, sim. Dá para acompanhar comunicados sem matrícula, mas a participação integral exige matrícula ativa.</p>
        </details>
        <details className="faq-item">
          <summary>Como funcionam as eleições?<span className="icon">＋</span></summary>
          <p className="a">A cada 12 meses, só para alunos matriculados.</p>
        </details>
        <details className="faq-item">
          <summary>Vou aprender do zero?<span className="icon">＋</span></summary>
          <p className="a">Sim. As trilhas começam do básico e evoluem por projetos.</p>
        </details>
        <details className="faq-item">
          <summary>O que eu ganho no final?<span className="icon">＋</span></summary>
          <p className="a">Portfólio publicado, repositórios organizados e vivência de mercado.</p>
        </details>
      </>
    ),
  },
];

const TERMINAL_LINES = [
  { text: '$ clubeds --join', cls: 'prompt' },
  { text: '> matrícula ativa: ok', cls: 'ok' },
  { text: '> trilha: fundamentos → web → projetos', cls: '' },
  { text: '> deploy: vercel ✓', cls: 'ok' },
];

function Logo({ className = 'logo' }) {
  return (
    <span className={className}>
      <img src={LOGO_URL} alt="Logo ClubeDS" className="logo-img" />
      ClubeDS
    </span>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState('topo');
  const [kmNow, setKmNow] = useState('0.0');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nome: '', email: '', turma: '' });

  const trailheadRef = useRef(null);
  const finishRef = useRef(null);
  const sectionRefs = useRef([]);
  const trailWrapRef = useRef(null);
  const travelerRef = useRef(null);
  const terminalRef = useRef(null);

  function openModal(e) { if (e) e.preventDefault(); setSubmitted(false); setModalOpen(true); }
  function closeModal() { setModalOpen(false); }
  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function handleSubmit(e) { e.preventDefault(); setSubmitted(true); }

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') closeModal(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            setKmNow(entry.target.dataset.km);
          }
        });
      },
      { threshold: 0.4 }
    );
    const targets = [trailheadRef.current, finishRef.current, ...sectionRefs.current].filter(Boolean);
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function positionX() {
      const node = trailWrapRef.current?.querySelector('.node');
      if (!node || !trailWrapRef.current || !travelerRef.current) return;
      const wrapRect = trailWrapRef.current.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      travelerRef.current.style.left = `${nodeRect.left - wrapRect.left + nodeRect.width / 2}px`;
    }
    function positionY() {
      if (!trailWrapRef.current || !travelerRef.current) return;
      const rect = trailWrapRef.current.getBoundingClientRect();
      const viewCenter = window.innerHeight * 0.45;
      const progress = Math.min(1, Math.max(0, (viewCenter - rect.top) / rect.height));
      travelerRef.current.style.top = `${progress * 100}%`;
    }
    positionX(); positionY();
    const onScroll = () => positionY();
    const onResize = () => { positionX(); positionY(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const el = terminalRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      el.innerHTML = TERMINAL_LINES.map((l) => `<div class="${l.cls}">${l.text}</div>`).join('');
      return;
    }
    let li = 0, ci = 0, html = '', timeoutId;
    function typeNext() {
      if (li >= TERMINAL_LINES.length) { el.innerHTML = html + '<span class="caret"></span>'; return; }
      const line = TERMINAL_LINES[li];
      if (ci <= line.text.length) {
        const shown = line.text.slice(0, ci);
        el.innerHTML = html + `<div class="${line.cls}">${shown}<span class="caret"></span></div>`;
        ci++; timeoutId = setTimeout(typeNext, 22);
      } else {
        html += `<div class="${line.cls}">${line.text}</div>`;
        li++; ci = 0; timeoutId = setTimeout(typeNext, 260);
      }
    }
    typeNext();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div className="topbar">
        <a href="#topo"><Logo /></a>
        <div className="topbar-right">
          <span className="progress-readout"><b>{kmNow}</b> / 6.4 km</span>
          <button className="map-toggle" onClick={() => setDrawerOpen(true)}>mapa da trilha</button>
          <button className="btn btn-primary" onClick={openModal}>Entrar no clube</button>
        </div>
      </div>

      <nav className="sidemap">
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} className={activeId === n.id ? 'active' : ''}>
            <span className="dot"></span>
            <span className="lbl">{n.label}</span>
          </a>
        ))}
      </nav>

      <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="drawer-head">
          <Logo />
          <button className="drawer-close" onClick={() => setDrawerOpen(false)}>×</button>
        </div>
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} onClick={() => setDrawerOpen(false)}>
            {n.label} <span className="km">{n.km}km</span>
          </a>
        ))}
      </div>

      <main id="topo">
        <section className="trailhead" id="topo" data-km="0.0" ref={trailheadRef}>
          <div className="wrap">
            <div className="kicker">trilha do clube · km 0.0</div>
            <h1>Um clube não é chegada. É a trilha até lá.</h1>
            <p className="lead">
              O ClubeDS é o espaço de prática do curso técnico. Cada seção desta página é uma parada real do
              percurso — oficina, trilha de estudo ou entrega — até o commit final.
            </p>
            <div className="actions">
              <button className="btn btn-primary" onClick={openModal}>Quero me cadastrar</button>
              <a href="#funciona" className="btn btn-ghost">Começar a percorrer ↓</a>
            </div>
            <div className="mini-terminal">
              <div className="bar"><span></span><span></span><span></span></div>
              <div className="body" ref={terminalRef}></div>
            </div>
            <div className="signpost">
              <div className="post"><div className="k">foco</div><div className="v">Portfólio + mercado</div></div>
              <div className="post"><div className="k">rotina</div><div className="v">Oficinas e projetos</div></div>
              <div className="post"><div className="k">base</div><div className="v">Git + Deploy</div></div>
            </div>
            <div className="start-node" style={{ marginTop: '44px' }}></div>
          </div>
        </section>

        <div className="trail wrap" ref={trailWrapRef}>
          <div className="traveler" ref={travelerRef}></div>

          {CHECKPOINTS.map((cp, i) => {
            const body = cp.id === 'encontros' ? (
              <>
                <p className="desc">
                  <strong style={{ color: 'var(--ink)' }}>Oficina · 2h — Git e GitHub na prática.</strong> Branch, pull
                  request e revisão com mini-projeto. Data a definir.
                </p>
                <p className="desc" style={{ marginTop: '10px' }}>
                  <strong style={{ color: 'var(--ink)' }}>Palestra · 1h — Portfólio que abre portas.</strong> O que colocar,
                  como apresentar e como evoluir. Data a definir.
                </p>
                <button className="link-arrow" onClick={openModal} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}>
                  Receber aviso das próximas datas →
                </button>
              </>
            ) : cp.body;

            const card = (
              <div className="card">
                <span className="tag">{cp.tag}</span>
                <h2>{cp.title}</h2>
                {body}
              </div>
            );
            const node = (
              <div className="node-track">
                <div className="node">
                  <span className="km">{cp.km}</span>
                  <span className="unit">KM</span>
                </div>
              </div>
            );
            return (
              <section
                key={cp.id}
                id={cp.id}
                data-km={cp.km}
                ref={(el) => (sectionRefs.current[i] = el)}
                className={`checkpoint side-${cp.side} ${activeId === cp.id ? 'active' : ''}`}
              >
                {cp.side === 'left' ? (<>{card}{node}<div /></>) : (<><div />{node}{card}</>)}
              </section>
            );
          })}
        </div>

        <section className="finish" id="chegada" data-km="6.4" ref={finishRef}>
          <div className="wrap">
            <div className="flag"></div>
            <h2>Chegada — km 6.4</h2>
            <p>Cadastre-se e receba as próximas datas de oficinas e palestras. A trilha continua depois que você entra.</p>
            <button className="btn btn-primary" onClick={openModal}>Cadastrar agora</button>
            <div className="dist">percurso completo · fundamentos → web → projetos → deploy</div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot-grid">
          <Logo className="foot-logo" />
          <span className="cp">© ClubeDS. Todos os direitos reservados.</span>
        </div>
      </footer>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Fechar">×</button>
            {!submitted ? (
              <>
                <span className="tag">cadastro</span>
                <h2>Entrar no clube</h2>
                <p className="desc">Preencha seus dados. Assim que o clube confirmar, você recebe as próximas datas.</p>
                <form className="signup-form" onSubmit={handleSubmit}>
                  <label>Nome
                    <input required name="nome" value={form.nome} onChange={handleChange} placeholder="Seu nome completo" />
                  </label>
                  <label>E-mail
                    <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="voce@escola.com" />
                  </label>
                  <label>Turma
                    <input required name="turma" value={form.turma} onChange={handleChange} placeholder="Ex: 2º DS" />
                  </label>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '4px' }}>
                    Confirmar cadastro
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="start-node" style={{ margin: '0 auto 20px' }}></div>
                <h2 style={{ textAlign: 'center' }}>Cadastro recebido!</h2>
                <p className="desc" style={{ textAlign: 'center' }}>
                  Valeu, {form.nome.split(' ')[0] || 'aluno'}. Fique de olho no seu e-mail para as próximas datas.
                </p>
                <button className="btn btn-ghost" style={{ width: '100%', marginTop: '20px' }} onClick={closeModal}>
                  Fechar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}