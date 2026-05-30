import styles from './MathExpression.module.css';

function MathExpression({ expression, className = '' }) {
  if (!expression) return null;
  const cls = [styles.math, className].filter(Boolean).join(' ');
  return <span className={cls}>{expression}</span>;
}

export default MathExpression;
