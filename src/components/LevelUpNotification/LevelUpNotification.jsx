import { useEffect } from 'react';
import styles from './LevelUpNotification.module.css';

const AUTO_DISMISS_MS = 3500;

function LevelUpNotification({ level, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [level, onDismiss]);

  return (
    <div className={styles.overlay} onClick={onDismiss}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <span className={styles.emoji}>🎉</span>
        <h2 className={styles.title}>Parabéns!</h2>
        <p className={styles.message}>
          Você alcançou o <strong>Nível {level}</strong>!
        </p>
        <button className={styles.closeBtn} onClick={onDismiss}>
          Continuar
        </button>
      </div>
    </div>
  );
}

export default LevelUpNotification;
