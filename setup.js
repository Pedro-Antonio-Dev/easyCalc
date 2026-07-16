import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const root = __dirname;

// ─── Install packages ─────────────────────────────────────────────────────────
console.log('📦 Installing npm packages...');
try {
  execSync('npm install katex react-katex', { cwd: root, stdio: 'inherit' });
  console.log('✅ Packages installed\n');
} catch (e) {
  console.error('❌ npm install failed:', e.message);
  process.exit(1);
}

// ─── Create directories ───────────────────────────────────────────────────────
console.log('📁 Creating directories...');
[
  'src/styles',
  'src/data',
  'src/components/Header',
  'src/components/ModuleCard',
  'src/components/ProgressBar',
  'src/components/Footer',
  'src/components/MathExpression',
  'src/pages/Home',
  'src/pages/Module',
].forEach(d => {
  fs.mkdirSync(path.join(root, d), { recursive: true });
  console.log('  ✅ ' + d);
});

// ─── File writer ──────────────────────────────────────────────────────────────
function write(rel, content) {
  const full = path.join(root, rel);
  fs.writeFileSync(full, content.startsWith('\n') ? content.slice(1) : content, 'utf8');
  console.log('  ✅ ' + rel);
}

console.log('\n📝 Writing source files...');

// ── index.html ────────────────────────────────────────────────────────────────
write('index.html', String.raw`<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EasyCalc — Plataforma de Cálculo</title>
    <meta name="description" content="Aprenda Cálculo Diferencial e Integral de forma interativa e gamificada." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`);

// ── src/main.jsx ──────────────────────────────────────────────────────────────
write('src/main.jsx', String.raw`
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`);

// ── src/index.css ─────────────────────────────────────────────────────────────
write('src/index.css', String.raw`
@import './styles/globals.css';

#root {
  min-height: 100vh;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
`);

// ── src/styles/globals.css ────────────────────────────────────────────────────
write('src/styles/globals.css', String.raw`
:root {
  --bg-primary: #0d0e18;
  --bg-secondary: #13141f;
  --bg-card: #181926;
  --border: rgba(99, 102, 241, 0.2);
  --border-subtle: rgba(255, 255, 255, 0.06);
  --accent-blue: #6366f1;
  --accent-purple: #a855f7;
  --accent-gradient: linear-gradient(135deg, #6366f1, #a855f7);
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 24px rgba(0, 0, 0, 0.5);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --transition: all 0.25s ease;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  color: var(--text-primary);
}

p { color: var(--text-secondary); }

a {
  color: var(--accent-blue);
  text-decoration: none;
  transition: var(--transition);
}

a:hover { color: var(--accent-purple); }

button {
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: var(--transition);
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-secondary); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent-blue); }
`);

// ── src/data/modules.js ───────────────────────────────────────────────────────
write('src/data/modules.js', String.raw`
export const modules = [
  {
    id: 0,
    slug: 'pre-calculo',
    title: 'Pré-Cálculo',
    description: 'Funções, trigonometria e álgebra essencial como base para o cálculo.',
    formula: 'f(x) = ax^2 + bx + c',
    color: '#6366f1',
    locked: false,
    progress: 100,
    questionsCount: 24,
  },
  {
    id: 1,
    slug: 'limites',
    title: 'Limites',
    description: 'Conceito fundamental de aproximação e continuidade de funções reais.',
    formula: '\\lim_{x \\to a} f(x) = L',
    color: '#818cf8',
    locked: false,
    progress: 60,
    questionsCount: 30,
  },
  {
    id: 2,
    slug: 'derivadas',
    title: 'Derivadas',
    description: 'Taxa de variação instantânea, regras de diferenciação e aplicações.',
    formula: '\\frac{d}{dx}[f(x)] = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}',
    color: '#a855f7',
    locked: false,
    progress: 20,
    questionsCount: 36,
  },
  {
    id: 3,
    slug: 'aplicacoes',
    title: 'Aplicações',
    description: 'Máximos, mínimos, otimização e análise do comportamento de curvas.',
    formula: "f'(x_0) = 0 \\text{ e } f''(x_0) < 0",
    color: '#c084fc',
    locked: true,
    progress: 0,
    questionsCount: 28,
  },
  {
    id: 4,
    slug: 'integrais',
    title: 'Integrais',
    description: 'Integração definida, indefinida e Teorema Fundamental do Cálculo.',
    formula: '\\int_a^b f(x)\\,dx = F(b) - F(a)',
    color: '#e879f9',
    locked: true,
    progress: 0,
    questionsCount: 32,
  },
  {
    id: 5,
    slug: 'areas-integrais',
    title: 'Cálculo de Áreas',
    description: 'Cálculo de áreas entre curvas, volumes de sólidos de revolução e aplicações geométricas das integrais.',
    formula: 'A = \\int_a^b [f(x) - g(x)]\\,dx',
    color: '#f0abfc',
    locked: true,
    progress: 0,
    questionsCount: 40,
  },
];

export const userProgress = {
  totalModules: 6,
  completedModules: 1,
  currentModule: 1,
  overallProgress: 30,
  xp: 1250,
  level: 3,
  streak: 7,
};
`);

