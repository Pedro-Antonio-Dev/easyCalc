import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import styles from './MathExpression.module.css';

function MathExpression({ expression, block = false, className = '' }) {
  if (!expression) return null;
  const cls = [styles.math, className].filter(Boolean).join(' ');
  try {
    return (
      <span className={cls}>
        {block ? <BlockMath math={expression} /> : <InlineMath math={expression} />}
      </span>
    );
  } catch {
    return <span className={styles.error}>{expression}</span>;
  }
}

export default MathExpression;
