import MathExpression from '../../components/MathExpression/MathExpression';
import styles from './MathTest.module.css';

const LATEX_CASES = [
  { label: 'Fração', latex: '\\frac{1}{2}', block: false },
  { label: 'Trigonometria', latex: '\\sin\\left(\\frac{\\pi}{6}\\right)', block: false },
  { label: 'Integral definida', latex: '\\int_0^3 x^2\\,dx', block: true },
  { label: 'Limite fundamental', latex: '\\lim_{x\\to 0}\\frac{\\sin x}{x}', block: true },
  { label: 'Raiz quadrada', latex: '\\sqrt{x^2+1}', block: false },
  { label: 'Somatório', latex: '\\sum_{n=1}^{10} n', block: true },
];

const PLAIN_CASES = [
  { label: 'Função (dados existentes)', value: 'f(x) = 2x + 3' },
  { label: 'Integral Unicode', value: '∫ x³ dx' },
  { label: 'Limite Unicode', value: 'lim(x→3) (x² + 1)' },
  { label: 'Fórmula de módulo', value: '∫ₐᵇ f(x) dx = F(b) − F(a)' },
];

const ERROR_CASES = [
  { label: 'Expressão nula', value: null },
  { label: 'Expressão undefined', value: undefined },
  { label: 'String vazia', value: '' },
  { label: 'String em branco', value: '   ' },
];

function MathTest({ onBack }) {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button className={styles.back} onClick={onBack}>
          ← Voltar
        </button>

        <h1 className={styles.title}>🧪 Página de Validação — MathJax</h1>
        <p className={styles.subtitle}>
          Valida a renderização do componente <code>MathExpression</code> via{' '}
          <code>better-react-mathjax</code>.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Casos LaTeX obrigatórios</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Caso</th>
                <th>LaTeX</th>
                <th>Renderizado</th>
                <th>Modo</th>
              </tr>
            </thead>
            <tbody>
              {LATEX_CASES.map(({ label, latex, block }) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td>
                    <code className={styles.code}>{latex}</code>
                  </td>
                  <td>
                    <MathExpression expression={latex} block={block} />
                  </td>
                  <td>
                    <span className={block ? styles.badgeBlock : styles.badgeInline}>
                      {block ? 'block' : 'inline'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Compatibilidade — dados existentes (plain text)</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Caso</th>
                <th>Valor</th>
                <th>Renderizado</th>
              </tr>
            </thead>
            <tbody>
              {PLAIN_CASES.map(({ label, value }) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td>
                    <code className={styles.code}>{value}</code>
                  </td>
                  <td>
                    <MathExpression expression={value} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tratamento de erros</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Caso</th>
                <th>Valor</th>
                <th>Resultado esperado</th>
                <th>Renderizado</th>
              </tr>
            </thead>
            <tbody>
              {ERROR_CASES.map(({ label, value }) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td>
                    <code className={styles.code}>{String(value)}</code>
                  </td>
                  <td>
                    <span className={styles.expected}>nada (null)</span>
                  </td>
                  <td>
                    <MathExpression expression={value} />
                    <span className={styles.ok}>✓ sem crash</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default MathTest;
