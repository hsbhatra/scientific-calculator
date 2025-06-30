import React from 'react';
import styles from '../styles/History.module.css';

// This component displays the history of calculations
const History = ({ history = [], clearHistory }) => {
  return (
    <div className={styles.history}>
      <h3 className={styles.title}>Calculation History</h3>

      {history.length === 0 ? (
        <p className={styles.empty}>No previous calculations</p>
      ) : (
        <>
          <ul className={styles.list}>
            {[...history].reverse().map((entry, index) => (
              <li key={index} className={styles.item}>
                {entry}
              </li>
            ))}
          </ul>
          
          {/* Clear History button */}
          <button className={styles.clearBtn} onClick={clearHistory}>
            Clear History
          </button>
        </>
      )}
    </div>
  );
};

export default History;