// ── MathExpression ────────────────────────────────────────────────────────────
write('src/components/MathExpression/MathExpression.jsx', String.raw`
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import styles from './MathExpression.module.css';

function MathExpression({ expression, block = false, className = '' }) {
  if (!expression) return null;
  const cls = [styles.math, className].filter(Boolean).join(' ');
  try {
    return (
      <span className={cls}>
        {block ? <BlockMath math={expression} /> : <InlineMath math={expression} />}
      </span>
    );
  } catch {
    return <span className={styles.error}>{expression}</span>;
  }
}

export default MathExpression;
`);

write('src/components/MathExpression/MathExpression.module.css', String.raw`
.math {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
}

.error {
  color: #f87171;
  font-family: monospace;
  font-size: 0.85em;
  background: rgba(248, 113, 113, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}
`);

// ── Header ────────────────────────────────────────────────────────────────────
write('src/components/Header/Header.jsx', String.raw`
import styles from './Header.module.css';

function Header({ onNavigate }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.logo} onClick={() => onNavigate('home')}>
          <span className={styles.logoIcon}>∫</span>
          <span className={styles.logoText}>EasyCalc</span>
        </button>
        <nav className={styles.nav}>
          <button className={styles.navBtn} onClick={() => onNavigate('home')}>Módulos</button>
          <button className={styles.navBtn}>Progresso</button>
          <button className={styles.navBtn}>Sobre</button>
        </nav>
        <div className={styles.badge}>
          <span className={styles.xp}>⚡ 1250 XP</span>
          <span className={styles.level}>Nível 3</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
`);

write('src/components/Header/Header.module.css', String.raw`
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(13, 14, 24, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-subtle);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  padding: 0;
  border: none;
  cursor: pointer;
}

.logoIcon {
  font-size: 28px;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.logoText {
  font-size: 20px;
  font-weight: 700;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.navBtn {
  background: none;
  color: var(--text-secondary);
  font-size: 14px;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  font-weight: 500;
}

.navBtn:hover {
  color: var(--text-primary);
  background: rgba(99, 102, 241, 0.1);
}

.badge {
  display: flex;
  align-items: center;
  gap: 8px;
}

.xp {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-blue);
  background: rgba(99, 102, 241, 0.1);
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.level {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-purple);
  background: rgba(168, 85, 247, 0.1);
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid rgba(168, 85, 247, 0.2);
}

@media (max-width: 640px) {
  .nav { display: none; }
  .badge { gap: 6px; }
}
`);

// ── Footer ────────────────────────────────────────────────────────────────────
write('src/components/Footer/Footer.jsx', String.raw`
import styles from './Footer.module.css';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.icon}>∫</span>
          <span className={styles.name}>EasyCalc</span>
        </div>
        <p className={styles.copy}>
          Plataforma educacional de Cálculo Diferencial e Integral · {year}
        </p>
        <div className={styles.links}>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
`);

