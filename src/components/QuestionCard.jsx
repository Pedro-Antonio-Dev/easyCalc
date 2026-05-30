import { useState } from 'react';
import MathExpression from './MathExpression/MathExpression';
import styles from './QuestionCard.module.css';

function QuestionCard({ question, moduleId, isAnswered, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showResolution, setShowResolution] = useState(false);

  const alreadyDone = isAnswered || (submitted && selected === question.respostaCorreta);
  const isCorrect = submitted && selected === question.respostaCorreta;
  const isIncorrect = submitted && selected !== question.respostaCorreta;

  function handleSubmit() {
    if (!selected || alreadyDone) return;
    setSubmitted(true);
    if (selected === question.respostaCorreta) {
      onAnswer(moduleId, question.id);
    }
  }

  function handleRetry() {
    setSelected(null);
    setSubmitted(false);
  }

  const cardClass = [
    styles.card,
    alreadyDone && styles.done,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClass}>
      <div className={styles.header}>
        <span className={styles.questionNum}>Questão {question.id}</span>
        {alreadyDone && <span className={styles.badge}>✓ Concluída</span>}
      </div>

      <p className={styles.enunciado}>{question.enunciado}</p>

      {question.expressao && (
        <div className={styles.expressaoBox}>
          <MathExpression expression={question.expressao} block />
        </div>
      )}

      <div className={styles.alternativas}>
        {question.alternativas.map((alt) => {
          const isSelected = selected === alt;
          const isRight = alreadyDone && alt === question.respostaCorreta;
          const isWrong = submitted && isSelected && alt !== question.respostaCorreta;

          const altClass = [
            styles.alt,
            isSelected && !submitted && styles.altSelected,
            isRight && styles.altCorrect,
            isWrong && styles.altWrong,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={alt}
              className={altClass}
              onClick={() => !alreadyDone && !submitted && setSelected(alt)}
              disabled={alreadyDone || submitted}
            >
              {alt}
            </button>
          );
        })}
      </div>

      {!alreadyDone && !submitted && (
        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={!selected}
        >
          Responder
        </button>
      )}

      {isCorrect && (
        <div className={`${styles.feedback} ${styles.feedbackCorrect}`}>
          🎉 Parabéns! Resposta correta.
        </div>
      )}

      {isIncorrect && (
        <div className={`${styles.feedback} ${styles.feedbackIncorrect}`}>
          ❌ Resposta incorreta. Tente novamente ou consulte a resolução.
          <button className={styles.retryBtn} onClick={handleRetry}>
            Tentar novamente
          </button>
        </div>
      )}

      {isAnswered && !submitted && (
        <div className={`${styles.feedback} ${styles.feedbackCorrect}`}>
          ✓ Você já respondeu esta questão corretamente.
        </div>
      )}

      <button
        className={styles.resolutionToggle}
        onClick={() => setShowResolution((v) => !v)}
      >
        {showResolution ? 'Ocultar resolução' : 'Mostrar resolução'}
      </button>

      {showResolution && (
        <div className={styles.resolution}>
          <h4 className={styles.resolutionTitle}>Resolução passo a passo</h4>
          <ol className={styles.steps}>
            {question.resolucao.map((step, i) => (
              <li key={i} className={styles.step}>
                <span className={styles.stepNum}>Passo {i + 1}</span>
                <p className={styles.stepDesc}>{step.descricao}</p>
                {step.expressao && (
                  <div className={styles.stepExpr}>
                    <MathExpression expression={step.expressao} block />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
