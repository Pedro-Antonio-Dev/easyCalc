import styles from './Footer.module.css';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.icon}>∫</span>
          <span className={styles.name}>EasyCalc</span>
        </div>
        <p className={styles.copy}>
          Plataforma educacional de Cálculo Diferencial e Integral · {year}
        </p>
        <div className={styles.links}>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
