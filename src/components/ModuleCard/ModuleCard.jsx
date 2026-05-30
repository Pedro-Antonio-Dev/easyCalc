import styles from './ModuleCard.module.css';
import MathExpression from '../MathExpression/MathExpression';

function ModuleCard({ module, progress, onEnter }) {
  const { id, titulo, descricao, formula, color } = module;
  const pct = progress ?? 0;
  const isDone = pct === 100;

  return (
    <article
      className={styles.card}
      style={{ '--accent': color }}
      onClick={() => onEnter(module)}
    >
      <div className={styles.topRow}>
        <span className={styles.moduleNum}>Módulo {id}</span>
        {isDone && <span className={styles.checkIcon}>✓</span>}
      </div>
      <h3 className={styles.title}>{titulo}</h3>
      <p className={styles.description}>{descricao}</p>
      <div className={styles.formula}>
        <MathExpression expression={formula} />
      </div>
      <div className={styles.progressRow}>
        <div className={styles.miniTrack}>
          <div className={styles.miniFill} style={{ width: pct + '%' }} />
        </div>
        <span className={styles.progressText}>{pct}%</span>
      </div>
      <button className={`${styles.btn} ${styles.btnActive}`}>
        {pct > 0 && !isDone ? 'Continuar' : isDone ? 'Revisar' : 'Entrar'}
      </button>
    </article>
  );
}

export default ModuleCard;
