import React, { useState } from 'react';
import { evaluate } from 'mathjs';
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
    'sin(', 'cos(', 'tan(', 'log(',
    '√(', 'π', 'e', '(', ')',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '^', '+',
    'C', '←', '='
  ];


  // Handles logic when a button is clicked
  const handleClick = (label) => {
    if (label === 'C') {
      // Reset the expression and result
      setExpression('');
      setResult('');
    } else if (label === '←') {
      // Remove the last character from the expression
      setExpression((prev) => prev.slice(0, -1));
    } else if (label === '=') {
      try {
        // Preprocess expression for mathjs compatibility
        let processedExpr = expression
          .replace(/π/g, 'pi')           // Replace π with mathjs constant
          .replace(/√/g, 'sqrt')         // Replace √ with sqrt
          .replace(/log/g, 'log10');     // Replace log with log10 (base 10)

        // Evaluate the expression using mathjs
        const evalResult = evaluate(processedExpr);
        setResult(evalResult);

        // Save this calculation to history
        const newHistory = [...history, `${expression} = ${evalResult}`];
        setHistory(newHistory);
        localStorage.setItem('calc-history', JSON.stringify(newHistory));
      } catch {
        // If evaluation fails, show error
        setResult('Error');
      }
    } else {
      // Append the clicked label (including closing bracket or operators) to the expression
      setExpression((prev) => prev + label);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calc-history');
  };

  return (
    <div className={styles.calculator}>
      <Display expression={expression} result={result} />
      
      <div className={styles.buttonGrid}>
        {buttons.map((btn, idx) => (
          <Button key={idx} label={btn} onClick={handleClick}
            type={
              btn === '=' ? 'equal'
                : btn === 'C' ? 'clear'
                : ['+', '-', '*', '/', '^'].includes(btn) ? 'operator'
                : ['sin(', 'cos(', 'tan(', 'log(', '√(', 'π', 'e', '(', ')'].includes(btn) ? 'function'
                : 'default'
            }
          />
        ))}
      </div>
      
      <History history={history} clearHistory={clearHistory} />
    </div>
  );
}

export default App;
