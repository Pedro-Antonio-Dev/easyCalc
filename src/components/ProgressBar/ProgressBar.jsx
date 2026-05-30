import styles from './ProgressBar.module.css';

function ProgressBar({ overallProgress, answeredQuestions, totalQuestions, onReset }) {
  const completedPercent = overallProgress ?? 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{answeredQuestions ?? 0}</span>
          <span className={styles.statLabel}>Questões respondidas</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{totalQuestions ?? 0}</span>
          <span className={styles.statLabel}>Total de questões</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{completedPercent}%</span>
          <span className={styles.statLabel}>Concluído</span>
        </div>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Progresso Geral</span>
          <span className={styles.progressValue}>{completedPercent}%</span>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: completedPercent + '%' }} />
        </div>
      </div>

      {onReset && (
        <div className={styles.resetRow}>
          <button className={styles.resetBtn} onClick={onReset}>
            Resetar progresso
          </button>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
