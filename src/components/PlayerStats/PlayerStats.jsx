import styles from './PlayerStats.module.css';

function PlayerStats({ player, progress }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <span className={styles.level}>Nível {player.level}</span>
        <span className={styles.xpText}>
          {player.xp} / {progress.nextLevelXp} XP
        </span>
      </div>
      <div className={styles.track} title={`${progress.percent}%`}>
        <div
          className={styles.fill}
          style={{ width: `${progress.percent}%` }}
        />
      </div>
    </div>
  );
}

export default PlayerStats;
