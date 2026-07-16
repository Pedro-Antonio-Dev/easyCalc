import styles from './Home.module.css';
import ModuleCard from '../../components/ModuleCard/ModuleCard';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import MathExpression from '../../components/MathExpression/MathExpression';
import { modules } from '../../data/modules';

const heroFormulas = [
  'd/dx[xⁿ] = n·xⁿ⁻¹',
  '∫ xⁿ dx = xⁿ⁺¹/(n+1) + C',
  'lim(x→0) sen(x)/x = 1',
];

function Home({ onEnterModule, overallProgress, answeredQuestions, totalQuestions, getModuleProgress, resetProgress }) {
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
        <ProgressBar
          overallProgress={overallProgress}
          answeredQuestions={answeredQuestions}
          totalQuestions={totalQuestions}
          onReset={resetProgress}
        />
      </section>

      <section className={styles.modulesSection} id="modules">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Módulos</h2>
          <p className={styles.sectionSub}>6 módulos do Pré-Cálculo ao CDI I</p>
        </div>
        <div className={styles.grid}>
          {modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              progress={getModuleProgress(mod.id)}
              onEnter={onEnterModule}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
