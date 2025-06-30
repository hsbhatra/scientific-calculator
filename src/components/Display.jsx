import React from 'react';
import styles from '../styles/Display.module.css';

// This component is responsible for showing both:
// 1. The input expression the user types
// 2. The result calculated from that expression
const Display = ({ expression, result }) => {
  return (
    <div className={styles.display}>
      <div className={styles.expression}>{expression}</div>
      <div className={styles.result}>{result}</div>
    </div>
  );
};

export default Display;
