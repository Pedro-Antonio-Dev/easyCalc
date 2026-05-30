import styles from './Header.module.css';

function Header({ onNavigate }) {
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
        <div className={styles.badge}>
          <span className={styles.xp}>⚡ 1250 XP</span>
          <span className={styles.level}>Nível 3</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
