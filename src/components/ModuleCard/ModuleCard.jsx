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
