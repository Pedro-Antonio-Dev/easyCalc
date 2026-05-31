import { Component } from 'react';
import { MathJax } from 'better-react-mathjax';
import styles from './MathExpression.module.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <span className={styles.error} title={this.props.expression}>
          [expressão inválida]
        </span>
      );
    }
    return this.props.children;
  }
}

const HAS_DELIMITERS = /(\\\(|\\\[|\$)/;

function MathExpression({ expression, block = false, className = '' }) {
  if (expression == null || expression === '') return null;

  const tex = String(expression).trim();
  if (!tex) return null;

  const cls = [block ? styles.mathBlock : styles.math, className]
    .filter(Boolean)
    .join(' ');

  const content = HAS_DELIMITERS.test(tex)
    ? tex
    : block
      ? `\\[${tex}\\]`
      : `\\(${tex}\\)`;

  return (
    <ErrorBoundary expression={tex}>
      <MathJax className={cls} hideUntilTypeset="first">
        {content}
      </MathJax>
    </ErrorBoundary>
  );
}

export default MathExpression;
