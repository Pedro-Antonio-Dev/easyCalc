import styles from './Module.module.css';
import MathExpression from '../../components/MathExpression/MathExpression';
import QuestionCard from '../../components/QuestionCard';

function Module({ module, onBack, isQuestionAnswered, onAnswer, moduleProgress }) {
  if (!module) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <button className={styles.back} onClick={onBack}>← Voltar</button>
          <p>Módulo não encontrado.</p>
        </div>
      </div>
    );
  }

  const { id, titulo, descricao, formula, color, videoUrl, questoes } = module;
  const progress = moduleProgress ?? 0;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button className={styles.back} onClick={onBack}>
          ← Voltar para módulos
        </button>

        <div className={styles.header} style={{ '--color': color }}>
          <span className={styles.moduleNum}>Módulo {id}</span>
          <h1 className={styles.title}>{titulo}</h1>
          <p className={styles.desc}>{descricao}</p>

          <div className={styles.formulaBox}>
            <MathExpression expression={formula} block />
          </div>

          <div className={styles.actions}>
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.videoBtn}
            >
              ▶ Assistir Aula
            </a>

            <div className={styles.progressBlock}>
              <div className={styles.progressHeader}>
                <span className={styles.progressLabel}>Progresso do módulo</span>
                <span className={styles.progressValue}>{progress}%</span>
              </div>
              <div className={styles.track}>
                <div className={styles.fill} style={{ width: progress + '%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.questoesSection}>
          <h2 className={styles.questoesTitle}>Questões</h2>
          <div className={styles.questoesList}>
            {questoes.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                moduleId={id}
                isAnswered={isQuestionAnswered(id, q.id)}
                onAnswer={onAnswer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Module;
