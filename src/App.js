import React, { useState } from 'react';
import Display from './components/Display';
import Button from './components/Button';
import History from './components/History'
import styles from './styles/App.module.css';

function App() {
  // Stores current input expression
  const [expression, setExpression] = useState('');
  // Stores final result after evaluation
  const [result, setResult] = useState('');
  // Stores past calculations from local storage
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('calc-history')) || []
  );

  // List of all buttons to render in calculator
  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C', '←'
  ];

  // Handles logic when a button is clicked
  const handleClick = (label) => {
    if (label === 'C') {
      // Clear everything
      setExpression('');
      setResult('');
    } else if (label === '←') {
      // Remove last character
      setExpression((prev) => prev.slice(0, -1));
    } else if (label === '=') {
      try {
        const evalResult = eval(expression); // Use mathjs later for safety
        setResult(evalResult);
        const newHistory = [...history, `${expression} = ${evalResult}`];
        setHistory(newHistory);
        localStorage.setItem('calc-history', JSON.stringify(newHistory));
      } catch {
        setResult('Error');
      }
    } else {
      // Append number/operator to expression
      setExpression((prev) => prev + label);
    }
  };

  return (
    <div className={styles.calculator}>
      <Display expression={expression} result={result} />
      <div className={styles.buttonGrid}>
        {buttons.map((btn, idx) => (
          <Button
            key={idx}
            label={btn}
            onClick={handleClick}
            type={btn === '=' ? 'equal' : btn === 'C' ? 'clear' : isNaN(btn) && btn !== '.' ? 'operator' : 'default'}
          />
        ))}
      </div>
      <History history={history} />
    </div>
  );
}

export default App;