write('src/components/Footer/Footer.module.css', String.raw`
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-subtle);
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 20px;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.name {
  font-size: 16px;
  font-weight: 700;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.copy {
  font-size: 13px;
  color: var(--text-muted);
}

.links {
  display: flex;
  gap: 20px;
}

.links a {
  font-size: 13px;
  color: var(--text-muted);
  transition: var(--transition);
}

.links a:hover { color: var(--accent-blue); }
`);

// ── ProgressBar ───────────────────────────────────────────────────────────────
write('src/components/ProgressBar/ProgressBar.jsx', String.raw`
import styles from './ProgressBar.module.css';
import { userProgress } from '../../data/modules';

function ProgressBar() {
  const { overallProgress, completedModules, totalModules, xp, level, streak } = userProgress;
  return (
    <div className={styles.wrapper}>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{level}</span>
          <span className={styles.statLabel}>Nível</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{streak}</span>
          <span className={styles.statLabel}>Dias seguidos</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{completedModules}/{totalModules}</span>
          <span className={styles.statLabel}>Módulos</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{xp}</span>
          <span className={styles.statLabel}>XP Total</span>
        </div>
      </div>
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Progresso Geral</span>
          <span className={styles.progressValue}>{overallProgress}%</span>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: overallProgress + '%' }} />
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
`);

write('src/components/ProgressBar/ProgressBar.module.css', String.raw`
.wrapper {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.statValue {
  font-size: 28px;
  font-weight: 700;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.statLabel {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.progressSection {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.progressHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progressLabel {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
}

.progressValue {
  font-size: 14px;
  font-weight: 700;
  color: var(--accent-blue);
}

.track {
  height: 8px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 100px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: var(--accent-gradient);
  border-radius: 100px;
  transition: width 1s ease;
  position: relative;
}

.fill::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background: #a855f7;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.8);
}

@media (max-width: 640px) {
  .stats { grid-template-columns: repeat(2, 1fr); }
  .wrapper { padding: 20px; }
}
`);

// ── ModuleCard ────────────────────────────────────────────────────────────────
write('src/components/ModuleCard/ModuleCard.jsx', String.raw`
import styles from './ModuleCard.module.css';
import MathExpression from '../MathExpression/MathExpression';

function ModuleCard({ module, onEnter }) {
  const { id, title, description, formula, color, locked, progress } = module;
  const cardCls = [styles.card, locked && styles.locked].filter(Boolean).join(' ');
  const btnCls = [styles.btn, locked ? styles.btnLocked : styles.btnActive].join(' ');

  return (
    <article className={cardCls} style={{ '--accent': color }}>
      <div className={styles.topRow}>
        <span className={styles.moduleNum}>Módulo {id}</span>
        {locked && <span className={styles.lockIcon}>🔒</span>}
        {!locked && progress === 100 && <span className={styles.checkIcon}>✓</span>}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.formula}>
        <MathExpression expression={formula} />
      </div>
      {!locked && (
        <div className={styles.progressRow}>
          <div className={styles.miniTrack}>
            <div className={styles.miniFill} style={{ width: progress + '%' }} />
          </div>
          <span className={styles.progressText}>{progress}%</span>
        </div>
      )}
      <button
        className={btnCls}
        onClick={() => !locked && onEnter(module)}
        disabled={locked}
      >
        {locked ? 'Bloqueado' : progress > 0 ? 'Continuar' : 'Entrar'}
      </button>
    </article>
  );
}

export default ModuleCard;
`);

