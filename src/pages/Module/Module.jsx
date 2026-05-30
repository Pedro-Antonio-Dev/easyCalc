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
