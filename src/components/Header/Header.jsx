import styles from './Header.module.css';
import PlayerStats from '../PlayerStats/PlayerStats';

function Header({ onNavigate, player, progress }) {
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
        <div className={styles.playerPanel}>
          <span className={styles.xp}>⚡ {player?.xp ?? 0} XP</span>
          <PlayerStats player={player ?? { xp: 0, level: 1 }} progress={progress ?? { percent: 0, xpInLevel: 0, xpNeeded: 500, nextLevelXp: 500 }} />
        </div>
      </div>
    </header>
  );
}

export default Header;