write('src/components/ModuleCard/ModuleCard.module.css', String.raw`
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  overflow: hidden;
  transition: var(--transition);
  cursor: pointer;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--accent, var(--accent-blue));
  opacity: 0.7;
  transition: var(--transition);
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--accent, var(--accent-blue));
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px var(--accent, var(--accent-blue)),
    0 0 30px rgba(99, 102, 241, 0.15);
}

.card:hover::before {
  opacity: 1;
  height: 4px;
}

.locked {
  opacity: 0.5;
  cursor: not-allowed;
}

.locked:hover {
  transform: none;
  border-color: var(--border-subtle);
  box-shadow: none;
}

.topRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.moduleNum {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--accent, var(--accent-blue));
}

.lockIcon { font-size: 14px; opacity: 0.6; }

.checkIcon {
  font-size: 12px;
  color: #22c55e;
  font-weight: 700;
  background: rgba(34, 197, 94, 0.15);
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
}

.description {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.55;
  flex: 1;
}

.formula {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  overflow: hidden;
}

.progressRow {
  display: flex;
  align-items: center;
  gap: 10px;
}

.miniTrack {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 100px;
  overflow: hidden;
}

.miniFill {
  height: 100%;
  background: var(--accent, var(--accent-blue));
  border-radius: 100px;
  transition: width 0.5s ease;
}

.progressText {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  min-width: 28px;
  text-align: right;
}

.btn {
  width: 100%;
  padding: 12px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  margin-top: 4px;
  transition: var(--transition);
}

.btnActive {
  background: var(--accent, var(--accent-blue));
  color: white;
}

.btnActive:hover {
  filter: brightness(1.15);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);
}

.btnLocked {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
  cursor: not-allowed;
}
`);

// ── Home page ─────────────────────────────────────────────────────────────────
write('src/pages/Home/Home.jsx', String.raw`
import styles from './Home.module.css';
import ModuleCard from '../../components/ModuleCard/ModuleCard';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import MathExpression from '../../components/MathExpression/MathExpression';
import { modules } from '../../data/modules';

const heroFormulas = [
  '\\frac{d}{dx}[x^n] = nx^{n-1}',
  '\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C',
  '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1',
];

function Home({ onEnterModule }) {
  function scrollToModules() {
    document.getElementById('modules').scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span>∑</span>
            <span>Plataforma Educacional de Cálculo</span>
          </div>
          <h1 className={styles.title}>
            Aprenda <span className={styles.gradient}>Cálculo</span>
            <br />
            de forma interativa
          </h1>
          <p className={styles.subtitle}>
            EasyCalc transforma o estudo de Cálculo Diferencial e Integral em
            uma jornada gamificada. Resolva questões, suba de nível e domine a matéria.
          </p>
          <div className={styles.cta}>
            <button className={styles.ctaPrimary} onClick={scrollToModules}>
              Começar agora
            </button>
            <button className={styles.ctaSecondary}>Ver progresso</button>
          </div>
        </div>
        <div className={styles.heroFormulas}>
          {heroFormulas.map((f, i) => (
            <div key={i} className={styles.formulaCard}>
              <MathExpression expression={f} block />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.progressSection}>
        <h2 className={styles.sectionTitle}>Seu Progresso</h2>
        <ProgressBar />
      </section>

      <section className={styles.modulesSection} id="modules">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Módulos</h2>
          <p className={styles.sectionSub}>6 módulos do Pré-Cálculo ao CDI II</p>
        </div>
        <div className={styles.grid}>
          {modules.map((mod) => (
            <ModuleCard key={mod.id} module={mod} onEnter={onEnterModule} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
`);

