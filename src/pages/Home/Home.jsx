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
