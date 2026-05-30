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