write('src/pages/Home/Home.module.css', String.raw`
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 80px;
  display: flex;
  flex-direction: column;
  gap: 80px;
}

/* ── Hero ── */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  padding-top: 80px;
}

.heroContent {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-blue);
  background: rgba(99, 102, 241, 0.1);
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid rgba(99, 102, 241, 0.25);
  width: fit-content;
}

.title {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -2px;
  color: var(--text-primary);
}

.gradient {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 460px;
}

.cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.ctaPrimary {
  padding: 14px 28px;
  background: var(--accent-gradient);
  color: white;
  font-size: 15px;
  font-weight: 600;
  border-radius: var(--radius-md);
  border: none;
  transition: var(--transition);
}

.ctaPrimary:hover {
  filter: brightness(1.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
}

.ctaSecondary {
  padding: 14px 28px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 600;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  transition: var(--transition);
}

.ctaSecondary:hover {
  color: var(--text-primary);
  border-color: rgba(99, 102, 241, 0.4);
  background: rgba(99, 102, 241, 0.05);
}

.heroFormulas {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.formulaCard {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.formulaCard:hover {
  border-color: var(--border);
  background: var(--bg-card);
}

/* ── Progress ── */
.progressSection {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sectionTitle {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
}

/* ── Modules ── */
.modulesSection {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.sectionHeader {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sectionSub {
  color: var(--text-muted);
  font-size: 15px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 1024px) {
  .hero { grid-template-columns: 1fr; }
  .heroFormulas { display: none; }
  .grid { grid-template-columns: repeat(2, 1fr); }
  .title { font-size: 40px; }
}

@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
  .title { font-size: 32px; letter-spacing: -1px; }
  .page { gap: 48px; }
  .hero { padding-top: 48px; }
}
`);

// ── Module page ───────────────────────────────────────────────────────────────
write('src/pages/Module/Module.jsx', String.raw`
import styles from './Module.module.css';
import MathExpression from '../../components/MathExpression/MathExpression';

function Module({ module, onBack }) {
  if (!module) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <button className={styles.back} onClick={onBack}>← Voltar</button>
          <p>Módulo não encontrado.</p>
        </div>
      </div>
    );
  }

  const { id, title, description, formula, color, questionsCount } = module;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button className={styles.back} onClick={onBack}>
          ← Voltar para módulos
        </button>
        <div className={styles.header} style={{ '--color': color }}>
          <span className={styles.moduleNum}>Módulo {id}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.desc}>{description}</p>
          <div className={styles.formulaBox}>
            <MathExpression expression={formula} block />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.placeholder}>
            <div className={styles.placeholderIcon}>🚧</div>
            <h2>Em construção</h2>
            <p>
              Este módulo terá {questionsCount} questões interativas com
              fórmulas, exercícios práticos e feedback instantâneo.
            </p>
            <button className={styles.backBtn} onClick={onBack}>
              ← Explorar outros módulos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Module;
`);

write('src/pages/Module/Module.module.css', String.raw`
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.back {
  background: none;
  color: var(--text-secondary);
  font-size: 14px;
  padding: 8px 0;
  font-weight: 500;
  width: fit-content;
  transition: var(--transition);
}

.back:hover { color: var(--text-primary); }

.header {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-top: 3px solid var(--color, var(--accent-blue));
  border-radius: var(--radius-lg);
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.moduleNum {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--color, var(--accent-blue));
}

.title {
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -1px;
}

.desc {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 600px;
}

.formulaBox {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 480px;
}

.content {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  max-width: 480px;
}

.placeholderIcon { font-size: 48px; }

.placeholder h2 {
  font-size: 24px;
  color: var(--text-primary);
}

.placeholder p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.backBtn {
  margin-top: 8px;
  padding: 12px 24px;
  background: var(--accent-gradient);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: var(--radius-md);
  border: none;
  transition: var(--transition);
}

.backBtn:hover {
  filter: brightness(1.15);
  transform: translateY(-1px);
}
`);

// ── App.jsx ───────────────────────────────────────────────────────────────────
write('src/App.jsx', String.raw`
import { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Module from './pages/Module/Module';

function App() {
  const [page, setPage] = useState('home');
  const [selectedModule, setSelectedModule] = useState(null);

  function navigate(target, data) {
    setPage(target);
    if (data) setSelectedModule(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app">
      <Header onNavigate={navigate} />
      <main>
        {page === 'home' && (
          <Home onEnterModule={(mod) => navigate('module', mod)} />
        )}
        {page === 'module' && (
          <Module module={selectedModule} onBack={() => navigate('home')} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
`);

console.log('\n✅ All files created!\n');
console.log('👉 Start the app with:  npm run dev\n');
