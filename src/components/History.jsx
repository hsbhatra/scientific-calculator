import React from 'react';
import styles from '../styles/History.module.css';

// This component displays the history of calculations
const History = ({ history = [] }) => {
  return (
    <div className={styles.history}>
      <h3 className={styles.title}>Calculation History</h3>
      {history.length === 0 ? (
        <p className={styles.empty}>No previous calculations</p>
      ) : (
        <ul className={styles.list}>
          {history.map((entry, index) => (
            <li key={index} className={styles.item}>
              {entry}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
